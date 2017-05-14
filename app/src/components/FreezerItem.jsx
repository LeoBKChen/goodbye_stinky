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

export default class FreezerItem extends React.Component {

    static propTypes = {
        id: PropTypes.number,
        isRefrige: PropTypes.bool,
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
        console.log(props);
        this.state = {
        };

        this.edit = this.edit.bind(this);
        this.checkTime = this.checkTime.bind(this);
    }
    componentDidMount(){
      if(this.props.alarmTime){
        console.log('ji3ji3ji3jij33ji3j3ij3iji3ji3jij3iji');
        var warn = setInterval(this.checkTime,20000);
      }
    }
    render() {

        return (
          <div>
              <CardBlock onClick={this.edit}>
                  <img src={getfoodIcon(this.props.name)}></img>
              </CardBlock>
              <CardTitle >{this.props.name}</CardTitle>
          </div>
        );
    }

    edit(){
      console.log("editing");
      console.log(this.props);
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
       console.log("你sadslkdj帥"+FoodDetail.name);
       console.log(FoodDetail);
        this.props.handleEdit(this.props.isRefrige, this.props.id, this.props);
        console.log("你好帥"+FoodDetail.name);
    }

    checkTime(){
      if(this.props.alarmDate && this.props.alarmTime){
          console.log('late');
          if(this.props.alarmTime.format('mm') === moment().format('mm') ||this.props.deadline.format('mm')===moment().format('mm')){
              this.props.timeOut(this.props.id,this.props.name);
              if(this.props.deadline===moment()){
                  this.clearInterval(warn);
              }
          }
      }
    }
}
