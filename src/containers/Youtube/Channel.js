import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from '../Header/menuApp';
import { abbreviateNumber } from "js-abbreviation-number";
import LeftNav from './LeftNav';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import {
    fetchDataChannelDetailsChannelFromApi,
    fetchDataPlayListDetailFromApi,
    fetchArrVideoDataChannelChoiceFromApi,
    fetchDetailVideoDataChannelFromApi,
    fetchDataArrVideoInPlayListChannelFromApi,
    fetchDataArrPostCommunityChannelFromApi,
    fetchDataVideoSearchInChannelFromApi
} from '../../utils/api';
import VideoLength from '../../utils/videoLength';
import CustomScrollbars from '../../components/CustomScrollbars';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import RightArrow from '../../assets/images/images/rightArrow.svg';
import PlayList from '../../assets/images/images/iconPlayList.svg';
import IconPlayList from '../../assets/images/images/iconPlayListImg.svg';
import Shared from '../../assets/images/images/share.svg';
import Comment from '../../assets/images/images/commentPost.svg';
import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";
import { listChoiceChannel, listChoiceVideoChannel, listChoiceSubChannel } from '../../utils';
import { FiBell } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalDes from './ModalDes';
import moment from 'moment';
import { IoIosSearch } from "react-icons/io";
require('moment/locale/vi');
class Channel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideo: [],
            arrVideoRating: [],
            arrVideoOld: [],
            arrVideoNew: [],
            arrVideoPopular: [],
            isLoading: true,
            itemSelect: 'Trang chủ',
            channel: {},
            isOpenModalDes: false,
            itemSelectSub: 'Mới nhất',
            inputValue: '',
            arrPlayList: [],
            arrVideoPlayList: [],
            arrPostCommunity: [],
            arrVideoSearch: [],
            isShowLeftNav: true,
            isLeftNavTotalScreen: false,
            isShowSearch: false,
            windowWidth: window.innerWidth,
            ishomePageChannel: true,
            query: ''

        }; this.handleResize = this.handleResize.bind(this);
    }///search/:search
    async componentDidMount() {
        let number = 7;
        let detailChannel = await fetchDataChannelDetailsChannelFromApi(this.props.match.params.channel)
        this.setState({
            channel: detailChannel,
            isLoading: true
        })
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        console.log('show detail channel', detailChannel);
        console.log('props channel', this.props);
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        if (this.state.channel.stats.videos !== null) {
            let dataArrVideoRating = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'rating');
            let arrVideoRating = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoRating.items);
            let arrVideoRatingPromise = await Promise.all(arrVideoRating);
            this.setState({
                arrVideoRating: arrVideoRatingPromise
            })
            console.log('arrVideoRating', this.state.arrVideoRating);
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
            let dataArrVideoNew = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'date');
            let arrVideoNew = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoNew.items);
            let arrVideoNewPromise = await Promise.all(arrVideoNew);
            this.setState({
                arrVideoNew: arrVideoNewPromise
            })
            console.log('arrVideoNew', this.state.arrVideoNew);
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });
            let dataArrVideoPopular = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'viewCount');
            let arrVideoPopular = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoPopular.items);
            let arrVideoPopularPromise = await Promise.all(arrVideoPopular);
            this.setState({
                arrVideoPopular: arrVideoPopularPromise
            })
            console.log('arrVideoPopular', this.state.arrVideoPopular)

            let oldDate2 = new Date(this.state.channel.joinedDateText.match(/\d+/g).reverse().join('-'));
            let i = 4;
            if (this.state.channel.stats.videos > number) {
                while (this.state.arrVideoOld.length < number) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, i * 1000);
                    });
                    oldDate2.setMonth(oldDate2.getMonth() + 2);
                    let dataArrVideoOld = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'relevance', oldDate2);
                    let arrVideoOld = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoOld.items);
                    let arrVideoOldPromise = await Promise.all(arrVideoOld);
                    this.setState({
                        arrVideoOld: arrVideoOldPromise
                    })
                    i++;
                }
            } else {
                while (this.state.arrVideoOld.length < this.state.channel.stats.videos) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, i * 1000);
                    });
                    oldDate2.setMonth(oldDate2.getMonth() + 2);
                    let dataArrVideoOld = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'relevance', oldDate2);
                    let arrVideoOld = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoOld.items);
                    let arrVideoOldPromise = await Promise.all(arrVideoOld);
                    this.setState({
                        arrVideoOld: arrVideoOldPromise
                    })
                    i++;
                }
            }

            console.log('this.state.channel.joinedDateText', this.state.channel.joinedDateText)
            console.log('arrVideoOld', this.state.arrVideoOld)

            let playlistsChannel = await fetchDataPlayListDetailFromApi(this.props.match.params.channel);
            let playlistsDetailChannel = {};
            await new Promise((resolve) => {
                setTimeout(resolve, (i + 1) * 1000);
            });

            if (playlistsChannel.pageInfo.totalResults > number) {
                playlistsDetailChannel = await fetchDataPlayListDetailFromApi(this.props.match.params.channel, number);
            } else {
                playlistsDetailChannel = await fetchDataPlayListDetailFromApi(this.props.match.params.channel, playlistsChannel.pageInfo.totalResults);
            }
            this.setState({
                arrPlayList: playlistsDetailChannel.items
            })
            console.log('play list', playlistsChannel)
            console.log('play list detail', playlistsDetailChannel)


            let dataArrVideoPlayListDetail = {};
            await new Promise((resolve) => {
                setTimeout(resolve, (i + 2) * 1000);
            });
            if (this.state.arrPlayList[0].contentDetails.itemCount > number) {
                dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(this.state.arrPlayList[0].id, number);
            } else {
                dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(this.state.arrPlayList[0].id, this.state.arrPlayList[0].contentDetails.itemCount);
            }
            let arrVideoPlayList = await this.buildArrInfoVideoItemOfPlayListChannelv2(dataArrVideoPlayListDetail.items);
            let arrVideoPlayListPromise = await Promise.all(arrVideoPlayList);
            this.setState({
                arrVideoPlayList: arrVideoPlayListPromise
            })
            console.log('arrVideoPlayList', this.state.arrVideoPlayList)
            await new Promise((resolve) => {
                setTimeout(resolve, (i + 3) * 1000);
            });
            let arrPostCommunity = await fetchDataArrPostCommunityChannelFromApi(this.props.match.params.channel);
            this.setState({
                arrPostCommunity: arrPostCommunity.contents
            })
            console.log('arrPostCommunity', this.state.arrPostCommunity)
        }

        this.setState({
            isLoading: false
        })
    }
    componentWillUnmount() {
        // Xóa event listener khi component bị unmount để tránh memory leak
        //window.innerWidth
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        this.setState({ windowWidth: window.innerWidth });
    }
    buildArrInfoVideoItemOfPlayListChannel = async (arrVideo) => {

        // Thực hiện xử lý trên từng đối tượng ở đây và trả về kết quả xử lý
        let processData = [];
        for (let i = 0; i < arrVideo.length; i++) {
            await new Promise((resolve) => {
                setTimeout(resolve, 200 * i);
            });
            let videoItem = await fetchDetailVideoDataChannelFromApi(arrVideo[i].id?.videoId);
            let obj = {};

            if (Object.keys(videoItem).length > 0) {
                obj.id = arrVideo[i].id.videoId;
                obj.time = arrVideo[i].snippet.publishedAt;
                obj.title = arrVideo[i].snippet.title;
                obj.img = arrVideo[i].snippet.thumbnails.high.url;
                obj.view = videoItem.items[0].statistics.viewCount;
                obj.duration = videoItem.items[0].contentDetails.duration;
                processData.push(obj)
            }
            // Thêm các trường khác cần xử lý

            // Xử lý kết quả API ở đây
        }

        return processData;
    };
    buildArrInfoVideoItemOfPlayListChannelv2 = async (arrVideo) => {

        // Thực hiện xử lý trên từng đối tượng ở đây và trả về kết quả xử lý
        let processData = [];
        for (let i = 0; i < arrVideo.length; i++) {

            await new Promise((resolve) => {
                setTimeout(resolve, 200 * i);
            });
            if (arrVideo[i].status?.privacyStatus === "public") {
                let videoItem = await fetchDetailVideoDataChannelFromApi(arrVideo[i].snippet?.resourceId?.videoId);
                let obj = {};

                obj.id = arrVideo[i].snippet?.resourceId?.videoId;
                obj.time = videoItem?.items[0]?.snippet?.publishedAt;
                obj.title = videoItem?.items[0]?.snippet?.title;
                //obj.img = videoItem?.items[0]?.snippet?.thumbnails?.default?.url;
                obj.img = videoItem?.items[0]?.snippet?.thumbnails?.maxres?.url;
                obj.view = videoItem?.items[0]?.statistics?.viewCount;
                obj.duration = videoItem?.items[0]?.contentDetails?.duration;
                obj.channel = this.state.channel.title;
                obj.checkChannel = this.state.channel.badges[0]?.type === 'VERIFIED_CHANNEL'
                // Thêm các trường khác cần xử lý
                processData.push(obj)
                // Xử lý kết quả API ở đây
            }

        }

        return processData;
    };

    buildDataSelect = (data) => {
        let result = [];

        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};

                obj.label = item;
                obj.value = item;
                result.push(obj)
            })

        }
        return result;

    }
    handleViewDetailVideo = (videoid) => {


        this.props.history.push(`/video/${videoid}`)
        this.setState({
            arrVideoRating: {},
            isLoading: true,
            itemSelect: 'Tất cả'
        })
    }
    handleClickChoice = async (dataChoice) => {
        this.setState({
            isLoading: true
        })
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        this.setState({
            itemSelect: dataChoice,
            isLoading: false
        })

        // let arrVideo = await fetchDataFromApi(`search/?q=${dataChoice}`);
        // //let test = await fetchDataFromv3Api();
        // // console.log('test',test)
        // this.setState({
        //     isLoading: true,

        // })
        // console.log('arrVideo', arrVideo)
        // this.setState({
        //     arrVideo: arrVideo.contents

        // })
        // if (this.state.arrVideo.length > 0) {
        //     this.setState({
        //         isLoading: false
        //     })
        // } else {
        //     this.setState({
        //         isLoading: true
        //     })
        // }


    }
    handleClickChoiceSub = async (dataChoice) => {
        this.setState({
            isLoading: true
        })
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        this.setState({
            itemSelectSub: dataChoice,
            isLoading: false
        })
        console.log('itemSelectSub', this.state.itemSelectSub)
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

    handleOpenModalDes = () => {
        this.setState({
            isOpenModalDes: !this.state.isOpenModalDes
        })
    }
    showTimeAgo = (time) => {

        let videoCreationTime = moment(time);
        let currentTime = moment();

        let diff = moment.duration(currentTime.diff(videoCreationTime)).locale('vi').humanize()//.split(" ")?.filter(Boolean)?.[0];
        //let reslt = `${diff} năm trước`
        let arr = diff.split(" ");
        if (arr[0] === "một") {
            arr[0] = "1"
        }
        let reslt = arr.join(" ");
        return reslt;

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
    convertView = (data) => {
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
    textPost = (text) => {
        let arr = text.split(/https/g);
        arr[1] = 'https' + arr[1];
        return (<>
            <div>{arr[0]}</div>
            <a href={arr[1]}>{arr[1]}</a>
        </>

        )
    }
    showPostComment = (item, channel, text) => {
        console.log('post item', item);
        let arr = { item: item, channel: channel, text: text }
        this.props.history.push(`/post/${item.post.postId}`, arr)
        this.setState({
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả'
        })
    }
    showEllipsis = (text, length) => {
        let res = text.length > length ? '...' : '';
        return res;
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
    showVideoInPlayList = async (PlayList) => {
        let number = 7;
        this.setState({
            isLoading: true
        })
        let dataArrVideoPlayListDetail = {};
        if (PlayList.contentDetails.itemCount > number) {
            dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(PlayList.id, number);
        } else {
            dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(PlayList.id, PlayList.contentDetails.itemCount);
        }
        let arrVideoPlayList = await this.buildArrInfoVideoItemOfPlayListChannelv2(dataArrVideoPlayListDetail.items);
        let arrVideoPlayListPromise = await Promise.all(arrVideoPlayList);
        let info = {
            arrVideoPlayListPromise, PlayList
        }
        this.setState({
            isLoading: false
        })
        this.props.history.push(`/video/${arrVideoPlayListPromise[0].id}/?idPlaylist=${PlayList.id}&index=1`, info);
    }
    showPlayList = async (PlayList,event) => {
        let number = 7;
        event.stopPropagation();
        this.setState({
            isLoading: true
        })
        let dataArrVideoPlayListDetail = {};
        if (PlayList.contentDetails.itemCount > number) {
            dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(PlayList.id, number);
        } else {
            dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(PlayList.id, PlayList.contentDetails.itemCount);
        }
        let arrVideoPlayList = await this.buildArrInfoVideoItemOfPlayListChannelv2(dataArrVideoPlayListDetail.items);
        let arrVideoPlayListPromise = await Promise.all(arrVideoPlayList);
        let info = {
            arrVideoPlayListPromise, PlayList,
        }
        this.setState({
            isLoading: false
        })
        this.props.history.push(`/playlist/${PlayList.id}`, info);
    }
    ShowSearchChannel = (event) => {
        console.log('show search')
        event.stopPropagation();
        this.setState({
            isShowSearch: true
        })
    }
    HideSearchChannel = () => {
        console.log('hide search')
        this.setState({
            isShowSearch: false,
            inputValue: ''
        })
    }
    homePageChannel = () => {
        this.setState({
            ishomePageChannel: true
        })
    }
    handleKeyPress = async (event, query, channelId) => {
        if (this.state.channel.stats.videos !== null) {
            if (event.key === 'Enter') {
                this.setState({
                    isLoading: true,
                    itemSelect: 'Tìm kiếm'
                })
                let searchChannel = await fetchDataVideoSearchInChannelFromApi(channelId, query);
                await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
                this.setState({
                    isLoading: false,
                    arrVideoSearch: searchChannel.contents,

                })

            }
        } else {
            if (event.key === "Enter") {
                this.setState({
                    isLoading: true,
                    ishomePageChannel: false,
                    query: query
                })
                await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
                this.setState({
                    isLoading: false,


                })
            }
        }

    };
    handleViewDetailChannel = async () => {
        this.setState({
            isLoading: true
        })
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        this.setState({
            isLoading: false,
            itemSelect: 'Trang chủ'
        })
    }
    render() {
        //const { processLogout } = this.props;

        let { channel, arrVideoRating, isLoading, arrVideoNew, arrVideoPopular, arrVideoOld, itemSelect, arrVideo, itemSelectSub, arrPlayList, arrVideoPlayList, arrPostCommunity, isShowSearch, inputValue, arrVideoSearch, windowWidth, query, ishomePageChannel } = this.state;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: (windowWidth - 390) / 366,
            slidesToScroll: 1,
        };
        let settingsv1 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: (windowWidth - 390) / 220,
            slidesToScroll: 1,
        };
        return (<>
            <ModalDes isOpen={this.state.isOpenModalDes}
                channel={channel}
                handleOpenModalDes={this.handleOpenModalDes}
            />
            <HomeHeader
                hanleShowLeftNav={this.hanleShowLeftNav}
                handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                onClick={() => this.HideSearchChannel()}
            />
            <div className='youtube-body' onClick={() => this.HideSearchChannel()}>
                <LeftNav isShowLeftNav={this.state.isShowLeftNav}
                    isLeftNavTotalScreen={this.state.isLeftNavTotalScreen}
                    handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                />
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>

                    {isLoading ? (<div class="ring">Loading
                        <span></span>
                    </div>) ://channel.joinedDateText
                        //channel.stats.videos !== null
                        (<>
                            {Object.keys(channel).length > 0 &&
                                (
                                    <div className='container-detail-channel'>
                                        {(channel.banner !== null) &&
                                            (<div className='banner-channel'>
                                                <img src={channel.banner?.tv[3]?.url} />
                                            </div>)}

                                        <div className='info-channel'>
                                            <div className='info-channel-avatar'>
                                                <img src={channel.avatar[2]?.url} />
                                            </div>
                                            <div className='info-channel-content'>
                                                <div className='name-channel'>
                                                    <h1><b>{channel.title}</b></h1>
                                                    {channel.badges[0]?.type === 'VERIFIED_CHANNEL' && <BsFillCheckCircleFill className='icon-title-channel' />}
                                                </div>
                                                <div className='profile-channel'>
                                                    <div className='username-channel'>{channel.username}</div><div className='dot'><h6>&#x2022;</h6></div>
                                                    <div className='number-subscriber-channel'>{channel.stats?.subscribersText}</div><div className='dot'><h6>&#x2022;</h6></div>
                                                    <div className='number-video-channel'>{channel.stats?.videosText}</div>
                                                </div>
                                                <div className='des-channel' onClick={() => { this.handleOpenModalDes() }}>{channel.description?.substring(0, 85)}{this.showEllipsis(channel.description, 85)}
                                                    <img className='icon-des-channel' src={RightArrow} />
                                                </div>
                                                {channel.links?.length > 0 &&
                                                    (<div className='url-channel' onClick={() => { this.handleOpenModalDes() }}>
                                                        <a href={channel.links[0].targetUrl}>{channel.links[0].targetUrl.substring(12, 83)}{this.showEllipsis(channel.links[0].targetUrl, 83)}{' '}</a>
                                                        và {channel.links.length - 1}{' '}đường liên kết khác
                                                    </div>)}

                                                <div className='subscribe-join-channel'>
                                                    <div className='subscribe-channel'>Đăng ký</div>
                                                    <div className='join-channel'> Tham gia</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            {(channel.stats.videos !== null) ?
                                (
                                    <>
                                        <div className='list-choice-channel'>
                                            <ul>
                                                {listChoiceChannel.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <button
                                                                className={(itemSelect === item) ? 'choice-item channel' : 'choice-item'}
                                                                onClick={() => this.handleClickChoice(item)}
                                                            >
                                                                <b>{item}</b>
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                                <li className='icon-search-channel' onClick={(event) => this.ShowSearchChannel(event)}><IoIosSearch className='icon-home-header' />
                                                </li> {isShowSearch && (<li className='search-channel'>
                                                    <input
                                                        type="text"
                                                        value={inputValue}
                                                        onChange={(e) => this.setState({ inputValue: e.target.value })}
                                                        onKeyPress={(event) => this.handleKeyPress(event, inputValue, this.props.match.params.channel)}
                                                        placeholder='Tìm kiếm'
                                                        onClick={(event) => this.ShowSearchChannel(event)}
                                                    />
                                                </li>)}
                                            </ul>
                                        </div>
                                        {itemSelect === 'Trang chủ' &&
                                            (<div className='channel-section'>
                                                <div className='rating'>
                                                    <h3><b>Dành cho bạn</b></h3>
                                                    <Slider {...settings}>
                                                        {arrVideoRating && arrVideoRating.length > 0
                                                            &&
                                                            (arrVideoRating.map((item) => {


                                                                return (
                                                                    <div className="item-video" onClick={() => this.handleViewDetailVideo(item.id)}>
                                                                        <div className='item-video-thumbnails'>
                                                                            <img className="item-video-img" src={item.img} />
                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                        </div>

                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, 80)}{this.showEllipsis(item.title, 80)}</b></h6>
                                                                        </div>
                                                                        <div className="item-video-info">
                                                                            {this.convertView(item.view)}lượt xem {` `}
                                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                                            {this.showTimeAgo(item.time)} trước
                                                                        </div>
                                                                    </div>
                                                                )



                                                            }))
                                                        }


                                                    </Slider>
                                                </div>
                                                <div className='new'>
                                                    <div className='new-text'>
                                                        <h3><b>Video</b></h3>
                                                        <div className='play'>
                                                            <img src={PlayList} />
                                                            <b>Phát tất cả</b>
                                                        </div>
                                                    </div>
                                                    <Slider {...settingsv1}>
                                                        {arrVideoNew && arrVideoNew.length > 0
                                                            &&
                                                            (arrVideoNew.map((item) => {
                                                                return (
                                                                    <div className="item-video" onClick={() => this.handleViewDetailVideo(item.id)}>
                                                                        <div className='item-video-thumbnails'>
                                                                            <img className="item-video-img" src={item.img} />
                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                        </div>
                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, 43)}{this.showEllipsis(item.title, 43)}</b></h6>
                                                                        </div>
                                                                        <div className="item-video-info">
                                                                            {this.convertView(item.view)}lượt xem {` `}
                                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                                            {this.showTimeAgo(item.time)} trước
                                                                        </div>
                                                                    </div>
                                                                )



                                                            }))
                                                        }


                                                    </Slider>
                                                </div>
                                                <div className='playlist'>
                                                    <div className='playlist-text'>
                                                        <h3><b>Video phổ biến</b></h3>
                                                        <div className='play'>
                                                            <img src={PlayList} />
                                                            <b>Phát tất cả</b>
                                                        </div>
                                                    </div>
                                                    <Slider {...settingsv1}>
                                                        {arrVideoPopular && arrVideoPopular.length > 0
                                                            &&
                                                            (arrVideoPopular.map((item) => {
                                                                return (
                                                                    <div className="item-video" onClick={() => this.handleViewDetailVideo(item.id)}>
                                                                        <div className='item-video-thumbnails'>
                                                                            <img className="item-video-img" src={item.img} />
                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                        </div>
                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, 43)}{this.showEllipsis(item.title, 43)}</b></h6>
                                                                        </div>
                                                                        <div className="item-video-info">
                                                                            {this.convertView(item.view)}lượt xem {` `}
                                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                                            {this.showTimeAgo(item.time)} trước
                                                                        </div>
                                                                    </div>
                                                                )



                                                            }))
                                                        }


                                                    </Slider>
                                                </div>
                                                <div className='playlist'>
                                                    <div className='playlist-text'>
                                                        <h3><b>Video cũ</b></h3>
                                                        <div className='play'>
                                                            <img src={PlayList} />
                                                            <b>Phát tất cả</b>
                                                        </div>
                                                    </div>
                                                    <Slider {...settingsv1}>
                                                        {arrVideoOld && arrVideoOld.length > 0
                                                            &&
                                                            (arrVideoOld.map((item) => {
                                                                return (
                                                                    <div className="item-video" onClick={() => this.handleViewDetailVideo(item.id)}>
                                                                        <div className='item-video-thumbnails'>
                                                                            <img className="item-video-img" src={item.img} />
                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                        </div>
                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, 43)}{this.showEllipsis(item.title, 43)}</b></h6>
                                                                        </div>
                                                                        <div className="item-video-info">
                                                                            {this.convertView(item.view)}lượt xem {` `}
                                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                                            {this.showTimeAgo(item.time)} trước
                                                                        </div>
                                                                    </div>
                                                                )



                                                            }))
                                                        }


                                                    </Slider>
                                                </div>
                                                <div className='playlist'>
                                                    <div className='playlist-text'>
                                                        <h3><b>{arrPlayList[0]?.snippet?.localized?.title}</b></h3>
                                                        <div className='play'>
                                                            <img src={PlayList} />
                                                            <b>Phát tất cả</b>
                                                        </div>
                                                    </div>
                                                    <Slider {...settingsv1}>
                                                        {arrVideoPlayList && arrVideoPlayList.length > 0//this.state.arrPlayList[0].id
                                                            &&
                                                            (arrVideoPlayList.map((item) => {
                                                                return (
                                                                    <div className="item-video" onClick={() => this.handleViewDetailVideo(item.id)} >
                                                                        <div className='item-video-thumbnails'>
                                                                            <img className="item-video-img" src={item.img} />
                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                                        </div>
                                                                        <div className="item-video-title">
                                                                            <h6><b>{item.title.substring(0, 43)}{this.showEllipsis(item.title, 43)}</b></h6>
                                                                        </div>
                                                                        <div className='name-channel'>

                                                                            <h6><b>{item.channel}</b></h6>
                                                                            {item.checkChannel && <BsFillCheckCircleFill className='icon-title-channel' />}
                                                                        </div>
                                                                        <div className="item-video-info">
                                                                            {this.convertView(item.view)}lượt xem {` `}
                                                                            <div className='dot'><h6>&#x2022;</h6></div>
                                                                            {this.showTimeAgo(item.time)} trước
                                                                        </div>
                                                                    </div>
                                                                )



                                                            }))
                                                        }


                                                    </Slider>
                                                </div>
                                            </div>)}
                                        {itemSelect === 'Video' &&
                                            (<>
                                                <div className='list-choice'>
                                                    <ul>{listChoiceSubChannel.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <button
                                                                    className={(itemSelectSub === item) ? 'choice-item active' : 'choice-item'}
                                                                    onClick={() => this.handleClickChoiceSub(item)}
                                                                >
                                                                    <b>{item}</b>
                                                                </button>
                                                            </li>
                                                        )
                                                    })}</ul>
                                                </div>
                                                {itemSelectSub === 'Mới nhất' &&
                                                    (<div className='container-choice-sub-channel'>

                                                        {arrVideoNew.length > 0 && arrVideoNew.map((item, index) => {

                                                            return (
                                                                <div className='container-item-video' onClick={() => this.handleViewDetailVideo(item.id)}>
                                                                    <div className='item-video' key={index}
                                                                    >
                                                                        <div className='item-video-thumbnails' >
                                                                            <img className='item-video-thumbnails-img' src={item.img} />

                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />

                                                                        </div>
                                                                        <div className='item-video-info'>



                                                                            <div className='item-video-author'>
                                                                                <span className='item-video-info-title' >
                                                                                    <h6><b>{item.title.substring(0, 58)}{this.showEllipsis(item.title, 58)}</b></h6>
                                                                                </span>


                                                                                <div className='item-video-author-view-pushtime' >
                                                                                    <div> {this.convertView(item.view)}lượt xem {` `}</div>
                                                                                    <div className='dot'><h6>&#x2022;</h6></div>
                                                                                    <div className='item-video-author-pushtime'>
                                                                                        {this.showTimeAgo(item.time)} trước
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )


                                                        })}

                                                    </div>)}
                                                {itemSelectSub === 'Phổ biến' &&
                                                    (<div className='container-choice-sub-channel'>

                                                        {arrVideoPopular.length > 0 && arrVideoPopular.map((item, index) => {

                                                            return (

                                                                <div className='container-item-video' onClick={() => this.handleViewDetailVideo(item.id)} >
                                                                    <div className='item-video' key={index}
                                                                    >
                                                                        <div className='item-video-thumbnails' >
                                                                            <img className='item-video-thumbnails-img' src={item.img} />

                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />

                                                                        </div>
                                                                        <div className='item-video-info'>
                                                                            <div className='item-video-author'>
                                                                                <span className='item-video-info-title' >
                                                                                    <h6><b>{item.title.substring(0, 58)}{this.showEllipsis(item.title, 58)}</b></h6>
                                                                                </span>


                                                                                <div className='item-video-author-view-pushtime' >
                                                                                    <div> {this.convertView(item.view)}lượt xem {` `}</div>
                                                                                    <div className='dot'><h6>&#x2022;</h6></div>
                                                                                    <div className='item-video-author-pushtime'>
                                                                                        {this.showTimeAgo(item.time)} trước
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>



                                                            )


                                                        })}

                                                    </div>)}
                                                {itemSelectSub === 'Cũ nhất' &&
                                                    (<div className='container-choice-sub-channel'>

                                                        {arrVideoOld.length > 0 && arrVideoOld.map((item, index) => {

                                                            return (

                                                                <div className='container-item-video' onClick={() => this.handleViewDetailVideo(item.id)}>
                                                                    <div className='item-video' key={index}
                                                                    >
                                                                        <div className='item-video-thumbnails' >
                                                                            <img className='item-video-thumbnails-img' src={item.img} />

                                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />

                                                                        </div>
                                                                        <div className='item-video-info'>



                                                                            <div className='item-video-author'>
                                                                                <span className='item-video-info-title' >
                                                                                    <h6><b>{item.title.substring(0, 58)}{this.showEllipsis(item.title, 58)}</b></h6>
                                                                                </span>


                                                                                <div className='item-video-author-view-pushtime' >
                                                                                    <div> {this.convertView(item.view)}lượt xem {` `}</div>
                                                                                    <div className='dot'><h6>&#x2022;</h6></div>
                                                                                    <div className='item-video-author-pushtime'>
                                                                                        {this.showTimeAgo(item.time)} trước
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>



                                                            )


                                                        })}

                                                    </div>)}
                                            </>

                                            )}
                                        {itemSelect === 'Danh sách phát' &&
                                            (<>


                                                <div className='container-play-list-channel'>

                                                    {arrPlayList.length > 0 && arrPlayList.map((item, index) => {//this.state.arrPlayList[0].id

                                                        return (

                                                            <div className='container-item-video' onClick={() => this.showVideoInPlayList(item)}>
                                                                <div className='item-video' key={index}
                                                                >
                                                                    <div className='item-video-thumbnails'

                                                                    >
                                                                        <img className='item-video-thumbnails-img' src={item.snippet?.thumbnails?.high?.url} />

                                                                        <div className='count-video '>
                                                                            <img src={IconPlayList} />
                                                                            {item.contentDetails.itemCount}{' video'}
                                                                        </div>

                                                                    </div>
                                                                    <div className='item-video-info'>
                                                                        <div className='item-video-author'>
                                                                            <span className='item-video-info-title'

                                                                            >
                                                                                <h6><b>{item.snippet?.title?.substring(0, 43)}{this.showEllipsis(item.snippet?.title, 43)}</b></h6>
                                                                            </span>
                                                                            <div className='show-play-list'onClick={(event) => this.showPlayList(item,event)}>
                                                                                Xem toàn bộ danh sách
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        )


                                                    })}

                                                </div>

                                            </>

                                            )}
                                        {
                                            itemSelect === 'Cộng đồng' && (
                                                <div className='container-post'>
                                                    {arrPostCommunity.length > 0 && arrPostCommunity.map((item, index) => {
                                                        if (item.post?.attachment?.type === 'images') {
                                                            return (
                                                                <div className='container-post-item' key={index}>
                                                                    <div className='channel-avatar'>
                                                                        <img src={channel.avatar[channel.avatar.length - 1]?.url} />
                                                                    </div>
                                                                    <div className='info-post'>
                                                                        <div className='metadata'>
                                                                            <b>{channel.title}</b>
                                                                            <div className='published'>
                                                                                {this.convertVi(item.post?.publishedTimeText)}
                                                                            </div>
                                                                        </div>
                                                                        <div className='text-post'>
                                                                            {this.textPost(item.post?.text)}
                                                                        </div>
                                                                        <div className='img-post'>
                                                                            <img src={item.post?.attachment?.images[0]?.source[item.post?.attachment?.images[0]?.source.length - 1]?.url} />
                                                                        </div>

                                                                        <div className='interact-post'>

                                                                            <div className='likes'>
                                                                                <AiOutlineLike /> 

                                                                            </div>{item.post?.stats?.likes}
                                                                            <div className='dislike'>
                                                                                <AiOutlineDislike />
                                                                            </div>
                                                                            <div className='comment-post'><img src={Shared} /></div>
                                                                            

                                                                            <div className='reply' onClick={() => this.showPostComment(item, channel, this.convertVi(item.post?.publishedTimeText))}>
                                                                                <img src={Comment} />{item.post?.stats?.comments}

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    })}
                                                </div>
                                            )
                                        }
                                        {itemSelect === 'Tìm kiếm' &&

                                            (<div className='container-search-channel'>
                                                {arrVideoSearch.length > 0 && arrVideoSearch.map((item, index) => {
                                                    if (item.type === 'video') {
                                                        return (
                                                            <div className='container-item-video' onClick={() => this.handleViewDetailVideo(item.video.videoId)} key={index}>
                                                                <div className='item-video'

                                                                >
                                                                    <div className='item-video-thumbnails'>
                                                                        <img className='item-video-thumbnails-img' src={item.video?.thumbnails[item.video?.thumbnails?.length - 1]?.url} />
                                                                        {item.video?.lengthSeconds && (
                                                                            <VideoLength time={item.video?.lengthSeconds} />
                                                                        )}
                                                                    </div>
                                                                    <div className='item-video-info'>



                                                                        <div className='item-video-author'>
                                                                            <span className='item-video-info-title'>
                                                                                {item.video?.title.substring(0, (this.state.windowWidth - 419) / 3)}{this.showEllipsis(item.video?.title, (this.state.windowWidth - 419) / 3)}
                                                                            </span>
                                                                            <div className='item-video-author-view-pushtime'>
                                                                                <div className='name-channel-video'>
                                                                                    <span className='item-video-author-title'
                                                                                        onClick={() => this.handleViewDetailChannel()}
                                                                                    >{item.video?.author?.title}</span>
                                                                                    {item.video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                                                                        <BsFillCheckCircleFill className='icon-item-video-author' />
                                                                                    )}
                                                                                </div>
                                                                                <div className='video-pushtime-view'>
                                                                                    <div className='item-video-author-view'>{`${this.test(item.video?.stats?.views)}lượt xem`}</div>
                                                                                    <div className='dot'><h6>&#x2022;</h6></div>
                                                                                    <div className='item-video-author-pushtime'>
                                                                                        {item.video.publishedTimeText}
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <span className='item-video-info-des'>
                                                                                {item.video?.descriptionSnippet?.substring(0, (this.state.windowWidth - 386) / 2)}{this.showEllipsis(item.video?.descriptionSnippet, (this.state.windowWidth - 386) / 2)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                })}

                                            </div>)

                                        }
                                    </>
                                )
                                :
                                (<>
                                    <div className='list-choice-channel'>
                                        <ul>


                                            <li >
                                                <button
                                                    className='choice-item channel'
                                                    onClick={() => this.homePageChannel()}
                                                >
                                                    <b>Trang chủ</b>
                                                </button>
                                            </li>


                                            <li className='icon-search-channel' onClick={(event) => this.ShowSearchChannel(event)}><IoIosSearch className='icon-home-header' />
                                            </li> {isShowSearch && (<li className='search-channel'>
                                                <input
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={(e) => this.setState({ inputValue: e.target.value })}
                                                    onKeyPress={(event) => this.handleKeyPress(event, inputValue, this.props.match.params.channel)}
                                                    placeholder='Tìm kiếm'
                                                    onClick={(event) => this.ShowSearchChannel(event)}
                                                />
                                            </li>)}
                                        </ul>
                                    </div>
                                    {ishomePageChannel ? (
                                        <div className='emty-channel'>
                                            <div className='emty-channel-content'>
                                                <div className='emty-channel-img'>
                                                    <img id="img" draggable="false"
                                                        alt="" height="160"
                                                        src="https://www.gstatic.com/youtube/img/channels/mobile/empty_channel/light_800x800.png" />
                                                </div>
                                                <div className='emty-channel-text'>Kênh này không có bất kỳ nội dung nào</div>
                                            </div>
                                        </div>) : (<p className='emty-channel'>Kênh này không có nội dung phù hợp với "{query}"</p>)}

                                </>

                                )}


                        </>
                        )}


                    {/* <div className='container-home-page'>

                                {arrVideo.length > 0 && arrVideo.map((item, index) => {
                                    if (item.type === 'video') {
                                        return (

                                            <div className='container-item-video'  >
                                                <div className='item-video' key={index}

                                                >
                                                    <div className='item-video-thumbnails' onClick={() => this.handleViewDetailVideo(item)}>
                                                        <img className='item-video-thumbnails-img' src={item.video.thumbnails[0].url} />
                                                        {item.video.lengthSeconds && (
                                                            <VideoLength time={item.video.lengthSeconds} />
                                                        )}
                                                    </div>
                                                    <div className='item-video-info'>

                                                        <div className='item-video-avatar' onClick={() => this.handleViewDetailChannel(item.video?.author?.channelId)}>
                                                            <img className='item-video-avatar-img'
                                                                src={item.video.author.avatar[0].url} />
                                                        </div>

                                                        <div className='item-video-author'>
                                                            <span className='item-video-info-title' onClick={() => this.handleViewDetailVideo(item)}>
                                                                {item.video.title}
                                                            </span>
                                                           
                                                            <div className='item-video-author-title-icon'>
                                                                {item.video?.author?.title}
                                                                {item.video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                                                    <BsFillCheckCircleFill className='icon-item-video-author' />
                                                                )}
                                                            </div>
                                                            <div className='item-video-author-view-pushtime' onClick={() => this.handleViewDetailVideo(item)}>
                                                                <div>{`${this.test(item.video.stats.views)} lượt xem`}</div>
                                                                <div className='dot'><h3>&#x2022;</h3></div>
                                                                <div className='item-video-author-pushtime'>
                                                                    {item.video.publishedTimeText}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        )
                                    }

                                })}

                            </div> */}



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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channel));


