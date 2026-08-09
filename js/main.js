import { UIController } from './uiController.js';
import { getRandomQuestions } from './questionBank.js';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UIController();

  // State Management
  let activeQuestions = [];
  let currentQuestionIndex = 0;
  let totalQuestions = 10;
  let score = 0;
  let streak = 0;
  let timerInterval = null;
  let currentQuestion = null;

  // 1. Config Form Submit (Start Game)
  const configForm = document.getElementById('game-config-form');
  configForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Read selected genre from form
    const selectedGenre = document.getElementById('genre-select').value;

    // Load dynamic pool of questions
    activeQuestions = getRandomQuestions(selectedGenre, totalQuestions);

    // Reset Game State
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;

    ui.showQuiz();
    startNewRound();
  });

  // 2. Start Question Round
  function startNewRound() {
    // Check if we ran out of questions or reached max limit
    if (currentQuestionIndex >= activeQuestions.length) {
      finishGame();
      return;
    }

    currentQuestion = activeQuestions[currentQuestionIndex];
    const multiplier = streak >= 3 ? 2 : 1;

    ui.renderQuestion(currentQuestion, currentQuestionIndex + 1, activeQuestions.length);
    ui.updateHUD(score, streak, multiplier);
    startTimer();
  }

  // 3. Timer Manager
  function startTimer() {
    let timeRemaining = 100;
    ui.updateTimer(timeRemaining);

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeRemaining -= 2;
      ui.updateTimer(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        handleAnswer(-1); // Timeout
      }
    }, 200);
  }

  // 4. Option Selected Event Delegation
  document.querySelector('.quiz-card .options-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-option');
    if (!btn || btn.disabled) return;

    clearInterval(timerInterval);
    const selectedIdx = parseInt(btn.dataset.index, 10);
    handleAnswer(selectedIdx);
  });

  // 5. Handle Answer Logic
  function handleAnswer(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    ui.highlightAnswers(selectedIndex, currentQuestion.correctIndex);

    if (isCorrect) {
      const basePoints = 750;
      const multiplier = streak >= 3 ? 2 : 1;
      score += basePoints * multiplier;
      streak += 1;
    } else {
      streak = 0;
    }

    const currentMultiplier = streak >= 3 ? 2 : 1;

    setTimeout(() => {
      ui.showReviewModal(
        isCorrect,
        isCorrect ? (750 * (streak >= 3 ? 2 : 1)) : 0,
        currentQuestion.options[currentQuestion.correctIndex],
        streak,
        currentMultiplier
      );
    }, 600);
  }

  // 6. Next Question Button
  document.getElementById('btn-next-question').addEventListener('click', () => {
    ui.hideReviewModal();
    currentQuestionIndex++;

    if (currentQuestionIndex < activeQuestions.length) {
      startNewRound();
    } else {
      finishGame();
    }
  });

  // 7. Finish Game Summary Trigger
  function finishGame() {
    const accuracy = Math.round((score > 0 ? (currentQuestionIndex / activeQuestions.length) * 100 : 0));
    ui.showSummary({
      totalScore: score,
      maxStreak: streak,
      accuracy: accuracy > 100 ? 100 : accuracy,
      correctCount: Math.floor(score / 750),
      totalQuestions: activeQuestions.length,
      avgTime: 3.2
    });
  }

  // 8. Navigation Buttons in Summary View
  document.getElementById('btn-play-again').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    const selectedGenre = document.getElementById('genre-select').value;
    activeQuestions = getRandomQuestions(selectedGenre, totalQuestions);
    ui.showQuiz();
    startNewRound();
  });

  document.getElementById('btn-home-menu').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    ui.showHome();
  });
});