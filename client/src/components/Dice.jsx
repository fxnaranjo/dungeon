/**
 * Dice Component
 *
 * Interactive dice that players click to roll.
 * Shows three states:
 * 1. Ready to roll (pulsing animation with "CLICK TO ROLL!")
 * 2. Rolling (spinning dice emoji animation)
 * 3. Result (shows dots pattern for rolled number)
 *
 * Props:
 * - value: Current dice value (1-6) or null
 * - isRolling: Boolean indicating if dice is currently animating
 * - onRoll: Function to call when dice is clicked
 * - disabled: Boolean to disable clicking (during opponent's turn)
 * - playerColor: Color for visual feedback (border and result text)
 */

import '../styles/Dice.css';

const Dice = ({ value, isRolling, onRoll, disabled, playerColor }) => {
  /**
   * Returns array of dot positions for a given dice value
   *
   * Dice face is a 3x3 grid (positions 0-8):
   * 0 1 2
   * 3 4 5
   * 6 7 8
   *
   * Each number has a specific dot pattern:
   * - 1: Center dot (4)
   * - 2: Diagonal corners (0, 8)
   * - 3: Diagonal line (0, 4, 8)
   * - 4: Four corners (0, 2, 6, 8)
   * - 5: Four corners + center (0, 2, 4, 6, 8)
   * - 6: Two columns (0, 2, 3, 5, 6, 8)
   *
   * @param {number} num - Dice value (1-6)
   * @returns {Array} Array of position indices for dots
   */
  const getDiceDots = (num) => {
    const dotPatterns = {
      1: [4],                    // Center
      2: [0, 8],                 // Top-left, bottom-right
      3: [0, 4, 8],              // Diagonal
      4: [0, 2, 6, 8],           // Four corners
      5: [0, 2, 4, 6, 8],        // Four corners + center
      6: [0, 2, 3, 5, 6, 8]      // Two columns
    };
    return dotPatterns[num] || [];
  };

  return (
    <div className="dice-container">
      {/* Main dice button */}
      <button
        className={`dice ${isRolling ? 'rolling' : ''} ${!disabled && !isRolling ? 'pulse' : ''}`}
        onClick={onRoll}
        disabled={disabled}
        style={{ borderColor: playerColor }}  // Border matches player color
      >
        {/* State 1: Show dice result with dots */}
        {!isRolling && value && (
          <div className="dice-face">
            {/* Render each dot in its grid position */}
            {getDiceDots(value).map((position) => (
              <div key={position} className={`dot dot-${position}`} />
            ))}
          </div>
        )}
        
        {/* State 2: Show rolling animation */}
        {isRolling && <div className="dice-rolling">🎲</div>}
        
        {/* State 3: Show prompt to roll */}
        {!isRolling && !value && (
          <div className="dice-prompt">
            <div className="dice-emoji">🎲</div>
            <div className="dice-text">CLICK TO ROLL!</div>
          </div>
        )}
      </button>
      
      {/* Display result message after rolling */}
      {value && !isRolling && (
        <div className="dice-result" style={{ color: playerColor }}>
          You rolled a {value}!
        </div>
      )}
    </div>
  );
};

export default Dice;

// Made with Bob
