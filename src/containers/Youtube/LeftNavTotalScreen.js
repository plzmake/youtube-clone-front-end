import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { categories } from '../../utils';
import RightArrow from '../../assets/images/images/rightArrow.svg';
import CustomScrollbars from '../../components/CustomScrollbars';
import { SlMenu, } from "react-icons/sl";
import LogoYTB from '../../assets/images/images/ytb.svg'
class LeftNavTotalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };

    }
    async componentDidMount() {


    }
    componentWillUnmount() {
        // Xóa event listener khi component bị unmount để tránh memory leak

    }
    ShowLeftNav = () => {
       
            this.props.handleShowLeftNavTotalScreen?.();
          
        
    }
    render() {
        //const { processLogout } = this.props;

        return (
            <>
            <div className='container-left-nav-total-screen' onClick={() => this.ShowLeftNav()}>
                <div className='info'>
                <div className='first-header'>
                    <div className='container-icon-home-header'>
                        <SlMenu className='icon-home-header'  />
                    </div>
                    <Link to='/' className='img-LogoYTB'>
                        <img src={LogoYTB} alt='Youtube' />
                    </Link>
                </div>
                <div className="container-left-nav">
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
                            <div className='more-info-text'>© 2023 Google LLC</div>
                        </div>
                    </CustomScrollbars>
                </div>
                </div>
                <div className='modals'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavTotalScreen);
