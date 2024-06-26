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
    case "DE05":
      message = "不可重複插入資料";
      break;
    case "DE06":
      message = "查無會員資料";
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
    case "BK05":
      message = "此時間段沒有空閒的芳療師";
      break;
    case "LM01":
      message = "該課程有明細存在";
      break;
    case "LM02":
      message = "該課程有預約紀錄存在";
      break;
    case "MS01":
      message = "輸入的日期與時段格式有誤";
      break;
    case "MS02":
      message = "該筆已有發送紀錄，故無法刪除";
      break;
    case "FF01":
      message = "該計次卡已被領取，故無法動作";
      break;
    case "TU01":
      message = "該儲值卡已被領取，故無法動作";
      break;
    case "LI01":
      message = "帳號密碼錯誤";
      break;
    case "OD01":
      message = "此會員不是Line會員";
      break;
    default:
      message = status;
  }
  return message;
};
/**api失敗連線 */
export const showHttpsStatus = (status: number | string): string => {
  let message = "";
  switch (status) {
    case 400:
      message = "請求錯誤(400)";
      break;
    case 401:
      message = "連線超時，請重新登入！";
      break;
    case 403:
      message = "未授權拒绝访问(403)";
      break;
    case 404:
      message = "請求出錯(404)";
      break;
    case 405:
      message = "請求方式錯誤";
      break;
    case 408:
      message = "請求超時(408)";
      break;
    case 500:
      message = "服務器錯誤(500)";
      break;
    case 501:
      message = "服務器未實現(501)";
      break;
    case 502:
      message = "網路錯誤(502)";
      break;
    case 503:
      message = "服務器不可用(503)";
      break;
    case 504:
      message = "網路超時(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `連接錯誤(${status})!`;
  }
  return `${message}，請檢察網路或連繫管理員！`;
};
