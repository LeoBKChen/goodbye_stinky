import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardBlock,
    CardTitle
} from 'reactstrap';
import moment from 'moment';

import './RefrigeItem.css';
import {handleEdit,timeOut} from 'components/RefrigeList.jsx';
import {getFoodIcon} from 'utilities/food.js';

export default class RefrigeItem extends React.Component {
    static propTypes = {
        id: PropTypes.number,
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
    componentDidMount(){
        var warn = setInterval(this.checkTime,20000);
    }

    render() {

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
        this.props.handleEdit(this.props.isRefrige, this.props.id, FoodDetail );
    }
    checkTime(){
        if(this.props.alarmTime.format('mm') === moment().format('mm') ||this.props.deadline.format('mm')===moment().format('mm')){
            this.props.timeOut(this.props.id,this.props.name);
            if(this.props.deadline===moment()){
                this.clearInterval(warn);
            }
        }
      }
}
