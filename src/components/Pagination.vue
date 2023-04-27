<script setup lang="ts">
import { useCounterStore } from "@/stores/member";
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { memberList, groupData } = storeToRefs(store);
const perPage = 10;
let page = ref(1);

const nextPage = () => {
    // if (page.value !== Math.ceil(memberList.data.length / perPage)) {
    //     page.value += 1;
    // }
};

const backPage = () => {
    if (page.value !== 1) {
        page.value -= 1;
    }
};

const goToPage = (numPage: any) => {
    page.value = numPage;
};
</script>
<template>
    <button @click="backPage">prev</button>
    <button v-for="item in Math.ceil(memberList.data.length / perPage)" :key="item" @click="() => goToPage(item)">
        {{ item }}
    </button>
    <button @click="nextPage">next</button>
</template>

<style scoped lang="scss"></style>