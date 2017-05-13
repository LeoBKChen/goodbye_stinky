import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col
} from 'reactstrap';

import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import Freezer from 'components/Freezer.jsx';
import Refrige from 'components/Refrige.jsx';
import FoodInfo from 'components/FoodInfo.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             category: '',
             isEdit: false,
             id: NaN,
             name: '',
             quantity: 1,
             unit: 'na',
             isSetDeadline: false,
             deadline: moment(),
             isAlarm: false,
             alarmDate: moment(),
             alarmTime: moment(),
             text: '',
             isRefrige: true
        };
        this.refrigeToFoodInfo = this.refrigeToFoodInfo.bind(this);
        this.freezerToFoodInfo = this.freezerToFoodInfo.bind(this);

        this.handleFoodInfoEdit = this.handleFoodInfoEdit.bind(this);
        this.handleCreateFreezerItem = this.handleCreateFreezerItem.bind(this);
    }

    render() {
        return (
                <div className='main'>
                    <div className='refrige-bg'>
                      <div className="d-flex justify-content-around">
                        <FoodInfo {...this.state} onPost={this.handleCreateFreezerItem}/>
                      <Row>
                        <Col>
                          <Freezer foodInfoEdit={this.handleFoodInfoEdit} goFoodInfo={this.freezerToFoodInfo}/>
                        </Col>
                        <Col>
                          <Refrige foodInfoEdit={this.handleFoodInfoEdit} goFoodInfo={this.refrigeToFoodInfo}/>
                        </Col>
                      </Row> 
                    </div>
                        <div className='footer'>
                            Goodbye Stinky.
                        </div>
                    </div>

                </div>
        );
    }


    handleCreateFreezerItem(FoodDetail){
      createFreezerItem(FoodDetail).then(() => {
            this.listFreezerItem();
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    }
    handleFoodInfoEdit(id,FoodDetail,isrefrige){
        this.setState({
            isEdit: true,
            isRefrige: isrefrige,
            id: id,
            name: FoodDetail.name,
            category:FoodDetail.category,
            quantity:FoodDetail.quantity,
            unit:FoodDetail.unit,
            isSetDeadline:FoodDetail.isSetDeadline,
            deadline:FoodDetail.deadline,
            isAlarm:FoodDetail.isAlarm,
            alarmDate:FoodDetail.alarmDate,
            alarmTime:FoodDetail.alarmTime,
            text:FoodDetail.text
        });
    }

    freezerToFoodInfo(category, name){
        this.setState({
            name: name,
            category: category,
            isRefrige: false 
        })
    }
    refrigeToFoodInfo(category, name){
        this.setState({
            name: name,
            category: category,
            isRefrige: true
        })
    }
}
