/* eslint-disable */
import React,{forwardRef} from 'react';

const Input = forwardRef( (
    props,
    ref
    ) => {
        
    return (      
            <div>
                <input type={props.type}
                       placeholder={props.placeholder}
                       className={props.className}
                       name={props.name}
                       ref={ref}
                />                
            </div>
           )
    }
)

export default Input;