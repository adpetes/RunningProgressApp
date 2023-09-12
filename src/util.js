import { getStravaAllActivites, getStravaDetailedActivity } from "./service";

export const raceNameConversions = {
    "Marathon": "marathon",
    "Half-Marathon": "halfmara",
    "10k": "tenk",
    "5k": "fivek",
    "1 mile": "onemile",
}

export function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = remainingSeconds.toString().padStart(2, '0');

    return `${hoursString}hr : ${minutesString}min : ${secondsString}sec`;
}

export function timeAndDistanceToPace(time, distance) {
    // Convert time to minutes
    let timeInMinutes = time / 60

    // Convert distance to kilometers
    let distanceInKilometers = distance / 1000

    // Calculate minutes per kilometer
    let minutesPerKilometer = timeInMinutes / distanceInKilometers

    // Calculate the seconds
    let seconds = Math.floor((minutesPerKilometer - Math.floor(minutesPerKilometer)) * 60)

    return `${Math.floor(minutesPerKilometer)}:${seconds.toFixed(0).padStart(2, '0')}min/km`
}

export function weeksBetweenDates(date) {
    // Create Date objects for the input date and today
    const inputDate = new Date(date);
    const today = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = today - inputDate;

    // Convert milliseconds to weeks
    const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeks = Math.floor(timeDifference / millisecondsInWeek);

    return weeks;
}

export function curTimeEpoch() {
    const currentDate = new Date();
    const epochDate = Math.floor(currentDate.getTime() / 1000);
    return epochDate
}

export async function mayGetBestEffort(activity, detailedBestEfforts, accessToken) {
    // For each activity, get the detailed, for each best effort in that activity, if it has pr_rank = 1 then save it in bestEfforts under the corresponding distance. Stop when all best efforts have been recorded
    const id = activity.id 
    try {
        const detailedRes = await getStravaDetailedActivity(id, accessToken)
        const detailedActivity = await detailedRes.json()

        const effortNames = ["1 mile", "5k", "10k", "Half-Marathon", "Marathon"]
        const bestEfforts = detailedActivity.best_efforts.filter((be) => effortNames.includes(be.name) && (be.pr_rank === 1 || be.pr_rank === null))
        bestEfforts.forEach((bestEffort) => {
            const raceType = raceNameConversions[bestEffort.name]
            if (bestEffort.name == "Half-Marathon") {
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