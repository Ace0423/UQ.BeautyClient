<script setup lang="ts">
import Icon from '@/assets/Icon zocial-guest.svg';
import AddIcon from '@/assets/Icon simple-addthis.svg';
import DeleteIcon from '@/assets/Icon material-delete.svg';

import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { memberList } = storeToRefs(store);
const { getMemberData, } = store;

const currentIndex = ref(0);
const memberInfoView = ref(false);
const AddMemberView = ref(false);
const selectItem = ref();
const changeTab = (index: number) => {
    currentIndex.value = index;
}
const handMemberInfoView = (item: any) => {
    console.log(item);
    selectItem.value = item;
    memberInfoView.value = !memberInfoView.value;
}
const handAddMemberView = () => {
    AddMemberView.value = !AddMemberView.value;
}

onMounted(() => {
    getMemberData();
})

</script>

<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'顧客管理'"></Header>
        <div class="customer-tab">
            <div class="item-tab">
                <!-- <button :class='currentIndex == index ? "active" : ""' v-for="(item, index) in customer_data.items_title"
                                                                                        :key="index" v-on:click="changeTab(index)">{{ item.title }} </button> -->
                <button :class='currentIndex == 0 ? "active" : ""' v-on:click="changeTab(0)">所有客戶</button>
                <button :class='currentIndex == 1 ? "active" : ""' v-on:click="changeTab(1)">標籤設定</button>
            </div>
            <div :class='currentIndex != 0 ? "current" : ""'>
                <div class="header-tab">
                    <p>客戶(全部{{ memberList.data.length }}個)</p>
                    <div>
                        <input />
                        <button class="header-btn" @click="handAddMemberView()"><img :src="AddIcon" /></button>
                    </div>
                </div>
                <table>
                    <tr v-for="(item) in memberList.data" :key="item.userId" @click="handMemberInfoView(item)">
                        <td class="img-td"><img :src="Icon" /></td>
                        <td class="p-td">
                            <p>{{ item.nameView }}</p>
                            <p>{{ item.phone }}</p>
                        </td>
                        <!-- <td class="btn-td">
                                                                                    <button><img :src="DeleteIcon" /></button>
                                                                                </td> -->
                    </tr>
                </table>
            </div>

            <div :class='currentIndex != 1 ? "current" : ""'>
                <div class="header-tab">
                    <p>客戶標籤(全部0個)</p>
                    <div>
                        <input />
                    </div>
                </div>
                <table>
                </table>
            </div>
        </div>
    </div>
    <AddMember v-if="AddMemberView" :hand-add-member-view="handAddMemberView" />
    <MemberInfo v-if="memberInfoView" :hand-member-info-view="handMemberInfoView" :select-item="selectItem" />
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    position: relative;

    >.customer-tab {
        margin: 2px 40px;

        >.item-tab {
            display: flex;

            >button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                width: 120px;
                height: 45px;
                border-radius: 10px 10px 0 0;
                background-color: #faf9f8;
                font-size: 20px;
                font-weight: bold;
                font-family: HeitiTC;
                color: #717171;
            }

            >button.active {
                background-color: #e6e2de;
            }
        }

        >div {
            >.header-tab {
                justify-content: space-between;
                height: 47px;
                // padding: 0 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                color: #717171;
                border: solid 1px #707070;
                background-color: #e6e2de;

                >p {
                    margin: 0 20px;
                }

                >div {
                    display: flex;
                    margin: 0 30px;

                    >button {
                        display: contents;
                        // background-color: transparent;
                        // border: none
                    }

                    >input {
                        width: 134px;
                        height: 30px;
                        border-radius: 6px;
                        border: solid 1px #707070;
                        background-color: #fff;
                        margin-right: 10px;

                    }
                }
            }

            >table {
                display: inline-block;
                padding: 10px 25px;
                width: 100%;

                background-color: #faf9f8;
                border: solid 0.5px #ddd;
                font-family: STXihei;
                // font-size: 20px;
                color: #717171;
                table-layout: fixed;
                min-height: 520px;

                >tr {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    border-bottom: 2px solid rgba(112, 112, 112, 0.5);


                    >td {
                        height: 47px;

                        >img {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            padding: 5px 10px;
                            border-radius: 45px;
                        }

                        >button {
                            height: 100%;
                            background-color: transparent;
                            border: none
                        }

                        &.p-td {
                            flex: 1;

                            >p {
                                cursor: pointer;
                                display: table;
                                margin: 3px;
                                padding: 0 0;
                            }
                        }
                    }
                }
            }
        }

        .current {
            display: none;
        }
    }
}
</style>