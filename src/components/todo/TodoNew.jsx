import { useState } from "react";

const TodoNew = (props) => {
    // useState hook (getter/ setter)
    const [valueInput, setValueInput] = useState("Alan Le");
    const { addNewTodo } = props;
    // addNewTodo("Alan Le");
    const handleClick = () => {
        addNewTodo(valueInput);
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input
                onChange={(e) => { handleOnChange(e.target.value) }}
                type="input" />
            <button
                onClick={handleClick}
                style={{ cursor: "pointer" }}>Add</button>
            <div>My input is: {valueInput}</div>
        </div>
    )
}

export default TodoNew;