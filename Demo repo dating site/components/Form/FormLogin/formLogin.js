/* eslint-disable */
import React, { useEffect } from 'react';
import ViewFormLogin from './viewFormLogin';
import {getLogin} from './../../../actions';
import FormIntroduction from './../../ui/form visual layout/form_introduction';
import {isUserAuthenticate} from './../../../actions';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  userName: yup
           .string()
           .required("נדרש להזין שם משתמש")
           .min(4,"יש להזין מעל 4 תווים")
           .max(20,"יש להזין מתחת 20 תווים")
           .email("תבנית שם המשתמש נדרש להיות אי מייל")
  ,
  password: yup
           .string()        
           .required("נדרש להזין סיסמא")
           .min(4,"יש להזין מעל 4 תווים")
           .max(20,"יש להזין מתחת 20 תווים")                                 
});

const FormLogin = () => {
                              
    const { register,setError, errors, handleSubmit, control } = useForm({
        mode:"all",
        resolver: yupResolver(loginSchema)
    });
    const history = useHistory();
    const currUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const onSubmit = (data) => {    
      dispatch(getLogin(data));
    };
         
    useEffect( ()=> {
      isUserAuthenticate(currUser,setError,history,dispatch); // after sumbit if the response server, is ok (inside the currUser) the user can enter thr site.
    },[currUser]);
            
    return (
            <div>
                <FormIntroduction/>          
                
                <ViewFormLogin onSubmit={onSubmit}
                               register={register}
                               errors={errors}
                               handleSubmit={handleSubmit}
                />
            </div> 
    );                    
}

export default FormLogin;

