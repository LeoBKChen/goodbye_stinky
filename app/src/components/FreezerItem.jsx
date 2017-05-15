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
import {getfoodIcon} from 'utilities/food.js';
var warn;
export default class FreezerItem extends React.Component {

    static propTypes = {
        id: PropTypes.number,
        isRefrige: PropTypes.bool,
        category: PropTypes.string,
        name: PropTypes.string,
        unit: PropTypes.string,
        quantity: PropTypes.number,
        isSetDeadline: PropTypes.bool,
        deadline: PropTypes.string,
        isAlarm: PropTypes.bool,
        alarmDate: PropTypes.string,
        alarmTime: PropTypes.string,
        text: PropTypes.string,
        timeOut: PropTypes.func,
        handleEdit: PropTypes.func
    };

    constructor(props) {
        super(props);
        // console.log(typeof(props.deadline));

        this.state = {
        };

        this.edit = this.edit.bind(this);
        this.checkTime = this.checkTime.bind(this);
        if(this.props.alarmTime){
          warn = setInterval(this.checkTime,10000);
        }
    }
    componentDidMount(){

    }
    render() {

        return (
          <div >
              <CardBlock onClick={this.edit}>
                <div>
                  <img src={(getfoodIcon(this.props.name)!="none")?getfoodIcon(this.props.name):getfoodIcon(this.props.category)}></img>
                </div>
              </CardBlock>
              <CardTitle  className="fontSize" >{this.props.name}</CardTitle>
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
        this.props.handleEdit(this.props.isRefrige, this.props.id, this.props);
    }

    checkTime(){
      if(this.props.alarmDate || this.props.alarmTime){          
          if((this.props.alarmDate === moment().format("MM-DD") && this.props.alarmTime===moment().format("hh:mm a"))
              || (this.props.deadline===moment().format("MM-DD") && moment().format("hh:mm a") === "05:28 pm"))
          {
              this.props.timeOut(this.props.id,this.props.name);
              clearInterval(warn);
          }
      }
    }
}
