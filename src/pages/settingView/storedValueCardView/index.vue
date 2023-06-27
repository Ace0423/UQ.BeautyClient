
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useManagerStore } from "@/stores/manager";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerstore = useManagerStore();
const { managerList } = storeToRefs(managerstore);
const { getManagerList } = managerstore;
const addStoredValueCardView = ref(false);
const selectStoredValueCardItem = ref();
const keyWord = ref("");
const handAddStoredValueCardView = (item: any) => {
    selectStoredValueCardItem.value = item;
    addStoredValueCardView.value = !addStoredValueCardView.value;
};
const filterManagerListData = computed(() => {
    const filter = managerList.value.data.filter(getManagerListFn);
    return filter;
});
const getManagerListFn = (data: any) => {
    if (
        keyWord.value.substring(0, 1) == "0" ||
        keyWord.value.substring(0, 2) == "09"
    ) {
        return (
            !keyWord.value ||
            data.phone.toLowerCase().includes(keyWord.value.toLowerCase())
        );
    } else {
        return (
            !keyWord.value ||
            data.nameView.toLowerCase().includes(keyWord.value.toLowerCase())
        );
    }
};

onMounted(() => {
    let allManager = {
        id: 0,
        pageindex: 0,
        count: 0,
    };
    getManagerList(allManager)
        .then((res) => {
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
            }
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        });
})
</script>
<template>
    <div>
        <div class="function-area">
            <input placeholder="🔍搜尋" v-model="keyWord" />
            <button class="header-btn" @click="handAddStoredValueCardView('')">
                新增儲值卡
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th>
                        <p class="nameview">
                            儲存卡(全部{{ 0 }}個)
                        </p>
                    </th>
                    <th>
                        <!-- <p>電話</p> -->
                    </th>
                    <th>
                        <!-- <p>加入時間</p> -->
                    </th>
                    <th>

                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <!-- <tr v-for="item in filterManagerListData" :key="item.managerId">
                            <td class="content-name">
                                <img :src="Icon" />
                                <p>{{ item.nameView }}</p>
                            </td>
                            <td>
                                <p>{{ item.phone }}</p>
                            </td>
                            <td>
                                <p>{{ item.dateCreate }}</p>
                            </td>
                            <td>
                                <button class="header-btn" v-on:click="handAddManagerView(item)">
                                    <img :src="editIcon" />
                                </button>
                            </td>
                        </tr> -->
            </tbody>
        </table>
    </div>
    <AddStoredValueCard v-if="addStoredValueCardView" :select-stored-value-card-item="selectStoredValueCardItem"
        :hand-add-stored-value-card-view="handAddStoredValueCardView">
    </AddStoredValueCard>
</template>

<style lang="scss" scoped>
div {
    position: absolute;
    top: 45px;
    bottom: 10px;
    left: 0px;
    right: 0px;
    width: 100%;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;

    >.function-area {
        height: 50px;
        position: absolute;
        top: -50px;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: end;
        align-items: center;
        left: auto;
        width: auto;

        >input {
            width: auto;
            height: 60%;
            border-radius: 6px;
            border: solid 1px #707070;
            background-color: #fff;

        }

        >button {
            border-radius: 6px;
            min-width: 100px;
            height: 70%;
            border: solid 1px #707070;
            background-color: #84715c;
            color: #fff;
            margin: 0 10px;
        }
    }

    >table {
        width: 100%;
        height: 100%;

        >.header-tab {
            display: block;
            // height: 50px;
            color: #717171;
            border: solid 1px #707070;
            background-color: #e6e2de;
            box-sizing: border-box;

            >tr {
                display: flex;
                align-items: center;
                height: 50px;
                justify-content: space-between;

                >th {
                    width: calc(100%/4);

                    >p {
                        min-width: 108px;
                        text-align: left;
                    }

                    >.nameview {
                        padding-left: 10px;
                    }
                }
            }
        }

        >.content-tab {
            position: absolute;
            width: 100%;
            top: 52px;
            bottom: 0px;
            overflow: auto;
            display: block;

            >tr {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: 0;
                    width: 98%;
                    height: 1px;
                    background: #ddd;
                    left: 50%;
                    transform: translateX(-50%);
                }

                >td {
                    display: flex;
                    width: calc(100%/4);

                    >button {
                        height: 100%;
                        background-color: transparent;
                        border: none;
                        padding: 0 0 0 0;
                        margin: 0 2px;

                        >img {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            vertical-align: middle;
                        }
                    }
                }

                .content-name {
                    // padding-left: 10px;
                    display: flex;

                    img {
                        margin: 0 15px;
                    }
                }
            }
        }
    }
}
</style>