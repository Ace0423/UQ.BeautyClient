
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getCheckOutType } = companyStore;
const { checkOutTypeList } = storeToRefs(companyStore);
const keyWord = ref("");
const addPayMethodView = ref(false);
const selectPayMethodItem = ref();
const handAddManagerView = () => {
    addPayMethodView.value = !addPayMethodView.value;
};
const checkOutType = () => {
    getCheckOutType()
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
}
const selectItem = (data: any) => {
    selectPayMethodItem.value = data;
    handAddManagerView();
}
const filterCheckOutTypeListData = computed(() => {
    const filter = checkOutTypeList.value.data.filter(getCheckOutTypeListFn);
    return filter;
});
const getCheckOutTypeListFn = (data: any) => {
    return (
        !keyWord.value ||
        data.cotTitle.toLowerCase().includes(keyWord.value.toLowerCase())
    );
};
onMounted(() => {
    checkOutType();
})
</script>
<template>
    <div>
        <div class="function-area">
            <input placeholder="🔍搜尋付款名稱" v-model="keyWord" />
            <button class="header-btn" @click="selectItem('')">
                新增收款方式
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th>
                        <p>付款方式(所有 {{ filterCheckOutTypeListData.length }} 種付款)</p>
                    </th>
                    <th>
                        <p>狀態</p>
                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in filterCheckOutTypeListData" :key="item.cotId" @click="selectItem(item)">
                    <td class="content-name">
                        <p>{{ item.cotTitle }}</p>
                    </td>
                    <td>
                        <p v-if="!item.enabled">未啟用 ></p>
                        <p v-if="item.enabled">已啟用 ></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <AddPayMethod v-if="addPayMethodView" :hand-add-manager-view="handAddManagerView"
        :select-pay-method-item="selectPayMethodItem"></AddpayMethod>
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
            margin: 0 20px;
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
                        margin: 0 15px;
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

                    >p {
                        min-width: 108px;
                        text-align: left;
                        margin-left: 15px;
                    }

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