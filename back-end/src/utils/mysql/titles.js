const { query } = require('./setup');
const { ValidationError } = require('../errors');

const { TITLES_TABLE, SEASONS_TABLE } = process.env;

exports.getAllTitles = async () => {
  try {
    return await query(`
      SELECT  ${TITLES_TABLE}.*, s.seasons 
      FROM  ${TITLES_TABLE}
      LEFT JOIN (
        SELECT title_id, GROUP_CONCAT(${SEASONS_TABLE}.season ORDER BY CAST(${SEASONS_TABLE}.season AS signed)) AS seasons 
        FROM ${SEASONS_TABLE} 
        JOIN ${TITLES_TABLE} ON ${SEASONS_TABLE}.title_id = ${TITLES_TABLE}.id
        GROUP BY title_id
      )s 
      ON ${TITLES_TABLE}.id = s.title_id 
      WHERE parent_id IS NULL;`);

    // return await query(`SELECT * FROM ${TITLES_TABLE} WHERE parent_id IS NULL`);
  } catch (err) {
    throw new ValidationError(`MYSQL - getAllTitles - ERROR :: ${err}`);
  }
};

exports.getAllEpisodes = async (series) => {
  try {
    return await query(
      `SELECT * FROM ${TITLES_TABLE} WHERE parent_id = (SELECT id FROM ${TITLES_TABLE} WHERE title = "${series}")`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - getAllEpisodes - ERROR :: ${err}`);
  }
};

exports.insertTitle = async ({
  id,
  title,
  type,
  banner_image,
  active,
  video_file = null,
  year = null,
}) => {
  try {
    return await query(
      `INSERT INTO ${TITLES_TABLE}(id, title, type, banner_image, active, video_file, year) 
      VALUES ("${id}", "${title}", "${type}", "${banner_image}", ${active}, "${video_file}", "${year}");`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - insertTitle - ERROR :: ${err}`);
  }
};

exports.insertEpisode = async ({
  id,
  title,
  active,
  parent_id,
  video_file,
  season,
  episode,
  description,
}) => {
  try {
    return await query(
      `INSERT INTO ${TITLES_TABLE}(id, title, active, parent_id, video_file, season, episode, description ) 
      VALUES ("${id}", "${title}", ${active}, "${parent_id}", "${video_file}", "${season}", "${episode}", "${description}");`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - insertEpisode - ERROR :: ${err}`);
  }
};