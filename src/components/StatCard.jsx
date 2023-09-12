import React from 'react'

function StatCard({ statName, statValue, image }) {
    return (
        <div className="bg-[#f0e9ae] shadow-md rounded-lg px-4 py-2 flex items-center m-1">
            <div>
                <img src={image} alt={statName} className="w-10 h-10" />
            </div>
            <div className='flex-1 text-right'>
                <h3 className="text-lg font-bold mb-0">{statValue}</h3>
                <p className="text-gray-700 text-sm">{statName}</p>
            </div>
        </div>
    )
}

export default StatCard