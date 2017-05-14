import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem,
    Card,
    CardBlock,
    CardTitle
} from 'reactstrap';

import {createVote} from 'api/posts.js';
import {getFoodIcon} from 'utilities/food.js';
import {onEdit,timeOut} from 'components/Freezer.jsx';

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
        this.getIcon = this.getIcon.bind(this);
    }

    render() {
        const {posts} = this.props;

        let children = (
          <Card>
              <CardBlock>
                  <i className="fa fa-question-circle"></i>
              </CardBlock>
              <CardTitle>Go Get Food</CardTitle>
          </Card>
            // <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
            //     <div className='empty-text'>No food here.<br />Go add some foods!</div>
            // </ListGroupItem>
        );
        if (posts.length) {
            children = posts.map(p => (
              <Card key={p.id} action onClick={this.handleEdit}>
                  <FreezerItem  {...p} Edit={this.handleEdit} timeOut={this.timeOut}/>
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
    handleEdit(id,FoodDetail,isRefrige){
        this.props.onEdit(id,FoodDetail,isRefrige);
    }
    timeOut(id,name){
        this.props.timeOut(id,name);
    }
}
