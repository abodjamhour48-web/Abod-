import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // إضافة مشروع جديد
    addProject: (state, action) => {
      state.projects.push({
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    },

    // تحديث مشروع
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // حذف مشروع
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },

    // تعيين المشروع الحالي
    setCurrentProject: (state, action) => {
      state.currentProject = state.projects.find(p => p.id === action.payload);
    },

    // استنساخ مشروع
    duplicateProject: (state, action) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        const newProject = {
          ...project,
          id: Date.now().toString(),
          name: `${project.name} (نسخة)`,
          createdAt: new Date().toISOString(),
        };
        state.projects.push(newProject);
      }
    },

    // تحميل المشاريع
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // حالة الخطأ
    setError: (state, action) => {
      state.error = action.payload;
    },

    // تعيين المشاريع
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const {
  addProject,
  updateProject,
  deleteProject,
  setCurrentProject,
  duplicateProject,
  setLoading,
  setError,
  setProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
