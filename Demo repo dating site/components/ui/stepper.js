import React from 'react';
import { Stepper,Step,StepLabel } from "@material-ui/core";


const StepperUi = (props) => {
    
    let {activeStep} = props;
    return (      
            <div className="container_stepper">
                <Stepper orientation="vertical"
                         style={{ backgroundColor: "transparent" }}
                         activeStep={activeStep}
                >
                    <Step>
                        <StepLabel>שלב ראשון</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>שלב</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>שלב</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>שלב אחרון</StepLabel>
                    </Step>
                </Stepper>
            </div>
           )
}

export default StepperUi;