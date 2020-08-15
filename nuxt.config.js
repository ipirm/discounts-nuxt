import {APP_URI} from './config/types'
import apiRequest from "./utils/apiRequest";

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  env: {
    baseURL: process.env.APP_URL || 'http://localhost:3000'
  },
  head: {
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'X-UA-Compatible', content: 'ie=edge'},
      {name: "robots", content: "index, follow"},
      {name: "googlebot", content: "index, follow"},
      {name: "yandex-verification", content: "bfe8590f91f9e884"},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [{
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'data-ad-client': "ca-pub-8393839430219283",
      async: true
    }]
  },
  // webfontloader: {
  //     google: {
  //         families: [
  //             'Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap'
  //         ]
  //     }
  // },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#F8C563'
  },
  /*
  ** Global CSS
  */
  css: [
    {src: '~assets/scss/app.scss', lang: 'scss'}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/bootstrap-vue', ssr: true},
    {src: '~plugins/vue-select', ssr: false},
    {src: '~plugins/infinity-scroll', ssr: false},
    {src: '~plugins/swiper', ssr: false},
    {src: '~plugins/map', ssr: true},
    {src: '~plugins/vue-scrollto'},
    {src: '~plugins/social.js', ssr: false},
    {src: '~plugins/event-bus'},
    {src: '~plugins/components'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'nuxt-i18n',
      {
        noPrefixDefaultLocale: true,
        locales: [
          {code: 'az', iso: 'az-AZ', file: 'az.json'},
          {code: 'ru', iso: 'ru-RU', file: 'ru.json'}
        ],
        defaultLocale: 'ru',
        vueI18n: {
          fallbackLocale: 'ru'
        },
        lazy: true,
        langDir: 'locales/'
      }
    ],
    '@nuxtjs/svg-sprite',
    'cookie-universal-nuxt',
    'nuxt-mq',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/google-analytics',
    'nuxt-lazy-load',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '66190426',
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      }
    ],
  ],
  sitemap: {
    hostname: APP_URI,
    gzip: true,
    exclude: ["/secret", "/admin/**"]
  },
  googleAnalytics: {
    id: "UA-163816416-3"
  },
  svgSprite: {
    input: '~/assets/svg/'
  },
  toast: {
    position: 'bottom-right',
    duration: 4000
  },
  // serverMiddleware: ['redirect-ssl'],
  mq: {
    defaultBreakpoint: "desktop",
    breakpoints: {
      mobile: 500,
      tablet: 1024,
      desktop: 1400,
      desktopWide: 2000,
      desktopUltraWide: Infinity
    }
  },

  // router: {
  //   async extendRoutes(routes, resolve) {
  //     const companies = await apiRequest.get('posts-company'),
  //           cats = await apiRequest.get('posts-cats'),
  //           types = await apiRequest.get(`posts-type`);

  //     if (companies.data && cats.data && types.data) {
  //       const selects = [...companies.data.data, ...cats.data.data, ...types.data.data];

  //       selects.forEach(s => {
  //         // routes.push({
  //         //   path: '',
  //         //   component: resolve(__dirname, 'pages/index.vue')
  //         // })

  //       });
  //     }
  //   }
  // },

  build: {
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    transpile: [/^vue2-google-maps($|\/)/, /^vue2-gmap-custom-marker($|\/)/],
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
