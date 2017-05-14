import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem,
    Card,
    CardBlock,
    CardTitle
} from 'reactstrap';


import {getFoodIcon} from 'utilities/food.js';
import RefrigeItem from 'components/RefrigeItem.jsx';
import {onEdit,timeOut} from 'components/Refrige.jsx';
import './RefrigeList.css';

export default class RefrigeList extends React.Component {
    static propTypes = {
        posts: PropTypes.array,
        filter: PropTypes.string,
        onEdit: PropTypes.func,
        freezerPosts: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleEdit = this.handleEdit.bind(this);

    }

    render() {
        const {posts} = this.props;

        let children = (
          <Card>
              <CardBlock>
                  <i className="fa fa-question-circle fa-4x"></i>
              </CardBlock>
              <CardTitle>Go Get Food</CardTitle>
          </Card>
            // <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
            //     <div className='empty-text'>No food here.<br />Go add some foods!</div>
            // </ListGroupItem>
        );
        if (this.props.refrigePosts.length) {
            children = this.props.refrigePosts.map(p => (
              <Card key={p.id} action onClick={this.handleEdit}>
                  <RefrigeItem  {...p}  isRefrige={this.props.isRefrige} handleEdit={this.handleEdit} timeOut={this.timeOut}/>
              </Card>
            ));
        }

        return (
            <div className='refrigelist'>
                <div>{children}</div>
            </div>
        );
    }

    // handleVote(id, mood) {
    //     this.props.onVote(id, mood);
    // }
    handleEdit(isRefrige,id,FoodDetail){
        this.props.onEdit(isRefrige, id, FoodDetail);
    }
    timeOut(id,name){
        this.props.timeOut(id,name);
    }
}
