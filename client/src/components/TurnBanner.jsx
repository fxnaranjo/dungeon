/**
 * TurnBanner Component
 *
 * Displays a prominent banner showing whose turn it is.
 * Features:
 * - Player's name and character emoji
 * - Background color matches player's color
 * - Animated arrows pointing to the player
 * - Pulsing animation to draw attention
 *
 * Props:
 * - player: Player object with name, emoji, and color
 */

import '../styles/TurnBanner.css';

const TurnBanner = ({ player }) => {
  return (
    <div
      className="turn-banner"
      style={{ backgroundColor: player.color }}  // Banner color matches player
    >
      {/* Left pointing arrow (animated) */}
      <div className="turn-arrow">👉</div>
      
      {/* Center content with player info */}
      <div className="turn-content">
        {/* Player's character emoji (large and animated) */}
        <div className="turn-emoji">{player.emoji}</div>
        
        {/* Text content */}
        <div className="turn-text">
          {/* Player's name */}
          <div className="turn-name">{player.name}</div>
          {/* Turn indicator message */}
          <div className="turn-label">YOUR TURN!</div>
        </div>
      </div>
      
      {/* Right pointing arrow (animated) */}
      <div className="turn-arrow">👈</div>
    </div>
  );
};

export default TurnBanner;

// Made with Bob
