<script setup lang="ts">
    import { reactive, watch } from 'vue'
    import { type SupplierType } from '../../../services/SupplierService/Types/SupplierType'
    import { SupplierService } from '../../../services/SupplierService'
    import { useRouter } from 'vue-router'
    import GTButton from '@/components/Button/GTButton.vue'
    import GTInput from '@/components/Input/GTInput.vue'

    const emit = defineEmits(['sendData'])
    const supplierService = new SupplierService()
    const router = useRouter()
    const supplierData = reactive({
        name: '' as string,
        email: '' as string,
        phone: '' as string,
        address_zip_code: '' as string,
        address_number: '' as string,
        address_name: '' as string,
    } as SupplierType)

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

    function returnHome() {
        router.push({
            name: 'home',
        })
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
        <GTButton
            label="Criar Fornecedor"
            class="bg-orange-400"
            @click.prevent="emit('sendData', supplierData)"
        />
        <GTButton label="Voltar para Home" class="bg-sky-400" @click.prevent="returnHome" />
    </div>
</template>
