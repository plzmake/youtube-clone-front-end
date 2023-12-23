import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from '../Header/menuApp';
import { abbreviateNumber } from "js-abbreviation-number";
import LeftNav from './LeftNav';
import { fetchDataSearchHomPageFromApi} from '../../utils/api';
import VideoLength from '../../utils/videoLength';
import CustomScrollbars from '../../components/CustomScrollbars';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";
import { listChoice } from '../../utils';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả'
        };
    }///results_search_query/:search
    async componentDidMount() {

        //let test = await testa ();
        // let sortArr = fetchVideoDataChoice.items.sort((a, b) => {
        //     return new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt);
        // });
        //console.log('sort arr', sortArr)
        //console.log('test', test)
        let arrVideo = await fetchDataSearchHomPageFromApi('le phi vu');

        //let test = await fetchDataFromv3Api();
        // console.log('test',test)
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
    handleViewDetailVideo = (video) => {
        console.log('video', video);

        this.props.history.push(`/video/${video.video.videoId}`)
        this.setState({
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả'
        })
    }
    handleClickChoice = async (dataSearch) => {
        let arrVideo = await fetchDataSearchHomPageFromApi(dataSearch);
        //let test = await fetchDataFromv3Api();
        // console.log('test',test)
        this.setState({
            isLoading: true,

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

        this.setState({
            itemSelect: dataSearch
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
    handleViewDetailChannel = async (channelId) => {
        this.props.history.push(`/channel/${channelId}`)
        this.setState = {
            arrVideo: [],
            isLoading: true,
            itemSelect: 'Tất cả'
        }
    }
    render() {
        //const { processLogout } = this.props;
        let arrVideo = this.state.arrVideo;
        let isLoading = this.state.isLoading;
        return (<>
            <HomeHeader />
            <div className='youtube-body'>
                <LeftNav />
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
                                                                {item.video.title}
                                                            </span>
                                                            {/* <span className='item-video-info-des'>
                                                    {item.video.descriptionSnippet}
                                                </span> */}
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


