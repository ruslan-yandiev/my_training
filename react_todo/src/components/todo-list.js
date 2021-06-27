import React from 'react';

import TodoListItem from './todo-list-item.js';

const TodoList = ({ todos }) => {
    const items = ['Drink Coffee', 'Build Awesome App'];
    const elements = todos.map((item) => {
        return (
            <li>
                <TodoListItem {...item} />
            </li>
        );
    });

    return (
        <ul>
            {elements}
            <li>{items[1]}</li>
        </ul>
    );
};

export default TodoList;
