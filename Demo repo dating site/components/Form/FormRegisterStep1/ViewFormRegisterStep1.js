/* eslint-disable */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import ReactSelect from "react-select";
import Cities from "./../../../constants/cities";
import { RadioGroup,FormControlLabel,Radio } from "@material-ui/core";
import Input from './../../ui/inputs/input';
import { NavLink } from "react-router-dom";
import {colorStyles} from './../../../config';

const  ViewformRegisterStep1 = ({
        onSubmit,
        handleSubmit,
        register,
        errors,
        control
    }) =>  {
              
    return (        
        <form onSubmit={handleSubmit(onSubmit)} className="register_step1_container">
            
           <h3 className="register_step1_subject">: הרשמה - שלב 1</h3>
           
           <div className="container_register1_inputs">
                                              
                <NavLink className="button_go_login_from_register1"
                         to={{pathname: "/"}}
                >לחץ לכניסה
                        <i id="icon_sign_in" className="fas fa-sign-in-alt"></i>
                </NavLink>

                <div className="container_gender_radio_buttons">                         
                        <label className="gender_label">: גבר/אשה </label>
                        <Controller name="isMale"
                                    as = {
                                    <RadioGroup aria-label="gender" >
                                                    <FormControlLabel value="false"
                                                                      control={<Radio />}
                                                                      label="אשה"                                                          
                                                    />
                                                    <FormControlLabel value="true"
                                                                      control={<Radio />}
                                                                      label="גבר"
                                                    />
                                    </RadioGroup>
                                    }
                                    className="male_or_female_radio_buttons"              
                                    control={control}
                                    defaultValue = "false"                                                 
                        /> 
                </div>
                                             
                <Input type={"text"}
                       name={"firstName"}
                       placeholder="שם פרטי"
                       className={"firstName_input"}
                       ref={register}
                />
                {errors.firstName && <div className="error firstName_error">{errors.firstName.message}</div>}


                <Input type={"text"}
                       name={"lastName"}
                       placeholder={"שם משפחה"}                        
                       className={"lastName_input"}
                       ref={register}
                />
                {errors.lastName && <div className="error lastName_error">{errors.lastName.message}</div>}
                                   
                                         
                <Controller as={<ReactSelect placeholder="מקום מגורים" /> }
                            options={Cities}
                            styles={colorStyles}
                            name="city"
                            className="cities"
                            control={control}                                                                                                                            
                            rules={{ required: 'נדרש להזין מקום מגורים' }}
                            defaultValue=""
                />
                <ErrorMessage as={<p className="error cities_error"></p>}
                              errors={errors}
                              name='city'
                />                    

                                                
                <Input type={"text"}
                       name={"userName"}
                       placeholder={"צור שם משתמש"}
                       className={"userName_in_register"}
                       ref={register}
                />
                { errors.userName && <div className="error username_error_in_register">{errors.userName.message}</div> }
                        
                                    
                <input type={"text"}
                       name={"password"}
                       placeholder={"צור סיסמא"}
                       className={"password_in_register"}
                       ref={register}
                />
                {errors.password && <div className="error password_error_in_register">{errors.password.message}</div>}

                <Button type="submit" className="form_resgiter1_submit_button">הבא <i className="fas fa-hand-point-right icon_go_next_reg1"></i></Button>                
            </div>                                      
        </form>
    );                   
}

export default ViewformRegisterStep1;
