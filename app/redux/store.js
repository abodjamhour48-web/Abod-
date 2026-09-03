import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import settingsReducer from './slices/settingsSlice';
import machineReducer from './slices/machineSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    settings: settingsReducer,
    machine: machineReducer,
  },
});

export default store;
