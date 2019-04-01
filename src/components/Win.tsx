import React from 'react';
import ITeam from '../types/Types';
import '../styles/Win.scss';
const Confetti = require('react-confetti');

type Props = {
    team: ITeam;
}

const Win = ({team}: Props) => {
    return (
        <div className="win-wrapper">
            <Confetti/>
            <h1>Gefeliciteerd!</h1>
            <h2>Het team van {team.players[0]} wint!</h2>
            <button className="button-style" onClick={() => window.location.replace("/")}>Speel opnieuw</button>
        </div>
    );
}

export default Win;