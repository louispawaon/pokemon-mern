import { render} from '@testing-library/react';
import PokemonCard from '../components/Pokemon/PokemonCard';
// import { typeColors } from '../utils/typeColors';

describe('PokemonCard', () => {
  const props = {
    name: 'Pikachu',
    types: ['Electric', 'Ghost'],
    artwork_url: 'https://example.com/pikachu.png',
    base_exp: 100,
  };

  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<PokemonCard {...props} />);
    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(`EXP ${props.base_exp}`)).toBeInTheDocument();
    expect(getByAltText(props.name)).toBeInTheDocument();
  });

  it('renders artwork image correctly', () => {
    const { getByAltText } = render(<PokemonCard {...props} />);
    const image = getByAltText(props.name);
    expect(image).toHaveAttribute('src', props.artwork_url);
  });

  it('renders EXP text correctly', () => {
    const { getByText } = render(<PokemonCard {...props} />);
    const expText = getByText(`EXP ${props.base_exp}`);
    expect(expText).toBeInTheDocument();
    expect(expText).toHaveClass('text-pokemonGold-600');
  });

  it('renders name text correctly', () => {
    const { getByText } = render(<PokemonCard {...props} />);
    const nameText = getByText(props.name);
    expect(nameText).toBeInTheDocument();
    expect(nameText).toHaveClass('font-bold text-3xl capitalize font-gillSans');
  });
});