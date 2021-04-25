import platform from 'platform'

export function getIsMobile() {
  const uaLower = platform.ua.toLowerCase()
  return uaLower.indexOf("mobile") > 0
}

export function shuffleArray ([...arr]) {
  for(let i = arr.length - 1; i > 0; i--){
      const r = Math.floor(Math.random() * (i + 1));
      let tmp = arr[i];
      arr[i] = arr[r];
      arr[r] = tmp;
  }
  return arr;
}