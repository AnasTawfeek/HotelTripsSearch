import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';
import { Helmet } from "react-helmet";
import Notifications from 'react-notification-system-redux';

import 'styles/antd.less';

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    };
}

@connect(mapStateToProps)
export default class App extends Component {
    render(){
        const { notifications, children } = this.props;
        return (
            <div className="App">
                {children}
                <Notifications notifications={notifications} />
                <Helmet>
                    <title>Tajawal</title>
                </Helmet>
            </div>
        )
    }
}
