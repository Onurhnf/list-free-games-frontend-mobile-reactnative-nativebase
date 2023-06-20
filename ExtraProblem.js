// Dummy Data
const dummyData = {
  "archery-mission-lvl": {
    fails: 9,
    gameId: "archery-world-tour",
    playTime: 5291.706,
    wins: 8,
  },
  "archery-world-mission-1": {
    fails: 9,
    gameId: "archery-world-tour",
    playTime: 981,
    wins: 6,
  },
  "bubble-woods-mission-1": {
    fails: 19,
    gameId: "bubble-woods",
    playTime: 1206,
    wins: 9,
  },
  "bubble-woods-mission-lvl": {
    fails: 1,
    gameId: "bubble-woods",
    playTime: 100,
    wins: 2,
  },
  "candy-bubble-mission-lvl": {
    fails: 6,
    gameId: "candy-bubble",
    playTime: 1558,
    wins: 6,
  },
};

// Grouping missions by gameId and accumulating wins, fails, and playTime
const gameStats = Object.values(dummyData).reduce((acc, currentMission) => {
  const { gameId, wins, fails, playTime } = currentMission;

  if (!acc[gameId]) {
    acc[gameId] = {
      gameId,
      wins,
      fails,
      playTime,
    };
  } else {
    acc[gameId].wins += wins;
    acc[gameId].fails += fails;
    acc[gameId].playTime += playTime;
  }

  return acc;
}, {});

// Converting the gameStats object to an array of objects
// console.log(gameStats);
const result = Object.values(gameStats);
console.log(result);
