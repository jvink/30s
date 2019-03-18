import React from 'react';
import Team from './components/Team';
import Dice from './components/Dice';
import Timer from './components/Timer';
import './App.css';

export default function App() {
  return (
    <div>
      <Team/>
      {/* <Dice maxDice={3}/>
      <Timer/> */}
    </div>
  );
}