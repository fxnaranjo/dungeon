/**
 * WinnerScreen Component
 *
 * Epic celebration screen displayed when a player wins the game.
 * Features:
 * - Massive confetti explosion (150 pieces)
 * - Animated fireworks bursts
 * - Victory fanfare sound effect
 * - Trophy and winner announcement with animations
 * - Winner's character and name
 * - Play again button to restart
 *
 * Props:
 * - winner: Player object who won the game
 * - onPlayAgain: Function to restart the game
 */

import { useEffect, useState } from 'react';
import '../styles/WinnerScreen.css';

const WinnerScreen = ({ winner, onPlayAgain }) => {
  // State to store confetti pieces data
  const [confetti, setConfetti] = useState([]);
  // State to store firework bursts
  const [fireworks, setFireworks] = useState([]);

  /**
   * Plays a victory fanfare using Web Audio API
   * Creates an ascending triumphant melody
   */
  const playVictorySound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Victory melody notes (C-E-G-C major chord arpeggio)
      const notes = [
        { freq: 523.25, time: 0, duration: 0.15 },    // C5
        { freq: 659.25, time: 0.15, duration: 0.15 }, // E5
        { freq: 783.99, time: 0.3, duration: 0.15 },  // G5
        { freq: 1046.50, time: 0.45, duration: 0.4 }  // C6 (held)
      ];
      
      notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
        oscillator.type = 'triangle'; // Warm, pleasant tone
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + note.time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + note.duration);
        
        oscillator.start(audioContext.currentTime + note.time);
        oscillator.stop(audioContext.currentTime + note.time + note.duration);
      });
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  // Generate confetti and play sound when component mounts
  useEffect(() => {
    // Play victory sound
    playVictorySound();
    
    // Create 150 confetti pieces with random properties (3x more than before!)
    const pieces = Array.from({ length: 150 }, (_, i) => ({
      id: i,                                    // Unique ID for React key
      left: Math.random() * 100,                // Random horizontal position (0-100%)
      delay: Math.random() * 0.5,               // Faster start (0-0.5s)
      duration: 2 + Math.random() * 2,          // Faster fall (2-4s)
      rotation: Math.random() * 360,            // Random initial rotation
      // Random color from expanded palette of 10 bright colors
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#F7DC6F', '#BB8FCE', '#FF1744', '#00E676', '#FFEA00', '#E040FB'][Math.floor(Math.random() * 10)]
    }));
    setConfetti(pieces);
    
    // Create firework bursts at intervals
    const fireworkInterval = setInterval(() => {
      const newFirework = {
        id: Date.now(),
        left: 20 + Math.random() * 60,  // Random position (20-80%)
        bottom: 20 + Math.random() * 40, // Random height (20-60%)
        color: ['#FF6B6B', '#4ECDC4', '#FFD700', '#FF1744', '#00E676'][Math.floor(Math.random() * 5)]
      };
      setFireworks(prev => [...prev, newFirework]);
      
      // Remove firework after animation completes
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 1000);
    }, 800);
    
    // Cleanup interval on unmount
    return () => clearInterval(fireworkInterval);
  }, []); // Empty dependency array = run once on mount

  return (
    <div className="winner-screen">
      {/* Confetti animation container */}
      <div className="confetti-container">
        {/* Render each confetti piece */}
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="confetti"
            style={{
              left: `${piece.left}%`,                      // Horizontal position
              animationDelay: `${piece.delay}s`,           // Stagger start times
              animationDuration: `${piece.duration}s`,     // Vary fall speeds
              backgroundColor: piece.color,                 // Random color
              transform: `rotate(${piece.rotation}deg)`    // Random rotation
            }}
          />
        ))}
      </div>

      {/* Fireworks animation container */}
      <div className="fireworks-container">
        {fireworks.map(firework => (
          <div
            key={firework.id}
            className="firework"
            style={{
              left: `${firework.left}%`,
              bottom: `${firework.bottom}%`,
              borderColor: firework.color
            }}
          >
            {/* Create 8 sparks radiating outward */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="spark"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  backgroundColor: firework.color
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Main winner content card */}
      <div className="winner-content">
        {/* Multiple trophy emojis for extra celebration */}
        <div className="trophy-row">
          <div className="trophy trophy-left">🏆</div>
          <div className="trophy trophy-center">🏆</div>
          <div className="trophy trophy-right">🏆</div>
        </div>
        
        {/* "WINNER!" title (pulsing animation) */}
        <h1 className="winner-title">🎉 WINNER! 🎉</h1>
        
        {/* Winner's character emoji (spinning animation) */}
        <div className="winner-character">{winner.emoji}</div>
        
        {/* Winner's name with color */}
        <h2 className="winner-name" style={{ color: winner.color }}>{winner.name}</h2>
        
        {/* Congratulations message */}
        <p className="winner-message">🌟 You reached the goal! 🌟</p>
        
        {/* Button to start a new game */}
        <button className="play-again-btn" onClick={onPlayAgain}>
          🎮 PLAY AGAIN!
        </button>
      </div>
    </div>
  );
};

export default WinnerScreen;

// Made with Bob
