import React, { useEffect } from 'react'
import { timeAndDistanceToPace } from '../../util'
import logo from '../../images/logo.png'
import { getStravaDetailedActivity } from '../../service'

function Tile(props) {
    const { activity, date, handleModalVisible, setModalContents, accessToken } = props
    // useEffect(() => {
    //         if (activity){
    //             console.log(activity)
    //         }
    //     }, [activity])
    
    const handleTileClick = async () => {
        try {
            const detailedRes = await getStravaDetailedActivity(activity.id, accessToken)
            const detailed = await detailedRes.json()

            setModalContents(detailed)
            handleModalVisible()
        } catch (error) {
            throw error
        }
    }

    const textColour = () => {
        switch(getWorkoutType()) {
            case "E":
                return "green"
            case "T":
                return "orange"
            case "S":
                return "red"
            default:
                return "black"
        }
    }
    const getWorkoutType = () => {
        if (activity.name.toLowerCase().includes("easy")) {
            return "E"
        }
        if (activity.name.toLowerCase().includes("tempo")) {
            return "T"
        }
        if (activity.name.toLowerCase().includes("speed")) {
            return "S"
        }

        return "N/A"
    }
    const getDistance = () => {
        if (activity) {
            return (activity.distance / 1000).toFixed(2) + "km"
        }
        else {
            if (new Date(date) > new Date()) {
                return ""
            }
            else {
                return "Rest"
            }
        }
    }

    return (
        <div className='h-[100px] p-2 text-xs' onClick={activity ? handleTileClick : null}>
            <p className='text-black font-bold my-1' style={{ fontFamily: 'Quicksand, sans-serif' }}>{getDistance()}</p>
            {activity && <p className='font-bold' style={{ fontFamily: 'Quicksand, sans-serif', color: textColour() }}>{getWorkoutType()}</p>}
        </div>
    )
}

export default Tile