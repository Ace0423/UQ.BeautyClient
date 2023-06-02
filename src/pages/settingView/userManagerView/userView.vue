
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { useManagerStore } from "@/stores/manager";
import { storeToRefs } from "pinia";
const managerstore = useManagerStore();
const { managerList } = storeToRefs(managerstore);
const { getAdminList } = managerstore;
const addManagerView = ref(false);
const selectManagerItem = ref();
const keyWord = ref("");
const handAddManagerView = (item: any) => {
    selectManagerItem.value = item;
    addManagerView.value = !addManagerView.value;
};
const filterAdminListData = computed(() => {
    const filter = managerList.value.data.filter(getAdminListFn);
    return filter;
});
const getAdminListFn = (data: any) => {
    return (
        !keyWord.value ||
        data.nameView.toLowerCase().includes(keyWord.value.toLowerCase())
    );
};

onMounted(() => {
    let allAamin = {
        id: 0,
        pageindex: 0,
        count: 0,
    };
    getAdminList(allAamin);
})
</script>
<template>
    <div>
        <div class="function-area">
            <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
            <button class="header-btn" @click="handAddManagerView('')">
                新增使用者
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th>
                        <p class="nameview">
                            使用者(全部{{ filterAdminListData.length }}個)
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
                <tr v-for="item in filterAdminListData" :key="item.managerId">
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
                </tr>
            </tbody>
        </table>
    </div>
    <AddManager v-if="addManagerView" :hand-add-manager-view="handAddManagerView" :select-manager-item="selectManagerItem">
    </AddManager>
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
                    width: calc(100%/3);

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

                >td {
                    display: flex;
                    width: calc(100%/3);

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
                    padding-left: 10px;
                    display: flex;

                    img {
                        margin: 0 10px;
                    }
                }
            }
        }
    }
}
</style>