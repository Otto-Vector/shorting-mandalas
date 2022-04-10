export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
/////////////////////////////////////////////////////////////////////////////////
export const required = (value) => (value ? undefined : "Required")

const maxLength = (max) => (value) => ((value.length > max) ? `Over ${max} symbols!` : undefined);
export const maxLength30 = maxLength(30)

export const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);


