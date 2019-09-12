import * as React from 'react';
import DatePicker from 'react-datepicker';

import "!style-loader!css-loader!./index.css";


export interface CustomDatePickerProps {
    selected:any;
    onChange:(date)=>void;
}


export const CustomDatePicker = (props:CustomDatePickerProps) => {
    return <DatePicker
    {...props}
    className="custom-datepicker"
    popperClassName="pop-custom-datepicker"
    peekNextMonth
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    />
}