import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import Nav from '../components/Nav';
import Config from '../components/Config';
import TasksList from './TasksList';
import Form from '../components/Form';
import TaskContext from '../contexts/task-context';

export default function App(props) {
  // State

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || [
      {
        checked: false,
        date: '2021-04-08',
        id: 'bf171321-bb6a-43af-b4f5-2026c8f5cd04',
        priority: 'med',
        title: 'Try to get any bug 😉😎',
      },
      {
        checked: false,

        date: '2021-04-08',
        id: '82f223b6-f7f9-4221-9f3e-2a87d6b11d3c',
        priority: 'high',
        title: 'Add the localStorage api',
      },
      {
        id: '65cf412e-3992-404b-b2a4-449846aeed72',
        checked: false,
        title: 'Buy coffee ☕',
        priority: 'high',
        date: '2021-04-08',
      },
      {
        id: '6c198b42-0a58-4412-b6e6-ef72f2f6ee04',
        checked: false,
        title: 'Add the drag&drop api',
        priority: 'low',
        date: '2021-04-08',
      },
      {
        id: 'a17c7269-f876-4507-89f3-9c1b7397ffee',
        checked: false,
        title: 'Buy bananas 🍌🍌🍌',
        priority: 'med',
        date: '2021-04-08',
      },
    ],
  );
  const [dragging, setDragging] = useState(false);

  // useEffects

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Functions

  const removeChecked = function () {
    const newTasks = [...tasks].filter(task => !task.checked);
    setTasks(newTasks);
  };

  const toggleDragging = function () {
    const newDragging = dragging == false ? true : false;
    setDragging(newDragging);
  };

  const toggleCheck = function (id) {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex(task => task.id == id);
    newTasks[taskIndex].checked =
      newTasks[taskIndex].checked == false ? true : false;
    setTasks(newTasks);
  };

  const deleteTask = function (id) {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex(task => task.id == id);
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
  };

  const newTask = function (priority, title, date) {
    const newTasks = [...tasks];
    newTasks.push({
      id: uuid(),
      checked: false,
      title,
      priority,
      date,
    });

    setTasks(newTasks);
  };

  const replace = function (id1, id2) {
    const newTasks = [...tasks];
    const firstIndex = newTasks.findIndex(task => task.id == id1);
    const secondIndex = newTasks.findIndex(task => task.id == id2);
    const firstTask = newTasks[firstIndex];
    const secondTask = newTasks[secondIndex];

    newTasks[firstIndex] = secondTask;
    newTasks[secondIndex] = firstTask;

    setTasks(newTasks);
  };

  return (
    <div className="app">
      <Nav />
      <div className="app__container">
        <Config
          dragging={dragging}
          toggleDragging={toggleDragging}
          removeChecked={removeChecked}
          tasks={tasks}
        />
        <TaskContext.Provider
          value={{
            dragging: dragging,
            toggleCheck: toggleCheck,
            deleteTask: deleteTask,
            replace: replace,
          }}
        >
          <TasksList tasks={tasks} />
        </TaskContext.Provider>
        <Form newTask={newTask} />
      </div>
    </div>
  );
}
