<script setup lang="ts">
import Icon from '@/assets/Icon zocial-guest.svg';
import AddIcon from '@/assets/Icon simple-addthis.svg';
import DeleteIcon from '@/assets/Icon material-delete.svg';
import InfoIcon from '@/assets/Icon ionic-ios-list-box.svg';
import editIcon from '@/assets/Icon awesome-edit.svg';
import { useCounterStore } from "@/stores/member";
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { memberList, groupListData } = storeToRefs(store);
const { getMemberList, getGroupData } = store;

const currentIndex = ref(0);
const memberInfoView = ref(false);
const addMemberView = ref(false);
const addGroupView = ref(false);
const groupInfoView = ref(false);
const selectMemberItem = ref();
const selectGroupItem = ref();
const groupInfoItem = ref();
const keyWord = ref('');
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
const filterMemberListData = computed(() => {
    const filter = memberList.value.data.filter(getMemberListFn);
    return filter;
})
const getMemberListFn = (data: any) => {
    if (keyWord.value.substring(0, 1) == '0' || keyWord.value.substring(0, 2) == '09') {
        return (
            (!keyWord.value || data.phone.toLowerCase().includes(keyWord.value.toLowerCase()))
        )
    } else {
        return (
            (!keyWord.value || data.nameView.toLowerCase().includes(keyWord.value.toLowerCase()))
        )
    }
}
const filterGroupListData = computed(() => {
    const filter = groupListData.value.data.filter(getGroupListFn);
    return filter;
})
const getGroupListFn = (data: any) => {
    return (
        (!keyWord.value || data.label.toLowerCase().includes(keyWord.value.toLowerCase()))
    )
}
onMounted(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    getMemberList();
    getGroupData();
})

</script>

<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'顧客管理'"></Header>
        <div class="customer-tab">
            <div class="item-tab">
                <button :class='currentIndex == 0 ? "active" : ""' v-on:click="changeTab(0)">所有顧客</button>
                <button :class='currentIndex == 1 ? "active" : ""' v-on:click="changeTab(1)">標籤設定</button>
            </div>
            <div :class='currentIndex != 0 ? "current" : ""'>
                <div class="header-tab">
                    <p>顧客(全部{{ filterMemberListData.length }}個)</p>
                    <div>
                        <input v-model="keyWord" />
                        <button class="header-btn" v-on:click="handAddMemberView()">新增顧客</button>
                    </div>
                </div>
                <table>
                    <tr v-for="(item) in filterMemberListData" :key="item.userId">
                        <td class="flex-td"><img :src="Icon" />
                            <div v-on:click="handMemberInfoView(item)">
                                <p>{{ item.nameView }}</p>
                                <p>{{ item.phone }}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div :class='currentIndex != 1 ? "current" : ""'>
                <div class="header-tab">
                    <p>顧客標籤(全部{{ filterGroupListData.length }}個)</p>
                    <div>
                        <input v-model="keyWord" />
                        <button class="header-btn" v-on:click="handAddGroupView('')">新增標籤</button>
                    </div>
                </div>
                <table>
                    <tr v-for="(item) in filterGroupListData" :key="item.groupId">
                        <td>
                            <p>{{ item.label }}</p>
                            <div>
                                <button class="header-btn" v-on:click="handGroupInfoView(item)"><img
                                        :src="InfoIcon" /></button>
                                <button class="header-btn" v-on:click="handAddGroupView(item)"><img
                                        :src="editIcon" /></button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <AddMember v-if="addMemberView" :hand-add-member-view="handAddMemberView" :select-member-item="selectMemberItem" />
    <MemberInfo v-if="memberInfoView" :hand-member-info-view="handMemberInfoView" :select-member-item="selectMemberItem"
        :hand-add-member-view="handAddMemberView" />
    <AddGroup v-if="addGroupView" :hand-add-group-view="handAddGroupView" :select-group-item="selectGroupItem" />
    <GroupInfo v-if="groupInfoView" :group-info-item="groupInfoItem" :hand-group-info-view="handGroupInfoView" />
</template>

<style scoped lang="scss">
.container {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
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
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: none;
                        min-width: 92px;
                        padding: 2px 10px;
                        border-radius: 10px 10px 10px 10px;
                        background-color: #84715c;
                        font-size: 18px;
                        font-weight: bold;
                        font-family: HeitiTC;
                        color: #ffffff
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
                overflow: auto;
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
                        display: flex;
                        width: 100%;
                        height: 47px;
                        justify-content: space-between;




                        >p {
                            cursor: pointer;
                            padding: 0 10px;
                        }

                        >div {
                            display: flex;

                            >button {
                                // width: 45px;
                                // height: 45px;
                                background-color: transparent;
                                border: none;
                                padding: 0 0 0 0;
                                margin: 0 2px 0 2px;

                                >img {
                                    cursor: pointer;
                                    width: 100%;
                                    height: 100%;
                                    // padding: 5px 10px;
                                }
                            }
                        }

                    }

                    >.flex-td {
                        display: flex;
                        justify-content: flex-start;

                        >div {
                            cursor: pointer;

                            >p {
                                margin: 0 0;
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