import React from 'react';
import Logo from './components/Logo';
import Game from './components/Game';
import Credit from './components/Credit';
import './App.scss';


const setRandomBackGroundColor = (): void => {
  const colors = ['#9c88ff', '#0097e6', '#e1b12c', '#27ae60', '#40739e', '#c23616', '#8e44ad', '#e67e22'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const body: HTMLElement = document.body;
  body.style.backgroundColor = randomColor;
}

setRandomBackGroundColor();

const App = () => {
  return (
    <div className="app-wrapper">
      <Logo/>
      <Game/>
      <Credit/>
    </div>
  );
}

export default App;