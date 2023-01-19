import React from "react";
import Task from "../Task/Task";

function TaskList() {
  return (
    <ul className="todo-list">
      <li className="completed">
        <Task description="Completed task" created="created 17 seconds ago"/>
      </li>

      <li className="editing">
        <Task description="Editing task" created="created 5 minutes ago"/>
        <input type="text" className="edit" value="Editing task" />
      </li>

      <li>
        <Task description="Active task" created="created 5 minutes ago"/>
      </li>
    </ul>
  )
}

export default TaskList;