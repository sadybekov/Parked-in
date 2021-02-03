
import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Availability from './components/Availability/Availability'
import ParkingLots from './components/ParkingLots/ParkingLots'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import SignIn from './components/SignIn/SignIn'

class App extends Component {
  constructor() {
    super();
    this.state = {
      parkingLotId: '',
      isSignedIn: false,
      user: {
        _id: '',
        name: '',
        email: ''
      },
      refreshData: 0
    }
  }

  componentDidMount()
  {
    document.body.style = 'background: #75E6DA;';
  }

  onParkingLotChange = (parkingLotId) => {
    console.log('onParkingLotChange', parkingLotId);
    this.setState({parkingLotId: parkingLotId});
  }

  setSignIn = (isSignedIn) => {
    // window.localStorage.setItem('isSignedIn',isSignedIn)
    this.setState({isSignedIn: isSignedIn });
  }

  logout = () => {
    // window.localStorage.removeItem('isSignedIn')
    this.setState({isSignedIn: false });
  }

  loadUser = (user) => {
    this.setState({user: user});
  }

  render() {
    return (
      <React.Fragment>
         <Router >
          
          <Navigation isSignedIn = {this.state.isSignedIn} logout={ this.logout }/>
               
                   
          <Switch>

            <Route exact path="/parkingavailemployee" 
              render={props => 
                (<SignIn {...props} 
                  setSignIn= {this.setSignIn} 
                  loadUser = {this.loadUser} />)}/>

              <Route path="/parkingavailemployee/parkinglots" 
                render={props => 
                 this.state.isSignedIn? 
                  <ParkingLots {...props}
                  onParkingLotChange = {this.onParkingLotChange}
                  userName = {this.state.user.name} /> :
                  <Redirect to={{ pathname: '/parkingavailemployee' }} />}/> 

              <Route path="/parkingavailemployee/availability" 
                render={props => 
                  this.state.parkingLotId !=='' && this.state.isSignedIn ? 
                  <Availability {...props} parkingLotId = {this.state.parkingLotId} />:
                  <Redirect to={{ pathname: '/parkingavailemployee/parkinglots' }} />
                }/>
          </Switch>
        </Router>
      </React.Fragment>            
       
    );
  }
}

export default App;
