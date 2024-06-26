import PokemonList from '../components/Pokemon/PokemonList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <div className="h-screen">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
        <PokemonList />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Home;

