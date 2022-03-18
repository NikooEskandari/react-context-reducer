'use strict';

$(function () {
    function ToDoContainer(props) {
        const initialState = {
            status: 'idle',
            error: null,
            data: [],
        };

        const [existingToDos, dispatch] = React.useReducer(ToDoReducer, initialState);

        const providerState = {
            existingToDos,
            dispatch
        }

        React.useEffect(() => {
            let cancelRequest = false;
            let url = Routing.generate('todo_todo_reducer', {_locale: window.locale});
            if (!url) return;

            const fetchData = async () => {
                dispatch({type: 'FETCHING'});

                const response = await fetch(url);
                const data = await response.json();

                dispatch({type: 'FETCHED', payload: data.todos});
            };

            fetchData();

            return function cleanup() {
                cancelRequest = true;
            };
        }, []);


        return React.createElement(CustomContext.Provider, {
                value: providerState
            }, React.createElement("div", null
                , React.createElement("div", {
                    id: "navbar",
                    className: "col-sm-2"
                }, React.createElement(Navbar, null))
                , React.createElement("div", {
                        className: "col-sm-10"
                    }, React.createElement("div", {
                            id: "to-do-container"
                        }, React.createElement("div", {
                            className: "row header"
                        }, React.createElement(Header, null))
                        , React.createElement("div", {
                            className: "row input-to-do"
                        }, React.createElement(InputToDo, {}))
                        , React.createElement("div", {
                            className: "row to-do-list"
                        }, React.createElement(ToDoList, {}))
                    )
                )
            )
        );
    }

    ReactDOM.render(React.createElement(ToDoContainer), document.getElementById('root'));

});
