/**
 * App Component - Main Application Entry Point
 *
 * Root component that orchestrates the entire game.
 * Manages game state and renders different screens based on game phase:
 *
 * Game Phases:
 * 1. 'setup' - Player configuration screen
 * 2. 'playing' - Active game with board, dice, and turns
 * 3. 'gameover' - Winner celebration screen
 *
 * The game state is managed by the useGameState custom hook,
 * which handles all game logic and state transitions.
 */

import { useGameState } from './hooks/useGameState';
import SetupScreen from './components/SetupScreen';
import GameBoard from './components/GameBoard';
import WinnerScreen from './components/WinnerScreen';
import './App.css';

function App() {
  // Destructure all game state and functions from custom hook
  const {
    gamePhase,                // Current phase: 'setup', 'playing', or 'gameover'
    players,                  // Array of all player objects
    currentPlayerIndex,       // Index of player whose turn it is
    diceValue,               // Current dice value (1-6) or null
    isRolling,               // Boolean: is dice currently rolling?
    showMathQuestion,        // Boolean: show math question overlay?
    showCursedNotification,  // Boolean: show cursed square notification?
    winner,                  // Winner player object or null
    startGame,               // Function to transition from setup to playing
    rollDice,                // Function to roll the dice
    handleMathAnswer,        // Function to handle math question answer
    resetGame                // Function to restart game (back to setup)
  } = useGameState();

  return (
    <div className="app">
      {/* Phase 1: Setup Screen - Configure players */}
      {gamePhase === 'setup' && (
        <SetupScreen onStartGame={startGame} />
      )}

      {/* Phase 2: Playing - Main game board with math questions and cursed square */}
      {gamePhase === 'playing' && (
        <GameBoard
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          onRollDice={rollDice}
          diceValue={diceValue}
          isRolling={isRolling}
          showMathQuestion={showMathQuestion}
          showCursedNotification={showCursedNotification}
          onMathAnswer={handleMathAnswer}
          onRestart={resetGame}
        />
      )}

      {/* Phase 3: Game Over - Winner celebration */}
      {gamePhase === 'gameover' && (
        <WinnerScreen winner={winner} onPlayAgain={resetGame} />
      )}
    </div>
  );
}

export default App;

// Made with Bob
