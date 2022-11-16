const usePut = async(data, endpoint, token) => {
    const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
      })
      return await res.json();
}

export default usePut;