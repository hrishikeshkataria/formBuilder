import { IDropdown } from "./idropdown";

export interface IFormField {
  label: string;
    f_Name: string;
    f_Type: string;
    f_Value: string;
    placeholder: string;
    values: IDropdown[];
    number: number
}
