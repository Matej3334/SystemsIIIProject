import { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router';
import App from './App';
import Login from './components/form/Login'
import Registration from './components/form/Registration'
import Home from './components/home/Home';
import BuildingList from './components/lists/BuildingList.js'
import Reserve from './components/form/Reserve'
import ProfileCard from './components/profile/ProfileCard'
import MyReservation from './components/profile/MyReservation'
import Rating from './components/lists/Rating'


class AppRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Registration/>} />
                    <Route path="/" index={true} element={<Login/>} />
                    <Route path="/Home" element={<App/>}>
                        <Route index={true} element={<BuildingList/>} />
                        <Route path="/Home/map" element={<Home/>}/>
                        <Route path="/Home/reserve/:id" element={<Reserve/>} />
                        <Route path="/Home/profile" element={<ProfileCard/>}/>
                        <Route path="/Home/res" element={<MyReservation/>}/>
                        <Route path="/Home/rating/:id" element={<Rating/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;