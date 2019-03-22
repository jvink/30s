import React, { useState, useEffect } from 'react';
import dutchWords from '../nl.json';

interface Props {
    getCorrectWords: (amount: number) => void
}

const Words = (props: Props) => {
    const [words, setWords] = useState<Array<string>>([]);

    useEffect(() => {
        // Shuffle array
        const shuffledCategories = dutchWords.categories.sort(() => 0.5 - Math.random());
        // Get sub-array of first n elements after shuffled
        let selectedCategories = shuffledCategories.slice(0, 5);
        
        // Get random word from each category
        let cWords: Array<string> = [];
        
        for (let i = 0; i < selectedCategories.length; i ++) {
            let random = selectedCategories[i].words[Math.floor(Math.random() * selectedCategories[i].words.length)];
            // Push the random word in the words state
            cWords.push(random);
        }

        setWords(cWords);
    }, []);

    return (
        <form>
            {words.map((word, index) => {
                return (
                    <span key={index}>
                        <input type="checkbox" name={word} value={word} onChange={() => {
                            props.getCorrectWords(document.querySelectorAll('input[type="checkbox"]:checked').length);
                        }}/>
                        {word}
                    </span>
                );
            })}
        </form>
    );
}

export default Words;