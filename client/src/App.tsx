import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import PokemonDetails from './components/Pokemon/PokemonDetails';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { isLoggedIn, logout } = useAuth();
  return (
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/pokemon/:id' Component={PokemonDetails}/>
        </Routes>
        <ToastContainer position='bottom-right'/>
      </Router>

  )
}

export default App

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import PokemonList from './components/Pokemon/PokemonList';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import PokemonDetails from './components/Pokemon/PokemonDetails';


// const App = () => {
//   const { isLoggedIn, logout } = useAuth();

//   return (
//     <Router>
      
//       <Routes>
//         <Route path="/" element={<PokemonList />} />
//         <Route path="/pokemon/:id" element={<PokemonDetails />} />
//       </Routes>
//     </Router>
//   );
// };

// const AppWithProvider = () => (
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );

// export default AppWithProvider;
