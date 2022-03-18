function ToDoList(props) {
    let items = [];
    const { existingToDos, dispatch } = ToDoContext();

    existingToDos.data.forEach(todo => {
        items.push(React.createElement("div", {
            className: "row to-do-items"
        }, React.createElement(ToDoItem, {
            todo: todo
        })))
    });

    return React.createElement("div", {}, items);
}