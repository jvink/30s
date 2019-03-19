import React, { useState } from 'react';

export default function Words() {
    const topics = ['supermarket', 'gaming', 'obama', 'music', 'elephant', 'radioactive'];
    const baseUrl = "https://api.datamuse.com/words?topics=";
    const [] = useState();

    function getWords(topic: string) {
        fetch(baseUrl + topic)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
    }
    getWords(topics[0]);
    
    return (
        <p>
            Words
        </p>
    );
}