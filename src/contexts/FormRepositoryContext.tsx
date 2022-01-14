import React, { createContext } from 'react';
import { createLocalStorageFormRepository } from '../repositories/local-storage-form-repository';
import { FormRepository } from '../types/FormRepository';

interface FormRepositoryContextType {
  formRepository: FormRepository;
}

const FormRepositoryContext = createContext<FormRepositoryContextType>({
  formRepository: createLocalStorageFormRepository(),
});

interface FormRepositoryProviderProps {
  formRepository: FormRepository;
  children: React.ReactNode;
}

export const FormRepositoryProvider: React.FC<FormRepositoryProviderProps> = ({
  formRepository,
  children,
}: FormRepositoryProviderProps) => {
  return (
    <FormRepositoryContext.Provider
      value={{
        formRepository,
      }}
    >
      {children}
    </FormRepositoryContext.Provider>
  );
};

export default FormRepositoryContext;
