import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import CompanyList from '../../components/company/CompanyList';
import { useDispatch, useSelector } from 'react-redux';
import { listCompanies } from '../../redux/actions/companyActions';

const Companies = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (name) => {
    dispatch(listCompanies(name));
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const dispatch = useDispatch();
  const { loading, companies, error } = useSelector(state => state.companyList);

  useEffect(() => {
    dispatch(listCompanies());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ p: 2, marginBottom: '70px' }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Company"
              value={searchValue}
              sx={{ background: "white" }}
              onChange={handleSearchValueChange}
              InputProps={{
                endAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" sx={{ height: "55px" }} onClick={() => handleSearch(searchValue)}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CompanyList companies={companies} loading={loading} error={error} />
    </>
  )
}

export default Companies