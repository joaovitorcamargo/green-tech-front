import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import CreateSupplier from '@/views/CreateSupplier/CreateSupplier.vue'
import CreateProduct from '@/views/CreateProduct/CreateProduct.vue'
import EditSupplier from '@/views/EditSupplier/EditSupplier.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/create-supplier',
            name: 'create-supplier',
            component: CreateSupplier,
        },
        {
            path: '/create-product',
            name: 'create-product',
            component: CreateProduct,
        },
        {
            path: '/supplier/edit/:id',
            name: 'edit-supplier',
            component: EditSupplier,
            props: true,
        },
    ],
})

export default router
