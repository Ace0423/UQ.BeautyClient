
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { storeToRefs } from "pinia";

const data = reactive([{ them: '生日快樂', channel: 0, type: 0, count: 0, point: 0, dategroup: '2024/01/01', id: 0 }, { them: '生日快樂', channel: 0, type: 0, count: 0, point: 0, dategroup: '2024/01/01', id: 1 }, { them: '生日快樂', channel: 0, type: 0, count: 0, point: 0, dategroup: '2024/01/01', id: 2 }])
onMounted(() => {

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
                <tr v-for="item in data " :key="item.id">
                    <td style="width:40%">
                        <p>{{ item.them }}</p>
                    </td>
                    <td style="width:10%">
                        <p>{{ item.channel }}</p>
                    </td>
                    <td style="width:10%">
                        <p>{{ item.type }}</p>
                    </td>
                    <td style="width:10%">
                        <p>{{ item.count }}</p>
                    </td>
                    <td style="width:10%">
                        <p>{{ item.point }}</p>
                    </td>
                    <td style="width:15%">
                        <p>{{ item.dategroup }}</p>
                    </td>
                    <td style="width:5%">
                        <button class="header-btn">
                            >
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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