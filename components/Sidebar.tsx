import React from 'react'
import SidebarRow from './SidebarRow'
import {
  BellIcon,
  HomeIcon,
  UserIcon,
  MailIcon,
  CollectionIcon,
  BookmarkIcon,
  HashtagIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className="col-span-2   mx-auto hidden flex-col items-center px-4 sm:col-span-1 md:col-span-2 md:inline-flex md:items-start">
      <img
        src="https://cdn.sanity.io/images/mrfd4see/production/ec2fea28c4596ca89f3d6565149ad4451512feb3-1034x851.png"
        className="m-3 h-10 w-10 object-contain "
      />
      <SidebarRow title="Home" Icon={HomeIcon} />
      <SidebarRow title="Explore" Icon={HashtagIcon} />
      <SidebarRow title="Notifications" Icon={BellIcon} />
      <SidebarRow title="Messages" Icon={MailIcon} />
      <SidebarRow title="Bookmarks" Icon={BookmarkIcon} />
      <SidebarRow title="Lists" Icon={CollectionIcon} />
      <SidebarRow
        onClick={session ? signOut : signIn}
        title={session ? 'Sign Out' : 'Sign In'}
        Icon={UserIcon}
      />
      <SidebarRow title="More" Icon={DotsCircleHorizontalIcon} />

      {/* User */}
      <div className="flex">
        <img
          className="h-10 rounded-full"
          src={session?.user?.image || 'https://links.papareact.com/gll'}
        />
        <div className="mx-2 flex flex-col">
          <p className=" font-bold text-white ">
            {session?.user?.name || 'Sign In'}
          </p>

          <p className=" text-sm text-gray-500">
            @
            {session?.user?.name?.replace(/\s+/g, '').toLowerCase() ||
              'SignIn'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
