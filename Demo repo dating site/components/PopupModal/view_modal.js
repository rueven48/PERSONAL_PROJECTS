import React from 'react';
import { Modal } from 'react-bootstrap';
import Chat from '../Chat/chat';
import {closePopUpProfile} from '../../actions';

const ViewModal = ({
    isPopUpShowState,
    currUser,
    setIsPopUpShowState,
    info,
    isProfileSmoke,
    lastEntranceDate,
    dispatch
    }) => {
        
    const {appearance} = info;
    
    return (      
            <div>

                <Modal size="lg"
                       show={isPopUpShowState}
                       onHide={() => closePopUpProfile(currUser,setIsPopUpShowState)}
                       aria-labelledby="example-modal-sizes-title-lg"                                                  
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                        : פרטי משתמש
                        </Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body >
                                                                                            
                        <div className="modal_details_container">
                            <div className="modal_firstname">{info.firstName}</div>
    
                            <img className="modal_cake_icon" src={require(`./../../assets/images/cake.png`)} alt="cake"/>
                            <p className="modal_age">{info.age}</p> 
                            
                            <img className="modal_seedling_icon" src={require(`./../../assets/images/seedling.png`)} alt="seedling"/>
                            <p className="modal_height"> {appearance.height}</p>
                            
                            <img className="modal_relationshipStatus_icon" src={require(`./../../assets/images/status_icon2.png`)} alt="status"/>
                            <div className="modal_relationshipStatus">{info.relationshipStatus}</div> 
    
                            <img className="modal_house_icon" src={require(`./../../assets/images/house.png`)} alt="house"/>
                            <div className="modal_city">{info.city}</div> 
                        
                            <img className="modal_look_icon" src={require(`./../../assets/images/look_icon.png`)} alt="look"/>
                            <div className="modal_look"> {appearance.look}</div>
                            
                            <img className="modal_structure_icon" src={require(`./../../assets/images/structure_icon.png`)} alt="structure"/>
                            <div className="modal_structure"> {appearance.structure}</div>
    
                            <img className="modal_eyes_icon" src={require(`./../../assets/images/eyes_icon.png`)} alt="eyes"/>
                            <div className="modal_eyes"> {appearance.eyes}</div>
    
                            <img className="modal_hair_icon" src={require(`./../../assets/images/hair_icon.png`)} alt="hair"/>
                            <div className="modal_hair"> {appearance.hair}</div>  
                        
                            <img className="modal_economic_icon" src={require(`./../../assets/images/economic_icon.png`)} alt="economic"/>
                            <div className="modal_economic"> {info.economicStatus}</div>
    
                            <img className="modal_education_icon" src={require(`./../../assets/images/education_icon.png`)} alt="education"/>
                            <div className="modal_education"> {info.education}</div>
    
                            <img className="modal_occupation_icon" src={require(`./../../assets/images/occupation_icon.png`)} alt="occupation"/>
                            <div className="modal_occupation"> {info.occupation}</div>
    
                            <img className="modal_language_icon" src={require(`./../../assets/images/language_icon.png`)} alt="language"/>
                            <div className="modal_language"> {info.language}</div>
    
                            <img className="modal_origin_icon" src={require(`./../../assets/images/origin_icon.png`)} alt="origin"/>
                            <div className="modal_origin"> {info.origin}</div>  
    
                            <img className="modal_religious_icon" src={require(`./../../assets/images/religious_icon.png`)} alt="religious"/>
                            <div className="modal_religious"> {info.religiousmMovement}</div>
    
                            <img className="modal_zodiac_icon" src={require(`./../../assets/images/zodiac_icon.png`)} alt="zodiac"/>
                            <div className="modal_zodiac"> {info.zodiacSign}</div>
    
                            <img className="modal_subIdentity_icon" src={require(`./../../assets/images/subIdentity_icon.png`)} alt="subIdentity"/>
                            <div className="modal_subIdentity"> {info.subIdentity}</div>
    
                            <img className="modal_enter_last_icon" src={require(`./../../assets/images/enter_last_icon.jpg`)} alt="enter last"/>
                            
                            <div className="modal_enter_last"> כניסה אחרונה: {lastEntranceDate}</div>
                                                                    
                            <div className="modal_smoke">{isProfileSmoke}</div>                                    
                        </div>
                                                    
                        <img  className="user_image" src={require(`./../../assets/images/${info.picture}`)} alt="Avatar"/>                                                
                        
                        <Chat dispatch={dispatch}
                        />                                                                                                                                                                                                                                                     
                    
                    </Modal.Body>     
                </Modal>

            </div>
           )
}

export default ViewModal;