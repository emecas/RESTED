// Removed: import { getFormValues } from 'redux-form';

export const getPlaceholderUrl = state => state.request.placeholderUrl;
export const getResponse = state => state.request.response;
export const getInterceptedResponse = state => state.request.interceptedResponse;
export const getRedirectChain = state => state.request.redirectChain;
export const getLoading = state => state.request.loading;

// Replace the following with your new form state selectors
export const getBodyType = state => state.request.bodyType;
export const getHeaders = state => state.request.headers;
