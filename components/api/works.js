import { API } from '../utils/config'

export async function getWorks(id = null) {
  let url = API.WORKS.GET
  if(id) url += `/${id}`  //{endpoint} + "/[id]"とすると特定のidのものだけ取得できる
  const data = await fetch(url, {
    headers: new Headers({
      "X-API-KEY": API.KEY
    })
  }).then(res => res.json())
  .catch(err => {
    throw new Error(err)
  })
  return data
}