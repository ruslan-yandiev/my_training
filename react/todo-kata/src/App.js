import React from 'react';
import './style/App.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

function App() {
  // const data = [
  //   {description: 'Completed task', created: 'created 17 seconds ago'},
  //   {description: 'Completed task', created: 'created 17 seconds ago'},
  //   {description: 'Completed task', created: 'created 17 seconds ago'}
  // ];

  return (
    <div className="todoapp">
      <section className='main'>
        <NewTaskForm/>
        <TaskList/>
        <Footer/>
      </section>
    </div>
  );
}

export default App;
