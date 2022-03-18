const CustomContext = React.createContext();

function ToDoContext() {
    return React.useContext(CustomContext);
}