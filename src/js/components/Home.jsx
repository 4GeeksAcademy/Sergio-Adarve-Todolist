import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const API_BASE = "https://playground.4geeks.com/todo";
const USERNAME = "sergioadarve";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	
	useEffect(() => {
		createUser();
	}, []);

	
	const createUser = async () => {
		try {
			const res = await fetch(`${API_BASE}/users/${USERNAME}`, {
				method: "POST"
			});
			if (!res.ok && res.status !== 400) throw new Error("Error creando usuario");
			getTodos(); 
		} catch (err) {
			console.error("Error al crear usuario:", err);
		}
	};

	
	const getTodos = async () => {
		try {
			const res = await fetch(`${API_BASE}/users/${USERNAME}`);
			if (!res.ok) throw new Error("Error obteniendo tareas");
			const data = await res.json();
			setTodos(data.todos);
		} catch (err) {
			console.error("Error al obtener tareas:", err);
		}
	};

	
	const addTodo = async (label) => {
		try {
			await fetch(`${API_BASE}/todos/${USERNAME}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ label, is_done: false })
			});
			getTodos();
		} catch (err) {
			console.error("Error al agregar tarea:", err);
		}
	};

	
	const deleteTodo = async (id) => {
		try {
			await fetch(`${API_BASE}/todos/${id}`, {
				method: "DELETE"
			});
			getTodos();
		} catch (err) {
			console.error("Error al eliminar tarea:", err);
		}
	};

	
	const clearAll = async () => {
		try {
			await fetch(`${API_BASE}/users/${USERNAME}`, {
				method: "DELETE"
			});
			setTodos([]);
			createUser(); 
		} catch (err) {
			console.error("Error al eliminar todas las tareas:", err);
		}
	};

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
								addTodo(inputValue.trim());
								setInputValue("");
							}
						}}
						placeholder="What needs to be done?"
					/>
				</li>
				{todos.map((item) => (
					<li key={item.id}>
						{item.label}
						<FontAwesomeIcon
							icon={faTrashCan}
							onClick={() => deleteTodo(item.id)}
							style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
						/>
					</li>
				))}
			</ul>
			<div>{todos.length} items left</div>
			<button onClick={clearAll} style={{ marginTop: "10px" }}>
				Borrar todas las tareas
			</button>
		</div>
	);
};

export default Home;
