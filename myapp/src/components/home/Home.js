import React, { Component } from 'react';


class Home extends Component{
  
    constructor(props){
        super(props);
        this.state = {
            lessons: []
        };
    }  
    componentDidMount(){
    }

    render(){
    return(
        <div className="content-container">
        <div className="main-content">
            <h1 className="header-text">
                Welcome back to &lt;HTML/&gt;
            </h1>
            <div className="sub-heading-container">
                <p>
                    <span className="sub-heading">
                        Let's brush up our html, js and css knowledge
                    </span>
                </p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns:'auto auto auto auto', rowGap:'5%'}}>
            </div>
        </div>
    </div>
    );
  }
}

export default Home;