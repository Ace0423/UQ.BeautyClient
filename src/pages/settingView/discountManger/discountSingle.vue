<script setup lang="ts">
import seach_ico from "@/assets/images/ico_seach.png";
const addAdminManagerView = ref(false);
const handAddManagerView = () => {
  console.log(111);
  addAdminManagerView.value = !addAdminManagerView.value;
};
</script>
<template>
  <div>
    <div class="function-area">
      <input class="seach-control" placeholder="搜尋折扣名稱、商品" />
      <button class="header-btn" @click="handAddManagerView()">
        新增折扣
      </button>
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="nameview">單品折扣(所有{{ 0 }}種折扣)</p>
          </th>
          <th>
            <p>套用服務數</p>
          </th>
          <!-- <th>
            <p>套用商品數</p>
          </th> -->
          <th>
            <p>折扣內容</p>
          </th>
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
  <AddManager
    v-if="addAdminManagerView"
    :hand-add-manager-view="handAddManagerView"
  ></AddManager>
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

  > .function-area {
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

    > input {
      width: auto;
      height: 60%;
      border-radius: 6px;
      border: solid 1px #707070;
      background-color: #fff;
      margin-right: 10px;
      text-align: center;

      background: url("@/assets/images/ico_seach.png") no-repeat;
      background-position: left;
      background-origin: content-box;
      text-indent: 20px;
    }

    > button {
      border-radius: 6px;
      min-width: 100px;
      height: 70%;
      border: solid 1px #707070;
      background-color: #84715c;
      color: #fff;
      margin: 0 20px;
    }
  }

  > table {
    width: 100%;
    height: 100%;

    > .header-tab {
      display: block;
      // height: 50px;
      color: #717171;
      border: solid 1px #707070;
      background-color: #e6e2de;
      box-sizing: border-box;

      > tr {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: space-between;

        > th {
          > p {
            min-width: 108px;
            text-align: left;
          }

          > .nameview {
            padding-left: 10px;
          }
        }
      }
    }

    > .content-tab {
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