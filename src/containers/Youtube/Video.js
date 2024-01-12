import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    fetchDataVideoDetailsVideoFromApi,
    fetchDataVideoCommentsVideoFromApi,
    fetchDataVideoRelatedContentsVideoFromApi,
    fetchDataReplyCommentVideoFromApi,
    fetchDataChannelIdFromApi
} from '../../utils/api';
import ReactPlayer from "react-player/youtube";
import HomeHeader from './HomeHeader';
import CustomScrollbars from '../../components/CustomScrollbars';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import share from '../../assets/images/images/share.svg';
import moment from 'moment';
import sorted from '../../assets/images/images/sorted.svg';
import DownArrow from '../../assets/images/images/downArrow.svg';
import UpArrow from '../../assets/images/images/upArrow.svg';
import ClosePlayList from '../../assets/images/images/closePlayList.svg';
import RanDom from '../../assets/images/images/random.svg';
import Repeat from '../../assets/images/images/repeat.svg';
import Button from '../../assets/images/images/button.svg';
import RightArrow from '../../assets/images/images/RightArrowPlayList.svg';
import ShowPlayList from '../../assets/images/images/ShowPlayList.svg';
import VideoLength from '../../utils/videoLength';
import LeftNavTotalScreen from './LeftNavTotalScreen';
import { withRouter } from "react-router";
require('moment/locale/vi');

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideoRelated: [],
            video: {},
            isShowMore: true,
            commentVideo: {},
            reloadVideo: true,
            isLoading: true,
            isLeftNavTotalScreen: false,
            isMobile: true,
            windowWidth: window.innerWidth,
            indexVideo: '1',
            arrChoice: [],
            isRandom: false,
            isRepeat: false,
            isShowPlayList: true

        };
        this.player = React.createRef();
        this.handleResize = this.handleResize.bind(this);
    }
    async componentDidMount() {//
        this.setState({
            isLoading: true
        })
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        let video = await fetchDataVideoDetailsVideoFromApi(this.props.match.params.id);
        this.setState({
            video: video
        })
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        let commentVideo = await fetchDataVideoCommentsVideoFromApi(this.props.match.params.id)
        this.setState({
            commentVideo: commentVideo
        })
        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
        let arrVideoRelated = await fetchDataVideoRelatedContentsVideoFromApi(this.props.match.params.id)
        this.setState({
            arrVideoRelated: arrVideoRelated.contents
        })
        let commentReplyVideo = this.buildArrCommentReply(commentVideo);
        let commentReplyVideoPromise = commentReplyVideo;
        this.setState({
            arrChoice: commentReplyVideoPromise
        })
        if (this.props.location.search !== '') {
            let newUrl = new URLSearchParams(this.props.location.search);
            this.setState({
                indexVideo: newUrl.get('index')
            })
        }



        this.setState({
            isLoading: false
        })

        console.log('detail video', video);
        console.log('comment video', commentVideo);
        console.log('VideoRelated', arrVideoRelated)
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.match.params.id !== preProps.match.params.id) {
            this.setState({
                isLoading: true
            })
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            let video = await fetchDataVideoDetailsVideoFromApi(this.props.match.params.id);
            this.setState({
                video: video
            })
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
            let commentVideo = await fetchDataVideoCommentsVideoFromApi(this.props.match.params.id)
            this.setState({
                commentVideo: commentVideo
            })
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });
            let arrVideoRelated = await fetchDataVideoRelatedContentsVideoFromApi(this.props.match.params.id)
            this.setState({
                arrVideoRelated: arrVideoRelated.contents
            })
            if (this.props.location?.search !== '') {
                let newUrl = new URLSearchParams(this.props.location.search);
                let index = newUrl.get('index');
                this.setState({
                    indexVideo: index
                })
            }
            this.setState({
                isLoading: false
            })



        }
    }
    componentWillUnmount() {
        // Xóa event listener khi component bị unmount để tránh memory leak
        //window.innerWidth
        window.removeEventListener('resize', this.handleResize);
    }
    buildArrCommentReply = (commentVideo) => {

        // Thực hiện xử lý trên từng đối tượng ở đây và trả về kết quả xử lý
        let updatedArrChoice = [];
        for (let i = 0; i < commentVideo.comments.length; i++) {
            // await new Promise((resolve) => {
            //     setTimeout(resolve, 300 * i);
            // });
            // let commentReplyVideo = await fetchDataReplyCommentVideoFromApi(this.props.match.params.id, commentVideo.comments[i].cursorReplies);
            let obj = {};

            obj.isShowReply = false;
            obj.cursor = commentVideo.comments[i].cursorReplies;
            obj.commentReplyVideo = {};

            // Thêm các trường khác cần xử lý
            updatedArrChoice.push(obj)
            // Xử lý kết quả API ở đây
        }

        return updatedArrChoice;
    };
    handleResize = () => {
        if (window.matchMedia('(max-width: 800px)').matches) {
            console.log('chieu dai nho hon 800', window.matchMedia('(max-width: 800px)').matches)
            this.setState({
                windowWidth: window.innerWidth,
                isMobile: true
            })

            // Xử lý khi kích thước màn hình nhỏ hơn hoặc bằng 800px

        } else {
            console.log('chieu dai lon hon 800', window.matchMedia('(max-width: 800px)').matches)
            this.setState({
                isMobile: false,
                windowWidth: window.innerWidth
            })


        }
    };
    test = (data) => {
        if (data > 1000000) {//Math.floor(number * 10) % 10
            let text = `${Math.floor(data / 1000000)},${Math.floor(data / 100000) % 10} Tr  `;
            return text;
        } else if (data > 1000) {
            let text = `${Math.floor(data / 1000)},${Math.floor(data / 100) % 10} N  `;
            return text;
        } else {
            return `${data}  `
        }
    }
    handleClickShowMore = () => {
        this.setState({
            isShowMore: !this.state.isShowMore
        })
    }
    showTimeAgo = (time) => {

        let videoCreationTime = moment(time);
        let currentTime = moment();

        let diff = moment.duration(currentTime.diff(videoCreationTime)).locale('vi').humanize()//.split(" ")?.filter(Boolean)?.[0];
        //let reslt = `${diff} năm trước`

        console.log('videoCreationTime', videoCreationTime);
        console.log('currentTime', currentTime);
        console.log('diff', diff);
        return diff;

    }
    handleViewDetailVideo = (video) => {
        console.log('video', video);
        this.setState({
            reloadVideo: !this.state.reloadVideo
        })
        this.props.history.push(`/video/${video.video.videoId}`)
        this.setState({
            arrVideoRelated: [],
            video: {},
            isShowMore: true,
            commentVideo: {},
            reloadVideo: true,
            isLoading: true
        })
    }
    handleShowLeftNavTotalScreen = () => {

        this.setState({
            isLeftNavTotalScreen: !this.state.isLeftNavTotalScreen
        })
        console.log('isLeftNavTotalScreen', this.state.isLeftNavTotalScreen)
    }
    handleViewDetailChannel = async (Id, type) => {
        if (type === "channel") {
            this.props.history.push(`/channel/${Id}`)

        } else if (type === "video") {
            let channelId = await fetchDataChannelIdFromApi(Id);
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            this.props.history.push(`/channel/${channelId.author.channelId}`)
        }
        this.setState = {
            arrVideoRelated: [],
            video: {},
            isShowMore: true,
            commentVideo: {},
            reloadVideo: true,
            isLoading: true,
            isLeftNavTotalScreen: false,
            isMobile: true,
            windowWidth: window.innerWidth,
            indexVideo: '1',
            arrChoice: [],
            isRandom: false,
            isRepeat: false,

        };

    }
    showEllipsis = (text, length) => {
        let res = text.length > length ? '...' : '';
        return res;
    }

    ShowReplyComment = (cursor) => {
        console.log('bấm showreply')
        this.setState(async (prevState) => {
            let updatedArr = prevState.arrChoice.map(async (item) => {
                if (item.isShowReply === false && item.cursor === cursor) {
                    if (Object.keys(item.commentReplyVideo).length > 0) {
                        return { isShowReply: true, commentReplyVideo: item.commentReplyVideo, cursor: item.cursor };
                    } else {
                        let commentReplyVideoObj = await fetchDataReplyCommentVideoFromApi(this.props.match.params.id, item.cursor);
                        console.log('check comment reply comment', commentReplyVideoObj)

                        return { isShowReply: true, commentReplyVideo: commentReplyVideoObj, cursor: item.cursor };
                    }

                }
                return item;
            });
            // Promise.all(updatedArr).then(updatedArrResolved => {
            //     this.setState({ arrChoice: updatedArrResolved });
            // });
            let abc = await Promise.all(updatedArr);
            this.setState({
                arrChoice: abc
            })
        })
    }

    CloseReplyComment = (cursor) => {
        console.log('bấm close zzzzzzzzzzzz')
        this.setState((prevState) => {
            let updatedArr = prevState.arrChoice.map(item => {
                if (item.isShowReply === true && item.cursor === cursor) {
                    return { isShowReply: false, commentReplyVideo: item.commentReplyVideo, cursor: item.cursor }; // Đối tượng mới với hai khóa
                }
                return item;
            });

            return { arrChoice: updatedArr };
        })
    }

    convertDurationToSeconds = (durationString) => {
        let match = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
            let hours = parseInt(match[1] || 0, 10);
            let minutes = parseInt(match[2] || 0, 10);
            let seconds = parseInt(match[3] || 0, 10);
            let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
            return totalTimeInSeconds;
        } else {
            return 0; // Trả về 0 hoặc giá trị mặc định nếu chuỗi không khớp định dạng
        }
    }
    handleVideoInPlayList = (index, videoId) => {
        let newUrl = new URLSearchParams(this.props.location.search);
        let idPlaylist = newUrl.get('idPlaylist');
        this.props.history.push(`/video/${videoId}/?idPlaylist=${idPlaylist}&index=${index}`, this.props.location?.state);
    }
    handleRandom = () => {
        console.log('đã click random')
        this.setState({
            isRandom: !this.state.isRandom
        })
    }
    handleRepeat = () => {
        console.log('đã click repeat')
        this.setState({
            isRepeat: !this.state.isRepeat
        })
    }
    handleVideoEnd = () => {
        if (this.props.location?.search !== '') {
            let newUrl = new URLSearchParams(this.props.location.search);
            let idPlaylist = newUrl.get('idPlaylist');
            let idVideo = '';

            if (this.state.isRandom && this.state.isRepeat) {
                let newIndex = Math.floor(Math.random() * this.props.location.state.arrVideoPlayListPromise.length);
                let index = this.state.indexVideo;
                if (index === newIndex) {
                    this.handleReplay()
                } else {
                    this.setState({
                        indexVideo: `${newIndex + 1}`
                    })
                    for (let i = 0; i < this.props.location.state.arrVideoPlayListPromise.length; i++) {
                        if (`${i + 1}` === this.state.indexVideo) {
                            idVideo = this.props.location.state.arrVideoPlayListPromise[i].id
                        }

                    }
                }

                this.props.history.push(`/video/${idVideo}/?idPlaylist=${idPlaylist}&index=${this.state.indexVideo}`, this.props.location?.state);
            }
            else if (this.state.isRandom && !this.state.isRepeat) {
                let index = this.state.indexVideo;
                let newIndex = Math.floor(Math.random() * this.props.location.state.arrVideoPlayListPromise.length);
                while (index === `${newIndex + 1}`) {
                    newIndex = Math.floor(Math.random() * this.props.location.state.arrVideoPlayListPromise.length);
                }

                this.setState({
                    indexVideo: `${newIndex + 1}`
                })
                for (let i = 0; i < this.props.location.state.arrVideoPlayListPromise.length; i++) {
                    if (`${i + 1}` === this.state.indexVideo) {
                        idVideo = this.props.location.state.arrVideoPlayListPromise[i].id
                    }

                }
                this.props.history.push(`/video/${idVideo}/?idPlaylist=${idPlaylist}&index=${this.state.indexVideo}`, this.props.location?.state);
            }
            else if (!this.state.isRandom && this.state.isRepeat) {
                this.handleReplay()

            }
            else if (!this.state.isRandom && !this.state.isRepeat) {
                if (this.state.indexVideo === `${this.props.location.state.arrVideoPlayListPromise.length}`) {
                    this.setState({
                        indexVideo: '1'
                    })
                } else {
                    this.setState({
                        indexVideo: `${+(this.state.indexVideo) + 1}`
                    })
                }
                for (let i = 0; i < this.props.location.state.arrVideoPlayListPromise.length; i++) {
                    if (`${i + 1}` === this.state.indexVideo) {
                        idVideo = this.props.location.state.arrVideoPlayListPromise[i].id
                    }

                }
                this.props.history.push(`/video/${idVideo}/?idPlaylist=${idPlaylist}&index=${this.state.indexVideo}`, this.props.location?.state);
            }

        }
    }
    handleReplay = () => {
        if (this.player.current) {
            this.player.current.seekTo(0); // Quay về thời điểm 0 để phát lại video
            this.player.current.getInternalPlayer().playVideo(); // Bắt đầu phát lại video
        }
    };
    handleShowPlayList = () => {
        this.setState({
            isShowPlayList: !this.state.isShowPlayList
        })
    }
    playList = () => {
        let newUrl = new URLSearchParams(this.props.location.search);
        let idPlaylist = newUrl.get('idPlaylist');
        this.props.history.push(`/playlist/${idPlaylist}`, this.props.location?.state);
    }
    render() {
        console.log('this.props.match.params.id', this.props.match.params.id)
        console.log('this.props test new url', this.props);
        let newUrl;
        if (this.props.location.search !== '') {
            newUrl = new URLSearchParams(this.props.location.search);
        }

        // console.log('newUrl', newUrl);
        // console.log('idplayList', newUrl.get('idPlaylist'));
        // console.log('index', newUrl.get('index'))
        //const { processLogout } = this.props;
        let { arrVideoRelated, video, isShowMore, commentVideo, isLoading, isLeftNavTotalScreen, arrChoice, indexVideo, isRepeat, isRandom, windowWidth, isShowPlayList } = this.state;
        let id = this.props.match.params.id;

        return (
            <>


                <HomeHeader
                    handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen} />
                {isLeftNavTotalScreen && (<LeftNavTotalScreen
                    handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                />)}
                {(this.state.isMobile) ?
                    (<CustomScrollbars style={{ height: '100vh', width: '100%', display: 'flex' }}>
                        {isLoading && <div class="ring">Loading
                            <span></span>
                        </div>}
                        {!isLoading && (<div className='youtube-body'>
                            <div className='container-video'>
                                <div className='player-video'>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${id}`}
                                        controls
                                        width="100%"
                                        height='500px'
                                        style={{ backgroundColor: "#000000" }}
                                        playing={true}
                                        onEnded={this.handleVideoEnd}
                                        ref={this.player}
                                    />
                                </div>
                                {(this.props.location?.search !== '') &&
                                    (
                                        (isShowPlayList ?
                                            (<div className='container-video-in-playList'>
                                                <div className='playlist-name' onClick={() => this.playList()}>
                                                    <h3><b>{this.props.location?.state?.PlayList?.snippet?.localized?.title}</b></h3>

                                                </div>
                                                <div className='playlistInfo'>
                                                    <div className='name-channel'>
                                                        {this.props.location?.state?.PlayList?.snippet?.channelTitle}{'  -  '}
                                                        {newUrl.get('index')}/{this.props.location.state.arrVideoPlayListPromise.length}
                                                        <img src={ClosePlayList} onClick={() => this.handleShowPlayList()} />
                                                    </div>
                                                    <div className='icon-interact'>
                                                        <div className='Repeat-play-list'>
                                                            <img className={isRepeat ? 'icon-interact-img-active' : 'icon-interact-img'} onClick={() => this.handleRepeat()} src={Repeat} />
                                                        </div>
                                                        <div className='Random-play-list'>
                                                            <img className={isRandom ? 'icon-interact-img-active' : 'icon-interact-img'} onClick={() => this.handleRandom()} src={RanDom} />
                                                        </div>


                                                        <div className='save-playList'><img src={Button} /></div>
                                                    </div>

                                                </div>
                                                <CustomScrollbars style={{ height: '370px', width: '100%', display: 'flex' }}>
                                                    {this.props.location?.state?.arrVideoPlayListPromise && this.props.location?.state?.arrVideoPlayListPromise.length > 0//this.state.arrPlayList[0].id
                                                        &&
                                                        (this.props.location?.state?.arrVideoPlayListPromise?.map((item, index) => {
                                                            return (
                                                                <div className="item-video" key={index} onClick={() => this.handleVideoInPlayList((index + 1), item.id)}>
                                                                    <div className='index-video'>
                                                                        {(indexVideo === `${index + 1}`) ? <img src={RightArrow} /> : `${index + 1}`}
                                                                    </div>
                                                                    <div className='item-video-thumbnails'>
                                                                        <img className="item-video-img" src={item.img} />
                                                                        <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                    </div>
                                                                    <div className='item-video-info'>
                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, (((windowWidth))) - 420)}{this.showEllipsis(item.title, (((windowWidth))) - 420)}</b></h6>
                                                                        </div>
                                                                        <div className='name-channel'>

                                                                            <h6>{item.channel}</h6>

                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            )



                                                        }))
                                                    }
                                                </CustomScrollbars>




                                            </div>)
                                            :
                                            (<div className='container-video-in-playList min' onClick={() => this.handleShowPlayList()}>
                                                {(+(indexVideo) === (this.props.location?.state?.arrVideoPlayListPromise.length + 1)) ?
                                                    (<div className='playlist-panel'>
                                                        <b>Hết danh sách phát</b>




                                                    </div>)
                                                    :
                                                    (<div className='playlist-panel'>
                                                        <b>Tiếp theo:</b>
                                                        {this.props.location?.state?.arrVideoPlayListPromise && this.props.location?.state?.arrVideoPlayListPromise.length > 0 &&
                                                            (this.props.location?.state?.arrVideoPlayListPromise?.map((item, index) => {
                                                                if ((+(indexVideo)) === (index)) {
                                                                    return (
                                                                        <div className='item-video-info'>
                                                                            <div className="item-video-title">
                                                                                <h6><b>{item.title.substring(0, (((windowWidth))) - 420)}{this.showEllipsis(item.title, (((windowWidth))) - 420)}</b></h6>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                }




                                                            }))}



                                                    </div>)
                                                }

                                                <div className='playlist-panel'>
                                                    {this.props.location?.state?.PlayList?.snippet?.localized?.title}
                                                    {'  -  '}
                                                    {newUrl.get('index')}/{this.props.location.state.arrVideoPlayListPromise.length}
                                                    <img src={ShowPlayList}  />
                                                </div>




                                            </div>))

                                    )}

                                {Object.keys(video).length > 0 &&
                                    (<>
                                        <div className='video-title'>
                                            {video?.title}
                                        </div>
                                        <div className='info-video'>
                                            <div className='avatar-channel-video'
                                                onClick={() => this.handleViewDetailChannel(video.author?.channelId, "channel")}
                                            >
                                                <img
                                                    src={video?.author?.avatar[0]?.url}
                                                />
                                            </div>
                                            <div className='info-channel'>
                                                <div className='name-channel'>
                                                    <span
                                                        onClick={() => this.handleViewDetailChannel(video.author?.channelId, "channel")}
                                                    >{video?.author?.title}</span>
                                                    {video?.author?.badges[0]?.type ===
                                                        "VERIFIED_CHANNEL" && (
                                                            <BsFillCheckCircleFill className='icon-item-video-author' />
                                                        )}
                                                </div>
                                                <div className='number-sub-channel'>
                                                    {video?.author?.stats?.subscribersText}
                                                </div>
                                            </div>
                                            <div className='subscribe'>
                                                Đăng ký
                                            </div>

                                        </div>
                                        <div className='video-interaction'>
                                            <div className='like-dislike-video'>
                                                <div className='likes'>
                                                    <AiOutlineLike /> {this.test(video.stats?.likes)}

                                                </div>
                                                <div className='dislike'>
                                                    <AiOutlineDislike />
                                                </div>
                                            </div>
                                            <div className='share-video'>
                                                <img src={share} />Chia sẻ
                                            </div>
                                            <div className='other-video'>
                                                <h6>. . .</h6>
                                            </div>
                                        </div>
                                        {isShowMore === true ? (
                                            <div className='video-des' onClick={() => this.handleClickShowMore()}>
                                                {this.test(video.stats?.views)}lượt xem {` `}
                                                {this.showTimeAgo(video.publishedDate)} trước
                                                <b><pre>{video.description?.split('\n').slice(0, 4).join('\n')}...thêm</pre></b>
                                            </div>)
                                            :
                                            (<div className='video-des show-less' >
                                                {this.test(video.stats?.views)}lượt xem {` `}
                                                {this.showTimeAgo(video.publishedDate)}trước
                                                <pre>{video.description} <b onClick={() => this.handleClickShowMore()}> Ẩn bớt</b></pre>
                                            </div>)
                                        }
                                    </>)}
                                <div className='container-videoRelated'>
                                    {arrVideoRelated && arrVideoRelated.length > 0 && arrVideoRelated.map((item, index) => {
                                        if (item.type === 'video' && !item.video.isLiveNow) {
                                            return (
                                                <div className='container-item-videoRelated' onClick={() => this.handleViewDetailVideo(item)}>
                                                    <div className='item-videoRelated' key={index}>
                                                        <div className='item-videoRelated-thumbnails'>
                                                            <img className='item-videoRelated-thumbnails-img' src={item.video?.thumbnails[0]?.url} />
                                                            {item.video.lengthSeconds && (
                                                                <VideoLength time={item.video?.lengthSeconds} />
                                                            )}
                                                        </div>
                                                        <div className='item-videoRelated-info'>



                                                            <div className='item-videoRelated-author'>
                                                                <span className='item-videoRelated-info-title'>
                                                                    {item.video?.title.substring(0, (windowWidth - 434))}{this.showEllipsis(item.video?.title, (windowWidth - 434))}
                                                                </span>

                                                                <div className='item-videoRelated-author-title-icon'>
                                                                    <span onClick={() => this.handleViewDetailChannel(item.video.videoId, "video")}>{item.video?.author?.title}</span>
                                                                    {item.video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                                                        <BsFillCheckCircleFill className='icon-item-videoRelated-author' />
                                                                    )}
                                                                </div>
                                                                <div className='item-videoRelated-author-view-pushtime'>
                                                                    <div>{`${this.test(item.video?.stats?.views)}lượt xem`}</div>
                                                                    <div className='dot'><h6>&#x2022;</h6></div>
                                                                    <div className='item-videoRelated-author-pushtime'>
                                                                        {item.video?.publishedTimeText}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    })}


                                </div>
                                {Object.keys(commentVideo).length > 0 &&
                                    (
                                        <>
                                            <div className='comment-video'>
                                                <div className='totalCommentsCount'>
                                                    <h5><b>{commentVideo.totalCommentsCount}{'  '} bình luận</b></h5>
                                                    <div className='sorted'>
                                                        <img src={sorted} />
                                                        <h5>Sắp xếp theo</h5>
                                                    </div>
                                                </div>
                                                <div className='write-comment'>
                                                    <div className='avatar-channel'>
                                                        <h6><b>MN</b></h6>
                                                    </div>
                                                    <input placeholder='Viết bình luận' />
                                                </div>
                                                <div className='comment-video-list'>
                                                    {commentVideo.comments.length > 0 && commentVideo.comments.map((item, index) => {
                                                        return (
                                                            <div className='comment-video-item' key={index}>
                                                                <div className='item-comment-avatar' onClick={() => this.handleViewDetailChannel(item.author?.channelId, "channel")}>
                                                                    <img className='item-comment-avatar-img'
                                                                        src={item.author?.avatar[0]?.url} />
                                                                </div>
                                                                <div className='info-comment'>
                                                                    <div className='name-client-comment'>
                                                                        <div className='name-comment'>
                                                                            {(item.author?.title === video.author?.canonicalBaseUrl.substring(1)) ?
                                                                                (<b style={{ color: '#fff', background: '#888', padding: '0 10px', borderRadius: '10px', cursor: 'pointer' }} onClick={() => this.handleViewDetailChannel(item.author?.channelId, "channel")}>
                                                                                    {item.author?.title}</b>) :
                                                                                (<b onClick={() => this.handleViewDetailChannel(item.author?.channelId, "channel")}>{item.author?.title}</b>)}
                                                                            {' '}
                                                                            {item?.author?.badges[0]?.type ===
                                                                                "VERIFIED_CHANNEL" && (
                                                                                    <BsFillCheckCircleFill className='icon-item-video-author' />
                                                                                )}
                                                                        </div>
                                                                        {'  '} {item.publishedTimeText}
                                                                    </div>
                                                                    <div className='content-comment'>
                                                                        {item.content}
                                                                    </div>
                                                                    <div className='like-dislike-comment'>
                                                                        <div className='icon-comment'><AiOutlineLike /></div>{item.stats.votes !== 0 ? ` ${item.stats.votes}` : ' '}
                                                                        <div className='icon-comment'><AiOutlineDislike /></div>
                                                                        <h6 className='reply'>Phản hồi</h6>
                                                                    </div>
                                                                    {item.stats.replies > 0 && arrChoice.map((itemChoice) => {
                                                                        if (itemChoice.cursor === item.cursorReplies) {
                                                                            return (
                                                                                (itemChoice.isShowReply) ?
                                                                                    (
                                                                                        <>
                                                                                            <div className='reply-comment' onClick={() => this.CloseReplyComment(itemChoice.cursor)}>
                                                                                                <img src={UpArrow} style={{ width: '20px' }} />
                                                                                                <span style={{ color: '#065fd4' }}>{item.stats.replies} phản hồi</span>
                                                                                            </div>
                                                                                            {itemChoice?.commentReplyVideo?.comments?.length > 0 && itemChoice?.commentReplyVideo?.comments?.map((itemSub, index) => {
                                                                                                return (
                                                                                                    <div className='comment-video-item' key={index}>
                                                                                                        <div className='item-comment-avatar'>
                                                                                                            <img className='item-comment-avatar-img'
                                                                                                                src={itemSub.author?.avatar[0]?.url} />
                                                                                                        </div>
                                                                                                        <div className='info-comment'>
                                                                                                            <div className='name-client-comment'>
                                                                                                                <b onClick={() => this.handleViewDetailChannel(itemSub.author?.channelId, "channel")}>{itemSub.author?.title}</b> {'  '} {itemSub.publishedTimeText}
                                                                                                            </div>
                                                                                                            <div className='content-comment'>
                                                                                                                {itemSub.content}
                                                                                                            </div>
                                                                                                            <div className='like-dislike-comment'>
                                                                                                                <div className='icon-comment'><AiOutlineLike /></div>{item.stats.votes !== 0 ? ` ${item.stats.votes}` : ' '}
                                                                                                                <div className='icon-comment'><AiOutlineDislike /></div>
                                                                                                                <h6 className='reply'>Phản hồi</h6>
                                                                                                            </div>
                                                                                                        </div></div>)
                                                                                            })}
                                                                                        </>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <div className='reply-comment' onClick={() => this.ShowReplyComment(itemChoice.cursor)}>
                                                                                            <img src={DownArrow} style={{ width: '20px' }} />
                                                                                            <span style={{ color: '#065fd4' }}>{item.stats.replies} phản hồi</span>
                                                                                        </div>
                                                                                    ))
                                                                        }

                                                                    })}




                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </div>

                        </div>)}
                    </CustomScrollbars>)
                    :
                    (<CustomScrollbars style={{ height: '100vh', width: '100%', display: 'flex' }}>
                        {isLoading && <div class="ring">Loading
                            <span></span>
                        </div>}
                        {!isLoading && (<div className='youtube-body'>
                            <div className='container-video'>
                                <div className='player-video'>
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${id}`}
                                        controls
                                        width="100%"
                                        height='500px'
                                        style={{ backgroundColor: "#000000" }}
                                        playing={true}
                                        onEnded={this.handleVideoEnd}
                                        ref={this.player}
                                    />
                                </div>

                                {Object.keys(video).length > 0 &&
                                    (<>
                                        <div className='video-title'>
                                            {video?.title}
                                        </div>
                                        <div className='info-video'>
                                            <div className='avatar-channel-video'
                                                onClick={() => this.handleViewDetailChannel(video.author?.channelId, "channel")}
                                            >
                                                <img
                                                    src={video?.author?.avatar[0]?.url}
                                                />
                                            </div>
                                            <div className='info-channel'>
                                                <div className='name-channel'>
                                                    <span
                                                        onClick={() => this.handleViewDetailChannel(video.author?.channelId, "channel")}
                                                    >{video?.author?.title}</span>
                                                    {video?.author?.badges[0]?.type ===
                                                        "VERIFIED_CHANNEL" && (
                                                            <BsFillCheckCircleFill className='icon-item-video-author' />
                                                        )}
                                                </div>
                                                <div className='number-sub-channel'>
                                                    {video?.author?.stats?.subscribersText}
                                                </div>
                                            </div>
                                            <div className='subscribe'>
                                                Đăng ký
                                            </div>
                                            <div className='video-interaction'>
                                                <div className='like-dislike-video'>
                                                    <div className='likes'>
                                                        <AiOutlineLike /> {this.test(video.stats?.likes)}

                                                    </div>
                                                    <div className='dislike'>
                                                        <AiOutlineDislike />
                                                    </div>
                                                </div>
                                                <div className='share-video'>
                                                    <img src={share} />Chia sẻ
                                                </div>
                                                <div className='other-video'>
                                                    <h6>. . .</h6>
                                                </div>
                                            </div>
                                        </div>

                                        {isShowMore === true ? (
                                            <div className='video-des' onClick={() => this.handleClickShowMore()}>
                                                {this.test(video.stats?.views)}lượt xem {` `}
                                                {this.showTimeAgo(video.publishedDate)} trước
                                                <b><pre>{video.description?.split('\n').slice(0, 4).join('\n')}...thêm</pre></b>
                                            </div>)
                                            :
                                            (<div className='video-des show-less' >
                                                {this.test(video.stats?.views)}lượt xem {` `}
                                                {this.showTimeAgo(video.publishedDate)}trước
                                                <pre>{video.description} <b onClick={() => this.handleClickShowMore()}> Ẩn bớt</b></pre>
                                            </div>)
                                        }
                                    </>)}
                                {Object.keys(commentVideo).length > 0 &&
                                    (
                                        <>
                                            <div className='comment-video'>
                                                <div className='totalCommentsCount'>
                                                    <h5><b>{commentVideo.totalCommentsCount}{'  '} bình luận</b></h5>
                                                    <div className='sorted'>
                                                        <img src={sorted} />
                                                        <h5>Sắp xếp theos</h5>
                                                    </div>
                                                </div>
                                                <div className='write-comment'>
                                                    <div className='avatar-channel'>
                                                        <h6><b>MN</b></h6>
                                                    </div>
                                                    <input placeholder='Viết bình luận' />
                                                </div>
                                                <div className='comment-video-list'>
                                                    {commentVideo.comments.length > 0 && commentVideo.comments.map((item, index) => {
                                                        return (
                                                            <div className='comment-video-item' key={index}>
                                                                <div className='item-comment-avatar' onClick={() => this.handleViewDetailChannel(item.author?.channelId, "channel")}>
                                                                    <img className='item-comment-avatar-img'
                                                                        src={item.author?.avatar[0]?.url} />
                                                                </div>
                                                                <div className='info-comment'>
                                                                    <div className='name-client-comment'>
                                                                        {(item.author.title === video.author?.canonicalBaseUrl.substring(1)) ?
                                                                            (<b style={{ color: '#fff', background: '#888', padding: '0 10px', borderRadius: '10px', cursor: 'pointer' }} onClick={() => this.handleViewDetailChannel(item.author?.channelId, "channel")}>
                                                                                {item.author?.title}</b>) :
                                                                            (<b onClick={() => this.handleViewDetailChannel(item.author?.channelId, "channel")}>{item.author?.title}</b>)}
                                                                        {'  '} {item.publishedTimeText}
                                                                    </div>
                                                                    <div className='content-comment'>
                                                                        {item.content}
                                                                    </div>
                                                                    <div className='like-dislike-comment'>
                                                                        <div className='icon-comment'><AiOutlineLike /></div>{item.stats.votes !== 0 ? ` ${item.stats.votes}` : ' '}
                                                                        <div className='icon-comment'><AiOutlineDislike /></div>


                                                                        <h6 className='reply'>Phản hồi</h6>

                                                                    </div>
                                                                    {item.stats.replies > 0 && arrChoice.map((itemChoice) => {
                                                                        if (itemChoice.cursor === item.cursorReplies) {
                                                                            return (
                                                                                (itemChoice.isShowReply) ?
                                                                                    (
                                                                                        <><div className='reply-comment' onClick={() => this.CloseReplyComment(itemChoice.cursor)}>
                                                                                            <img src={UpArrow} style={{ width: '20px' }} />
                                                                                            <span style={{ color: '#065fd4' }}>{item.stats.replies} phản hồi</span>

                                                                                        </div>
                                                                                            {itemChoice?.commentReplyVideo?.comments?.length > 0 && itemChoice?.commentReplyVideo?.comments?.map((itemSub, index) => {
                                                                                                return (
                                                                                                    <div className='comment-video-item' key={index}>
                                                                                                        <div className='item-comment-avatar'>
                                                                                                            <img className='item-comment-avatar-img'
                                                                                                                src={itemSub.author?.avatar[0]?.url} />
                                                                                                        </div>
                                                                                                        <div className='info-comment'>
                                                                                                            <div className='name-client-comment'>
                                                                                                                <b onClick={() => this.handleViewDetailChannel(itemSub.author?.channelId, "channel")}>{itemSub.author?.title}</b> {'  '} {itemSub.publishedTimeText}
                                                                                                            </div>
                                                                                                            <div className='content-comment'>
                                                                                                                {itemSub.content}
                                                                                                            </div>
                                                                                                            <div className='like-dislike-comment'>
                                                                                                                <div className='icon-comment'><AiOutlineLike /></div>{item.stats.votes !== 0 ? ` ${item.stats.votes}` : ' '}
                                                                                                                <div className='icon-comment'><AiOutlineDislike /></div>
                                                                                                                <h6 className='reply'>Phản hồi</h6>
                                                                                                            </div>
                                                                                                        </div></div>)
                                                                                            })}</>)
                                                                                    :
                                                                                    (
                                                                                        <div className='reply-comment' onClick={() => this.ShowReplyComment(itemChoice.cursor)}>
                                                                                            <img src={DownArrow} style={{ width: '20px' }} />
                                                                                            <span style={{ color: '#065fd4' }}>{item.stats.replies} phản hồi</span>
                                                                                        </div>
                                                                                    ))
                                                                        }

                                                                    })}



                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </div>
                            <span>

                                {(this.props.location?.search !== '') &&
                                    (
                                        (isShowPlayList ?
                                            (<div className='container-video-in-playList'>
                                                <div className='playlist-name' onClick={() => this.playList()}>
                                                    <h3><b>{this.props.location?.state?.PlayList?.snippet?.localized?.title}</b></h3>

                                                </div>
                                                <div className='playlistInfo'>
                                                    <div className='name-channel'>
                                                        {this.props.location?.state?.PlayList?.snippet?.channelTitle}{'  -  '}
                                                        {newUrl.get('index')}/{this.props.location.state.arrVideoPlayListPromise.length}
                                                        <img src={ClosePlayList} onClick={() => this.handleShowPlayList()} />
                                                    </div>
                                                    <div className='icon-interact'>
                                                        <div className='Repeat-play-list'>
                                                            <img className={isRepeat ? 'icon-interact-img-active' : 'icon-interact-img'} onClick={() => this.handleRepeat()} src={Repeat} />
                                                        </div>
                                                        <div className='Random-play-list'>
                                                            <img className={isRandom ? 'icon-interact-img-active' : 'icon-interact-img'} onClick={() => this.handleRandom()} src={RanDom} />
                                                        </div>


                                                        <div className='save-playList'><img src={Button} /></div>
                                                    </div>

                                                </div>
                                                <CustomScrollbars style={{ height: '370px', width: '100%', display: 'flex' }}>
                                                    {this.props.location?.state?.arrVideoPlayListPromise && this.props.location?.state?.arrVideoPlayListPromise.length > 0//this.state.arrPlayList[0].id
                                                        &&
                                                        (this.props.location?.state?.arrVideoPlayListPromise?.map((item, index) => {
                                                            return (
                                                                <div className="item-video" key={index} onClick={() => this.handleVideoInPlayList((index + 1), item.id)}>
                                                                    <div className='index-video'>
                                                                        {(indexVideo === `${index + 1}`) ? <img src={RightArrow} /> : `${index + 1}`}
                                                                    </div>
                                                                    <div className='item-video-thumbnails'>
                                                                        <img className="item-video-img" src={item.img} />
                                                                        <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                    </div>
                                                                    <div className='item-video-info'>
                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, (((windowWidth / 3) - 45) * 9 / 10) - 342)}{this.showEllipsis(item.title, (((windowWidth / 3) - 45) * 9 / 10) - 342)}</b></h6>
                                                                        </div>
                                                                        <div className='name-channel'>

                                                                            <h6>{item.channel}</h6>

                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            )



                                                        }))
                                                    }
                                                </CustomScrollbars>




                                            </div>)
                                            :
                                            (<div className='container-video-in-playList min' onClick={() => this.handleShowPlayList()}>
                                                <div className='playlist-panel'>
                                                    <b>Tiếp theo:</b>
                                                    {this.props.location?.state?.arrVideoPlayListPromise && this.props.location?.state?.arrVideoPlayListPromise.length > 0 &&
                                                        (this.props.location?.state?.arrVideoPlayListPromise?.map((item, index) => {
                                                            if ((+(indexVideo)) === (index)) {
                                                                return (
                                                                    <div className='item-video-info'>
                                                                        <div className="item-video-title">
                                                                            <h6>{item.title.substring(0, (((windowWidth / 3) - 45) * 9 / 10) - 342)}{this.showEllipsis(item.title, (((windowWidth / 3) - 45) * 9 / 10) - 342)}</h6>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            }




                                                        }))}




                                                </div>
                                                <div className='playlist-panel'>
                                                    {this.props.location?.state?.PlayList?.snippet?.localized?.title}

                                                    {'  -  '}
                                                    {newUrl.get('index')}/{this.props.location.state.arrVideoPlayListPromise.length}
                                                    <img src={ShowPlayList}  />
                                                </div>



                                            </div>))

                                    )}
                                <div className='container-videoRelated'>
                                    {arrVideoRelated && arrVideoRelated.length > 0 && arrVideoRelated.map((item, index) => {
                                        if (item.type === 'video' && !item.video.isLiveNow) {
                                            return (
                                                <div className='container-item-videoRelated' onClick={() => this.handleViewDetailVideo(item)}>
                                                    <div className='item-videoRelated' key={index}>
                                                        <div className='item-videoRelated-thumbnails'>
                                                            <img className='item-videoRelated-thumbnails-img' src={item.video?.thumbnails[0]?.url} />
                                                            {item.video.lengthSeconds && (
                                                                <VideoLength time={item.video?.lengthSeconds} />
                                                            )}
                                                        </div>
                                                        <div className='item-videoRelated-info'>



                                                            <div className='item-videoRelated-author'>
                                                                <span className='item-videoRelated-info-title'>
                                                                    {item.video.title.substring(0, 50)}{this.showEllipsis(item.video.title, 50)}
                                                                </span>

                                                                <div className='item-videoRelated-author-title-icon'>
                                                                    <span onClick={() => this.handleViewDetailChannel(item.video.videoId, "video")}>{item.video?.author?.title}</span>
                                                                    {item.video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                                                        <BsFillCheckCircleFill className='icon-item-videoRelated-author' />
                                                                    )}
                                                                </div>
                                                                <div className='item-videoRelated-author-view-pushtime'>
                                                                    <div>{`${this.test(item.video?.stats?.views)}lượt xem`}</div>
                                                                    <div className='dot'><h6>&#x2022;</h6></div>
                                                                    <div className='item-videoRelated-author-pushtime'>
                                                                        {item.video?.publishedTimeText}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    })}


                                </div>
                            </span>

                        </div>)}
                    </CustomScrollbars>)}





            </>





        );
    }

}

const mapStateToProps = state => {
    return {
        //isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Video));


