import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material';
import Navbar from './components/shared/Navbar';
import Companies from './pages/companies/Companies';
import CompanyDetails from './components/company/CompanyDetails';
import Jobs from './pages/jobs/Jobs';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container sx={{ marginTop: '150px' }}>
          <Routes>
            <Route path='/' element={<Jobs />} exact/>
            <Route path='/companies' element={<Companies />} />
            <Route path='/companies/:id' element={<CompanyDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </Container>
      </Router>
    </>
    
  );
}

export default App;
