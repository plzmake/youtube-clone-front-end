import React, { Component } from 'react';
import { connect } from 'react-redux';

//import './Header.scss';
import { categories } from '../../utils';
import RightArrow from '../../assets/images/images/rightArrow.svg';
import CustomScrollbars from '../../components/CustomScrollbars';
import YouLeftNav from '../../assets/images/images/youLeftNav.svg';

import LeftNavTotalScreen from './LeftNavTotalScreen';

class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isMobile: true,
            
        };
        this.handleResize = this.handleResize.bind(this);
    }
    async componentDidMount() {
        this.handleResize(); // Gọi hàm handleResize lần đầu để xác định trạng thái ban đầu

        // Thêm event listener cho sự kiện resize
        window.addEventListener('resize', this.handleResize);

    }
    componentWillUnmount() {
        // Xóa event listener khi component bị unmount để tránh memory leak
        //window.innerWidth
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        if (window.matchMedia('(max-width: 1310px)').matches) {
            console.log('chieu dai nho hon 1310', window.matchMedia('(max-width: 1310px)').matches)
            this.setState({
                isMobile: true
            })

            // Xử lý khi kích thước màn hình nhỏ hơn hoặc bằng 1310px

        } else {
            console.log('chieu dai lon hon 1310', window.matchMedia('(max-width: 1310px)').matches)
            this.setState({
                isMobile: false
            })


        }
    };
    handleShowLeftNavTotalScreen = () => {
        
            this.props.handleShowLeftNavTotalScreen?.();
          
        
        
    }
    render() {
        //const { processLogout } = this.props;

        return (
            <>
                {(this.state.isMobile) ?
                    (
                        (!this.props.isLeftNavTotalScreen) ?
                            (<div className='container-left-nav-min'>
                                <div className='left-nav-list'>
                                    {categories.map((item, index) => {
                                        if (item.type === 'home') {
                                            return (

                                                <div className='left-nav-home'>
                                                    <div className='left-nav-item' key={index} alt={item.name}>
                                                        <div className='left-nav-item-img'><img src={item.icon} /></div>
                                                        <div className='text-left-nav-item'>{item.name}</div>

                                                    </div>
                                                </div>

                                            )
                                        }

                                    })}
                                    <div className='left-nav-home'>
                                        <div className='left-nav-item' >
                                            <div className='left-nav-item-img'><img src={YouLeftNav} /></div>
                                            <div className='text-left-nav-item'> Bạn</div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            ) : (<LeftNavTotalScreen 
                                handleShowLeftNavTotalScreen={this.handleShowLeftNavTotalScreen}
                            />)


                    ) :
                    (
                        (!this.props.isShowLeftNav) ?
                            (<div className='container-left-nav-min'>
                                <div className='left-nav-list'>
                                    {categories.map((item, index) => {
                                        if (item.type === 'home') {
                                            return (

                                                <div className='left-nav-home'>
                                                    <div className='left-nav-item' key={index} alt={item.name}>
                                                        <div className='left-nav-item-img'><img src={item.icon} /></div>
                                                        <div className='text-left-nav-item'>{item.name}</div>

                                                    </div>
                                                </div>

                                            )
                                        }

                                    })}
                                    <div className='left-nav-home'>
                                        <div className='left-nav-item' >
                                            <div className='left-nav-item-img'><img src={YouLeftNav} /></div>
                                            <div className='text-left-nav-item'> Bạn</div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            ) :
                            (<div className="container-left-nav">
                                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                    <div className='left-nav-home'>
                                        {categories.map((item, index) => {
                                            if (item.type === 'home') {
                                                return (
                                                    <div className='left-nav-item' key={index} alt={item.name}>
                                                        <img src={item.icon} /> {item.name}
                                                    </div>
                                                )
                                            }

                                        })}

                                    </div>
                                    <div className='line'></div>
                                    <div className='left-nav-your-channel'>
                                        <div className='left-nav-item' >
                                            Bạn <img src={RightArrow} />
                                        </div>
                                        {categories.map((item, index) => {
                                            if (item.type === 'channels') {
                                                return (
                                                    <div className='left-nav-item' key={index}>
                                                        <img src={item.icon} /> {item.name}
                                                    </div>
                                                )
                                            }

                                        })}
                                    </div>
                                    <div className='line'></div>
                                    <div className='left-nav-discover'>
                                        <div className='left-nav-item' >
                                            Khám phá
                                        </div>
                                        {categories.map((item, index) => {
                                            if (item.type === 'discover') {
                                                return (
                                                    <div className='left-nav-item' key={index}>
                                                        <img src={item.icon} /> {item.name}
                                                    </div>
                                                )
                                            }

                                        })}
                                    </div>
                                    <div className='line'></div>
                                    <div className='left-nav-service'>
                                        <div className='left-nav-item' >
                                            Dịch vụ khác của YouTube
                                        </div>
                                        {categories.map((item, index) => {
                                            if (item.type === 'service') {
                                                return (
                                                    <div className='left-nav-item' key={index}>
                                                        <img src={item.icon} /> {item.name}
                                                    </div>
                                                )
                                            }

                                        })}
                                    </div>
                                    <div className='line'></div>
                                    <div className='left-nav-menu'>
                                        {categories.map((item, index) => {
                                            if (item.type === 'menu') {
                                                return (
                                                    <div className='left-nav-item' key={index}>
                                                        <img src={item.icon} /> {item.name}
                                                    </div>
                                                )
                                            }

                                        })}

                                    </div>
                                    <div className='line'></div>
                                    <div className='left-nav-more-info'>
                                        <div className='more-info-text'>Giới thiệu  Báo chí  Bản quyền  Liên hệ với chúng tôi  Người sáng tạo  Quảng cáo  Nhà phát triển</div>
                                        <div className='more-info-text'>Điều khoản  Quyền riêng tư  Chính sách và an toàn  Cách YouTube hoạt động  Thử các tính năng mới
                                        </div>
                                        <div className='more-info-text google'>© 2023 Google LLC</div>
                                    </div>
                                </CustomScrollbars>
                            </div>)
                    )}

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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
