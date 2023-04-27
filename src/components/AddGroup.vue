<script setup lang="ts">
import { useCounterStore } from "@/stores/member";
const store = useCounterStore();
const { createGroupData, editGroupData } = store;
const title = ref('新增標籤');
const props = defineProps<{
    selectGroupItem: any
    handAddGroupView: Function,
}>()
const newGroup = reactive({
    groupId: 0,
    label: '',
    memo: '',
});

const handSubmit = () => {
    if (props.selectGroupItem) {
        editGroupData(newGroup).then((res) => {
            if (res == 1) {
                props.handAddGroupView()
            }
        })
    } else {
        createGroupData(newGroup).then((res) => {
            if (res == 1) {
                props.handAddGroupView()
            }
        })
    }
}

onMounted(() => {
    if (props.selectGroupItem) {
        title.value = '修改標籤';
        newGroup.groupId = props.selectGroupItem.groupId;
        newGroup.label = props.selectGroupItem.label;
        newGroup.memo = props.selectGroupItem.memo;
    }
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddGroupView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <input v-model="newGroup.label" />
            <button type="submit" v-on:click="handSubmit()">確認</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50002;
    background: rgba(255, 255, 255, 0.5);


    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        max-width: 250px;
        text-align: center;
        background-color: #e6e2de;
        padding: 15px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        >h1 {
            font-size: 20px;
        }

        >input {
            widows: 100%;
            margin: 10px;
            height: 30px;
            text-align: center;
            border-radius: 6px;
            border: solid 1px #707070;
        }

        >button {
            padding: 10px 10px;
            font-size: 20px;
            color: #84715c;
            border-radius: 10px;
            background-color: #faf9f8;
            border: solid 1px #707070;
        }
    }

}
</style>