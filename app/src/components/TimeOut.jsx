import React from 'react';
import PropTypes from 'prop-types';

// import './TimeOut.css';

export default class FoodInfo extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        isTimeOut: PropTypes.bool,
        isRefrige: PropTypes.bool

    };

    constructor(props) {
        super(props);

        this.state = {

            // text: props.name
        };

        this.handleFoodInfoSubmit = this.handleFoodInfoSubmit.bind(this);
    }

    render() {

        return (
              <Card>
                  <CardBlock>
                    <img src="images/快過期拉_orange.png"></img>
                    setInterval(() => {
                        <img src="images/快過期拉_red.png"></img>
                    }, 600);
                  </CardBlock>
              </Card>
        );
    }


  }
