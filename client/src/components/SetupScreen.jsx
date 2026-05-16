/**
 * SetupScreen Component
 *
 * Handles the initial game setup where players configure their names and characters.
 * Two-step process:
 * 1. Select number of players (1-4)
 * 2. For each player: enter name and choose character
 *
 * Props:
 * - onStartGame: Callback function to start the game with configured players
 */

import { useState } from 'react';
import '../styles/SetupScreen.css';

// Available characters for players to choose from
// Each character has a unique ID, display name, emoji, and color
const CHARACTERS = [
  { id: 'GIANT_SQUID', name: 'Giant Squid', emoji: '🦑', color: '#FF4444' },
  { id: 'CAT', name: 'Cat', emoji: '🐱', color: '#4444FF' },
  { id: 'MILO_THE_DOG', name: 'Milo the Dog', emoji: '🐕', color: '#FFDD44' },
  { id: 'ZEBRA', name: 'Zebra', emoji: '🦓', color: '#0e0e0e' },
  { id: 'PARROT', name: 'Parrot', emoji: '🦜', color: '#00FF44' },
   { id: 'SANTA', name: 'Santa', emoji: '🎅🏼', color: '#7e199c' }
];


const SetupScreen = ({ onStartGame }) => {
  // Current setup step: 'playerCount' (select number) or 'playerSetup' (configure each player)
  const [step, setStep] = useState('playerCount');
  
  // Total number of players selected (1-4)
  const [playerCount, setPlayerCount] = useState(0);
  
  // Array of fully configured player objects
  const [players, setPlayers] = useState([]);
  
  // Index of player currently being configured (0-based)
  const [currentPlayerSetup, setCurrentPlayerSetup] = useState(0);
  
  // Temporary storage for current player's name during setup
  const [tempName, setTempName] = useState('');
  
  // Temporary storage for current player's selected character during setup
  const [tempCharacter, setTempCharacter] = useState(null);

  /**
   * Handles player count selection
   * Moves to player setup step
   *
   * @param {number} count - Number of players (1-4)
   */
  const handlePlayerCountSelect = (count) => {
    setPlayerCount(count);
    setStep('playerSetup');
    setCurrentPlayerSetup(0);
  };

  /**
   * Handles character selection for current player
   *
   * @param {Object} character - Character object from CHARACTERS array
   */
  const handleCharacterSelect = (character) => {
    setTempCharacter(character);
  };

  /**
   * Adds the current player to the players array
   * Either moves to next player setup or starts the game if all players configured
   */
  const handleAddPlayer = () => {
    // Validate that both name and character are selected
    if (!tempName.trim() || !tempCharacter) return;

    // Create player object with all necessary data
    const newPlayer = {
      id: players.length,              // Unique player ID
      name: tempName.trim(),            // Player's name (trimmed)
      character: tempCharacter.id,      // Character ID
      emoji: tempCharacter.emoji,       // Character emoji for display
      color: tempCharacter.color,       // Player's color theme
      position: 0                       // Starting position on board
    };

    // Add new player to array
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);

    // Check if all players have been configured
    if (updatedPlayers.length === playerCount) {
      // All players ready - start the game!
      onStartGame(updatedPlayers);
    } else {
      // More players to configure - move to next player
      setCurrentPlayerSetup(currentPlayerSetup + 1);
      // Clear temporary inputs for next player
      setTempName('');
      setTempCharacter(null);
    }
  };

  // Get list of characters already chosen by previous players
  const usedCharacters = players.map(p => p.character);
  
  // Filter out used characters so each player gets a unique character
  const availableCharacters = CHARACTERS.filter(c => !usedCharacters.includes(c.id));

  return (
    <div className="setup-screen">
      <h1 className="game-title">🏰 TOMAS and FELIPE DUNGEON 🏰</h1>

      {step === 'playerCount' && (
        <div className="player-count-section">
          <h2 className="setup-question">How many players?</h2>
          <div className="player-count-buttons">
            {[1, 2, 3, 4].map(count => (
              <button
                key={count}
                className="player-count-btn"
                onClick={() => handlePlayerCountSelect(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'playerSetup' && (
        <div className="player-setup-section">
          <h2 className="setup-question">
            Player {currentPlayerSetup + 1} of {playerCount}
          </h2>

          <div className="name-input-container">
            <label className="input-label">What's your name?</label>
            <input
              type="text"
              className="name-input"
              placeholder="Type your name..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              maxLength={15}
              autoFocus
            />
          </div>

          <div className="character-selection">
            <label className="input-label">Pick your character!</label>
            <div className="character-cards">
              {availableCharacters.map(character => (
                <button
                  key={character.id}
                  className={`character-card ${tempCharacter?.id === character.id ? 'selected' : ''}`}
                  onClick={() => handleCharacterSelect(character)}
                  style={{ borderColor: character.color }}
                >
                  <div className="character-emoji">{character.emoji}</div>
                  <div className="character-name">{character.name}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            className="next-btn"
            onClick={handleAddPlayer}
            disabled={!tempName.trim() || !tempCharacter}
          >
            {currentPlayerSetup + 1 === playerCount ? '🎮 START GAME!' : '➡️ NEXT PLAYER'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SetupScreen;

// Made with Bob
