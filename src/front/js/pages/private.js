import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Private = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);


    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    useEffect (() => {
        actions.checkLogin(navigate)
      },[])

	return (
		<div className="container mt-5">
			<h2 className="title text-center mb-5">Vista privada de usuario</h2>
            <div className="text-center">
                <button className="btn btn-danger mt-3 mb-5 mx-auto" onClick={handleLogout}>Log out</button>
            </div>
		</div>
	);
};
