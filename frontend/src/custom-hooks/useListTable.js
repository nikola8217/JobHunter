import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from '../styles/styles';

const useListTable = (listAction, deleteAction, listState, deleteState) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, data, error } = useSelector(state => listState(state));
  const { userInfo } = useSelector(state => state.userLogin);
  const { success: successDelete } = useSelector(state => deleteState(state));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listAction());
    } else {
      navigate('/');
    }
  }, [userInfo, dispatch, navigate, listAction]);

  useEffect(() => {
    if (successDelete) {
      dispatch(listAction());
    }
  }, [dispatch, listAction, successDelete]);

  const rows = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return {
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
    rows,
  };
};

export default useListTable;