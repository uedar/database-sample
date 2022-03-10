import React, { memo, useState, useEffect, createContext } from 'react'
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
import CellTable from './CellTable'

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
        // FileDownloader.downloadJSon(detailData, `${displayAtoms.uuid}.json`)
        DetailDataCleaner.getCell(detailData).map((row) => {
            // console.log(row.axis)
        }
        )
    }
    // const getData = async () => {
    //     const response = await fetch(`data/${displayAtoms.detail_path}`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }
    //     )
    //     const data = await response.json()
    //     console.log(data)
    //     setDetailData(data["1"])
    // }
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
    // useEffect(() => {
    //     getData()
    // }, [])
    // const cell = DetailDataCleaner.getCell(detailData)
    console.log(detailData.energy)
    return (
        typeof detailData.energy != "undefined" ?
            <div>
                <DetailDataContext.Provider value={detailData}>
                    {/* <h3>energy: {detailData ? detailData.energy : 0}</h3> */}
                    {<h3>energy: {detailData.energy}</h3>}
                    <CellTable></CellTable>
                </DetailDataContext.Provider>
                <button onClick={() => hundleClick()}>Download</button>
            </div>
            : <div>a</div>

    )
}

const AtomsDetail = () => {
    return (
        <AtomsDetailTable />
    );
};
export default AtomsDetail;
