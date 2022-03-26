/* eslint-disable */
import React,{useState} from 'react';
import ViewFormRegisterStep3 from './ViewFormRegisterStep3';
import FormIntroduction from './../../ui/form visual layout/form_introduction';
import {storeRegFormData} from './../../../actions';
import Stepper from './../../../components/ui/stepper';
import Months from './../../../constants/months';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const register3Schema = yup.object().shape({   
    day: yup
            .object().shape({
                label: yup
                      .string(),
                value: yup
                      .string()
            })
            .nullable()       
            .required("יש להזין יום")
    ,
    month: yup
            .object().shape({
                label: yup
                      .string(),
                value: yup
                      .string()
            })
            .nullable()       
            .required("יש להזין חודש")
    ,
    year: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין שנה")
    ,
    origin: yup
              .object().shape({
                  label: yup
                        .string(),
                  value: yup
                        .string()
                })
               .nullable()       
               .required("יש להזין מוצא")
    ,
    religiousmMovement: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין זרם")
    ,
    language: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין שפה")
    ,
    education: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין השכלה")
    ,
    occupation: yup
          .object().shape({
            label: yup
                   .string(),
            value: yup
                   .string()
          })
          .nullable()       
          .required("יש להזין עיסוק")      
});

const  formRegisterStep3 = () =>  {
             
    const {errors, handleSubmit, control} = useForm({
        mode:"all",
        resolver: yupResolver(register3Schema)
    });    
    const [activeStep]  = useState(2);
    const history = useHistory();
    const dispatch = useDispatch();  
    
    const parseDataRegisterStep3 = (data) => {    
        data['dateOfBirth'] = data.year.value + '-' +  parseMonthsStringToNumber(data.month.value) + '-' +  data.day.value; // format: YYYY-MM-DD           
        data['origin'] = data.origin.value;
        data['religiousmMovement'] = data.religiousmMovement.value;
        data['language'] = data.language.value;
        data['education'] = data.education.value;
        data['occupation'] = data.occupation.value;
        deleteKeysFromData(data);
        return data;
    }
  
    const deleteKeysFromData = (data) => {
        delete data['day'];
        delete data['month'];
        delete data['year'];
    }

    const onSubmit = (data) => {
        const parseData = parseDataRegisterStep3(data);
        dispatch(storeRegFormData(parseData)); 
        history.push('/registerStep4');        
    };

    const parseMonthsStringToNumber = (monthLetters) => {    
        for (let i = 0; i <= Months.length; i++){
            if( Months[i].value == monthLetters)
                return ++i;                        
            }            
    } 
      
    const calcYears = () => {
        const arrYears = [];
        const startYear = 1900;
        let endYear = (Number(new Date().getFullYear()) - 18);    
        pushYearsInArr(arrYears,startYear,endYear);
        return arrYears;        
    }    

    const calcDays = () => {
        const arrDays = [];        
        pushDaysInArr(arrDays);    
        return arrDays;
    }

    const pushYearsInArr = (arrYears,startYear,endYear) => {
        for (let i = startYear; i <= endYear; i++)         
        arrYears.push(createDateObj(i));
    }

    const pushDaysInArr = (arrDays) => {
        for (let i = 1; i < 32; i++)                 
            arrDays.push(createDateObj(i));
    }
   
    const createDateObj = (input) => {
        let date = {};
        date["value"] = input;
        date["label"] = input;
        return date;
    }

    return (        
            <div>
                <FormIntroduction/>

                <Stepper activeStep={activeStep}/> 

                <ViewFormRegisterStep3 onSubmit={onSubmit}
                                       errors={errors}
                                       handleSubmit={handleSubmit}
                                       control={control}
                                       calcDays={calcDays}
                                       calcYears={calcYears}
                                       history={history}        
                />
            </div>
    );               

}

export default formRegisterStep3;
