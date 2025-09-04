import React from 'react';
import ReactDOM from 'react-dom/client';
import FirstApp from './FirstApp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirstApp value={10}/>
  </React.StrictMode>
);

