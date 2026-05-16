/**
 * CursedNotification Component
 *
 * Displays a dramatic notification when a player lands on the cursed square (17).
 * Shows a skull animation and warning message before sending the player back to start.
 *
 * Props:
 * - playerName: Name of the player who landed on the cursed square
 * - playerColor: Color of the player for visual theming
 */

import '../styles/CursedNotification.css';

const CursedNotification = ({ playerName, playerColor }) => {
  return (
    <div className="cursed-overlay">
      <div className="cursed-content">
        {/* Large animated skull */}
        <div className="cursed-skull">💀</div>
        
        {/* Warning message */}
        <div className="cursed-title">CURSED SQUARE!</div>
        
        {/* Player-specific message */}
        <div className="cursed-message" style={{ color: playerColor }}>
          {playerName} landed on the cursed square!
        </div>
        
        {/* Consequence message */}
        <div className="cursed-consequence">
          ⚡ Returning to START ⚡
        </div>
      </div>
    </div>
  );
};

export default CursedNotification;

// Made with Bob