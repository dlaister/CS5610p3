import {useEffect, useState} from 'react';

const SetEnemyBoard = ({setEnemyBoard, resetTrigger}) => {
    // Define different enemy board layouts
    const enemyBoards = [
        [  // Layout 1
            "C", "C", "C", "C", "C", null, null, null, null, null,
            null, null, null, null, null, "B", "B", "B", "B", null,
            null, null, "S", null, null, null, null, null, null, null,
            null, null, "S", null, null, "D", null, null, null, null,
            null, null, "S", null, null, "D", null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, "C", "C", "C", null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null
        ],
        [  // Layout 2
            "D", null, null, null, null, null, null, null, null, "S",
            "D", null, null, null, null, null, null, null, null, "S",
            null, null, null, null, null, null, null, null, null, "S",
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, "D", null, null, null, null, null,
            null, null, null, null, "D", null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            "C", "C", "C", null, null, null, "B", "B", "B", "B"
        ],
        [  // Layout 3
            "B", "B", "B", "B", null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, "S", null, "C", "C", "C", "C", "C", null,
            null, null, "S", null, null, null, null, null, null, null,
            null, null, "S", null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, "C", "C", "C", null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, "D", null, null, null, null, null, null, null, null,
            null, "D", null, null, null, null, null, null, null, null
        ],
        [  // Layout 4
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, "C", "S", null, null, null, null,
            null, null, "D", null, "C", "S", null, null, null, null,
            null, null, "D", null, "C", "S", null, null, null, null,
            null, null, null, null, "C", "B", "B", "B", "B", null,
            null, null, null, null, "C", "C", "C", "C", null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null
        ],
        [  // Layout 5
            "D", "D", null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, "S", "S", "S", null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, "C", "C", "C", "C", "C", null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, "B", "B", "B", "B", null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, "C", "C", "C",
            null, null, null, null, null, null, null, null, null, null
        ],
    ];

    // Track last selected board to prevent repetition
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

    useEffect(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * enemyBoards.length);
        } while (randomIndex === lastSelectedIndex); // Ensure new board each time

        setLastSelectedIndex(randomIndex);
        setEnemyBoard(enemyBoards[randomIndex]);
        console.log(`Enemy board layout ${randomIndex + 1} selected.`);
    }, [resetTrigger, setEnemyBoard]); // Runs on resetTrigger change

    return null; // No UI needed, just logic
};

export default SetEnemyBoard;
