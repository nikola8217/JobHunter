import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Button, Box } from "@mui/material";
import useStyles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../../../redux/actions/userActions";

const UsersTable = () => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, users, error } = useSelector((state) => state.userList);
    const { userInfo } = useSelector(state => state.userLogin);
    const { success: successDelete } = useSelector(state => state.userDelete);

    useEffect(() => {
        // alert(1);
        if (userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/');
        }
    }, [userInfo, dispatch, navigate]);

    const rows = users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                        {/* <Button variant="contained" color="success" sx={{ textAlign: 'right' }} onClick={() => handleCreate()}>Add new user</Button> */}
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
                            count={users?.length}
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
