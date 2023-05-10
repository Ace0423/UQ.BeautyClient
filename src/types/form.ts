interface IForm_required {
  warn: string;
}
interface IForm_cellphone {
  warn: string;
}
interface IForm_email {
  warn: string;
}
interface IForm_length {
  min?: number;
  max?: number;
  warn: string;
}
interface IForm_confirm {
  password: string;
  warn: string;
}

export interface IForm_component {
  label: string;
  component: string;
  type: string;
  icon: string;
  is_readonly: boolean;
  value: string;
  tip: string;
  rules: {
    required?: IForm_required;
    cellphone?: IForm_cellphone;
    email?: IForm_email;
    length?: IForm_length;
    confirm?: IForm_confirm;
  };
  is_error: boolean;
  warn: string;
  is_show: boolean;
}

export interface IMethods {
  [key: string]: Function;
}


