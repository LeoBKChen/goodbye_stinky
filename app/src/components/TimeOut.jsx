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

        this.ToggleImage = this.ToggleImage.bind(this);
        setInterval(this.ToggleImage,300);
    }

    render() {
        return (
              <Card>
                  <CardBlock>
                    { this.state.change   ?
                        <img src="images/快過期啦_orange.png"></img>
                        :
                        <img src="images/快過期啦_red.png"></img>
                    }
                  </CardBlock>
              </Card>
        );
    }
    ToggleImage() {
        this.setState((prevState, props) => ({
            change: !prevState.change
        }));
    }
}
