
import React from 'react';
import {FormGroup, Select as SelectMUI, MenuItem} from '@material-ui/core';

interface Props {
   items: {value: string; label: string}[]; 
} 

const Select: React.FC<Props> = ({items}) => (
    <FormGroup row>
        <SelectMUI>
            {items
                ? items.map((choice) => (
                    <MenuItem key={choice.label} value={choice.value}>
                      {choice.label}
                    </MenuItem>
                  ))
            : null}
        </SelectMUI>
    </FormGroup>
);

export default Select;