import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Engineers from './pages/Engineers'
import Companies from './pages/Companies'
import DetailEngineers from './pages/DetailEngineers'
import DetailCompanies from './pages/DetailCompanies'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MyProfile from './pages/MyProfile'
import CompanyProfiles from './pages/CompanyProfiles'
import Landing from './pages/Landing'
import { Provider } from 'react-redux'
import store from './public/redux/store'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
function Main() {
  return (
    <Switch>
      <Route exact path='/engineers' component={Engineers} />
      <Route exact path='/companies' component={Companies} />
      <Route exact path='/' component={Landing} />
      <Route path='/engineers/:id' component={DetailEngineers} />
      <Route path='/companies/:id' component={DetailCompanies} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/myprofile/:id' component={MyProfile} />
      <Route path='/companyprofiles/:id' component={CompanyProfiles} />
    </Switch>
  )
}
function Root() {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  )
}
export default Root
