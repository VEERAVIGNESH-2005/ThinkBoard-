import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import CreatePages from './pages/CreatePages.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import Toaster from 'react-hot-toast'

const App = () => {
  return (
    <div className="relative h-full w-full" data-theme="forest">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>  
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePages />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
};

export default App;