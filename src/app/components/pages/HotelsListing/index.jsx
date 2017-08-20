import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDaysRange from 'utils/getDaysRange';
import browserHistory from 'react-router/lib/browserHistory';

import styles from './styles.scss';

import { getHotelsLoading, getHotels, getHotelsSuccess, getHotelsFailure } from 'actions/hotels';

import EmptyState from 'components/modules/HotelsListing/Empty';
import LoadingState from 'components/modules/HotelsListing/Loading';
import ErrorState from 'components/modules/HotelsListing/Error';

import HotelCard from 'components/cards/HotelCard';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/index.less';
import 'antd/lib/tooltip/style/index.less';

const mapStateToProps = (state) => {
    return {
        startDate: state.hotels.startDate,
        endDate: state.hotels.endDate,
        loading: state.hotels.loading,
        hotels: state.hotels.hotels,
        error: state.hotels.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHotels: (cb) => {
            dispatch(getHotelsLoading());
            // Delay the request to fake a poor connection
            setTimeout(() => {
                dispatch(getHotels()).then(
                    ({payload: {data}}) => dispatch(getHotelsSuccess(data)),
                    (error) => dispatch(getHotelsFailure(error))
                )
            }, 0)
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HotelsListing extends Component{
    constructor(props){
        super(props);
    }
    state = {
        nameQuery: '',
        sortBy: 'name',
        priceFilter: null,
        priceRange: null,
    }
    componentWillMount(){
        const { startDate, endDate } = this.props;
        if(!startDate || !endDate){
            browserHistory.push(`/`);
        }else{
            this.props.getHotels();
        }
    }

    setPriceRange(hotels){
        const { startDate, endDate } = this.props;
        const minPrice = Math.min.apply(Math,hotels.map(function(o){return o.price;})) * getDaysRange(startDate, endDate) - 1;
        const maxPrice = Math.max.apply(Math,hotels.map(function(o){return o.price;})) * getDaysRange(startDate, endDate) + 1;
        this.setState({
            priceFilter: [minPrice, maxPrice],
            priceRange: [minPrice, maxPrice]
        })
    }

    renderSorting(){
        const { sortBy } = this.state;
        const sortProps = ['name', 'price'];
        return (
            <div className="HotelsListing__Body__Sorting">
                {
                    sortProps.map(sortProp => {
                        return (
                            <button key={sortProp} className={styles("HotelsListing__Body__Sorting__SortBtn", {selected: sortBy == sortProp})} onClick={() => this.setState({sortBy: sortProp})}>
                                Sort by <span className="HotelsListing__Body__Sorting__SortBtn__SortOption">{sortProp}</span>
                            </button>
                        );
                    })
                }
            </div>
        )
    }

    renderDuration(){
        const { startDate, endDate } = this.props;
        return (
            <div className="HotelsListing__Body__BookingDuration">
                Total Nights: {getDaysRange(startDate, endDate)}
            </div>
        )
    }

    renderNameFilter(){
        const { nameQuery } = this.state;
        return (
            <input placeholder="Hotel Name" className="HotelsListing__SideBar__NameFilter" value={nameQuery} onChange={({target}) => this.setState({nameQuery: target.value})} />
        )
    }

    renderPriceFilter(){
        const { priceFilter, priceRange } = this.state;
        if(priceFilter){
            return (
                <div className="HotelsListing__SideBar__PriceFilter">
                    <Slider range onChange={(priceFilter) => this.setState({priceFilter})} min={priceRange[0]} max={priceRange[1]} defaultValue={priceFilter} />
                </div>
            )
        }
    }

    renderHotels(){
        const { startDate, endDate, hotels } = this.props;
        const { nameQuery, sortBy, priceFilter } = this.state;
        const duration = getDaysRange(startDate, endDate);
        const filteredHotels = _.sortBy(hotels, sortBy)
        // Filter hotels by name
        .filter(({name}) => {
            // Lower casing both strings for better matching.
            // Trimming nameQuery to remove extra spaces around it.
            return name.toLowerCase().includes(nameQuery.toLowerCase().trim());
        })
        // Filter hotels by price
        .filter(({price}) => {
            if(priceFilter){
                return price * duration >= priceFilter[0] && price * duration <= priceFilter[1];
            }else{
                return true;
            }
        })
        // Filter hotels by availability
        .filter(({availability}) => {
            return availability.filter(({from, to}) => {
                return startDate >= new Date(from) && endDate <= new Date(to);
            }).length > 0;
        });
        if(!priceFilter){
            this.setPriceRange(filteredHotels);
        }
        return (
            <div className="HotelsListing">
                <aside className="HotelsListing__SideBar">
                    {this.renderNameFilter()}
                    Price Filter:
                    {this.renderPriceFilter()}
                </aside>
                <section className="HotelsListing__Body">
                    {this.renderDuration()}
                    {this.renderSorting()}
                    <div className="clearfix" />
                    {
                        // Sort hotels by [name|price]
                        filteredHotels.length > 0
                        ? (
                            <div className="HotelsListing__Body__Result">
                                {
                                    filteredHotels
                                    .map((hotel, index) => {
                                        return ( <HotelCard key={index} hotel={hotel} startDate={startDate} endDate={endDate} />
                                        )
                                    })
                                }
                            </div>
                        )
                        : EmptyState()
                    }
                </section>
            </div>
        )
    }

    render(){
        const { startDate, endDate, loading, hotels, error } = this.props;
        const { nameQuery, sortBy, priceRange } = this.state;
        {/*
            Using stateless components as functions for performance reasons,
            for more info visit: https://goo.gl/uMMdVy
        */}
        if(!startDate || !endDate){
            return null
        } else if (loading){
            return LoadingState();
        } else if (error){
            return ErrorState();
        } else if (hotels.length == 0){
            return EmptyState();
        } else {
            return this.renderHotels();
        }
    }
}
