import React, { useEffect, useRef, useState } from 'react';
import { FaFontAwesomeFlag as Flag } from 'react-icons/fa';
import { BiCalendarAlt as Calendar } from 'react-icons/bi';
import { BsCheck as SubmitIcon } from 'react-icons/bs';
import { VscClose as CancelIcon } from 'react-icons/vsc';

export default React.memo(function Form(props) {
  // State & and Refs

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [date, setDate] = useState(htmlify(new Date()));

  const inputTitle = useRef(null);

  // useEffects

  useEffect(() => {
    inputTitle.current.focus();
  }, []);

  // Functions

  function htmlify(date) {
    return date.toISOString().slice(0, 10);
  }

  const resetForm = function () {
    setTitle('');
    setPriority('low');
    setDate(htmlify(new Date()));

    inputTitle.current.focus();
  };

  const submitForm = function (e) {
    e.preventDefault();
    if (title) {
      props.newTask(priority, title, date);
      resetForm();
    } else {
      alert('Enter a title for your task or quit using the app 😡😡😡💢💢💢');
      inputTitle.current.focus();
    }
  };

  const cancelForm = function (e) {
    e.preventDefault();
    resetForm();
  };

  // changeEvent dealing functions

  onTitleChange = function (e) {
    setTitle(e.target.value);
  };

  onPriorityChange = function (e) {
    setPriority(e.target.value);
  };

  onDateChange = function (e) {
    setDate(e.target.value);
  };

  // JSX

  return (
    <form className="form">
      <h2 className="form__header header-secondary">Add a new Task</h2>
      <input
        type="text"
        className="form__title"
        placeholder="Enter The thing that you want to do..."
        value={title}
        onChange={onTitleChange}
        ref={inputTitle}
      />

      <div className={`form__select ${priority}`}>
        <Flag className="form__icon" />
        <select value={priority} onChange={onPriorityChange}>
          <option value="high">high</option>
          <option value="med">medium</option>
          <option value="low">low</option>
        </select>
      </div>

      <div className="form__date">
        <Calendar className="form__icon" />
        <input type="date" value={date} onChange={onDateChange} />
      </div>

      <button className="form__btn form__btn--confirm btn" onClick={submitForm}>
        <SubmitIcon />
        <span>Confirm</span>
      </button>
      <button className="form__btn form__btn--cancel btn" onClick={cancelForm}>
        <CancelIcon />
        <span>Cancel</span>
      </button>
    </form>
  );
});
