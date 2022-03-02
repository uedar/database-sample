import React, { memo, useState, useEffect } from 'react'
import './App.css';
import {
    BrowserRouter,
    Route,
    useParams,
    Routes,
    Link,
} from "react-router-dom";
import { Metadata } from './Metadata'

type UniqueId = {
    id: string;
};

const Json = memo(() => {
    // const id = "377d76a98ebffa14989cb849675af9a8"
    const { id } = useParams<UniqueId>()
    const displayAtoms: any = Metadata.find((atoms) =>
        atoms.uuid === id)
    console.log(displayAtoms)
    const [posts, setPosts] = useState<any[]>([])
    const getData = () => {
        // fetch('./CO/co_1.json',
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
                setPosts(myJson)
            });
    }
    // console.log(displayAtoms?.detail_path)
    useEffect(() => {
        getData()
    }, [])
    const array = [posts]
    const Arr = () => {
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
                        console.log(item1["calculator"])
                        return (
                            <div>
                                <h3>Calculator: {item1["calculator"]}</h3>
                                <h3>Energy: {item1["energy"]}</h3>
                                <br></br>
                                {Object.keys(item1).map((key, value) => {
                                    return (
                                        <p>{key}</p>
                                    )
                                })}
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
    return (
        <Arr />
    )

})


function DetailInfo() {
    return (
        <div>
            <Json />
        </div>
    )

}

const AtomsDetail = () => {
    return (
        <DetailInfo />
    );
};
export default AtomsDetail;
