import React from 'react';
import {BY_VOTE_SCORE, BY_TIME_STAMP} from '../utils/constants';

export default function SortControl({ onSortBy }) {
    const options = [
    { value: BY_VOTE_SCORE, text: "By Vote Score" },
    { value: BY_TIME_STAMP, text: "By Time" }]

    return (
        <div className="book-shelf-changer">
            <select onChange={(event) => onSortBy(event.target.value)}>
                {
                    options.map((option) => {
                        return (<option key={option.value} value={option.value}>{option.text}</option>)
                    })
                }
            </select>
        </div>
    )
}
