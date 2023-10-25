import React from 'react'

function Error( {error} ) {

  const styles = {
    color: '#f5f5f5',
    background: 'url(https://www.bungie.net/img/theme/bungienet/bgs/bg_error_sweeperbot.jpg) 25% center no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '20px' 
  }

  const getErrorText = () => {
    switch (error) {
        case "Failed to fetch":
            return "Failed to contact server. Your Internet connection may be unstable, or the Strava API is down."
        case "Rate Limit Exceeded":
            return "Strava limits the number of API requets that can be made per hour, and this limit was exceeded (it's probably my fault, I look at my own website a lot). Come back in a few minutes!"
        default:
            return "Something went wrong, and I'm not sure what... Try refreshing!"
    }
  }

  return (
    <div style={styles}>
      <div style={{width: '600px'}}>
        {getErrorText()}
      </div>
    </div>
  )
}

export default Error