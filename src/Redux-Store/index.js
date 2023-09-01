import { configureStore, createSlice } from '@reduxjs/toolkit';
import { withLatestChanges } from 'react-redux';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    userId: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    setExpenses(state, action) {
      return action.payload;
    },
    addExpense(state, action) {
      state.push(action.payload);
    },
    deleteExpense(state, action) {
      return state.filter((expense) => expense.id !== action.payload);
    },
    updateExpense(state, action) {
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expenses: expensesSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const expensesActions = expensesSlice.actions;
export default store;