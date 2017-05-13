import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem,
    Card,
    CardBlock,
    CardTitle
} from 'reactstrap';

import PostItem from 'components/PostItem.jsx';
import {createVote} from 'api/posts.js';

import './PostList.css';

export default class PostList extends React.Component {
    static propTypes = {
        posts: PropTypes.array,
        filter: PropTypes.string,
        onEdit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    render() {
        const {freezerlist} = this.props;

        let children = (
          <Card>
              <CardBlock>
                  <img></img>
              </CardBlock>
              <CardTitle>Go Get Food</CardTitle>
          </Card>
            // <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
            //     <div className='empty-text'>No food here.<br />Go add some foods!</div>
            // </ListGroupItem>
        );
        if (freezerlist.length) {
            children = freezerlist.map(p => (
              <Card key={p.id} action onClick={this.handleEdit}>
                  <CardBlock >
                      <img></img>
                  </CardBlock>
                  <CardTitle >{p.name}</CardTitle>
              </Card>
                // <ListGroupItem key={p.id} action>
                //     <PostItem {...p} onVote={this.handleVote} />
                // </ListGroupItem>
            ));
        }

        return (
            <div className='freezerlist'>
                <div>{children}</div>
            </div>
        );
    }

    // handleVote(id, mood) {
    //     this.props.onVote(id, mood);
    // }
    handleEdit(id,FoodDetail){
        this.props.onEdit(id,FoodDetail,isRefrige);
    }
}
