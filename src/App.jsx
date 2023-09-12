import './index.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Schedule from './components/calendar/Schedule';
import { useEffect, useState } from 'react';
import { getStravaAccessToken, getStravaAllActivites, getStravaStats } from './service';
import ActivityModal from './components/ActivityModal';

function App() {
  const [accessToken, setAccessToken] = useState(null)
  const [athleteStats, setAthleteStats] = useState(null)
  const [modalVisible, setModalVisible] = useState(true)
  const [modalContents, setModalContents] = useState(null)
  const [allActivities, setAllActivities] = useState(null)

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await getStravaAccessToken()
        const tokenInfo = await res.json()
        setAccessToken(tokenInfo.access_token)
      } 
      catch (error) {
        console.log(error)
      }
    }

    fetchToken()
  }, [])

  useEffect(() => {
    async function getStats() {
      try {
        const statsRes = await getStravaStats(accessToken)
        const stats = await statsRes.json()
        console.log('stats obtained', stats)
        setAthleteStats(stats.all_run_totals)
      } 
      catch (error) {
        console.log(error)
      }
    }
    async function getAllActivities() {
      try {
        const allActivitiesRes = await getStravaAllActivites(accessToken)
        const allActivitiesData = await allActivitiesRes.json()
        console.log('all activities obtained', allActivitiesData)
        setAllActivities(allActivitiesData)
      } 
      catch (error) {
        console.log(error)
      }
    }

    if (accessToken !== null){
      getStats()
      getAllActivities()
    }
  }, [accessToken])

  const handleModalClose = () => setModalVisible(false)
  const handleModalVisible = () => {if (modalContents) {setModalVisible(true)}}

  return (
    <div>
      <Navbar />
      <Home />
      <Stats
        athleteStats={athleteStats} 
        handleModalVisible={handleModalVisible}
        setModalContents={setModalContents}
        accessToken={accessToken}
        allActivities={allActivities}/>
      <Schedule 
        handleModalVisible={handleModalVisible}
        setModalContents={setModalContents}
        accessToken={accessToken}
        allActivities={allActivities}/>
      <Gallery />
      {modalContents ? <ActivityModal modalVisible={modalVisible} handleModalClose={handleModalClose} contents={modalContents}/> : <></>}
    </div>
  );
}

export default App;