import './App.css';
import NavBar from './components/navbar';
import Container from './components/container';
import {
  BrowserRouter as Router
} from 'react-router-dom';
function App() {
  return (
    <Router>
      <NavBar/>
      <Container/>
    </Router>
  );
}

export default App;
