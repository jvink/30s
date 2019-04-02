import React from 'react';
import IMG from '../30s.png';
import '../styles/Logo.scss';

const Logo = () => (
    <div className="logo-wrapper">
        <img className="logo" src={IMG}/>
    </div>
);

export default Logo;