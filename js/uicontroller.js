/**
 * UIController - Handles DOM interactions, view states, and leaderboard rendering
 */
export class UIController {
    constructor() {
        // Views
        this.homeView = document.getElementById('home-view');
        this.quizView = document.getElementById('quiz-view');
        this.summaryView = document.getElementById('summary-view');
        this.reviewModal = document.getElementById('review-modal');

        // HUD Elements
        this.hudScore = document.getElementById('hud-score');
        this.hudStreak = document.getElementById('hud-streak');
        this.timerBar = document.getElementById('timer-bar');

        // Quiz Elements
        this.questionNumber = document.querySelector('.question-number');
        this.lyricsSnippet = document.querySelector('.lyrics-snippet');
        this.optionsGrid = document.querySelector('.quiz-card .options-grid');

        // Modal Elements
        this.modalBadge = document.querySelector('.modal-badge');
        this.modalScoreEarned = document.querySelector('.modal-score-earned');
        this.trackTitle = document.querySelector('.track-title');
        this.trackArtist = document.querySelector('.track-artist');
        this.multiplierTag = document.querySelector('.multiplier-tag strong');

        // Summary Elements
        this.summaryTotalScore = document.getElementById('summary-total-score');
        this.summaryMaxStreak = document.getElementById('summary-max-streak');
        this.summaryAccuracy = document.getElementById('summary-accuracy');
        this.summaryCorrect = document.getElementById('summary-correct');
        this.summaryAvgTime = document.getElementById('summary-avg-time');
        this.rankBadge = document.querySelector('.rank-badge');
    }

    // View Navigation Methods
    showHome() {
        this.homeView.classList.remove('hidden');
        this.quizView.classList.add('hidden');
        this.summaryView.classList.add('hidden');
        this.hideReviewModal();
    }

    showQuiz() {
        this.homeView.classList.add('hidden');
        this.quizView.classList.remove('hidden');
        this.summaryView.classList.add('hidden');
    }

    showSummary(stats) {
        this.homeView.classList.add('hidden');
        this.quizView.classList.add('hidden');
        this.summaryView.classList.remove('hidden');
        this.hideReviewModal();

        // Populate Summary Data
        this.summaryTotalScore.textContent = stats.totalScore.toLocaleString();
        this.summaryMaxStreak.textContent = `${stats.maxStreak}x 🔥`;
        this.summaryAccuracy.textContent = `${stats.accuracy}%`;
        this.summaryCorrect.textContent = `${stats.correctCount}/${stats.totalQuestions}`;
        this.summaryAvgTime.textContent = `${stats.avgTime}s`;

        // Assign Rank based on Accuracy
        this.rankBadge.textContent = stats.rank;
    }

    // Modal Handlers
    showReviewModal(isCorrect, pointsEarned, trackData, currentStreak, multiplier) {
        if (isCorrect) {
            this.modalBadge.textContent = 'CORRECT!';
            this.modalBadge.className = 'modal-badge success';
            this.modalScoreEarned.textContent = `+${pointsEarned} PTS`;
        } else {
            this.modalBadge.textContent = 'WRONG!';
            this.modalBadge.className = 'modal-badge danger';
            this.modalScoreEarned.textContent = '+0 PTS';
        }

        this.trackTitle.textContent = trackData.title;
        this.trackArtist.textContent = `${trackData.artist} • ${trackData.year}`;
        this.multiplierTag.textContent = `${multiplier}x Multiplier 🔥`;

        this.reviewModal.classList.remove('hidden');
    }

    hideReviewModal() {
        this.reviewModal.classList.add('hidden');
    }

    // Update Quiz HUD & Question Data
    updateHUD(score, streak, multiplier) {
        this.hudScore.textContent = score;
        this.hudStreak.textContent = `${multiplier}x 🔥`;
    }

    updateTimer(percentage) {
        this.timerBar.style.width = `${percentage}%`;
    }

    renderQuestion(questionData, currentNum, totalQuestions) {
        this.questionNumber.textContent = `QUESTION ${String(currentNum).padStart(2, '0')}/${String(totalQuestions).padStart(2, '0')}`;
        this.lyricsSnippet.innerHTML = `"${questionData.lyrics}"`;

        this.optionsGrid.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];

        questionData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.dataset.index = index;
            btn.setAttribute('aria-label', `Option ${letters[index]}: ${option.title} by ${option.artist}`);
            btn.innerHTML = `
        <span class="option-letter">${letters[index]}</span>
        <span class="option-text">${option.title} - ${option.artist}</span>
      `;
            this.optionsGrid.appendChild(btn);
        });
    }

    highlightAnswers(selectedIndex, correctIndex) {
        const buttons = this.optionsGrid.querySelectorAll('.btn-option');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === correctIndex) {
                btn.classList.add('correct');
            }
            if (idx === selectedIndex && selectedIndex !== correctIndex) {
                btn.classList.add('wrong');
            }
        });
    }

    // Render High Scores Leaderboard
    renderLeaderboard(scores) {
        const leaderboardList = document.getElementById('leaderboard-list');
        if (!leaderboardList) return;

        leaderboardList.innerHTML = '';

        if (scores.length === 0) {
            leaderboardList.innerHTML = '<li class="empty-msg">No high scores yet. Play a game!</li>';
            return;
        }

        scores.forEach((entry, index) => {
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            li.innerHTML = `
        <span class="rank">#${index + 1}</span>
        <span class="score">${entry.score.toLocaleString()} PTS</span>
        <span class="badge">${entry.rank}</span>
        <span class="genre">${entry.genre ? entry.genre.toUpperCase() : 'ALL'}</span>
      `;
            leaderboardList.appendChild(li);
        });
    }
}