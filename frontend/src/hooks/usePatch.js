const usePatch = async(data, endpoint, token) => {
    const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
      })
      return await response.json();
}

export default usePatch;