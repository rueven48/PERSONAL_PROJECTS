/* eslint-disable */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import {colorStyles} from './../../../config';
import ReactSelect from "react-select";
import Heights from "../../../constants/heights";
import Looks from "../../../constants/looks";
import Structures from "../../../constants/structures";
import Hairs from "../../../constants/hairs";
import Eyes from "../../../constants/eyes";
import PicturesMale from "../../../constants/male_pictures";
import PicturesWoman from "../../../constants/women_pictures";
import { NavLink } from "react-router-dom";

const  ViewformRegisterStep2 = ({
        onSubmit,
        handleSubmit,
        errors,
        control,
        regDataObj,
        history
    }) =>  {
          
    return (        
        <form onSubmit={handleSubmit(onSubmit)} className="register_step2_container">
            
            <h3 className="register_step2_subject">: הרשמה - שלב 2</h3>
            
            <div className="container_register2_inputs">
                
                <NavLink className="button_go_login_in_register2"
                         to={{pathname: "/"}}
                >לחץ לכניסה
                        <i id="icon_sign_in" className="fas fa-sign-in-alt"></i>
                </NavLink>

                <div className="picture_input">            
                    <Controller as={<ReactSelect placeholder="תמונה"/>}                                
                                options={regDataObj.isMale==true?PicturesMale:PicturesWoman}
                                styles={colorStyles}
                                name="picture"
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error picture_error"></p>}
                              errors={errors}
                              name='picture'
                />
                
                <div className="height_input">
                    <Controller as={<ReactSelect placeholder="גובה"/>}                                
                                options={Heights}
                                styles={colorStyles}
                                name="height"
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error height_error"></p>}
                              errors={errors}
                              name='height'
                />

                <div className="look_input">        
                    <Controller as={<ReactSelect placeholder="מראה"/>}                                
                                options={Looks}
                                styles={colorStyles}
                                name="look"
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error look_error"></p>}
                              errors={errors}
                              name='look'
                />
                            
                <div className="structure_input">
                    <Controller as={<ReactSelect placeholder="מבנה גוף"/>}                                
                                options={Structures}
                                styles={colorStyles}
                                name="structure"
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error structure_error"></p>}
                              errors={errors}
                              name='structure'
                />

                <div className="hair_input">
                    <Controller as={<ReactSelect placeholder="צבע שיער"/>}                                
                                options={Hairs}
                                styles={colorStyles}
                                name="hair"
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error hair_error"></p>}
                              errors={errors}
                              name='hair'
                />

                <div className="eyes_input">
                    <Controller as={<ReactSelect placeholder="צבע עיניים"/>}                                
                                options={Eyes}
                                styles={colorStyles}
                                name="eyes"
                                control={control}
                                defaultValue=""
                    />
                </div>
                <ErrorMessage as={<p className="error eyes_error"></p>}
                              errors={errors}
                              name='eyes'
                />
                           
                <Button type="button"
                        className="button_go_to_register1"
                        onClick={() => history.push('/registerStep1')}
                >חזור
                    <i id="icon_go_back" className="fas fa-hand-point-left"></i>
                </Button>
                
                <Button type="submit" className="form_resgiter2_submit_button">הבא <i className="fas fa-hand-point-right icon_go_next_reg2"></i></Button>
            </div>
                       
        </form>
    );                   
}

export default ViewformRegisterStep2;
