<script setup lang="ts">
import { useSettingStore } from "@/stores/setting";
import { useCounterStore } from "@/stores/counter";
import { useManagerStore } from "@/stores/manager";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";

const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const settingStore = useSettingStore();
const { permissionsList } = storeToRefs(settingStore);
const { getPermissionsList, editOptionRole } = settingStore;
const managerStore = useManagerStore();
const { getRoleList } = managerStore;
const { roleList } = storeToRefs(managerStore);
const componentKey = ref(0);
const width = ref('0');
const editRoleNameView = ref(false);
const changeSelect: any = [];
const permissionsData: any = reactive({ data: [] });
const handEditRoleNameView = () => {
    editRoleNameView.value = !editRoleNameView.value;
};
const roleNameList = computed(() => {
    if (roleList.value.data) {
        return roleList.value.data.filter((e: any) => e.roleId != 1);
    }
});
const permissions = computed(() => {
    permissionsData.data = JSON.parse(JSON.stringify(permissionsList.value.data));
    return permissionsData.data
})
const handSelect = ((item: any, olId: number) => {
    let data = {
        roleId: item.roleId,
        olId: olId,
        open: item.open
    }
    changeSelect.push(data);
})

const handCancel = (() => {
    permissionsData.data = JSON.parse(JSON.stringify(permissionsList.value.data));
})
const handSubmit = (() => {
    editOptionRole(changeSelect)
        .then((res) => {
            if (res.state == 1) {
                Alert.warning('修改成功', 2000);
            } else {
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
const getRoleName = () => {
    let data = {
        id: 0,
        pageIndex: 0,
        count: 0
    }
    getRoleList(data)
        .then(() => {
            width.value = 100 / ((roleList.value.data).length + 2) + "%";
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
const getPermissions = () => {
    getPermissionsList()
        .then(() => {
            width.value = 100 / ((permissionsList.value.data[0].optionRoleLists[0].roleLists).length + 2) + "%";
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
    getRoleName();
    getPermissions();

})
</script>
<template>
    <div class="container">
        <div class="function-area">
            <button class="header-btn" @click="handEditRoleNameView()">
                調整權限名稱
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th class="header-function">功能</th>
                    <th class="header-describe">權限描述</th>
                    <th v-for="item in roleNameList" :key="item.roleId">{{ item.memo }} </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr class="permissionsList" v-for="items, index in permissions" :key="index">
                    <td class="content-function">{{ items.actionText }}</td>
                    <td class="content-describe">
                        <div v-for="item in items.optionRoleLists" :key="item.olId">
                            <p class="target-text">{{ item.targetText }}</p>
                            <p class="memo-text">{{ item.memo }}</p>
                        </div>

                    </td>
                    <td class="roleList" :key="componentKey">
                        <div class="inputItem" v-for="item in items.optionRoleLists" :key="item.roleId">
                            <input v-for="box in item.roleLists" :key="box.roleId" v-model="box.open" type="checkbox"
                                @change="handSelect(box, item.olId)" />
                        </div>
                    </td>
                </tr>
            </tbody>
            <div class="submitBtn">
                <button @click="handCancel()">取消變更</button>
                <button @click="handSubmit()">確認儲存</button>
            </div>
        </table>
    </div>
    <edit-role-name v-if="editRoleNameView" :hand-edit-role-name-view="handEditRoleNameView"></edit-role-name>
</template>

<style scoped lang="scss" >
.container {
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

    .function-area {
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
        right: 0;

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
        table-layout: fixed;

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
                // justify-content: space-around;

                >th {
                    align-items: center;
                    justify-content: center;
                    // width: var(--width);
                    width: calc(50%/5);

                    >.fixed-th {
                        width: 10%;
                    }

                    >p {
                        min-width: 108px;
                        text-align: left;
                    }

                    >.nameview {
                        padding-left: 10px;
                    }
                }

                >.header-function {
                    margin-left: 5px;
                    text-align: left;
                    width: 20%;
                }

                >.header-describe {
                    text-align: left;
                    width: 30%;
                }
            }
        }

        >.content-tab {
            position: absolute;
            width: 100%;
            top: 52px;
            bottom: 70px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            font-size: 20px;
            // border-bottom: solid 0.5px #ddd;

            &:last-child {
                border-bottom: none;
            }

            >.permissionsList {
                display: flex;
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

                >.content-function {
                    margin-left: 5px;
                    width: 20%;
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    font-weight:bold;
                    color: #000000;
                }

                >.content-describe {
                    width: 30%;

                    .target-text {
                        font-weight:bold;
                    }
                    .memo-text {
                        font-size: 16px;
                        color: #9e9e9e;
                    }
                }

                .a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: var(--width);
                    // width: calc(100%/8);

                    >P {
                        margin: 15px 0;
                    }
                }

                >.roleList {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    justify-content: space-around;

                    // width: var(--width);
                    >.inputItem {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        input {
                            display: flex;
                            justify-content: center;
                            margin: 15px auto;
                            width: 20px;
                            height: 20px;
                            position: relative;
                            appearance: none;
                            border: 1px solid;

                            &:checked {
                                background-color: #e6e2de;

                                &::after {
                                    content: '✓';
                                    color: #717171;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                            }
                        }


                    }
                }
            }

        }

        >.submitBtn {
            position: absolute;
            right: 0px;
            bottom: 0px;
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            border-top: solid 0.5px #ddd;
            // font-size: 20px;

            >button {
                border-radius: 6px;
                padding: 5px 15px;
                margin: 0px 10px;
                height: 75%;
                border: transparent;
                background-color: #e6e2de;
                color: #717171;

            }

        }
    }
}
</style>