import ValidationRules from '../../../types/ValidationRules';

const ValidationFieldRules: Record<string, ValidationRules> = {
  email: {
    isRequired: false,
    rules: [
      {
        method: 'isEmail',
        validWhen: true,
        message: 'Du måste ange en giltig emailadress',
      },
    ],
  },
  text: {
    isRequired: false,
    rules: [],
  },
  personalNumber: {
    isRequired: false,
    rules: [
      {
        method: 'isNumeric',
        validWhen: true,
        message: 'Enbart siffror i ett personnummer',
      },
      {
        method: 'isLength',
        args: {
          options: {
            min: 12,
            max: 12,
          },
        },
        validWhen: true,
        message: 'Ange personnummer med 12 siffror',
      },
    ],
  },
  number: {
    isRequired: true,
    rules: [
      {
        method: 'isNumeric',
        args: {
          options: {
            no_symbols: true,
          },
        },
        validWhen: true,
        message: 'Du har angett en siffra som är mindre än 1',
      },
      {
        method: 'isPostalCode',
        args: {
          locale: 'SE',
        },
        validWhen: true,
        message: 'Postnummret du angav är inte giltligt',
      },
    ],
  },
  phonenumber: {
    isRequired: true,
    rules: [
      {
        method: 'isEmpty',
        validWhen: false,
        message: 'Du får inte lämna detta fält tomt',
      },
      {
        method: 'isMobilePhone',
        args: {
          locale: 'sv-SE',
        },
        validWhen: true,
        message: 'Numret du angav är inte ett giltigt telefonnummer',
      },
    ],
  },
  postalcode: {
    isRequired: false,
    rules: [
      {
        method: 'isNumeric',
        args: {
          options: {
            no_symbols: true,
          },
        },
        validWhen: true,
        message: 'Du har angett en siffra som är mindre än 1',
      },
      {
        method: 'isPostalCode',
        args: {
          locale: 'SE',
        },
        validWhen: true,
        message: 'Postnummret du angav är inte giltligt',
      },
    ],
  },
};

export default ValidationFieldRules;
