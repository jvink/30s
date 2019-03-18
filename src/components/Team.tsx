import React, { useState } from 'react';
import RandomId from './RandomId';

// interface ITeam {
//     id: string;
//     players: Array<IPlayer>;
// }

// interface IPlayer {
//     teamId: string;
//     names: Array<string>;
// }

export default function Team() {
    const [index, setIndex] = useState(1);
    const [players, setPlayers] = useState();
    const [teams, setTeams] = useState([{id: index, players: ({teamId: index, names: ['Freek', 'Mark']})}]);

    return (
        <div>
            <h2>Wie doet er mee?</h2>
            {teams.map((team, teamIndex) => {
                return (
                    <div key={teamIndex}>
                    <h2>Team {teamIndex + 1}</h2>
                        <ul>
                            {team.players.names.map((playerName, playerIndex) => {
                                return (
                                    <div key={playerIndex}>
                                        {playerName}
                                    </div>
                                );
                            })}
                            <button>Add player</button>
                        </ul>
                    </div>
                );
            })}
            <button>Add Team</button>
        </div>
    );
}