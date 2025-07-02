import { useState } from "react";

const TodoNew = (props) => {
    // useState hook (getter/ setter)
    const [valueInput, setValueInput] = useState("");
    const { addNewTodo } = props;
    // addNewTodo("Alan Le");
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput(""); // Reset input field after adding
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input
                onChange={(e) => { handleOnChange(e.target.value) }}
                type="input"
                value={valueInput} />
            <button
                onClick={handleClick}
                style={{ cursor: "pointer" }}>Add</button>
        </div>
    )
}

export default TodoNew;