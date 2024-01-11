import React from "react";
import LogoHomepage from '../assets/images/images/homepage.svg';
import Short from '../assets/images/images/Short.svg';
import SubChannel from '../assets/images/images/channelSub.svg';
import VideoHis from '../assets/images/images/historyVideo.svg';
import LaterVideo from '../assets/images/images/laterVideo.svg';
import LikeVideo from '../assets/images/images/likedVideo.svg';
import Trending from '../assets/images/images/trending.svg';
import Music from '../assets/images/images/music.svg';
import Game from '../assets/images/images/game.svg';
import News from '../assets/images/images/news.svg';
import Sport from '../assets/images/images/sport.svg';
import YtbPre from '../assets/images/images/ytbPre.svg';
import YtbStudio from '../assets/images/images/ytbStudio.svg';
import YtbMusic from '../assets/images/images/ytbMusic.svg';
import YtbKid from '../assets/images/images/ytbKid.svg';
import Setting from '../assets/images/images/setting.svg';
import Report from '../assets/images/images/report.svg';
import Help from '../assets/images/images/help.svg';
import SendReport from '../assets/images/images/sendReport.svg';
import UserName from '../assets/images/images/username.svg';
import SubscribersText from '../assets/images/images/subscribersText.svg';
import Videos from '../assets/images/images/videos.svg';
import Views from '../assets/images/images/views.svg';
import JoinedDateText from '../assets/images/images/joinedDateText.svg';
import Country from '../assets/images/images/country.svg';
import SharedChannel from '../assets/images/images/shareChannel.svg';
import ReportChannel from '../assets/images/images/reportChannel.svg';
import IconPlayList from '../assets/images/images/iconPlayList.svg';
import SavePlayList from '../assets/images/images/SavePlayList.svg';
import SharePlayList from '../assets/images/images/shareWhite.svg';
import DownLoad from '../assets/images/images/DownLoad.svg';
import Botton from '../assets/images/images/buttonWhite.svg';
export const path = {
    HOME: '/',
    VIDEO: '/video/:id',
    LOG_OUT: '/logout',
    SEARCH: '/search/:search',
    ERROR: '*',
    CHANNEL: '/channel/:channel',
    POST: '/post/:postId',
    PLAYLIST: '/playlist/:playlistId'

};

export const languages = {
    VI: 'vi',
    EN: 'en'
};

export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}


export const categories = [
    { name: "Trang chủ", icon: LogoHomepage, type: "home" },
    { name: "Short", icon: Short, type: "home" },
    { name: "Kênh đăng ký", icon: SubChannel, type: "home" },
    { name: "Video đã xem", icon: VideoHis, type: "channels" },
    { name: "Xem sau", icon: LaterVideo, type: "channels" },
    { name: "Video đã thích", icon: LikeVideo, type: "channels" },
    { name: "Thịnh hành", icon: Trending, type: "discover" },
    { name: "Âm nhạc", icon: Music, type: "discover" },
    { name: "Trò chơi", icon: Game, type: "discover" },
    { name: "Tin tức", icon: News, type: "discover" },
    { name: "Thể thao", icon: Sport, type: "discover" },

    {
        name: "YouTube Premium",
        icon: YtbPre,
        type: "service",
        divider: true,
    },
    {
        name: "YouTube Studio",
        icon: YtbStudio,
        type: "service",
        divider: true,
    },
    {
        name: "YouTube Music",
        icon: YtbMusic,
        type: "service",
        divider: true,
    },
    {
        name: "YouTube Kid",
        icon: YtbKid,
        type: "service",
        divider: true,
    },
    { name: "Cài đặt", icon: Setting, type: "menu" },
    { name: "Nhật ký báo cáo", icon: Report, type: "menu" },
    { name: "Trợ giúp", icon: Help, type: "menu" },
    { name: "Gửi ý kiến phản hồi", icon: SendReport, type: "menu" },
];
export const listChoice = [
    'Tất cả', 'Âm nhạc', 'Trực tiếp', 'Hoạt họa', 'Trò chơi', 'Hài kịch', 'Đọc rap', 'Roblox', 'Nấu ăn', 'Hoạt hình'
]
export const listChoiceChannel = ['Trang chủ', 'Video', 'Danh sách phát', 'Cộng đồng']
export const listChoiceSubChannel = ['Mới nhất', 'Phổ biến', 'Cũ nhất']
export const detailChannel = [
    UserName,
    SubscribersText,
    Videos,
    Views,
    JoinedDateText,
    Country,
    SharedChannel,
    ReportChannel,
    IconPlayList
]
export const listChoiceVideoChannel = [
    { name: 'Mới nhất', key: 'date' },
    { name: 'Phổ biến', key: 'viewCount' },
    { name: 'Cũ nhất', key: 'old' },
]
export const playList = [
    SavePlayList,
    SharePlayList,
    DownLoad,
    Botton
]





