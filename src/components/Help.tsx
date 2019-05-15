import React from 'react';
import '../styles/Help.scss';

const Help = (props: any) => {
    return (
        <div className="help-wrapper">
            <h2>Speluitleg</h2>
            <h3>Teams</h3>
            <p>Ieder team moet bestaan uit minimaal 2 spelers. Er kunnen maximaal 6 teams worden aangemaakt met elk maximaal 8 spelers.</p>
            <p>Stel hier ook het puntenaantal in dat moet worden behaald om te winnen.</p>
            <h3>Dobbelsteen</h3>
            <p>Gooi de dobbelsteen! Dit zijn eigenlijk je strafpunten, dus het beste is zo weinig mogelijk aantal ogen te gooien. Gelukkig bestaat de dobbelsteen alleen uit 0, 1 en 2 ogen.</p>
            <h3>Woorden raden</h3>
            <p>
                Als de ronde begint, moet de speler die aan de beurt is de 5 woorden uitleggen aan de teamgenoten, zonder dat diegene de worden mag benoemen.
            </p>
            <p>
                De teamgenoten mogen de woorden zelf uiteraard niet zien, maar moeten de woorden die hun teamgenoot uitlegd zo snel mogelijk raden.
            </p>
            <p>
                Als een woord geraden is, kan deze worden aangevinkt. Bij 5 woorden correct kan er worden geskipt naar de tussenuitslag.
            </p>
            <h3>Winnen</h3>
            <p>
                Het team dat als eerste het aantal punten haalt dat is ingesteld om te winnen, gaat er met de roem vandoor.
            </p>
            <div>
                <button className="button-style" onClick={() => props.resetGameStage()}>Ik snap het!</button>
            </div>
        </div>
    );
}

export default Help;