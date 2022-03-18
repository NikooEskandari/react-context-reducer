function InputToDo(props) {
    const [newToDo, setNewToDo] = React.useState("");
    const { existingToDos, dispatch } = ToDoContext();

    const updateExistingToDos = () => {
        [...existingToDos.data].find(element => element.title === newToDo)
            ? app.CommonFunctions.showInvalidModal("To-do already exists.")
            : dispatch({ type: 'INSERT_NEW', payload: newToDo });
    }

    return React.createElement("div", {
        id: "add-to-do-div"
    }, React.createElement("div", {
        id: "input-div",
        className: "col-sm-10"
    }, React.createElement("input", {
        type: "text",
        placeholder: "Add todo...",
        onChange: e => setNewToDo(e.target.value)
    })), React.createElement("div", {
        id: "plus-div",
        className: "col-sm-2 pull-right"
    }, React.createElement("div", {
        id: "plus-icon",
        onClick: () => updateExistingToDos()
    }, React.createElement("i", {
        className: "fa fa-plus",
        "aria-hidden": "true"
    }))));
}