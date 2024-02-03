<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { ProductService } from '../../services/ProductService'
    import Toasts from '../../helpers/Toasts'
    import FormCreateProduct from './components/FormCreateProduct.vue'

    const productService = new ProductService()

    const router = useRouter()

    async function sendData(data: any) {
        await Toasts(productService.createProduct({ ...data }), 'Produto Criado com sucesso')
        setTimeout(() => {
            router.push({
                name: 'home',
            })
        }, 2000)
    }
</script>

<template>
    <div class="flex flex-col items-center gap-10 w-[100%] mb-10">
        <h1 class="text-5xl mt-10">Green-Tech</h1>
        <h1 class="text-xl">Criando um Produto</h1>
        <FormCreateProduct
            class="w-[60%] lg:w-[50%] flex flex-col items-center gap-2"
            @sendData="sendData"
        />
    </div>
</template>
