import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '../../pages/index';

jest.mock('../../services/api', () => ({
    get: jest.fn(() =>
        Promise.resolve({
            data: {
                data: {
                    results: [
                        { id: 1, name: 'Character 1', thumbnail: { path: '/path', extension: 'jpg' } },
                        { id: 2, name: 'Character 2', thumbnail: { path: '/path', extension: 'jpg' } },
                    ],
                },
            },
        })
    ),
}));

describe('Index component', () => {
    it('loads more characters on infinite scroll', async () => {
        render(<Index />);

        await waitFor(() => {
            expect(screen.queryAllByTestId(/^character-card-/)).toHaveLength(2);
        });

        fireEvent.scroll(window, { target: { scrollY: 1000 } });

        await waitFor(() => {
            expect(screen.queryAllByTestId(/^character-card-/)).toHaveLength(4);
        });
    });

    it('renders a list of characters', async () => {
        render(<Index />);

        await waitFor(() => {
            expect(screen.queryAllByTestId(/^character-card-/)).toHaveLength(2);
        });

        expect(screen.getByText('Character 1')).toBeInTheDocument();
        expect(screen.getByText('Character 2')).toBeInTheDocument();
    });

    it('shows overlay on character hover', async () => {
        render(<Index />);
        await waitFor(() => {
            expect(screen.queryAllByTestId(/^character-card-/)).toHaveLength(2);
        });

        const characterCards = screen.queryAllByTestId(/^character-card-/);

        characterCards.forEach((characterCard) => {
            fireEvent.mouseEnter(characterCard);
        });

        await waitFor(() => {
            characterCards.forEach((characterCard) => {
                const animatedDiv = characterCard.querySelector('.animated-div');
                expect(animatedDiv).toHaveClass('animated-div');
            });
        });
    });
});
