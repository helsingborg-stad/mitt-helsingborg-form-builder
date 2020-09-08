export interface Question {
  label: string;
  type: string;
  id: string;
}

export interface Action {
  type: string;
  label: string;
}

export interface Step {
  title: string;
  description: string;
  id?: string;
  group: string;
  questions?: Question[];
  actions?: Action[];
}

export interface Form {
  name: string;
  description: string;
  steps?: Step[];
  id: string;
  subform?: boolean;
  formType?: string;
  provider?: string;
}
