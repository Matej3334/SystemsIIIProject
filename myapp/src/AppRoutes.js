import { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router';
import App from './App';
import Login from './components/form/Login'
import Registration from './components/form/Registration'
import Home from './components/home/Home';
import BuildingList from './components/lists/BuildingList.js'


class AppRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/" index={true}  element={<Login />} />
                    <Route path="/Home" element={<App/>}>
                        <Route index={true} element={<BuildingList/>} />
                        <Route path="h" element={<Home/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;