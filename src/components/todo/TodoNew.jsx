const TodoNew = (props) => {
    console.log(">>> check props in TodoNew: ", props);
    const { addNewTodo } = props;
    addNewTodo("Alan Le");

    return (
        <div className="todo-new">
            <input type="input" />
            <button>Add</button>
        </div>
    )
}

export default TodoNew;