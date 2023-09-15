import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

		try {
			const API_URL = process.env.BACKEND_URL;
			const requestConfig = {
			  method: "POST",
			  headers: {
				"Content-type": "application/json",
				"Accept": "application/json"
			  },
			  body: JSON.stringify(data)
			};
			const response = await fetch(API_URL + "/api/signup", requestConfig);
			if (response.status !== 201) {
			  console.log("Error en la solicitud. Code: ", response.status);
			  return;
			}
			const responseBody = await response.json();
			console.log("API response:", responseBody);
			navigate("/login")
		  } catch (error) {
			console.log(error);
		  }
	}
	


	return (
		<div className="container mt-5">
            <h2 className="title text-center mb-5">Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label 
						for="exampleInputEmail1" 
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
						for="exampleInputPassword1" 
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
						Login
				</button>
			</form>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
