import React from 'react';
import './App.css';
import { Metadata } from './Metadata'
import {
    BrowserRouter,
    Route,
    useParams,
    Routes,
    Link,
} from "react-router-dom";

interface AtomsProps {
    display_name: string,
    type: string,
    calculator: string,
    functional: string,
    notes: string
}


const DisplayData = Metadata.map((atoms, index) => {
    return (
        <tr>
            <td><Link to={atoms.uuid}>{atoms.display_name}</Link></td>
            <td>{atoms.type}</td>
            <td>{atoms.calculator}</td>
            <td>{atoms.functional}</td>
            <td>{atoms.notes}</td>
        </tr>
    )
})

const AtomsList = () => {
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
                    {DisplayData}
                </tbody>
            </table>

        </div >

    )

}
export default AtomsList;
