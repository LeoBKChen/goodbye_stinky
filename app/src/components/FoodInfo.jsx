import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Alert,
    Form,
    FormGroup,
    FormText,
    Label,
    Legend,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Row,
    Col,
    Card,
    CardImg,
    CardImgOverlay,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './FoodInfo.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import {getinfoIcon} from 'utilities/info.js';

const now = moment().hour(0).minute(0);

export default class FoodInfo extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        category: PropTypes.string,
        isRefrige: PropTypes.bool,
        delFoodItem: PropTypes.func
    };

    constructor(props) {
        super(props);
        // console.log("in construct");
        // console.log(props);
        this.inputFoodNameEl = this.props.name;
        this.inputQuantityEL = null;
        this.inputNoteEl = null;
        this.state = {
            ...FoodInfo.getInitFoodInfoState(props),
            quantityToggle: false,
            unitToggle: false,
            inputFoodNameDanger: false,
            inputQuantityDanger: false,
            inputUnitDanger: false
            // text: props.name
        };
        console.log("info state");
        console.log(this.state);
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this);

        this.handleSetQuantity = this.handleSetQuantity.bind(this);
        this.handleQuantityToggle = this.handleQuantityToggle.bind(this);

        this.handleUnit = this.handleUnit.bind(this);
        this.handleUnitToggle = this.handleUnitToggle.bind(this);

        this.handleSetDeadlineOff = this.handleSetDeadlineOff.bind(this);
        this.handleSetDeadlineOn = this.handleSetDeadlineOn.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);

        this.handleSetAlarmOn = this.handleSetAlarmOn.bind(this);
        this.handleSetAlarmOff = this.handleSetAlarmOff.bind(this);
        this.handleAlarmDateChange = this.handleAlarmDateChange.bind(this);
        this.handleAlarmTimeChange = this.handleAlarmTimeChange.bind(this);

        this.handleInputNoteChange = this.handleInputNoteChange.bind(this);
        this.handleFoodInfodelete = this.handleFoodInfodelete.bind(this);
        this.handleFoodInfoSubmit = this.handleFoodInfoSubmit.bind(this);
    }

    static getUnitString(unit) {
        return unit === 'na' ? '單位' : unit;

    }
    static getInitFoodInfoState(props) {
        console.log("in initial");
        console.log(props);
        var tryasdsda = moment(props.alarmTime);
        return {
            unit: props.unit,
            quantity: props.quantity,
            isSetDeadline: props.isSetDeadline,
            deadline: tryasdsda,
            isAlarm: props.isAlarm,
            alarmDate: tryasdsda,
            alarmTime: tryasdsda,
            text: props.text
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.name
        });
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
          inputNameValue: nextProps.name,
          unit: nextProps.unit,
          deadline: moment()
      });
    }

    render() {

        return (
          <div className='container'>
              <Card className="infoCard">
                  <Form className="infoForm">
                      {/* name */}
                      <FormGroup>
                          <Label className="name">{this.props.category}&nbsp;品名：</Label>
                          <InputGroup>
                            {/*}{this.translateFoodname(this.props.name)}*/}
                             <Input type='text' name='foodname' placeholder={this.props.name} getRef={el => {this.inputFoodNameEl = el}}
                               value={this.state.inputFoodNameEl } onChange={this.handleFoodNameChange}></Input>&nbsp;
                            {/* <Label > 南瓜</Label> */}
                            <Alert color='info' isOpen={this.state.inputFoodNameDanger}>請填寫名稱</Alert>
                          </InputGroup>
                      </FormGroup>
                      {/*quantity*/}
                      <FormGroup>
                          <Label className="name">數量：</Label>
                          <InputGroup>
                              <Input placeholder="請輸入數字" type="number" step="1" className='input' onChange={this.handleSetQuantity}
                                getRef={el => {this.inputQuantityEl = el}} value={this.state.quantity}></Input>

                              <ButtonDropdown type='buttom' isOpen={this.state.unitToggle} toggle={this.handleUnitToggle}>
                                  <DropdownToggle type='button' caret color="secondary">
                                    {FoodInfo.getUnitString(this.state.unit)}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('個')}}>個</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('人份')}}>人份</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('克')}}>克</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('公斤')}}>公斤</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('台斤')}}>台斤</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('毫升')}}>毫升</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('公升')}}>公升</DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>&nbsp;
                          </InputGroup>
                          <Alert color='info' isOpen={this.state.inputQuantityDanger}>請填寫正確數量</Alert>
                          <Alert color='info' isOpen={this.state.inputUnitDanger}>請填寫單位</Alert>
                      </FormGroup>
                      {/* deadline */}
                      <div className="row">
                          <Label className="name off col-xs-9 deadline">有效期限：</Label>
                              <FormGroup className="col-xs-6 col-sm-2">
                                  <Label check>
                                      {this.state.isSetDeadline
                                        ?
                                      <Input type="radio" name="radio1"  onChange={this.handleSetDeadlineOff} />
                                        :
                                      <Input type="radio" name="radio1" defaultChecked onChange={this.handleSetDeadlineOff} />
                                      }
                                      關
                                  </Label>
                              </FormGroup>
                              <FormGroup className="col-xs-6 col-sm-10">
                                <InputGroup>
                                  <Label check>
                                      {this.state.isSetDeadline
                                        ?
                                        <Input type="radio" name="radio1"  defaultChecked  onChange={this.handleSetDeadlineOn}  />
                                        :
                                        <Input type="radio" name="radio1"   onChange={this.handleSetDeadlineOn}  />
                                      }
                                     開
                                  </Label>
                                  <div className="on">{this.state.isSetDeadline ?
                                      <DatePicker
                                          dateFormat="YYYY/MM/DD"
                                          placeholderText="選擇有效期限"
                                          selected={this.state.deadline}
                                          onChange={this.handleDeadlineChange}
                                          minDate={moment()}
                                          fixedHeight
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormatCalendar="YYYY/MMM"
                                      />
                                      :
                                      <DatePicker
                                          dateFormat="YYYY/MM/DD"
                                          placeholderText="選擇有效期限"
                                          selected={this.state.deadline}
                                          dateFormatCalendar="YYYY/MM"
                                          disabled
                                      />
                                      }
                                      &nbsp;
                                      <img className="foodinfoImg" src={getinfoIcon("月曆")}/>
                                  </div>
                                </InputGroup>
                              </FormGroup>
                      </div>
                      {/* setAlarm */}
                      <div className="row">
                          <Label className="off name col-xs9 alarm">提醒：</Label>
                              <FormGroup className="col-xs-6 col-sm-2">
                                  <Label check>
                                      { this.state.isAlarm
                                        ?
                                          <Input type="radio" name="radio2" onChange={this.handleSetAlarmOff}  />
                                        :
                                          <Input type="radio" name="radio2" defaultChecked onChange={this.handleSetAlarmOff}  />
                                      }
                                      關
                                  </Label>
                              </FormGroup>
                              <FormGroup  className="col-xs-6 col-sm-10">
                                <InputGroup>
                                  <Label check>
                                      { this.state.isAlarm
                                        ?
                                          <Input type="radio" name="radio2" defaultChecked onChange={this.handleSetAlarmOn}  />
                                        :
                                          <Input type="radio" name="radio2" onChange={this.handleSetAlarmOn}  />
                                      }
                                      開
                                  </Label>
                                  <div>{this.state.isAlarm ?
                                        <div  className="on">
                                          <div className="日期">
                                            <DatePicker
                                                dateFormat="YYYY/MM/DD"
                                                placeholderText="選擇提醒日期"
                                                selected={this.state.alarmDate}
                                                onChange={this.handleAlarmDateChange}
                                                fixedHeight
                                                minDate={moment()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dateFormatCalendar="YYYY/MM"
                                            />
                                            &nbsp;
                                            <img className="foodinfoImg" src={getinfoIcon("月曆")}/>
                                            </div>
                                            <TimePicker
                                              showSecond={false}
                                              defaultValue={this.state}
                                              use12Hours
                                              onChange={this.handleAlarmTimeChange}
                                              format = 'h:mm a'
                                            />
                                            &nbsp;
                                            <img className="foodinfoImg" src={getinfoIcon("時鐘")}/>
                                        </div>
                                      :
                                        <div>

                                          <div className="日期">
                                            <DatePicker
                                              dateFormat="YYYY/MM/DD"
                                              placeholderText="選擇提醒日期"
                                              selected={this.state.alarmDate}
                                              onChange={this.handleAlarmDateChange}
                                              disabled
                                            />
                                            &nbsp;
                                            <img className="foodinfoImg" src={getinfoIcon("月曆")}/>
                                            </div>
                                            <TimePicker
                                              showSecond={false}
                                              selected={this.state.alarmDate}
                                              defaultValue={now}
                                              // use24Hours
                                              disabled
                                            />
                                            &nbsp;
                                            <img className="foodinfoImg" src={getinfoIcon("時鐘")}/>
                                        </div>
                                      }
                                  </div>
                              </InputGroup>
                          </FormGroup>
                    </div>
                      {/* note */}
                      <FormGroup>
                          <Label className="name">備註：</Label>
                            <Input className='input' type='textarea' getRef={el => {this.inputNoteEl = el}}
                               value={this.state.text} onChange={this.handleInputNoteChange}
                               placeholder="備註..."></Input>
                      </FormGroup>
                      {/* submit or delete*/}
                      <FormGroup check row>
                        <Col className='d-flex justify-content-around' sm={{ size: 10, offset: 1 }}>
                          {this.props.isEdit?
                              <Button color="danger" onClick={this.handleFoodInfodelete} >刪除</Button>:''}
                          <Button onClick={this.handleFoodInfoSubmit}
                                    style={{backgroundColor: 'rgb(49, 140, 200)', color: 'rgb(256,256,256)' }}>完成</Button>
                        </Col>
                      </FormGroup>
                  </Form>
              </Card>
          </div>
        );
    }

    handleFoodNameChange(e){
        const texts = e.target.value
        // console.log('i am ddsf');
        this.setState({
          name: texts,
          inputFoodNameDanger: false
        });

    }

    handleSetQuantity(e){
        const numbers = e.target.value;
        if(numbers<=0){
            this.setState({
                inputQuantityDanger: true
            });
        }
        this.setState({
            quantity: numbers,
            inputQuantityDanger: false
        });

    }
    handleQuantityToggle(e) {
        this.setState((prevState, props) => ({
            quantityToggle: !prevState.quantityToggle
        }));
    }

    handleUnitToggle(e){
        this.setState((prevState, props) => ({
            unitToggle: !prevState.unitToggle,
            inputUnitDanger: false
        }));
    }
    handleUnit(units){
        this.setState({
          unit: units
        });
    }

    handleSetDeadlineOff(e){
        this.setState({
            isSetDeadline: false
        });
    }
    handleSetDeadlineOn(e){
        this.setState({
            isSetDeadline: true
        });
    }
    handleDeadlineChange(date) {
        this.setState({
          deadline: date
        });
    }

    handleSetAlarmOn(e){
        console.log('AlarmOn');
        this.setState({
            isAlarm: true
        });

    }
    handleSetAlarmOff(e){
        this.setState({
            isAlarm: false
        });
    }
    handleAlarmDateChange(date){
      console.log();
        this.setState({
            alarmDate: date
        });
    }
    handleAlarmTimeChange(time) {

        console.log(time.hours());
        console.log(time.minutes());

        this.setState({
            alarmTime: time
        });
    }

    handleInputNoteChange(e){
        const texts = e.target.value
        this.setState({text: texts});

    }
    handleFoodInfoSubmit(){
        if (!this.props.name) {
            this.setState({inputFoodNameDanger: true});
            return;
        }

        if(this.state.quantity<=0){
            this.setState({inputQuantityDanger: true});
            return;
        }
        if(this.state.unit === 'na'){
          this.setState({
              inputUnitDanger: true,
              unitToggle: true
          });
          return;
        }
        // console.log("this.state =");
        // console.log(this.state);
        const FoodDetail={
            id: this.props.id,
            name:this.state.name,
            category:this.props.category,
            quantity:this.state.quantity,
            unit:this.state.unit,
            isSetDeadline:this.state.isSetDeadline,
            deadline:this.state.deadline.format("MM-DD"),
            isAlarm:this.state.isAlarm,
            alarmDate:this.state.alarmDate.format("MM-DD"),
            alarmTime:this.state.alarmTime.format("hh:mm a"),
            text:this.state.text
        }

        if(!this.props.isEdit){
            this.props.onPost(this.props.isRefrige,FoodDetail);
        }
        else{
            this.props.editfunc(this.props.isRefrige,FoodDetail);
        }
        // for(var i=0;i<FoodDetail.length;i++){
        //     console.log(i+'  '+FoodDetail[i]);
        // }
    }
    handleFoodInfodelete(){
      // 可以加alert
        this.props.delFoodItem(this.props.id, this.props.isRefrige);
    }
}
