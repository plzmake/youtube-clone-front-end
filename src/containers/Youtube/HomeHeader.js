import React, { Component } from 'react';
import { connect } from 'react-redux';


import { fetchDataAutoCompleteHomeHeaderFromApi } from '../../utils/api';
import { SlMenu, } from "react-icons/sl";
import { IoIosSearch, IoMdMic, IoMdKeypad } from "react-icons/io";
import { RiVideoAddLine, RiKeyboardBoxFill, RiKeyboardLine, RiKeyboardFill } from "react-icons/ri";
import { FiBell } from "react-icons/fi";

import LogoYTB from '../../assets/images/images/ytb.svg'

import AsyncSelect from 'react-select/async';
import { withRouter } from "react-router";
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

            arrSelect: [],
            selectedVideo: `${(this.props.selectedVideo?.length > 0) ? this.props.selectedVideo : ""}`,
            isShowIconSearch:false
            
        }

    }
    async componentDidMount() {
        if (this.props.selectedVideo?.length > 0) {
            let abc = await fetchDataAutoCompleteHomeHeaderFromApi(this.props.selectedVideo);
            let arrSelect = this.buildDataInputSelect(abc.results);
            console.log('arrselect', arrSelect)
            this.setState({
                arrSelect: arrSelect
            })
            console.log('api', abc)
        }

    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (preState.selectedVideo !== this.state.selectedVideo) {
            let abc = await fetchDataAutoCompleteHomeHeaderFromApi(this.state.selectedVideo);
            let arrSelect = this.buildDataInputSelect(abc.results);
            console.log("auto-complete", abc)
            console.log('arrselect', arrSelect)
            this.setState({
                arrSelect: arrSelect
            })
        }

    }

    handleSearch = () => {

        console.log('từ khóa đã chọn', this.state.selectedVideo)
        this.props.history.push(`/search/${this.state.selectedVideo.label}`, this.state.selectedVideo)
        this.setState({
            arrSelect: [],
            selectedVideo: ''
        })


    }
    buildDataInputSelect = (data) => {
        let result = [{ label: `${this.state.selectedVideo}`, value: `${this.state.selectedVideo}` }];

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
    loadOptions =  (searchValue, callback) => {
        let test_arr = this.state.arrSelect;
        let filterOptions = test_arr;

        callback(filterOptions);
        this.setState({
            selectedVideo: searchValue
        })
        console.log('search value', searchValue)
        console.log('this.state.arrSelect trong load', test_arr)
        console.log('callback-new', filterOptions)
    }

    handleChange = selectedVideo => {
        console.log('selectvideo', selectedVideo)
        this.setState({ selectedVideo })
    }
    ShowLeftNav = () => {
        
            this.props.hanleShowLeftNav?.();
          
          
            this.props.handleShowLeftNavTotalScreen?.();
          
        
    }
    ShowIconSearch = () => {
        this.setState({
            isShowIconSearch:true
        })
        console.log('đã  click')
    }
    HideIconSearch = () => {
        this.setState({
            isShowIconSearch:false
        })
        console.log('đã  click')
    }
    handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            console.log('từ khóa đã chọn', this.state.selectedVideo)
        this.props.history.push(`/search/${this.state.selectedVideo.label}`, this.state.selectedVideo)
        this.setState({
            arrSelect: [],
            selectedVideo: ''
        })

        }
    };
    urlHome = () => {
        this.props.history.push('/')
        this.props.clickLogo?.()
    }
    render() {
        //const { processLogout } = this.props;

        return (
            <div className="container-home-header">
                {/* thanh navigator */}
                <div className='first-header'>
                    <div className='container-icon-home-header'>
                    <SlMenu className='icon-home-header' onClick={() => this.ShowLeftNav()}/>
                    </div>
                    <div className='img-LogoYTB' onClick={() => this.urlHome()}>
                        <img src={LogoYTB} alt='Youtube' />
                    </div>
                </div>

                {/* nút logout */}
                {this.state.isShowIconSearch ? 
                (<div className='mid-header'>
                    <button className='icon-search-header' ><IoIosSearch className='icon-home-header' /></button>
                    {/* <label htmlFor="previewImg">abcd<input onChange={(e) => { this.handleChange(e) }}
                        value={this.state.selectedVideo}
                    /></label>
                    <label htmlFor="previewImg">{'  '}</label> */}
                    <AsyncSelect //value={this.state.selectedVideo}
                        onChange={this.handleChange}
                        onMenuOpen={this.ShowIconSearch}
                        onMenuClose={this.HideIconSearch}
                        
                        loadOptions={this.loadOptions}
                        defaultValue={this.state.arrSelect[0]}
                        placeholder={(this.state.selectedVideo.length > 0) ? this.state.selectedVideo : "Tìm kiếm"}
                    />

                    <div className='icon-keypad'><RiKeyboardBoxFill className='search-icon-keypad' /></div>

                    <button className='btn-search-header' onClick={() => this.handleSearch()} alt='tìm kiếm' tabIndex="0"
                    onKeyPress={(event) => this.handleKeyPress(event)}
                    ><IoIosSearch className='icon-home-header' /></button>
                    <button className='btn-mic-search'><IoMdMic className='icon-home-header mic' /></button>

                </div>)
                :
                (<div className='mid-header'>
                <button className='not-show-icon' ></button>
                {/* <label htmlFor="previewImg">abcd<input onChange={(e) => { this.handleChange(e) }}
                    value={this.state.selectedVideo}
                /></label>
                <label htmlFor="previewImg">{'  '}</label> */}
                <AsyncSelect //value={this.state.selectedVideo}
                    onChange={this.handleChange}
                    onMenuOpen={this.ShowIconSearch}
                    onMenuClose={this.HideIconSearch}
                    autoFocus
                    //options={this.state.arrSelect}
                    //className='form-control'
                    loadOptions={this.loadOptions}
                    defaultValue={this.state.arrSelect[0]}
                    placeholder={(this.state.selectedVideo.length > 0) ? this.state.selectedVideo : "Tìm kiếm"}
                />

                <div className='icon-keypad'><RiKeyboardBoxFill className='search-icon-keypad' /></div>

                <button className='btn-search-header' onClick={() => this.handleSearch()} alt='tìm kiếm' ><IoIosSearch className='icon-home-header' /></button>
                <button className='btn-mic-search'><IoMdMic className='icon-home-header mic' /></button>

            </div>)
            }
                <div className='end-header'>
                <div className='container-icon-home-header'><RiVideoAddLine className='icon-home-header' /></div>
                <div className='container-icon-home-header'><FiBell className='icon-home-header' /></div>
                    
                    
                    <button className='btn-name-search'>MN</button>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
