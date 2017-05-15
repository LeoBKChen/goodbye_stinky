import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {
    Card,
    CardImg,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    Button,
    Tooltip
} from 'reactstrap';
import moment from 'moment';
import {getfoodIcon} from 'utilities/food.js';

import RefrigeList from 'components/RefrigeList.jsx';

import './Refrige.css';

export default class Refrige extends React.Component {
    static propTypes = {
        editFoodInfo: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            tooltipOpenRefrige: false,
            tooltipOpen2: false,
            tooltipOpen3: false,
            tooltipOpen4: false,
            tooltipOpen5: false,
            tooltipOpen6: false,
            tooltipOpen7: false
            // tooltipOpen8: false
        };

        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleTooltipToggleVeg = this.handleTooltipToggleVeg.bind(this);
        this.handleTooltipToggleMeat = this.handleTooltipToggleMeat.bind(this);
        this.handleTooltipToggleSea = this.handleTooltipToggleSea.bind(this);
        this.handleTooltipToggleFruit = this.handleTooltipToggleFruit.bind(this);
        this.handleTooltipToggleEgg = this.handleTooltipToggleEgg.bind(this);
        this.handleTooltipToggleSau = this.handleTooltipToggleSau.bind(this);
        // this.handleTooltipToggle8 = this.handleTooltipToggle8.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.foodInfoEdit = this.foodInfoEdit.bind(this);

    }
    componentDidMount() {
        var tooltip1 = document.getElementById('addItem');
        var tooltip2 = document.getElementById('vegTooltip');
        var tooltip3 = document.getElementById('meatTooltip');
        var tooltip4 = document.getElementById('seafoodTootip');
        var tooltip5 = document.getElementById('fruitTootip');
        var tooltip6 = document.getElementById('eggMilkTootip');
        var tooltip7 = document.getElementById('sauceTootip');

        if(tooltip1){tooltip1.addEventListener('mouseover',this.handleTooltipToggle);}
        if(tooltip2){tooltip2.addEventListener('mouseover',this.onMouseOverTooltip);}
        if(tooltip3){tooltip3.addEventListener('mouseover',this.onMouseOverTooltip);}
        if(tooltip4){tooltip4.addEventListener('mouseover',this.onMouseOverTooltip);}
        if(tooltip5){tooltip5.addEventListener('mouseover',this.onMouseOverTooltip);}
        if(tooltip6){tooltip6.addEventListener('mouseover',this.onMouseOverTooltip);}
        if(tooltip7){tooltip7.addEventListener('mouseover',this.onMouseOverTooltip);}
      }
    render() {

        return (
            <div className='refrige'>
                <Card className="refrigeSize">
                    <div>
                        <h1 className='text-center' >Refrige</h1>
                        <RefrigeList TimeOut={this.timeOut} refrigePosts={this.props.refrigePosts}/>
                        <div className='vote-plus'>
                          <Button id='addItemRef' color="success"><i className="fa fa-plus"></i></Button>
                        </div>
                        <div className='第一' >
                            <Tooltip placement='top' isOpen={this.state.tooltipOpenRefrige} autohide={false} target='addItemRef' toggle={this.handleTooltipToggle}>
                                <img id='vegTooltip'    src={getfoodIcon("蔬菜")}      className='蔬菜'      onClick={this.handleTooltipToggleVeg}/>&nbsp;
                                <img id='meatTooltip'   src={getfoodIcon("肉類")}      className='肉類'     onClick={this.handleTooltipToggleMeat}/>&nbsp;
                                <img id='seafoodTootip' src={getfoodIcon("海鮮")}      className='海鮮'  onClick={this.handleTooltipToggleSea}/>
                                <img id='fruitTootip'   src={getfoodIcon("水果")}      className='水果'    onClick={this.handleTooltipToggleFruit}/>&nbsp;
                                <img id='eggMilkTootip' src={getfoodIcon("蛋/乳製品")} className='蛋奶'  onClick={this.handleTooltipToggleEgg}/>&nbsp;
                                <img id='sauceTootip'   src={getfoodIcon("調味料")}    className='調味料'    onClick={this.handleTooltipToggleSau}/>
                                <img id='熟食Tooltip'   src={getfoodIcon("熟食")}  className='熟食' onClick={() => this.handleCreate("熟食","熟食")}/>
                                <div className='d-flex flex-column' >
                                    <Tooltip placement='top' isOpen={this.state.tooltipOpen2} autohide={false} target='meatTooltip' toggle={this.handleTooltipToggleVeg}>
                                        <img className='蔬菜' src={getfoodIcon("高麗菜")} onClick={() => this.handleCreate("蔬菜","高麗菜")} />&nbsp;
                                        <img className='蔬菜' src={getfoodIcon("紅蘿蔔")} onClick={() => this.handleCreate("蔬菜","紅蘿蔔")}   />&nbsp;
                                        <img className='蔬菜' src={getfoodIcon("花椰菜")} onClick={() => this.handleCreate("蔬菜","花椰菜")} />
                                        <img className='蔬菜' src={getfoodIcon("茄子")}   onClick={() => this.handleCreate("蔬菜","茄子")} />&nbsp;
                                        <img className='蔬菜' src={getfoodIcon("辣椒")}   onClick={() => this.handleCreate("蔬菜","辣椒")} />&nbsp;
                                        <img className='蔬菜' src={getfoodIcon("玉米")}   onClick={() => this.handleCreate("蔬菜","玉米")} />
                                    </Tooltip>
                                </div>
                                <div className='d-flex flex-column' >
                                    <Tooltip placement='top' isOpen={this.state.tooltipOpen3} autohide={false} target='meatTooltip' toggle={this.handleTooltipToggleMeat}>
                                        <img className='肉類' src={getfoodIcon("雞肉")} onClick={() => this.handleCreate("肉類","雞肉")} />&nbsp;
                                        <img className='肉類' src={getfoodIcon("培根")} onClick={() => this.handleCreate("肉類","培根")}   />&nbsp;
                                        <img className='肉類' src={getfoodIcon("牛肉")} onClick={() => this.handleCreate("肉類","牛肉")} />
                                    </Tooltip>
                                </div>
                                <div className='d-flex flex-column'>
                                    <Tooltip placement='top' isOpen={this.state.tooltipOpen4} autohide={false} target='meatTooltip' toggle={this.handleTooltipToggleSea}>
                                        <img className='海鮮' src={getfoodIcon("螃蟹")} onClick={() => this.handleCreate("海鮮","螃蟹")} />&nbsp;
                                        <img className='海鮮' src={getfoodIcon("龍蝦")} onClick={() => this.handleCreate("海鮮","龍蝦")}   />&nbsp;
                                        <img className='海鮮' src={getfoodIcon("蝦子")} onClick={() => this.handleCreate("海鮮","蝦子")} />
                                        <img className='海鮮' src={getfoodIcon("魚")}   onClick={() => this.handleCreate("海鮮","魚")} />&nbsp;
                                        <img className='海鮮' src={getfoodIcon("章魚")} onClick={() => this.handleCreate("海鮮","章魚")} />&nbsp;
                                        <img className='海鮮' src={getfoodIcon("蛤蜊")} onClick={() => this.handleCreate("海鮮","蛤蜊")} />
                                    </Tooltip>
                                </div>
                                <div className='d-flex flex-column'>
                                    <Tooltip placement='top' isOpen={this.state.tooltipOpen5} autohide={false} target='meatTooltip' toggle={this.handleTooltipToggleFruit}>
                                        <img className='水果' src={getfoodIcon("草莓")} onClick={() => this.handleCreate("水果","草莓")} />&nbsp;
                                        <img className='水果' src={getfoodIcon("橘子")} onClick={() => this.handleCreate("水果","橘子")}/>&nbsp;
                                        <img className='水果' src={getfoodIcon("蘋果")} onClick={() => this.handleCreate("水果","蘋果")}/>
                                        <img className='水果' src={getfoodIcon("葡萄")} onClick={() => this.handleCreate("水果","葡萄")}/>&nbsp;
                                        <img className='水果' src={getfoodIcon("西瓜")} onClick={() => this.handleCreate("水果","西瓜")}/>&nbsp;
                                        <img className='水果' src={getfoodIcon("香蕉")} onClick={() => this.handleCreate("水果","香蕉")}/>
                                    </Tooltip>
                                </div>
                                <div className='d-flex flex-column'>
                                    <Tooltip placement='top' isOpen={this.state.tooltipOpen6} autohide={false} target='meatTooltip' toggle={this.handleTooltipToggleEgg}>
                                        <img className='蛋奶' src={getfoodIcon("蛋")}   onClick={() => this.handleCreate("蛋/乳製品","蛋")} />&nbsp;
                                        <img className='蛋奶' src={getfoodIcon("牛奶")} onClick={() => this.handleCreate("蛋/乳製品","牛奶")}   />&nbsp;
                                        <img className='蛋奶' src={getfoodIcon("起司")} onClick={() => this.handleCreate("蛋/乳製品","起司")} />
                                    </Tooltip>
                                </div>
                                <div className='d-flex flex-column'>
                                    <Tooltip placement='top' isOpen={this.state.tooltipOpen7} autohide={false} target='meatTooltip' toggle={this.handleTooltipToggleSau}>
                                        <img className='調味料' src={getfoodIcon("番茄醬")} onClick={() => this.handleCreate("調味料","番茄醬")} />&nbsp;
                                        <img className='調味料' src={getfoodIcon("果醬")}   onClick={() => this.handleCreate("調味料","果醬")}   />&nbsp;
                                        <img className='調味料' src={getfoodIcon("辣椒醬")} onClick={() => this.handleCreate("調味料","辣椒醬")} />
                                    </Tooltip>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }


     handleTooltipToggle() {
        // console.log("toggle All");
        if(!(this.state.tooltipOpen2  || this.state.tooltipOpen3 || this.state.tooltipOpen4 ||
            this.state.tooltipOpen5 || this.state.tooltipOpen6 || this.state.tooltipOpen7)){
            this.setState((prevState, props) => ({
                tooltipOpenRefrige: !prevState.tooltipOpenRefrige
            }));
        }
    }

    handleTooltipToggleVeg() {
        this.setState((prevState, props) => ({
            tooltipOpen2: !prevState.tooltipOpen2,
            tooltipOpen3: false,
            tooltipOpen4: false,
            tooltipOpen5: false,
            tooltipOpen6: false,
            tooltipOpen7: false
        }));
    }

    handleTooltipToggleMeat() {
        this.setState((prevState, props) => ({
            tooltipOpen2: false,
            tooltipOpen3: !prevState.tooltipOpen3,
            tooltipOpen4: false,
            tooltipOpen5: false,
            tooltipOpen6: false,
            tooltipOpen7: false
        }));
    }

    handleTooltipToggleSea() {
        this.setState((prevState, props) => ({
            tooltipOpen2: false,
            tooltipOpen3: false,
            tooltipOpen4: !prevState.tooltipOpen4,
            tooltipOpen5: false,
            tooltipOpen6: false,
            tooltipOpen7: false
        }));
    }
    handleTooltipToggleFruit() {
        console.log("toggleSau");
        this.setState((prevState, props) => ({
            tooltipOpen2: false,
            tooltipOpen3: false,
            tooltipOpen4: false,
            tooltipOpen5: !prevState.tooltipOpen5,
            tooltipOpen6: false,
            tooltipOpen7: false
        }));
    }
    handleTooltipToggleEgg() {
        console.log("EggSau");
        this.setState((prevState, props) => ({
            tooltipOpen2: false,
            tooltipOpen3: false,
            tooltipOpen4: false,
            tooltipOpen5: false,
            tooltipOpen6: !prevState.tooltipOpen6,
            tooltipOpen7: false
        }));
    }
    handleTooltipToggleSau() {
        console.log("toggleSau");
        this.setState((prevState, props) => ({
            tooltipOpen2: false,
            tooltipOpen3: false,
            tooltipOpen4: false,
            tooltipOpen5: false,
            tooltipOpen6: false,
            tooltipOpen7: !prevState.tooltipOpen7
        }));
    }
    // handleTooltipToggle8() {
    //     this.setState((prevState, props) => ({
    //         tooltipOpen8: !prevState.tooltipOpen4
    //     }));
    // }
    handleCreate(category, name){
        console.log("creating");
        this.setState({
            tooltipOpenRefrige : false,
            tooltipOpen2: false,
            tooltipOpen3: false,
            tooltipOpen4: false,
            tooltipOpen5: false,
            tooltipOpen6: false,
            tooltipOpen7: false
            // tooltipOpen8: false
        });
        this.props.goFoodInfo(category, name);
    }

    foodInfoEdit(isRefrige,id,FoodDetail){
        this.props.editFoodInfo(isRefrige,id,FoodDetail);
    }
    timeOut(id,name){
        this.props.timeOut(id,name);
    }
}
