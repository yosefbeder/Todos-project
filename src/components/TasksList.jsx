import React from 'react';
import Task from './Task';

export default function TasksList(props) {
  return (
    <div className="tasksList">
      {props.tasks.map(task => {
        return (
          <Task
            key={task.id}
            dragging={props.dragging}
            toggleCheck={props.toggleCheck}
            deleteTask={props.deleteTask}
            {...task}
            replace={props.replace}
          />
        );
      })}
    </div>
  );
}
