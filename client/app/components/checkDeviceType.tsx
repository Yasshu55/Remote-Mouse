
import React from 'react';
import MobileHome from './Mobile/MobileHome';
import { headers } from 'next/headers';
import { isMobile } from '@/utils/isMobile';
import BrowserHome from './Browser/BrowserHome';

function checkDeviceType() {
    const userAgent = headers().get('user-agent') || '';
    const mobileCheck = isMobile(userAgent);
    return mobileCheck ? <MobileHome mobileCheck={mobileCheck} /> : <BrowserHome mobileCheck={mobileCheck} />;
}

export default checkDeviceType;
