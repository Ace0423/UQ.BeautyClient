<script setup lang="ts">
import Icon from '@/assets/Icon zocial-guest.svg';
import AddIcon from '@/assets/Icon simple-addthis.svg';
import DeleteIcon from '@/assets/Icon material-delete.svg';

import { useCounterStore } from "@/stores/member";
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { memberList, groupData } = storeToRefs(store);
const { getMemberList, getGroupData } = store;

const currentIndex = ref(0);
const memberInfoView = ref(false);
const addMemberView = ref(false);
const addGroupView = ref(false);
const groupInfoView = ref(false);
const selectMemberItem = ref();
const selectGroupItem = ref();
const groupInfoItem = ref();
const i = ref(0)
const changeTab = (index: number) => {
    currentIndex.value = index;
}
const handMemberInfoView = (item: any) => {
    selectMemberItem.value = item;
    memberInfoView.value = !memberInfoView.value;
}
const handAddMemberView = () => {
    addMemberView.value = !addMemberView.value;

}
const handAddGroupView = (item: any) => {
    selectGroupItem.value = item;
    addGroupView.value = !addGroupView.value;

}
const handGroupInfoView = (item: any) => {
    groupInfoItem.value = item;
    groupInfoView.value = !groupInfoView.value;

}
const add = () => {
    i.value = i.value * 10;
    console.log(i);
}
onMounted(() => {
    getMemberList();
    getGroupData();
})

</script>

<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'顧客管理'"></Header>
        <div class="customer-tab">
            <div class="item-tab">
                <button :class='currentIndex == 0 ? "active" : ""' v-on:click="changeTab(0)">所有客戶</button>
                <button :class='currentIndex == 1 ? "active" : ""' v-on:click="changeTab(1)">標籤設定</button>
            </div>
            <div :class='currentIndex != 0 ? "current" : ""'>
                <div class="header-tab">
                    <p>客戶(全部{{ memberList.data.length }}個)</p>
                    <div>
                        <input />
                        <button class="header-btn" v-on:click="handAddMemberView()"><img :src="AddIcon" /></button>
                    </div>
                </div>
                <table>
                    <tr v-for="(item, index) in memberList.data" :key="item.userId" v-on:click="handMemberInfoView(item)">
                        <td class="img-td"><img :src="Icon" /></td>
                        <td class="p-td">
                            <p>{{ item.nameView }}</p>
                            <p>{{ item.phone }}</p>
                        </td>
                    </tr>
                </table>
            </div>

            <div :class='currentIndex != 1 ? "current" : ""'>
                <div class="header-tab">
                    <p>客戶標籤(全部{{ groupData.data.length }}個)</p>
                    <div>
                        <input />
                        <button class="header-btn" v-on:click="handAddGroupView('')"><img :src="AddIcon" /></button>
                    </div>
                </div>
                <table>
                    <tr v-for="(item, index) in groupData.data.slice(i, 10)" :key="item.groupId"
                        v-on:click="handGroupInfoView(item)">
                        <td>
                            <p>{{ item.label }}</p>
                        </td>
                    </tr>
                    <!-- <Pagination></Pagination> -->
                </table>

            </div>
        </div>
    </div>
    <AddMember v-if="addMemberView" :hand-add-member-view="handAddMemberView" :select-member-item="selectMemberItem" />
    <MemberInfo v-if="memberInfoView" :hand-member-info-view="handMemberInfoView" :select-member-item="selectMemberItem"
        :hand-add-member-view="handAddMemberView" />
    <AddGroup v-if="addGroupView" :hand-add-group-view="handAddGroupView" :select-group-item="selectGroupItem"/>
    <GroupInfo v-if="groupInfoView" :group-info-item="groupInfoItem" :hand-group-info-view="handGroupInfoView"/>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    position: relative;

    >.customer-tab {
        position: absolute;
        top: 80px;
        bottom: 0px;
        left: 0px;
        right: 0PX;
        margin: 2px 40px;

        >.item-tab {
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0PX;
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
            position: absolute;
            top: 45px;
            bottom: 0px;
            left: 0px;
            right: 0PX;

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
                position: absolute;
                top: 49px;
                bottom: 10px;
                left: 0px;
                right: 0PX;
                display: inline-block;
                padding: 10px 25px;
                width: 100%;

                background-color: #faf9f8;
                border: solid 0.5px #ddd;
                font-family: STXihei;
                // font-size: 20px;
                color: #717171;
                table-layout: fixed;
                // min-height: 520px;

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

                        >p {
                            padding: 0 10px;
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