import React from 'react';
import { FieldArray, ArrayHelpers } from 'formik';
import { Button } from '@material-ui/core';
import SubContainer from './SubContainer';
import { InputFieldPropType } from '../../types/PropTypes';
import { Step, Question, Action } from '../../types/FormTypes';

type ValueArray = (Step | Action | Question)[];

interface Props {
  heading: string;
  value: Record<string, boolean | string | ValueArray | undefined>;
  parentName: string;
  name: string;
  emptyObject: Record<string, string | Record<string, string | number> | Array<Record<string, string | number>>>;
  inputField: React.FC<InputFieldPropType>;
  color?: string;
}

function isValueArray(value: boolean | string | ValueArray | undefined): value is ValueArray {
  return (value as ValueArray).length !== undefined;
}

const FieldArrayWrapper: React.FC<Props> = ({
  heading,
  parentName,
  name,
  value,
  inputField,
  emptyObject,
  color = 'red',
}: Props) => {
  const myName = parentName ? `${parentName}.${name}` : name;
  return (
    <>
      <h3>{heading}</h3>
      <FieldArray name={myName}>
        {(arrayHelpers: ArrayHelpers) => {
          let el: JSX.Element[];
          if (value[name] && isValueArray(value[name]) && (value[name] as ValueArray).length > 0) {
            el = (value[name] as ValueArray).map((qs: any, i: number) => {
              const qName = `${myName}.${i}`;
              return (
                <SubContainer
                  key={qName}
                  itemValues={qs}
                  name={qName}
                  currentIndex={i}
                  inputField={inputField}
                  arrayHelpers={arrayHelpers}
                  color={color}
                />
              );
            });
          } else {
            el = [<>{`No ${name} added`}</>];
          }

          return (
            <div>
              <div style={{ margin: '5px' }}> {el} </div>

              <Button
                style={{ margin: '5px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  const newObject = {};
                  Object.assign(newObject, emptyObject);
                  arrayHelpers.push(newObject);
                }}
              >{`Add ${name}`}</Button>
            </div>
          );
        }}
      </FieldArray>
    </>
  );
};

export default FieldArrayWrapper;
