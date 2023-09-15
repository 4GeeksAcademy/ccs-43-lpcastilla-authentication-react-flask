import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
			email: event.target.email.value,       
			password: event.target.password.value, 
		};
		

		try {
            const response = await axios.post(
                process.env.BACKEND_URL+"/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );
            navigate("/login")
        } catch (error) {
            console.error("Error al registrar", error);
        }
	}
	


	return (
		<div className="container mt-5">
			<h2 className="title text-center mb-5">Sign up</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label 
						className="form-label"
						>
							Email address
					</label>
					<input 
						type="email" 
						className="form-control" 
						id="email" 
						aria-describedby="emailHelp"
						/>
				</div>
				<div className="mb-3">
					<label 
						className="form-label"
						>
							Password
					</label>
					<input 
						type="password" 
						className="form-control" 
						id="password"
						/>
				</div>
				<button 
					type="submit" 
					className="btn btn-primary d-flex mx-auto"
					>
						Register
				</button>
			</form>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
