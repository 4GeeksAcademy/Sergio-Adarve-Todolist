import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	return (
		<div className="container">
			<h1>Todos</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter" && inputValue.trim() !== "") {
								setTodos([...todos, inputValue]);
								setInputValue("");
							}
						}}
						placeholder="What needs to be done?"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={index}>
						{item}{" "}
						<FontAwesomeIcon
							icon={faTrashCan}
							onClick={() =>
								setTodos(todos.filter((_, i) => i !== index))
							}
							style={{ cursor: "pointer", color: "red" }}
						/>
					</li>
				))}
			</ul>
			<div>{todos.length} items left</div>
		</div>
	);
};

export default Home;
