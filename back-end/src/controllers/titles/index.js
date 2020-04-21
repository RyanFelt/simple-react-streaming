const { scanAllTitles, queryAllWatchedLast } = require('../../utils/database');

exports.getAllTitles = async (req, res) => {
  try {
    const allTitles = await scanAllTitles();

    const activeTitles = allTitles.filter((title) => title.active);

    let watchedLast = [];

    if (req.user && req.user.userId) {
      watchedLast = await queryAllWatchedLast(req.user.userId);
      watchedLast = watchedLast.sort((a, b) => (a.time > b.time ? 1 : -1));
    }

    for (let x = 0; x < watchedLast.length; x++) {
      for (let i = 0; i < activeTitles.length; i++) {
        if (activeTitles[i].id === watchedLast[x].titleId) {
          const temp = activeTitles[i];
          activeTitles.splice(i, 1);
          activeTitles.unshift(temp);
          break;
        }
      }
    }

    res.status(200).send(activeTitles);
  } catch (e) {
    console.log('ERROR -- /getAllTitles --', e);
    res.status(500).send({ message: 'Internal server error' });
  }
};