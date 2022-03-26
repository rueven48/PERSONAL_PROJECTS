/* eslint-disable */
import React,{forwardRef} from 'react';

const Textarea = forwardRef( (
    props,
    ref
    ) => {
        
    return (                          
            <textarea className= {props.className}
                    id={props.id}
                    rows={props.row}
                    name={props.name}
                    placeholder={props.placeholder}
                    dir={props.dir}
                    ref={ref}
            >
            </textarea>
           )
    }
)

export default Textarea;