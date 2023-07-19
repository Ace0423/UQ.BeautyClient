
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getMessages } = companyStore;
const editMessageView = ref(false);
const selectMessageItem = ref();
const systemMessagesList: any = [
    {
        "mId": 1,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "test",
        "mUrl": "test",
        "mTarget": 0,
        "mSendTimer": 5,
        "mSendTimeing": 0,
        "mSendDate": "2023-07-14T20:00",
        "mSendDateD": "2023-07-14",
        "mSendDateT": "20:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [
            {
                "uId": 76,
                "uName": "陳佳玲"
            },
            {
                "uId": 77,
                "uName": "林君"
            },
            {
                "uId": 78,
                "uName": "山下喝酒"
            }
        ],
        "mFilter": {
            "msfId": 1,
            "mId": 1,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 2,
        "mAuto": true,
        "mType": 0,
        "mTheme": "好便宜",
        "mTitle": "好便宜",
        "mContext": "好便宜",
        "mImage": "",
        "mButtonText": "好便宜",
        "mUrl": "好便宜",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 1,
        "mSendDate": "0001-01-08T00:00",
        "mSendDateD": "1",
        "mSendDateT": "00:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 3,
        "mAuto": true,
        "mType": 0,
        "mTheme": "好便宜",
        "mTitle": "好便宜",
        "mContext": "好便宜",
        "mImage": "",
        "mButtonText": "好便宜",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 3,
        "mSendTimeing": 3,
        "mSendDate": "2023-07-17T12:00",
        "mSendDateD": "2023-07-17",
        "mSendDateT": "12:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 4,
        "mAuto": true,
        "mType": 0,
        "mTheme": "好便宜",
        "mTitle": "好便宜",
        "mContext": "好便宜",
        "mImage": "",
        "mButtonText": "好便宜",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-10T17:00",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "17:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 5,
        "mAuto": true,
        "mType": 0,
        "mTheme": "好糟糕",
        "mTitle": "好糟糕",
        "mContext": "好糟糕",
        "mImage": "",
        "mButtonText": "好糟糕",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 3,
        "mSendTimeing": 3,
        "mSendDate": "2023-07-10T17:05",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "17:05",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 6,
        "mAuto": true,
        "mType": 0,
        "mTheme": "太糟",
        "mTitle": "太糟",
        "mContext": "太糟",
        "mImage": "",
        "mButtonText": "太糟",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-10T17:15",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "17:15",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 15,
        "mAuto": true,
        "mType": 0,
        "mTheme": "Test004",
        "mTitle": "Test004",
        "mContext": "Test004",
        "mImage": "",
        "mButtonText": "Test004",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-10T17:32",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "17:32",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1,
                "ccTitle": "優惠400"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 16,
        "mAuto": true,
        "mType": 0,
        "mTheme": "Test005",
        "mTitle": "Test005",
        "mContext": "Test005",
        "mImage": "",
        "mButtonText": "Test005",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-10T17:32",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "17:32",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1,
                "ccTitle": "優惠400"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 17,
        "mAuto": true,
        "mType": 0,
        "mTheme": "Test006",
        "mTitle": "Test006",
        "mContext": "Test006",
        "mImage": "",
        "mButtonText": "Test006",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-10T17:32",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "17:32",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1,
                "ccTitle": "優惠400"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 18,
        "mAuto": true,
        "mType": 0,
        "mTheme": "Test006",
        "mTitle": "Test006",
        "mContext": "Test006",
        "mImage": "",
        "mButtonText": "Test006",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-10T13:00",
        "mSendDateD": "2023-07-10",
        "mSendDateT": "13:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1,
                "ccTitle": "優惠400"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 22,
        "mAuto": false,
        "mType": 0,
        "mTheme": "88節",
        "mTitle": "88節",
        "mContext": "88節",
        "mImage": "",
        "mButtonText": "88節",
        "mUrl": "88節",
        "mTarget": 0,
        "mSendTimer": 1,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-20T11:00",
        "mSendDateD": "2023-07-20",
        "mSendDateT": "11:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 9,
            "mId": 22,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "74,75,76",
            "msfOther": ""
        }
    },
    {
        "mId": 23,
        "mAuto": false,
        "mType": 0,
        "mTheme": "77",
        "mTitle": "77",
        "mContext": "77",
        "mImage": "",
        "mButtonText": "77",
        "mUrl": "77",
        "mTarget": 0,
        "mSendTimer": 1,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-20T13:00",
        "mSendDateD": "2023-07-20",
        "mSendDateT": "13:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 10,
            "mId": 23,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 24,
        "mAuto": false,
        "mType": 0,
        "mTheme": "77",
        "mTitle": "77",
        "mContext": "77",
        "mImage": "",
        "mButtonText": "77",
        "mUrl": "77",
        "mTarget": 0,
        "mSendTimer": 0,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-19T06:00",
        "mSendDateD": "2023-07-19",
        "mSendDateT": "06:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 8,
            "mId": 24,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 25,
        "mAuto": false,
        "mType": 0,
        "mTheme": "77",
        "mTitle": "77",
        "mContext": "77",
        "mImage": "",
        "mButtonText": "77",
        "mUrl": "77",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-13T14:00",
        "mSendDateD": "2023-07-13",
        "mSendDateT": "14:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 26,
        "mAuto": true,
        "mType": 1,
        "mTheme": "母親節",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 3,
        "mSendTimeing": 3,
        "mSendDate": "2023-07-12T11:00",
        "mSendDateD": "2023-07-12",
        "mSendDateT": "11:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 0,
            "mId": 0,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 27,
        "mAuto": false,
        "mType": 1,
        "mTheme": "母親節",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 1,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-20T13:00",
        "mSendDateD": "2023-07-20",
        "mSendDateT": "13:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 11,
            "mId": 27,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 28,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "300元優惠",
        "mUrl": "",
        "mTarget": 1,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "0001-01-01T17:00",
        "mSendDateD": "0001-01-01",
        "mSendDateT": "17:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 2,
            "mId": 28,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 29,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節111",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "母親節",
        "mUrl": "",
        "mTarget": 1,
        "mSendTimer": 3,
        "mSendTimeing": 3,
        "mSendDate": "2023-07-14T17:00",
        "mSendDateD": "2023-07-14",
        "mSendDateT": "17:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 3,
            "mId": 29,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 30,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節222",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "2222",
        "mUrl": "",
        "mTarget": 1,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "0001-01-01T17:00",
        "mSendDateD": "0001-01-01",
        "mSendDateT": "17:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 4,
            "mId": 30,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 31,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節333",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "333",
        "mUrl": "",
        "mTarget": 1,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "0001-01-01T16:00",
        "mSendDateD": "0001-01-01",
        "mSendDateT": "16:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 5,
            "mId": 31,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 32,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節123",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "111",
        "mUrl": "",
        "mTarget": 0,
        "mSendTimer": 2,
        "mSendTimeing": 2,
        "mSendDate": "2023-07-01T00:00",
        "mSendDateD": "2023-07-01",
        "mSendDateT": "00:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 6,
            "mId": 32,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 0,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    },
    {
        "mId": 33,
        "mAuto": true,
        "mType": 0,
        "mTheme": "母親節",
        "mTitle": "300元優惠",
        "mContext": "母親節",
        "mImage": "",
        "mButtonText": "",
        "mUrl": "",
        "mTarget": 1,
        "mSendTimer": 3,
        "mSendTimeing": 0,
        "mSendDate": "2023-07-17T11:00",
        "mSendDateD": "2023-07-17",
        "mSendDateT": "11:00",
        "mEnabled": true,
        "mEnabledLine": false,
        "mEnabledMessage": false,
        "mSendTimeLast": "",
        "mMapCouponCards": [
            {
                "ccId": 1002,
                "ccTitle": "300元優惠"
            }
        ],
        "mMapMembers": [],
        "mFilter": {
            "msfId": 7,
            "mId": 33,
            "msfSex": "",
            "msfRegister": "",
            "msfAvgPriceA": 0,
            "msfAvgPriceB": 0,
            "msfTolPriceA": 0,
            "msfTolPriceB": 0,
            "msfBirthday": "",
            "msfLabel": "",
            "msfConsumer": 1,
            "msfUnConsumer": 0,
            "msfConCycleA": 0,
            "msfConCycleB": 0,
            "msfStaff": "",
            "msfMember": "",
            "msfOther": ""
        }
    }
];
const handEditMessageView = (item: any) => {
    selectMessageItem.value = item;
    editMessageView.value = !editMessageView.value;
};
const messages = (type: any) => {
    let data = {
        MId: 0,
        type: type,
        pageIndex: 0,
        count: 0
    }
    getMessages(data)
        .then((res) => {
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
            }
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        })
}
onMounted(() => {
    // messages(1);
})
</script>
<template>
    <div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th class="col-5-th">
                        <p>主題 </p>
                    </th>
                    <th class="col-2-th">
                        <p>LINE</p>
                    </th>
                    <th class="col-2-th">
                        <p>簡訊</p>
                    </th>
                    <th class="col-1-th">
                        <p></p>
                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in systemMessagesList" :key="item.managerId">
                    <td class="col-5-th">
                        <p>{{ item.mTheme }}</p>
                    </td>
                    <td class="col-2-th">
                        <input type="radio" disabled :checked="item.mAuto" />
                    </td>
                    <td class="col-2-th">
                        <input type="radio" disabled :checked="item.mAuto" />
                    </td>
                    <td class="col-1-th">
                        <button class="header-btn" @click="handEditMessageView(item)">
                            >
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <edit-system-message v-if="editMessageView" :handEditMessageView="handEditMessageView"
        :selectMessageItem="selectMessageItem" />
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

    p {
        margin: 16px;
    }

    >.function-area {
        height: 50px;
        position: absolute;
        top: -50px;
        border: none;
        background-color: transparent;
        display: flex;
        // justify-content: end;
        align-items: center;
        left: auto;
        width: auto;

        >input {
            max-width: 150px;
            height: 60%;
            border-radius: 6px;
            border: solid 1px #707070;
            background-color: #fff;
            margin: 5px;
            text-align: left;
        }

        >button {
            border-radius: 6px;
            min-width: 100px;
            height: 70%;
            border: solid 1px #707070;
            background-color: #84715c;
            color: #fff;
            margin: 0 5px;
        }

        >.header-auto-btn {
            border: solid 2px #84715c;
            background-color: transparent;
            color: #84715c;
            font-weight: bold;
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

                >.col-1-th {
                    width: 10%;
                }

                >.col-2-th {
                    width: 25%;
                }

                >.col-5-th {
                    width: 40%;
                }

                >th {
                    >p {
                        min-width: 108px;
                        text-align: left;
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
            display: block;

            >tr {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: 0;
                    width: 98%;
                    height: 1px;
                    background: #ddd;
                    left: 50%;
                    transform: translateX(-50%);
                }

                >.col-1-th {
                    width: 10%;
                }

                >.col-2-th {
                    width: 25%;
                }

                >.col-5-th {
                    width: 40%;
                }

                >td {
                    display: flex;
                    width: calc(100%/4);

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

                    >input {
                        margin: 0px 25px;
                    }
                }

                .content-name {
                    // padding-left: 10px;
                    display: flex;

                    img {
                        margin: 0 15px;
                    }
                }
            }
        }
    }
}
</style>