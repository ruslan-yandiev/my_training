import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header.js';
import SearchPanel from './components/search-panel.js';
import TodoList from './components/todo-list';

function App() {
    const value = `<script>alert("....")</script>`;
    const todoData = [
        { label: 'Drink Coffee', important: false },
        { label: 'Make Awesome App', important: true },
        { label: 'Have a lunch', important: false },
    ];

    return (
        <div>
            {value}
            <AppHeader />
            <SearchPanel />
            <TodoList todos={todoData} />
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));
