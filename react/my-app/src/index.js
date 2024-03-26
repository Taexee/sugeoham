import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Accommodate from './chapter_07/Accommodate';

// chapter_04
// const root = ReactDOM.createRoot(document.getElementById('root'));
// setInterval(() => {
//   root.render(
//     <React.StrictMode>
//       <Clock />
//     </React.StrictMode>
//   );
// }, 1000);

// chapter_05
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <CommentList />
//   </React.StrictMode>
// );

// chapter_06
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <NotificationList />
//   </React.StrictMode>
// );

// chapter_07
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Accommodate />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
