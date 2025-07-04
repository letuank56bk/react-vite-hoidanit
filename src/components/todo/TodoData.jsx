const TodoData = (props) => {
    const { todoList, deleteTodo } = props;

    /**
     * Handles the click event for deleting a todo item.
     *
     * @param {number|string} id - The unique identifier of the todo item to delete.
     */
    const handleClick = (id) => {
        deleteTodo(id);
    }

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={() => handleClick(item.id)}>
                            Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoData;