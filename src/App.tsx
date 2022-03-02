import React from 'react';
import './App.css';
import AtomsDetail from './AtomsDetail';
import AtomsList from './AtomsList';
import {
  BrowserRouter,
  Route,
  useParams,
  Routes,
  Link,
} from "react-router-dom";


class App extends React.Component {
  render(): React.ReactNode {
    return (

      <BrowserRouter>
        <h1>Sample Database Page</h1>
        <Routes>
          <Route path="/database-sample/" element={<AtomsList />}>
          </Route>
          <Route path="/database-sample/:id" element={<AtomsDetail />} />
        </Routes>
      </BrowserRouter >

    )
  }

}
export default App;
