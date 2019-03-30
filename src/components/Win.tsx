import React from 'react';
import { ReactComponent as Balloon1 } from '../resources/balloon1.svg';
import { ReactComponent as Balloon2 } from '../resources/balloon2.svg';
import { ReactComponent as Balloon3 } from '../resources/balloon3.svg';
import { ReactComponent as Balloon4 } from '../resources/balloon4.svg';
import { ReactComponent as Balloon5 } from '../resources/balloon5.svg';

const Win = () => {
    return (
        <div>
            <Balloon1 style={{maxWidth: '200px'}}/>
            <Balloon2 style={{maxWidth: '200px'}}/>
            <Balloon3 style={{maxWidth: '200px'}}/>
            <Balloon4 style={{maxWidth: '200px'}}/>
            <Balloon5 style={{maxWidth: '200px'}}/>
            <div className="balloons"></div>
        </div>
    );
}

export default Win;