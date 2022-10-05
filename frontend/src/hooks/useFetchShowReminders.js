import useFetch from './useFetch';

const useFetchShowReminders = () => {
    const remindersEndPoint = 'http://localhost:8080/reminders';
    const {data,...otherData} = useFetch(remindersEndPoint);
    return {
        reminders: data,
        ...otherData
    }
}

export default useFetchShowReminders;