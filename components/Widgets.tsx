import { SearchCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  return (
    <div className="col-span-3 mx-5 mt-2 hidden items-start px-2 lg:inline">
      {/* Searchar */}
      <div className="flex items-center space-x-2 rounded-full bg-[#273340] p-3">
        <SearchCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent text-white outline-none"
          placeholder="Search Twitter"
        />
      </div>

      <div className="mt-2 rounded-lg bg-[#273340]">
        <p className="p-3 font-bold text-white">Tweeter of the month</p>
        <div className="flex justify-between p-2">
          <div className=" flex space-x-2 text-white">
            <div>
              <img
                src="https://pbs.twimg.com/profile_images/1522692307555954689/dVKJCAlV_normal.jpg"
                className="h-10 rounded-full"
              />
            </div>
            <div>
              <p className="font-bold">wongback</p>
              <p className="text-gray-500">@wongback</p>
            </div>
          </div>
          <div className="flex w-16 items-center justify-center rounded-full bg-white  font-bold">
            Follow
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-[#1e2732] p-1 py-2">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 500 }}
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
