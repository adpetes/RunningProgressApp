import {curTimeEpoch} from "./util"

async function makeRequest(address, request) {
    const response = await fetch(address, request)
    if (!response.ok) {
        const responseJson = await response.json()
        console.log(responseJson)
        throw new Error(responseJson.message)
    }
    return response
}

async function refreshAndRetryRequest(address, request, setAccessToken) {
    const tokenRes = await getStravaAccessToken()
    const freshToken = await tokenRes.json()
    console.log("Retrying that with fresh token!", address)
    const newRequest = {
        ...request, // Spread the properties of the original request 
        headers: {
            ...request.headers,
            authorization: `Bearer ${freshToken.access_token}` // Replace the token with freshToken
        }
    }
    const res = await makeRequest(address, newRequest)
    setAccessToken(freshToken.access_token)
    return res
}

export async function getStravaAccessToken() {
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({
        client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
        client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
        refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
    })

    const address = 'https://www.strava.com/oauth/token'
    const request = {
        method: 'post',
        "headers": headers,
        "body": body
    }
    const response = await makeRequest(address, request)
    return response
}

export async function getStravaStats(token, setAccessToken) {
    const id = process.env.REACT_APP_STRAVA_ATHLETE_ID
    const address = `https://www.strava.com/api/v3/athletes/${id}/stats`
    let request = {
        method: 'get',
        "headers": {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    const res = await makeRequest(address, request)
    if (!res.ok) {
        const retriedRes = await refreshAndRetryRequest(address, request, setAccessToken)
        if (retriedRes.ok) {
            return retriedRes;
        }
    }
    return res
}

export async function getStravaAllActivites(token, setAccessToken) {
    // TODO update to make multiple requests (one for each page) until request returns no data
    const time = curTimeEpoch()
    const address = `https://www.strava.com/api/v3/athlete/activities?page=1&per_page=200`
    let request = {
        method: 'get',
        "headers": {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'before' : time
        }
    }
    const res = await makeRequest(address, request)
    if (!res.ok){
        const retriedRes = await refreshAndRetryRequest(address, request, setAccessToken)
        if (retriedRes.ok) {
            return retriedRes
        }
    }
    console.log("hi", res)
    return res
}

// export async function getStravaAllActivites(token) {
//     const time = curTimeEpoch()
//     const headers = {
//         'accept': 'application/json',
//         'authorization': `Bearer ${token}`,
//         'before' : time
//     }
//     try {
//         const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?page=1&per_page=200`, {
//             method: 'get',
//             "headers": headers
//         })
//         return res
//     } 
//     catch (error) {
//         throw new Error("Error retrieving all activities", error)
//     }
// }

export async function getStravaDetailedActivity(id, token, setAccessToken) {
    // TODO update to make multiple requests (one for each page) until request returns no data
    const address = `https://www.strava.com/api/v3/activities/${id}?include_all_efforts=false`
    let request = {
        method: 'get',
        "headers": {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    const res = await makeRequest(address, request)
    if (!res.ok){
        const retriedRes = await refreshAndRetryRequest(address, request, setAccessToken)
        if (retriedRes.ok) {
            return retriedRes
        }
    }
    return res
}

// export async function getStravaDetailedActivity(id, token) {
//     const headers = {
//         'accept': 'application/json',
//         'authorization': `Bearer ${token}`
//     }
//     try {
//         const res = await fetch(`https://www.strava.com/api/v3/activities/${id}?include_all_efforts=false`, {
//             method: 'get',
//             "headers": headers
//         })
//         return res
//     } 
//     catch (error) {
//         throw new Error("Error retrieving detailed activity id="+id, error)
//     }
// }
