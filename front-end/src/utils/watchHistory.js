import axios from 'axios';
import { getAuthTokens, newAuthToken } from './auth';

export const createWatchHistory = async videoInfo => {
  const { auth, refresh } = getAuthTokens();

  try {
    if (!auth || !refresh) {
      return;
    }

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/watchHistory`,
      {
        videoId: videoInfo.id
      },
      { headers: { Authorization: auth } }
    );
  } catch (err) {
    if (err.response && err.response.status === 401) {
      try {
        await newAuthToken(refresh);
        createWatchHistory(videoInfo);
      } catch (err) {
        console.log('ERROR::', err);
      }
    }
  }
};
