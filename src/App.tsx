import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Anime from "@/pages/Anime"
import AnimeDetail from '@/pages/AnimeDetail'
import NotFound from "@/pages/NotFound"
import DarkMode from '@/components/DarkMode'
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalProvider } from "@/context/GlobalContext"
import { FaGithub } from 'react-icons/fa'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <GlobalProvider>
        <Router>
          <div className="app">
            <nav className="fixed top-0 left-0 w-full h-[65px] flex justify-between items-center border-b bg-[#ffffff80] dark:bg-[#00000080] backdrop-blur-xs z-[50]">
              <div className="h-[65px] lg:max-w-7xl w-full flex justify-between items-center m-auto px-4">
                <Link to="/" className="cursor-pointer hover:opacity-80">
                  <span className="text-lg font-semibold"><span className="text-red-400">Oni</span>Search</span>
                </Link>
                <div className="flex items-center gap-4 text-sm!">
                  <Link className="text-primary cursor-pointer hover:opacity-80" to="/">Anime</Link>
                  <Link className="text-primary cursor-pointer hover:opacity-80" to="https://github.com/Yapphy26/anime-search-app" target="_blank"><FaGithub fontSize={20} /></Link>
                  <DarkMode />
                </div>
              </div>
            </nav>
            <main className="mt-[65px] min-h-[calc(100vh-65px-50px)] py-12">
              <Routes>
                <Route path="/" element={<Anime />} />
                <Route path="/detail/:id" element={<AnimeDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <footer className="relative w-full h-[50px] flex flex-col justify-center items-center border-t backdrop-blur-xs px-5 py-3 z-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Yapphy Yong.</p>
            </footer>
          </div>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default App