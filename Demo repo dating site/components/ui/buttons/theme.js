import {createMuiTheme} from '@material-ui/core';
import {deepPurple} from '@material-ui/core/colors';


const theme = createMuiTheme({
   palette: {
               primary: {
                           main: deepPurple[500]                 
                        },
               secondary: {
                           main: '#007bff'
                          }
            },
   overrides: {
      MuiButton: {
         root: {
            '&:focus': {         
               color: 'orange',
               outlineColor: 'orange',
               outline: `1px solid`
            }
         },
      },
   }           
});

export default theme;