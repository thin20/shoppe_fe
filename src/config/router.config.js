import UserLayout from '@/views/user'
import NotFound from '@/components/notFound'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

console.log(RouteView)

export const asyncRouterMapUser = [
  {
    path: '/',
    name: 'user',
    component: UserLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/user/home')
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('@/views/user/products')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/user/cart')
      }
    ]
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
]
