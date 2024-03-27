
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getMessages } = companyStore;
const { messagesList } = storeToRefs(companyStore);
const addMessageView = ref(false);
const selectMessageItem = ref();
const keyWord = ref("");

const messages = (type: any) => {
    let data = {
        MId: 0,
        type: type,
        pageIndex: 0,
        count: 0
    }
    getMessages(data)
        .then((res) => {
            // if (res.state == 2) {
            //     Alert.warning(showErrorMsg(res.msg), 2000);
            // }
        })
        .catch((e: any) => {
            console.log(e)
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        })
}
onMounted(() => {
    messages(0);
})
const handAddMessageView = (auto: any, type: any, item: any) => {
    let data: any = {
        auto: auto, //auto:0. 一般、1. 自動化     
        type: type, //type: 0. LINE、1. 簡訊
        item: item
    }
    selectMessageItem.value = data;
    addMessageView.value = !addMessageView.value;
};
const handAutoAddMessageBtn = (command: any) => {
    handAddMessageView(1, command, '');
}
const handMessageBtn = (command: any) => {
    handAddMessageView(0, command, '');
}
</script>
<template>
    <div class="wrap">
        <div class="function-area">
            <input placeholder="🔍搜尋" v-model="keyWord" />
            <div class="header-auto-btn">
                <el-dropdown trigger="click" placement="bottom-end" @command="handAutoAddMessageBtn">
                    <span>
                        新增自動化訊息
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="0">LINE訊息</el-dropdown-item>
                            <el-dropdown-item command="1">簡訊</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="header-btn">
                <el-dropdown trigger="click" placement="bottom-end" @command="handMessageBtn">
                    <span>
                        新增訊息
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="0">LINE訊息</el-dropdown-item>
                            <el-dropdown-item command="1">簡訊</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th class="col-3-th">
                        <p>主題 </p>
                    </th>
                    <th class="col-2-th">
                        <p>發送頻道</p>
                    </th>
                    <th class="col-2-th">
                        <p>自動發送</p>
                    </th>
                    <th class="col-2-th">
                        <p>上次發送時間</p>
                    </th>
                    <th class="col-1-th">
                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in messagesList.data" :key="item.managerId">
                    <td class="col-3-th">
                        <p>{{ item.mTheme }}</p>
                    </td>
                    <td class="col-2-th">
                        <p v-if="item.mType == 0">LINE</p>
                        <p v-if="item.mType == 1">簡訊</p>
                    </td>
                    <td class="col-2-th">
                        <input type="radio" disabled :checked="item.mAuto" />
                        <!-- <p>{{ item.mAuto }}</p> -->
                    </td>
                    <td class="col-2-th">
                        <p>{{ item.mSendDate }}</p>
                    </td>
                    <td class="col-1-th">
                        <button class="header-btn" @click="handAddMessageView(item.mAuto, item.mType, item)">
                            >
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <AddMessage v-if="addMessageView" :handAddMessageView="handAddMessageView" :selectMessageItem="selectMessageItem">
    </AddMessage>
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
        // position: absolute;
        // top: -50px;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: end;
        align-items: center;
        right: 0px;
        width: auto;

        >input {
            max-width: 150px;
            height: 60%;
            border-radius: 6px;
            border: solid 1px #707070;
            background-color: #fff;
            margin: 5px;
            text-align: left;
        }

        >button {
            border-radius: 6px;
            min-width: 100px;
            height: 70%;
            border: solid 1px #707070;
            background-color: #84715c;
            color: #fff;
            margin: 0 5px;
        }

        .header-auto-btn {
            border-radius: 6px;
            min-width: 100px;
            height: 55%;
            border: solid 2px #84715c;
            background-color: transparent;

            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;

            span {
                color: #84715c;
            }
        }

        .header-btn {
            border-radius: 6px;
            // min-width: 100px;
            padding: 0 10px;
            height: 60%;
            color: #84715c;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            border: solid 1px #707070;
            background-color: #84715c;
            margin: 0 5px;

            span {
                color: #fff;
            }
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