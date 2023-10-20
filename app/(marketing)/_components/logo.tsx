import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const font = Poppins({
    subsets: ["latin"],
    weight: ['400', '600']
})
const Logo = () => {
    return (
        <div className='hidden md:flex items-center gap-2'>

            <Image
                src={"/logo.svg"}
                height={40}
                width={40}
                alt='logo'
                className='dark:hidden'
            />

            <Image
                src={"/logo-dark.svg"}
                height={40}
                width={40}
                alt='logo'
                className='hidden dark:flex'
            />

            <p className={cn("font-semibold", font.className)}>INFINOTE</p>
        </div>
    )
}

export default Logo