import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Shared from '../../assets/images/images/share.svg';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import LeftNav from './LeftNav';
import CustomScrollbars from '../../components/CustomScrollbars';
import {
    fetchDataCursorPostFromApi,
    fetchDataCommentsPostFromApi
} from '../../utils/api';
import sorted from '../../assets/images/images/sorted.svg';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

            label: '',
            commentPost: {},
            cursorComments: "",
            isShowLeftNav: true,
            isLeftNavTotalScreen: false
        };
    }
    async componentDidMount() {
        let cursor = await fetchDataCursorPostFromApi(this.props.match.params.postId);
        console.log('cursor', cursor)
        this.setState({
            cursorComments: cursor.cursorComments
        })
        let commentPost = await fetchDataCommentsPostFromApi(cursor.cursorComments);
        console.log('comment Post', commentPost)
        this.setState({
            commentPost: commentPost
        })

        //

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
    render() {
        console.log('this.props post', this.props)

        let { channel, item, text } = this.props.history.location.state;
        let { commentPost } = this.state
        console.log('para', { channel, item, text })
        console.log('commentPost in render', this.state.commentPost)
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
                        <div className='container-post'>
                            <div className='container-post-item'>
                                <div className='channel-avatar'>
                                    <img src={channel.avatar[2]?.url} />
                                </div>
                                <div className='info-post'>
                                    <div className='metadata'>
                                        <b>{channel.title}</b>
                                        <div className='published'>
                                            {text}
                                        </div>
                                    </div>
                                    <div className='text-post'>
                                        {this.textPost(item.post?.text)}
                                    </div>
                                    <div className='img-post'>
                                        <img src={item.post?.attachment?.images[0]?.source[4]?.url} />
                                    </div>

                                    <div className='interact-post'>

                                        <div className='likes'>
                                            <AiOutlineLike />

                                        </div>{item.post?.stats?.likes}
                                        <div className='dislike'>
                                            <AiOutlineDislike />
                                        </div>
                                        <div className='comment-post'><img src={Shared} /></div>



                                    </div>
                                </div>
                            </div>


                        </div>
                        {Object.keys(commentPost).length > 0 &&
                            (
                                <>
                                    <div className='comment-post'>
                                        <div className='totalCommentsCount'>
                                            <h5><b>{commentPost.totalCommentsCount}{'  '} bình luận</b></h5>
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
                                            {commentPost.comments.length > 0 && commentPost.comments.map((item, index) => {
                                                return (
                                                    <div className='comment-video-item' key={index}>
                                                        <div className='item-comment-avatar'>
                                                            <img className='item-comment-avatar-img'
                                                                src={item.author?.avatar[0]?.url} />
                                                        </div>
                                                        <div className='info-comment'>
                                                            <div className='name-client-comment'>
                                                                <b>{item.author?.title}</b> {'  '} {this.convertVi(item.publishedTimeText)}
                                                            </div>
                                                            <div className='content-comment'>
                                                                {item.content}
                                                            </div>
                                                            <div className='like-dislike-comment'>
                                                                <div className='icon-comment'><AiOutlineLike /></div>{item.stats.votes !== 0 ? ` ${item.stats.votes}` : ' '}
                                                                <div className='icon-comment'><AiOutlineDislike /></div>
                                                                <h6 className='reply'>Phản hồi</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);


