import React, { useState } from 'react';
import ITeam from './types/Types';
import Team from './components/Team';
import Game from './components/Game';
import './App.css';

export default function App() {
  const [teamsPicked, setTeamsPicked] = useState<Array<ITeam>>();

  return (
    <div>
      {teamsPicked ? <Game teams={teamsPicked}/> : <Team onTeamsCreated={(teams: Array<ITeam>) => setTeamsPicked(teams)}/>}
    </div>
  );
}