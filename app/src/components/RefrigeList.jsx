import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem,
    Card,
    CardBlock,
    CardTitle
} from 'reactstrap';


import {getfoodIcon} from 'utilities/food.js';
import RefrigeItem from 'components/RefrigeItem.jsx';
import {onEdit,timeOut} from 'components/Refrige.jsx';
import './RefrigeList.css';

export default class RefrigeList extends React.Component {
    static propTypes = {
        isRefrige: PropTypes.bool,
        posts: PropTypes.array,
        filter: PropTypes.string,
        onEdit: PropTypes.func,
        refrigePosts: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.timeOut = this.timeOut.bind(this);
    }

    render() {
        const {posts} = this.props;

        let children = (
          <div className="inline">
              <Card className="內部">
                  <div>
                      <CardBlock>
                          <div>
                              <i className="fa fa-question-circle fa-3x"></i>
                          </div>
                      </CardBlock>
                      <CardTitle className="fontSize">快新增吧</CardTitle>
                  </div>
              </Card>
          </div>
        );
        if (this.props.refrigePosts.length) {
            console.log("show ref items");
            console.log(this.props.refrigePosts);
            children = this.props.refrigePosts.map(p => (
              <div className="inline"  key={p.id}>
                  <Card action className="內部Ref">
                      <RefrigeItem  {...p}  isRefrige={this.props.isRefrige} handleEdit={this.handleEdit} timeOut={this.timeOut}/>
                  </Card>
            </div>
            ));
        }

        return (
            <div className='refrigelist'>
                <div className="container-fluid child">
                    <div  className="inlineRef">{children}</div>
                </div>
            </div>
        );
    }

    handleEdit(isRefrige,id,FoodDetail){
        this.props.onEdit(isRefrige, id, FoodDetail);
    }
    timeOut(FoodDetail){
        this.props.timeOut(FoodDetail);
    }
}
