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
  WORKS: "works",
  BREAKPOINTS: {
    TOP: {
        default: 4,
        1350: 3,
        1048: 2,
        576: 1,
    },
    WORKS: {
      default: 4*2,
      1350: 3*2,
      1048: 2*2,
      576: 1*2,
    }
  }
}