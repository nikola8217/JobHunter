import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Button, Box } from "@mui/material";
import { listUsers, deleteUser } from "../../../redux/actions/userActions";
import useListTable from "../../../custom-hooks/useListTable";

const UsersTable = () => {
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
    } = useListTable(listUsers, deleteUser, state => state.userList, state => state.userDelete);

    const handleEdit = (id) => {
        dispatch({ type: 'USER_UPDATE_RESET' });
        navigate(`/usersForm/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id)).then(() => {
                dispatch(listUsers());
            });
        }

    };

    return (
        <>
            {
                loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
                error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <Typography variant="h5" sx={{ textAlign: 'left' }}>Users</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '100px' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', width: '300px' }}>Name</TableCell>
                                        <TableCell sx={{ color: 'white', width: '300px' }}>Email</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Is admin</TableCell>
                                        <TableCell sx={{ color: 'white', textAlign: 'right' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.isAdmin ? 'true' : 'false'}</TableCell>
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

export default UsersTable;
