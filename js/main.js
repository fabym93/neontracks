import { sanitizeText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const statusText = document.getElementById('status-text');
  const sampleLyric = "I wanna be a star - Song Title Spoilers";
  
  const cleanLyric = sanitizeText(sampleLyric, ["Song Title Spoilers"]);
  
  statusText.textContent = `ES6 Modules Loaded Successfully! Test lyric: "${cleanLyric}"`;
  console.log("Neon Tracks Initialized.");
});