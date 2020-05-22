const { createTables, dropTables } = require('./setup');
const {
  getAllTitles,
  getAllEpisodes,
  insertTitle,
  insertEpisode,
} = require('./titles');
const {
  getWatchHistory,
  insertWatchHistory,
  getWatchedLatest,
} = require('./watchHistory');

exports.initMysql = () => {
  return {
    createTables,
    dropTables,

    getAllTitles,
    getAllEpisodes,
    insertTitle,
    insertEpisode,

    getWatchHistory,
    insertWatchHistory,
    getWatchedLatest,
  };
};
