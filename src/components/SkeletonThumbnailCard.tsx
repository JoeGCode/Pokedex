import React, { FC } from 'react'

const SkeletonThumbnailCard: FC = () => {
    return (
        <div className='animate-pulse flex flex-col shadow-lg items-center justify-evenly mb-4 p-4 rounded-2xl cursor-pointer bg-gray-700'>
            <div className='h-6 bg-gray-400 rounded-md w-1/2 mb-2'></div>
            <div className='h-4 bg-gray-400 rounded-md w-1/4'></div>
            <div className='w-[186px] h-[186px] flex items-center justify-center'>
                <div className='h-1/2 w-1/2 bg-gray-400 rounded-full'></div>
            </div>
            <div className='h-6 bg-gray-400 rounded-md w-1/2'></div>
        </div>
    )
}

export default SkeletonThumbnailCard