import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MenuIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

type Props = {}

const Navbar = async (props: Props) => {

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center gap-[2px]">
        <p className="text-3xl font-bold">Task</p>
        <Image
          src="/fuzzieLogo.png"
          width={15}
          height={15}
          alt="fuzzie logo"
          className="shadow-sm"
        />
        <p className="text-3xl font-bold">Flow</p>
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/dashboard"><Button variant="outline" size="sm">Dashboard</Button></Link>
        <UserButton />
        <MenuIcon className="md:hidden" />
      </div>
    </header>
  )
}

export default Navbar;
