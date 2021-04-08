import React from 'react';

export default function Config(props) {
  // needs tasks state and a function for changing dragging state

  const clickHandler = () => {
    console.log('clicked');
    props.toggleDragging();
  };

  return (
    <div className="configs">
      <div>Tasks left: {props.tasks?.filter(t => !t.checked).length}</div>
      <button className="configs__btn btn" onClick={props.removeChecked}>
        Remove All Checked Tasks
        <span>&rarr;</span>
      </button>
      <div className="toggle">
        <button
          className={`toggle__btn btn ${
            props.dragging ? 'active' : 'not-active'
          }`}
          onClick={clickHandler}
        ></button>
        <div>Dragging</div>
      </div>
    </div>
  );
}
