import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Message from '../components/Message';

describe('Message', () => {
  it('renders message', () => {
    render(<Message message={{ username: 'test', content: 'Hello', created_at: '2024-01-01T12:00:00Z' }} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});