const usePostRegister = async(data, endpoint) => {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      })
    const newData = await res.json();
    return newData;
}

export default usePostRegister;