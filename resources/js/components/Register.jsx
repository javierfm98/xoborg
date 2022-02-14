import styles from "./Register.module.css"
import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router";
import { Error } from "./Error"

export function Register(){

	const [data, setData] = useState({
		name: '',
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
		axios.post("/register-user", data)
			.then(
				(res)=>{
					navigate("/", {replace: true})
					setError(false)
				},
				(err)=>{
					setError(true)
				}
			)
	}



	return(
		<div className="container">
			<h4>Registro</h4>
			<Error visibility={error}/>
			<form className="containerForm" onSubmit={handleSubmit}>
				<div className="boxInput">
					<label htmlFor="">Nombre</label>
					<input type="text" name="name" className="input" onChange={handleChange}/>
				</div>
				<div className="boxInput">
					<label htmlFor="">Correo electrónico</label>
					<input type="email" name="email" className="input" onChange={handleChange}/>
				</div>

				<div className="boxInput">
					<label htmlFor="" >Contraseña</label>
					<input type="password" name="password" className="input" onChange={handleChange}/>
				</div>

				<div>
					<button type="submit" className="butttonSubmit">Registrarse</button>
				</div>
			</form>
		</div>
	);
}