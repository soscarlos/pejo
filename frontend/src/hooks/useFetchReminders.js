import useFetchToken from './useFetchToken';

const useFetchReminders = ( accessToken ) => {
    const remindersEndPoint = 'http://localhost:8080/reminders/first3AfterToday';
    const {data, ...otherData} = useFetchToken(remindersEndPoint, accessToken);
    return {
        reminders: data,
        ...otherData
    }
}

export default useFetchReminders;