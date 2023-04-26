import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import Navbar from './components/shared/Navbar';
import Companies from './pages/companies/Companies';
import CompanyDetails from './pages/companies/CompanyDetails';
import Jobs from './pages/jobs/Jobs';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UsersTable from './pages/admin/tables/UsersTable';
import UsersForm from './pages/admin/forms/UsersForm';
import CompaniesTable from './pages/admin/tables/CompaniesTable';
import CompanyForm from './pages/admin/forms/CompanyForm';


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Container sx={{ marginTop: '150px' }}>
          <Routes>
            <Route path='/' element={<Jobs />} exact/>
            <Route path='/companies' element={<Companies />} />
            <Route path='/companies/:id' element={<CompanyDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            {/* ADMIN */}
            <Route path='/users' element={<UsersTable />} />
            <Route path='/usersForm/:id' element={<UsersForm />} />
            <Route path='/companiesAdmin' element={<CompaniesTable />} />
            <Route path='/companyForm/:id?' element={<CompanyForm />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
      
    </>
    
  );
}

export default App;
