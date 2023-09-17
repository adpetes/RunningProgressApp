import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendar.css'
import Tile from './Tile';

function Schedule(props) {
    const { handleModalVisible, setModalContents, accessToken, setAccessToken, allActivities } = props

    const [date, setDate] = useState(new Date())

    const onChange = (date) => {
        setDate(date)
    }

    const tileContent = ({ date }) => {
        // Find activity corresponding to 'date'
        const activity = allActivities.filter(activity => {
            const activityDate = new Date(activity.start_date_local)
            const calendarDate = new Date(date)
            return activityDate.getYear() === calendarDate.getYear() && activityDate.getMonth() === calendarDate.getMonth() && activityDate.getDate() === calendarDate.getDate() 
        })
        return <Tile 
            activity={activity.pop()} 
            date={date} 
            handleModalVisible={handleModalVisible} 
            setModalContents={setModalContents} 
            accessToken={accessToken}
            setAccessToken={setAccessToken}/>
    }

    return (
      <div name='schedule' className='w-full text-gray-300 flex justify-center'>
        <div className='lg:w-[50%] w-full m-4'>
          <p className='text-4xl text-white font-bold'>Schedule</p>
          <p className='text-[#a9abaf] font-bold my-2'>
            A history of all my runs. Click on a day for more details about that workout! I've only recently started being intentional about tracking workout  intensity, 
            hense the 'N/A' labels (Note: E = Easy/Low Intensity, T = Tempo/Moderate Intensity, S = Speed/High Intensity).
          </p>
          <div className='bg-[#f0e9ae] rounded-lg p-4 flex justify-center items-center'>
            {allActivities ? <Calendar onChange={onChange} value={date} tileContent={tileContent}/> : <p>Loading ...</p>}
          </div>
        </div>
      </div>
    )
}

export default Schedule