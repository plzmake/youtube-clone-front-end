import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from '../Header/menuApp';
import { abbreviateNumber } from "js-abbreviation-number";
import LeftNav from './LeftNav';
import {
    fetchDataChannelDetailsChannelFromApi,
    fetchDataPlayListDetailFromApi,
    fetchArrVideoDataChannelChoiceFromApi,
    fetchDetailVideoDataChannelFromApi,
    fetchDataArrVideoInPlayListChannelFromApi
} from '../../utils/api';
import VideoLength from '../../utils/videoLength';
import CustomScrollbars from '../../components/CustomScrollbars';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import RightArrow from '../../assets/images/images/rightArrow.svg';
import PlayList from '../../assets/images/images/iconPlayList.svg';
import IconPlayList from '../../assets/images/images/iconPlayListImg.svg';
import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";
import { listChoiceChannel, listChoiceVideoChannel, listChoiceSubChannel } from '../../utils';
import { FiBell } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalDes from './ModalDes';
import moment from 'moment';

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
            arrPlayList: [],
            arrVideoPlayList: [],
            arrPostCommunity:[]

        };
    }///search/:search
    async componentDidMount() {
        let detailChannel = await fetchDataChannelDetailsChannelFromApi(this.props.match.params.channel)
        this.setState({
            channel: detailChannel,
            //isLoading:true
        })
        console.log('show detail channel', detailChannel);
        console.log('props channel', this.props);
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 1000);
        // });
        // let dataArrVideoRating = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'rating');
        // let arrVideoRating = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoRating.items);
        // let arrVideoRatingPromise = await Promise.all(arrVideoRating);
        // this.setState({
        //     arrVideoRating: arrVideoRatingPromise
        // })
        // console.log('arrVideoRating', this.state.arrVideoRating);
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 2000);
        // });
        // let dataArrVideoNew = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'date');
        // let arrVideoNew = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoNew.items);
        // let arrVideoNewPromise = await Promise.all(arrVideoNew);
        // this.setState({
        //     arrVideoNew: arrVideoNewPromise
        // })
        // console.log('arrVideoNew', this.state.arrVideoNew);
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 3000);
        // });
        // let dataArrVideoPopular = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'viewCount');
        // let arrVideoPopular = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoPopular.items);
        // let arrVideoPopularPromise = await Promise.all(arrVideoPopular);
        // this.setState({
        //     arrVideoPopular: arrVideoPopularPromise
        // })
        // console.log('arrVideoPopular', this.state.arrVideoPopular)

        // let oldDate2 = new Date(this.state.channel.joinedDateText.match(/\d+/g).reverse().join('-'));
        // let i = 4;
        // while (this.state.arrVideoOld.length < 10) {
        //     await new Promise((resolve) => {
        //         setTimeout(resolve, i * 1000);
        //     });
        //     oldDate2.setMonth(oldDate2.getMonth() + 2);
        //     let dataArrVideoOld = await fetchArrVideoDataChannelChoiceFromApi(this.props.match.params.channel, 'relevance', oldDate2);
        //     let arrVideoOld = await this.buildArrInfoVideoItemOfPlayListChannel(dataArrVideoOld.items);
        //     let arrVideoOldPromise = await Promise.all(arrVideoOld);
        //     this.setState({
        //         arrVideoOld: arrVideoOldPromise
        //     })
        //     i++;
        // }
        // console.log('arrVideoOld', this.state.arrVideoOld)
        let i = 4;
        let playlistsChannel = await fetchDataPlayListDetailFromApi(this.props.match.params.channel);
        let playlistsDetailChannel = {};
        await new Promise((resolve) => {
            setTimeout(resolve, (i + 1) * 1000);
        });

        if (playlistsChannel.pageInfo.totalResults > 50) {
            playlistsDetailChannel = await fetchDataPlayListDetailFromApi(this.props.match.params.channel, 50);
        } else {
            playlistsDetailChannel = await fetchDataPlayListDetailFromApi(this.props.match.params.channel, playlistsChannel.pageInfo.totalResults);
        }
        this.setState({
            arrPlayList: playlistsDetailChannel.items
        })
        console.log('play list', playlistsChannel)
        console.log('play list detail', playlistsDetailChannel)

        
        // let dataArrVideoPlayListDetail = {};
        // await new Promise((resolve) => {
        //     setTimeout(resolve, (i + 2) * 1000);
        // });
        // if (this.state.arrPlayList[0].contentDetails.itemCount > 10) {
        //     dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(this.state.arrPlayList[0].id, 10);
        // } else {
        //     dataArrVideoPlayListDetail = await fetchDataArrVideoInPlayListChannelFromApi(this.state.arrPlayList[0].id, this.state.arrPlayList[0].contentDetails.itemCount);
        // }
        // let arrVideoPlayList = await this.buildArrInfoVideoItemOfPlayListChannelv2(dataArrVideoPlayListDetail.items);
        // let arrVideoPlayListPromise = await Promise.all(arrVideoPlayList);
        // this.setState({
        //     arrVideoPlayList: arrVideoPlayListPromise
        // })
        // console.log('arrVideoPlayList', this.state.arrVideoPlayList)
        this.setState({
            isLoading: false
        })
    }
    buildArrInfoVideoItemOfPlayListChannel = async (arrVideo) => {

        // Thực hiện xử lý trên từng đối tượng ở đây và trả về kết quả xử lý
        let processData = [];
        for (let i = 0; i < arrVideo.length; i++) {
            await new Promise((resolve) => {
                setTimeout(resolve, 300 * i);
            });
            let videoItem = await fetchDetailVideoDataChannelFromApi(arrVideo[i].id?.videoId);
            let obj = {};

            obj.id = arrVideo[i].id.videoId;
            obj.time = arrVideo[i].snippet.publishedAt;
            obj.title = arrVideo[i].snippet.title;
            obj.img = arrVideo[i].snippet.thumbnails.high.url;
            obj.view = videoItem.items[0].statistics.viewCount;
            obj.duration = videoItem.items[0].contentDetails.duration;
            // Thêm các trường khác cần xử lý
            processData.push(obj)
            // Xử lý kết quả API ở đây
        }

        return processData;
    };
    buildArrInfoVideoItemOfPlayListChannelv2 = async (arrVideo) => {

        // Thực hiện xử lý trên từng đối tượng ở đây và trả về kết quả xử lý
        let processData = [];
        for (let i = 0; i < arrVideo.length; i++) {

            await new Promise((resolve) => {
                setTimeout(resolve, 300 * i);
            });
            if (arrVideo[i].status?.privacyStatus === "public") {
                let videoItem = await fetchDetailVideoDataChannelFromApi(arrVideo[i].snippet?.resourceId?.videoId);
                let obj = {};

                obj.id = arrVideo[i].snippet?.resourceId?.videoId;
                obj.time = videoItem?.items[0]?.snippet?.publishedAt;
                obj.title = videoItem?.items[0]?.snippet?.title;
                obj.img = videoItem?.items[0]?.snippet?.thumbnails?.default?.url;
                //obj.img = videoItem.items[0].snippet.thumbnails.maxres.url;
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
    handleViewDetailVideo = (video) => {
        console.log('video', video);

        this.props.history.push(`/video/${video.video.videoId}`)
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


        return diff;

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
    render() {
        //const { processLogout } = this.props;

        let { channel, arrVideoRating, isLoading, arrVideoNew, arrVideoPopular, arrVideoOld, itemSelect, arrVideo, itemSelectSub, arrPlayList, arrVideoPlayList } = this.state;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        let settingsv1 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
        };
        return (<>
            <ModalDes isOpen={this.state.isOpenModalDes}
                channel={channel}
                handleOpenModalDes={this.handleOpenModalDes}
            />
            <HomeHeader />
            <div className='youtube-body'>
                <LeftNav />
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>

                    {isLoading ? (<div class="ring">Loading
                        <span></span>
                    </div>) ://channel.joinedDateText
                        (<>
                            {Object.keys(channel).length > 0 &&
                                (
                                    <div className='container-detail-channel'>
                                        <div className='banner-channel'>
                                            <img src={channel.banner?.tv[3]?.url} />
                                        </div>
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
                                                <div className='des-channel' onClick={() => { this.handleOpenModalDes() }}>{channel.description?.substring(0, 85)}...
                                                    <img className='icon-des-channel' src={RightArrow} />
                                                </div>
                                                {channel.links?.length > 0 &&
                                                    (<div className='url-channel' onClick={() => { this.handleOpenModalDes() }}>
                                                        <a href={channel.links[0].targetUrl}>{channel.links[0].targetUrl.substring(12)}{' '}</a>
                                                        và {channel.links.length - 1}{' '}đường liên kết khác
                                                    </div>)}

                                                <div className='subscribe-join-channel'>
                                                    <div className='subscribe-channel'>Đăng ký</div>
                                                    <div className='join-channel'> Tham gia</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            <div className='list-choice'>
                                <ul>{listChoiceChannel.map((item, index) => {
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
                                })}</ul>
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
                                                        <div className="item-video"  >
                                                            <img className="item-video-img" src={item.img} />
                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                            <div className="item-video-title">
                                                                <h6><b>{item.title.substring(0, 80)}...</b></h6>
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
                                                        <div className="item-video"  >
                                                            <img className="item-video-img" src={item.img} />
                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                            <div className="item-video-title">
                                                                <h6><b>{item.title.substring(0, 43)}...</b></h6>
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
                                    <div className='popular'>
                                        <div className='popular-text'>
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
                                                        <div className="item-video"  >
                                                            <img className="item-video-img" src={item.img} />
                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                            <div className="item-video-title">
                                                                <h6><b>{item.title.substring(0, 43)}...</b></h6>
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
                                    <div className='popular'>
                                        <div className='popular-text'>
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
                                                        <div className="item-video"  >
                                                            <img className="item-video-img" src={item.img} />
                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                            <div className="item-video-title">
                                                                <h6><b>{item.title.substring(0, 43)}...</b></h6>
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
                                    <div className='popular'>
                                        <div className='popular-text'>
                                            <h3><b>{arrPlayList[0]?.snippet?.localized?.title}</b></h3>
                                            <div className='play'>
                                                <img src={PlayList} />
                                                <b>Phát tất cả</b>
                                            </div>
                                        </div>
                                        <Slider {...settingsv1}>
                                            {arrVideoPlayList && arrVideoPlayList.length > 0
                                                &&
                                                (arrVideoPlayList.map((item) => {
                                                    return (
                                                        <div className="item-video"  >
                                                            <img className="item-video-img" src={item.img} />
                                                            <VideoLength time={this.convertDurationToSeconds(item.duration)} />
                                                            <div className="item-video-title">
                                                                <h6><b>{item.title.substring(0, 43)}...</b></h6>
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
                                                        className={(itemSelectSub === item) ? 'choice-item channel' : 'choice-item'}
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

                                                    <div className='container-item-video'  >
                                                        <div className='item-video' key={index}
                                                        >
                                                            <div className='item-video-thumbnails' onClick={() => this.handleViewDetailVideo(item)}>
                                                                <img className='item-video-thumbnails-img' src={item.img} />

                                                                <VideoLength time={this.convertDurationToSeconds(item.duration)} />

                                                            </div>
                                                            <div className='item-video-info'>



                                                                <div className='item-video-author'>
                                                                    <span className='item-video-info-title' onClick={() => this.handleViewDetailVideo(item)}>
                                                                        <h6><b>{item.title.substring(0, 43)}...</b></h6>
                                                                    </span>


                                                                    <div className='item-video-author-view-pushtime' onClick={() => this.handleViewDetailVideo(item)}>
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

                                                    <div className='container-item-video'  >
                                                        <div className='item-video' key={index}
                                                        >
                                                            <div className='item-video-thumbnails' onClick={() => this.handleViewDetailVideo(item)}>
                                                                <img className='item-video-thumbnails-img' src={item.img} />

                                                                <VideoLength time={this.convertDurationToSeconds(item.duration)} />

                                                            </div>
                                                            <div className='item-video-info'>



                                                                <div className='item-video-author'>
                                                                    <span className='item-video-info-title' onClick={() => this.handleViewDetailVideo(item)}>
                                                                        <h6><b>{item.title.substring(0, 43)}...</b></h6>
                                                                    </span>


                                                                    <div className='item-video-author-view-pushtime' onClick={() => this.handleViewDetailVideo(item)}>
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

                                                    <div className='container-item-video'  >
                                                        <div className='item-video' key={index}
                                                        >
                                                            <div className='item-video-thumbnails' onClick={() => this.handleViewDetailVideo(item)}>
                                                                <img className='item-video-thumbnails-img' src={item.img} />

                                                                <VideoLength time={this.convertDurationToSeconds(item.duration)} />

                                                            </div>
                                                            <div className='item-video-info'>



                                                                <div className='item-video-author'>
                                                                    <span className='item-video-info-title' onClick={() => this.handleViewDetailVideo(item)}>
                                                                        <h6><b>{item.title.substring(0, 43)}...</b></h6>
                                                                    </span>


                                                                    <div className='item-video-author-view-pushtime' onClick={() => this.handleViewDetailVideo(item)}>
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


                                    <div className='container-play-list'>

                                        {arrPlayList.length > 0 && arrPlayList.map((item, index) => {

                                            return (

                                                <div className='container-item-video'  >
                                                    <div className='item-video' key={index}
                                                    >
                                                        <div className='item-video-thumbnails'
                                                        // onClick={() => this.handleViewDetailVideo(item)}
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
                                                                //onClick={() => this.handleViewDetailVideo(item)}
                                                                >
                                                                    <h6><b>{item.snippet?.title?.substring(0, 43)}</b></h6>
                                                                </span>
                                                                <div className='show-play-list'>
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

                                    )
                                }


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


