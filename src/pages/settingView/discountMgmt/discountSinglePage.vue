<script setup lang="ts">
import seach_ico from "@/assets/images/ico_seach.png";
const addAdminManagerView = ref(false);
const handAddManagerView = () => {
  console.log(111);
  addAdminManagerView.value = !addAdminManagerView.value;
};
</script>
<template>
  <div class="discountSingle_div">
    <div class="table-topBar">
      <p class="bar-title">單品折扣(所有{{ 0 }}種折扣)</p>
      <div>
        <input class="seach-control" placeholder="搜尋折扣名稱、商品" />
        <button class="header-btn" @click="handAddManagerView()">
          新增
        </button>
      </div>
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="nameview">折扣名稱</p>
          </th>
          <th>
            <p>套用服務數</p>
          </th>
          <th>
            <p>套用商品數</p>
          </th>
          <th>
            <p>折扣內容</p>
          </th>
          <th>
            <p>操作</p>
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
.discountSingle_div {
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

  > .table-topBar {
    height: 50px;
    width: calc(100% - 2px);
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    left: auto;
    color: #717171;
    border: solid 1px #707070;
    background-color: #e6e2de;
    font-weight: 700;
    > div {
      display: flex;
      height: 100%;
      justify-content: right;
      align-items: center;
      > input {
        width: auto;
        height: 60%;
        border-radius: 6px;
        border: solid 1px #707070;
        margin-right: 10px;
        background: #fff url("@/assets/images/ico_seach.png") no-repeat;
        background-position: 97%;
        background-origin: content-box;
        text-indent: 5px;
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
    p {
      width: 80%;
    }
  }

  > table {
    width: 100%;
    height: 100%;

    > .header-tab {
      display: block;
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
