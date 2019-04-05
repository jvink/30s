import React from 'react';
import TrophyIcon from 'mdi-react/TrophyIcon';
import ITeam from '../types/Types';

interface Props {
    teams: Array<ITeam>;
    winPointsValue: number;
    setNextTeam: () => void;
}

const Result = ({teams, winPointsValue, setNextTeam}: Props) => {

    const getTeamsSortedByPoints = () => {
        var sortedTeams = teams.slice(0);
        sortedTeams.sort((team1, team2) => {
            return team2.points - team1.points;
        });

        return sortedTeams.map((team, i) => {
            return (
                <tr key={i} className="game-results-table-row">
                    <td>
                        {i === 0 ? <TrophyIcon color="#e1b12c" /> : null}
                        {i === 1 ? <TrophyIcon color="#bdc3c7" /> : null}
                        {i === 2 ? <TrophyIcon color="#cd7f32" /> : null}
                    </td>
                    <td>
                        {team.players[0]}
                    </td>
                    <td>
                        {team.points}
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="game-results-wrapper">
            <div className="game-results">
                <h2 className="game-results-title">Puntentotaal</h2>
                <p>Het team dat als eerste {winPointsValue} punten haalt, wint!</p>
                <table className="game-results-table">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>
                                Team van
                                </th>
                            <th>
                                Punten
                                </th>
                        </tr>
                        {getTeamsSortedByPoints()}
                    </tbody>
                </table>
                <button onClick={() => setNextTeam()} className="button-style-inverted">Volgende ronde</button>
            </div>
        </div>
    );
}

export default Result;