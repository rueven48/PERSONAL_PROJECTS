/* eslint-disable */
import React, { useState } from 'react';
import ViewformRegisterStep2 from './ViewFormRegisterStep2';
import FormIntroduction from './../../ui/form visual layout/form_introduction';
import {storeRegFormData} from './../../../actions';
import Stepper from './../../../components/ui/stepper';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const register2Schema = yup.object().shape({   
    picture: yup
            .object().shape({
                label: yup
                    .string(),
                value: yup
                    .string()
            })
            .nullable()       
            .required("יש לבחור ברשימה תמונה")
    ,
    height: yup
            .object().shape({
                label: yup
                    .string(),
                value: yup
                    .string()
            })
            .nullable()       
            .required("יש להזין גובה")
    ,
    look: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין מראה")
    ,
    structure: yup
              .object().shape({
                  label: yup
                        .string(),
                  value: yup
                        .string()
                })
               .nullable()       
               .required("יש להזין מבנה גוף")
    ,
    hair: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין צבע שיער")
    ,
    eyes: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין צבע עיניים")                                     
});

const  formRegisterStep2 = () => {
               
    const {errors, handleSubmit, control} = useForm({
        mode:"all",
        resolver: yupResolver(register2Schema)
    });    
    const currUser = useSelector(state => state.user); // need it to choose if male or female pictures to show
    const [activeStep]  = useState(1);
    const history = useHistory();
    const dispatch = useDispatch();  
    
    const parseDataRegisterStep2 = (data) => {
        data['height'] = Number(data.height.value);
        data['look'] = data.look.value;
        data['structure'] = data.structure.value;
        data['hair'] = data.hair.value;
        data['eyes'] = data.eyes.value;
        data['picture'] = data.picture.value;
        return data;
    }

    const onSubmit = (data) => {        
        const parseData = parseDataRegisterStep2(data);
        dispatch(storeRegFormData(parseData));         
        history.push('/registerStep3');
    };

    return (        
        <div>
            <FormIntroduction/>

            <Stepper activeStep={activeStep}/>      

            <ViewformRegisterStep2 onSubmit={onSubmit}
                                   errors={errors}
                                   handleSubmit={handleSubmit}
                                   control={control}
                                   regDataObj = {currUser.regDataObj}
                                   history={history}
            />
        </div>
    );               

}

export default formRegisterStep2;
