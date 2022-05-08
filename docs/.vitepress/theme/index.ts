import 'windi.css'

import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

import '../styles/public.scss'
import '../styles/custom.scss'

export default {
  ...DefaultTheme,
  Layout
}
