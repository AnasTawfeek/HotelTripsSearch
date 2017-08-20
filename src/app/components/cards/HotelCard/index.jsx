import React from 'react';
import styles from './styles.scss';
import getDaysRange from 'utils/getDaysRange';

export default ({hotel: {name, city, price}, startDate, endDate}) => {
    return (
        <div className="HotelCard">
            <div className="HotelCard__Name">{name}</div>
            <div className="HotelCard__City">{city}</div>
            <div className="HotelCard__Price" title={`${price.toFixed(2)}$ Per day`}>
                {(price * getDaysRange(startDate, endDate)).toFixed(2)}$
            </div>
        </div>
    )
}
