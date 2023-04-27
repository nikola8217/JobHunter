import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Button, Box } from "@mui/material";
import { getTechnologyById, listTechnologies, deleteTechnology } from "../../../redux/actions/technologyActions";
import useListTable from "../../../custom-hooks/useListTable";

const TechnologiesTable = () => {
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
    } = useListTable(listTechnologies, deleteTechnology, state => state.technologyList, state => state.technologyDelete);

    const handleEdit = (id) => {
        dispatch({type: 'TECHNOLOGY_CREATE_RESET'});
        dispatch({ type: 'TECHNOLOGY_UPDATE_RESET' });
        dispatch(getTechnologyById(id));
        navigate(`/technologyForm/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteTechnology(id)).then(() => {
                dispatch(listTechnologies());
            });
        }
    };

    const handleCreate = () => {
      dispatch({type: 'TECHNOLOGY_CREATE_RESET'});
      dispatch({ type: 'TECHNOLOGY_UPDATE_RESET' });
      navigate('/technologyForm');
    };

    return (
        <>
            {
                loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
                error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <Typography variant="h5" sx={{ textAlign: 'left' }}>Technologies</Typography>
                        <Button variant="contained" color="success" sx={{ textAlign: 'right' }} onClick={() => handleCreate()}>Add new technonolgy</Button>
                    </Box>
                    <Box sx={{ marginBottom: '100px' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', width: '300px' }}>Name</TableCell>
                                        <TableCell sx={{ color: 'white', textAlign: 'right' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.name}</TableCell>
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
                    </Box>

                
                </>
            }
        
        </>
    );
};

export default TechnologiesTable;
