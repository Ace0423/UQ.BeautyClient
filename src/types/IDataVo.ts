export interface IServiceTypeVo {
  lessonTypeId: number;
  display: boolean;
  order: number;
  nameEn: string;
  nameTw: string;
  dateCreate: string;
  dateUpdate: string;
  editUser: string;
  editState: boolean;
  editNameTw: string;
}

export interface IServiceDetailVo2 {
  lessonId: number;
  lessonTypeId: number;
  display: true;
  nameEn: string;
  nameTw: string;
  servicesTime: number;
  price: number;
  discount: number;
  isBonusOpen: false;
  isEditAccounting: false;
  dateCreate: string;
  dateUpdate: string;
  editUser: string;
  serviceDiscountMaps: [];
  couponCardMapServices: [];
  forFreeCardMapService: [];
  topUpCardMapService: [];
}

export interface IServiceGroupVo {
  sgId: number;
  sgTitle: boolean;
  order: number;
}

export interface IServiceDetailVo {
  sId: number;
  display: true;
  nameEn: string;
  name: string;
  servicesTime: number;
  price: number;
  discount: number;
  isBonusOpen: false;
  isEditAccounting: false;
  dateCreate: string;
  dateUpdate: string;
  editUser: string;
  serviceDiscountMaps: [];
  couponCardMapServices: [];
  forFreeCardMapService: [];
  topUpCardMapService: [];
}

export interface IApptDetailVo {
  lessonId: number;
  lessonTypeId: number;
  display: true;
  nameEn: string;
  nameTw: string;
  servicesTime: number;
  price: number;
  discount: number;
  isBonusOpen: false;
  isEditAccounting: false;
  dateCreate: string;
  dateUpdate: string;
  editUser: string;
  serviceDiscountMaps: [];
  couponCardMapServices: [];
  forFreeCardMapService: [];
  topUpCardMapService: [];
}

export interface IBookingVo {
  id: string;
  timePeriod: string;
  date: string;
  range: number;
  userId: number;
  bookingNo: string;
  beautyTherapist: string;
  bookingMemo: string;
  customer: string;
  dateBooking: string;
  dateCreate: string;
  discount: number;
  lesson: string;
  lessonId: number;
  price: number;
  managerId: number;
  state: number;
  timer: number;
  tradeDone: boolean;
}

export interface IMemberListVo {
  userId: number;
  email: string;
  phone: string;
  nameFirst: string;
  nameLast: string;
  nameView: string;
  birthday: string;
  sex: number;
  photo: string;
  memo: string;
  userLevel: number;
  userLock: boolean;
  lineUserID: string;
  googleUserID: string;
  groupList: [];
  tradingTime: string;
}

export interface IGoodsTypeVo {
  group: IGroupTypeVo[];
  productList: [];
}

export interface IGroupTypeVo {
  pgId: number;
  pgTitle: string;
  couponCardMapGroups: [];
  editState: boolean;
  isList: number;
  pIdList: [];
  editNameTw: string;
}
