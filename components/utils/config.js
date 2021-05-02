export const API = {
  KEY: process.env.API_KEY,
  WORKS: {
    GET: process.env.API_ENDPOINT + "works",
  },
  ABOUT: {
    GET: process.env.API_ENDPOINT + "about"
  }
}

/**
 * topとworksにそれぞれworksを表示するときにcssを切り替えるためのキー
 */
export const STYLES_WORKS = {
  TOP: "top",
  WORKS: "works",
  BREAKPOINTS: {
    TOP: {
        default: 2,
        1350: 2,
        1048: 1,
        576: 1,
    },
  }
}