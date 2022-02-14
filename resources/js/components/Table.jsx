import styles from "./Table.module.css";
import React from "react";
import { useState, useEffect } from "react";

export function Table({clients}){


	return(
		<div className="boxTable">
			<table className="customTable">
				<thead>
				<tr>
					<th></th>
					<th>nombre</th>
					<th>apellido</th>
					<th>correo</th>
					<th>teléfono</th>
				</tr>
				<tr className="borderTable"></tr>
				</thead>
					<tbody>
					{clients.map((client) =>(
						<tr key={client.id}>
						<td><input type="checkbox" name="checkBox" value={client.id}/></td>
						<td> {client.name} </td>
						<td> {client.surname} </td>
						<td> {client.email} </td>
						<td> {client.phone} </td>
						</tr>
					))}
					<tr className="spacer"></tr>
				</tbody>                   
			</table>
		</div>
	);
}