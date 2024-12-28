import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterForm from './pages/Register';
import { ThemeProvider } from './components/ui/theme-provider';
import MultiStepForm from './pages/sections/MultiStep';
import EditAndPreview from './pages/edit-and-preview/EditAndPreview';

const App = () => {
  return (
    <ThemeProvider  storageKey="vite-ui-theme">
    <Router>
    <Routes>
      <Route path="/">
        <Route index element={<Home/>} />
        <Route path="register" element={<RegisterForm/>} />
        <Route path="resume-details" element={<MultiStepForm/>} />
        <Route path="edit-and-preview" element={<EditAndPreview/>} />
      </Route>
    </Routes>
  </Router>
  </ThemeProvider>
  )
}

export default App