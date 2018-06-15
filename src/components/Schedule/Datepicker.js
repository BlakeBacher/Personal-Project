import React, { Component } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export default class Datepicker extends Component {
    constructor(){
        super()
        
        this.state ={
            selectedDate: new Date()
        }
    }


    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
      }


    render() {
        const { selectedDate } = this.state;

        return (

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="pickers">
                    <DatePicker value={selectedDate} onChange={this.handleDateChange} />
                    <TimePicker value={selectedDate} onChange={this.handleDateChange} />
                </div>
            </MuiPickersUtilsProvider>
        )
    }
}