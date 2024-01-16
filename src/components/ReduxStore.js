import { createStore } from 'redux';

const SET_CREDENTIALS = 'SET_CREDENTIALS';

export const setCredentials = (credentials) => ({
  type: SET_CREDENTIALS,
  payload: credentials
});

// Function to load credentials from localStorage
const loadCredentials = () => {
  try {
    const serializedCredentials = localStorage.getItem('credentials');
    if (serializedCredentials) {
      return JSON.parse(serializedCredentials);
    }
  } catch (err) {
    console.error("Error loading credentials from localStorage:", err);
  }
  return {
    token: null,
    domain: null,
    hostId: null
  };
};

// Initialize state from localStorage
const initialState = {
  credentials: loadCredentials(),
};

const credentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDENTIALS: {
      const newCredentials = action.payload;
      // Save updated credentials to localStorage
      try {
        const serializedCredentials = JSON.stringify(newCredentials);
        localStorage.setItem('credentials', serializedCredentials);
      } catch (err) {
        // Handle errors, e.g., localStorage not available
        console.error("Error saving data to localStorage", err);
      }
      return { ...state, credentials: newCredentials };
    }
    default:
      return state;
  }
};

// Create store
const store = createStore(credentialsReducer);

export default store;
