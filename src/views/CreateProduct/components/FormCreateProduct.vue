<script setup lang="ts">
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import GTInput from '../../../components/Input/GTInput.vue'
    import GTButton from '../../../components/Button/GTButton.vue'

    const emit = defineEmits(['sendData'])
    const router = useRouter()
    const productData = reactive({
        name: '' as string,
        description: '' as string,
        unit_price: '' as string,
        category: '' as string,
        stock_quantity: '' as string,
    } as any)

    function returnHome() {
        router.push({
            name: 'home',
        })
    }
</script>

<template>
    <div class="w-[60%] lg:w-[50%] flex flex-col items-center gap-2">
        <GTInput placeholder="Nome do Produto" v-model="productData.name" type="text" />
        <GTInput
            placeholder="Descrição do Produto"
            v-model="productData.description"
            type="email"
        />
        <GTInput
            placeholder="Preço unitário do Produto"
            v-model="productData.unit_price"
            type="number"
        />
        <GTInput placeholder="Categoria do Produto" v-model="productData.category" type="text" />
        <GTInput
            placeholder="Quantidade em Estoque"
            v-model="productData.stock_quantity"
            type="number"
        />
        <GTButton
            label="Criar Produto"
            class="bg-orange-400"
            @click.prevent="emit('sendData', productData)"
        />
        <GTButton label="Voltar para Home" class="bg-sky-400" @click.prevent="returnHome" />
    </div>
</template>
