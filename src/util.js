import { getStravaDetailedActivity } from "./service";

export const raceNameConversions = {
    "Marathon": "marathon",
    "Half-Marathon": "halfmara",
    "10k": "tenk",
    "5k": "fivek",
    "1 mile": "onemile",
}

// Convert seconds (integer) to hr : min : sec format
export function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = remainingSeconds.toString().padStart(2, '0');

    return `${hoursString}hr : ${minutesString}min : ${secondsString}sec`;
}

// Convert time (seconds) and distance (meters) to minutes/km (average time to complete a km)
export function timeAndDistanceToPace(time, distance) {
    let timeInMinutes = time / 60

    let distanceInKilometers = distance / 1000

    let minutesPerKilometer = timeInMinutes / distanceInKilometers

    // Calculate seconds
    let seconds = Math.floor((minutesPerKilometer - Math.floor(minutesPerKilometer)) * 60)

    return `${Math.floor(minutesPerKilometer)}:${seconds.toFixed(0).padStart(2, '0')}min/km`
}

export function weeksBetweenDates(date) {
    // Create Date objects for the input date and today
    const inputDate = new Date(date);
    const today = new Date();

    const timeDifference = today - inputDate;

    const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeks = Math.floor(timeDifference / millisecondsInWeek);

    return weeks;
}

export function curTimeEpoch() {
    const currentDate = new Date();
    const epochDate = Math.floor(currentDate.getTime() / 1000);
    return epochDate
}

// Get the detailed version of 'activity' parameter and check it for any best efforts (PR times for any distance)
export async function mayGetBestEffort(activity, detailedBestEfforts, accessToken) {
    const id = activity.id 
    try {
        const detailedRes = await getStravaDetailedActivity(id, accessToken)
        const detailedActivity = await detailedRes.json()

        const effortNames = ["1 mile", "5k", "10k", "Half-Marathon", "Marathon"]
        // A best effort will have pr_rank = 1 or null and have name = some name in effortNames
        const bestEfforts = detailedActivity.best_efforts.filter((be) => effortNames.includes(be.name) && (be.pr_rank === 1 || be.pr_rank === null))
        bestEfforts.forEach((bestEffort) => {
            const raceType = raceNameConversions[bestEffort.name]
            if (bestEffort.name === "Half-Marathon") {
                detailedBestEfforts[raceType] = detailedActivity
            }
            else if (bestEffort.pr_rank === 1 && !(raceType in detailedBestEfforts)){
                detailedBestEfforts[raceType] = detailedActivity
            }
        })
    } 
    catch (error) {
        throw error
    }
}