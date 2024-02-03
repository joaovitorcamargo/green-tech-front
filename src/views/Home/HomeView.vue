<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import GTButton from '../../components/Button/GTButton.vue'
    import GTTable from '../../components/Table/GTTable.vue'
    import { SupplierService } from '@/services/SupplierService'
    import { toast } from 'vue3-toastify'

    const supplierService = new SupplierService()
    const router = useRouter()
    const suppliers = ref([] as any)

    onMounted(async () => {
        await getSuppliers()
    })

    async function getSuppliers() {
        const suppliersData = await supplierService.getSuppliers()
        suppliers.value = suppliersData.suppliers
    }

    function goToCreateSupplierPage() {
        router.push({
            name: 'create-supplier',
        })
    }

    function goToCreateProductPage() {
        router.push({
            name: 'create-product',
        })
    }

    async function deleteSupplier(id: number) {
        try {
            await toast.promise(
                supplierService.deleteSupplier(id),
                {
                    success: {
                        render() {
                            getSuppliers()
                            return 'Usuário Deletado com sucesso'
                        },
                    },
                    error: 'Erro ao deletar usuário',
                },
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 2000,
                    closeButton: false,
                },
            )
        } catch (error) {
            //
        }
    }

    function editSupplier(id: number) {
        router.push({
            name: 'edit-supplier',
            params: {
                id,
            },
        })
    }
</script>

<template>
    <div class="flex flex-col items-center gap-10 w-[90%] md:w-[70%] lg:w-[50%]">
        <h1 class="text-5xl mt-10">Green-Tech</h1>
        <div class="flex flex-col items-center md:flex-row md:justify-center gap-5 w-full">
            <GTButton label="Criar Fornecedor" class="bg-sky-400" @click="goToCreateSupplierPage" />
            <GTButton label="Criar Produto" class="bg-orange-400" @click="goToCreateProductPage" />
        </div>
        <div class="w-full flex justify-center">
            <GTTable v-if="suppliers.length">
                <template v-slot:theader>
                    <tr>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                        >
                            Supplier
                        </th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                        >
                            Actions
                        </th>
                    </tr>
                </template>
                <template v-slot:tbody>
                    <tr v-for="supplier in suppliers" :key="supplier.id" class="border-b">
                        <td class="p-4 pl-8">
                            {{ supplier.name }}
                        </td>
                        <td class="flex flex-col lg:flex-row gap-3 p-4">
                            <GTButton
                                label="Editar Fornecedor"
                                class="bg-sky-400 text-black"
                                @click="editSupplier(supplier.id)"
                            />
                            <GTButton
                                label="Deletar Fornecedor"
                                class="bg-red-400 text-white"
                                @click="deleteSupplier(supplier.id)"
                            />
                        </td>
                    </tr>
                </template>
            </GTTable>
            <h1 v-else class="text-xl">Nenhum Fornecedor Criado</h1>
        </div>
    </div>
</template>
