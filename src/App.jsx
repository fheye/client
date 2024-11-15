import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/landing/index.jsx";
import Footer from "./components/Footer.jsx";
import './styles/output.css'
import ScrollToTop from './components/ScrollToTop.jsx'
import Uploader from './pages/uploader/index.jsx';
import Map from './pages/map/index.jsx';
import Dashboard from './pages/dashboard/index.jsx';
import FaceDetector from './pages/facedetector/index.jsx';

function App() {
  return (
      <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Navbar />
          <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/img' element={<Uploader />} />
              <Route path='/map' element={<Map />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/facedetection' element={<FaceDetector />} />
          </Routes>
          <Footer />
      </BrowserRouter>
  )
}

export default App