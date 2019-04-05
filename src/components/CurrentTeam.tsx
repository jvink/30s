import React from 'react';
import ITeam from '../types/Types';

interface Props {
    currentTeam: ITeam;
    teams: Array<ITeam>;
}

const CurrentTeam = ({ currentTeam, teams }: Props) => (
    <span className="game-current">
        {currentTeam ? <h2>{"Team " + ((teams.findIndex((team) => team === currentTeam)) + 1)}</h2> : null}
        {currentTeam ? currentTeam.players[currentTeam.currentPlayer] + " is aan de beurt" : null}
    </span>
);

export default CurrentTeam;