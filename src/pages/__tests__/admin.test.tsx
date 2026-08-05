/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminPage from '../admin';
import { FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import userEvent from '@testing-library/user-event';

// Mock all complex children to avoid rendering issues
vi.mock('@/components/RichTextEditor', () => ({ RichTextEditor: () => <div data-testid="rich-text-editor" /> }));
vi.mock('@/components/cms/ModeToggle', () => ({ ModeToggle: () => <div /> }));
vi.mock('@/components/cms/MigrationPrompt', () => ({ MigrationPrompt: () => <div /> }));
vi.mock('@/components/cms/VisualPageEditor', () => ({ VisualPageEditor: () => <div /> }));
vi.mock('@/components/cms/LivePreviewPanel', () => ({ LivePreviewPanel: () => <div /> }));
vi.mock('@/components/cms/FormBuilder', () => ({ FormBuilder: () => <div /> }));
vi.mock('@/components/cms/EmailTemplateStudio', () => ({ EmailTemplateStudio: () => <div /> }));
vi.mock('@/components/cms/GlobalContentEditor', () => ({ GlobalContentEditor: () => <div /> }));
vi.mock('@/components/cms/SubscriptionConfigEditor', () => ({ SubscriptionConfigEditor: () => <div /> }));

const mockMutate = vi.fn();

vi.mock('@/lib/cms-client', async () => {
  const actual = await vi.importActual('@/lib/cms-client');
  return {
    ...actual,
    useCmsContent: () => ({
      data: {
        ...FALLBACK_CMS_CONTENT,
        speakers: [],
      }
    }),
    useUpdateCmsContent: () => ({
      mutate: mockMutate
    })
  };
});

vi.mock('@/lib/user-auth', () => ({
  getUserToken: () => 'fake-token',
  removeUserToken: vi.fn(),
  useUserProfile: () => ({ data: { role: 'admin' } })
}));

import { HelmetProvider } from '@dr.pogodin/react-helmet';

// ... other imports

describe('AdminPage Speaker Modal', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    global.fetch = vi.fn();
    vi.clearAllMocks();
  });

  it('should upload a file and update the avatar URL', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ url: 'https://fake-supabase-url.com/deliveriq-assets/speakers/test.png' })
    } as any);

    render(
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <AdminPage />
          </MemoryRouter>
        </QueryClientProvider>
      </HelmetProvider>
    );

    // Switch to Speakers tab
    const speakersTab = screen.getByRole('button', { name: /Manage Speakers/i });
    fireEvent.click(speakersTab);

    // Open Add Speaker Modal
    const addSpeakerBtn = screen.getByRole('button', { name: /Add Speaker/i });
    fireEvent.click(addSpeakerBtn);

    // Find the file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    
    // Trigger file upload
    const user = userEvent.setup();
    await user.upload(fileInput, file);

    // Check if fetch was called with the correct data
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/cms/upload', expect.objectContaining({
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer fake-token'
        },
        body: JSON.stringify({
          filename: 'hello.png',
          contentType: 'image/png',
          base64: 'aGVsbG8=',
          folder: 'speakers'
        })
      }));
    });

    // Parse the body to check the payload
    const fetchCall = mockFetch.mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1]?.body as string);
    expect(requestBody.filename).toBe('hello.png');
    expect(requestBody.folder).toBe('speakers');
    expect(requestBody.base64).toBeDefined();

    // Verify the URL input is updated
    const avatarInput = screen.getByPlaceholderText('e.g. /airo-assets/images/speakers/john-doe') as HTMLInputElement;
    await waitFor(() => {
      expect(avatarInput.value).toBe('https://fake-supabase-url.com/deliveriq-assets/speakers/test.png');
    });
  });
});
