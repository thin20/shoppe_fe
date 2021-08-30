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
    component: UserLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/user/home')
      },
      {
        path: '/category/:categoryId',
        name: 'productsByCategory',
        component: () => import('@/views/user/products_by_category')
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
