import React from "react";
import styles from "./Button.module.css"

export function Button({text}){
	return(
		<button className="butttonSubmit">{text}</button>
	);
}