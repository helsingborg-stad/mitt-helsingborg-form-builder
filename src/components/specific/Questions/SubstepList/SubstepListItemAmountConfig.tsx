import React, { useContext, useEffect, useState } from 'react';
import { Form, useFormikContext } from 'formik';
import FieldDescriptor from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import { Form as FormType } from '../../../../types/FormTypes';
import { getPropertyFromDottedString } from '../../../../helpers/object';
import FormContext from '../../../../contexts/FormContext';

const emptyForm: FormType = {
  name: '',
  description: '',
  steps: [],
  subform: false,
  id: '',
};

const SubstepListItemAmountConfig: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { values }: { values: Record<string, any> } = useFormikContext();
  const questionName = props.name.split('.').slice(0, -4).join('.');
  const categories = getPropertyFromDottedString(values, `${questionName}.categories`);
  const itemName = props.name.split('.').slice(0, -2).join('.');
  const subformId = getPropertyFromDottedString(values, `${itemName}.formId`);

  const emptyList: any[] = [];
  const [subformIdChoices, setSubformIdChoices] = useState(emptyList);

  const { getForm } = useContext(FormContext);

  useEffect(() => {
    const loadForm = async () => {
      const { data } = await getForm(subformId);
      if (data.steps) {
        const res = data.steps.flatMap((step) => {
          if (step.questions)
            return step.questions.map((qs) => {
              return { name: (qs.label || qs.description) + ` (type: ${qs.type})`, value: qs.id };
            });
        });
        console.log('res', res);
        setSubformIdChoices(res);
        return res;
      }
    };
    loadForm();
  }, [subformId, getForm]);

  const categoryChoices = categories.map((cat: { description: string; category: string }) => {
    return { name: cat.description, value: cat.category };
  });
  const fields: FieldDescriptor[] = [
    { name: 'category', type: 'select', initialValue: '', label: 'Category', choices: categoryChoices },
    {
      name: 'amountId',
      type: 'select',
      initialValue: '',
      label: 'Subform question to show input from',
      choices: subformIdChoices,
    },
  ];
  return <MultipleInputField fields={fields} {...props} />;
};

export default SubstepListItemAmountConfig;
