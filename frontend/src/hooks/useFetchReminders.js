import useFetch from './useFetch';

const useFetchReminders = () => {
    const remindersEndPoint = 'http://localhost:8080/reminders/first3AfterToday';
    const {data, ...otherData} = useFetch(remindersEndPoint);
    return {
        reminders: data,
        ...otherData
    }
}

export default useFetchReminders;