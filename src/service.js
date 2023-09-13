import {curTimeEpoch} from "./util"

async function makeRequest(address, request) {
    try {
        const response = await fetch(address, request)
        return response
    } catch (error) {
        throw error
    }
}

async function refreshAndRetryRequest(address, request) {
    try {
        const tokenRes = getStravaAccessToken()
        const freshToken = await tokenRes.json()
        console.log("Retrying that with fresh token!", address, freshToken)
        const newRequest = {
            ...request, // Spread the properties of the original request 
            headers: {
                ...request.headers,
                authorization: `Bearer ${freshToken}` // Replace the token with freshToken
            }
        }
        const res = await makeRequest(address, newRequest)
        return res
    } 
    catch (error) {
        throw error
    }
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

    try {
        const address = 'https://www.strava.com/oauth/token'
        const request = {
            method: 'post',
            "headers": headers,
            "body": body
        }
        const response = makeRequest(address, request)
        return response
    } 
    catch (error) {
        throw new Error("Error retrieving access token", error)
    }
}

export async function getStravaStats(token) {
    const id = process.env.REACT_APP_STRAVA_ATHLETE_ID
    const address = `https://www.strava.com/api/v3/athletes/${id}/stats`
    let request = {
        method: 'get',
        "headers": {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await makeRequest(address, request)
        return res
    } 
    catch (e) { // Try refreshing token and resending request if error
        try {
            return refreshAndRetryRequest(address, request)
        } catch (e2) {
            throw new Error("Error retrieving athlete stats", e2)
        }
    }
}

export async function getStravaAllActivites(token) {
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
    try { // Try refreshing token and resending request if error
        const res = await makeRequest(address, request)
        return res
    } 
    catch (e) {
        try {
            return refreshAndRetryRequest(address, request)
        } catch (e2) {
            throw new Error("Error retrieving all activities", e2)
        }
    }
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

export async function getStravaDetailedActivity(id, token) {
    // TODO update to make multiple requests (one for each page) until request returns no data
    const address = `https://www.strava.com/api/v3/activities/${id}?include_all_efforts=false`
    let request = {
        method: 'get',
        "headers": {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await makeRequest(address, request)
        return res
    } 
    catch (e) { // Try refreshing token and resending request if error
        try {
            console.log("old token!", token)
            return refreshAndRetryRequest(address, request)
        } catch (e2) {
            throw new Error(`Error retrieving detailed activity: ${id}`, e2)
        }
    }
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
