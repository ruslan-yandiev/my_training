import React from "react";

function NewTaskForm() {
    return (
        <form className="header">
            <h1>Todos</h1>

            <label>
                <input className="new-todo" placeholder="What needs to be done?" autoFocus />
            </label>
        </form>
    )
}

export default NewTaskForm;