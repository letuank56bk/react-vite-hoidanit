import { useState } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("");
    const { addNewTodo } = props;

    /**
     * Handles the click event for adding a new todo item.
     * Calls the addNewTodo function with the current input value,
     * then resets the input field to an empty string.
     */
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput(""); // Reset input field after adding
    }

    /**
     * Handles the change event for the input field.
     * Updates the input value state with the provided name.
     *
     * @param {string} name - The new value to set for the input.
     */
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