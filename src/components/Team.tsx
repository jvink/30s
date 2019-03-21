import React, { useState } from 'react';
import ITeam from '../types/Types';

const Team = (props: any) => {
    const faketeams = [{players: ['Freek Vonk', 'Geert Wilders', 'Mark Rutte'], points: 0}, {players: ['Thierry Baudet', 'Kees van der Staaij', 'Jesse Klaver'], points: 0}]
    const [teams, setTeams] = useState<Array<ITeam>>(faketeams);
    const [inputs, setInputs] = useState<Array<string>>(['']);

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
                    team.players.map((p, pidx) => {
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
        setTeams(prevTeams => {
            return prevTeams.concat({players: [], points: 0});
        });
    }

    function removeTeam(teamIndex: number):void {
        setTeams(prevTeams => {
            const list = prevTeams.filter((i, j) => teamIndex !== j);
            return list;
        });
    }
    
    function addPoints(teamIndex: number, correct: number, dice: number):void {
        setTeams(prevTeams => {
            return prevTeams.map((team, tidx) => {
                if(teamIndex === tidx) {
                    return {...prevTeams[teamIndex], points: prevTeams[teamIndex].points + (correct - dice)};
                } else {
                    return team;
                }
            });
        });
    }

    function handleSubmit(e: any, teamIndex: number): void {
        e.preventDefault();
        setInputs(
            inputs.map((value, j) => {
                if (teamIndex === j) value = "";
                return value;
            })
        );
    }

    function handleChange(e: any, teamIndex: number): void {
        setInputs(
            inputs.map((value, j) => {
                if (teamIndex === j) value = e.target.value;
                return value;
            })
        );
    }

    function handleStartGame(): any {
        props.onTeamsCreated(teams);
    }

    if (props.dothething) {console.log("AMOUR FIRE")}

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
                        <button onClick={() => removeTeam(teamIndex)}>X</button>
                    </div>
                );
            })}
            <button onClick={() => addTeam()}>Add team</button>
            <button onClick={() => handleStartGame()}>Start Game</button>
        </div>
    );
}

export default Team;