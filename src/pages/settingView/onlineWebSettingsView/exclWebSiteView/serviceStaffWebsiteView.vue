<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {

})
</script>
<template>
  <div class="container">
    <div class="function-area">
      <input placeholder="🔍搜尋姓名" />
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="nameview">
              個人網站
            </p>
          </th>
          <th>
            <p>個人線上預約</p>
          </th>
          <th>
            <p>個人線上店販</p>
          </th>
          <th>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody class="content-tab">
        <tr>
          <td class="content-name">
            <img class="img-name" />
            <div>

            </div>
          </td>
          <td>
            <p>

            </p>
          </td>
          <td>

          </td>
          <td>
            <button>
              分享連結
            </button>
          </td>
          <td class="content-btn">
            <button>
              編輯網站
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  color: #717171;
  position: absolute;
  top: 50px;
  bottom: 0px;

  >.function-area {
    display: flex;
    justify-content: end;
    height: 8%;

    >input {
      width: auto;
      // height: 35px;
      border-radius: 6px;
      border: none;
      background-color: #faf9f8;
      margin-right: 5px;
      text-align: left;
    }
  }

  >table {
    position: absolute;
    top: 9%;
    left: 0px;
    right: 0px;
    height: calc(100% - 9%);
    width: 100%;

    >.header-tab {
      display: block;
      border-radius: 5px 5px 0px 0px;
      color: #717171;
      border: none;
      background-color: #faf9f8;
      box-sizing: border-box;

      >tr {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: space-between;

        >th {
          width: 20%;

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
      top: 50px;
      bottom: 0px;
      overflow: auto;
      display: block;

      >tr {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        position: relative;
        // width: 100%;
        height: 50px;

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
          display: flex;
          width: 20%;

          >.group-frame {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            border: solid 1px #707070;
            background-color: #e6e2de;
            padding: 1px 1px;
            margin: 2px 2px;

            >p {
              margin: 0px 0px;
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

          P {
            margin: 0 0;
          }
        }
      }
    }
  }
}
</style>