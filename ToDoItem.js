function ToDoItem(props) {
    React.useEffect(() => console.log(props.todo), [props.todo]);

    return React.createElement("div", {
            className: 'to-do-item'
        }, React.createElement("div", {
            className: 'col-sm-9',
            id: props.todo.id,
            dataTitle: props.todo.title,
            dataUpdated: props.todo.updated_at,
            dataStatus: props.todo.status
        }, props.todo.title)
        , React.createElement("div", {
            className: 'col-sm-3'
        }, React.createElement("i", {
            class: "fa fa-trash-o"
        })));
}