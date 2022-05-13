import { SearchCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  const { data: session } = useSession()
  console.log(session?.user?.name)
  return (
    <div className="col-span-3 mx-5 mt-2 hidden items-start px-2 lg:inline">
      {/* Searchar */}
      <div className="flex items-center space-x-2 rounded-full bg-[#273340] p-3">
        <SearchCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Twitter"
        />
      </div>

      <div className="mt-10 rounded-xl bg-[#1e2732] p-1 py-2">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 540 }}
          theme="dark"
          noFooter={true}
          noBorders={true}
          noHeader={true}
          noScrollbar={true}
          transparent={true}
        />
      </div>
    </div>
  )
}

export default Widgets
