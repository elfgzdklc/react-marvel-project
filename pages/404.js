import React from 'react';
import Image from 'next/image'
import { Button } from 'rsuite';

export default function page404() {
    return <>
        <div className="container mt-5">
            <div className="row justify-content-center mt-5">
                <div className="col-12 text-center">
                    <Image className="img-fluid" src="/assets/404.png" alt="404" width="700" height="500" />
                    <h1 className="mt-3">Oops! Page not found</h1>
                    <p className="lead">The page you are looking for might be in another universe...</p>
                </div>
                <div className="col-4 d-flex justify-content-center mt-5 pb-5">
                    <Button className="button-black-white w-50" size="sm" href="/">
                        Home Page
                    </Button>
                </div>
            </div>
        </div>
    </>
}
