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
import Refrige  from 'components/Refrige.jsx';
import TimeOut from 'components/TimeOut.jsx';
import FoodInfo from 'components/FoodInfo.jsx';
import {createPost,listPosts,deletePost} from 'api/posts.js'


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
             isRefrige: true,
             isTimeOut: false
        };
        this.refrigeToFoodInfo = this.refrigeToFoodInfo.bind(this);
        this.freezerToFoodInfo = this.freezerToFoodInfo.bind(this);

        this.handleFoodInfoEdit = this.handleFoodInfoEdit.bind(this);
        this.handleCreateFoodItem = this.handleCreateFoodItem.bind(this);
        this.handleFinishEdit = this.handleFinishEdit.bind(this);

        this.FreezerTimeOut = this.FreezerTimeOut.bind(this);

    }

    render() {
        return (
            <div>{this.state.isTimeOut ?
                <div>
                    <TimeOut isTimeOut={isTimeOut} id={id} name={name} isRefrige={isRefrige}/>
                </div>
               :
                <div>
                   <div>{this.state.isEdit ?
                       <div>
                           <FoodInfo {...this.state} edit={this.handlefinishEdit} onPost={this.handleCreateFoodItem} delFoodItem={this.deleteFoodItem}/>
                       </div>
                     :
                       <div className='main'>
                             <div className='refrige-bg'>
                                 <div className="d-flex justify-content-around">
                                   <Row>
                                     <Col>
                                       <Freezer  freezerposts=  foodInfoEdit={this.handleFoodInfoEdit} goFoodInfo={this.freezerToFoodInfo} timeOut={this.FreezerTimeOut}/>
                                     </Col>
                                     <Col>
                                       <Refrige foodInfoEdit={this.handleFoodInfoEdit} goFoodInfo={this.refrigeToFoodInfo} timeOut={this.RefrigetimeOut}/>
                                     </Col>
                                   </Row>
                                 </div>
                                 <div className='footer'>
                                     Goodbye Stinky.
                                 </div>
                             </div>
                       </div>
                     }
                   </div>
                </div>
              }
            </div>

        );
    }


    handleCreateFoodItem(isRefrige,FoodDetail){
        createPost(isRefrige,FoodDetail).then(() => {
              listPosts(isRefrige);
          }).catch(err => {
              console.error('Error creating posts', err);
          });
    }
    handleFoodInfoEdit(id,FoodDetail,isRefrige){
        this.setState({
            isEdit: true,
            isRefrige: isRefrige,
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
    handleFinishEdit(id,FoodDetail,isRefrige)

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
    deleteFoodItem(id){
        deletePost(id).then(() => {
              listPosts(isRefrige);
          }).catch(err => {
              console.error('Error delete posts', err);
          });
    }
    FreezerTimeOut(id,name){
        this.setState({
              isTimeOut: true,
              isRefrige: false,
        });
    }
    RefrigeTimeOut(id,name){
        this.setState({
              isTimeOut: true,
              isRefrige: true,
              id: id,
              name: name
        });
    }
}
