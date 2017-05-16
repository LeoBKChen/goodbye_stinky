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
import FreezerItem from 'components/FreezerItem.jsx';
import {onEdit,timeOut} from 'components/Freezer.jsx';
import './FreezerList.css';

export default class FreezerList extends React.Component {
    static propTypes = {
        isRefrige: PropTypes.bool,
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
        this.timeOut = this.timeOut.bind(this);

    }

    render() {
        const {posts} = this.props;

        let children = (
            <div className="container-fluid child">
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
            </div>
        );

        if (this.props.freezerPosts.length) {
            // console.log("in freezer list");
            // console.log(this.props.freezerPosts);
            children = this.props.freezerPosts.map(p => (
                <div className="inline" key={p.id}>
                    <Card  action className="內部" style={{backgroundColor:`${this.cardColor(p.category)}`}}>
                        <FreezerItem  {...p} isRefrige={this.props.isRefrige} handleEdit={this.handleEdit} timeOut={this.timeOut}/>
                    </Card>
                </div>
            ));
        }

        return (
            <div className="container-fluid child">
                <div className="inline">{children}</div>
            </div>
        );
    }

    handleEdit(isRefrige,id,FoodDetail){
        this.props.onEdit(isRefrige,id,FoodDetail);
    }
    timeOut(FoodDetail){
        this.props.timeOut(FoodDetail);
    }
    cardColor(category){
        switch (category) {
          case '蔬菜':
            return "#ffa";
          case '肉類':
            return "#FFBB77";
          case '海鮮':
            return "#abcfff";
          case '水果':
            return "#A6FFA6";
          case '蛋/乳製品':
            return "#aaf"
          case '調味料':
            return "#ffb3c9";
          case '熟食':
            return "#dab8fc";

          default:
            return "#fff";
        }
    }
}
