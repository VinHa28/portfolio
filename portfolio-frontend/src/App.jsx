function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          🎉 Tailwind CSS
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Installed successfully!
        </p>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
          Awesome! 🚀
        </button>
      </div>
    </div>
  )
}

export default App