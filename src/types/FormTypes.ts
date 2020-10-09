import { ConnectivityMatrixType } from '../helpers/connectivityMatrix';
export interface Question {
  label: string;
  type: string;
  id: string;
  description?: string;
  conditionalOn?: string;
  placeholder?: string;
  explainer?: string;
  loadPrevious?: string[];
  items?: SubstepItem[];
  inputs?: ListInput[];
}

export interface ListItem {
  id: string;
  text: string;
  children?: ListItem[];
}

export interface SubstepItem {
  category: string;
  title: string;
  formId: string;
  loadPrevious?: string[];
}

export interface ListInput {
  type: 'text' | 'number';
  key: string;
  label: string;
  loadPrevious?: string[];
}
export interface Action {
  type: string;
  label: string;
}

export interface Banner {
  iconSrc?: string;
  imageSrc?: string;
  backgroundColor?: string;
}

export interface Step {
  title: string;
  description: string;
  id: string;
  group: string;
  questions?: Question[];
  actions?: Action[];
  banner?: Banner;
}

export interface Form {
  name: string;
  description: string;
  steps?: Step[];
  id: string;
  subform?: boolean;
  formType?: string;
  provider?: string;
  stepStructure: ListItem[];
  connectivityMatrix: ConnectivityMatrixType;
}

export const emptyForm: Form = {
  name: '',
  description: '',
  steps: [],
  subform: false,
  id: '',
  stepStructure: [],
  connectivityMatrix: [[]],
};
