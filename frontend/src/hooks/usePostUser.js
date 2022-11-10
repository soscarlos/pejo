import {Buffer} from 'buffer';

const usePostUser = async(user, endpoint) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${user.email}:${user.password}`).toString('base64')
        }
      })
    const newData = response.text();
    return newData;
}

export default usePostUser;