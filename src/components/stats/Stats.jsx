import React, { useState, useEffect } from 'react'
import marathon from '../../images/marathon.png'
import halfmara from '../../images/halfmara.png'
import tenk from '../../images/tenk.png'
import fivek from '../../images/fivek.png'
import onemile from '../../images/onemile.png'
import height from '../../images/height.png'
import weight from '../../images/weight.png'
import distance from '../../images/distance.png'
import elevation from '../../images/elevation.png'
import time from '../../images/time.png'
import mileage from '../../images/mileage.png'
import { weeksBetweenDates, secondsToHMS, mayGetBestEffort } from '../../util'
import BestEffortCard from './BestEffortCard'
import StatCard from './StatCard'

function Stats(props) {
  const {athleteStats='?', handleModalVisible, setModalContents, accessToken, setAccessToken, allActivities } = props
  
  const [bestEfforts, setBestEfforts] = useState({})

  useEffect(() => {
    // Find all "best effort" runs aka personal record times for given distances
    async function getBestEfforts() {
      const prs = allActivities.filter((activity) => activity.pr_count > 0) // Activities that contain PRs
      const detailedBestEfforts = {}
      try {
        for (const pr of prs) {
          await mayGetBestEffort(pr, detailedBestEfforts, accessToken, setAccessToken)
          if (Object.keys(detailedBestEfforts).length === 4) {
            break
          }
        }
        console.log('Best efforts: ', detailedBestEfforts)
        setBestEfforts(detailedBestEfforts)
      } 
      catch (error) {
        console.log('Error retrieving detailed best efforts', error)
      }
    }

    if (allActivities && Object.keys(bestEfforts).length === 0) {
      getBestEfforts()
    }
  }, [allActivities, accessToken, bestEfforts, setAccessToken])

  const getDistance = () => athleteStats ? athleteStats.distance / 1000 + "km" : "-"
  const getElevation = () => athleteStats ? athleteStats.elevation_gain + "m" : "-"
  // const getNumRuns = () => athleteStats ? athleteStats.count : "-"
  const getMovingTime = () => athleteStats ? secondsToHMS(athleteStats.moving_time) : "-"
  const getWeeklyMilage = () => athleteStats ? (athleteStats.distance / 1000 / weeksBetweenDates('2023-03-31')).toFixed(2) + "km": "-"

  return (
      <div name='stats' className='w-full flex justify-center items-center'>
          <div className='lg:w-[50%] w-full m-4'>
              <p className='text-4xl text-white font-bold'>Stats</p>
              <p className='text-[#a9abaf] font-bold my-2'>
                Here are my best effort runs (personal records) and lifetime running stats pulled from my Strava; Strava is a fitness social 
                media application from which I record all my running data (GPS data, heart rate, pace, cadence, and more)!
              </p>
              <div className='w-full grid grid-cols-3 sm:grid-cols-5 gap-3 text-center my-4'>
                <BestEffortCard handleModalVisible={handleModalVisible} setModalContents={setModalContents} raceType={'Marathon'} raceInfo={bestEfforts.marathon} race_img={marathon}/>
                <BestEffortCard handleModalVisible={handleModalVisible} setModalContents={setModalContents} raceType={'Half-Marathon'} raceInfo={bestEfforts.halfmara} race_img={halfmara}/>
                <BestEffortCard handleModalVisible={handleModalVisible} setModalContents={setModalContents} raceType={'10k'} raceInfo={bestEfforts.tenk} race_img={tenk}/>
                <BestEffortCard handleModalVisible={handleModalVisible} setModalContents={setModalContents} raceType={'5k'} raceInfo={bestEfforts.fivek} race_img={fivek}/>
                <BestEffortCard handleModalVisible={handleModalVisible} setModalContents={setModalContents} raceType={'1 mile'} raceInfo={bestEfforts.onemile} race_img={onemile}/>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 rounded-lg'>
                <StatCard statName={"Height"} statValue={"178cm"} image={height}/>
                <StatCard statName={"Weight"} statValue={"78kg"} image={weight}/>
                <StatCard statName={"Distance"} statValue={getDistance()} image={distance}/>
                <StatCard statName={"Elevation"} statValue={getElevation()} image={elevation}/>
                <StatCard statName={"Moving Time"} statValue={getMovingTime()} image={time}/>
                <StatCard statName={"KM/Week"} statValue={getWeeklyMilage()} image={mileage}/>
              </div>
          </div>
      </div>

  )
}

export default Stats