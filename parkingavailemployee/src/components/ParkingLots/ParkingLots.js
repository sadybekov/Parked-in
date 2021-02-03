import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ParkingLots.css';
import { Redirect } from 'react-router-dom';
import ParkingLot from '../ParkingLot/ParkingLot';

class ParkingLots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            parkingLots : [],
            redirect: null
        }
    }

    componentDidMount(props) {
        // Call /parkingLots, GET, returns array of parking lot objects
        fetch('/parkinglotscouch')
        
            .then(response => response.json())
            .then(parkingLots => {
                this.setState({ parkingLots: parkingLots });
            
            });


        
    }

    redirectToAvailability = (parkingLotId) => {
        console.log('redirectToAvailability', parkingLotId);

        // The is sets parking lot ID in App.js
        this.props.onParkingLotChange(parkingLotId);
        // Changing the value redirect and parkinglot ID  see this state above        
        this.setState({ redirect: "/parkingavailemployee/availability" });
    } 



    render() {

        if (this.state.redirect) {
            console.log('ParkingLots render', this.state.redirect);
            return  <Redirect to={{ pathname: this.state.redirect }}/>
        }

        return (
            <Container fluid style={{backgroundColor: '#D4F1F4'}}>
                {/* Custom Button CSS  */}
                <style type="text/css">
                    {`
                        .btn-flat {
                        background-color: #189AB4;
                        color: white;
                        }

                        .btn-xxl {
                        padding: 1rem 1.5rem;
                        font-size: 1.5rem;
                        }
                    `}
                </style>
                
                <Row >
                    <Col xs ={8} md={4} lg={4} className = "mt-2 ml-3" >
                        <Row>
                            <Col className= "mt-2 mb-2" lg={12}>
                                <div className = "welcomeMessage">Welcome {this.props.userName}!</div>
                            </Col>
                        </Row>

                        {
                            this.state.parkingLots.map((parkingLot, i) => {
                                return (
                                    <ParkingLot                
                                        _id={parkingLot._id}
                                        name={parkingLot.name}  
                                        redirectToAvailability = {this.redirectToAvailability}
                                        key={parkingLot._id}           
                                        />
                                    );
                            })
                        }
 
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ParkingLots;