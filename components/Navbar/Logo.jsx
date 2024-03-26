'use client' 

import Image from "next/image"
import Link from "next/link"
// import { useRouter } from "next/navigation"


function Logo() {
    // const router = useRouter()
  return (
    <Link href='/'>
        <Image
        alt="Logo"
        width={100}
        height={100}
        src='/images/logo.png'
        className="hidden md:block"
        />
    </Link>
  )
}

export default Logo