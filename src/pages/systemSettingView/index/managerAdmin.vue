
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
const addManagerView = ref(false);
const selectManagerItem = ref();
const keyWord = ref("");
const roleType = 0;
const handAddManagerView = (item: any) => {
    selectManagerItem.value = item;
    addManagerView.value = !addManagerView.value;
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
    <div class="wrap">
        <div class="function-area">
            <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
            <button class="header-btn" @click="handAddManagerView('')">
                新增使用者
            </button>
        </div>
        <div class="tab">
            <table>
                <thead class="header-tab">
                    <tr>
                        <th>
                            <p class="nameview">
                                使用者(全部{{ filterManagerListData.length }}個)
                            </p>
                        </th>
                        <th>
                            <p>電話</p>
                        </th>
                        <th>
                            <p>加入時間</p>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody class="content-tab">
                    <tr v-for="item in filterManagerListData" :key="item.managerId">
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
                        <td class="content-btn">
                            <button class="header-btn" v-on:click="handAddManagerView(item)">
                                >
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
    <AddManager v-if="addManagerView" :hand-add-manager-view="handAddManagerView" :select-manager-item="selectManagerItem"
        :role-type="roleType">
    </AddManager>
</template>

<style lang="scss" scoped>
.wrap {
    position: relative;
    width: 100%;
    margin: 0 5px;
    font-family: STXihei;
    color: #717171;

    >.function-area {
        height: 50px;
        position: absolute;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: end;
        align-items: center;
        right: 0px;
        width: auto;

        >input {
            width: auto;
            height: 60%;
            border-radius: 6px;
            border: solid 1px #707070;
            background-color: #fff;
            margin-right: 10px;
            text-align: center;
        }

        >button {
            border-radius: 6px;
            min-width: 100px;
            height: 70%;
            border: solid 1px #707070;
            background-color: #84715c;
            color: #fff;
        }
    }

    >.tab {
        position: absolute;
        top: 50px;
        width: 100%;
        bottom: 0px;

        >table {
            top: 0px;
            width: 100%;
            height: 100%;

            >.header-tab {
                display: block;
                color: #717171;
                background-color: #e6e2de;
                box-sizing: border-box;
                border-radius: 6px 6px 0px 0px;

                >tr {
                    display: flex;
                    align-items: center;
                    height: 50px;
                    justify-content: space-between;

                    >th {
                        width: 30%;

                        >p {
                            padding: 0 0;
                            text-align: left;
                        }

                        .nameview {
                            padding-left: 15px;
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
                color: #717171;
                box-sizing: border-box;

                >tr {
                    display: flex;
                    align-items: center;
                    position: relative;

                    &::after {
                        content: "";
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
                        width: 30%;



                    }

                    >.content-btn {
                        display: flex;
                        justify-content:space-around;

                        >button {
                            height: 100%;
                            background-color: transparent;
                            border: none;
                            padding: 0 0 0 0;
                            margin: 0 2px;
                        }
                    }

                    >.content-name {
                        box-sizing: border-box;
                        display: flex;
                        padding-left: 5PX;

                        >P {
                            padding-left: 5PX;
                        }
                    }
                }
            }
        }
    }

}
</style>