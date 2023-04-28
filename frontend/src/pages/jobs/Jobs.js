import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { listJobs } from '../../redux/actions/jobActions';
import { listCompanies } from '../../redux/actions/companyActions';
import { listTechnologies } from '../../redux/actions/technologyActions';
import { listLevels } from '../../redux/actions/levelActions';
import JobList from '../../components/job/JobList';


const Jobs = () => {
  const [company, setCompany] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");

  const dispatch = useDispatch();
  const { loading, data: jobs, error } = useSelector(state => state.jobList);
  const { data: companies } = useSelector(state => state.companyList);
  const { data: technologies } = useSelector(state => state.technologyList);
  const { data: levels } = useSelector(state => state.levelList);
  

  useEffect(() => {
    dispatch(listCompanies())
    dispatch(listTechnologies());
    dispatch(listLevels());
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ p: 2, marginBottom: '70px' }}>
      <Select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        variant="outlined"
        style={{ width: '100%', marginBottom: '25px', background: 'white' }}
        displayEmpty
      >
        <MenuItem value="">
          Select company
        </MenuItem>
          {
            companies.map((company) => {
              return <MenuItem value={company._id}>{company.name}</MenuItem>
            })
          }
        </Select>
        <Select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          variant="outlined"
          style={{ width: '100%', marginBottom: '25px', background: 'white' }}
          displayEmpty
        >
          <MenuItem value="">
            Select technology
          </MenuItem>
          {
            technologies.map((technology) => {
              return <MenuItem value={technology._id}>{technology.name}</MenuItem>
            })
          }
        </Select>
        <Select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          variant="outlined"
          style={{ width: '100%', marginBottom: '25px', background: 'white' }}
          displayEmpty
        >
          <MenuItem value="">
            Select level
          </MenuItem>
          {
            levels.map((level) => {
              return <MenuItem value={level._id}>{level.name}</MenuItem>
            })
          }
        </Select>
      </Box>
      <JobList jobs={jobs} loading={loading} error={error} />
      {/* <CompanyList companies={data} loading={loading} error={error} /> */}
    </>
  )
}

export default Jobs