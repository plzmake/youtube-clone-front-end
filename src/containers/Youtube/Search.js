import React, { Component } from 'react';
import { connect } from 'react-redux';

import LeftNav from './LeftNav';
import { fetchDataSearchSearchFromApi } from '../../utils/api';
import VideoLength from '../../utils/videoLength';
import CustomScrollbars from '../../components/CustomScrollbars';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideo: [],
            windowWidth: window.innerWidth,
            isLoading: true,
            isShowLeftNav:true,
            isLeftNavTotalScreen:false
        };
        this.handleResize = this.handleResize.bind(this);
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
        window.addEventListener('resize', this.handleResize);
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
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () =>{
        this.setState({ windowWidth: window.innerWidth });
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
        if (data > 1000000) {
            let text = `${Math.floor(data / 1000000)},${Math.floor(data / 100000) % 10} Tr  `;
            return text;
        } else if (data > 1000) {
            let text = `${Math.floor(data / 1000)},${Math.floor(data / 100) % 10} N  `;
            return text;
        } else {
            return `${data}  `
        }
    }
    handleViewDetailChannel =  (channelId,event) => {
        event.stopPropagation();
        this.props.history.push(`/channel/${channelId}`)
        this.setState = {
            arrVideoRelated: [],
            video: {},
            isShowMore: true,
            commentVideo: {},
            reloadVideo:true,
            isLoading:true,
            isLeftNavTotalScreen:false
        }
    }
    hanleShowLeftNav = () => {
        this.setState({
            isShowLeftNav: !this.state.isShowLeftNav,
            isLeftNavTotalScreen: false
        })
    }
    handleShowLeftNavTotalScreen = () => {
       
        this.setState({
            isLeftNavTotalScreen : !this.state.isLeftNavTotalScreen
        })
        console.log('isLeftNavTotalScreen',this.state.isLeftNavTotalScreen)
    }
    showEllipsis = (text,length) => {
        let res = text?.length > length ? '...' :'';
        return res;
    }
    
    render() {
        //const { processLogout } = this.props;
        console.log('this.props.search', this.props)
        let arrVideo = this.state.arrVideo;
        let isLoading = this.state.isLoading;
        return (<>
            <HomeHeader selectedVideo={this.props.location.state.label}
            hanleShowLeftNav={this.hanleShowLeftNav}
            handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}/>
            
            <div className='youtube-body'>
            <LeftNav isShowLeftNav={this.state.isShowLeftNav}
                        isLeftNavTotalScreen={this.state.isLeftNavTotalScreen}
                        handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                />
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    {isLoading && <div class="ring">Loading
                                        <span></span>
                                </div>}
                    {!isLoading && 
                    (<div className='container-search'>
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
                                                        {item.video?.title.substring(0,(this.state.windowWidth-419)/3)}{this.showEllipsis(item.video?.title,(this.state.windowWidth-419)/3)}
                                                    </span>
                                                    <div className='item-video-author-view-pushtime'>
                                                        <div className='item-video-author-view'>{`${this.test(item.video?.stats?.views)}lượt xem`}</div>
                                                        <div className='dot'><h6>&#x2022;</h6></div>
                                                        <div className='item-video-author-pushtime'>
                                                            {item.video.publishedTimeText}
                                                        </div>
                                                    </div>

                                                    <div className='item-video-author-title-icon'>
                                                        <div className='item-video-avatar'onClick={(event) => this.handleViewDetailChannel(item.video?.author?.channelId,event)}>
                                                            <img className='item-video-avatar-img'
                                                                src={item.video?.author?.avatar[0]?.url} />
                                                        </div>
                                                        <span className='item-video-author-title'
                                                        onClick={(event) => this.handleViewDetailChannel(item.video?.author?.channelId,event)}
                                                        >{item.video?.author?.title}</span>
                                                        {item.video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                                            <BsFillCheckCircleFill className='icon-item-video-author' />
                                                        )}
                                                    </div>
                                                    <span className='item-video-info-des'>
                                                        {item.video?.descriptionSnippet?.substring(0, (this.state.windowWidth-386)/2)}{this.showEllipsis(item.video?.descriptionSnippet,(this.state.windowWidth-386)/2)}
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


