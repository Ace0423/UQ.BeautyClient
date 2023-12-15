
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useSettingStore } from "@/stores/setting";
import { useCounterStore } from "@/stores/counter";
const settingStore = useSettingStore();
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const { apiPermissionsList } = storeToRefs(settingStore);
const { getApiPermissionsList } = settingStore;

const addApiPermissionView = ref(false);
const selectItem = ref();
const handAddApiPermissionView = (item: any) => {
    selectItem.value = item;
    addApiPermissionView.value = !addApiPermissionView.value;
};

const getApiPermission = () => {
    getApiPermissionsList()
        .then(() => {
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        })
}

onMounted(() => {
    getApiPermission();
});
</script>
<template>
    <div class="wrap">
        <div class="function-area">
            <!-- <input placeholder="🔍搜尋顧客標籤" v-model="keyWord" /> -->
            <button class="header-btn" @click="handAddApiPermissionView('')">新增功能</button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th>
                        <p class="controllerTxt">
                            功能控制器
                        </p>
                    </th>
                    <th>
                        <p>功能描述</p>
                    </th>
                    <th>
                        <p>方法</p>
                    </th>
                    <th class="header-btn"></th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in apiPermissionsList.data" :key="item.groupId">
                    <td class="content-name">
                        <p>{{ item.olControllerText }}</p>
                        <p>{{ item.olController }}</p>
                    </td>
                    <td>
                        <p>{{ item.olActionText }}</p>
                        <p>{{ item.olAction }}</p>
                    </td>
                    <td>
                        <p>{{ item.olTargetText }}</p>
                        <p>{{ item.olTarget }}</p>
                    </td>
                    <td class="content-btn" @click="handAddApiPermissionView(item)">
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <AddApiPermission v-if="addApiPermissionView" :selectItem="selectItem"
        :handAddApiPermissionView="handAddApiPermissionView" :getApiPermission="getApiPermission" />
</template>

<style lang="scss" scoped>
.wrap {
    //   position: absolute;
    //   top: 45px;
    //   bottom: 10px;
    //   left: 0px;
    //   right: 0px;
    position: relative;
    width: 100%;
    margin: 0 5px;
    // background-color: #faf9f8;
    // border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;

    >.function-area {
        height: 50px;
        position: absolute;
        // top: -50px;
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
            // margin: 0 20px;
        }
    }

    >table {
        position: absolute;
        top: 50px;
        width: 100%;
        height: calc(100% - 50px);

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
                        // min-width: 108px;
                        padding: 0 0;
                        text-align: left;
                    }

                    .controllerTxt {
                        padding-left: 15px;
                    }
                }
            }

            .header-btn {
                justify-content: end;
                width: 5%;
                padding: 0 5px;
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
                    // display: flex
                    width: 30%;

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

                .content-btn {
                    // justify-content: end;
                    width: 5%;
                    padding: 0 15px;
                }

                .content-name {
                    padding-left: 15px;
                }
            }
        }
    }
}
</style>