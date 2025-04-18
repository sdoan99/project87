import { render, screen } from '@testing-library/react';
import { PriceTicker } from '../index';

// Mock the useFinnhubRealtime hook to simulate a price update
jest.mock('../../../hooks/useFinnhubRealtime', () => ({
  useFinnhubRealtime: (_symbol: string, onPrice: (price: number) => void) => {
    setTimeout(() => onPrice(123.45), 10);
  },
}));

describe('PriceTicker', () => {
  it('renders the symbol and updates with live price', async () => {
    render(<PriceTicker symbol="AAPL" />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    // Wait for the price to update
    const price = await screen.findByText('123.45');
    expect(price).toBeInTheDocument();
  });
});
