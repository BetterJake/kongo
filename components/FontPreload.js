'use client';

import React from 'react';
import Head from 'next/head';

const FontPreload = () => {
    return (
        <Head>
            {/* Preload critical fonts */}
            <link
                rel="preload"
                href="/fonts/montserrat-bold.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/fonts/general.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/fonts/circular-web.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />

            {/* Font display optimization */}
            <style jsx global>{`
        /* Font display optimization */
        @font-face {
          font-family: 'primary-display';
          font-display: swap;
        }
        @font-face {
          font-family: 'general';
          font-display: swap;
        }
        @font-face {
          font-family: 'circular-web';
          font-display: swap;
        }
      `}</style>
        </Head>
    );
};

export default FontPreload;