import { createSlice } from "@reduxjs/toolkit"

const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        loading: false,
        error: null
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        addProject: (state, action) => {
            state.projects.unshift(action.payload)
        },
        removeProject: (state, action) => {
            state.projects = state.projects.filter(
                (p) => p._id !== action.payload
            )
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setProjects, addProject, removeProject, setLoading, setError } = projectsSlice.actions
export default projectsSlice.reducer