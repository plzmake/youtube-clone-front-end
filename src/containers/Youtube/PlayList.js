import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import RanDom from '../../assets/images/images/random.svg';
import RightArrow from '../../assets/images/images/RightArrowPlayListBlack.svg';
import LeftNav from './LeftNav';
import CustomScrollbars from '../../components/CustomScrollbars';
import { playList } from '../../utils';
import moment from 'moment';
import VideoLength from '../../utils/videoLength';
require('moment/locale/vi');
class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            label: '',
            commentPost: {},

            isShowLeftNav: true,
            isLeftNavTotalScreen: false
        };
    }
    componentDidMount() {
       

    }
    
    textPost = (text) => {
        let arr = text.split(/https/g);
        arr[1] = 'https' + arr[1];
        return (<>
            <div>{arr[0]}</div>
            <a href={arr[1]}>{arr[1]}</a>
        </>

        )
    }

    convertVi = (text) => {

        let arr = text.split(" ");
        arr[2] = 'trước';
        let e;

        switch (arr[1]) {
            case 'second':
                arr[1] = 'giây'
                break;
            case 'seconds':
                arr[1] = 'giây'
                break;
            case 'minute':
                arr[1] = 'phút'
                break;
            case 'minutes':
                arr[1] = 'phút'
                break;
            case 'hour':
                arr[1] = 'giờ'
                break;
            case 'hours':
                arr[1] = 'giờ'
                break;
            case 'day':
                arr[1] = 'ngày'
                break;
            case 'days':
                arr[1] = 'ngày'
                break;
            case 'week':
                arr[1] = 'tuần'
                break;
            case 'weeks':
                arr[1] = 'tuần'
                break;
            case 'month':
                arr[1] = 'tháng'
                break;
            case 'months':
                arr[1] = 'tháng'
                break;
            case 'year':
                arr[1] = 'năm'
                break;
            case 'years':
                arr[1] = 'năm'
                break;
            default:
                e = 'abc'
        }
        var str = arr.join(' ');
        return str;
    }
    hanleShowLeftNav = () => {
        this.setState({
            isShowLeftNav: !this.state.isShowLeftNav,

            isLeftNavTotalScreen: false
        })
    }
    handleShowLeftNavTotalScreen = () => {

        this.setState({
            isLeftNavTotalScreen: !this.state.isLeftNavTotalScreen,


        })
        console.log('isLeftNavTotalScreen', this.state.isLeftNavTotalScreen)
    }
    test = (data) => {
        if (data > 1000000) {//Math.floor(number * 10) % 10
            let text = `${Math.floor(data / 1000000)},${Math.floor(data / 100000) % 10} M  `;
            return text;
        } else if (data > 1000) {
            let text = `${Math.floor(data / 1000)},${Math.floor(data / 100) % 10} K  `;
            return text;
        } else {
            return `${data}  `
        }
    }
    showEllipsis = (text, length) => {
        let res = text.length > length ? '...' : '';
        return res;
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
    showVideoInPlayList =  (type) => {
        
        let videoId = '';
        let index ;
        if (type === 'play'){
            index = 1;
            videoId = this.props.location.state.arrVideoPlayListPromise[0].id;
        }
        else if (type === 'random'){
             index = Math.floor(Math.random() * this.props.location.state.arrVideoPlayListPromise.length) + 1;
             videoId = this.props.location.state.arrVideoPlayListPromise[index -1].id;
        }
        else {
            index = type +1;
            videoId = this.props.location.state.arrVideoPlayListPromise[type].id;
        }
        this.props.history.push(`/video/${videoId}/?idPlaylist=${this.props.match.params.playlistId}&index=${index}`, this.props.location?.state);
    }
    handleViewDetailChannel =  (channelId) => {
        
            
            this.props.history.push(`/channel/${channelId}`)
        
        

    }
    render() {
        console.log('this.props play list', this.props)

        
        
        return (
            <>
                <HomeHeader
                    hanleShowLeftNav={this.hanleShowLeftNav}
                    handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                />
                <div className='youtube-body'>
                    <LeftNav isShowLeftNav={this.state.isShowLeftNav}
                        isLeftNavTotalScreen={this.state.isLeftNavTotalScreen}
                        handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                    />
                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                        <div className='container-play-list'>
                            <div className='play-list-entry'>
                                <div className='play-list-content'>
                                    <div className='play-list-info'>
                                        <div className='play-list-entry-img'>
                                            <img src={this.props.location?.state?.arrVideoPlayListPromise[0].img} />
                                        </div>

                                        
                                        <div className='metadata-play-list'>
                                            <div className='metadata-play-list-content'>
                                                <div className='play-list-entry-name'>
                                                    <h3><b>{this.props.location?.state?.PlayList?.snippet?.localized?.title}</b></h3>
                                                </div>
                                                <div className='channel-Play-list-Interactive-Icon'>

                                                    <div className='name-channel-number-video'>
                                                        <div className='play-list-entry-name-channel' onClick={() => this.handleViewDetailChannel(this.props.location?.state?.PlayList?.snippet?.channelId)}>
                                                            {this.props.location?.state?.PlayList?.snippet?.channelTitle}
                                                        </div>
                                                        <div className='play-list-entry-count-video'>
                                                            {this.props.location?.state?.PlayList?.contentDetails?.itemCount}{'  '} video
                                                        </div>
                                                    </div>
                                                    <div className='list-icon-play-list'>
                                                        {playList.map((item) => {
                                                            return (
                                                                <div className='item-icon-play-list'>
                                                                    <img src={item} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='shufflePlayItem'>
                                        <div className='play' onClick={() => this.showVideoInPlayList('play')}>
                                            <img src={RightArrow} />
                                            Phát tất cả
                                        </div>
                                        <div className='random' onClick={() => this.showVideoInPlayList('random')}>
                                            <img src={RanDom} />
                                            Trộn bài
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className='list-video-play-list'>
                                <CustomScrollbars style={{ height: '100vh', width: '100%', display: 'flex' }}>
                                    {this.props.location?.state?.arrVideoPlayListPromise && this.props.location?.state?.arrVideoPlayListPromise.length > 0//this.state.arrPlayList[0].id
                                        &&
                                        (this.props.location?.state?.arrVideoPlayListPromise?.map((item, index) => {
                                            return (
                                                <div className="item-video" key={index} onClick={() => this.showVideoInPlayList(index)}>
                                                    <div className='index-video'>
                                                        {index + 1}
                                                    </div>
                                                    <div className='item-video-thumbnails'>
                                                        <img className="item-video-img" src={item.img} />
                                                        <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                    </div>
                                                    <div className='item-video-info'>
                                                        <div className="item-video-title">
                                                            <h6><b>{item.title.substring(0, 63)}{this.showEllipsis(item.title, 63)}</b></h6>
                                                        </div>
                                                        <div className='name-channel'>

                                                            <h6>{item.channel}</h6>
                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                            <div>{`${this.test(item.view)}lượt xem`}</div>
                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                            <div className='item-video-play-list-pushtime'>
                                                                {this.showTimeAgo(item.time)} trước
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            )



                                        }))
                                    }
                                </CustomScrollbars>
                            </div>

                        </div>
                    </CustomScrollbars>

                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);


