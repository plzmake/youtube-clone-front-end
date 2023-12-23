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
  const { data } = await axios.request(options);
  return data;
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


export const fetchDataChannelDetailsChannelFromApi = async (id) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/channel/details/',
    params: {
      id: id,
      hl: 'vi',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_CHANNEL_DETAILS_CHANNEL,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  const { data } = await axios.request(options);
  return data;
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
      'X-RapidAPI-Key': 'ca2d74929cmsha3165a568f2019cp166b56jsncf766bc72b68',
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
      'X-RapidAPI-Key': '6d6b02d722msh0b84e451ecc0abap15460ejsn8eff251cec6b',
      'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
}

export const fetchDataArrPostCommunityChannelFromApi = async (channelIdId) => {
  const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/channel/community/',
    params: {
      id: channelIdId
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY_ARR_POST_COMMUNITY_CHANNEL,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  const { data } = await axios.request(options);
  return data;
}

export const fetchArrVideoDataChannelChoiceFromApi = async (channelId, order,publishedBefore = new Date()) => {
  // return new Promise( async(res,rej) => {
  // try {
  //  let data ={};
  let options = {
    method: 'GET',
    url: 'https://youtube-v311.p.rapidapi.com/search/',
    params: {
      //part: 'snippet,contentDetails,statistics',
      part: 'snippet',
      maxResults: '10',
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
  //    res(data)
  // } catch(e) {
  //     console.log('try chatch erroe',e)
  // }
  //  })
}

export const fetchDetailVideoDataChannelFromApi = async (id) => {
  // return new Promise(async (res, rej) => {
  //   try {
      const options = {
        method: 'GET',
        url: 'https://youtube-v311.p.rapidapi.com/videos/',
        params: {
          part: 'snippet,contentDetails,statistics',
          id: id,
          maxResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': '394a9167e4mshf6df1fef3710865p1f0c4cjsna6576d6bfb0d',
          'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
        }
      };
      let { data } = await axios.request(options);
  
      return data;
}

