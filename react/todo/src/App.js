import React from 'react';
import AppHeader from './components/AppHeader/'; // без указания прямо о том, что это именно директория (папка) поставив / webpack корректно не парсит. Возможно из-за того, что отсортирован последним в списке и тупо не доходит до index.js и принудительно указываем поставив в конце / дав знать webpack что искать точку входа во всей директории
import ItemStatusFilter from './components/ItemStatusFilter';
import SearchPanel from './components/SearchPanel';
import TodoList from './components/TodoList';
import './style/App.css';

function App() {
  const todoData = [ 
    {label: 'Drink Coffee', important: false, id: 1},
    {label: 'Build Awesome App', important: true, id: 2},
    {label: 'Have i lunch', important: false, id: 3}
  ];

  return (
    <div className="App">
      <AppHeader toDo={1} done={3} />

      <div className="top-panel d-flex">
        <SearchPanel/>
        <ItemStatusFilter/>
      </div>

      <TodoList todos={todoData} />
    </div>
  );
}

export default App;
