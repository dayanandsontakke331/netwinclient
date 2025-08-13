import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button } from '@mui/material';


export default function ContactTable({ data, updateFn, deleteContat, filterBytype }) {
    const [filter, setFilter] = useState('personal')

    return (
        <div>
            <select value={filter} onChange={(e)=> {
                console.log("console.logfiltertype", e.target.value)
                filterBytype(e.target.value)
                setFilter(e.target.value)
            }}>
                <option value={""}>All</option>
                <option value={"personal"}>personal</option>
                <option value={"work"}>work</option>
            </select>
        <TableContainer component={Paper} sx={{ margin: "10px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"> {row.name}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">
                                <Button variant='outlined' onClick={() => updateFn(row)}>Update</Button>
                            </TableCell>

                            <TableCell align="right">
                                <Button variant='outlined' onClick={() => deleteContat(row)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}