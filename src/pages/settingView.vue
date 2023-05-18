<script setup lang="ts">
import Icon from "@/assets/Icon material-settings.svg";
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
</script>
<template>
  <div class="container">
    <Header :Icon="Icon" :moduleType="'設定'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
    </Header>
    <div class="content">
      <div class="menu">
        <el-scrollbar>
          <div class="nav">
            <h1>我的商店</h1>
            <div class="nav-content">
              <div>
                <h1>商店設定</h1>
                <p>管理商店資訊、營業時間與顧客付款方式</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>人員管理</h1>
                <p>管理商店人員、排班與權限等相關設定</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>線上網站設定</h1>
                <p>管理商店線上網站相關設定</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>帳單與訂閱</h1>
                <p>瀏覽商店目前訂閱方案</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>訊息管理</h1>
                <p>管理與新增商店的訊息發送相關設定</p>
              </div>
              <p>></p>
            </div>
          </div>
          <div class="nav">
            <h1>其他</h1>
            <div class="nav-content">
              <div>
                <h1>問卷表單</h1>
                <p>管理商店給顧客填寫的所有表單</p>
              </div>
              <p>></p>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="menu">
        <el-scrollbar>
          <div class="nav">
            <h1>項目管理</h1>
            <div class="nav-content">
              <div>
                <h1>項目管理</h1>
                <p>管理商店內所有服務項目</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>商品</h1>
                <p>管理商店內所有商品</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>折扣</h1>
                <p>管理商店內所有折扣項目</p>
              </div>
              <p>></p>
            </div>
          </div>
          <div class="nav">
            <h1>票劵管理</h1>
            <div class="nav-content">
              <div>
                <h1>優惠劵</h1>
                <p>管理商店內所有優惠卷</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>儲值卡</h1>
                <p>管理商店內所有儲值卡</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>計次劵</h1>
                <p>管理商店內所有計次劵</p>
              </div>
              <p>></p>
            </div>
          </div>
          <div class="nav">
            <h1>應用程式</h1>
            <div class="nav-content">
              <div>
                <h1>LINE OA 串接</h1>
                <p>管理LiINE OA 與系統的串接相關規定</p>
              </div>
              <p>></p>
            </div>
            <div class="nav-content">
              <div>
                <h1>LINE Pay 串接</h1>
                <p>管理LiINE Pay 與系統的串接相關規定</p>
              </div>
              <p>></p>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  background-color: rgba(231, 227, 223, 0.2);

  p {
    margin: 10px 0px;
  }

  >.content {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;
    // box-shadow: inset 10px 0 6px 0 rgba(0, 0, 0, 0.02);
    // border: solid 1px rgb(112, 112, 112, 0.2);
    // background-color: rgba(231, 227, 223, 0.2);
    color: #707070;
    display: flex;

    >.menu {
      width: 100%;
      height: 100%;
      overflow: auto;

      .nav {
        margin: 10px 10px;
        background-color: #fff;
        border-radius: 10px;

        >h1 {
          padding: 15px 5px;
          margin: 0px 10px;
          font-size: 25px;
          color: #000000;
          border-bottom: 1px solid #c1BDB8;
        }

        .nav-content {
          margin: 0 10px;
          padding: 20px 10px;
          font-size: 20px;
          display: flex;
          border-bottom: 1px solid #c1BDB8;
          justify-content: space-between;

          &:last-child {
            border-bottom: none;
          }

          >div {
            >h1 {
              font-size: 20px;
              color: #707070;
            }

            >p {
              font-size: 16px;
              color: #c1BDB8;

            }
          }

          >p {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>