import "./components/todo/todo.css";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
    const [todoList, setTodoList] = useState([
        { id: 1, name: "Learn ReactJS" },
        { id: 2, name: "Watch Movie" },
    ]);

    /**
     * Generates a random integer between the specified minimum and maximum values, inclusive.
     *
     * @param {number} min - The minimum integer value (inclusive).
     * @param {number} max - The maximum integer value (inclusive).
     * @returns {number} A random integer between min and max, inclusive.
     */
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000), // Random ID
            name: name,
        }

        setTodoList([...todoList, newTodo]);
    };

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />
            <TodoData
                todoList={todoList}
            />

            <div className="todo-image">
                <img src={reactLogo} className="logo" alt="React Logo" />
            </div>
        </div>
    )
}

export default App
