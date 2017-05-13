import React from 'react';

import uuid from 'uuid/v4';
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
    InputGroupAddon,
    Button,
    Row,
    Col,
    Card,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './FoodInfo.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';


const now = moment().hour(0).minute(0);

export default class FoodInfo extends React.Component {
    static propTypes = {
        // city: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        isRefrige: PropTypes.bool
    };

    constructor(props) {
        super(props);
        console.log("in construct");
        console.log(props);
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
        this.translateCategoryName = this.translateCategoryName.bind(this);
        this.translateFoodName = this.translateFoodName.bind(this);
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

        this.handleFoodInfoSubmit = this.handleFoodInfoSubmit.bind(this);
    }

    static getUnitString(unit) {
        return unit === 'na' ? '單位' :
                (unit === 'count') ? '個': '台斤';
                // (unit === 'Taiwanese_kg') ?

    }
    static getInitFoodInfoState(props) {
        console.log("in initial");
        console.log(props);
        return {
            
            unit: props.unit,
            quantity: props.quantity,            
            isSetDeadline: props.isSetDeadline,
            deadline: props.deadline,
            isAlarm: props.isAlarm,
            alarmDate: props.alarmDate,
            alarmTime: props.alarmTime,
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
        // const form = this.state.formToggle ? 'form' : '';

        return (
          <div className='container'>
              <Card>
                  <Form>
                      {/* name */}
                      <FormGroup row>
                          <InputGroupAddon>{this.translateCategoryName(this.props.category)}&nbsp;品名：</InputGroupAddon>
                          <Col sm={5}>
                            {/*}{this.translateFoodname(this.props.name)}*/}
                             <Input type='text' name='foodname' placeholder={this.translateFoodName(this.props.name)} getRef={el => {this.inputFoodNameEl = el}}
                               value={this.state.inputFoodNameEl } onChange={this.handleFoodNameChange}></Input>&nbsp;
                            {/* <Label > 南瓜</Label> */}
                            <Alert color='info' isOpen={this.state.inputFoodNameDanger}>請填寫名稱</Alert>
                          </Col>
                      </FormGroup>
                      {/*quantity*/}
                      <FormGroup row>
                          <InputGroupAddon>數量：</InputGroupAddon>
                          <Col sm={5}>
                              <Input placeholder="請輸入數字" type="number" step="1" className='input' onChange={this.handleSetQuantity}
                                getRef={el => {this.inputQuantityEl = el}} value={this.state.quantity}></Input>

                              <ButtonDropdown type='buttom' isOpen={this.state.unitToggle} toggle={this.handleUnitToggle}>
                                  <DropdownToggle type='button' caret color="secondary">
                                    {FoodInfo.getUnitString(this.state.unit)}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('count')}}>個</DropdownItem>
                                      <DropdownItem type='button' onClick={()=>{this.handleUnit('Taiwanese_kg')}}>台斤</DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>&nbsp;
                          </Col>
                          <Alert color='info' isOpen={this.state.inputQuantityDanger}>請填寫正確數量</Alert>
                          <Alert color='info' isOpen={this.state.inputUnitDanger}>請填寫單位</Alert>
                      </FormGroup>
                      {/* deadline */}
                      <FormGroup row>
                          <InputGroupAddon>有效期限：</InputGroupAddon>
                          <Col sm={10}>
                              <FormGroup>
                                  <Label>
                                    <Input type="radio" name="radio1" defaultChecked onChange={this.handleSetDeadlineOff} />{' '}
                                    關
                                  </Label>
                              </FormGroup>
                              <FormGroup>
                                  <Label>
                                    <Input type="radio" name="radio1" onChange={this.handleSetDeadlineOn}  />{' '}
                                    開
                                  </Label>
                                  <div>{this.state.isSetDeadline ?
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
                                  </div>
                              </FormGroup>
                          </Col>
                      </FormGroup>
                      {/* setAlarm */}
                      <FormGroup row>
                          <InputGroupAddon>提醒：</InputGroupAddon>
                          <Col sm={10}>
                              <FormGroup>
                                  <Label>
                                      <Input type="radio" name="radio2" defaultChecked onChange={this.handleSetAlarmOff}  />{' '}
                                      關
                                  </Label>
                              </FormGroup>
                              <FormGroup >
                                  <Label>
                                    <Input type="radio" name="radio2" onChange={this.handleSetAlarmOn}  />{' '}
                                    開
                                  </Label>
                                  <div>{this.state.isAlarm ?
                                        <div>
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
                                            <TimePicker
                                              showSecond={false}
                                              defaultValue={moment()}
                                              use12Hours
                                              onChange={this.handleAlarmTimeChange}
                                              format = 'h:mm a'

                                            />
                                        </div>
                                      :
                                        <div>
                                            <DatePicker
                                              dateFormat="YYYY/MM/DD"
                                              placeholderText="選擇提醒日期"
                                              selected={this.state.alarmDate}
                                              onChange={this.handleAlarmDateChange}
                                              disabled
                                            />
                                            <TimePicker
                                              showSecond={false}
                                              selected={this.state.alarmDate}
                                              defaultValue={now}
                                              // use24Hours
                                              disabled
                                            />
                                        </div>
                                      }
                                  </div>
                              </FormGroup>
                          </Col>
                      </FormGroup>
                      {/* note */}
                      <FormGroup row>
                          <InputGroupAddon>備註：</InputGroupAddon>
                          <Col sm={10}>
                              <Input className='input' type='textarea' getRef={el => {this.inputNoteEl = el}}
                                 value={this.state.text} onChange={this.handleInputNoteChange}
                                 placeholder="備註..."></Input>
                          </Col>
                      </FormGroup>
                      {/* submit */}
                      <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                          <Button onClick={this.handleFoodInfoSubmit} >Submit</Button>
                        </Col>
                      </FormGroup>
                  </Form>
              </Card>
          </div>
        );
    }

    translateCategoryName(e){

      console.log(this.props.category);
        switch(this.props.category){
            case 'vegetable' : return '蔬菜類';
            case 'meat' : return '肉類';
            case 'seafood' : return '海鮮類';
            default: return this.props.category;
        }
    }

    translateFoodName(foodname){
        switch(foodname){
            case 'pumpkin': return '南瓜';
            default: return foodname;
        }
    }
    handleFoodNameChange(e){
        const texts = e.target.value
        console.log('i am ddsf');
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
        console.log('submit');
        if (!this.props.name) {
            this.setState({inputFoodNameDanger: true});
      //       <Alert color="success">
      //   <strong>Well done!</strong> You successfully read this important alert message.
      // </Alert>
      //       {/* <Alert color='warning' className='loading'>請輸入品名</Alert> */}

            console.log('請輸入');
            return;
        }
        console.log('pass name');

        if(this.state.quantity<=0){
            this.setState({inputQuantityDanger: true});
            // <Alert color='warning' className='loading'>請輸入正確數量</Alert>
            return;
        }
        console.log('pass quantity');
        if(this.state.unit === 'na'){
          this.setState({
              inputUnitDanger: true,
              unitToggle: true
          });
          // <Alert color='warning' className='loading'>請輸入單位</Alert>
          return;
        }
        console.log('pass unit');
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
        // for(var i=0;i<FoodDetail.length;i++){
        //     console.log(i+'  '+FoodDetail[i]);
        // }

        this.props.onPost(this.props.isRefrige,FoodDetail);
    }
}
