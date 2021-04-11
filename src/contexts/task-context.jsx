import React from 'react';

export default taskContext = React.createContext({
  dragging: false,
  toggleCheck: () => {},
  deleteTask: () => {},
  replace: () => {},
});
