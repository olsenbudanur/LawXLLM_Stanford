import React, { useContext, useEffect, useState } from "react";

import {
	createUserWithEmailAndPassword,
	sendSignInLinkToEmail,
	signOut,
	isSignInWithEmailLink,
	getAuth,
	signInWithEmailLink,
} from "firebase/auth";

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

//
// Reference this video: https://www.youtube.com/watch?v=PKwu15ldZ7k&t=1s
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	//
	// New user signs on thru this method.
	function signUp(email) {
		//
		// Generate a bogus password on the fly since password is irrelevent
		const chars =
			"0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const passwordLength = 15;
		let password = "";
		for (var i = 0; i <= passwordLength; i++) {
			var randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber + 1);
		}

		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		navigate("/");
		return auth.signOut();
	}

	//
	// Work-in-progress. Not complete yet.
	async function linkSignIn(email) {
		let response = 1;
		const actionCodeSettings = {
			url: "https://tutanaai.com/confirm-login", // Replace with the URL of your login page
			handleCodeInApp: true,
		};
		await sendSignInLinkToEmail(auth, email, actionCodeSettings)
			.then((e) => {
				// The link was successfully sent. Inform the user.
				// Save the email locally so you don't need to ask the user for it again
				// if they open the link on the same device.
				window.localStorage.setItem("emailForSignIn", email);
				// ...
				console.log(e);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				response = -1;
				console.log(errorCode);
				console.log(errorMessage);
				// ...
			});
		return response;
	}

	function linkSignInComplete(email) {
		if (isSignInWithEmailLink(auth, window.location.href)) {
			signInWithEmailLink(auth, email, window.location.href).then(
				(result) => {
					navigate("/");
				}
			);
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		linkSignIn,
		logOut,
		linkSignInComplete,
	};
	
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
