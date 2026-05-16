/**
 * MathQuestion Component
 * 
 * Displays a math question that players must answer correctly to move.
 * Features:
 * - Random questions from 4 categories (addition, subtraction, multiplication, division)
 * - 8-second countdown timer
 * - On-screen number keyboard (0-9 + ENTER)
 * - Visual feedback for correct/incorrect answers
 * 
 * Props:
 * - onAnswer: Callback function with boolean (true if correct, false if incorrect/timeout)
 * - playerColor: Color for visual theming
 */

import { useState, useEffect } from 'react';
import '../styles/MathQuestion.css';

const MathQuestion = ({ onAnswer, playerColor }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);

  /**
   * Plays a success sound using Web Audio API
   * Creates a pleasant ascending tone sequence
   */
  const playCorrectSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Pleasant ascending notes (C-E-G chord)
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  /**
   * Plays an error sound using Web Audio API
   * Creates a descending "wrong answer" tone
   */
  const playIncorrectSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Descending "buzzer" sound
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  /**
   * Generates a random math question from one of four categories
   * Uses a shuffled array approach to ensure even distribution
   *
   * Categories:
   * 1. Addition: 1-50 + 1-50
   * 2. Subtraction: 1-20 - 1-20 (always positive result)
   * 3. Multiplication: 1-12 × 1-12
   * 4. Division: 1-12 ÷ 1-12 (always exact division)
   *
   * @returns {Object} Question object with text and correct answer
   */
  const generateQuestion = () => {
    // Create array with all categories and shuffle it for even distribution
    const categories = ['addition', 'subtraction', 'multiplication', 'division'];
    
    // Fisher-Yates shuffle algorithm for truly random distribution
    for (let i = categories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [categories[i], categories[j]] = [categories[j], categories[i]];
    }
    
    // Pick the first category from shuffled array
    const category = categories[0];
    
    let num1, num2, correctAnswer, questionText;
    
    switch (category) {
      case 'addition':
        // Addition: 1-50 + 1-50
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        correctAnswer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
        
      case 'subtraction':
        // Subtraction: ensure positive result
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * num1) + 1; // num2 <= num1
        correctAnswer = num1 - num2;
        questionText = `${num1} - ${num2}`;
        break;
        
      case 'multiplication':
        // Multiplication: 1-12 × 1-12
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        correctAnswer = num1 * num2;
        questionText = `${num1} × ${num2}`;
        break;
        
      case 'division':
        // Division: ensure exact division
        num2 = Math.floor(Math.random() * 12) + 1; // divisor
        correctAnswer = Math.floor(Math.random() * 12) + 1; // quotient
        num1 = num2 * correctAnswer; // dividend
        questionText = `${num1} ÷ ${num2}`;
        break;
    }
    
    return { text: questionText, answer: correctAnswer };
  };

  // Generate question on component mount
  useEffect(() => {
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      // Time's up - incorrect answer
      handleSubmit(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  /**
   * Handles number button clicks
   * Appends digit to current answer
   */
  const handleNumberClick = (num) => {
    if (isAnswered) return;
    setAnswer(answer + num);
  };

  /**
   * Handles backspace (delete last digit)
   */
  const handleBackspace = () => {
    if (isAnswered) return;
    setAnswer(answer.slice(0, -1));
  };

  /**
   * Handles answer submission
   * Checks if answer is correct, plays sound, and calls onAnswer callback
   */
  const handleSubmit = (isTimeout = false) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = !isTimeout && parseInt(answer) === question.answer;
    
    // Play appropriate sound effect
    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
    
    // Show feedback briefly before calling callback
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  if (!question) return null;

  return (
    <div className="math-question-overlay">
      <div className="math-question-container" style={{ borderColor: playerColor }}>
        {/* Timer */}
        <div className="timer" style={{ color: timeLeft <= 3 ? '#ff4444' : playerColor }}>
          ⏱️ {timeLeft}s
        </div>

        {/* Question */}
        <div className="question-text">
          {question.text} = ?
        </div>

        {/* Answer Display */}
        <div className="answer-display" style={{ borderColor: playerColor }}>
          {answer || '___'}
        </div>

        {/* Feedback Message */}
        {isAnswered && (
          <div className={`feedback ${parseInt(answer) === question.answer ? 'correct' : 'incorrect'}`}>
            {parseInt(answer) === question.answer ? '✅ Correct!' : `❌ Wrong! Answer`}
          </div>
        )}

        {/* Number Keyboard */}
        {!isAnswered && (
          <div className="number-keyboard">
            <div className="keyboard-row">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  className="keyboard-btn"
                  onClick={() => handleNumberClick(num)}
                  style={{ borderColor: playerColor }}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="keyboard-row">
              {[4, 5, 6].map(num => (
                <button
                  key={num}
                  className="keyboard-btn"
                  onClick={() => handleNumberClick(num)}
                  style={{ borderColor: playerColor }}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="keyboard-row">
              {[7, 8, 9].map(num => (
                <button
                  key={num}
                  className="keyboard-btn"
                  onClick={() => handleNumberClick(num)}
                  style={{ borderColor: playerColor }}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="keyboard-row">
              <button
                className="keyboard-btn backspace-btn"
                onClick={handleBackspace}
              >
                ⌫
              </button>
              <button
                className="keyboard-btn"
                onClick={() => handleNumberClick(0)}
                style={{ borderColor: playerColor }}
              >
                0
              </button>
              <button
                className="keyboard-btn enter-btn"
                onClick={() => handleSubmit()}
                disabled={!answer}
                style={{ backgroundColor: playerColor }}
              >
                ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathQuestion;

// Made with Bob
