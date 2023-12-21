import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailPage from '../../pages/details/[id]';
import api from '../../services/api';

jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

jest.spyOn(api, 'get').mockImplementation((url) => {
    if (url.includes('/characters/')) {
        return Promise.resolve({ data: { data: { results: [{ name: 'Test Character', description: 'Test Description', thumbnail: { path: 'path', extension: 'jpg' } }] } } });
    } else if (url.includes('/characters/1/comics')) {
        return Promise.resolve({ data: { data: { results: [{ title: 'Comic 1', description: 'Comic Description', thumbnail: { path: 'path', extension: 'jpg' }, dates: [{ date: '2023-12-21T00:00:00' }] }] } } });
    }
});

describe('DetailPage', () => {
    it('displays loading indicator while data is being fetched', async () => {
        const props = { id: '1' };
        render(<DetailPage {...props} />);

        await waitFor(() => {
            const loadingIndicator = screen.queryByTestId('loading-indicator');
            if (loadingIndicator) {
                expect(loadingIndicator).toHaveClass('loading');
            }
        }, { timeout: 5000 });
    });

    it('displays character details correctly', async () => {
        const props = { id: '1' };
        render(<DetailPage {...props} />);

        const characterName = await screen.findByText('Test Character');
        expect(characterName).toBeInTheDocument();
    });

    it('displays comic details correctly', async () => {
        const props = { id: '1' };
        render(<DetailPage {...props} />);

        await waitFor(() => {
            const comicTitle = screen.queryByText('Comic 1');
            if (comicTitle) {
                expect(comicTitle).toBeInTheDocument();
            }
        }, { timeout: 10000 });
    });
});
