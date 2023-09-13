import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendar.css'
import Tile from './Tile';

function Schedule(props) {
    const { handleModalVisible, setModalContents, accessToken, allActivities } = props

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
            accessToken={accessToken}/>
    }

    return (
      <div name='schedule' className='w-full h-screen text-gray-300 bg-[#426a5e]'>
        <div  className='mx-auto max-w-[1000px] p-4 flex flex-col justify-center h-full'>
          <p className='text-4xl text-white font-bold'>Schedule</p>
          <p className='text-[#a9abaf] font-bold'>A history of all my runs. Click on a day for more details about that workout! (Note: E = Easy/Low Intensity, T = Tempo/Moderate Intensity, S = Speed/High Intensity)</p>
          <div className='bg-[#f0e9ae] rounded-lg p-4 '>
            {allActivities ? <Calendar onChange={onChange} value={date} tileContent={tileContent}/> : <p>Loading ...</p>}
          </div>
        </div>
      </div>
    )
}

export default Schedule