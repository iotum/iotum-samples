import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'credentials';
const EMPTY = { token: null, domain: null, hostId: null };

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || EMPTY;
  } catch (err) {
    console.error('Error loading credentials from localStorage:', err);
    return EMPTY;
  }
};

let credentials = load();
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getCredentials = () => credentials;

/**
 * Saves the credentials to localStorage and re-renders the components using them.
 * @param {{ token: string | null, domain: string | null, hostId: string | null }} value
 */
export const setCredentials = (value) => {
  credentials = value;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    console.error('Error saving credentials to localStorage:', err);
  }
  listeners.forEach((listener) => listener());
};

export const clearCredentials = () => setCredentials(EMPTY);

/** @returns {{ token: string | null, domain: string | null, hostId: string | null }} */
export const useCredentials = () => useSyncExternalStore(subscribe, getCredentials);
