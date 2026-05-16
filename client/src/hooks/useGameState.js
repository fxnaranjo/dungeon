/**
 * useGameState Hook
 *
 * Custom React hook that manages all game state and logic for the board game.
 * Handles player management, dice rolling, movement, turn progression, and win detection.
 *
 * Game Flow:
 * 1. Setup phase: Players configure names and characters
 * 2. Playing phase: Players take turns rolling dice, answering math questions, and moving
 * 3. Game over phase: Winner is displayed when someone reaches square 40
 *
 * NEW: Math Question System
 * - After rolling dice, player must answer a math question within 8 seconds
 * - Correct answer: player moves the dice value
 * - Incorrect/timeout: player stays in place
 */

import { useState } from 'react';

export const useGameState = () => {
  // Game phase: 'setup' (player config), 'playing' (active game), 'gameover' (winner screen)
  const [gamePhase, setGamePhase] = useState('setup');
  
  // Array of player objects: { id, name, character, emoji, color, position }
  const [players, setPlayers] = useState([]);
  
  // Index of the player whose turn it currently is (0-based)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  // Current dice value (1-6) or null if not rolled yet
  const [diceValue, setDiceValue] = useState(null);
  
  // Boolean flag indicating if dice is currently animating
  const [isRolling, setIsRolling] = useState(false);
  
  // Boolean flag indicating if math question is being shown
  const [showMathQuestion, setShowMathQuestion] = useState(false);
  
  // Boolean flag indicating if cursed square notification is being shown
  const [showCursedNotification, setShowCursedNotification] = useState(false);
  
  // Winner player object or null if no winner yet
  const [winner, setWinner] = useState(null);

  /**
   * Starts the game with the configured players
   * Transitions from setup phase to playing phase
   *
   * @param {Array} configuredPlayers - Array of player objects from setup
   */
  const startGame = (configuredPlayers) => {
    setPlayers(configuredPlayers);
    setGamePhase('playing');
    setCurrentPlayerIndex(0);  // First player goes first
  };

  /**
   * Handles dice rolling with animation timing
   *
   * NEW Flow with Math Question (Anti-Cheat):
   * 1. Prevent multiple rolls (check isRolling flag)
   * 2. Set rolling state and clear previous value
   * 3. Wait 1 second for roll animation
   * 4. Generate random number (1-6) but DON'T show it yet
   * 5. Show math question immediately (player has 8 seconds to answer)
   * 6. After answer: reveal dice result and move player if correct
   *
   * This prevents players from seeing the dice result before answering,
   * so they can't intentionally answer wrong to avoid cursed squares.
   */
  const rollDice = () => {
    // Prevent rolling if already rolling
    if (isRolling) return;
    
    // Start rolling animation
    setIsRolling(true);
    setDiceValue(null);

    // Simulate dice roll animation (1 second)
    setTimeout(() => {
      // Generate random dice value (1-6) but keep it hidden
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      // Keep rolling animation active to hide the result
      // setIsRolling stays true
      
      // Show math question immediately without revealing dice result
      setShowMathQuestion(true);
    }, 1000);
  };

  /**
   * Handles the answer to the math question
   * Reveals the dice result after answer is submitted
   *
   * @param {boolean} isCorrect - Whether the answer was correct
   */
  const handleMathAnswer = (isCorrect) => {
    setShowMathQuestion(false);
    
    // Stop rolling animation to reveal the dice result
    setIsRolling(false);
    
    // Wait 2 seconds to show the dice result before moving
    setTimeout(() => {
      if (isCorrect) {
        // Correct answer - move the player
        movePlayer(diceValue);
      } else {
        // Incorrect answer - stay in place, move to next turn
        setTimeout(() => {
          setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
          setDiceValue(null);
        }, 500);
      }
    }, 2000);
  };

  /**
   * Moves the current player forward by the specified number of spaces
   * Handles win detection, cursed squares (17 and 28), and turn progression
   *
   * @param {number} spaces - Number of spaces to move (dice value)
   */
  const movePlayer = (spaces) => {
    setPlayers(prevPlayers => {
      // Create a copy of players array to avoid mutation
      const newPlayers = [...prevPlayers];
      const currentPlayer = newPlayers[currentPlayerIndex];
      
      // Calculate new position (can't go past square 40)
      const newPosition = Math.min(currentPlayer.position + spaces, 40);
      
      // Update the current player's position
      newPlayers[currentPlayerIndex] = {
        ...currentPlayer,
        position: newPosition
      };

      // Check if player landed on cursed square (17 or 28)
      if (newPosition === 17 || newPosition === 28) {
        // Show cursed notification
        setTimeout(() => {
          setShowCursedNotification(true);
          
          // After 3 seconds, send player back to start
          setTimeout(() => {
            setShowCursedNotification(false);
            
            // Reset player to position 0
            setPlayers(prevPlayers => {
              const resetPlayers = [...prevPlayers];
              resetPlayers[currentPlayerIndex] = {
                ...resetPlayers[currentPlayerIndex],
                position: 0
              };
              return resetPlayers;
            });
            
            // Move to next player's turn
            setTimeout(() => {
              setCurrentPlayerIndex((currentPlayerIndex + 1) % newPlayers.length);
              setIsRolling(false);
              setDiceValue(null);
            }, 1000);
          }, 3000);
        }, 1000);
      }
      // Check if player reached the goal (square 40)
      else if (newPosition === 40) {
        // Wait 1 second for movement animation, then show winner
        setTimeout(() => {
          setWinner(newPlayers[currentPlayerIndex]);
          setGamePhase('gameover');
        }, 1000);
      } else {
        // Move to next player's turn after movement animation (1 second)
        setTimeout(() => {
          // Cycle to next player (wraps around to 0 after last player)
          setCurrentPlayerIndex((currentPlayerIndex + 1) % newPlayers.length);
          // Reset dice state for next turn
          setIsRolling(false);
          setDiceValue(null);
        }, 1000);
      }

      return newPlayers;
    });
  };

  /**
   * Resets all game state to initial values
   * Returns to setup phase for a new game
   */
  const resetGame = () => {
    setGamePhase('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setIsRolling(false);
    setShowMathQuestion(false);
    setShowCursedNotification(false);
    setWinner(null);
  };

  // Return all state and functions for use in components
  return {
    gamePhase,                 // Current game phase
    players,                   // Array of all players
    currentPlayerIndex,        // Index of current player
    diceValue,                 // Current dice value
    isRolling,                 // Dice rolling state
    showMathQuestion,          // Boolean: show math question overlay
    showCursedNotification,    // Boolean: show cursed square notification
    winner,                    // Winner player object
    startGame,                 // Function to start game
    rollDice,                  // Function to roll dice
    handleMathAnswer,          // Function to handle math question answer
    resetGame                  // Function to reset game
  };
};

// Made with Bob
