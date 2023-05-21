import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestingPage from "./pages/EssayPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Login from "./pages/Login";
import ConfirmLogin from "./pages/ConfirmLogin/ConfirmLogin";
import Payment from "./pages/Payment";
import Prompts from "./pages/Prompts";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/prompts" element={<PrivateRoute />}>
						<Route
							path="/prompts"
							element={<Prompts />}
						/>
					</Route>
					<Route
							path="/949ff4f6-8fb1-11ed-a1eb-0242ac120002"
							element={<TestingPage />}
						/>
					<Route
						path="/949ff4f6-8fb1-11ed-a1eb-0242ac120002"
						element={<PrivateRoute />}
					>
						<Route
							path="/949ff4f6-8fb1-11ed-a1eb-0242ac120002"
							element={<TestingPage />}
						/>
					</Route>
					<Route path="/login" element={<Login />} />
					<Route
						path="/confirm-login"
						element={<ConfirmLogin />}
					/>
					<Route path="/*" element={<Home />} />
					<Route path="/payment" element={<PrivateRoute />}>
						<Route
							path="/payment"
							element={<Payment />}
						/>
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</Router>
	);
}

export default App;
