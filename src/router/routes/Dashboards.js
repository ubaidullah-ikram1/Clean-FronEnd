import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/cropmonitor/home',
    component: lazy(() => import('../../views/pages/blog/list/index')),
    exact: true
  }
]

export default DashboardRoutes
