import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import * as S from "./EssayPage.styles";
import { CircularProgress } from "@mui/material";

function typingEffect(str: string, setState: (s: string) => void) {
	let i = 0;


	function next() {
		try {
			setState(str.substring(0, i));
			i++;
			if (i <= str.length) {
				setTimeout(next, 1);
			}
		} catch (error) {
			setState("Rate limiting has occured, try in an hour :)");
		}
	}

	setTimeout(next, 7);
}

function EssayPage() {
	const [value, setValue] = useState("");
	const [essay, setEssay] = useState("");
	const [loading, setLoading] = useState("none");
	const [copy, setCopy] = useState(true);
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [minimized, setMinimized] = useState(false);
	const [messages, setMessages] = useState<{content: string; sender: string}[]>([]);
  	const [newMessage, setNewMessage] = useState<string>('');

		const handleMinimize = () => {
			setMinimized(!minimized);
		};

	//
	// If not logged in..
	React.useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}

		submit();
	}, []);

	async function submit() {
		//
		// Kill all other runs that might be happening.
		const highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}

		setLoading("flex");

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Origin", "https://3154-68-65-175-69.ngrok-free.app");
		const dataState = JSON.parse(Cookies.get("state")!);

		const raw = JSON.stringify({
			...JSON.parse(Cookies.get("state")!),
			prompt: "Summarize the docs: " + dataState.query,
		});

		console.log(raw)

		const requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
			mode: "cors",
		};

		// https://www.tutanaai.com/college-essay

		fetch("https://3154-68-65-175-69.ngrok-free.app/query", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setLoading("none");
				setValue("");

				
				setCopy(false);

				let outputStr = ""
				let i = 1
				
				data.cited_docs.forEach((element : any) => {
					if (i != 1) outputStr += "\n \n";
					
					outputStr += String.fromCharCode(11);
					

					outputStr += Object.entries(element)
					.map(([key, value]) => `${key}: ${value}`)
					.join('\n');
					outputStr += "\n";
					i++;
				  });

				setCopy(false);
				setEssay(outputStr);
				typingEffect(outputStr, setValue);
			})
			.catch(() => {
				setValue(
					"Error occured, feel free to blame Olsen :("
				);
			});
	}

	useEffect(() => {
		// Replace this with your actual API call
		// const fetchMessages = async () => {
		// const response = await fetch('https://api.example.com/messages');
		// const data = await response.json();
		// const newChatMessage = { content: newMessage, sender: 'CLL-AI-M' };
		// setMessages([...messages, data.messages]);
		// };
		
		// fetchMessages();
		const newChatMessage = { content: "Hey, how's it going? Feel free to ask me any questions about the relevant cases!", sender: 'CLL-AI-M' };
		setMessages([...messages, newChatMessage]);
		}, []);
		
		// Function to handle sending a new message
		const sendMessage = () => {
		// Replace this with your actual logic to send the message
		// For simplicity, we're just adding it to the state
		const newChatMessage = { content: newMessage, sender: 'You' };
		setMessages([...messages, newChatMessage]);
		setNewMessage('');
		};
	

	return (
		<S.OuterLayer className="TestingPage">

			<S.ButtonsWrapper>
				{/* <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          onClick={submit}
        >
          Start Writing!
        </Button> */}

				<Button
					disabled={copy}
					color="info"
					style={{ marginTop: "10px" }}
					onClick={() => {
						navigator.clipboard.writeText(essay);
					}}
					variant="contained"
				>
					Copy to clipboard
				</Button>
			</S.ButtonsWrapper>

			<br></br>
			<S.Paper>
				<S.EssayTitle><h1>Relevant Cases</h1></S.EssayTitle>
				<S.EssayText>
					<S.LoadingWrapper disp={loading}>
						<h1>Loading</h1>
						<CircularProgress></CircularProgress>
					</S.LoadingWrapper>
					{value.split("").map((c) => {
						if (c.charCodeAt(0) === 10) {
							return <br />;
						} else if (c.charCodeAt(0) === 11) {
							return <h1><strong>Case: </strong></h1>;
						} else {
							return c;
						}
					})}
				</S.EssayText>
			</S.Paper>
			<S.ChatBox style={{ width: minimized ? '40px' : '400px', height: minimized ? '40px' : '500px' }}>
			{!minimized && (
				<>
				<S.MessageContainer>
					{messages.map((message, index) => (
						<S.Message>
						<S.Sender>{message.sender}</S.Sender>
						<S.Content key={index}>{message.content}</S.Content>
						</S.Message>
					))}
					
				</S.MessageContainer>
				<S.InputContainer>
					<S.TextInput type="text" 
					placeholder="Type your message..." 
					value={newMessage}
        			onChange={(e) => setNewMessage(e.target.value)}
					/>
					<S.SubmitButton onClick={sendMessage}>Send</S.SubmitButton>
				</S.InputContainer>
				</>
			)}
			<S.MinimizeButton onClick={handleMinimize}>
				{minimized ? '+' : '-'}
			</S.MinimizeButton>
			</S.ChatBox>
		</S.OuterLayer>
	);
}

export default EssayPage;
