import React, { useState } from 'react';
import dutchWords from '../nl.json';

type Props = {
    getNumberOfCorrectWords: () => void;
}

export default function Words({getNumberOfCorrectWords}: Props) {
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

    console.log(document.querySelectorAll('input[type="checkbox"]:checked').length);

    return (
        <form>
            {words.map((word, index) => {
                return (
                    <span key={index}>
                        <input type="checkbox" name={word} value={word}/>
                        {word}
                    </span>
                );
            })}
        </form>
    );
}