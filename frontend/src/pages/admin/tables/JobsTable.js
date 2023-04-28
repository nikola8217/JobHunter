import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Button, Box } from "@mui/material";
import { getJobById, listJobs, deleteJob } from "../../../redux/actions/jobActions";
import useListTable from "../../../custom-hooks/useListTable";

const JobsTable = () => {
    const {
        classes,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        dispatch,
        navigate,
        loading,
        data,
        error,
        rows
    } = useListTable(listJobs, deleteJob, state => state.jobList, state => state.jobDelete);

    const handleEdit = (id) => {
        dispatch({type: 'JOB_CREATE_RESET'});
        dispatch({ type: 'JOB_UPDATE_RESET' });
        dispatch(getJobById(id));
        navigate(`/jobForm/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteJob(id)).then(() => {
                dispatch(listJobs());
            });
        }
    };

    const handleCreate = () => {
      dispatch({type: 'JOB_CREATE_RESET'});
      dispatch({ type: 'JOB_UPDATE_RESET' });
      navigate('/jobForm');
    };

    return (
        <>
            {
                loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
                error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <Typography variant="h5" sx={{ textAlign: 'left' }}>Jobs</Typography>
                        <Button variant="contained" color="success" sx={{ textAlign: 'right' }} onClick={() => handleCreate()}>Add new job</Button>
                    </Box>
                    <Box sx={{ marginBottom: '100px' }}>
                        {
                            data.length < 1 ? <Typography variant="h6" textAlign={'center'}>No Jobs</Typography> :
                            <>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead className={classes.tableHeader}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white', width: '300px' }}>Name</TableCell>
                                                <TableCell sx={{ color: 'white', width: '300px' }}>Company</TableCell>
                                                <TableCell sx={{ color: 'white', width: '300px' }}>Technology</TableCell>
                                                <TableCell sx={{ color: 'white', width: '300px' }}>Level</TableCell>
                                                <TableCell sx={{ color: 'white', textAlign: 'right' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows?.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell>{row?.name}</TableCell>
                                                <TableCell>{row?.company.name}</TableCell>
                                                <TableCell>{row?.technology.name}</TableCell>
                                                <TableCell>{row?.level.name}</TableCell>
                                                <TableCell align="right">
                                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                                        <Button variant="contained" color="primary" onClick={() => handleEdit(row._id)}>
                                                            Edit
                                                        </Button>
                                                        <Button variant="contained" color="error" onClick={() => handleDelete(row._id)}>
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={data?.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={{ backgroundColor: '#1976d2', color: 'white' }}
                                />
                            </>
                        }
                        
                    </Box>

                
                </>
            }
        
        </>
    );
};

export default JobsTable;
