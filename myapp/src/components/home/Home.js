import React, { Component } from 'react';
import Form from '../form/Login';

class Home extends Component{
    componentDidMount(){
    }

    render(){
        return(
        <div className="content-container">
            <div className="main-content">
                <Form></Form>
            </div>
        </div>
    );
  }
}

export default Home;