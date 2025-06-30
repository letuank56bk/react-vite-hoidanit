import "./components/todo/todo.css";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";

const App = () => {
    const name = "Alan Le";
    const age = 18;
    const data = {
        address: "Quang Ninh",
        country: "Vietnam",
    }
    const addNewTodo = (name) => {
        alert(`call me  ${name}`);
    }

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
            />

            <div className="todo-image">
                <img src={reactLogo} className="logo" alt="React Logo" />
            </div>
        </div>
    )
}

export default App
