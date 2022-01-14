import { FormRepository } from '../types/FormRepository';

/**
 * Decorate a form repository with console logging.
 *
 * @param {FormRepository} repository
 * @returns {FormRepository}
 */
export function createConsoleLoggingRepository(repository: FormRepository): FormRepository {
  async function log<T>(label: string, f: () => Promise<T>) {
    console.log(`[start] ${label}`);
    const result = await f();
    console.log(`[done] ${label} ${JSON.stringify(result)}`);
    return result;
  }
  return {
    listForms: () => log('listForms', () => repository.listForms()),
    getForm: (id) => log(`getForm(${id})`, () => repository.getForm(id)),
    createForm: (form) => log('createForm(<form data>)', () => repository.createForm(form)),
    deleteForm: (id) => log('deleteForm(${id})', () => repository.deleteForm(id)),
    updateForm: (id, form) => log('updateForm(${id}, <form data>)', () => repository.updateForm(id, form)),
  };
}
