import React from 'react';
import Game from './components/Game';
import './App.css';


const setRandomBackGroundColor = (): void => {
  var colors = ['#9c88ff', '#0097e6', '#e1b12c', '#27ae60', '#40739e', '#c23616', '#8e44ad', '#e67e22'];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  const myElement: HTMLElement = document.body;
  myElement.style.backgroundColor = random_color;
}

setRandomBackGroundColor();

const App = () => {
  return (
    <div className="app-wrapper">
      <Game/>
    </div>
  );
}

export default App;