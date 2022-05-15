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

function Sidebar_mobile() {
  const { data: session } = useSession()
  return (
    <div className="sticky bottom-0 inline w-[28rem] border-b border-[#38444d] py-1 px-1 md:hidden    ">
      <div className="flex justify-between">
        <SidebarRow title="Home" Icon={HomeIcon} />
        <SidebarRow title="Noti" Icon={BellIcon} />
        <SidebarRow
          title="Sign In"
          Icon={UserIcon}
          onClick={session ? signOut : signIn}
        />
        <SidebarRow title="Mesages" Icon={MailIcon} />
      </div>
    </div>
  )
}

export default Sidebar_mobile
