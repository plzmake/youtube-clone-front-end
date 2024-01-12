import React, { Component } from 'react';

import { connect } from 'react-redux';
import { detailChannel } from '../../utils';
import CustomScrollbars from '../../components/CustomScrollbars';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '',
      roleId: ''
    }

  }

  componentDidMount() {
  }
  toggle = () => {
    this.props.handleOpenModalDes();
  }



  render() {
    let channel = this.props.channel;
    let urlChannel = '';
    if (channel.username?.length > 0) {
      urlChannel = `www.youtube.com/${channel.username}`
    }
    return (
      
        <div style={{ textAlign: 'center' }}>
          
          <Modal isOpen={this.props.isOpen}
            toggle={() => { this.toggle() }}
            size='lg'
          >
            <ModalHeader toggle={() => { this.toggle() }} style={{height:'56px'}}>
              <b>
                Giới thiệu
              </b>
            </ModalHeader>
            <CustomScrollbars style={{ height: '70vh', width: '100%' }}>
            <ModalBody style={{ height: '75vh' }}>

              {/* <div style={{height:'100%',width:'100%'}}> */}
              <div class="form-group col-md-12">

              </div>
              <div class="channel-modal-des form-group col-md-12">
                {channel.description}
              </div>
              <div class=" mt-3 form-group col-md-12">
                <h2><b>Đường liên kết</b></h2>
              </div>
              {channel.links?.map((item, index) => {
                return (
                  <>
                    <div className='mt-3 link-channel' key={index}>
                      <div className='icon-channel'>
                        <img src={item.icon[0]?.url} />
                      </div>
                      <div className='link-channel-name'>
                        <div className='link-channel-name-title'>
                          <b>{item.title}</b>
                        </div>
                        <div className='link-channel-name-url'>
                          <a href={item.targetUrl}>{item.targetUrl.substring(12)}</a>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
              <div class=" mt-3 form-group col-md-12">
                <h2><b>Chi tiết kênh</b></h2>
              </div>
              {channel.username?.length > 0 && (
                <div className='mt-3 user-channel form-group col-md-12'>
                  <div className='user-channel-icon'>
                    <img src={detailChannel[0]} />
                  </div>
                  <div className='user-channel-url'>
                    <a href={urlChannel}>{urlChannel}</a>
                  </div>
                </div>)}
              {channel.stats?.subscribersText?.length > 0 && (
                <div className='mt-3 user-channel form-group col-md-12'>
                  <div className='user-channel-icon'>
                    <img src={detailChannel[1]} />
                  </div>
                  <div className='user-channel-info'>
                    {channel.stats?.subscribersText}
                  </div>
                </div>)}

              <div className='mt-3 user-channel form-group col-md-12'>
                <div className='user-channel-icon'>
                  <img src={detailChannel[2]} />
                </div>
                <div className='user-channel-info'>
                  {channel.stats?.videos}{' '} video
                </div>
              </div>

              <div className='mt-3 user-channel form-group col-md-12'>
                <div className='user-channel-icon'>
                  <img src={detailChannel[3]} />
                </div>
                <div className='user-channel-info'>
                  {channel.stats?.views}{' '} lượt xem
                </div>
              </div>
              {channel.joinedDateText?.length > 0 && (
                <div className='mt-3 user-channel form-group col-md-12'>
                  <div className='user-channel-icon'>
                    <img src={detailChannel[4]} />
                  </div>
                  <div className='user-channel-info'>
                    {channel.joinedDateText}
                  </div>
                </div>)}
              {channel.country?.length > 0 && (
                <div className='mt-3 user-channel form-group col-md-12'>
                  <div className='user-channel-icon'>
                    <img src={detailChannel[5]} />
                  </div>
                  <div className='user-channel-info'>
                    {channel.country}
                  </div>
                </div>)}
              <div className='mt-3 report-share-channel'>
                <div class="form-group col-md-3">
                  <img src={detailChannel[6]} />{' '}chia sẻ kênh
                </div>
                <div class="form-group col-md-5">
                  <img src={detailChannel[7]} />{' '}Báo cáo người dùng
                </div>
              </div>
              <div class="form-group col-md-6">

              </div>
              {/* </div> */}
            </ModalBody>
            </CustomScrollbars>
            
          </Modal>
          
        </div>
      



    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDes);
