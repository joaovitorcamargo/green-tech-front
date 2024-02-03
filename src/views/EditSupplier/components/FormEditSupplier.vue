<script setup lang="ts">
    import { onMounted, reactive, ref, watch } from 'vue'
    import { SupplierService } from '../../../services/SupplierService'
    import { ProductService } from '../../../services/ProductService'
    import { useRouter } from 'vue-router'
    import GTButton from '@/components/Button/GTButton.vue'
    import GTInput from '@/components/Input/GTInput.vue'
    import GTSelect from '@/components/Select/GTSelect.vue'
    import GTTable from '../../../components/Table/GTTable.vue'

    const emit = defineEmits(['sendData'])
    const props = defineProps<{
        currentSupplier: any
    }>()
    const supplierService = new SupplierService()
    const productService = new ProductService()
    const router = useRouter()
    const products = ref([] as any[])

    const supplierData = reactive({
        ...props.currentSupplier,
        phone: props.currentSupplier.phone || '',
        current_product: '' as string,
    } as any)

    async function streetByCep() {
        const supplierStreet = await supplierService.getStreetByZipCode(
            supplierData.address_zip_code,
        )
        supplierData.address_name = supplierStreet.logradouro
    }

    watch(
        () => supplierData.address_zip_code,
        (value) => {
            if (value.length === 8) {
                streetByCep()
            }
            if (!value) {
                supplierData.address_name = ''
                supplierData.address_number = ''
            }
        },
    )

    watch(
        () => supplierData.current_product,
        (value) => {
            const currentIndex = products.value.findIndex((product: any) => product.id == value)
            const hasProduct = supplierData.products.findIndex(
                (product: any) => product.id == value,
            )
            if (hasProduct < 0) {
                supplierData.products.push(products.value[currentIndex])
            }
        },
    )

    onMounted(async () => {
        const getPlans = await productService.getProduct()
        products.value = getPlans.products
    })

    function returnHome() {
        router.push({
            name: 'home',
        })
    }

    async function detachProduct(supplier_id: string, product_id: string) {
        const data = {
            supplier_id,
            product_id,
        }
        const hasProductIndex = supplierData.products.findIndex(
            (product: any) => product.id == product_id,
        )

        if (hasProductIndex >= 0) {
            supplierData.products.splice(hasProductIndex, 1)
        }
        await supplierService.detachProduct(data)
    }
</script>

<template>
    <div>
        <GTInput placeholder="Nome do Fornecedor" v-model="supplierData.name" type="text" />
        <GTInput placeholder="E-mail do Fornecedor" v-model="supplierData.email" type="email" />
        <GTInput placeholder="Telefone do Fornecedor" v-model="supplierData.phone" type="tel" />
        <div class="flex flex-col lg:flex-row gap-2 w-[100%]">
            <GTInput
                placeholder="Cep do Fornecedor"
                v-model="supplierData.address_zip_code"
                type="text"
            />
            <GTInput
                placeholder="Rua do Fornecedor"
                v-model="supplierData.address_name"
                disabled
                type="text"
            />
            <GTInput
                placeholder="Número Residência"
                v-model="supplierData.address_number"
                type="number"
            />
        </div>
        <GTSelect v-model="supplierData.current_product" :options="products" />
        <GTTable class="mt-5 mb-5">
            <template v-slot:theader>
                <tr>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                    >
                        ID
                    </th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                    >
                        Produto
                    </th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                    >
                        Action
                    </th>
                </tr>
            </template>
            <template v-slot:tbody>
                <tr v-for="product in supplierData.products" :key="product.id" class="border-b">
                    <td class="p-4 pl-8">
                        {{ product.id }}
                    </td>
                    <td class="p-4">
                        {{ product.name }}
                    </td>
                    <td class="p-4">
                        <GTButton
                            label="Deletar Produto"
                            class="bg-red-400 text-white"
                            @click="detachProduct(supplierData.id, product.id)"
                        />
                    </td>
                </tr>
            </template>
        </GTTable>
        <GTButton
            label="Editar Fornecedor"
            class="bg-orange-400"
            @click.prevent="emit('sendData', supplierData)"
        />
        <GTButton label="Voltar para Home" class="bg-sky-400" @click.prevent="returnHome" />
    </div>
</template>
