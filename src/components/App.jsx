import React, { Component } from 'react';
import Nav from './Nav';
import Config from './Config';
import TasksList from './TasksList';
import Form from './Form';
import { v4 as uuid } from 'uuid';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [
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
      dragging: false,
    };
    this.removeChecked = this.removeChecked.bind(this);
    this.toggleDragging = this.toggleDragging.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.newTask = this.newTask.bind(this);
    this.replace = this.replace.bind(this);
  }

  removeChecked() {
    const newTasks = [...this.state.tasks].filter(task => !task.checked);
    this.setState({
      tasks: newTasks,
    });
  }

  toggleDragging() {
    const newDragging = this.state.dragging == false ? true : false;
    this.setState({ dragging: newDragging });
  }

  toggleCheck(id) {
    const newTasks = [...this.state.tasks];
    const taskIndex = newTasks.findIndex(task => task.id == id);
    newTasks[taskIndex].checked =
      newTasks[taskIndex].checked == false ? true : false;
    this.setState({
      tasks: newTasks,
    });
  }

  deleteTask(id) {
    const newTasks = [...this.state.tasks];
    const taskIndex = newTasks.findIndex(task => task.id == id);
    newTasks.splice(taskIndex, 1);
    this.setState({
      tasks: newTasks,
    });
  }

  newTask(priority, title, date) {
    const newTasks = [...this.state.tasks];
    newTasks.push({
      id: uuid(),
      checked: false,
      title,
      priority,
      date,
    });

    this.setState({
      tasks: newTasks,
    });
  }

  replace(id1, id2) {
    const newTasks = [...this.state.tasks];
    const firstIndex = newTasks.findIndex(task => task.id == id1);
    const secondIndex = newTasks.findIndex(task => task.id == id2);
    const firstTask = newTasks[firstIndex];
    const secondTask = newTasks[secondIndex];

    newTasks[firstIndex] = secondTask;
    newTasks[secondIndex] = firstTask;

    this.setState({
      tasks: newTasks,
    });
  }

  render() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    return (
      <div className="app">
        <Nav />
        <div className="app__container">
          <Config
            dragging={this.state.dragging}
            toggleDragging={this.toggleDragging}
            removeChecked={this.removeChecked}
            tasks={this.state.tasks}
          />
          <TasksList
            dragging={this.state.dragging}
            tasks={this.state.tasks}
            toggleCheck={this.toggleCheck}
            deleteTask={this.deleteTask}
            replace={this.replace}
          />
          <Form newTask={this.newTask} />
        </div>
      </div>
    );
  }
}
