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
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
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

    console.log(firstTask, secondTask);

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
