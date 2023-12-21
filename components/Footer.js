import React from 'react';

export default function Footer() {

    return (
        <>
            <footer className="m-bg-dark mt-auto py-4 ">
                <div className="container">
                    <div className="copyright d-flex justify-content-end">
                        &copy; {new Date().getFullYear()} MARVEL. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
