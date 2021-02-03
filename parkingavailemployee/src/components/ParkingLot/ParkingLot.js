import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';


const ParkingLot = ({ _id, name, redirectToAvailability }) => {
        return(
            <Row className="mt-2 mb-3">              
                    <Button variant="flat" 
                        block  
                        size="xxl" 
                        onClick={() => redirectToAvailability(_id)} >{name}
                    </Button>
            </Row> 
        );
}

export default ParkingLot;