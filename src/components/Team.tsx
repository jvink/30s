import React, { useState } from 'react';
import RandomId from './RandomId';

interface ITeam {
    id: number;
    players: Array<string>;
}

export default function Team() {
    const [teams, setTeams] = useState<Array<ITeam>>([{id: RandomId(), players: []}]);
    const [inputs, setInputs] = useState(['']);

    function addPlayer(teamIndex: number): void {
        setTeams(prevTeams => {
            return prevTeams.map((team, idx) => {
                if(teamIndex === idx) {
                    return {...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players, inputs[teamIndex]]};
                } else {
                    return team;
                }
            });
        });
    }

    function removePlayer(teamIndex: number, playerIndex: number): void {
        setTeams(prevTeams => {
            return prevTeams.map((team, tidx) => {
                if(teamIndex === tidx) {
                    team.players.map((player, pidx) => {
                        if (playerIndex === pidx) {
                            return {...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players.splice(playerIndex, 1)]};
                        } else {
                            return team;
                        }
                    });
                    return team;
                } else {
                    return team;
                }
            });
        });
    }

    function addTeam():void {
        setInputs(inputs.concat(''));
        setTeams(teams.concat({id: RandomId(), players: []}));
    }

    function handleSubmit(e: any, teamIndex: number): void {
        e.preventDefault();
        setInputs(inputs.map((value, j) => {
            if (teamIndex === j) value = "";
            return value;
        }));
    }

    function handleChange(e: any, teamIndex: number): void {
        setInputs(
            inputs.map((value, j) => {
                if (teamIndex === j) value = e.target.value;
                return value;
            })
        )
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
                                        <button onClick={() => removePlayer(teamIndex, playerIndex)}>X</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <form onSubmit={(event) => handleSubmit(event, teamIndex)}>
                            <label>Player name:</label>
                            <input value={inputs[teamIndex]} onChange={(event) => handleChange(event, teamIndex)}/>
                            <button onClick={() => addPlayer(teamIndex)}>Add player</button>
                        </form>
                    </div>
                );
            })}
            <button onClick={() => addTeam()}>Add team</button>
        </div>
    );
}