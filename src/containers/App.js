import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { path } from '../utils'

import HomePage from './Youtube/HomePage';
import Video from './Youtube/Video';
import Search from './Youtube/Search';
import Channel from './Youtube/Channel';
import Post from './Youtube/Post';
import PlayList from './Youtube/PlayList';
import NotFound from './Youtube/NotFound';
import { CustomToastCloseButton } from '../components/CustomToast';
import './App.scss';
//import HomePage from './Youtube/HomePage';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                       
                         

                        <span className="content-container">
                        
                            <Switch>
                                <Route path={path.HOME} exact component={HomePage} />
                                <Route path={path.VIDEO} component={Video} />
                                <Route path={path.SEARCH} component={Search} />
                                <Route path={path.CHANNEL} component={Channel} />
                                <Route path={path.POST} component={Post} />
                                <Route path={path.PLAYLIST} component={PlayList} />

                                <Route path = {path.ERROR} component= {NotFound}/>
                            </Switch>
                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);