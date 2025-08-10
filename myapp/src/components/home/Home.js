import React, { Component } from 'react';
import Maps from "../map/Maps"
//import '../maps/Map.css';

class Home extends Component{
    render(){
        return(
        <div className="content-container">
            <div className="main-content">
                <Maps></Maps>
            </div>
        </div>
    );
  }
}

export default Home;