import React, { memo, useState, useEffect, createContext } from 'react'
import './App.css';
import {
    useParams,
} from "react-router-dom";
import { Metadata } from './Metadata'
import FileDownloader from './FileDownloader'
import CellTable from './CellTable'
import Three from './Three'

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

export const DetailDataContext = createContext({} as any)
const AtomsDetailTable = () => {
    const { id } = useParams<UniqueId>()

    const displayAtoms: any = Metadata.find((atoms) =>
        atoms.uuid === id)
    const [detailData, setDetailData] = useState<any>([])
    const hundleClick = () => {
        FileDownloader.downloadJSon(detailData, `${displayAtoms.uuid}.json`)
    }

    useEffect(() => {
        const data = async () => {
            const response = await fetch(`data/${displayAtoms.detail_path}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
            const data = await response.json();
            await setDetailData(data["1"])
        }
        data()
    }, []);
    return (
        typeof detailData.energy != "undefined" ?
            <div>
                <DetailDataContext.Provider value={detailData}>
                    <h1>{displayAtoms.display_name}</h1>
                    <h2>Key and Values</h2>
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">key</TableCell>
                                    <TableCell align="right">value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(detailData).map((key: any, idx: any) => (
                                    <TableRow>
                                        <TableCell align="right">{key}</TableCell>
                                        <TableCell align="right">{JSON.stringify(detailData[key])}</TableCell>
                                    </TableRow>
                                ))}
                                {/* <TableRow>
                                    <TableCell align="right">Energy</TableCell>
                                    <TableCell align="right">{detailData.energy}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Calculator</TableCell>
                                    <TableCell align="right">{displayAtoms.calculator}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Calculator parameters</TableCell>
                                    <TableCell align="right">{JSON.stringify(detailData.calculator_parameters)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">User</TableCell>
                                    <TableCell align="right">{detailData.user}</TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <h2>Cell</h2>
                    <CellTable></CellTable>
                    <h2>Structure</h2>
                    <Three></Three>
                </DetailDataContext.Provider>
                <button onClick={() => hundleClick()}>Download</button>

            </div>
            : <div></div>

    )
}

const AtomsDetail = () => {
    return (
        <AtomsDetailTable />

    );
};
export default AtomsDetail;
