import React from 'react';
import Message from './Message/message';

const ListMessages = React.memo(({messages,dispatch}) => {
    
    return (      
            <div>
                {
                    messages.map( (message,index) => {
                        return <div key={index}>                                                        
                                    <Message message={message}
                                            dispatch={dispatch}
                                    />                               
                               </div>
                    })
                }
            </div>
           )
})

export default ListMessages;
