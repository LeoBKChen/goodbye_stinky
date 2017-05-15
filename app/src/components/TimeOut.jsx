import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    CardBlock,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
// import './TimeOut.css';
var t;
export default class Timeout extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        isTimeOut: PropTypes.bool,
        isRefrige: PropTypes.bool

    };

    constructor(props) {
        super(props);

        this.state = {
            change: false
        };

        this.backToRef = this.backToRef.bind(this);
        this.ToggleImage = this.ToggleImage.bind(this);
        t = setInterval(this.ToggleImage,300);
    }

    render() {
        return (
            <div >
            { this.state.change   ?
                <img src="images/快過期啦_orange.png" className="warnImg"></img>
                :
                <img src="images/快過期啦_red.png" className="warnImg"></img>
            }
                <div className='提醒字內容'>
                    <div className="字">
                        你的{this.props.name}快過期啦！
                    </div>
                    <div className="按鈕">
                        <Button  onClick={this.backToRef}>我知道了！</Button>
                    </div>
                </div>
            </div>
        );
    }
    ToggleImage() {
        this.setState((prevState, props) => ({
            change: !prevState.change
        }));
    }
    backToRef(){

        clearInterval(t);
        this.props.knewTimeUp();
    }    
}
