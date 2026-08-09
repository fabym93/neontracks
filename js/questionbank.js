/**
 * Question Bank - Music database for Neon Tracks
 */
export const QUESTION_BANK = {
  rock: [
    {
      lyrics: "Is this the real life? Is this just fantasy?<br>Caught in a landslide, no escape from reality...",
      options: [
        { title: "Bohemian Rhapsody", artist: "Queen", year: 1975 },
        { title: "Don't Stop Me Now", artist: "Queen", year: 1978 },
        { title: "Hotel California", artist: "Eagles", year: 1976 },
        { title: "Sweet Child O' Mine", artist: "Guns N' Roses", year: 1987 }
      ],
      correctIndex: 0
    },
    {
      lyrics: "On a dark desert highway, cool wind in my hair<br>Warm smell of colitas, rising up through the air...",
      options: [
        { title: "Stairway to Heaven", artist: "Led Zeppelin", year: 1971 },
        { title: "Hotel California", artist: "Eagles", year: 1976 },
        { title: "Dream On", artist: "Aerosmith", year: 1973 },
        { title: "Riders on the Storm", artist: "The Doors", year: 1971 }
      ],
      correctIndex: 1
    },
    {
      lyrics: "She's got a smile that it seems to me<br>Reminds me of childhood memories...",
      options: [
        { title: "Paradise City", artist: "Guns N' Roses", year: 1987 },
        { title: "Back in Black", artist: "AC/DC", year: 1980 },
        { title: "Sweet Child O' Mine", artist: "Guns N' Roses", year: 1987 },
        { title: "Livin' on a Prayer", artist: "Bon Jovi", year: 1986 }
      ],
      correctIndex: 2
    }
  ],
  pop: [
    {
      lyrics: "Just a small town girl, livin' in a lonely world<br>She took the midnight train goin' anywhere...",
      options: [
        { title: "Don't Stop Believin'", artist: "Journey", year: 1981 },
        { title: "Billie Jean", artist: "Michael Jackson", year: 1982 },
        { title: "Take On Me", artist: "a-ha", year: 1985 },
        { title: "Material Girl", artist: "Madonna", year: 1984 }
      ],
      correctIndex: 0
    },
    {
      lyrics: "She was more like a beauty queen from a movie scene<br>I said don't mind, but what do you mean, I am the one...",
      options: [
        { title: "Thriller", artist: "Michael Jackson", year: 1982 },
        { title: "Beat It", artist: "Michael Jackson", year: 1982 },
        { title: "Billie Jean", artist: "Michael Jackson", year: 1982 },
        { title: "Smooth Criminal", artist: "Michael Jackson", year: 1987 }
      ],
      correctIndex: 2
    }
  ],
  kpop: [
    {
      lyrics: "Cause I'm in the stars tonight<br>So watch me bring the fire and set the night alight...",
      options: [
        { title: "Dynamite", artist: "BTS", year: 2020 },
        { title: "Butter", artist: "BTS", year: 2021 },
        { title: "How You Like That", artist: "BLACKPINK", year: 2020 },
        { title: "God's Menu", artist: "Stray Kids", year: 2020 }
      ],
      correctIndex: 0
    }
  ]
};

/**
 * Helper to get random questions based on selected genre
 */
export function getRandomQuestions (genre = 'rock', amount = 10) {
  const pool = QUESTION_BANK[genre] || QUESTION_BANK.rock;
  // Shuffle array using Fisher-Yates logic
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
}