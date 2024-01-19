
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { useCounterStore } from "@/stores/counter";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { messagesRecordList } = storeToRefs(companyStore);
const { getMessageRecords } = companyStore;
const infoRecordView = ref(false);
const selectRecordItemItem = ref();
const handInfoRecordView = (item: any) => {
    selectRecordItemItem.value = item;
    infoRecordView.value = !infoRecordView.value;
};
onMounted(() => {
    let data = {
        cid: 0,
        mrType: 2,
        pageIndex: 0,
        count: 0
    }
    getMessageRecords(data)
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
        })
})

</script>
<template>
    <div class="wrap">
        <div class="function-area">
            <button class="otherpay-btn">所有頻道</button>
            <input placeholder="🔍搜尋" />
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th style="width:40%" class="col-4-th">
                        <p>主題 </p>
                    </th>
                    <th style="width:10%" class="col-1-th">
                        <p>發送頻道</p>
                    </th>
                    <th style="width:10%" class="col-1-th">
                        <p>發送方式</p>
                    </th>
                    <th style="width:10%" class="col-1-th">
                        <p>發送數量</p>
                    </th>
                    <th style="width:10%" class="col-1-th">
                        <p>消耗點數</p>
                    </th>
                    <th style="width:15%" class="col-1-th">
                        <p>發送時間</p>
                    </th>
                    <th style="width:5%" class="col-1-th">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in messagesRecordList.data " :key="item.mId">
                    <td style="width:40%">
                        <p>{{ item.mContext }}</p>
                    </td>
                    <td style="width:10%">
                        <p v-if="item.mrChannel == 0">LINE</p>
                        <p v-if="item.mrChannel == 1">簡訊</p>
                    </td>
                    <td style="width:10%">
                        <p v-if="item.mrType == 2">系統</p>
                    </td>
                    <td style="width:10%">
                        <p>{{ item.mrCount }}</p>
                    </td>
                    <td style="width:10%">
                        <p>{{ item.mrPointSum }}</p>
                    </td>
                    <td style="width:15%">
                        <p>{{ item.mrDateGroup }}</p>
                    </td>
                    <td style="width:5%">
                        <button class="header-btn" @click="handInfoRecordView(item)">
                            >
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <InfoRecord v-if="infoRecordView" :selectRecordItemItem="selectRecordItemItem" :handInfoRecordView="handInfoRecordView"></InfoRecord>
</template>

<style lang="scss" scoped>
.wrap {
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    margin: 0 5px;
    font-family: STXihei;
    color: #717171;

    >.function-area {
        height: 60px;
        position: absolute;
        // top: -50px;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        align-items: center;
        right: 0px;
        width: 100%;

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
            height: 80%;
            border: transparent;
            background-color: #faf9f8;
            color: #84715c;
            margin: 0 5px;
        }

    }

    >table {
        position: absolute;
        top: 60px;
        width: 100%;
        height: calc(100% - 60px);

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
                    >p {
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
                    >.header-btn {
                        border: transparent;
                        background-color: transparent;
                    }
                }
            }
        }
    }
}
</style>