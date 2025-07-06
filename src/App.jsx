import "./components/todo/todo.css";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const App = () => {
    const [todoList, setTodoList] = useState([]);

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

    /**
     * Adds a new todo item to the todo list.
     *
     * @param {string} name - The name or description of the new todo item.
     * @returns {void}
     */
    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000), // Random ID
            name: name,
        }

        setTodoList([...todoList, newTodo]);
    };

    /**
     * Deletes a todo item from the todo list by its unique id.
     *
     * @param {number|string} id - The unique identifier of the todo item to be deleted.
     */
    const deleteTodo = (id) => {
        const newTodo = todoList.filter(item => item.id !== id); // Filter out the todo with the specified id
        // Update the todoList state with the new array
        setTodoList(newTodo);
    }

    return (
        <>
            <Header />
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew
                    addNewTodo={addNewTodo}
                />
                {todoList.length > 0 ?
                    <TodoData
                        todoList={todoList}
                        deleteTodo={deleteTodo}
                    />
                    :
                    todoList.length === 0 &&
                    <div className="todo-image">
                        <img src={reactLogo} className="logo" alt="React Logo" />
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default App
