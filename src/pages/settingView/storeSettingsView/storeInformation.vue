
<script setup lang="ts">
const handReturn = (() => {

})
const handSubmit = (() => {

})
</script>
<template>
    <div class="info-content">
        <div class="content">
            <div class="setting-content">
                <h1>商店設定</h1>
                <p>商店基本設定，請自由修改</p>
                <table>
                    <tbody>
                        <tr>
                            <td>商店名稱</td>
                            <td><input value="智聯微網" /></td>
                        </tr>
                        <tr>
                            <td>商店類型</td>
                            <td><input value="其他" /></td>
                        </tr>
                        <tr>
                            <td>商店地址</td>
                            <td><input value="台中市西區" /></td>
                        </tr>
                        <tr>
                            <td>商店電話</td>
                            <td><input value="042222222" /></td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><input value="" /></td>
                        </tr>
                        <tr>
                            <td>電子信箱</td>
                            <td><input value="@gmai.com" /></td>
                        </tr>
                        <tr>
                            <td>負責人手機號碼</td>
                            <td><input value="0987888888" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="logo-content">
                <h1>商店Logo</h1>
                <p>商店Logo，建議尺寸200px*200px</p>
            </div>
        </div>
        <div class="submitBtn">
            <button @click="handReturn()">取消變更</button>
            <button @click="handSubmit()">確認儲存</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    font-size: 24px;
}

td {
    border: solid 0.5px #ddd;
}

.info-content {
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
    display: flex;

    >.content {
        width: 100%;
        display: flex;

        >.setting-content {
            width: 50%;
            margin: 10px 15px;
            overflow: auto;

            >table {
                width: 100%;

                >tbody {
                    >tr {
                        height: 70px;

                        >td {
                            input {
                                border: transparent;
                                display: inline-block;
                                width: 100%;
                                padding: 25px 0;
                            }
                        }
                    }
                }
            }

            input {
                border: transparent
            }
        }

        >.logo-content {
            width: 50%;
            margin: 10px 15px;
        }
    }

}

.submitBtn {
    position: absolute;
    right: 0px;
    bottom: 10px;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
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
</style>