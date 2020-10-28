type ValidatorMethod =
  | 'isEmpty'
  | 'isEmail'
  | 'isUrl'
  | 'isPostalCode'
  | 'isNumeric'
  | 'isAfter'
  | 'isBefore'
  | 'isBoolean'
  | 'isMobilePhone'
  | 'isPhone'
  | 'isLength'
  | 'isInt';

export default interface ValidationRules {
  isRequired: boolean;
  rules: {
    method: ValidatorMethod;
    validWhen: boolean;
    args?: {
      options?: Record<string, string | boolean | number>;
      locale?: string;
    };
    message: string;
  }[];
}
