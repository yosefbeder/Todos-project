import React, { useState } from 'react';
import { BsCheck as Check, BsCheckAll as Checked } from 'react-icons/bs';
import { MdDelete as Delete } from 'react-icons/md';

export default function Task(props) {
  const [dragging, setDragging] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);

  const datePriviewOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const dragStartHandler = e => {
    setDragging(true);
    e.dataTransfer.setData('text/plain', props.id);
  };
  const dragEndHandler = () => {
    setDragging(false);
  };
  const dragEnterHandler = () => {
    setDraggingOver(true);
  };
  const dragLeaveHanlder = () => {
    setDraggingOver(false);
  };
  const dragOverHandler = e => {
    e.preventDefault();
  };
  const dropHandler = e => {
    e.preventDefault();
    setDraggingOver(false);
    props.replace(e.dataTransfer.getData('text/plain'), props.id);
  };

  return (
    <div
      className={`task ${props.priority} ${props.checked ? 'checked' : ''} ${
        dragging ? 'dragging' : ''
      } ${draggingOver ? 'draggingover' : ''}`}
      draggable={props.dragging ? 'true' : 'false'}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    >
      {props.dragging ? (
        <div className="task__drag">
          <div className="task__circle-group">
            <div className="task__circle"></div>
            <div className="task__circle"></div>
          </div>
          <div className="task__circle-group">
            <div className="task__circle"></div>
            <div className="task__circle"></div>
          </div>
          <div className="task__circle-group">
            <div className="task__circle"></div>
            <div className="task__circle"></div>
          </div>
        </div>
      ) : null}

      <div
        className="task__content"
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHanlder}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
      >
        <button
          className="task__complete"
          onClick={() => props.toggleCheck(props.id)}
        >
          {props.checked ? <Checked /> : <Check />}
        </button>
        <div className="task__desc">
          <div className="task__title">{props.title}</div>
          {props.date ? (
            <div className="task__date">
              {Intl.DateTimeFormat('en-GB', datePriviewOptions).format(
                new Date(props.date),
              )}
            </div>
          ) : null}
        </div>

        <button
          className="task__btn btn"
          onClick={() => props.deleteTask(props.id)}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
}
