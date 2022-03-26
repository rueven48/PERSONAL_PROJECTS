/* eslint-disable */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Controller } from "react-hook-form";
import Textarea from './../../ui/inputs/textarea';
import ReactSelect from "react-select";
import { RadioGroup,FormControlLabel,Radio } from "@material-ui/core";
import { ErrorMessage } from '@hookform/error-message';
import {colorStyles} from './../../../config';
import EconomicStatus from './../../../constants/economic_status';
import SubIdentity from './../../../constants/subIdentity';
import RelationshipStatus from './../../../constants/relationship_status';
import { NavLink } from "react-router-dom";

const  ViewFormRegisterStep4 = ({
        onSubmit,
        handleSubmit,
        errors,
        control,
        register,
        history
    }) =>  {
          
    return (        
       <form onSubmit={handleSubmit(onSubmit)} className="register_step4_container">
            
            <h3 className="register_step4_subject">: הרשמה - שלב 4</h3>
            
            <div className="container_register4_inputs">
                                                         
                <NavLink className="button_go_login_in_register4"
                        to={{pathname: "/"}}
                >לחץ לכניסה
                        <i id="icon_sign_in" className="fas fa-sign-in-alt"></i>
                </NavLink>
                
                <div className="container_isMoke_radio_buttons">
                    <label className="smoke_label">:מעשן/לא מעשן </label>                                
                    <Controller name="isSmoke"
                                as = {
                                    <RadioGroup aria-label="gender">
                                            <FormControlLabel value="false"
                                                              control={<Radio />}
                                                              label="לא מעשן"                                                         
                                            />
                                            <FormControlLabel value="true"
                                                              control={<Radio />}
                                                              label="מעשן"
                                            />
                                    </RadioGroup>
                                }              
                                control={control}
                                className="is_smoke_radio_buttons" 
                                defaultValue="false"                                                
                    /> 
                </div>


                <div className="economicStatus_input">                                                    
                    <Controller as={<ReactSelect placeholder="מצב כלכלי"/>}                                
                                options={EconomicStatus}
                                styles={colorStyles}                            
                                name="economicStatus"                                
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error economicStatus_error"></p>}
                            errors={errors}
                            name='economicStatus'
                />


                <Textarea className="aboutMe_input"
                          id="textarea_form_reg_on_me"
                          rows="2"
                          name="aboutMe"
                          placeholder="יש להזין טקסט על עצמך"
                          dir="rtl"
                          ref={register}
                >
                </Textarea>
                {errors.aboutMe && <div className="error aboutMe_error">{errors.aboutMe.message}</div>}
                    

                <Textarea className="aboutOther_input"
                          id="textarea_form_reg_on_other"
                          rows="2"
                          name="aboutOther"
                          placeholder="יש להזין טקסט מה חשוב לך באחר"
                          dir="rtl"
                          ref={register}
                >
                </Textarea>
                {errors.aboutOther && <div className="error aboutOther_error">{errors.aboutOther.message}</div>}                    


                <div className="subIdentity_input">        
                    <Controller as={<ReactSelect placeholder="איזה שבט"/>}                                
                                options={SubIdentity}
                                styles={colorStyles}
                                name="subIdentity"                                
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error subIdentity_error"></p>}
                            errors={errors}
                            name='subIdentity'
                />


                <div className="relationshipStatus_input">                
                    <Controller as={<ReactSelect placeholder="מצב משפחתי"/>}                                
                                options={RelationshipStatus}
                                styles={colorStyles}
                                name="relationshipStatus"                               
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error relationshipStatus_error"></p>}
                              errors={errors}
                              name='relationshipStatus'                              
                />
                
                <Button type="button"
                        className="form_register4_go_back"
                        onClick={() => history.push('/registerStep3')}
                >חזור
                    <i id="icon_go_back" className="fas fa-hand-point-left"></i>
                </Button>

                <input type="submit"
                       className="form_resgiter4_submit_button"
                       value="סיום הרשמה"
                />                    
            </div>            
        </form>
    );                   
}

export default ViewFormRegisterStep4;
