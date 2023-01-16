import React from 'react'

const NotFoundCard = () => {
    return (
        <div className='flex flex-col w-full px-4 py-12 items-center justify-center text-center text-lg bg-slate-400 shadow-lg rounded-lg'>
            This Pokemon does not exist... <br /> or hasn't been found yet!
        </div>
    )
}

export default NotFoundCard