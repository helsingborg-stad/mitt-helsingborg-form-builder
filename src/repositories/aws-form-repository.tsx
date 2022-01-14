import * as Api from '../helpers/ApiRequest';
import * as FormRepository from '../types/FormRepository';
import { Form } from '../types/FormTypes';

/**
 * Create form repository bound to AWS
 *
 * @param {string} apiKey
 * @returns {FormRepository}
 */
export function createAWSFormRepository(apiKey: string): FormRepository.FormRepository {
  const listForms = async (): Promise<Form[]> => Api.getAllForms(apiKey).then((res) => res?.data?.forms);
  const getForm = async (formId: string): Promise<Form> => Api.getForm(formId).then(({ data }) => data);
  const deleteForm = async (formId: string): Promise<void> => Api.deleteForm(formId);
  const createForm = async (form: Form): Promise<Form> => Api.createForm(form);
  const updateForm = async (formId: string, form: Form): Promise<Form> => Api.updateForm(formId, form);

  return {
    listForms,
    getForm,
    createForm,
    deleteForm,
    updateForm,
  };
}
