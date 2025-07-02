const TodoData = (props) => {
    return (
        <div className="todo-data">
            <div>Learning React</div>
            <div>Learning React</div>
            <div>{JSON.stringify(props.todoList)}</div>
        </div>
    )
}

export default TodoData;