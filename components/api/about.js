import { API } from '../utils/config'

export async function getAbout() {

  const data = await fetch(API.ABOUT.GET, {
    headers: new Headers({
      "X-API-KEY": API.KEY
    })
  }).then(res => res.json())
  .catch(err => {
    throw new Error(err)
  })
  return data
}