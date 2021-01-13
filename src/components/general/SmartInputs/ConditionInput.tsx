import React, { useState } from 'react';
import CSS from 'csstype';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormikContext } from 'formik';
import { Form } from '../../../types/FormTypes';
import { Typography } from '@material-ui/core';
import TextFieldWrapper from '../TextFieldWrapper';
import HelpPopper from './HelpPopper';

const row: CSS.Properties = {
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

type Operator = '!' | '&&' | '||';
type Term =
  | {
      type: 'operator';
      operator: Operator;
    }
  | {
      type: 'expression';
      expression: string;
    };

const grammar: {
  previousSymbol: 'start' | 'expression' | Operator;
  nextAllowed: (Operator | 'end' | 'expression')[];
}[] = [
  {
    previousSymbol: 'start',
    nextAllowed: ['expression', '!'],
  },
  {
    previousSymbol: 'expression',
    nextAllowed: ['&&', '||', 'end'],
  },
  {
    previousSymbol: '!',
    nextAllowed: ['expression'],
  },
  {
    previousSymbol: '&&',
    nextAllowed: ['expression', '!'],
  },
  {
    previousSymbol: '||',
    nextAllowed: ['expression', '!'],
  },
];
const regex = /(!|&&|\|\|)/gm;
function isOperator(s: string): s is Operator {
  return ['!', '&&', '||'].includes(s);
}

const checkTerms = (terms: string[], allowedExpressions: string[]) => {
  const paddedTerms = ['start', ...terms, 'end'];
  const list = paddedTerms.map((s) => {
    if (isOperator(s) || s === 'start' || s === 'end') return s;
    if (allowedExpressions.includes(s)) return 'expression';
    else return 'invalid term!';
  });

  let result: 'correct' | 'computing' | 'invalid' = 'computing';
  for (const [i, el] of list.entries()) {
    if (el === 'end' && result === 'computing') result = 'correct';
    else if (el === 'invalid term!') result = 'invalid';
    else {
      const rule = grammar.find((r) => r.previousSymbol === el);
      if (rule && !(rule.nextAllowed as string[]).includes(list[i + 1])) result = 'invalid';
    }
  }
  return result;
};

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
  helpText?: string;
}

const ConditionInput: React.FC<Props> = ({ name, label, value, helpText }) => {
  const { values, setFieldValue } = useFormikContext<Form>();

  const lastPartOfName = name.split('.').reverse()[0];
  console.log('value:', value, value[lastPartOfName]);
  const initalValue = ((value?.[lastPartOfName] || '') as string)
    .split(regex)
    .map((s) => s.trim())
    .filter((s) => s !== '');
  const [expression, setExpression] = useState<string[]>(initalValue);
  if (values?.steps) {
    const questionIds = values.steps.reduce((prev: string[], currentStep) => {
      if (currentStep.questions) {
        return [...prev, ...currentStep.questions.map((q) => q.id)];
      }
      return prev;
    }, []);

    const onChange = (event: React.ChangeEvent<{}>, value: string[] | null) => {
      setExpression(value || []);
      if (setFieldValue) {
        setFieldValue(name, value?.join(' '));
      }
    };
    const valid = checkTerms(expression, questionIds);

    const paddedExpression = ['start', ...expression, 'end'];
    const lastTerm = paddedExpression[paddedExpression.length - 2];
    let lastExp: 'start' | 'end' | 'expression' | Operator;
    if (isOperator(lastTerm) || lastTerm === 'start' || lastTerm === 'end') lastExp = lastTerm;
    else if (questionIds.includes(lastTerm)) lastExp = 'expression';

    const nextAllowed = grammar.find((rule) => rule.previousSymbol === lastExp)?.nextAllowed;
    let options: string[];
    if (nextAllowed && nextAllowed?.includes('expression')) {
      options = (nextAllowed.filter((s) => s !== 'end').filter((s) => s !== 'expression') as string[]).concat(
        questionIds,
      );
    } else if (nextAllowed) {
      options = nextAllowed.filter((s) => s !== 'end') as string[];
    } else {
      options = [];
    }
    return (
      <div>
        <Autocomplete
          value={expression}
          onInputChange={(event, newInputValue) => {
            setExpression((old) => [...old, newInputValue]);
          }}
          multiple
          getOptionSelected={() => false}
          id="autocomplete"
          options={options}
          onChange={onChange}
          renderInput={(params) => <TextFieldWrapper {...params} label={label} />}
        />
        <div style={row}>
          <Typography>Expression: {expression.join(' ')}</Typography>
          {helpText && helpText !== '' && <HelpPopper style={{}} text={helpText} />}
        </div>
        {valid === 'correct' && <Typography style={{ color: 'green' }}>Valid!</Typography>}
        {valid === 'invalid' && <Typography color="secondary">Invalid!</Typography>}
      </div>
    );
  }
  return <Typography>No questions</Typography>;
};

export default ConditionInput;
