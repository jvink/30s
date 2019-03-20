import React, { useState } from 'react';
import dutchWords from '../nl.json';

export default function Words() {
    // Shuffle array
    const shuffledCategories = dutchWords.categories.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    let selectedCategories = shuffledCategories.slice(0, 5);

    // Get random word from each category
    let words: Array<string> = [];
    for (let i = 0; i < selectedCategories.length; i ++) {
        let random = selectedCategories[i].words[Math.floor(Math.random() * selectedCategories[i].words.length)];
        // Push the random word in the words state
        words.push(random);
    }

    return (
        <ul>
            {words.map((word, index) => {
                return (
                    <li key={index}>
                        {word}
                    </li>
                );
            })}
        </ul>
    );
}