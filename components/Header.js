import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hearder() {
    return (
        <>
            <header className="m-bg-dark">
                <div className="col-12 d-flex justify-content-center">
                    <Link href="/" legacyBehavior >
                        <a title="Home Page">
                            <Image className="img-fluid px-3 py-3" src="/assets/logo.png" priority alt="logo" width="250" height="100" />
                        </a>
                    </Link>
                </div>
            </header>

        </>
    )
}