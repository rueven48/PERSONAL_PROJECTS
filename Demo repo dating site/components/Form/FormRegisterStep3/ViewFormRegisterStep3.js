/* eslint-disable */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import {colorStyles} from './../../../config';
import ReactSelect from "react-select";
import Origins from './../../../constants/origins';
import ReligiousmMovements from './../../../constants/religiousm_movement';
import Languages from './../../../constants/languages';
import Education from './../../../constants/education';
import Occupation from './../../../constants/occupation';
import Months from './../../../constants/months';
import { NavLink } from "react-router-dom";

const  ViewFormRegisterStep3 = ({
        onSubmit,
        handleSubmit,
        errors,
        control,
        calcDays,
        calcYears,
        history
    }) =>  {
           
    return (        
        <form onSubmit={handleSubmit(onSubmit)} className="register_step3_container">
            
            <h3 className="register_step3_subject">: הרשמה - שלב 3</h3>

            <div className="container_register3_inputs">         
                                                      
              <NavLink className="button_go_login_in_register3"
                      to={{pathname: "/"}}
              >לחץ לכניסה
                      <i id="icon_sign_in" className="fas fa-sign-in-alt"></i>
              </NavLink>

              <label className="date_of_birth_label">: שנת לידה </label>

              <div className="day_input">
                <Controller as={<ReactSelect placeholder="יום"/> }
                            options={calcDays()}
                            styles={colorStyles}
                            name="day"
                            control={control}                                                                                                                            
                            defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error day_error"></p>}
                            errors={errors}
                            name='day'
              />

              <div className="month_input">
                <Controller   as={<ReactSelect placeholder="חודש"/>}                                
                              options={Months}
                              styles={colorStyles}
                              name="month"
                              control={control}
                              defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error month_error"></p>}
                            errors={errors}
                            name='month'
              />

              <div className="year_input">
                <Controller as= {<ReactSelect placeholder="שנה"/>}                                
                            options={calcYears()}
                            styles={colorStyles}
                            name="year"                            
                            control={control}
                            defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error year_error"></p>}
                            errors={errors}
                            name='year'
              />

              <div className="origin_input">                                      
                <Controller as= {<ReactSelect placeholder="מוצא"/>}                                
                            options={Origins}
                            styles={colorStyles}
                            name="origin"                            
                            control={control}
                            defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error origin_error"></p>}
                            errors={errors}
                            name='origin'
              />

              <div className="religiousmMovement_input">            
                <Controller as= {<ReactSelect placeholder="זרם"/>}                                
                            options={ReligiousmMovements}
                            styles={colorStyles}
                            name="religiousmMovement"                            
                            control={control}
                            defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error religiousmMovement_error"></p>}
                            errors={errors}
                            name='religiousmMovement'
              />
                  
              <div className="language_input">    
                <Controller as= {<ReactSelect placeholder="שפה"/>}                                
                            options={Languages}
                            styles={colorStyles}
                            name="language"
                            control={control}
                            defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error language_error"></p>}
                            errors={errors}
                            name='language'
              /> 

              <div className="education_input">
                <Controller as= {<ReactSelect placeholder="השכלה"/>}                                
                            options={Education}
                            styles={colorStyles}
                            name="education"                            
                            control={control}
                            defaultValue="" 
                />
              </div>
              <ErrorMessage as={<p className="error education_error"></p>}
                            errors={errors}
                            name='education'
              />

              <div className="occupation_input">
                <Controller as= {<ReactSelect placeholder="עיסוק"/>}                                
                            options={Occupation}
                            styles={colorStyles}
                            name="occupation"                            
                            control={control}
                            defaultValue=""
                />
              </div>
              <ErrorMessage as={<p className="error occupation_error"></p>}
                            errors={errors}
                            name='occupation'
              />
              
              <Button type="button"
                      className="form_register3_go_back"
                      onClick={() => history.push('/registerStep2')}
              >חזור
                <i id="icon_go_back" className="fas fa-hand-point-left"></i>
              </Button>

              <Button type="submit" className="form_resgiter3_submit_button">הבא <i className="fas fa-hand-point-right icon_go_next"></i></Button>
                  
            </div>               
        </form>
    );                   
}

export default ViewFormRegisterStep3;
