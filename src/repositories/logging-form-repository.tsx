import { FormRepository } from '../types/FormRepository';

interface Logger {
  log: (message?: unknown, ...optionalParams: unknown[]) => void;
}

type LogAction = (message?: unknown, ...optionalParams: unknown[]) => void;
/**
 * Decorate a form repository with console logging.
 *
 * @param {FormRepository} repository
 * @param {LogAction} log (defaults to console)
 * @returns {FormRepository}
 */
export default function createLoggingRepository(
  repository: FormRepository,
  log: LogAction = console.log,
): FormRepository {
  async function wrap<T>(f: () => Promise<T>, methodName: string, ...methodParameters: unknown[]) {
    log(`[start] ${methodName}`, ...methodParameters);
    const result = await f();
    log(`[done] ${methodName}`, result);
    return result;
  }
  return {
    listForms: () => wrap(() => repository.listForms(), 'listForms'),
    getForm: (id) => wrap(() => repository.getForm(id), 'getForm'),
    createForm: (form) => wrap(() => repository.createForm(form), 'createForm', form),
    deleteForm: (id) => wrap(() => repository.deleteForm(id), 'deleteForm', id),
    updateForm: (id, form) => wrap(() => repository.updateForm(id, form), 'updateForm', id, form),
  };
}
