import React, { Component } from 'react';

import News from './News';
import Navbar from './Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
    pageSize = 20;
    apiKey = process.env.REACT_APP_NEWS_API_KEY; 
    state = {
        progress : 0
    }

    setProgress = (progress) => {
        this.setState({progress : progress})
    }

    render() {
        return (
            <div>
                <Router>
                    <LoadingBar
                        height={3}
                        shadow='true'
                        color='#ec403c'
                        progress={this.state.progress}
                    />
                    {/* <Support />  */}
                    <Navbar />
                    <Switch>
                        <Route exact path="/"><News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
                        <Route exact path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" /></Route>
                        <Route exact path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" /></Route>
                        <Route exact path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" /></Route>
                        <Route exact path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" /></Route>
                        <Route exact path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" /></Route>
                        <Route exact path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" /></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}