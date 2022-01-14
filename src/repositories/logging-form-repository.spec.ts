/* eslint-disable prettier/prettier */
import { FormRepository } from '../types/FormRepository';
import { emptyForm, Form } from '../types/FormTypes';
import createLoggingRepository from './logging-form-repository';

const NullRepository: FormRepository = {
  listForms: () => Promise.resolve([]),
  getForm: (id: string): Promise<Form> => Promise.resolve(emptyForm),
  createForm: (form: Form): Promise<Form> => Promise.resolve(form),
  deleteForm: (id: string): Promise<void> => Promise.resolve(void 0),
  updateForm: (id: string, form: Form): Promise<Form> => Promise.resolve(form),
};

describe('Logging form respository', () => {
  it('should pass return values back', async () => {
    const fakeForm = {...emptyForm, id: 'fake-form-id'}
    await testPasses(
      r => r.getForm('123'),
      fakeForm,
      {
        getForm: async id => fakeForm,
      })
    await testPasses(
      r => r.listForms(),
      [fakeForm],
      {
        listForms: async () => [fakeForm],
      })
    await testPasses(
      r => r.createForm(fakeForm),
      fakeForm,
      {
        createForm: async f => f,
      })
    await testPasses(
      r => r.updateForm('123', fakeForm),
      fakeForm,
      {
        updateForm: async (id, form) => form,
      })
      
    async function testPasses<T>(
      fn: (repo: FormRepository) => Promise<T>, 
      expectedResult: T,
      r: Partial<FormRepository>) {
      const result = await fn(
        createLoggingRepository({
          ...NullRepository,
          ...r,
      }, () => void 'silent logger captures nothing'));

      expect(result).toStrictEqual(expectedResult)
    }

  })
  it('should pass arguments as is', async () => {
    await testPasses((r) => r.getForm('123'), {
      getForm: async id => {
        expect(id).toBe('123');
        return emptyForm;
      },
    })

    await testPasses((r) => r.deleteForm('abc'), {
      deleteForm: async id => {
        expect(id).toBe('abc');
      },
    })

    await testPasses((r) => r.createForm(emptyForm), {
      deleteForm: async form => {
        expect(form).toBe(emptyForm);
      },
    })

    await testPasses((r) => r.updateForm('123', emptyForm), {
      updateForm: async (id, form) => {
        expect(id).toBe('123');
        expect(form).toBe(emptyForm);
        return form
      },
    })

    async function testPasses(fn: (repo: FormRepository) => void, r: Partial<FormRepository>) {
      await fn(
        createLoggingRepository({
          ...NullRepository,
          ...r,
      }, () => void 'silent logger captures nothing'));
    }
  });

  it('should write to log', async () => {
    // below we call explicit methods and expects [start] and [done] entries to show up in the captured log
    await testCapture((repo) => repo.listForms(), ['[start] listForms', '[done] listForms']);
    await testCapture((repo) => repo.createForm(emptyForm), ['[start] createForm', '[done] createForm']);
    await testCapture((repo) => repo.getForm('some id'), ['[start] getForm', '[done] getForm']);
    await testCapture((repo) => repo.updateForm('some id', emptyForm), ['[start] updateForm', '[done] updateForm']);
    await testCapture((repo) => repo.deleteForm('some id'), ['[start] deleteForm', '[done] deleteForm']);
  });

  async function testCapture(fn: (repo: FormRepository) => void, expectedLog: unknown[]) {
    // create an in memory log that stored every first part of every log message
    const captures: unknown[] = [];
    // create a logging repository (which is tested) over a simpleton
    const repo = createLoggingRepository(NullRepository, (message) => captures.push(message));
    await fn(repo);
    expect(captures).toStrictEqual(expectedLog);
  }
});
