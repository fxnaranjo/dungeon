/**
 * GameBoard Component
 *
 * Main game board component that displays the serpentine board layout,
 * dice, turn indicator, and player information during gameplay.
 *
 * NEW: Includes math question overlay after dice roll
 * NEW: Includes cursed square notification when landing on square 17
 *
 * Props:
 * - players: Array of player objects with position, name, emoji, color
 * - currentPlayerIndex: Index of the player whose turn it is
 * - onRollDice: Function to handle dice rolling
 * - diceValue: Current dice value (1-6) or null
 * - isRolling: Boolean indicating if dice is currently rolling
 * - showMathQuestion: Boolean indicating if math question should be shown
 * - showCursedNotification: Boolean indicating if cursed notification should be shown
 * - onMathAnswer: Function to handle math question answer
 * - onRestart: Function to restart the game
 */

import { useState, useEffect } from 'react';
import BoardSquare from './BoardSquare';
import Dice from './Dice';
import TurnBanner from './TurnBanner';
import MathQuestion from './MathQuestion';
import CursedNotification from './CursedNotification';
import '../styles/GameBoard.css';

const GameBoard = ({ players, currentPlayerIndex, onRollDice, diceValue, isRolling, showMathQuestion, showCursedNotification, onMathAnswer, onRestart }) => {
  // Get the current player object for display
  const currentPlayer = players[currentPlayerIndex];

  /**
   * Creates a serpentine (snake-like) path for the board squares
   *
   * The board has 41 squares (0-40) arranged in 6 rows of 7 squares each.
   * Each row alternates direction to create a winding path:
   *
   * Row 1 (even): 0 → 1 → 2 → 3 → 4 → 5 → 6
   *                                         ↓
   * Row 2 (odd):  13 ← 12 ← 11 ← 10 ← 9 ← 8 ← 7
   * ↓
   * Row 3 (even): 14 → 15 → 16 → 17 → 18 → 19 → 20
   *                                               ↓
   * And so on...
   *
   * @returns {Array} Array of square objects with number and grid position
   */
  const createSerpentinePath = () => {
    const squares = [];
    const squaresPerRow = 7;  // Number of squares in each row
    const totalSquares = 41;   // Total squares from 0 to 40
    
    // Loop through each square number
    for (let i = 0; i < totalSquares; i++) {
      // Calculate which row this square belongs to (0-based)
      const row = Math.floor(i / squaresPerRow);
      
      // Calculate position within the row (0-6)
      const col = i % squaresPerRow;
      
      // Determine if this is an even row (0, 2, 4) or odd row (1, 3, 5)
      const isEvenRow = row % 2 === 0;
      
      // For even rows: go left to right (position = col)
      // For odd rows: go right to left (position = reversed)
      const position = isEvenRow ? col : (squaresPerRow - 1 - col);
      
      // Store square data with grid positioning
      squares.push({
        number: i,                // Square number (0-40)
        gridRow: row + 1,         // CSS Grid row (1-based)
        gridColumn: position + 1  // CSS Grid column (1-based)
      });
    }
    
    return squares;
  };

  // Generate the serpentine path layout
  const serpentineSquares = createSerpentinePath();

  return (
    <div className="game-board-container">
      {/* Header section with turn banner only */}
      <div className="game-header">
        {/* Shows whose turn it is with player name and emoji */}
        <TurnBanner player={currentPlayer} />
      </div>

      {/* Board wrapper for styling and layout */}
      <div className="board-wrapper">
        {/* Main game board with serpentine layout */}
        <div className="game-board serpentine">
          {/* Render each square in the serpentine path */}
          {serpentineSquares.map(square => (
            <BoardSquare
              key={square.number}
              number={square.number}
              // Filter players to show only those on this square
              players={players.filter(p => p.position === square.number)}
              // Apply grid positioning for serpentine layout
              style={{
                gridRow: square.gridRow,
                gridColumn: square.gridColumn
              }}
            />
          ))}
        </div>
      </div>

      {/* Dice component for rolling */}
      <Dice
        value={diceValue}              // Current dice value or null
        isRolling={isRolling}           // Animation state
        onRoll={onRollDice}             // Roll handler
        disabled={isRolling}            // Disable during roll
        playerColor={currentPlayer.color}  // Color for visual feedback
      />

      {/* Player information panel showing all players */}
      <div className="players-info">
        {players.map((player, index) => (
          <div
            key={player.id}
            // Highlight the active player
            className={`player-info ${index === currentPlayerIndex ? 'active' : ''}`}
            // Border color matches player color
            style={{ borderColor: player.color }}
          >
            <span className="player-emoji">{player.emoji}</span>
            <span className="player-name">{player.name}</span>
            <span className="player-position">Square {player.position}</span>
          </div>
        ))}
      </div>

      {/* Button to restart the game - moved to bottom */}
      <button className="restart-btn" onClick={onRestart}>
        🔄 RESTART GAME
      </button>

      {/* Math Question Overlay - shown after dice roll */}
      {showMathQuestion && (
        <MathQuestion
          onAnswer={onMathAnswer}
          playerColor={currentPlayer.color}
        />
      )}

      {/* Cursed Square Notification - shown when landing on square 17 */}
      {showCursedNotification && (
        <CursedNotification
          playerName={currentPlayer.name}
          playerColor={currentPlayer.color}
        />
      )}
    </div>
  );
};

export default GameBoard;

// Made with Bob
