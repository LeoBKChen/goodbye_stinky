import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {
    Button
} from 'reactstrap';
// import WeatherDisplay from 'components/WeatherDisplay.jsx';
// import WeatherForm from 'components/WeatherForm.jsx';
// import PostForm from 'components/PostForm.jsx';
// import PostList from 'components/PostList.jsx';
// import {getWeather, cancelWeather} from 'api/open-weather-map.js';
// import {listPosts, createPost, createVote} from 'api/posts.js';
import RefrigeItem from 'components/RefrigeItem.jsx';

import './RefrigeList.css';

export default class RefrigeList extends React.Component {
    static propTypes = {
        // unit: PropTypes.string,
        // searchText: PropTypes.string,
        // onUnitChange: PropTypes.func
    };

    // static getInitWeatherState() {
    //     return {
    //         city: 'na',
    //         code: -1,
    //         group: 'na',
    //         description: 'N/A',
    //         temp: NaN
    //     };
    // }

    constructor(props) {
        super(props);

        this.state = {
            // ...Today.getInitWeatherState(),
            // weatherLoading: false,
            // masking: false,
            // postLoading: false,
            // posts: []
        };

        // this.handleWeatherQuery = this.handleWeatherQuery.bind(this);
        // this.handleCreatePost = this.handleCreatePost.bind(this);
        // this.handleCreateVote = this.handleCreateVote.bind(this);
    }

    // componentDidMount() {
    //     this.getWeather('Hsinchu', this.props.unit);
    //     this.listPosts(this.props.searchText);
    // }
    //
    // componentWillUnmount() {
    //     if (this.state.weatherLoading) {
    //         cancelWeather();
    //     }
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.searchText !== this.props.searchText) {
    //         this.listPosts(nextProps.searchText);
    //     }
    // }

    render() {
        // const {unit} = this.props;
        // const {group, city, masking, posts, postLoading} = this.state;
        //
        // document.body.className = `weather-bg ${group}`;
        // document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='refrigelist'>
                <div className='weather'>
                    <h2 className='text-center'>RefrigeList</h2>
                    <RefrigeItem />

                </div>

            </div>
        );
    }

    // getWeather(city, unit) {
    //     this.setState({
    //         weatherLoading: true,
    //         masking: true,
    //         city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
    //     }, () => { // called back after setState completes
    //         getWeather(city, unit).then(weather => {
    //             this.setState({
    //                 ...weather,
    //                 weatherLoading: false
    //             }, () => this.notifyUnitChange(unit));
    //         }).catch(err => {
    //             console.error('Error getting weather', err);
    //
    //             this.setState({
    //                 ...Today.getInitWeatherState(unit),
    //                 weatherLoading: false
    //             }, () => this.notifyUnitChange(unit));
    //         });
    //     });
    //
    //     setTimeout(() => {
    //         this.setState({
    //             masking: false
    //         });
    //     }, 600);
    //}

    // listPosts(searchText) {
    //     this.setState({
    //         postLoading: true
    //     }, () => {
    //         listPosts(searchText).then(posts => {
    //             this.setState({
    //                 posts,
    //                 postLoading: false
    //             });
    //         }).catch(err => {
    //             console.error('Error listing posts', err);
    //
    //             this.setState({
    //                 posts: [],
    //                 postLoading: false
    //             });
    //         });
    //     });
    // }
    //
    // handleWeatherQuery(city, unit) {
    //     this.getWeather(city, unit);
    // }
    //
    // notifyUnitChange(unit) {
    //     if (this.props.units !== unit) {
    //         this.props.onUnitChange(unit);
    //     }
    // }
    //
    // handleCreatePost(mood, text) {
    //     createPost(mood, text).then(() => {
    //         this.listPosts(this.props.searchText);
    //     }).catch(err => {
    //         console.error('Error creating posts', err);
    //     });
    // }
    //
    // handleCreateVote(id, mood) {
    //     createVote(id, mood).then(() => {
    //         this.listPosts(this.props.searchText);
    //     }).catch(err => {
    //         console.error('Error creating vote', err);
    //     });
    // }
}
