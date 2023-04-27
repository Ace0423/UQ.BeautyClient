<script setup lang="ts">
import { useCounterStore } from "@/stores/member";
// import vMultiselectListbox from 'vue-multiselect-listbox'
import 'vue-multiselect-listbox/dist/vue-multi-select-listbox.css';
const store = useCounterStore();
const { getGroupInfoData, memberList, groupListData } = store;
const props = defineProps<{
    groupInfoItem: any
    handGroupInfoView: Function,
}>()
const groupInfo = reactive({
    groupId: 0,
    label: '',
    memo: '',
});
const value = ref([]);
const options = ref([
    { label: 'Alabama', code: 'al' }, { label: 'California', code: 'cal' }
])

// const handSubmit = () => {
//     if (props.selectGroupItem) {
//         editGroupData(newGroup).then((res) => {
//             if (res == 1) {
//                 props.handAddGroupView()
//             }
//         })
//     } else {
//         createGroupData(newGroup).then((res) => {npm install vue-multiselect-listbo
//             if (res == 1) {
//                 props.handAddGroupView()
//             }
//         })
//     }
// }

onMounted(() => {
    if (props.groupInfoItem) {
        // console.log(props.groupInfoItem);
        groupInfo.groupId = props.groupInfoItem.groupId;
        groupInfo.label = props.groupInfoItem.label;
        groupInfo.memo = props.groupInfoItem.memo;
    }
    getGroupInfoData(props.groupInfoItem).then((res) => {
        if (res == 1) {
            // props.handGroupInfoView()
        }
    })

})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handGroupInfoView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ groupInfo.label }}</h1>
            <p>備註:{{ groupInfo.memo }}</p>
            <table>
                <tr class="header-tab">
                    <td>會員:{{ groupListData.data.length }}位 </td>
                </tr>
                <tr class="content-tab">
                    <td v-for="(item, index) in groupListData.data" :key="item.userId">
                        <p>{{ item.nameView }}</p>
                    </td>
                </tr>
            </table>
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
        width: 50%;
        height: 50%;
        // max-width: 500px;
        // text-align: center;
        background-color: #e6e2de;
        padding: 15px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        >h1 {
            text-align: center;
            font-size: 25px;
        }

        >p {
            margin: 10px;
        }

        >table {
            width: 100%;
            height: 75%;
            background-color: #faf9f8;
            border: solid 0.5px #ddd;
            font-family: STXihei;
            // font-size: 20px;
            color: #717171;

            >.header-tab {
                background-color: #717171;
                border: solid 0.5px #ddd;
                color: #ffffff;
                height: 30px;

                >td {
                    padding: 5px 10px;
                }
            }

            >.content-tab {
                >td {
                    vertical-align: sub;

                    >p {
                        margin: 10px;
                        padding: 10px 10px;
                        border-bottom: 1px #000 solid;
                        padding-bottom: 5px;
                    }
                }
            }
        }
    }

}
</style>