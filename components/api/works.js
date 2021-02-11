import { API } from '../utils/config'

export async function getWorks() {

  const data = await fetch(API.WORKS.GET, {
    headers: new Headers({
      "X-API-KEY": API.WORKS.KEY
    })
  }).then(res => res.json())
  .catch(err => {
    throw new Error(err)
  })
  return data
}