import React, { memo, useState, useEffect } from 'react'
import './App.css';
import {
    useParams,
} from "react-router-dom";
import { Metadata } from './Metadata'
import FileDownloader from './FileDownloader'
import DetailDataCleaner from './DetailDataCleaner'

type UniqueId = {
    id: string;
};



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
                            <h3>Calculator: {item1["calculator"]}</h3>
                            <h3>Energy: {item1["energy"]}</h3>
                            <br></br>
                            {Object.keys(item1).map((key, idx) => {
                                return (
                                    <p>{key}</p>
                                )
                            })}
                        </div>
                    )
                }
            })}
            <button onClick={() => hundleClick()}>Download</button>
            <button onClick={() => displayCell()}>Cell</button>
        </div >
    )
})

const AtomsDetail = () => {
    return (
        <AtomsDetailTable />
    );
};
export default AtomsDetail;
