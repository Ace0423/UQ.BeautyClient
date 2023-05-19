<script setup lang="ts">
</script>
<template>
    <div>
        <div class="function-area">
            <button class="header-btn">
              調整權限名稱
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
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
            display: flex;
            flex-direction: column;
        }
    }
}
</style>