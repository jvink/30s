import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import dutchWords from '../nl.json';
import ITeam from '../types/Types.jsx';
import '../styles/Words.scss';

interface Props {
    diceValue: number;
    currentTeamIndex: number;
    currentTeam: ITeam;
    currentPoints: number;
    doneTimer: () => void;
    getCorrectWords: (amount: number) => void;
}

const Words = (props: Props) => {
    const [words, setWords] = useState<Array<string>>([]);

    useEffect(() => {
        const shuffledCategories = dutchWords.categories.sort(() => 0.5 - Math.random());
        let selectedCategories = shuffledCategories.slice(0, 5);
        let cWords: Array<string> = [];

        for (let i = 0; i < selectedCategories.length; i++) {
            let random = selectedCategories[i].words[Math.floor(Math.random() * selectedCategories[i].words.length)];
            cWords.push(random);
        }

        setWords(cWords);
    }, []);

    return (
        <div className="words-wrapper">
            <Timer doneTimer={() => props.doneTimer()} />
            <div className="words-card">
                <div className="words-title-dice">
                    <div className="words-current">
                        {props.currentTeam ? <h2 className="words-current-team-title">{"Team " + props.currentTeamIndex}</h2> : null}
                        {props.currentTeam ? <span>{props.currentTeam.players[props.currentTeam.currentPlayer] + " is aan de beurt"}</span> : null}
                    </div>
                    <div className="words-dice-wrapper">
                        <h2 className="words-title">Je gooide:</h2>
                        <div className="words-dice">
                            {props.diceValue}
                        </div>
                    </div>
                </div>
                <hr className="words-hr" />
                <form className="words-form">
                    {words.map((word, index) => {
                        return (
                            <label key={index} className="words-form-label">
                                <input type="checkbox" name={word} value={word} onChange={() => {
                                    props.getCorrectWords(document.querySelectorAll('input[type="checkbox"]:checked').length);
                                }} />
                                <span className="words-form-label-text">{word}</span>
                                <span className="words-form-checkmark"></span>
                            </label>
                        );
                    })}
                </form>
                <hr className="words-hr" />
                <div className="words-result">
                    Totaal punten: <span className="words-result-value">{props.currentPoints}</span>
                </div>
            </div>
        </div>
    );
}

export default Words;