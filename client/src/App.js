import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NavBar from './Components/NavBar';

import UserContext from "./Context/UserContext";

function App() {
	const [userData, setUserData] = useState({
		user: undefined,
		token: undefined,
	});

	const checkLoggedIn = async () => {
		let token = localStorage.getItem("auth-token");
		if (token === null) {
			localStorage.setItem("auth-token", "");
		} else {
			try {
				const userRes = await axios.get("/users", {
					headers: { "x-auth-token": token },
				});

				setUserData({ token, user: userRes.data });
			} catch (err) {
				console.log("User must login");
			}
		}
	};

	const logout = () => {
		setUserData({ token: undefined, user: undefined });
		localStorage.setItem("auth-token", "");
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	return (
		<div className="App">
			<Router>
				{!userData.user ? (
					<nav className="navbar navbar-expand-lg navbar-light">
						<ul className="navbar-nav mr-auto">
							<li class="nav-item">
								<Link to="/login">Login</Link>
							</li> 
							<li class="nav-item">
								<Link to="/register">Register</Link>
							</li>	
					   </ul>
					</nav>
				) : (
					<nav className="navbar navbar-expand-lg navbar-light">
					<Link to="/" onClick={logout}>
						Logout
					</Link>
					</nav>
				)}
	

				<UserContext.Provider value={{ userData, setUserData }}>
	
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/" component={Home} />
					</Switch>
				</UserContext.Provider>
			</Router>
		</div>
	);
}

export default App;
