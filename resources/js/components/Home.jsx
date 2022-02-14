import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { Table } from "./Table";
import React from "react";
import { Error } from "./Error"
import { Button } from "./Button"
import { useNavigate } from "react-router";


export function Home(){

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(false)
	const [date, setDate] = useState("")
	const [hour, setHour] = useState("")
	const [count, setCount] = useState("")
	const navigate = useNavigate();
	const [clients, setClients] = useState([]);
	const [data, setData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: ''
	})

	const handleChange = (event) => {

		setData({	
			...data,
			[event.target.name]: event.target.value			
		})
	}

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = (event) => {
		if(event.target.className == "modalContainer"){
			setShowModal(false)
			setData({
				name: '',
				surname: '',
				email: '',
				phone: ''
			})
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		axios.post("/logout")
			.then(
				(res)=>{
					navigate("/", {replace: true})
				},
				(err)=>{

				}
			)
	}

	const handleAddClient = (event) => {
		event.preventDefault()
		axios.post("/add", data)
			.then(
				(res)=>{
					console.log(res);
					//navigate("/home", {replace: true})
					setError(false)
					setClients(res.data)					
					setShowModal(false)
					setData({
						name: '',
						surname: '',
						email: '',
						phone: ''
					})
					axios.get("/stat")
						.then(
							(res)=>{
								setCount(res.data.clientsCount);
							},
							(err)=>{
							}
						)

				},
				(err)=>{
					setShowModal(false)
					setError(true)
				}
			)
	}

	const handleDelete = (event) => {
		var checkedBoxes = document.querySelectorAll('input[name=checkBox]:checked');
		let arrayDelete = []
		for(var i=0 ; i<checkedBoxes.length; i++){
			arrayDelete.push(checkedBoxes[i].value)
		}
		var ids = {arrayDelete}
		console.log(ids);
		axios.post("/delete-user", ids)
			.then(
				(res)=>{
					setClients(res.data);
					axios.get("/stat")
						.then(
							(res)=>{
								setCount(res.data.clientsCount);
							},
							(err)=>{
							}
						)
				},
				(err)=>{
					console.log(err);
				}
			)

	} 

	useEffect(() => {
		axios.get("/list")
			.then(
				(res)=>{
					setClients(res.data);
				},
				(err)=>{
				}
			)
		setInterval(() => 	axios.get("/date")
			.then(
				(res)=>{
					setDate(res.data.date);
					setHour(res.data.hour);
				},
				(err)=>{
				}
			), 60000);

		axios.get("/date")
			.then(
				(res)=>{
					setDate(res.data.date);
					setHour(res.data.hour);
				},
				(err)=>{
				}
			)
		axios.get("/stat")
			.then(
				(res)=>{
					setCount(res.data.clientsCount);
				},
				(err)=>{
				}
			)	
		}, [])



	return(
		<div className="background">
			<div className="menu">
				<form  onSubmit={handleLogout}>
					<Button text="Cerrrar sesión" />
				</form>
			</div>

			<div className="wrapper">
				<Error visibility={error}/>
				<div className="up">
					<div className="card date">
						<div className="hour">{hour}</div>
						<div>{date}</div>
					</div>
					<div className="card stats">
						<div><img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Bar_chart_font_awesome.svg" alt="" width="50" height="50"/></div>
						<div className="clients">
							<div className="number">{count}</div>
							<div>Clientes nuevos</div>
						</div>
					</div>	
				</div>
				<Table  clients={clients}/>
				<div className="buttonsAction">
					<div>
						<button className="butttonSubmit" onClick={handleDelete}>Borrar</button>
					</div>
					<div>
						<button className="butttonSubmit" onClick={openModal}>Nuevo</button>
					</div>
				</div>
			</div>


			<div hidden={!showModal}>
				<div className="modalContainer" onClick={closeModal} >
					<div className="wrapperModal">
						<h4 className="title">Nuevo cliente</h4>
						<form className="modalForm" onSubmit={handleAddClient}>
							<div className="inputWrapper">
								<div>
									<label htmlFor="">Nombre</label>
									<input className="input" name="name" value={data.name} type="text" onChange={handleChange}/>
								</div>
								<div>
									<label htmlFor="">Apellidos</label>
									<input className="input" name="surname" value={data.surname} type="text" onChange={handleChange}/>
								</div>
							</div>
							<div className="inputWrapper">
								<div>
									<label htmlFor="">Email</label>
									<input className="input" name="email" type="text" value={data.email} onChange={handleChange}/>
								</div>
								<div>
									<label htmlFor="">Teléfono</label>
									<input className="input" name="phone" type="text" value={data.phone} onChange={handleChange}/>
								</div>
							</div>
							<div className="buttonModal">
								<Button text="Crear" />
							</div>
							
						</form>
					</div>
				</div>
			</div>

		</div>
	);
}

