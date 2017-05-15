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
             isSetting:false,
             isEdit: false,
             id: NaN,
             category: '',
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

        this.freezerTimeOut = this.freezerTimeOut.bind(this);
        this.refrigeTimeOut = this.refrigeTimeOut.bind(this);

        this.deleteFoodItem = this.deleteFoodItem.bind(this);

        this.knewTimeUp = this.knewTimeUp.bind(this);
    }
    componentDidMount() {
      // listPosts(this.state.isRefrige).then(p =>{
      //   // console.log(p);
      //   this.setState({
      //       refrigePosts: p
      //   });
      // });
      listPosts(!this.state.isRefrige).then(p =>{
        this.setState({
            freezerPosts: p
        });
      });
    }
    render() {
        const {name,id,isRefrige,freezerPosts,refrigePosts}= this.state;
        return (
            <div>{this.state.isTimeOut ?
                <div>
                    <TimeOut isTimeOut={this.isTimeOut} id={id} name={name} isRefrige={isRefrige} knewTimeUp={this.knewTimeUp} />
                </div>
               :
                <div>
                   <div>{this.state.isSetting ?
                       <div>
                           <FoodInfo {...this.state} editfunc={this.handleFinishEdit} onPost={this.handleCreateFoodItem} delFoodItem={this.deleteFoodItem}/>
                       </div>
                     :
                       <div className='main'>
                             <div className='refrige-bg'>
                                 <div className="d-flex justify-content-around">
                                   <Row>
                                     <Col>
                                       <Freezer  freezerPosts={freezerPosts}  editFoodInfo={this.handleFoodInfoEdit} goFoodInfo={this.freezerToFoodInfo} timeOut={this.freezerTimeOut}/>
                                     </Col>
                                     <Col>
                                       <Refrige  refrigePosts={refrigePosts} editFoodInfo={this.handleFoodInfoEdit} goFoodInfo={this.refrigeToFoodInfo} timeOut={this.refrigeTimeOut}/>
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

        createPost(isRefrige,FoodDetail).then((post) => {
              listPosts(isRefrige).then(p =>{
                this.setState({
                    isSetting:false,
                    freezerPosts: p
                });
              });

          }).catch(err => {
              console.error('Error creating posts', err);
          });
        // this.setState({
        //     isSetting:false
        // });
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
            listPosts(p.isRefrige).then(posts =>{
                if(!p.isRefrige){
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
    deleteFoodItem(id,isRefrige){
        deletePost(isRefrige, id).then(() => {
              listPosts(isRefrige);
              this.setState({
                  isEdit:false,
                  isSetting:false
              });
          }).catch(err => {
              console.error('Error delete posts', err);
          });
    }
    freezerTimeOut(id,name){
        this.setState({
              isTimeOut: true,
              isRefrige: false,
        });
    }
    refrigeTimeOut(id,name){
        this.setState({
              isTimeOut: true,
              isRefrige: true,
              id: id,
              name: name
        });
    }

    knewTimeUp(){
      this.setState({

        isTimeOut:false
      });
    }    
}
