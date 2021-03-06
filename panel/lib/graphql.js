import { useState } from 'react'
import useSWR from 'swr'
const fetcher = async query => {
  const res = await fetch(process.env.NEXT_PUBLIC_API, {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: query
  })
  const json = await res.json()
  return json.data
}

const useQuery = queryStr => {
  const query = {
    query: queryStr
  }
  return useSWR(JSON.stringify(query), fetcher)
}
const useMutation = query => {
  const [data, setData] = useState(null)
  const mutate = async variables => {
    const mutation = {
      query,
      variables
    }
    try {
      const returnedData = await fetcher(JSON.stringify(mutation))
      setData(returnedData)
    } catch (err) {}
  }
  return [data, mutate]
}

export { useQuery, useMutation }
