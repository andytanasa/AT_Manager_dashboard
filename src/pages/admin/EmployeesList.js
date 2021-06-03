import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ModalUserEdit from "../../components/ModalUserEdit";
import useModal from "../../hooks/useModal";

import firebase from "../../firebase";
import { Button, ButtonGroup, Typography } from "@material-ui/core";

const columns = [
  {
    id: "firstName",
    label: "First Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "age",
    label: "Age",
    minWidth: 30,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
    align: "right",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 30,
    align: "right",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
  },
  {
    id: "actions",
    minWidth: 50,
    align: "right",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

export default function EmployeesList() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [usersInfo, setUsersInfo] = useState([]);

  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { isShowing, toggle } = useModal();
  const db = firebase.firestore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!firebase) return;
        const usersRef = db.collection("users");
        const docs = await usersRef.get();

        let allUsers = [];
        let userIdFromDB = [];
        docs.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          allUsers.push(data);
          userIdFromDB.push(data.id);
        });

        setUsersInfo(allUsers);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchUsers();
  }, [db]);

  useEffect(() => {
    if (userId) {
      toggle();
    }
  }, [userId, toggle]);

  const handleEditPress = (userId) => {
    setUserId(userId);
  };

  useEffect(() => {
    const displayBtn = (userId) => {
      return (
        <>
          <ButtonGroup aria-label="outlined button group">
            <Button onClick={() => handleEditPress(userId)} color="primary">
              Edit
            </Button>
            <Button onClick={() => deleteUserFromDb(userId)} color="secondary">
              Delete
            </Button>
          </ButtonGroup>
        </>
      );
    };
    setIsLoading(true);
    const newRows = [];
    usersInfo.forEach((user) => {
      newRows.push({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        age: user?.age,
        email: user.email,
        gender: user?.gender,
        actions: displayBtn(user.id),
      });
      setRows(newRows);
    });
    const deleteUserFromDb = (id) => {
      let newListAfterDelete = [];
      db.collection("users").doc(id).delete();
      newListAfterDelete = usersInfo.filter((item) => item.id !== id);
      setUsersInfo(newListAfterDelete);
    };
  }, [usersInfo, db]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              <Typography variant="subtitle2">
                Wait I'm Loading the user for you
              </Typography>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ModalUserEdit
        userId={userId}
        isShowing={isShowing}
        hide={() => {
          setUserId(null);
          toggle();
        }}
      />
    </Paper>
  );
}
