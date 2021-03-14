import React from 'react'

import BackgroundContext from "../context/backgroundContext";

//送るだけ、空の要素
export default function BackgroundContextSender(props){
  const { position } = props;
  const { updatePosition } = React.useContext(BackgroundContext);
  React.useEffect(() => {
    updatePosition(position)
  });

  return null;
}
