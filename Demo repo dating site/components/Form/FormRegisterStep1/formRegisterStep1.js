/* eslint-disable */
import React, { useState } from 'react';
import ViewformRegisterStep1 from './ViewFormRegisterStep1';
import FormIntroduction from './../../ui/form visual layout/form_introduction';
import {storeRegFormData} from './../../../actions';
import Stepper from './../../../components/ui/stepper';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const register1Schema = yup.object().shape({
    firstName: yup
               .string()        
               .required("נדרש להזין שם פרטי")
               .min(2,"יש להזין מעל 2 תווים")
               .max(25,"יש להזין מתחת 25 תווים")
    ,
    lastName: yup
              .string()        
              .required("נדרש להזין שם משפחה")
              .min(2,"יש להזין מעל 2 תווים")
              .max(25,"יש להזין מתחת 25 תווים")
    ,
    city: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("נדרש להזין מקום מגורים")
    ,
    userName:  yup
                  .string()
                  .required("נדרש ליצור שם משתמש")
                  .min(4,"יש להזין מעל 4 תווים")
                  .max(20,"יש להזין מתחת 20 תווים")
                  .email("תבנית שם המשתמש נדרש להיות אי מייל") 
    ,
    password: yup
                 .string()        
                 .required("נדרש ליצור סיסמא")
                 .min(4,"יש להזין מעל 4 תווים")
                 .max(20,"יש להזין מתחת 20 תווים")                                    
});

const formRegisterStep1 = () => {
             
    const { register, errors, handleSubmit, control } = useForm({
        mode:"all",
        resolver: yupResolver(register1Schema)
    });    
    const [activeStep]  = useState(0);
    const history = useHistory();
    const dispatch = useDispatch(); 
       
    const parseDataRegisterStep1 = (data) => {
        data['isMale'] = JSON.parse(data.isMale.toLowerCase());
        data['firstName'] = data.firstName.toLowerCase();
        data['lastName'] = data.lastName.toLowerCase();
        data['city'] = data.city.value;
        return data;
    }    

    const onSubmit = (data) => {
        const parseData = parseDataRegisterStep1(data);        
        dispatch(storeRegFormData(parseData));        
        history.push('/registerStep2');
    };
         
    return (
            <div>
                <FormIntroduction/>

                <Stepper activeStep={activeStep}/>

                <ViewformRegisterStep1 onSubmit={onSubmit}
                                       register={register}
                                       errors={errors}
                                       handleSubmit={handleSubmit}
                                       control={control}
                />
            </div> 
    );                    
}

export default formRegisterStep1;

