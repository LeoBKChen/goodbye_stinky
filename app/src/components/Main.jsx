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
             isRefrige: true,
             isTimeOut: false,
             isSetting:false,
             isEdit: false,
             category: '',
             name: '',
             id: NaN,
             quantity: 1,
             unit: 'na',
             isSetDeadline: false,
             isAlarm: false,
             deadline: moment(),
             alarmDate: moment(),
             alarmTime: moment(),
             text: '',
             freezerPosts: [],
             refrigePosts: []
        };
        this.refrigeToFoodInfo = this.refrigeToFoodInfo.bind(this);
        this.freezerToFoodInfo = this.freezerToFoodInfo.bind(this);

        this.handleFoodInfoEdit = this.handleFoodInfoEdit.bind(this);
        this.handleCreateFoodItem = this.handleCreateFoodItem.bind(this);
        this.handleFinishEdit = this.handleFinishEdit.bind(this);

        this.freezerTimeOut = this.freezerTimeOut.bind(this);
        this.refrigeTimeOut = this.refrigeTimeOut.bind(this);

        this.deleteFoodItem = this.deleteFoodItem.bind(this);

        this.knewTimeUp = this.knewTimeUp.bind(this);
    }
    componentDidMount() {
      listPosts(true).then(p =>{
        this.setState({
            refrigePosts: p
        });
      });
      listPosts(false).then(p =>{
        this.setState({
            freezerPosts: p
        });
      });
    }
    render() {
        const {name,id,isRefrige,freezerPosts,refrigePosts}= this.state;
        return (
            <div className="bg main">
              <div className="inside">
                {this.state.isTimeOut
                    ?
                <div>
                    <TimeOut {...this.state} knewTimeUp={this.knewTimeUp} />
                </div>
               :
                   <div>{this.state.isSetting ?
                       <div>
                           <FoodInfo {...this.state} editfunc={this.handleFinishEdit} onPost={this.handleCreateFoodItem} delFoodItem={this.deleteFoodItem}/>
                       </div>
                     :
                       <div >
                             <div className='refrige-bg'>
                                 <div className="d-flex justify-content-around">
                                   <Row>
                                     <Col>
                                       <Freezer  isRefrige={isRefrige} freezerPosts={freezerPosts}  editFoodInfo={this.handleFoodInfoEdit} goFoodInfo={this.freezerToFoodInfo} timeOut={this.freezerTimeOut}/>

                                     </Col>
                                     <Col>
                                       <Refrige  isRefrige={isRefrige} refrigePosts={refrigePosts} editFoodInfo={this.handleFoodInfoEdit} goFoodInfo={this.refrigeToFoodInfo} timeOut={this.refrigeTimeOut}/>
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
              }
            </div>
        </div>

        );
    }


    handleCreateFoodItem(isRefrige,FoodDetail){
        createPost(isRefrige,FoodDetail).then((post) => {
              listPosts(isRefrige).then(p =>{
                  if(!isRefrige){
                    this.setState({
                        freezerPosts: p
                    });
                  }
                  else{
                    this.setState({
                        refrigePosts: p
                    });
                  }
              });
          }).catch(err => {
              console.error('Error creating posts', err);
          });
        if(!isRefrige){
          listPosts(true).then(p =>{
            this.setState({
                refrigePosts: p,
                isSetting: false
            });
          });
        }
        else{
          listPosts(false).then(p =>{
            this.setState({
                freezerPosts: p,
                isSetting: false
            });
          });
        }

    }

    handleFoodInfoEdit(isRefrige,id,FoodDetail){
        this.setState({
            isEdit: true,
            isSetting: true,
            isRefrige: isRefrige,
            id: id,
            name: FoodDetail.name,
            category: FoodDetail.category,
            quantity: FoodDetail.quantity,
            unit: FoodDetail.unit,
            isSetDeadline: FoodDetail.isSetDeadline,
            deadline: moment(FoodDetail.deadline,"MM-DD"),
            isAlarm: FoodDetail.isAlarm,
            alarmDate: moment(FoodDetail.alarmDate,"MM-DD"),
            alarmTime: moment(FoodDetail.alarmTime,"hh:mm a"),
            text: FoodDetail.text
        });
    }
    handleFinishEdit(isRefrige,FoodDetail){
        updatePost(isRefrige, FoodDetail).then( p =>{
            // console.log("isAlarm");
            // console.log(p.isAlarm);
            listPosts(isRefrige).then(posts =>{
                if(!isRefrige){
                    this.setState({
                      isEdit:false,
                      isSetting: false,
                        freezerPosts: posts
                    });
                }
                else{
                    this.setState({
                        isEdit:false,
                        isSetting: false,
                        refrigePosts: posts
                    });
                }
            });
            this.setState({
            });
        });
    }

    freezerToFoodInfo(category, name){
        this.setState({
            name: name,
            category: category,
            isRefrige: false,
            isSetting:true,
            isEdit: false,
            id: NaN,
            quantity: 1,
            unit: 'na',
            isSetDeadline: false,
            isAlarm: false,
            deadline: moment(),
            alarmDate: moment(),
            alarmTime: moment(),
            text: '',
            freezerPosts: [],
            refrigePosts: []
        });
    }
    refrigeToFoodInfo(category, name){
        this.setState({
            name: name,
            category: category,
            isRefrige: true,
            isSetting:true,
            isEdit: false,
            id: NaN,
            quantity: 1,
            unit: 'na',
            isSetDeadline: false,
            isAlarm: false,
            deadline: moment(),
            alarmDate: moment(),
            alarmTime: moment(),
            text: '',
            freezerPosts: [],
            refrigePosts: []
        });
    }
    deleteFoodItem(id,isRefrige){
        deletePost(isRefrige, id).then(() => {
            // console.log('delete');
          listPosts(isRefrige).then(posts =>{
            //   console.log("inlist");
              if(!isRefrige){
                  this.setState({
                      freezerPosts: posts,
                      isSetting: false
                  });
              }
              else{
                //   console.log('刪文');
                  this.setState({
                      refrigePosts: posts,
                      isSetting: false
                  });
              }
            });
          }).catch(err => {
              console.error('Error delete posts', err);
          });


      listPosts(true).then(p =>{
        this.setState({
            refrigePosts: p,
            isSetting: false
        });
      });
      listPosts(false).then(p =>{
        this.setState({
            freezerPosts: p,
            isSetting: false
        });
      });
    //   console.log('finish delete');
    }

    freezerTimeOut(FoodDetail){

        this.setState({
              isTimeOut: true,
              isRefrige: false,
              id: FoodDetail.id,
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
    refrigeTimeOut(FoodDetail){
        this.setState({
              isTimeOut: true,
              isRefrige: true,
              id: FoodDetail.id,
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

    knewTimeUp(isRefrige,FoodDetail){
        // console.log("timeOut FoodDetail");
        // console.log(FoodDetail);
        updatePost(isRefrige, FoodDetail).then( p =>{
            listPosts(isRefrige).then(posts =>{
                if(!isRefrige){
                    this.setState({
                        freezerPosts: posts,
                        isEdit:false,
                        isSetting: false,
                        isTimeOut:false
                    });
                }
                else{
                    this.setState({
                        refrigePosts: posts,
                        isEdit:false,
                        isSetting: false,
                        isTimeOut:false
                    });
                }
            });
        });
    }
}
