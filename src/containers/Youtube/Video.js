import React, { Component } from 'react';
import { connect } from 'react-redux';

import LeftNav from './LeftNav';
import { fetchDataVideoDetailsVideoFromApi, fetchDataVideoCommentsVideoFromApi,fetchDataVideoRelatedContentsVideoFromApi } from '../../utils/api';
import ReactPlayer from "react-player/youtube";
import HomeHeader from './HomeHeader';
import CustomScrollbars from '../../components/CustomScrollbars';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import share from '../../assets/images/images/share.svg';
import moment from 'moment';
import sorted from '../../assets/images/images/sorted.svg';
import VideoLength from '../../utils/videoLength';
require('moment/locale/vi');
class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideoRelated: [],
            video: {},
            isShowMore: true,
            commentVideo: {},
            reloadVideo:true,
            isLoading:true
        };
    }
    async componentDidMount() {//
        let video = await fetchDataVideoDetailsVideoFromApi(this.props.match.params.id);
        this.setState({
            video: video
        })
        let commentVideo = await fetchDataVideoCommentsVideoFromApi(this.props.match.params.id)
        this.setState({
            commentVideo: commentVideo
        })
        let arrVideoRelated = await fetchDataVideoRelatedContentsVideoFromApi(this.props.match.params.id)
        this.setState({
            arrVideoRelated: arrVideoRelated.contents
        })
        if((Object.keys(this.state.video).length > 0) && (Object.keys(this.state.commentVideo).length > 0) &&(this.state.arrVideoRelated.length > 0 )){
            this.setState({
                isLoading:false
            })
        } else {
            this.setState({
                isLoading:true
            })
        }
        console.log('detail video', video);
        console.log('comment video', commentVideo);
        console.log('VideoRelated',arrVideoRelated)
    }
     async componentDidUpdate(preProps, preState, snapshot) {
        if(this.props.match.params.id !== preProps.match.params.id){
            let video = await fetchDataVideoDetailsVideoFromApi(this.props.match.params.id);
        this.setState({
            video: video
        })
        let commentVideo = await fetchDataVideoCommentsVideoFromApi(this.props.match.params.id)
        this.setState({
            commentVideo: commentVideo
        })
        let arrVideoRelated = await fetchDataVideoRelatedContentsVideoFromApi(this.props.match.params.id)
        this.setState({
            arrVideoRelated: arrVideoRelated.contents
        })
        if((Object.keys(this.state.video).length > 0) && (Object.keys(this.state.commentVideo).length > 0) &&(this.state.arrVideoRelated.length > 0 )){
            this.setState({
                isLoading:false
            })
        } else {
            this.setState({
                isLoading:true
            })
        }
        }
     }
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
        // console.log('time show',timea)
        // console.log('videoCreationTime',videoCreationTime);
        // console.log('currentTime',currentTime);
        // console.log('diff',diff);
        // console.log('reslt',reslt)
    }
    handleViewDetailVideo = (video) => {
        console.log('video', video);
        this.setState ({
            reloadVideo:! this.state.reloadVideo
        })
        this.props.history.push(`/video/${video.video.videoId}`)
        this.setState({
            arrVideoRelated: [],
            video: {},
            isShowMore: true,
            commentVideo: {},
            reloadVideo:true,
            isLoading:true
        })
    }
    render() {
        console.log('this.props.match.params.id', this.props.match.params.id)
        console.log('this.props', this.props)
        //const { processLogout } = this.props;
        let { arrVideoRelated, video, isShowMore, commentVideo,isLoading } = this.state;
        let id = this.props.match.params.id;

        return (
            <>


                <HomeHeader/>
                {/* <LeftNav/> */}
                <CustomScrollbars style={{ height: '100vh', width: '100%', display: 'flex' }}>
                {isLoading && <div class="ring">Loading
                                        <span></span>
                                </div>}
                    {!isLoading &&(<div className='youtube-body'>
                        <div className='container-video'>
                            <div className='player-video'>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${id}`}
                                    controls
                                    width="100%"
                                    height='500px'
                                    style={{ backgroundColor: "#000000" }}
                                    playing={true}
                                />
                            </div>

                            {Object.keys(video).length > 0 &&
                                (<>
                                    <div className='video-title'>
                                        {video?.title}
                                    </div>
                                    <div className='info-video'>
                                        <div className='avatar-channel-video'>
                                            <img
                                                src={video?.author?.avatar[0]?.url}
                                            />
                                        </div>
                                        <div className='info-channel'>
                                            <div className='name-channel'>
                                                {video?.author?.title.substring(0,8)}...
                                                {video?.author?.badges[0]?.type ===
                                                    "VERIFIED_CHANNEL" && (
                                                        <BsFillCheckCircleFill className='icon-item-video-author' />
                                                    )}
                                            </div>
                                            <div className='number-sub-channel'>
                                                {video?.author?.stats?.subscribersText.substring(0,13)}...
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
                                                <img src={sorted} />
                                                <h5>Sắp xếp theo</h5>
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
                                                            <div className='item-comment-avatar'>
                                                                <img className='item-comment-avatar-img'
                                                                    src={item.author?.avatar[0]?.url} />
                                                            </div>
                                                            <div className='info-comment'>
                                                                <div className='name-client-comment'>
                                                                    <b>{item.author?.title}</b> {'  '} {item.publishedTimeText}
                                                                </div>
                                                                <div className='content-comment'>
                                                                    {item.content}
                                                                </div>
                                                                <div className='like-dislike-comment'>
                                                                    <AiOutlineLike />{` ${item.stats.votes}`}
                                                                    <AiOutlineDislike />
                                                                    <h6>Phản hồi</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                        </div>
                        <div className='container-videoRelated'>
                            {arrVideoRelated && arrVideoRelated.length > 0 && arrVideoRelated.map((item, index) => {
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
                                                        {item.video.title.substring(0, 50)}...
                                                    </span>

                                                    <div className='item-videoRelated-author-title-icon'>
                                                        {item.video?.author?.title}
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
                            })}


                        </div>
                    </div>)}
                </CustomScrollbars>




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

export default connect(mapStateToProps, mapDispatchToProps)(Video);


