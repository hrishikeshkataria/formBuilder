import { Injectable } from '@angular/core';
import { IDropdown } from './idropdown';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }
  getList() {
    let dropDown: IDropdown[] = [];
    let _Test_1 = < IDropdown > {
        displayValue: 'Test 1',
        internalValue: 'T1',
    };
    dropDown.push(_Test_1);
    let _Test_2 = < IDropdown > {
        displayValue: 'Test 2',
        internalValue: 'T2',
    };
    dropDown.push(_Test_2);
    return dropDown;
}
}
