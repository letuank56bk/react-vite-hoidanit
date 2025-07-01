const TodoNew = (props) => {
    console.log(">>> check props in TodoNew: ", props);
    const { addNewTodo } = props;
    // addNewTodo("Alan Le");
    const handleClick = () => {
        alert("Click me!");
    }

    const handleOnChange = (name) => {
        console.log(">>> check input value: ", name);
    }

    return (
        <div className="todo-new">
            <input
                onChange={(e) => { handleOnChange(e.target.value) }}
                type="input" />
            <button
                onClick={handleClick}
                style={{ cursor: "pointer" }}>Add</button>
        </div>
    )
}

export default TodoNew;