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

    const name = "Alan Le";
    const age = 18;
    const data = {
        address: "Quang Ninh",
        country: "Vietnam",
    };
    const addNewTodo = (name) => {
        alert(`call me  ${name}`);
    };

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />
            <TodoData
                name={name}
                age={age}
                data={data}
                todoList={todoList}
            />

            <div className="todo-image">
                <img src={reactLogo} className="logo" alt="React Logo" />
            </div>
        </div>
    )
}

export default App
