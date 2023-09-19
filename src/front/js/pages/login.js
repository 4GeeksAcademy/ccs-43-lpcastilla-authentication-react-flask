import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
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
                `${process.env.BACKEND_URL}/api/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );
			console.log("Response object:", response);  // Add this line to log the response object
			actions.savetoken(response.data.token)
            console.log("Inicio de sesión exitoso", response.data);
			navigate("/private")
        } catch (error) {
			console.error("Error al iniciar sesión", error.response.data);
		}
		
	}
	

	return (
		<div className="container mt-5">
            <h2 className="title text-center mb-5">Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label 
						htmlFor="exampleInputEmail1" 
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
						htmlFor="exampleInputPassword1" 
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
