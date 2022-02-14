import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router";
import { Error } from "./Error"
import { Button } from "./Button"


export function Login(){

	const [data, setData] = useState({
		email: '',
		password: ''
	})
	const navigate = useNavigate();
	const [error, setError] = useState(false)

	const handleChange = (event) => {

		setData({	
			...data,
			[event.target.name]: event.target.value			
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		axios.post("/login", data)
			.then(
				(res)=>{
					setError(false)
					navigate("/home", {replace: true})
				},
				(err)=>{
					setError(true)
				}
			)
	}

	useEffect(() => {
		axios.post("/login", data)
			.then(
				(res)=>{
					navigate("/home", {replace: true})
				},
				(err)=>{

				}
			)		
		}, [])


	return(
	    <div className="container">
	    	<h4 className="title">Iniciar sesión</h4>
	    	<Error visibility={error}/>
			<form className="containerForm" onSubmit={handleSubmit}>
				<div className="boxInput">
					<label htmlFor="">Correo electrónico</label>
					<input type="text" name="email" className="input" onChange={handleChange}/>
				</div>

				<div className="boxInput">
					<label htmlFor="" >Contraseña</label>
					<input type="password" name="password" className="input"  onChange={handleChange}/>
				</div>

				<div>
					<Button text="Acceder" />
				</div>

				<div>
					<Link to="/register">¿No tienes cuenta? Clic aquí para registrarse</Link>
				</div>
			</form>
	    </div>
	);
}