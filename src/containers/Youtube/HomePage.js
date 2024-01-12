import React, { Component } from 'react';
import { connect } from 'react-redux';

import LeftNav from './LeftNav';
import { fetchDataSearchHomPageFromApi} from '../../utils/api';
import VideoLength from '../../utils/videoLength';
import CustomScrollbars from '../../components/CustomScrollbars';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";
import { listChoice } from '../../utils';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả',
            isShowLeftNav:true,
            isLeftNavTotalScreen:false,
            isClicklogo:false
        };
    }///results_search_query/:search
    async componentDidMount() {

        
        let arrVideo = await fetchDataSearchHomPageFromApi('moba viet');

        
        this.setState({
            isLoading: true
        })
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
    async componentDidUpdate(preProps,preState,snapshot) {
        if(preState.isClicklogo !== this.state.isClicklogo){
            this.setState({
                isLoading: true,
    
            })
            let arrVideo = await fetchDataSearchHomPageFromApi('Tất cả');
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            console.log('arrVideo', arrVideo)
            this.setState({
                arrVideo: arrVideo.contents
    
            })
            
                this.setState({
                    isLoading: false,
                    itemSelect: 'Tất cả'
                })
        }
    }
    clickLogo = () => {
        this.setState({
            isClicklogo: !this.state.isClicklogo
        })
    }
    handleViewDetailVideo = (video) => {
        console.log('video', video);

        this.props.history.push(`/video/${video.video.videoId}`)
        
        this.setState({
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả',
            isShowLeftNav:true,
            isLeftNavTotalScreen:false
        })
    }
    handleClickChoice = async (dataSearch) => {
        
        
        this.setState({
            isLoading: true,

        })
        let arrVideo = await fetchDataSearchHomPageFromApi(dataSearch);
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        console.log('arrVideo', arrVideo)
        this.setState({
            arrVideo: arrVideo.contents

        })
        
            this.setState({
                isLoading: false,
                itemSelect: dataSearch
            })
        

        
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
    handleViewDetailChannel =  (channelId) => {
        this.props.history.push(`/channel/${channelId}`)
        this.setState = {
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả',
            isShowLeftNav:true,
            isLeftNavTotalScreen:false
        }
    }
    showEllipsis = (text, length) => {
        let res = text.length > length ? '...' : '';
        return res;
    }
    hanleShowLeftNav = () => {
        this.setState({
            isShowLeftNav: !this.state.isShowLeftNav,
            
            isLeftNavTotalScreen:false
        })
    }
    handleShowLeftNavTotalScreen = () => {
       
        this.setState({
            isLeftNavTotalScreen : !this.state.isLeftNavTotalScreen,
            // isShowLeftNav:true
            
        })
        console.log('isLeftNavTotalScreen',this.state.isLeftNavTotalScreen)
    }
    
    render() {
        //const { processLogout } = this.props;
        let arrVideo = this.state.arrVideo;
        let isLoading = this.state.isLoading;
        return (<>
            <HomeHeader 
             hanleShowLeftNav={this.hanleShowLeftNav}
             clickLogo={this.clickLogo}
             handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
            />
            
            <div className='youtube-body'>
                <LeftNav isShowLeftNav={this.state.isShowLeftNav}
                        isLeftNavTotalScreen={this.state.isLeftNavTotalScreen}
                        handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                />
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>

                    {isLoading ? (<div class="ring">Loading
                        <span></span>
                    </div>) :
                        (<>
                            <div className='list-choice'>
                                <ul>{listChoice.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <button
                                                className={(this.state.itemSelect === item) ? 'choice-item active' : 'choice-item'}
                                                onClick={() => this.handleClickChoice(item)}>
                                                <b>{item}</b>
                                            </button>
                                        </li>
                                    )
                                })}</ul>
                            </div>
                            <div className='container-home-page'>

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
                                                                {item.video.title.substring(0,75)}{this.showEllipsis(item.video.title,75)}
                                                            </span>
                                                           
                                                            <div className='item-video-author-title-icon' onClick={() => this.handleViewDetailChannel(item.video?.author?.channelId)}>
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

                            </div>
                        </>)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));


