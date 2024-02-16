import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {api} from "../utils/api.ts";
import {useState} from "react";
import {Input, InputLabel} from "@mui/material";

const steps = ["URL & Nom", 'Filtre 1', 'Filtre 2'];

export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const [formData, setFormData] = useState({
        url: '',
        name: '',
        key1: '',
        key2: '',
    });

    const elementsInFormForStep = () => {
        if (activeStep === 0) {
            return (
                <div>
                    <InputLabel htmlFor={"url"}>Url</InputLabel>
                    <Input required={true} type="text" name="url" value={formData.url} onChange={handleChange}/>
                    <InputLabel htmlFor={"name"}>Nom dataset</InputLabel>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange}/>
                </div>
            )
        } else if (activeStep === 1) {
            return (
                <div>
                    <InputLabel htmlFor={"key1"}>Filtre 1</InputLabel>
                    <Input type="text" name="key1" value={formData.key1} onChange={handleChange}/>
                </div>
            )
        } else if (activeStep === 2) {
            return (
                <div>
                    <InputLabel htmlFor={"key2"}>Filtre 2</InputLabel>
                    <Input type="text" name="key2" value={formData.key2} onChange={handleChange}/>
                </div>
            )
        }
    }

    const checkIfFormIsValid = () => {
        if (activeStep === 0 && formData.url === '' && formData.name === '') {
            console.log(formData.url);
            console.log(formData.name);
            return false;
        }
        if (activeStep === 1 && formData.key1 === '') {
            return false;
        }
        return true;
    }
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Vous pouvez effectuer des opérations supplémentaires ici, comme envoyer les données à un serveur
        console.log(formData);
        api.saveDataset(formData.url, formData.name, formData.key1, formData.key2);
    };

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {

        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        if (checkIfFormIsValid() === false) {
            return;
        }
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((_step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        if (checkIfFormIsValid() === false) {
            return false;
        }
        setActiveStep(step);
    };

    const handleComplete = () => {
        if (!checkIfFormIsValid()) {
            console.log("form is not valid");
            return;
        }
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        formData.url = '';
        formData.name = '';
        formData.key1 = '';
        formData.key2 = '';
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box className={"divAdmin"} sx={{ width: '100%' }}>
            <Typography variant="h3" mb="50px">
                Ajout d'un dataset
            </Typography>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit"
                            // onClick={handleStep(index)}
                            >
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{mt: 2, mb: 1}}>
                            Toutes les étapes sont terminées.
                            Vous pouvez maintenant envoyer le fomulaire.
                        </Typography>
                        {/*<Typography>*/}
                        {/*    {formData.url}*/}
                        {/*</Typography>*/}
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <form name={"save"} onSubmit={handleSubmit}>
                                <Button type="submit">Envoyer</Button>
                            </form>
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mb: 2, pt: 5 }}>
                            <form name={"save"} onSubmit={handleSubmit}>
                                {elementsInFormForStep()}
                                {/*<Button type="submit">Submit</Button>*/}
                            </form>
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Retour
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/*<Button onClick={handleNext} sx={{ mr: 1 }}>*/}
                            {/*    Next*/}
                            {/*</Button>*/}
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Terminer'
                                            : 'Completer l\'étape'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}
