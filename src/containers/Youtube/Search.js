import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from '../Header/menuApp';
import { abbreviateNumber } from "js-abbreviation-number";
import LeftNav from './LeftNav';
import { fetchDataSearchSearchFromApi } from '../../utils/api';
import VideoLength from '../../utils/videoLength';
import CustomScrollbars from '../../components/CustomScrollbars';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideo: [],

            isLoading: true
        };
    }
    async componentDidMount() {
        let arrVideo = await fetchDataSearchSearchFromApi(this.props.location.state.label);
        console.log('arrVideo', arrVideo)
        this.setState({
            arrVideo: arrVideo.contents

        })
        if (this.state.arrVideo.length > 0) {
            this.setState({
                isLoading: false
            })
        } else {
            this.setState({
                isLoading: true
            })
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.location.state.label !== this.props.location.state.label) {
            this.setState({
                isLoading: true
            })
            let arrVideo = await fetchDataSearchSearchFromApi(this.props.location.state.label);
            console.log('arrVideo', arrVideo)
            this.setState({
                arrVideo: arrVideo.contents

            })
            if (this.state.arrVideo.length > 0) {
                this.setState({
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: true
                })
            }
        }
    }
    handleViewDetailVideo = (video) => {
        console.log('video', video);

        this.props.history.push(`/video/${video.video.videoId}`)
        this.setState({
            arrVideo: [],
            isLoading: true
        })
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
    render() {
        //const { processLogout } = this.props;
        console.log('this.props.search', this.props)
        let arrVideo = this.state.arrVideo;
        let isLoading = this.state.isLoading;
        return (<>
            <HomeHeader selectedVideo={this.props.location.state.label}/>
            <div className='youtube-body'>
                <LeftNav />
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    {isLoading && <div class="ring">Loading
                                        <span></span>
                                </div>}
                    {!isLoading && (<div className='container-search'>
                        {arrVideo.length > 0 && arrVideo.map((item, index) => {
                            if (item.type === 'video') {
                                return (

                                    <div className='container-item-video' onClick={() => this.handleViewDetailVideo(item)} key={index}>
                                        <div className='item-video'

                                        >
                                            <div className='item-video-thumbnails'>
                                                <img className='item-video-thumbnails-img' src={item.video?.thumbnails[0]?.url} />
                                                {item.video?.lengthSeconds && (
                                                    <VideoLength time={item.video?.lengthSeconds} />
                                                )}
                                            </div>
                                            <div className='item-video-info'>



                                                <div className='item-video-author'>
                                                    <span className='item-video-info-title'>
                                                        {item.video?.title}
                                                    </span>
                                                    <div className='item-video-author-view-pushtime'>
                                                        <div>{`${this.test(item.video?.stats?.views)}lượt xem`}</div>
                                                        <div className='dot'><h6>&#x2022;</h6></div>
                                                        <div className='item-video-author-pushtime'>
                                                            {item.video.publishedTimeText}
                                                        </div>
                                                    </div>

                                                    <div className='item-video-author-title-icon'>
                                                        <div className='item-video-avatar'>
                                                            <img className='item-video-avatar-img'
                                                                src={item.video?.author?.avatar[0]?.url} />
                                                        </div>
                                                        {item.video?.author?.title}
                                                        {item.video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                                            <BsFillCheckCircleFill className='icon-item-video-author' />
                                                        )}
                                                    </div>
                                                    <span className='item-video-info-des'>
                                                        {item.video?.descriptionSnippet?.substring(0, 120)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                )
                            }

                        })}

                    </div>)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));


