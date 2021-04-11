import React from 'react';
import Task from '../components/Task';

export default function TasksList(props) {
  return (
    <div className="tasksList">
      {props.tasks.map(task => {
        return <Task key={task.id} {...task} />;
      })}
    </div>
  );
}
