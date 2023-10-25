import './index.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Stats from './components/stats/Stats';
import Gallery from './components/Gallery';
import Schedule from './components/calendar/Schedule';
import { useEffect, useState } from 'react';
import { getStravaAccessToken, getStravaAllActivites, getStravaStats } from './service';
import ActivityModal from './components/ActivityModal';
import Error from './components/Error';

function App() {
  const [accessToken, setAccessToken] = useState(null)
  const [athleteStats, setAthleteStats] = useState(null)
  const [modalVisible, setModalVisible] = useState(true)
  const [modalContents, setModalContents] = useState(null)
  const [allActivities, setAllActivities] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await getStravaAccessToken()
        const tokenInfo = await res.json()
        setAccessToken(tokenInfo.access_token)
      } 
      catch (error) {
        setError(error.message)
      }
    }

    fetchToken()
  }, [])

  useEffect(() => {
    async function getStats() {
      try {
        const statsRes = await getStravaStats(accessToken, setAccessToken)
        const stats = await statsRes.json()
        console.log('stats obtained', stats)
        setAthleteStats(stats.all_run_totals)
      } 
      catch (error) {
        setError(error.message)
      }
    }
    async function getAllActivities() {
      try {
        const allActivitiesRes = await getStravaAllActivites(accessToken, setAccessToken)
        const allActivitiesData = await allActivitiesRes.json()
        console.log('all activities obtained', allActivitiesData)
        setAllActivities(allActivitiesData)
      } 
      catch (error) {
        setError(error.message)
      }
    }

    if (accessToken !== null && !athleteStats && !allActivities) {
      getStats()
      getAllActivities()
    }
  }, [accessToken, allActivities, athleteStats])

  const handleModalClose = () => setModalVisible(false)
  const handleModalVisible = () => {if (modalContents) {setModalVisible(true)}}

  return (
    !error ?
      <div className='flex flex-col bg-[rgb(66,106,94)] gap-96'>
        <Navbar />
        <Home />
        <Schedule 
          handleModalVisible={handleModalVisible}
          setModalContents={setModalContents}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          allActivities={allActivities}/>
        <Stats
          athleteStats={athleteStats} 
          handleModalVisible={handleModalVisible}
          setModalContents={setModalContents}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          allActivities={allActivities}/>
        <Gallery />
        {modalContents && <ActivityModal modalVisible={modalVisible} handleModalClose={handleModalClose} contents={modalContents}/>}
      </div>
    :
      <Error error={error}/>
  );
}

export default App;
