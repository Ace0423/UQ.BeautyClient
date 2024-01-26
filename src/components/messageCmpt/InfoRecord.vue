<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getInfoRecord } = companyStore;
const infoRecord: any = reactive({ data: [] });
const props = defineProps<{
    selectRecordItemItem: any,
    handInfoRecordView: Function,
}>();


onMounted(() => {
    console.log(props.selectRecordItemItem)
    let data = {
        MId: props.selectRecordItemItem.mId,
        mrDateGroup: props.selectRecordItemItem.mrDateGroup,
        pageIndex: 0,
        count: 0
    }
    getInfoRecord(data)
        .then((res) => {
            if (res.state == 1) {
                infoRecord.data = res.data.table;
                console.log(infoRecord.data)
            }
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
    <div class="popup-mask" v-on:click.self="handInfoRecordView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img class="closeX" :src="icon_closeX" v-on:click="handInfoRecordView()" />
                <h3>發送記錄現象</h3>
            </div>
            <div class="content">
                <h3>發送記錄現象</h3>
                <p>發送時間:{{ props.selectRecordItemItem.mrDateGroup }}</p>
                <p v-if="props.selectRecordItemItem.mrChannel == 0">發送頻道:LINE</p>
                <p v-if="props.selectRecordItemItem.mrChannel == 1">發送頻道:簡訊</p>
                <div class="count-block">
                    <div>
                        <p>{{ props.selectRecordItemItem.mrCount }}</p>
                        <p>總發送數</p>
                    </div>
                    <div>
                        <p>{{ props.selectRecordItemItem.mrPointSum }}</p>
                        <p>消耗數量</p>
                    </div>
                </div>
                <p>發送對象{{ infoRecord.data.length }}位</p>
                <table>
                    <thead class="header-tab">
                        <tr>
                            <th>
                                <p>顧客 </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="content-tab">
                        <tr v-for="item in infoRecord.data " :key="item">
                            <td>
                                <div>
                                    <p>{{ item.nameView }}</p>
                                    <p>{{ item.phone }}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(5, 5, 5, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        width: 40%;
        background-color: #ffffff;
        border-radius: 10px 0 0;

        .top-content {
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            border-bottom: solid 1px #c1bdb8;

            >.closeX {
                position: absolute;
                left: 20px;
            }
        }

        >.content {
            position: absolute;
            top: 71px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            background: #faf9f8;
            padding: 5px 20px;


            >.count-block {
                display: flex;
                justify-content: space-around;
                background-color: #e6e2de;
                padding: 0 5px;
                color: #717171;
            }

            >table {
                position: relative;
                // top: 60px;
                width: 100%;
                height: 40%;

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
                        margin: 0 10px;

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
                    top: 50px;
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
                            >div {
                                margin: 0 10px;
                            }

                            >.header-btn {
                                border: transparent;
                                background-color: transparent;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>