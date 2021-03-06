import React, {Component} from 'react';
import NotLogin from '@components/NotLogin';
import Main from './Main';
import {connect} from 'react-redux';
import * as disCloseActions from "../../actions";
import {adaptUserInfo, cloneByJson, NoticeUpdateNativeList} from '@utils';
import * as Events from '@data/ListChangeEvent';


import {
    DeviceEventEmitter
} from 'react-native';

import hocUserStateChange from '@components/HocUserStateChange'

function mapStateToProps({user}) {
    return {
        user: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {

        getList: (...args) => {
            dispatch(disCloseActions.getList(...args))
        },

        // 点赞
        like: (...args) => {
            dispatch(disCloseActions.like(...args));
            NoticeUpdateNativeList(Events.disclose_like, ...args);

        },

        // 取消点赞
        cancel_like: (...args) => {
            dispatch(disCloseActions.cancel_like(...args));
            NoticeUpdateNativeList(Events.disclose_cancel_like, ...args);

        },

        deleteDisclose: (...args) => {
            dispatch(disCloseActions.deleteDisclose(...args));
            NoticeUpdateNativeList(Events.disclose_delete, ...args);
        },

    };
}

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    componentDidMount() {

        this.observer = DeviceEventEmitter.addListener('userStateChange', (e) => {
            this.setState({
                user: adaptUserInfo({...cloneByJson(e)})
            });
        })

    }

    componentWillUnmount() {
        this.observer.remove();
    }


    render() {
        let {user = {}} = this.state;
        // 设备用户展示没有登录
        if (user && user.isLogin) {
            return <Main {...this.props} user={user}/>
        } else {
            return <NotLogin {...this.props}/>
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(hocUserStateChange(Container));
