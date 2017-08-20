import React from 'react';
import './Loading.scss';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.less';

export default () => {
    return (
        <div className="HotelsListing__LoadingState">
            <Spin size="large" />
            Loading the awesomeness..
        </div>
    )
}
