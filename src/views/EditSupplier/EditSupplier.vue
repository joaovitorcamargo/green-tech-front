<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { SupplierService } from '../../services/SupplierService'
    import Toasts from '../../helpers/Toasts'
    import FormEditSupplier from './components/FormEditSupplier.vue'

    const supplierService = new SupplierService()
    const router = useRouter()
    const route = useRoute()
    const supplier = ref({} as any)

    async function sendData(data: any) {
        await Toasts(supplierService.editSupplier(data, data.id), 'Usuário Editado com sucesso')
        setTimeout(() => {
            router.push({
                name: 'home',
            })
        }, 2000)
    }

    onMounted(async () => {
        const currentSupplier = await supplierService.getCurrentSupplier(String(route.params.id))
        supplier.value = currentSupplier.supplier
    })
</script>

<template>
    <div class="flex flex-col items-center gap-10 w-[100%] mb-10" v-if="supplier.id">
        <h1 class="text-5xl mt-10">Green-Tech</h1>
        <h1 class="text-xl">Editando o Fornecedor</h1>
        <FormEditSupplier
            class="w-[60%] lg:w-[50%] flex flex-col items-center gap-2"
            :currentSupplier="supplier"
            @sendData="sendData"
        />
    </div>
</template>
