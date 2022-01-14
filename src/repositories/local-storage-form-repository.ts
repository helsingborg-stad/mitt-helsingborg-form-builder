import { FormRepository } from '../types/FormRepository';
import { emptyForm, Form } from '../types/FormTypes';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'mitt-helsingborg-form-builder:form-repository';

type LocalDatabase = {
  [key: string]: Form;
};

/**
 * Create form repository backed to browser local storage
 *
 * @returns {FormRepository}
 */
export function createLocalStorageFormRepository(): FormRepository {
  const { load, patch } = connectLocalStorage();

  const listForms = async (): Promise<Form[]> => Object.values(load());
  const getForm = async (id: string): Promise<Form> => load()[id] || emptyForm;
  const createForm = async (form: Form): Promise<Form> => {
    const id = form.id || `form-${uuidv4()}`;
    patch({
      [id]: {
        ...form,
        id,
      },
    });
    return getForm(id);
  };
  const deleteForm = async (id: string): Promise<void> =>
    patch({
      [id]: undefined,
    });
  const updateForm = async (id: string, form: Form): Promise<Form> => {
    patch({
      [id]: form,
    });
    return form;
  };

  return {
    listForms,
    getForm,
    createForm,
    deleteForm,
    updateForm,
  };
}

/**
 * Factory for a simple load/patch api against browser local storage
 */
function connectLocalStorage() {
  function clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }

  const createDefaultDatabase = () => ({
    'builtin-default-form': clone({
      ...emptyForm,
      id: 'builtin-default-form',
      name: 'A built in default form that will be created if missing',
      description: 'This form can be edited and saved, but when removed, it will reappear with its default state.',
    }),
  });

  const load = (): LocalDatabase => ({
    ...createDefaultDatabase(),
    ...(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}') as LocalDatabase),
  });

  const store = (db: LocalDatabase) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db, null, 2));

  const patch = (patch: { [x: string]: Form | undefined }) =>
    store({
      ...load(),
      ...patch,
    } as LocalDatabase);

  return {
    load,
    patch,
  };
}
