import './Override.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

class Override extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSaveConfirmation: false,
            showResetConfirmation: false
        }
    }
   
    componentDidMount() {
    }

    openSaveConfirmation = () => {
        this.setState({ showSaveConfirmation: true });
    }

    closeSaveConfirmation = () => this.setState({ showSaveConfirmation: false });
    
    onSaveChanges = (values) => {
        this.props.setStateValueForOverrideFieldFromValues (values);
        this.props.saveParkingLotChanges();
        this.closeSaveConfirmation();
    }

    openResetConfirmation = () => {
        this.setState({ showResetConfirmation: true });
    }

    closeResetConfirmation = () => this.setState({ showResetConfirmation: false });

    resetToDefault = (values, errors, isValid) => {
        this.props.resetParkingLot(values, errors, isValid);
        this.closeResetConfirmation();       
    }

    validateFields = (event, errors) => {
        if (errors.capacity || errors.numAvailableSpots || errors.numOccupiedSpots) {
            this.setState ({validationMessage:'One or more fields are invalid'}); 
        } else {
            this.setState ({validationMessage:''}); 
            if (event.target.id === 'saveButton') {
                this.openSaveConfirmation ();
            }else { 
                this.openResetConfirmation ();
            }            
        }          
    }
      
    render() {
               
        const {
                handleSubmit,
                submitForm,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            } = this.props;    

            console.log('overRideRender',values,this.props );
       return(

                        
       
        <Row ref={this.wrapper}>

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

            <Col>

                <Row>
                    <Col className= "mt-0" lg={12}>
                        <div className = "validationMessage">{errors.capacity || errors.numAvailableSpots || errors.numOccupiedSpots? this.state.validationMessage : ''}</div>
                    </Col>
                </Row>  

                <Row className='mb-2'>
                    <Col xs ={12} md={12} lg={2}><Form.Label htmlFor='capacity' className ='ml-2 mt-3'>Capacity:</Form.Label></Col>
                    <Col xs ={9} md={7} lg={5}>
                        <div className='d-flex'>
                            {/* <input id='capacity' 
                                className='' 
                                type="text" 
                                name="capacity" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('capacity')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('capacity')}
                                value = {this.props.capacity}
                                onChange={ this.props.setStateValueForOverrideField.bind(this)}/> */}
                        <Form.Group controlId="formCapacity">
                            <Form.Control id='capacity' 
                                className='mt-3' 
                                type="text" 
                                size="lg" 
                                name="capacity" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('capacity')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('capacity')}
                                value = {values.capacity}
                                onChange={(event) => {
                                // this.props.setStateValueForOverrideField(event);
                                handleChange(event)}}
                                isInvalid={!!errors.capacity}/>                   
                            <Form.Control.Feedback type="invalid">
                                        {errors.capacity}
                            </Form.Control.Feedback>
                        </Form.Group>    
                            
                            <Button variant="flat" 
                                size="lg" 
                                className ='ml-2' 
                                onClick={ () => this.props.engageOverride('capacity', values, errors, isValid)} 
                                style= {{backgroundColor: this.props.getOverrideButtonColor('capacity')}}>Override</Button>
                        </div>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col xs ={12} md={12} lg={2}><Form.Label htmlFor='numAvailableSpots'className ='ml-2 mt-3'>Number of Available Spots:</Form.Label></Col>
                    <Col xs ={9} md={7} lg={5}>
                        <div className='d-flex'>
                            {/* <input id='numAvailableSpots' 
                                className='' 
                                type="text" 
                                name="numAvailableSpots" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('numAvailableSpots')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('numAvailableSpots')} 
                                value = {this.props.numAvailableSpots} 
                                onChange={ this.props.setStateValueForOverrideField.bind(this)}/> */}

                        <Form.Group controlId="formNumAvailSpots">
                            <Form.Control id='numAvailableSpots' 
                                className='mt-3' 
                                type="text"
                                size="lg" 
                                name="numAvailableSpots" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('numAvailableSpots')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('numAvailableSpots')} 
                                value = {values.numAvailableSpots}
                                onChange={(event) => {handleChange(event);
                                /* this.props.setStateValueForOverrideField(event);
                                handleChange(event) */
                                }}
                                isInvalid={!!errors.numAvailableSpots}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.numAvailableSpots}
                            </Form.Control.Feedback>   
                        </Form.Group>
                                
                            <Button variant="flat" 
                                size="lg" 
                                className ='ml-2' 
                                onClick={ (event) => {
                                    this.props.engageOverride('numAvailableSpots', values, errors, isValid);
                                    // handleBlur(event);
                                }} 
                                style= {{backgroundColor: this.props.getOverrideButtonColor('numAvailableSpots')}}>Override</Button>
                        </div>
                    </Col>
                </Row>

                <Row className='mb-2'>
                    <Col xs ={12} md={12} lg={2}><Form.Label htmlFor='numOccupiedSpots' className ='ml-2 mt-3'>Number of Occupied Spots:</Form.Label></Col>
                    <Col xs ={9} md={7} lg={5}>
                        <div className='d-flex'>
                            {/* <input id='numOccupiedSpots' 
                                className='' 
                                type="text" 
                                name="numOccupiedSpots" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('numOccupiedSpots')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('numOccupiedSpots')} 
                                value = {this.props.numOccupiedSpots} 
                                onChange={ this.props.setStateValueForOverrideField.bind(this) } /> */}

                        <Form.Group controlId="formNumOccupiedSpots">    
                            <Form.Control id='numOccupiedSpots' 
                                className='mt-3' 
                                type="text"
                                size="lg"  
                                name="numOccupiedSpots" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('numOccupiedSpots')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('numOccupiedSpots')} 
                                value = {values.numOccupiedSpots}
                                onChange={(event) => {
                                // this.props.setStateValueForOverrideField(event);
                                handleChange(event)}}
                                isInvalid={!!errors.numOccupiedSpots}/> 
                            <Form.Control.Feedback type="invalid">
                                {errors.numOccupiedSpots}
                            </Form.Control.Feedback> 
                        </Form.Group>
                                                        
                            <Button variant="flat" 
                                size="lg" 
                                className ='ml-2' 
                                onClick={ () => this.props.engageOverride('numOccupiedSpots', values, errors, isValid)} 
                                style= {{backgroundColor: this.props.getOverrideButtonColor('numOccupiedSpots')}}>Override</Button>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col xs ={12} md={4} lg={6}>
                        <div className='d-flex justify-content-center'>
                            {/* <Button variant="flat" size="lg" onClick={this.openSaveConfirmation} >Save</Button> */}

                            <Button id = 'saveButton' variant="flat" size="lg" onClick={(event)=> this.validateFields(event, errors)} >Save</Button>

                            <Button id = 'resetButton'variant="flat" size="lg" className ='ml-5' 
                            /* onClick={(event)=> this.validateFields(event, errors)} */ 
                            onClick={this.openResetConfirmation }
                            >Reset</Button>                 
                        </div>
                    </Col>
                </Row>
            </Col>
            <Modal animation={false} show={this.state.showSaveConfirmation} onHide={this.closeSaveConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you wish to keep these changes?</Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={this.onSaveChanges}> */}
                    <Button id = 'saveYesButton' variant="secondary" onClick={(e)=> {
                        this.props.setConfirmationButtonPressed ('save');
                    this.closeSaveConfirmation();
                    console.log('Save yes button',values, errors);
                    handleSubmit(e);
                    /* if (!errors.capacity && !errors.numAvailableSpots && !errors.numOccupiedSpots)  {
                        this.onSaveChanges(values);
                    }  */
                    
                    }}>   
                    Yes 
                    </Button>
                    <Button variant="secondary" onClick={this.closeSaveConfirmation}>
                    Cancel 
                    </Button>
                </Modal.Footer>
            </Modal> 

            <Modal animation={false} show={this.state.showResetConfirmation} onHide={this.closeResetConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset to Default</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you wish to reset the values to default?</Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={this.resetToDefault}> */}
                    <Button id = 'resetYesButton' variant="secondary" onClick={(e)=> 
                    {
                    // this.resetToDefault(values, errors, isValid);  
                    this.props.setConfirmationButtonPressed ('reset'); 
                    this.closeResetConfirmation(); 
                    handleSubmit(e)
                    }}>   
                    Yes   
                    </Button>
                    <Button variant="secondary" onClick={this.closeResetConfirmation}>
                    Cancel 
                    </Button>
                </Modal.Footer>
            </Modal>            
        </Row>
       
       );
        
    }
}

export default Override ;