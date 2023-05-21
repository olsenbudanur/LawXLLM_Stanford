from flask_cors import CORS
import os
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.llms import OpenAI
from langchain.callbacks import get_openai_callback
from flask import Flask, request
import csv
from collections import defaultdict

OPENAI_API_KEY = ''


def read_data():
    data = []
    cols = ["Date received", "Product", "Sub-product", "Issue", "Sub-issue 1", "Sub-issue 2", "Consumer complaint narrative", "Company public response", "Company", "State", "ZIP code", "Tags", "Consumer consent provided?", "Submitted via", "Date sent to company", "Company response to consumer", "Timely response?", "Consumer disputed?", "Complaint ID"]
    with open("./data/dataset.csv") as csvfile:
        rows = csv.reader(csvfile)
        for row in rows:
            curr_dict = {}
            for i in range(len(cols)):
                curr_dict[cols[i]] = row[i]

            data.append(curr_dict)

    return data

ALL_DOCS = read_data()

def docs_by_subissue(docs):
    by_subissue = defaultdict(list)
    for doc in docs:
        subissue = doc['Sub-issue 1']
        assert subissue
        by_subissue[subissue].append(doc)

    return by_subissue


ALL_DOCS_BY_SUBISSUE = docs_by_subissue(ALL_DOCS)


def build_knowledge_base():
    os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

    chunks_by_subissue = defaultdict(list)
    metadata_by_subissue = defaultdict(list)

    for docid, doc in enumerate(ALL_DOCS):
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        subissue = doc['Sub-issue 1']
        assert subissue
        text = doc['Consumer complaint narrative']
        if not text:
            continue
        chunks = text_splitter.split_text(text)
        chunks_by_subissue[subissue].extend(chunks)
        metadata_by_subissue[subissue].extend([{'docid': docid} for _ in range(len(chunks))])

    embeddings = OpenAIEmbeddings()
    knowledge_base_by_subissue = {}
    for subissue in sorted(chunks_by_subissue):
        knowledge_base_by_subissue[subissue] = FAISS.from_texts(
            chunks_by_subissue[subissue], embeddings, metadata_by_subissue[subissue])

    return knowledge_base_by_subissue


KNOWLEDGE_BASE_BY_SUBISSUE = build_knowledge_base()

app = Flask(__name__)
CORS(app)


@app.post('/query')
def query():
    data = request.json
    print('request:', data)
    subissue = data['subissue']
    query = data['query']
    prompt = data['prompt']

    knowledge_base = KNOWLEDGE_BASE_BY_SUBISSUE.get(subissue)
    if not knowledge_base:
        return 'invalid subissue'

    found_docs = knowledge_base.similarity_search(query, k=10)

    print("FOUND DOCS:", found_docs)

    llm = OpenAI()
    chain = load_qa_chain(llm, chain_type="stuff")

    full_prompt = 'Number of complaints for category: {}. User prompt: {}'.format(
        len(ALL_DOCS_BY_SUBISSUE[subissue]),
        prompt,
    )

    with get_openai_callback() as cb:
        response = chain({'input_documents': found_docs, 'question': full_prompt}, return_only_outputs=True)
        print(cb)

    cited_docs = []
    for found_doc in found_docs:
        cited_docs.append(ALL_DOCS[found_doc.metadata['docid']])

    response['cited_docs'] = cited_docs
    print(response)
    return response

print("ready to serve")
