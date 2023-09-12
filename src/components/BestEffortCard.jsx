import React, { useEffect } from 'react'
import { Link } from 'react-scroll';
import { MdOpenInNew } from 'react-icons/md';
import { secondsToHMS } from '../util';

function BestEffortCard(props) {
    const { handleModalVisible, setModalContents, raceType, raceInfo, race_img } = props

    const handleViewClick = () => {
        setModalContents(raceInfo)
        handleModalVisible()
    }

    const getTime = () => secondsToHMS(raceInfo.best_efforts.filter((be) => be.name === raceType)[0].moving_time)
    const displayTime = () => raceType === "Marathon" ? "TBD" : (raceInfo ? getTime() : "Loading ...")

    return (
        <div className='shadow-md shadow-[#040c16] bg-[#f0e9ae] rounded-lg'>
            {raceInfo ? <div
                className="text-black text-xs font-bold mt-2 no-underline hover:scale-110 duration-200 inline-flex items-center justify-end cursor-pointer"
                onClick={handleViewClick}
            >
                <span className="mr-2">View</span>
                <MdOpenInNew />
            </div> : (raceType === "Marathon" ? <p className='text-gray-500 text-[8px] font-bold'> &zwnj; </p> : <p>Loading ...</p>)}
            <img className='mx-auto w-[9rem] h-[9rem]' src={race_img} alt="race icon"/>
            <span className='text-gray-500 text-sm font-bold'> <p className='text-black mb-0'>Best Effort: </p> {displayTime()} </span>
        </div>
    )
}

export default BestEffortCard