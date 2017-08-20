import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import browserHistory from 'react-router/lib/browserHistory';

import styles from './styles.scss';

import { setSearchDates } from 'actions/hotels';

import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/index.less';
const { RangePicker } = DatePicker;

import message from 'antd/lib/message';
import 'antd/lib/message/style/index.less';

const mapStateToProps = (state) => {
    return {
        startDate: state.hotels.startDate,
        endDate: state.hotels.endDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDates: (dates) => dispatch(setSearchDates(dates))
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HotelsSearch extends Component {

    handleSearch(){
        const { startDate, endDate } = this.props;
        console.log(startDate, endDate);
        // validate again incase button force enabled via DOM
        if(!startDate || !endDate){
            message.warn('Please select your amazing trip duration.');
        } else if(!startDate.isBefore(endDate)){
            message.warn('Please select at least one night.');
        } else {
            browserHistory.push(`/hotels`);
        }
    }

    disabledDate(current) {
        // Can not select days before today
        return current.valueOf() < Date.now();
    }

    render(){
        const { setDates, startDate, endDate } = this.props;
        return (
            <div className="HotelsSearch">
                <RangePicker className="HotelsSearch__RangePicker" value={[startDate, endDate]} disabledDate={(current) => this.disabledDate(current)} onChange={(dates) => setDates(dates)} />
                <button className="HotelsSearch__SubmitSearch" onClick={() => this.handleSearch()} disabled={!startDate || !endDate || !startDate.isBefore(endDate)}>Search</button>
            </div>
        )
    }
}
