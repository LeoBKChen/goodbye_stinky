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
import {getfoodIcon} from 'utilities/food.js';
var warn;
export default class RefrigeItem extends React.Component {

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
        this.state = {
            isAlarm: props.isAlarm,
            isSetDeadline: props.isSetDeadline
        };

        this.edit = this.edit.bind(this);
        this.checkTime = this.checkTime.bind(this);
        if((this.state.isAlarm && props.alarmTime) || (this.state.isSetDeadline && props.deadline)){
          warn = setInterval(this.checkTime,8000);
        }
    }

    render() {

        return (
          <div onClick={this.edit}>
              <CardBlock id="foodImgCard">
                <div>
                    <img src={(getfoodIcon(this.props.name)!="none")?getfoodIcon(this.props.name):getfoodIcon(this.props.category)}></img>
                </div>
              </CardBlock>
              <CardTitle  className="fontSizeRef">{this.props.name}</CardTitle>
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
        this.props.handleEdit(true, this.props.id, FoodDetail );
    }
    checkTime(){
        // console.log("checking ref");
        // console.log(this.props.isAlarm);
        // console.log(this.state.isSetDeadline);
        // console.log(this.props.alarmTime + this.props.name);
        // console.log(this.props.deadline);
        // console.log(moment().format("hh:mm a"));
        if(this.state.isAlarm){

            if((this.props.alarmDate === moment().format("MM-DD") &&
                this.props.alarmTime===moment().format("hh:mm a")))
              {
                  clearInterval(warn);
                //   console.log("dingding re alarm");
                  var FoodDetail={
                       id:this.props.id,
                       name:this.props.name,
                       category:this.props.category,
                       quantity:this.props.quantity,
                       unit:this.props.unit,
                       isSetDeadline:this.props.isSetDeadline,
                       deadline:this.props.deadline,
                       isAlarm:false,
                       alarmDate:this.props.alarmDate,
                       alarmTime:this.props.alarmTime,
                       text:this.props.text
                   }
                   this.setState({
                       isAlarm:false,
                       isSetDeadline:false
                   });
                   this.props.timeOut(FoodDetail);

              }
        }
        else if(this.state.isSetDeadline){
            if((this.props.deadline===moment().format("MM-DD") && moment().format("hh:mm a") === "04:23 am")){
            clearInterval(warn);
            // console.log("dingding reee dead");
            var FoodDetail={
                 id:this.props.id,
                 name:this.props.name,
                 category:this.props.category,
                 quantity:this.props.quantity,
                 unit:this.props.unit,
                 isSetDeadline:false,
                 deadline:this.props.deadline,
                 isAlarm:this.state.isAlarm,
                 alarmDate:this.props.alarmDate,
                 alarmTime:this.props.alarmTime,
                 text:this.props.text
             }
             this.setState({
                 isAlarm:false,
                 isSetDeadline:false
             });
             this.props.timeOut(FoodDetail);
            }
        }
    }
}
