import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-around">
					<Link to="/login">
						<button className="btn btn-success">Login</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-success">Sign up</button>
					</Link>
			</div>
		</nav>
	);
};
