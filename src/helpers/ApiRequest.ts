import axios, {Method} from 'axios';
import { Form } from '../types/FormTypes';
import { objectWithoutProperties } from './object';

/**
 * Axios request wrapper, against the url defined in the .env-file
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {obj} data
 * @param {obj} headers
 */
const request = async (endpoint: string, method: Method, data: Record<string, any>|undefined, headers: Record<string, any>|undefined) : Promise<any> => {
  // should point to the forms api, set in .env-file.
  const url = process.env.REACT_APP_MITTHELSINGBORG_IO + (endpoint ? `/${endpoint}` : ''); 

  const apikey = headers?.apikey || localStorage.getItem('hbg-forms-apikey') || '';
  const hs = headers ? objectWithoutProperties(headers, ['apikey']) : {};
  const newHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': apikey,
    ...hs,
  };

  const req = await axios({
    url,
    method,
    headers: newHeaders,
    data: data !== undefined ? data : undefined,
  })
    .then(res => {console.log(res); return res.data;})
    .catch(error => {
      console.log('API request error', error);
      return error;
    });

  return req;
};

const getAllForms = (apikey?:string) => request('', 'get', undefined, (apikey ? {apikey}: undefined) );
const getForm = (formId: string) => request(formId, 'get', undefined, undefined );
const createForm = (form: Form) => request('', 'post', form, undefined );
const updateForm = (formId: string, form: Form) => request(formId, 'put', form, undefined);
const deleteForm = (formId: string) => request(formId, 'delete', undefined, undefined);


export { getAllForms, getForm, createForm, updateForm, deleteForm };
