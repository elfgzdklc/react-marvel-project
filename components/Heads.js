import React from 'react';
import Head from 'next/head'

export default function Heads(props) {
   return (
        <div>
            <Head>
                <title>{props.title}</title>
                <meta property="og:title" content={props.title} key="title"/>
                <meta name="googlebot" content="noindex"/>
                <meta name="googlebot-news" content="nosnippet"/>
            </Head>
        </div>
    );
}
