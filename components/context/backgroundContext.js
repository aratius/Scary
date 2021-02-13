import React from 'react'


const BackgroundContext = React.createContext({
  position: { x: null, y: null },
  updatePosition: () => {},
});
export default BackgroundContext;