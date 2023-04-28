import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import Navbar from './components/shared/Navbar';
import Companies from './pages/companies/Companies';
import CompanyDetails from './pages/companies/CompanyDetails';
import Jobs from './pages/jobs/Jobs';
import JobDetails from './pages/jobs/JobDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UsersTable from './pages/admin/tables/UsersTable';
import UsersForm from './pages/admin/forms/UsersForm';
import CompaniesTable from './pages/admin/tables/CompaniesTable';
import CompanyForm from './pages/admin/forms/CompanyForm';
import TechnologiesTable from './pages/admin/tables/TechnologiesTable';
import TechnologyForm from './pages/admin/forms/TechnologyForm';
import LevelsTable from './pages/admin/tables/LevelsTable';
import LevelForm from './pages/admin/forms/LevelForm';
import JobsTable from './pages/admin/tables/JobsTable';
import JobsForm from './pages/admin/forms/JobsForm';


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Container sx={{ marginTop: '150px' }}>
          <Routes>
            <Route path='/' element={<Jobs />} exact/>
            <Route path='/jobs/:id?' element={<JobDetails />} />
            <Route path='/companies' element={<Companies />} />
            <Route path='/companies/:id' element={<CompanyDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            {/* ADMIN */}
            <Route path='/users' element={<UsersTable />} />
            <Route path='/usersForm/:id' element={<UsersForm />} />
            <Route path='/companiesAdmin' element={<CompaniesTable />} />
            <Route path='/companyForm/:id?' element={<CompanyForm />} />
            <Route path='/technologies' element={<TechnologiesTable />} />
            <Route path='/technologyForm/:id?' element={<TechnologyForm />} />
            <Route path='/levels' element={<LevelsTable />} />
            <Route path='/levelForm/:id?' element={<LevelForm />} />
            <Route path='/jobsAdmin' element={<JobsTable />} />
            <Route path='/jobForm/:id?' element={<JobsForm />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
      
    </>
    
  );
}

export default App;
