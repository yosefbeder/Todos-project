import React, { Component } from 'react';
import { FaFontAwesomeFlag as Flag } from 'react-icons/fa';
import { BiCalendarAlt as Calendar } from 'react-icons/bi';
import { BsCheck as SubmitIcon } from 'react-icons/bs';
import { VscClose as CancelIcon } from 'react-icons/vsc';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      priority: 'low',
      date: this.htmlify(new Date()),
      // default date (today)
    };
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changePriority = this.changePriority.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    this.inputTitle.focus();
  }

  shouldComponentUpdate(_, nextState) {
    return nextState !== this.state;
  }

  resetForm() {
    this.setState({
      title: '',
      priority: 'low',
      date: this.htmlify(new Date()),
    });
    this.inputTitle.focus();
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.title) {
      this.props.newTask(
        this.state.priority,
        this.state.title,
        this.state.date,
      );
      this.resetForm();
    } else {
      alert('Enter a title for your task or quit using the app 😡😡😡💢💢💢');
      this.inputTitle.focus();
    }
  }

  cancelForm(e) {
    e.preventDefault();
    this.resetForm();
  }

  changeTitle(e) {
    const newTitle = e.target.value;

    this.setState({
      title: newTitle,
    });
  }

  changePriority(e) {
    const newPriority = e.target.value;

    this.setState({
      priority: newPriority,
    });
  }

  changeDate(e) {
    const newDate = e.target.value;

    this.setState({
      date: newDate,
    });
  }

  htmlify(date) {
    return date.toISOString().slice(0, 10);
  }

  render() {
    return (
      <form className="form">
        <h2 className="form__header header-secondary">Add a new Task</h2>
        <input
          type="text"
          className="form__title"
          placeholder="Enter The thing that you want to do..."
          value={this.state.title}
          onChange={this.changeTitle}
          ref={el => {
            this.inputTitle = el;
          }}
        />

        <div className={`form__select ${this.state.priority}`}>
          <Flag className="form__icon" />
          <select value={this.state.priority} onChange={this.changePriority}>
            <option value="high">high</option>
            <option value="med">medium</option>
            <option value="low">low</option>
          </select>
        </div>

        <div className="form__date">
          <Calendar className="form__icon" />
          <input
            type="date"
            value={this.state.date}
            onChange={this.changeDate}
          />
        </div>

        <button
          className="form__btn form__btn--confirm btn"
          onClick={this.submitForm}
        >
          <SubmitIcon />
          <span>Confirm</span>
        </button>
        <button
          className="form__btn form__btn--cancel btn"
          onClick={this.cancelForm}
        >
          <CancelIcon />
          <span>Cancel</span>
        </button>
      </form>
    );
  }
}
