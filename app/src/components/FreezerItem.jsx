import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
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

        this.state = {
        };

        this.edit = this.edit.bind(this);
        this.checkTime = this.checkTime.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
        });

    }

    render() {
      var warn setInterval(this.checkTime,60000);
        // const form = this.state.formToggle ? 'form' : '';
        return (
              <CardBlock onClick={this.edit}>
                  <img src={getFoodIcon(p.name)}></img>
              </CardBlock>
              <CardTitle >{p.name}</CardTitle>
        );
    }
    edit(this.props.id){
        var FoodDetail={
            name:this.state.name,
            category:this.props.category,
            quantity:this.state.quantity,
            unit:this.state.unit,
            isSetDeadline:this.state.isSetDeadline,
            deadline:this.state.deadline,
            isAlarm:this.state.isAlarm,
            alarmDate:this.state.alarmDate,
            alarmTime:this.state.alarmTime,
            text:this.state.text
        }
        this.props.handleEdit(this.props.id,FoodDetail,isRefrige);
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
