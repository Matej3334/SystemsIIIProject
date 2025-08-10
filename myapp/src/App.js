import './App.css';
import React, { Component } from 'react';
import TabContainer from './components/tab-navigator/TabContainer';
import {Outlet} from 'react-router';

class App extends Component{
    render(){
    return(
        <TabContainer>
            <Outlet/>
        </TabContainer>
    );
  }
}
export default App;