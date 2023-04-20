import { ref } from "vue";
import type { Router } from "vue-router";

/**
 * @author TiRa
 * @create 2022-09-09 15:38:03
 */
class Uictrl {

  menu =
    [
      // { label: "system", files: ["typecorelist", "rolelist", "memulist"] },
      // { label: "report", files: ["betreport", "tableinstantstate", "opendetail", "winlosereport", "abnormalround", "illegalbetqry", "rounddetail", "riskymemberqry"] },
      // { label: "game", files: ["pitbosschangepwd", "exchange", "maintenance", "api_test", "notice", "tablesettings", "hallsettings"] },
      // { label: "user", files: ["dealerlist", "agentlist", "memberlist", "system_managelist", "platmember"] },
      // { label: "site", files: ["idnagentlist", "sitelogsetting", "singlewalletset", "platinfosetting", "gamemanager", "sendapisetting"] },
      // { label: "test", files: ["test1", "test2", "test3", "test4", "test5", "test6"] },
      { label: "Beauty", files: ["courseMgmt","reserve", "customerMgmt","productMgmt", "orderList", "reportList"] },
    ]
  meunCtrlObj = ref<{ [key: string]: { open: boolean, files: { [file: string]: boolean } } }>({});
  /**切换菜单 */
  swtichMenu(menuName: string) {
    this.menu.map(item => {
      //初始化ref对象
      this.meunCtrlObj.value[item.label] = this.meunCtrlObj.value[item.label] || { open: false, files: {} };
      //设置按菜单关闭或者打开
      this.meunCtrlObj.value[item.label].open = this.meunCtrlObj.value[item.label].open ? false : (item.label == menuName);
      item.files.map(file => {
        //设置二级菜单打开状态
        var boo = file == menuName;
        this.meunCtrlObj.value[item.label].files[file] = boo;
        if (boo) {
          this.meunCtrlObj.value[item.label].open = true;
          this.goto(file);
        }
      })
    })
    // console.log(this.meunCtrlObj)
  }


  private static router: Router;//= useRouter();
  setRouter(router: Router) {
    Uictrl.router = router;
  }
  /**打开首页 */
  // openHome() { Uictrl.gotoRouter("home"); }


  private static whiteList = ["/", "/registerpage", "/resetpasswordpage"];
  getAllowRequestPage(path: string) {
    let allow = true;

    // if (!Uictrl.whiteList.includes(path) && !globalVars.isLogin) {
    //   allow = false;
    // }

    return allow;
  }
  // /**返回登录页面 */
  // openLogin() {
  //    Uictrl.gotoRouter(""); 
  //   }
  getCurrentRouter() {
    return Uictrl.router.currentRoute.value;
  }

  /**返回上一页 */
  back() {
    // Uictrl.gotoRouter(Uictrl.previousRouter); 
    // Uictrl.router.go(-1);
    Uictrl.router.back()

  }

  goto(pageType: string) {
    console.log("goto");
    
    Uictrl.gotoRouter(pageType);
  }

  private static gotoRouter(pageType: string, params?: any) {
    console.log("路由切换: ", pageType)
    //  if() this.previousRouter = pageType;
    // this.router.replace({ path: '/' + pageType });

    params = params || {};
    // console.log(params)
    
    this.router.push({ path: '/' + pageType, params });
  }

  constructor() {
  }
}


/**UI控制器 */
let uictrl = new Uictrl();
export default uictrl;   