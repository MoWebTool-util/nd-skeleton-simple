// 框架版本
const APP_CORE = '1.0.0'

// 本地模拟
const SIMULATION = 0
// 开发
const DEVELOPMENT = 1
// 测试
const DEBUG = 2
// 压测
const PRESSURE = 3
// 预生产
const PREPRODUCTION = 4
// 生产
const PRODUCTION = 5
// 亚马逊
const AWS = 6
// 党员 E 家
const DYEJIA = 7

const LOC_PROTOCOL = location.protocol + '//'
const LOC_HOST = location.host
// host === hostname:port
const LOC_HOSTNAME = location.hostname

/**
 * @constant {number} ENV
 */
const ENV = (() => {
  switch (LOC_HOSTNAME) {
    case '127.0.0.1':
      return SIMULATION
    case 'localhost':
    case '192.168.254.61':
      return DEBUG
    default:
      if (/\.dev\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT
      }
      if (/\.debug\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEBUG
      }
      if (/\.qa\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PRESSURE
      }
      if (/\.beta\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION
      }
      if (/\.aws\.101\.com$/.test(LOC_HOSTNAME)) {
        return AWS
      }
      if (/\.dyejia\.cn$/.test(LOC_HOSTNAME)) {
        return DYEJIA
      }
      return PRODUCTION
  }
})()

const LOC_RES = {
  protocol: LOC_PROTOCOL,
  host: LOC_HOST,
  ver: 'v0.1'
}

/**
 * @constant {object} UC_RES
 */

/**
 * @constant {object} CS_RES
 */

 /**
  * @constant {object} VO_RES
  */

const UC_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return {
        protocol: 'https://',
        host: 'ucbetapi.101.com',
        ver: 'v0.9'
      }
    case PRODUCTION:
      return {
        protocol: 'https://',
        host: 'aqapi.101.com',
        ver: 'v0.9'
      }
    case AWS:
      return {
        protocol: 'https://',
        host: 'awsuc.101.com',
        ver: 'v0.9'
      }
    case DYEJIA:
      return {
        protocol: 'https://',
        host: 'uc.dyejia.cn',
        ver: 'v0.9'
      }
    default:
      return LOC_RES
  }
})()

const CS_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'sdpcs.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'cs.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'https://',
        host: 'awscs.101.com',
        ver: 'v0.1'
      }
    case DYEJIA:
      return {
        protocol: 'https://',
        host: 'cs.dyejia.cn',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const VO_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'virtual-organization.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'https://',
        host: 'ucvorg.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'virtual-organization.aws.101.com',
        ver: 'v0.1'
      }
    case DYEJIA:
      return {
        protocol: 'http://',
        host: 'vorg.dyejia.cn',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

/**
 * @constant {object} MALL_RES
 */

const PAGE_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'page.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'page.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'page.social.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'page.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'page.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'page.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    case DYEJIA:
      return {
        protocol: 'http://',
        host: 'page.dyejia.cn',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const MP_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'mypage.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'mypage.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'mypage.social.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'mypage.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'mypage.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'mypage.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    case DYEJIA:
      return {
        protocol: 'http://',
        host: 'mypage.dyejia.cn',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const SH_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'shop2.dev.web.nd',
        ver: 'v0.2'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'shop2.debug.web.nd',
        ver: 'v0.2'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'shop2.social.web.sdp.101.com',
        ver: 'v0.2'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'shop2.aws.101.com',
        ver: 'v0.2'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'shop2.beta.web.sdp.101.com',
        ver: 'v0.2'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'shop2.qa.web.sdp.101.com',
        ver: 'v0.2'
      }
    case DYEJIA:
      return {
        protocol: 'http://',
        host: 'shop2.dyejia.cn',
        ver: 'v0.2'
      }
    default:
      return LOC_RES
  }
})()

const PBL_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case AWS:
    case PREPRODUCTION:
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'pbl4user.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'pbl4user.social.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const AC_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'activity01.dev.web.nd',
        ver: 'v0.2'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'activity01.debug.web.nd',
        ver: 'v0.2'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'activity01.web.sdp.101.com',
        ver: 'v0.2'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'activity01.beta.web.sdp.101.com',
        ver: 'v0.2'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'activity01.qa.web.sdp.101.com',
        ver: 'v0.2'
      }
    default:
      return LOC_RES
  }
})()

