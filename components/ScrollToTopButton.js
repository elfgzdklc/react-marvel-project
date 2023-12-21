import React, { useState, useEffect } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'rsuite';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Button className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} data-testid="scroll-to-top-button" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
        </Button>
    );
};

