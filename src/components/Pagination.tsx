import React, { FC } from 'react'

type PaginationProps = {
    startFrom: number,
    setStart: (start: number) => void,
    resultsPerPage: number,
    resultsLength: number,
}

const Pagination: FC<PaginationProps> = ({ startFrom, setStart, resultsPerPage, resultsLength }) => {
    return (
        <div className='flex items-center justify-evenly w-full h-20 fixed bottom-0 left-0 right-0 backdrop-blur-md'>
            {startFrom >= resultsPerPage && <button className='py-2 px-4 bg-blue-200 rounded-lg' onClick={() => setStart(startFrom - resultsPerPage)}>Previous</button>}
            {startFrom + resultsPerPage < resultsLength && <button className='py-2 px-4 bg-blue-200 rounded-lg' onClick={() => setStart(startFrom + resultsPerPage)}>Next</button>}
        </div>
    )
}

export default Pagination