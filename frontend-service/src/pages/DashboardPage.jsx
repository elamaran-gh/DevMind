import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser } from '../store/slices/authSlice'
import { setProjects, addProject, removeProject, setLoading, setError } from '../store/slices/projectsSlice'
import api from '../api/axiosInstance'
import folderImg from '../assets/folder.png'

const DashboardPage = () => {
  // UI-only local state
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState({ name: '', repoUrl: '', githubToken: '' })
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  // Redux state
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { projects, loading } = useSelector((state) => state.projects)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      dispatch(setLoading(true))
      const res = await api.get('/projects')
      dispatch(setProjects(res.data.data))
    } catch (err) {
      dispatch(setError(err.message))
      console.error('Failed to load projects', err)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCreate = async () => {
    if (!form.name || !form.repoUrl || !form.githubToken) {
      setFormError('Please fill all fields')
      return
    }
    try {
      setFormLoading(true)
      setFormError('')
      const res = await api.post('/projects', form)
      dispatch(addProject(res.data.data))
      setForm({ name: '', repoUrl: '', githubToken: '' })
      setShowModal(false)
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create project')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (e, projectId) => {
    e.stopPropagation()
    try {
      setDeleting(projectId)
      await api.delete(`/projects/${projectId}`)
      dispatch(removeProject(projectId))
    } catch (err) {
      console.error('Failed to delete project', err)
    } finally {
      setDeleting(null)
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(clearUser())
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-base">🧠</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">DevMind</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {user?.username || user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-sm border border-gray-200 hover:border-gray-300 text-white hover:bg-blue-700 font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-8 py-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-sm text-gray-500 mt-1">
              Each project connects to one GitHub repo
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            + New Project
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center text-gray-400 text-sm py-20">
            Loading projects...
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🧠</div>
            <p className="text-gray-500 text-sm">No projects yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              Create one to connect your GitHub repo and start debugging.
            </p>
          </div>
        )}

        {/* Project cards */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/workspace/${project._id}`)}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
  <img src={folderImg} alt="folder" className="w-6 h-6 object-contain" />
</div>
                  <button
                    onClick={(e) => handleDelete(e, project._id)}
                    disabled={deleting === project._id}
                    className="text-gray-300 hover:text-red-400 transition-colors text-lg disabled:opacity-40"
                  >
                    {deleting === project._id ? '...' : '×'}
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {project.name}
                </h3>
                <p className="text-xs text-gray-400 truncate mb-4">
                  {project.repoOwner}/{project.repoName}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-xs text-blue-600 font-medium">
                    Open →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-8">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">New Project</h3>
              <button
                onClick={() => { setShowModal(false); setFormError('') }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                {formError}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nova-Share"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  GitHub Repo URL
                </label>
                <input
                  type="text"
                  value={form.repoUrl}
                  onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                  placeholder="https://github.com/username/repo-name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  GitHub Token
                </label>
                <input
                  type="password"
                  value={form.githubToken}
                  onChange={(e) => setForm({ ...form, githubToken: e.target.value })}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Settings → Developer settings → Personal access tokens
                </p>
              </div>

              <button
                onClick={handleCreate}
                disabled={formLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                {formLoading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DashboardPage