import React from 'react'
import './App.css'
import AtomsDetail from './AtomsDetail'
import AtomsList from './AtomsList'
import Header from './components/Header'
import {
  HashRouter,
  Route,
  Routes,
  Link
} from "react-router-dom"
import { Grid } from '@material-ui/core'

class App extends React.Component {
  render(): React.ReactNode {
    return (

      <HashRouter>
        <Grid container direction="column">
          <Grid item>
            <Header />
          </Grid>
          <Routes>
            <Route path="/" element={<AtomsList />}>
            </Route>
            <Route path="/:id" element={<AtomsDetail />} />
          </Routes>
        </Grid >
      </HashRouter>
    )
  }

}
export default App;
