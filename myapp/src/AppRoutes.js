import { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router';
import App from './App';
import Home from './components/home/Home';


class AppRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index={true} element={<Home/>}/>

                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;