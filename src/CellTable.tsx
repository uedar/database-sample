import React, { createContext, useContext, useState } from 'react'
import './App.css';
import DetailDataCleaner from './DetailDataCleaner';
import { DetailDataContext } from './AtomsDetail';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const CellTable = () => {
    const detailData = useContext(DetailDataContext)
    const cell = DetailDataCleaner.getCell(detailData)
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Axis</TableCell>
                        <TableCell align="right">x</TableCell>
                        <TableCell align="right">y</TableCell>
                        <TableCell align="right">z</TableCell>
                        <TableCell align="right">periodic</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cell.map((row) => (
                        <TableRow>
                            <TableCell align="right">{row.axis}</TableCell>
                            <TableCell align="right">{row.x}</TableCell>
                            <TableCell align="right">{row.y}</TableCell>
                            <TableCell align="right">{row.z}</TableCell>
                            <TableCell align="right">{row.periodic.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}
export default CellTable
