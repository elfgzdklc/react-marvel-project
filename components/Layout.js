import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <>
            <main className="background-container">
                <Header />
                <div className="p-2">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    )
}