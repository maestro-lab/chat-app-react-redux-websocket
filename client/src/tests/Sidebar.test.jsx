import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

describe('Sidebar', () => {
  it('renders users', () => {
    render(<Sidebar users={['user1', 'user2']} currentUser="user1" />);
    expect(screen.getByText('Users (2)')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
  });
});