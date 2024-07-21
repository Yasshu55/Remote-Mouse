'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

function MobileHome({mobileCheck} : any) {
    const router = useRouter();

    function touchPadHandler() {
        if (!mobileCheck) {
            alert("Open in mobile browser to use touchpad");
        } else {
            router.push('/touchpad');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-full w-full p-4'>
            <h1 className='text-3xl font-bold mb-6'>Remote Mouse</h1>
            <button className="w-40 bg-blue-600 hover:bg-blue-700 rounded-lg mr-1 h-12 text-white transition-colors duration-900" onClick={touchPadHandler}>Touchpad</button>
        </div>
    )
}

export default MobileHome;
