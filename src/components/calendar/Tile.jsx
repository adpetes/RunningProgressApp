import React from 'react'
import { getStravaDetailedActivity } from '../../service'

function Tile(props) {
    const { activity, date, handleModalVisible, setModalContents, accessToken } = props
    
    const handleTileClick = async () => {
        // Get detailed activity associated with clicked tile, display detailed activity in modal
        try {
            const detailedRes = await getStravaDetailedActivity(activity.id, accessToken)
            const detailed = await detailedRes.json()

            console.log("got detailed activity!", detailed)
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
    const getWorkoutType = () => { // Determine workout-type by activity title
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
                return "" // No activity on future date - display nothing
            }
            else {
                return "Rest" // No activity on a past date = rest day!
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