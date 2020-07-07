import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelloMessage from './HelloMessage';
import PersonForm from './PersonForm'

ReactDOM.render(
  <React.StrictMode>
    <HelloMessage />
    <PersonForm/>
  </React.StrictMode>,
  document.getElementById('root')
);

