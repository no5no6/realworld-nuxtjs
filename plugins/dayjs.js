import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format = 'MMM DD,YYYY') => dayjs(value).format(format))
