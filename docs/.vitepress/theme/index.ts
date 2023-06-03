import 'windi.css'

import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Pages from './components/Pages.vue'

import '../styles/public.scss'
import '../styles/custom.scss'

export default {
  ...DefaultTheme,
  Layout
}
