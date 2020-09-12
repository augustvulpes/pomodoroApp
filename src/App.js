import React from 'react';

import ProgressCircle from './containers/ProgressCircle/ProgressCircle';

import './App.css';

const App = props => {
  // An idea for further development:
  // Implement feature that allows user to select preferred time for pomodoro
  return (
    <div className="content">
      <h1>Pomodoro Timer</h1>
      <ProgressCircle duration={25 * 60 * 1000}/>
      <div className="info">
        <p>Made with <span id="heart">❤</span> by <a id="author" href="https://github.com/NOLONHUM/pomodoroApp" rel="noopener noreferrer" target="_blank">NOLONHUM</a></p>
      </div>
    </div>
  );
}

export default App;
