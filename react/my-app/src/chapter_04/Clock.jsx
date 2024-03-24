import React from 'react';

function Clock(props){
  return(
    <div>
      <h3>안녕 리액트</h3>
      <h5>현재 시간 : {new Date().toLocaleTimeString()}</h5>
    </div>
  );
}

export default Clock;