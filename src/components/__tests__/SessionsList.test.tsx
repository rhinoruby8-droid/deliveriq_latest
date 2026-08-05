/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Session } from '@/lib/cms-client';
import { SessionsList } from '../SessionsList';

// Mock the CMS hook
const mockCmsData = {
  paymentConfig: { currency: 'USD' },
  sessions: [] as Session[],
  speakers: [],
  sponsors: [],
};

vi.mock('@/lib/cms-client', async () => {
  const actual = await vi.importActual('@/lib/cms-client');
  return {
    ...actual,
    useCmsContent: () => ({
      data: mockCmsData,
    }),
  };
});

describe('SessionsList Pricing Display', () => {
  const queryClient = new QueryClient();

  const sampleUpcomingSession: Session = {
    id: 'test-upcoming',
    title: 'Upcoming AI Session',
    description: 'Learn AI tools for project delivery.',
    tag: 'Project Management',
    date: '2099-01-01',
    time: '10:00 UTC',
    duration: '60 min',
    status: 'published',
    speakerIds: [],
    sponsorIds: [],
    price: 49.99,
    replayPrice: 29.99,
    isFree: false,
  };

  const samplePastSession: Session = {
    id: 'test-past',
    title: 'Past Controls Session',
    description: 'Deep dive into EVM analysis.',
    tag: 'Project Controls',
    date: '2020-01-01',
    time: '10:00 UTC',
    duration: '90 min',
    status: 'published',
    speakerIds: [],
    sponsorIds: [],
    price: 99.99,
    replayPrice: 19.99,
    isFree: false,
  };

  const sampleFreeSession: Session = {
    id: 'test-free',
    title: 'Free Introductory Webinar',
    description: 'Intro to DeliverIQ platform.',
    tag: 'Delivery Leadership',
    date: '2099-06-01',
    time: '14:00 UTC',
    duration: '45 min',
    status: 'published',
    speakerIds: [],
    sponsorIds: [],
    price: 0,
    replayPrice: 0,
    isFree: true,
  };

  it('renders live registration price for upcoming paid sessions inside modal', () => {
    mockCmsData.sessions = [sampleUpcomingSession];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SessionsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Open session modal by clicking title
    const titleBtn = screen.getByText('Upcoming AI Session');
    fireEvent.click(titleBtn);

    // Check pricing block contents
    expect(screen.getByText('Registration Price')).toBeInTheDocument();
    expect(screen.getAllByText('$49.99').length).toBeGreaterThan(0);
    expect(screen.getByText('All taxes included')).toBeInTheDocument();
  });

  it('renders replay price for past sessions inside modal', () => {
    mockCmsData.sessions = [samplePastSession];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SessionsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Open session modal by clicking title
    const titleBtn = screen.getByText('Past Controls Session');
    fireEvent.click(titleBtn);

    // Check pricing block contents for past session (replay price)
    expect(screen.getByText('On-Demand Replay Price')).toBeInTheDocument();
    expect(screen.getAllByText('$19.99').length).toBeGreaterThan(0);
    expect(screen.getByText('Gated Replay Content')).toBeInTheDocument();
  });

  it('renders Free · Included badge for free sessions inside modal', () => {
    mockCmsData.sessions = [sampleFreeSession];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SessionsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Open session modal by clicking title
    const titleBtn = screen.getByText('Free Introductory Webinar');
    fireEvent.click(titleBtn);

    // Check pricing block contents for free session
    expect(screen.getByText('Registration Price')).toBeInTheDocument();
    expect(screen.getByText('Free · Included')).toBeInTheDocument();
  });
});
