type TCustomErrorMessages = Record<string, string>;

interface IJoiConfig {
  customMessages: TCustomErrorMessages;
}

const joiConfig: IJoiConfig = {
  customMessages: {
    'any.required': '[{#label}]: is required',

    'string.base': '[{#label}]: must be a string',
    'string.min': '[{#label}]: must have at least `{#limit}` characters',
    'string.max': '[{#label}]: must have at most `{#limit}` characters',
    'string.email': '[{#label}]: must be a valid email',
    'string.guid': '[{#label}] must be a valid GUID',

    'array.min': '[{#label}]: must have at least `{#limit}` item(s)',
  },
};

export { joiConfig };
