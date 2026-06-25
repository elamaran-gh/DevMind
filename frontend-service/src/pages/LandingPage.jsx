import { Link } from "react-router-dom"

const LandingPage = () => {
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
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
            Sign in
          </Link>
          <Link to="/register" className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-8 pt-20 pb-16">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🧠</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          Your AI agent that debugs <br /> your code for you
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Paste your error. Connect your GitHub repo. DevMind reads your actual 
          code, checks recent commits, searches the web, and gives you a fix 
          with the exact file and line number — automatically.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors"
        >
          Create free account
        </Link>
      </section>

      {/* Problem it solves */}
      <section className="max-w-4xl mx-auto px-8 pb-16">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
          What problem does DevMind solve?
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-3">🔍</div>
            <h4 className="font-semibold text-gray-900 mb-1">Context gathering</h4>
            <p className="text-sm text-gray-500">
              Developers waste 30–40 minutes just gathering context before 
              writing a single line of code.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-3">🌐</div>
            <h4 className="font-semibold text-gray-900 mb-1">Scattered information</h4>
            <p className="text-sm text-gray-500">
              Your code is on GitHub, solutions are on the web, and past fixes 
              are nowhere. No single tool connects all three.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-3">🤖</div>
            <h4 className="font-semibold text-gray-900 mb-1">Manual debugging</h4>
            <p className="text-sm text-gray-500">
              You copy-paste code into ChatGPT manually every single time 
              with no memory of your project context.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-8 pb-16">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
          How it works
        </h3>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <span className="text-blue-600 font-bold text-lg">01</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Connect your GitHub repo</h4>
              <p className="text-sm text-gray-500">
                Create a project and paste your repo URL and GitHub token. 
                DevMind reads your file structure instantly.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <span className="text-blue-600 font-bold text-lg">02</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Paste your error</h4>
              <p className="text-sm text-gray-500">
                Type your bug in the chat. The agent reads your code, checks 
                recent commits, and searches the web — all on its own.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <span className="text-blue-600 font-bold text-lg">03</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Get an exact fix</h4>
              <p className="text-sm text-gray-500">
                Agent gives you the fix with the exact file name and line number. 
                Solution is automatically saved to your project notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center px-8 pb-20">
        <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Ready to debug smarter?
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Connect your repo and let the agent do the investigation for you.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Create account
            </Link>
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        © 2026 DevMind. Built for developers.
      </footer>

    </div>
  )
}

export default LandingPage