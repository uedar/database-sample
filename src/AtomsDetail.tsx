import React, { memo, useState, useEffect } from 'react'
import './App.css';
import {
    useParams,
} from "react-router-dom";
import { Metadata } from './Metadata'
import FileDownloader from './FileDownloader'
import DetailDataCleaner from './DetailDataCleaner'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type UniqueId = {
    id: string;
};


function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const AtomsDetailTable = memo(() => {
    const { id } = useParams<UniqueId>()

    const displayAtoms: any = Metadata.find((atoms) =>
        atoms.uuid === id)
    const [detailData, setDetailData] = useState<any[]>([])
    const hundleClick = () => {
        FileDownloader.downloadJSon(detailData, `${displayAtoms.uuid}.json`)
    }
    const displayCell = () => {
        console.log(DetailDataCleaner.getCell(detailData["1"]))
    }
    const getData = () => {
        fetch(`data/${displayAtoms.detail_path}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setDetailData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])

    const array = [detailData]
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Calculator</th>
                        <th>Functional</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{displayAtoms.display_name}</td>
                        <td>{displayAtoms.type}</td>
                        <td>{displayAtoms.calculator}</td>
                        <td>{displayAtoms.functional}</td>
                        <td>{displayAtoms.notes}</td>
                    </tr>
                </tbody>
            </table>
            {array.map((item: any) => {
                const item1: any = item["1"]
                if (item1) {
                    return (
                        <div>
                            <h3>Energy: {item1["energy"]}</h3>
                        </div>
                    )
                }
            })}
            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <button onClick={() => hundleClick()}>Download</button>
        </div >
    )
})

const AtomsDetail = () => {
    return (
        <AtomsDetailTable />
    );
};
export default AtomsDetail;
