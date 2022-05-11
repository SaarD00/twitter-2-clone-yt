import { SearchCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  const { data: session } = useSession()
  return (
    <div className="col-span-3 mt-2 hidden items-start px-2 lg:inline">
      {/* Searchar */}
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Twitter"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="OfficialUnvoke"
        options={{ height: 1000 }}
      />
    </div>
  )
}

export default Widgets
