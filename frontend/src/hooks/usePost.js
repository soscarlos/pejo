const usePost = async(data, endpoint, token) => {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
      })
    const newData = await res.json();
    return newData;
}

export default usePost;