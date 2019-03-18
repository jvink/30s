import React, { useState } from 'react';
import RandomId from './RandomId';

interface ITeam {
    id: number;
    players: Array<string>;
}

export default function Team() {
    const [teams, setTeams] = useState<Array<ITeam>>([{id: RandomId(), players: []}]);
    const [input, setInput] = useState('');

    function addPlayer(teamIndex:number):void {
        setTeams(prevTeams => {
            return prevTeams.map((team, idx) => {
                if(teamIndex === idx) {
                    return {...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players, input]};
                } else {
                    return team;
                }
            });
        });
    }

    function addTeam():void {
        setTeams(teams.concat({id: RandomId(), players: []}));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setInput('');
    }

    function handleChange(e: any, idx: number, input:string) {
        console.log(input);
        setInput(e.target.value);
    }

    return (
        <div>
            {teams.map((team, teamIndex) => {
                return (
                    <div key={teamIndex}>
                        <h2>Team {teamIndex + 1}</h2>
                        <ul>
                            {team.players.map((player, playerIndex) => {
                                return (
                                    <li key={playerIndex}>
                                        {player}
                                    </li>
                                );
                            })}
                        </ul>
                        <form onSubmit={handleSubmit}>
                            <label>Voeg een speler toe:</label>
                            <input value={input} onChange={(event) => handleChange(event, teamIndex, "input"+[teamIndex])}/>
                            <button onClick={() => addPlayer(teamIndex)}>Add player</button>
                        </form>
                    </div>
                );
            })}
            <button onClick={() => addTeam()}>Add team</button>
        </div>
    );
}