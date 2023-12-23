import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { IoIosSearch } from "react-icons/io";
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import { withRouter } from "react-router";
import LogoYTB from '../../assets/images/images/ytb.svg'


class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                label: ''
            }
        };
    }
    async componentDidMount() {

    }
    handleChange = (e) => {
        this.setState({
            search: {
                label: e.target.value
            }
        })
    }
    handleSearch = () => {
        this.props.history.push(`/search/${this.state.search.label}`, this.state.search)
        this.setState({
            search: {
                label: ''
            }
        })
    }
    render() {


        return (<>

            <div className='container-not-found'>
                <div className='not-found-content'>
                    <img id="error-page-hh-illustration"
                        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt="123" />
                    <div>
                        Trang này không có sẵn. Mong bạn thông cảm.
                    </div>
                    <div>Bạn thử tìm cụm từ khác xem sao nhé.</div>
                    <Link to='/' className='img-LogoYTB'>
                        <img src={LogoYTB} alt='Youtube' />
                    </Link>
                    <input placeholder='Search' onChange={(e) => this.handleChange(e)}></input>
                    <button className='btn-search-header' onClick={() => this.handleSearch()} ><IoIosSearch className='icon-not-found' /></button>
                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotFound));


