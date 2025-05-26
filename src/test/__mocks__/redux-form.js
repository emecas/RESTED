// src/__mocks__/redux-form.js

// Mimic common action types as an empty object or dummy values
export const actionTypes = {
  // You can add specific action types if the app relies on their string values
};

// Mock formValueSelector: returns a function that returns undefined for any field
export const formValueSelector = (formName) => (state, field) => {
  console.warn(`[REDUX-FORM MOCK] formValueSelector called for form: ${formName}, field: ${field}`);
  return undefined; // Or a default value if your app expects one
};

// Mock getFormSyncErrors: returns a function that returns an empty object (no errors)
export const getFormSyncErrors = (formName) => (state) => {
  console.warn(`[REDUX-FORM MOCK] getFormSyncErrors called for form: ${formName}`);
  return {}; // Return an empty object for no errors
};

// Mock reducer: A simple identity function (doesn't modify state)
export const reducer = (state = {}, action) => {
  console.warn('[REDUX-FORM MOCK] reducer called');
  return state;
};

// Mock SubmissionError class
export class SubmissionError extends Error {
  constructor(errors) {
    super('Submission Error (mocked)');
    this.errors = errors;
    console.warn('[REDUX-FORM MOCK] SubmissionError instantiated with errors:', errors);
  }
}

// Mock the main `reduxForm` higher-order component (HOC)
// It simply returns the wrapped component without adding any Redux Form logic
export const reduxForm = (config) => (WrappedComponent) => {
  console.warn('[REDUX-FORM MOCK] reduxForm HOC called with config:', config);
  return WrappedComponent; // Simply pass through the component
};

// Add any other named exports if your application code tries to import them from 'redux-form'
// export const someOtherFunction = () => { console.warn('[REDUX-FORM MOCK] someOtherFunction called'); };