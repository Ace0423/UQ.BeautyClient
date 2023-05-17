/**回傳錯誤馬 */
export const showErrorMsg = (status: string): string => {
  let message = "";
  switch (status) {
    case "DE01":
      message = "不可為空值";
      break;
    case "DE02":
      message = "金額不可為0";
      break;
    case "DE03":
      message = "查無資料";
      break;
    case "DE04":
      message = "失敗的請求";
      break;
    case "UB01":
      message = "沖銷金額後，不可小於0";
      break;
    case "MB01":
      message = "EMAIL不可重複";
      break;
    case "MB02":
      message = "新增會員失敗";
      break;
    case "MB03":
      message = "修改會員失敗";
      break;
    case "BK01":
      message = "預約單號有誤";
      break;
    case "BK02":
      message = "預約時間不可小於今天";
      break;
    case "BK03":
      message = "預約時間有衝突";
      break;
    case "BK04":
      message = "預約資料有誤";
      break;
    case "LM01":
      message = "該課程有明細存在";
      break;
    case "LM02":
      message = "該課程有預約紀錄存在";
      break;
    default:
      message = status;
  }
  return message;
};
/**api失敗連線 */
export const showApiStatus = (status: number | string): string => {
  let message = "";
  console.log(status);
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 405:
      message = "请求方式错误";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};