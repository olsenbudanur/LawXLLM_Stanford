pip install langchain pypdf2 python-dotenv streamlit faiss-cpu tiktoken flask openai flask-cors

## run server

flask run

production:

gunicorn -b 127.0.0.1:8765 app:app

## expose server to internet

ngrok http 5000

## api

curl -X POST localhost:5000/query -H "Content-Type: application/json" -d '{"subissue": "You told them to stop contacting you, but they keep trying", "query": "judgements", "prompt": "Summarize the docs: judgements"}'
