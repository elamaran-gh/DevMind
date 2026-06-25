import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'

const WorkspacePage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Chat state
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: 'Hi! Paste your error or describe your bug. I will read your code, check recent commits, search the web, and give you an exact fix.'
    }
  ])
  const [input, setInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Notes state
  const [notes, setNotes] = useState([])

  // File tree state
  const [fileTree, setFileTree] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState('')
  const [fileLoading, setFileLoading] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [projectId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const res = await api.get('/projects')
      const found = res.data.data.find((p) => p._id === projectId)
      if (!found) {
        navigate('/dashboard')
        return
      }
      setProject(found)
    } catch (err) {
      console.error(err)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || chatLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setChatLoading(true)

    // Placeholder — agent loop comes next phase
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content: '🔧 Agent is not connected yet. This is the workspace UI. Agent loop coming next.'
        }
      ])
      setChatLoading(false)
    }, 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading workspace...</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ← Back
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">🧠</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">
              {project?.name}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {project?.repoOwner}/{project?.repoName}
          </span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          Workspace
        </span>
      </nav>

      {/* Three panel layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL — File Tree */}
        <div className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Files
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {project?.repoOwner}/{project?.repoName}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {fileTree.length === 0 ? (
              <div className="text-center pt-8">
                <p className="text-xs text-gray-400">
                  File tree loads when agent connects
                </p>
              </div>
            ) : (
              fileTree.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file.path)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs truncate transition-colors ${
                    selectedFile === file.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  📄 {file.path}
                </button>
              ))
            )}
          </div>
        </div>

        {/* MIDDLE PANEL — Agent Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Chat header */}
          <div className="px-6 py-3 border-b border-gray-100 bg-white shrink-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Agent Chat
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'agent' && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5">
                    <span className="text-white text-xs">🧠</span>
                  </div>
                )}
                <div
                  className={`max-w-lg px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2 shrink-0">
                  <span className="text-white text-xs">🧠</span>
                </div>
                <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 bg-white border-t border-gray-200 shrink-0">
            <div className="flex gap-3 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your bug or paste your error..."
                rows={2}
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
              />
              <button
                onClick={handleSend}
                disabled={chatLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* RIGHT PANEL — Notes */}
        <div className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Saved Solutions
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Auto-saved by agent
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {notes.length === 0 ? (
              <div className="text-center pt-8">
                <p className="text-xs text-gray-400">
                  Solutions appear here after agent fixes a bug
                </p>
              </div>
            ) : (
              notes.map((note, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-100"
                >
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {note.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {note.solution}
                  </p>
                  {note.file && (
                    <p className="text-xs text-blue-500 mt-1">
                      {note.file}{note.line ? `:${note.line}` : ''}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default WorkspacePage