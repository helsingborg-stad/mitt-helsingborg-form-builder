import axios, {Method} from 'axios';
import { Form } from '../types/FormTypes';

/**
 * Axios request wrapper, against the url defined in the .env-file
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {obj} data
 * @param {obj} headers
 */
const request = async (endpoint: string, method: Method, data: any, headers: any): Promise<any> => {
  // should point to the forms api, set in .env-file.
  const url = process.env.REACT_APP_MITTHELSINGBORG_IO + (endpoint ? `/${endpoint}` : ''); 


//   const token = await StorageService.getData(TOKEN_KEY);
//   const bearer = token ? `Bearer ${token}` : '';
  // Merge custom headers
  const newHeaders = {
    // Authorization: bearer,
    'Content-Type': 'application/json',
    ...headers,
  };

  // Do request
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

const getAllForms = () => request('', 'get', undefined, undefined );
const getForm = (formId: string) => request(formId, 'get', undefined, undefined );
const createForm = (form: Form) => request('', 'post', form, undefined );
const updateForm = (formId: string, form: Form) => request(formId, 'put', form, undefined);

export { getAllForms, getForm, createForm, updateForm };
