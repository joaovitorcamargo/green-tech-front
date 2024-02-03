<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { SupplierService } from '../../services/SupplierService'
    import Toasts from '../../helpers/Toasts'
    import FormCreateSupplier from './components/FormCreateSupplier.vue'
    import { type SupplierType } from '../../services/SupplierService/Types/SupplierType'

    const supplierService = new SupplierService()

    const router = useRouter()

    async function sendData(data: SupplierType) {
        await Toasts(supplierService.createSupplier({ ...data }), 'Usuário Criado com sucesso')
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
        <h1 class="text-xl">Criando um Fornecedor</h1>
        <FormCreateSupplier
            class="w-[60%] lg:w-[50%] flex flex-col items-center gap-2"
            @sendData="sendData"
        />
    </div>
</template>
