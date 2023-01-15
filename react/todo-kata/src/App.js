import React from 'react';
import './style/App.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="todoapp">
      <NewTaskForm/>
      <TaskList/>
      <Footer/>
    </div>
  );
}

export default App;
