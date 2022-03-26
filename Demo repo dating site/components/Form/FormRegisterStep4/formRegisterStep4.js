/* eslint-disable */
import React,{useState,useEffect} from 'react';
import {getRegister,isUserAuthenticate} from './../../../actions';
import ViewFormRegisterStep4 from './ViewFormRegisterStep4';
import FormIntroduction from './../../ui/form visual layout/form_introduction';
import Stepper from './../../../components/ui/stepper';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const register4Schema = yup.object().shape({   
    economicStatus: yup
                    .object().shape({
                        label: yup
                              .string(),
                        value: yup
                              .string()
                    })
                    .nullable()       
                    .required("יש לבחור מצב כלכלי")
    ,
    aboutMe: yup
             .string()
             .required("יש לכתוב על עצמך")
             .min(3,"יש להזין לפחות 3 תויים")
             .max(250,"מקסימום תויים להזנה - 250") 
    ,
    aboutOther: yup
                .string()
                .required("יש לכתוב על האחר")
                .min(3,"יש להזין לפחות 3 תויים")
                .max(250,"מקסימום תויים להזנה - 250") 
    ,        
    subIdentity: yup
                .object().shape({
                    label: yup
                          .string(),
                    value: yup
                          .string()
                })
                .nullable()       
                .required("יש לבחור זהות שבטית")
    ,
    relationshipStatus: yup
                        .object().shape({
                            label: yup
                                  .string(),
                            value: yup
                                  .string()
                        })
                        .nullable()       
                        .required("יש לבחור מצב משפחתי")        
});

const  formRegisterStep4 = () => {
                        
    const {register,setError,errors, handleSubmit, control} = useForm({
        mode:"all",
        resolver: yupResolver(register4Schema)
    });    
    const currUser = useSelector(state => state.user);
    const [activeStep]  = useState(3);
    const history = useHistory();
    const dispatch = useDispatch();  
    
    const parseDataRegisterStep4 = (data) => {        
        data['isSmoke'] = JSON.parse(data.isSmoke.toLowerCase());
        data['economicStatus'] = data.economicStatus.value;
        data['aboutMe'] = data.aboutMe.toLowerCase();
        data['aboutOther'] = data.aboutOther.toLowerCase();
        data['subIdentity'] = data.subIdentity.value;
        data['relationshipStatus'] = data.relationshipStatus.value;
        return data;
    }
      
    useEffect( ()=> {
        isUserAuthenticate(currUser,setError,history,dispatch); // after sumbit if the response server, is ok (inside the currUser) the user can enter thr site.
    },[currUser]);
    
    const onSubmit = (data) => {     
      const parseData = parseDataRegisterStep4(data);             
      dispatch(getRegister({...currUser.regDataObj,...parseData})); // combine the all forms data with the last one.              
    };
      
    return (        
        <div>
            <FormIntroduction/>

            <Stepper activeStep={activeStep}/> 

            <ViewFormRegisterStep4  onSubmit={onSubmit}
                                    errors={errors}
                                    handleSubmit={handleSubmit}
                                    control={control}
                                    register={register}
                                    history={history}  
            />
        </div>
    );               

}

export default formRegisterStep4;