const TS_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'taskschedule.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'taskschedule.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'taskschedule.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'taskschedule.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'taskschedule.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'taskschedule.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const LO_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'lottery.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'lottery.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'lottery.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'lottery.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'lottery.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'lottery.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const AL_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'applist.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'applist.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'applist.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'applist.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'applist.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'applist.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const FO_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'forum.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'forum.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'forum.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'forum.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'forum.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'forum.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const IN_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'interaction.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'interaction.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'interaction.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'interaction.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'interaction.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'interaction.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const MB_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'microblog.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'microblog.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'microblog.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'microblog.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'microblog.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'microblog.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    case DYEJIA:
      return {
        protocol: 'http://',
        host: 'microblog.dyejia.cn',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const PK_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'pack.dev.web.nd',
        ver: 'v0.3'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'pack.debug.web.nd',
        ver: 'v0.3'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'pack.web.sdp.101.com',
        ver: 'v0.3'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'pack.aws.101.com',
        ver: 'v0.3'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'pack.beta.web.sdp.101.com',
        ver: 'v0.3'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'pack.qa.web.sdp.101.com',
        ver: 'v0.3'
      }
    default:
      return LOC_RES
  }
})()

const VT_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'voting.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'voting.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'voting.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'voting.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'voting.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'voting.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const PO_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'poll.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'poll.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'poll.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'poll.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'poll.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'poll.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const DO_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'donate.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'donate.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'donate.social.web.sdp.101.com',
        ver: 'v0.1'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'donate.aws.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'donate.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'donate.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const NE_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'news.dev.web.nd',
        ver: 'v0.2'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'news.debug.web.nd',
        ver: 'v0.2'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'news.web.sdp.101.com',
        ver: 'v0.2'
      }
    case AWS:
      return {
        protocol: 'http://',
        host: 'news.aws.101.com',
        ver: 'v0.2'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'news.beta.web.sdp.101.com',
        ver: 'v0.2'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'news.qa.web.sdp.101.com',
        ver: 'v0.2'
      }
    case DYEJIA:
      return {
        protocol: 'http://',
        host: 'news.dyejia.cn',
        ver: 'v0.2'
      }
    default:
      return LOC_RES
  }
})()

const FL_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'nd-foli.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'nd-foli.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'nd-foli.social.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'nd-foli.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'nd-foli.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

const NR_RES = (() => {
  switch (ENV) {
    case DEVELOPMENT:
      return {
        protocol: 'http://',
        host: 'nd-reader-manage.dev.web.nd',
        ver: 'v0.1'
      }
    case DEBUG:
      return {
        protocol: 'http://',
        host: 'nd-reader-manage.debug.web.nd',
        ver: 'v0.1'
      }
    case PRODUCTION:
      return {
        protocol: 'http://',
        host: 'nd-reader-manage.social.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PREPRODUCTION:
      return {
        protocol: 'http://',
        host: 'nd-reader-manage.beta.web.sdp.101.com',
        ver: 'v0.1'
      }
    case PRESSURE:
      return {
        protocol: 'http://',
        host: 'nd-reader-manage.qa.web.sdp.101.com',
        ver: 'v0.1'
      }
    default:
      return LOC_RES
  }
})()

/**
 * @constant {boolean} 开启接口请求缓存（浏览器机制）
 */
const CACHE_ENABLED = false

/**
 * @constant {object} 接口请求代理配置，设置为 null 不走代理
 */
const DISPATCHER = {
  // 只代理白名单资源
  // 设置为 null 则全部走代理
  // whitelist: [UC_RES],
  res: LOC_RES,
  api: 'dispatcher'
}

export default {
  APP_CORE,
  SIMULATION,
  DEVELOPMENT,
  DEBUG,
  PRODUCTION,
  PREPRODUCTION,
  PRESSURE,
  AWS,
  ENV,
  LOC_RES,
  UC_RES,
  CS_RES,
  VO_RES,
  PAGE_RES,
  MP_RES,
  SH_RES,
  PBL_RES,
  AC_RES,
  TS_RES,
  LO_RES,
  AL_RES,
  FO_RES,
  IN_RES,
  MB_RES,
  PK_RES,
  VT_RES,
  PO_RES,
  DO_RES,
  NE_RES,
  FL_RES,
  NR_RES,
  CACHE_ENABLED,
  DISPATCHER
}
