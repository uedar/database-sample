import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './App.css';
import { Metadata } from './Metadata'
import {
    Link
} from "react-router-dom";

interface AtomsProps {
    display_name: string,
    type: string,
    calculator: string,
    functional: string,
    notes: string
}


const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        renderCell: (params: any) => {
            console.log(params)
            return (<Link to={params.row.id}>{params.value}</Link>)
        }
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 150,
    },
    {
        field: 'calculator',
        headerName: 'Calculator',
        width: 150,
    },
    {
        field: 'functional',
        headerName: 'Functional',
        width: 150,
    },
    {
        field: 'notes',
        headerName: 'notes',
        width: 150,
    },
];


const rows = Metadata.map((atoms, index) => {
    return (
        {
            id: atoms.uuid,
            name: atoms.display_name,
            type: atoms.type,
            calculator: atoms.calculator,
            functional: atoms.functional,
            notes: atoms.notes
        }
    )
})


function AtomsList() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default AtomsList;
