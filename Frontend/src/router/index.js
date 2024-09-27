import { createRouter, createWebHistory } from 'vue-router'
// views for Admin layout
import Dashboard from '@/views/admin/Dashboard.vue'
import Produk from '@/views/admin/Product.vue'
import Admin from '@/views/admin/Admin.vue'
import Pesanan from '@/views/admin/Order.vue'
import Karyawan from '@/views/admin/Employee.vue'
import Pelanggan from '@/views/admin/Customer.vue'
import Kategori from '@/views/admin/Categorie.vue'

// layouts
import AdminLayout from '@/components/layout/AdminLayout.vue'

// views for Auth layout
import LoginView from '@/views/auth/LoginPage.vue'
import Register from '@/views/auth/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },    
      {
        path: '/register',
        name: 'register',
        component: Register
      },  
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/admin',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/admin/product',
          name: 'produk',
          component: Produk
        },
        {
          path: '/admin/order',
          name: 'pesanan',
          component: Pesanan
        },
        {
          path: '/admin/admin',
          name: 'admin',
          component: Admin
        },
        {
          path: '/admin/categori',
          name: 'kategori',
          component: Kategori
        },
        {
          path: '/admin/customer',
          name: 'pelanggan',
          component: Pelanggan
        },
        {
          path: '/admin/employee',
          name: 'karyawan',
          component: Karyawan
        },
      ]
    },
  ]
})

export default router