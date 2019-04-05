import React, { useState } from 'react';
import CurrentTeam from './CurrentTeam';
import ITeam from '../types/Types';
import '../styles/Countdown.scss';

interface Props {
    diceValue: number;
    currentTeam: ITeam;
    teams: Array<ITeam>;
    doneCountdown: () => void;
}

const Countdown = ({ diceValue, currentTeam, teams, doneCountdown }: Props) => {
    const [countdownValue, setCountdownValue] = useState<number>(5);

    const countdownToStart = (): void => {
        countdownValue > 0 ? setTimeout(() => setCountdownValue(countdownValue - 1), 1000) : doneCountdown();
    }

    countdownToStart();

    return (
        <div className="game-countdown">
            <h2 className="game-countdown-title">Klaar?</h2>
            <CurrentTeam
                currentTeam={currentTeam}
                teams={teams} />
            <div className="circle-c center-c">
                <div className="count-c">{countdownValue}</div>
                <div className="l-half-c"></div>
                <div className="r-half-c"></div>
            </div>
            <h2 className="game-countdown-title">Je gooide:</h2>
            <div className="game-countdown-dice">
                {diceValue}
            </div>
            <br />
        </div>
    );
}

export default Countdown;