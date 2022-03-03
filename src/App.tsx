import React from 'react'
import './App.css'
import AtomsDetail from './AtomsDetail'
import AtomsList from './AtomsList'
import Header from './components/Header'
import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom"
import { Grid } from '@material-ui/core'

class App extends React.Component {
  render(): React.ReactNode {
    return (

      <BrowserRouter>
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>
          <Routes>
            <Route path="/database-sample/" element={<AtomsList />}>
            </Route>
            <Route path="/database-sample/:id" element={<AtomsDetail />} />
          </Routes>
        </Grid >
      </BrowserRouter >

    )
  }

}
export default App;
