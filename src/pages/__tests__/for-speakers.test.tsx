/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import ForSpeakersPage from '../for-speakers';
import { FALLBACK_CMS_CONTENT, Speaker } from '@/lib/cms-client';

// Mock cms-client
vi.mock('@/lib/cms-client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/cms-client')>();
  return {
    ...actual,
    useCmsContent: vi.fn(),
  };
});

import { useCmsContent } from '@/lib/cms-client';

const mockUseCmsContent = useCmsContent as any;

describe('ForSpeakersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <MemoryRouter>
        <HelmetProvider>{ui}</HelmetProvider>
      </MemoryRouter>
    );
  };

  it('renders legacy HTML content correctly', () => {
    mockUseCmsContent.mockReturnValue({
      data: {
        ...FALLBACK_CMS_CONTENT,
        speakersContent: { visualMode: false },
        speakersPageHtml: '<div data-testid="html-renderer-content">Legacy Content</div>'
      }
    });

    renderWithProviders(<ForSpeakersPage />);
    expect(screen.getByTestId('html-renderer-content')).toBeInTheDocument();
  });

  it('renders the speaker grid with alphabetically sorted speakers', () => {
    const unsortedSpeakers: Speaker[] = [
      { id: '3', name: 'Zack', role: 'Dev', organisation: 'Org C', bio: 'Bio', avatarUrl: '', email: 'z@e.com' },
      { id: '1', name: 'Alice', role: 'Manager', organisation: 'Org A', bio: 'Bio', avatarUrl: '', email: 'a@e.com' },
      { id: '2', name: 'Bob', role: 'Designer', organisation: 'Org B', bio: 'Bio', avatarUrl: '', email: 'b@e.com' },
    ];

    mockUseCmsContent.mockReturnValue({
      data: {
        ...FALLBACK_CMS_CONTENT,
        speakers: unsortedSpeakers,
        speakersContent: { visualMode: false }, // HTML mode
      }
    });

    renderWithProviders(<ForSpeakersPage />);

    // Verify grid heading
    expect(screen.getByText('Meet Our Speakers')).toBeInTheDocument();

    // Verify sorting order in the DOM
    const speakerNames = screen.getAllByTestId('speaker-name').map(el => el.textContent?.trim());
    expect(speakerNames).toEqual(['Alice', 'Bob', 'Zack']);
  });

  it('opens SpeakerDialog when a speaker card is clicked', async () => {
    const speaker: Speaker = {
      id: '1',
      name: 'Alice',
      role: 'Manager',
      organisation: 'Org A',
      bio: 'Alice bio text',
      avatarUrl: '',
      email: 'alice@example.com'
    };

    mockUseCmsContent.mockReturnValue({
      data: {
        ...FALLBACK_CMS_CONTENT,
        speakers: [speaker],
        speakersContent: { visualMode: false },
      }
    });

    renderWithProviders(<ForSpeakersPage />);

    // Click on the speaker card
    const card = screen.getByRole('button', { name: /View details for Alice/i });
    fireEvent.click(card);

    // Assert that the dialog opens by checking for the Speaker Details visually hidden title/desc or Bio section
    await waitFor(() => {
      expect(screen.getByText('Alice - Speaker Details')).toBeInTheDocument();
      expect(screen.getByText('Alice bio text')).toBeInTheDocument();
    });
  });

  it('does not render the grid section if speakers array is empty', () => {
    mockUseCmsContent.mockReturnValue({
      data: {
        ...FALLBACK_CMS_CONTENT,
        speakers: [],
        speakersContent: { visualMode: false },
      }
    });

    renderWithProviders(<ForSpeakersPage />);

    // The heading should not be in the document
    expect(screen.queryByText('Meet Our Speakers')).not.toBeInTheDocument();
  });
});
