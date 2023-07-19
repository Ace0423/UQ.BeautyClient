
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useApptStore } from "@/stores/priceStore";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const appStore = useApptStore();
const { getTopUpCardList } = appStore;
const { topUpCardList } = storeToRefs(appStore);
const keyWord = ref("");
const topUpCardInfoView = ref(false);
const selectInfoItem = ref();
const handTopUpCardInfoView = (item: any = "") => {
    selectInfoItem.value = item;
    topUpCardInfoView.value = !topUpCardInfoView.value;
};
const filterTopUpCardListFnData = computed(() => {
    const filter = topUpCardList.value.data.filter(getTopUpCardListFn);
    return filter;
});
const getTopUpCardListFn = (data: any) => {
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
    let allTopUpCard = {
        TUId: 0,
        select: 0,
        type: 0,
        pageindex: 0,
        count: 0,
    };
    getTopUpCardList(allTopUpCard)
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
    <div class="group">
        <div class="function-area">
            <input placeholder="🔍搜尋" v-model="keyWord" />
            <button class="header-btn">
                新增儲值卡
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th class="col-3-th ">
                        <label>主題</label>
                    </th>
                    <th class="col-2-th">
                        <label>儲值面額</label>
                    </th>
                    <th class="col-2-th">
                        <label>銷售數量</label>
                    </th>
                    <th class="col-2-th">
                        <label>狀態</label>
                    </th>
                    <th class="col-2-th">
                        <label>售價</label>
                    </th>
                    <th class="col-1-th">

                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in filterTopUpCardListFnData" :key="item.managerId">
                    <td class="col-3-th ">
                        <div class="main-img">
                            <img :src="Icon" />
                        </div>
                        <div class="main-p">
                            <p>{{ item.tuTitle }}</p>
                            <p>{{ item.tuLimitType }}</p>
                        </div>
                    </td>
                    <td class="col-2-th">
                        <label>{{ item.tuViewPrice }}</label>
                    </td>
                    <td class="col-2-th">
                        <label>{{ item.tuSellCount }}</label>
                    </td>
                    <td class="col-2-th">
                        <label>{{ item.tuType }}</label>
                    </td>
                    <td class="col-2-th">
                        <label>{{ item.tuSellPrice }}</label>
                    </td>
                    <td class="col-1-th">
                        <button class="header-btn" @click="handTopUpCardInfoView(item)">
                            >
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <TopUpCardInfo v-if="topUpCardInfoView" :handTopUpCardInfoView="handTopUpCardInfoView" :selectItem="selectInfoItem">
    </TopUpCardInfo>
</template>

<style lang="scss" scoped>
div.group {
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
        right: 0px;
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

                >.col-1-th {
                    width: 10%;
                }

                >.col-2-th {
                    width: 20%;
                }

                >.col-3-th {
                    width: 30%;
                }

                >.col-4-th {
                    width: 40%;
                }

                >.col-5-th {
                    width: 50%;
                }

                th {

                    div {
                        >p {
                            margin: 0 0 0 0;
                        }
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
                margin: 5px 0;

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

                >.col-1-th {
                    width: 10%;
                }

                >.col-2-th {
                    width: 20%;
                }

                >.col-3-th {
                    width: 30%;
                }

                >.col-4-th {
                    width: 40%;
                }

                >.col-5-th {
                    width: 50%;
                }

                td {
                    display: flex;
                    justify-content: center;

                    >.main-img {
                        img {
                            margin: 0 10px;
                        }
                    }

                    >.main-p {
                        p {
                            margin: 0 0;
                        }

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