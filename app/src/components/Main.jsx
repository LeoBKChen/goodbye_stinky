import React from 'react';
import PropTypes from 'prop-types';

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
import {createPost, listPosts, deletePost, updatePost} from 'api/posts.js'


import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             category: '',
             isSetting:false,
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
             isTimeOut: false,
             freezerPosts: [],
             refrigePosts: []
        };
        this.refrigeToFoodInfo = this.refrigeToFoodInfo.bind(this);
        this.freezerToFoodInfo = this.freezerToFoodInfo.bind(this);

        this.handleFoodInfoEdit = this.handleFoodInfoEdit.bind(this);
        this.handleCreateFoodItem = this.handleCreateFoodItem.bind(this);
        this.handleFinishEdit = this.handleFinishEdit.bind(this);

        this.FreezerTimeOut = this.FreezerTimeOut.bind(this);

    }

    render() {
        const {name,id,isRefrige,freezerPosts,refrigePosts}= this.state;
        return (
            <div>{this.state.isTimeOut ?
                <div>
                    <TimeOut isTimeOut={this.isTimeOut} id={id} name={name} isRefrige={isRefrige}/>
                </div>
               :
                <div>
                   <div>{this.state.isSetting ?
                       <div>
                           <FoodInfo {...this.state} edit={this.handlefinishEdit} onPost={this.handleCreateFoodItem} delFoodItem={this.deleteFoodItem}/>
                       </div>
                     :
                       <div className='main'>
                             <div className='refrige-bg'>
                                 <div className="d-flex justify-content-around">
                                   <Row>
                                     <Col>
                                       <Freezer  freezerPosts={freezerPosts}  foodInfoEdit={this.handleFoodInfoEdit} goFoodInfo={this.freezerToFoodInfo} timeOut={this.FreezerTimeOut}/>
                                     </Col>
                                     <Col>
                                       <Refrige  refrigePosts={refrigePosts} foodInfoEdit={this.handleFoodInfoEdit} goFoodInfo={this.refrigeToFoodInfo} timeOut={this.RefrigetimeOut}/>
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
        console.log(FoodDetail);
        createPost(isRefrige,FoodDetail).then((post) => {
              console.log(post);
              listPosts(isRefrige).then(p => console.log(p));
              this.setState({
                  isSetting:false
              });
          }).catch(err => {
              console.error('Error creating posts', err);
          });
    }
    handleFoodInfoEdit(isRefrige,id,FoodDetail){
        this.setState({
            isEdit: true,
            isSetting: true,
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
    handleFinishEdit(isRefrige,id,FoodDetail){
        updatePost(isRefrige,id,FoodDetail).then( p =>{
            console.log('update'+FoodDetail.name);
            listPosts(p.isRefrige).then(posts =>{
                if(p.isRefrige){
                    this.setState({
                        freezerPosts: posts
                    });
                }
                else{
                    this.setState({
                        refrigePosts: posts
                    });
                }
            });
            this.setState({
              isEdit:false,
              isSetting: false
            });
        });
    }

    freezerToFoodInfo(category, name){
        this.setState({
            name: name,
            category: category,
            isRefrige: false,
            isSetting:true
        })
    }
    refrigeToFoodInfo(category, name){
        this.setState({
            name: name,
            category: category,
            isRefrige: true,
            isSetting:true
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
