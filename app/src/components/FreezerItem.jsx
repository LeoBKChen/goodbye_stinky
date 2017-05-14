import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardBlock,
    CardTitle
} from 'reactstrap';
import moment from 'moment';

import './FreezerItem.css';
import {handleEdit,timeOut} from 'components/FreezerList.jsx';

export default class FreezerItem extends React.Component {
    static propTypes = {

        isRefrige: PropTypes.bool,
        name: PropTypes.string,
        unit: PropTypes.unit,
        quantity: PropTypes.number,
        isSetDeadline: PropTypes.bool,
        deadline: PropTypes.date,
        isAlarm: PropTypes.bool,
        alarmDate: PropTypes.date,
        alarmTime: PropTypes.date,
        text: PropTypes.string,
        timeOut: PropTypes.func

    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        };

        this.edit = this.edit.bind(this);
        this.checkTime = this.checkTime.bind(this);
    }

    render() {
        var warn = setInterval(this.checkTime,60000);
        // const form = this.state.formToggle ? 'form' : '';
        return (
          <div>
              <CardBlock onClick={this.edit}>
                  <img src={getFoodIcon(p.name)}></img>
              </CardBlock>
              <CardTitle >{p.name}</CardTitle>
          </div>
        );
    }

    edit(){
      var FoodDetail={
           name:this.props.name,
           category:this.props.category,
           quantity:this.props.quantity,
           unit:this.props.unit,
           isSetDeadline:this.props.isSetDeadline,
           deadline:this.props.deadline,
           isAlarm:this.props.isAlarm,
           alarmDate:this.props.alarmDate,
           alarmTime:this.props.alarmTime,
           text:this.props.text
       }
        this.props.handleEdit(this.props.id, FoodDetail, isRefrige);
    }
    checkTime(){
        if(this.props.alarmTime===moment()||this.props.deadline===moment()){
            this.props.timeOut(this.props.id,this.props.name);
            if(this.props.deadline===moment()){
                this.clearInterval(warn);
            }
        }
    }
}
