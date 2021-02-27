export const API = {
  WORKS: {
    GET: process.env.API_ENDPOINT,
    KEY: process.env.API_KEY
  }
}

/**
 * topとworksにそれぞれworksを表示するときにcssを切り替えるためのキー
 */
export const STYLES_WORKS = {
  TOP: "top",
  WORKS: "works"
}