import platform from 'platform'

export function getIsMobile() {
  const uaLower = platform.ua.toLowerCase()
  return uaLower.indexOf("mobile") > 0
}