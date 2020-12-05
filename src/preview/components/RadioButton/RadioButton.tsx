import React from 'react';
import { RadioGroup as RadioGroupMUI, FormControl, FormLabel, FormControlLabel, Radio } from '@material-ui/core';

interface Props {
    choices?: { displayText: string; value: string }[];
    color?: string;
}

const RadioGroup: React.FC<Props> = ({ choices }) => 
    (
        <FormControl component="fieldset">
            <RadioGroupMUI aria-label="radio group" name="preview radio group" >
                {choices && choices.length > 0 && choices.map(choice => <FormControlLabel style={{color: 'black'}} value={choice.value} label={choice.displayText} control={<Radio />}/>)}
            </RadioGroupMUI>
        </FormControl>
    );


export default RadioGroup;
