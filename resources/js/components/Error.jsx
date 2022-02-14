import React from "react";
import styles from "./Error.module.css"

export function Error({visibility}){
	return(
		<div className="custom-alert" hidden={!visibility}>
			Ha ocurrido un error
		</div>
	);
}