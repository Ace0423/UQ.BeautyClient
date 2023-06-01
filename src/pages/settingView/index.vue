<script setup lang="ts"></script>
<template>
  <div class="content">
    <div class="menu">
      <el-scrollbar>
        <div class="nav">
          <h1>我的商店</h1>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>商店設定</h1>
                <p>管理商店資訊、營業時間與顧客付款方式</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="/settingView/userManagerView/userView">
              <div>
                <h1>人員管理</h1>
                <p>管理商店人員、排班與權限等相關設定</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>線上網站設定</h1>
                <p>管理商店線上網站相關設定</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>帳單與訂閱</h1>
                <p>瀏覽商店目前訂閱方案</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>訊息管理</h1>
                <p>管理與新增商店的訊息發送相關設定</p>
              </div>
              <p>></p>
            </router-link>
          </div>
        </div>
        <div class="nav">
          <h1>其他</h1>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>問卷表單</h1>
                <p>管理商店給顧客填寫的所有表單</p>
              </div>
              <p>></p>
            </router-link>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="menu">
      <el-scrollbar>
        <div class="nav">
          <h1>項目管理</h1>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>項目管理</h1>
                <p>管理商店內所有服務項目</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="/settingView/goodsMgmt/goodsPage">
              <div>
                <h1>{{ $t("goodsMgmt") }}</h1>
                <p>管理商店內所有商品</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="/settingView/discountMgmt/discountAllPage">
              <div>
                <h1>折扣</h1>
                <p>管理商店內所有折扣項目</p>
              </div>
              <p>></p>
            </router-link>
          </div>
        </div>
        <div class="nav">
          <h1>票劵管理</h1>
          <div class="nav-content">
            <router-link to="/settingView/couponMgmt/couponPage">
              <div>
                <h1>優惠劵</h1>
                <p>管理商店內所有優惠卷</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>儲值卡</h1>
                <p>管理商店內所有儲值卡</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="/settingView/countTicketMgmt/countTicketPage">
              <div>
                <h1>計次劵</h1>
                <p>管理商店內所有計次劵</p>
              </div>
              <p>></p>
            </router-link>
          </div>
        </div>
        <div class="nav">
          <h1>應用程式</h1>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>LINE OA 串接</h1>
                <p>管理LiINE OA 與系統的串接相關規定</p>
              </div>
              <p>></p>
            </router-link>
          </div>
          <div class="nav-content">
            <router-link to="">
              <div>
                <h1>LINE Pay 串接</h1>
                <p>管理LiINE Pay 與系統的串接相關規定</p>
              </div>
              <p>></p>
            </router-link>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  p {
    margin: 10px 0px;
  }

  position: absolute;
  top: 80px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  // margin: 2px 40px;
  color: #707070;
  display: flex;
  background-color: rgba(231, 227, 223, 0.2);

  > .menu {
    margin: 2px 10px;
    width: 100%;
    height: 100%;
    overflow: auto;

    .nav {
      margin: 10px 10px;
      background-color: #fff;
      border-radius: 10px;

      > h1 {
        padding: 15px 5px;
        margin: 0px 10px;
        font-size: 25px;
        color: #707070;
        border-bottom: 1px solid #c1bdb8;
      }

      .nav-content {
        margin: 0 10px;
        padding: 20px 10px;
        font-size: 20px;
        border-bottom: 1px solid #c1bdb8;

        &:last-child {
          border-bottom: none;
        }

        > a {
          display: flex;
          justify-content: space-between;

          > div {
            > h1 {
              font-size: 20px;
              color: #707070;
            }

            > p {
              font-size: 16px;
              color: #c1bdb8;
            }
          }

          > p {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
