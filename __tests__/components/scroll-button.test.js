import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { act } from 'react-dom/test-utils';

global.scrollTo = jest.fn();

describe('ScrollToTopButton', () => {
    it('renders with correct structure and classes', () => {
        const { container } = render(<ScrollToTopButton />);
        const button = container.querySelector('button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('scroll-to-top-button');
    });

    it('is not visible initially', () => {
        const { container } = render(<ScrollToTopButton />);
        const button = container.querySelector('button');

        expect(button).not.toHaveClass('visible');
    });

    it('becomes visible after scrolling', () => {
        const { container } = render(<ScrollToTopButton />);
        const button = container.querySelector('button');

        act(() => {
            fireEvent.scroll(window, { target: { scrollY: 400 } });
        });

        expect(button).toHaveClass('visible');

    });
    it('scrolls to top when clicked', () => {
        const { getByTestId } = render(<ScrollToTopButton />);
        const button = getByTestId('scroll-to-top-button');

        act(() => {
            fireEvent.click(button);
        });

        expect(global.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
