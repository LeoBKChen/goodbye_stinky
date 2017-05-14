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
import FreezerItem from 'components/FreezerItem.jsx';
import {onEdit,timeOut} from 'components/Freezer.jsx';
import './FreezerList.css';

export default class FreezerList extends React.Component {
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
              <CardTitle>快新增吧</CardTitle>
          </Card>
            // <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
            //     <div className='empty-text'>No food here.<br />Go add some foods!</div>
            // </ListGroupItem>
        );
        if (this.props.freezerPosts.length) {
            children = this.props.freezerPosts.map(p => (
              <Card key={p.id} action onClick={this.handleEdit}>
                  <FreezerItem  {...p} handleEdit={this.handleEdit} timeOut={this.timeOut}/>
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
