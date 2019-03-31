import React from 'react';
import { ReactComponent as Balloon1 } from '../resources/balloon1.svg';
import { ReactComponent as Balloon2 } from '../resources/balloon2.svg';
import { ReactComponent as Balloon3 } from '../resources/balloon3.svg';
import { ReactComponent as Balloon4 } from '../resources/balloon4.svg';
import { ReactComponent as Balloon5 } from '../resources/balloon5.svg';
import '../styles/Win.scss';

const Win = () => {
    let a = [
        <Balloon1 className="balloons" style={{top: (100*Math.random()) + "%", left: (100*Math.random()) + "%"}}/>,
        <Balloon2 className="balloons" style={{top: (100*Math.random()) + "%", left: (100*Math.random()) + "%"}}/>,
        <Balloon3 className="balloons" style={{top: (100*Math.random()) + "%", left: (100*Math.random()) + "%"}}/>,
        <Balloon4 className="balloons" style={{top: (100*Math.random()) + "%", left: (100*Math.random()) + "%"}}/>,
        <Balloon5 className="balloons" style={{top: (100*Math.random()) + "%", left: (100*Math.random()) + "%"}}/>
    ];

    return (
        <div>
            {a.map((b) => {return b})}
        </div>
    );
}

export default Win;