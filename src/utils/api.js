import axios from "axios";


export const fetchDataSearchHomPageFromApi = async (query) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/search/',
    params: {
      q: query,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_SEARCH_HOME_PAGE,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
};


export const fetchDataVideoDetailsVideoFromApi = async (id) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/video/details/',
    params: {
      id: id,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_VIDEO_DETAILS_VIDEO,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return 'error'; // Trả về '*' khi gặp lỗi
  }
};
export const fetchDataVideoCommentsVideoFromApi = async (id) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/video/comments/',
    params: {
      id: id,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_VIDEO_COMMENTS_VIDEO,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
};
export const fetchDataReplyCommentVideoFromApi = async (VideoID,cursor) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/video/comments/',
    params: {
      id: VideoID,
      cursor: cursor,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_GET_REPLY_COMMENT_VIDEO,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
};
export const fetchDataVideoRelatedContentsVideoFromApi = async (id) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/video/related-contents/',
    params: {
      id: id,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_VIDEO_RELATED_CONTENTS_VIDEO,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
};


export const fetchDataSearchSearchFromApi = async (query) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/search/',
    params: {
      q: query,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_SEARCH_SEARCH,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
};


export const fetchDataAutoCompleteHomeHeaderFromApi = async (query) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/auto-complete/',
    params: {
      q: query,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_AUTO_COMPLETE_HOME_HEADER,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
};


export const fetchDataChannelDetailsChannelFromApi = async (channelId) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/channel/details/',
    params: {
      id: channelId,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_CHANNEL_DETAILS_CHANNEL,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return 'error'; // Trả về '*' khi gặp lỗi
  }
};

export const fetchDataPlayListDetailFromApi = async (channelId, maxResults = 5) => {
  const options = {
    method: 'GET',
    url: 'https://youtube-v311.p.rapidapi.com/playlists/',
    params: {
      part: 'snippet,contentDetails,id,localizations,player,status',
      channelId: channelId,
      maxResults: maxResults
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_DATA_PLAY_LIST_DETAIL_CHANNEL,
      'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
}

export const fetchDataArrVideoInPlayListChannelFromApi = async (playlistId, maxResults = 5) => {
  const options = {
    method: 'GET',
    url: 'https://youtube-v311.p.rapidapi.com/playlistItems/',
    params: {
      part: 'contentDetails,id,snippet,status',
      playlistId: playlistId,
      maxResults: maxResults
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_DATA_ARR_VIDEO_IN_PLAY_LIST_CHANNEL,
      'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
}

export const fetchDataArrPostCommunityChannelFromApi = async (channelId) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/channel/community/',
    params: {
      id: channelId
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_ARR_POST_COMMUNITY_CHANNEL,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
}

export const fetchArrVideoDataChannelChoiceFromApi = async (channelId, order,publishedBefore = new Date(),maxResults = '10') => {
  
  let options = {
    method: 'GET',
    url: 'https://youtube-v311.p.rapidapi.com/search/',
    params: {
      
      part: 'snippet',
      maxResults: maxResults,
      order: order,
      channelId: channelId,
      safeSearch: 'none',
      publishedBefore:publishedBefore,
      type: 'video'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_ARR_VIDEO_CHANNEL,
      'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
 
}

export const fetchDetailVideoDataChannelFromApi = async (id) => {
  
      const options = {
        method: 'GET',
        url: 'https://youtube-v311.p.rapidapi.com/videos/',
        params: {
          part: 'snippet,contentDetails,statistics',
          id: id,
          maxResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_GET_DETAIL_VIDEO_DATA_CHANNEL,
          'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
        }
      };
      let { data } = await axios.request(options);
  
      return data;
}
 export const fetchDataCursorPostFromApi = async(postId) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/community-post/details/',
    params: {
      id: postId
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_GET_CURSOR_POST,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  let { data } = await axios.request(options);
  
      return data;
 }
 
 export const fetchDataCommentsPostFromApi = async(cursor) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/community-post/comments/',
    params: {
      cursor: cursor
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_GET_COMMENTS_POST,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  let { data } = await axios.request(options);
  
      return data;
 }
 
export const fetchDataVideoSearchInChannelFromApi = async(ChannelId,query) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/channel/search/',
    params: {
      id: ChannelId,
      q: query,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_GET_VIDEO_IN_SEARCH_CHANNEL,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  let { data } = await axios.request(options);
  
      return data;
 }

 export const fetchDataChannelIdFromApi = async(videoId) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/video/details/',
    params: {
      id: videoId,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_GET_CHANNEL_ID,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  let { data } = await axios.request(options);
  
      return data;
 }