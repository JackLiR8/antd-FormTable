import { render, screen } from '@testing-library/react';
import FormTable from '../index';

describe('FormTable', () => {
  test('should render the component', () => {
    render(<FormTable />);
    expect(screen.getByText('FormTable')).toBeTruthy();
  });
});