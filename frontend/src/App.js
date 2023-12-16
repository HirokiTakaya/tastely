
import { useState, useEffect } from 'react';
// import { Link, Outlet} from 'react-router-dom'
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Ownerpage from './components/ownerpage/ownerpage';
import AllKitchens from './components/homepage/allkitchens';
import CreatePlan from './components/createplan/createplan';
import ShowPlan from './components/showplan/showplan';
import ShowSubscribePlan from './components/homepage/subscribeplan';
import ShowCustomerSubscribePlan from './components/homepage/showcustomersubscribeplan';
import Header from './components/homepage/header';
import MyProfile from './components/homepage/myprofile';
import LandingPage from './components/homepage/landingpage';
import UserBar from './components/homepage/userheader';
// import { Footer } from './components/files'

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import Header from './components/homepage/header';

import './App.css';
import DishPage from './components/dishes/DishPage';
import MealPage from './components/meal/MealPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleUserKitchens from './components/homepage/singlekitchenownerplans';
import CustomerOrderConfirmation from './components/orderpage/CustomerOrderConfirmation';
import ViewMealPage from './components/meal/ViewMealPage';
//import Footer from './components/files/footer/Footer';
//import KitchenHeader from './components/homepage/kitchenheader';



const App = () => {
  const [loginUser, setLoginUser] = useState({});
  const [kitchenOwner, setKitchenOwner] = useState();
  const [isActive, setIsActive] = useState(false);

  
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoginUser(user);
    } else {
      setLoginUser(null);
    }
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);



  return (
    <div className="App">
      <Router>
        <Routes>
          {/* akfbakbfa*/}
          <Route
            exact
            path="/"
            element={
              <LandingPage loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            exact
            path="/allkitchens"
            element={
              <AllKitchens
                kitchenOwner={kitchenOwner}
                setKitchenOwner={setKitchenOwner}
                loginUser={loginUser}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route
            exact
            path="/singleuserkitchens/:userid"
            element={
              <SingleUserKitchens
                kitchenOwner={kitchenOwner}
                setKitchenOwner={setKitchenOwner}
                loginUser={loginUser}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route
            exact
            path="/home"
            element={
              <Homepage loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            exact
            path="/owner"
            element={
              <Ownerpage
                loginUser={loginUser}
                setLoginUser={setLoginUser}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            }
          />
          <Route
            exact
            path="/header"
            element={
              <Header loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Register loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route
            exact
            path="/createplan"
            element={
              <CreatePlan loginUser={loginUser} setLoginUser={setLoginUser}  isActive={isActive}
              setIsActive={setIsActive}/>
            }
          />
          <Route
            exact
            path="/showplan"
            element={
              <ShowPlan loginUser={loginUser} setLoginUser={setLoginUser} isActive={isActive}
              setIsActive={setIsActive}/>
            }
          />
          <Route
            exact
            path="/myprofile"
            element={
              <MyProfile loginUser={loginUser} setLoginUser={setLoginUser} isActive={isActive}
              setIsActive={setIsActive}/>
            }
          />
          <Route
            exact
            path="/showsubscribeplans/:userid"
            element={
              <ShowSubscribePlan
                loginUser={loginUser}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route
            exact
            path="/showcustomersubscribeplans"
            element={
              <ShowCustomerSubscribePlan
                loginUser={loginUser}
                setLoginUser={setLoginUser}
                isActive={isActive} setIsActive={setIsActive}
              />
            }
          />
          <Route
            exact
            path="/customerorder/:planid"
            element={<CustomerOrderConfirmation loginUser={loginUser} />}
          />
          <Route
            exact
            path="/setmealpage/:orderid"
            element={<MealPage loginUser={loginUser} />}
          />
          <Route
            exact
            path="/adddishes/"
            element={<DishPage loginUser={loginUser}  isActive={isActive} setIsActive={setIsActive}/>}
          />
          <Route
            exact
            path="/viewmealpage/"
            element={<ViewMealPage loginUser={loginUser} isActive={isActive} setIsActive={setIsActive}/>}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

{/*const { isActive, setIsActive } = props;

className={`${isActive ? 'show-side-bar' : ''} side-menu-bar`}

isActive={isActive} setIsActive={setIsActive} */}
