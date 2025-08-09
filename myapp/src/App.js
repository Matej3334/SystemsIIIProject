import './App.css';
import React, { Component } from 'react';
import TabContainer from './components/tab-navigator/TabContainer';
import {Outlet} from 'react-router';

class App extends Component{
    render(){
    return(
        <TabContainer>
            <h1>Page Content</h1>
            <Outlet/>
        </TabContainer>
    );
  }
}
export default App;