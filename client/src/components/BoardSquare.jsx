/**
 * BoardSquare Component
 *
 * Represents a single square on the game board.
 * Displays the square number, special labels (START/GOAL), and any players on this square.
 *
 * Props:
 * - number: Square number (0-40)
 * - players: Array of player objects currently on this square
 * - style: Additional CSS styles (used for grid positioning in serpentine layout)
 */

import '../styles/BoardSquare.css';

// Array of 20 vibrant colors that cycle through the board squares
// Creates a rainbow effect across the board
const SQUARE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF6B9D', '#C9ADA7', '#4A90E2', '#FF8C42', '#6BCF7F',
  '#9B59B6', '#3498DB', '#E74C3C', '#F39C12', '#1ABC9C'
];

const BoardSquare = ({ number, players, style }) => {
  // Check if this is the starting square (0)
  const isStart = number === 0;
  
  // Check if this is the goal square (40)
  const isGoal = number === 40;
  
  // Check if this is a cursed square (17 or 28)
  const isCursed = number === 17 || number === 28;
  
  // Get color for this square (cycles through SQUARE_COLORS array)
  // Use dark color for cursed squares
  const color = isCursed ? '#2C0735' : SQUARE_COLORS[number % SQUARE_COLORS.length];

  return (
    <div
      // Apply CSS classes for styling and special squares
      className={`board-square ${isStart ? 'start' : ''} ${isGoal ? 'goal' : ''} ${isCursed ? 'cursed' : ''}`}
      // Merge background color with any additional styles (grid positioning)
      style={{ backgroundColor: color, ...style }}
    >
      {/* Display square number in top-left corner */}
      <div className="square-number">{number}</div>
      
      {/* Show "START" label on first square */}
      {isStart && <div className="square-label">START</div>}
      
      {/* Show "GOAL" label with trophy on last square */}
      {isGoal && <div className="square-label">🏆 GOAL</div>}
      
      {/* Show single skull on cursed square */}
      {isCursed && <div className="square-label cursed-label">💀</div>}
      
      {/* Container for player pieces on this square */}
      <div className="square-players">
        {/* Render each player on this square */}
        {players.map((player, index) => (
          <div
            key={player.id}
            className="player-piece"
            style={{
              // Offset each player slightly so they don't overlap completely
              // Creates a stacked effect when multiple players are on same square
              transform: `translate(${index * 10}px, ${index * 10}px)`,
              zIndex: index  // Stack players in order
            }}
          >
            {/* Display player's character emoji */}
            {player.emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSquare;

// Made with Bob
