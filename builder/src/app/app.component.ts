import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from './dropdown.service';
import { IDropdown } from './idropdown';
import { IFormField } from './iform-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'builder';
  builderObj: any;
  builderArray: any = [];
  formFillerArr: any = [];
  formFillerObj: any;
    sampleform: FormGroup = this.formBuilder.group({});
    controlform: FormGroup = this.formBuilder.group({
      typename: ['', Validators.required],
      valueType: ['0', Validators.required],
      labelname: ['', Validators.required],
     // value: ['', Validators.required]
  });
    lstForm: IFormField[] = [];
    outputStr: string = '';
    typename: any;
    ValueType: any;
    value: any

    constructor(private formBuilder: FormBuilder, private dropdownService: DropdownService) {
      this.builderObj = new Builder();
      this.getFormFiller();
    }
    ngOnInit(): void {

        this.sampleform = this.formBuilder.group({});
        this.controlform = this.formBuilder.group({
          controlId:[0],
            typename: ['', Validators.required],
            valueType: ['0', Validators.required],
            labelname: ['', Validators.required],
            //value: ['', Validators.required],
        });
        this.getFBuild();
        this.getFormFiller();
    }
    onSubmitControl() {
      debugger;
        if (this.controlform.value.valueType == "text") {
            let _un = <IFormField> {
                label: this.controlform.value.labelname,
                f_Name: this.controlform.value.typename,
                f_Type: this.controlform.value.valueType,
                f_Value: this.controlform.value.typename,
            };
            this.formFillerObj = {
              f_Name: this.controlform.value.typename,
              f_Value: this.controlform.value.typename
            }
            this.lstForm.push(_un);
            //LocalStorage
            this.storedBuilderLocally(_un);
            this.storedLocallyFormFiller(this.formFillerObj);
        }

        if (this.controlform.value.valueType == "number") {
          debugger;
          let _un = <IFormField> {
              label: this.controlform.value.labelname,
              f_Name: this.controlform.value.typename,
              f_Type: this.controlform.value.valueType,
              f_Value: this.controlform.value.typename,

          };
          console.log("Number => "+ _un);
          this.formFillerObj = {
            f_Name: this.controlform.value.typename,
            f_Value: this.controlform.value.typename
          }
          console.log("Filler obj => " +this.formFillerObj);
          this.lstForm.push(_un);
          //LocalStorage
          this.storedBuilderLocally(_un);
          this.storedLocallyFormFiller(this.formFillerObj);
      }
        if (this.controlform.value.valueType == "dropdown") {
            let stateList = this.dropdownService.getList(); // Get test list from service
            let _ddlStateList = <IFormField> {
                label: this.controlform.value.labelname,
                f_Name: this.controlform.value.typename,
                f_Type: this.controlform.value.valueType == "dropdown" ? 'select' : '',
                f_Value: '0',
                //f_val: '',
                values: stateList,
            };
            this.lstForm.push(_ddlStateList);

        }
        if (this.controlform.value.valueType == "checkbox") {
          let _radio = < IFormField > {
              label: this.controlform.value.labelname,
              f_Name: this.controlform.value.typename,
              f_Type: this.controlform.value.valueType,
              f_Value: this.controlform.value.typename,
              //f_val: this.controlform.value.value,
          };
          this.lstForm.push(_radio);
      }
        if (this.controlform.value.valueType == "radio") {
            let _radio = < IFormField > {
                label: this.controlform.value.labelname,
                f_Name: this.controlform.value.typename,
                f_Type: this.controlform.value.valueType,
                f_Value: this.controlform.value.typename,
                //f_val: this.controlform.value.value,
            };
            this.lstForm.push(_radio);
        }
        if (this.controlform.value.valueType == "datepicker") {
            let _radio = < IFormField > {
                label: this.controlform.value.labelname,
                f_Name: this.controlform.value.typename,
                f_Type: this.controlform.value.valueType == "datepicker" ? 'date' : '',
                f_Value: this.controlform.value.typename,
                //f_val: this.controlform.value.value,
            };
            this.lstForm.push(_radio);
        }
        this.formValidation();
    }

    storedBuilderLocally(a:any){
      this.builderArray.push(a);
      const isData =localStorage.getItem("BuilderData");
    if(isData == null){
      const newArr = [];
     this.builderObj.controlId=0;
      newArr.push(this.builderArray);
      localStorage.setItem("BuilderData",JSON.stringify(newArr));
    }
    else{
        const oldData = JSON.parse(isData);
        const newId = oldData.length + 1;
        this.builderObj.controlId =newId;
        oldData.push(this.builderObj);
        localStorage.setItem("BuilderData",JSON.stringify(this.builderArray));
     }
     this.builderObj = new Builder();
    }

    getFBuild(){
      const isData =localStorage.getItem("BuilderData");
      if(isData != null){
        const localData = JSON.parse(isData);
        this.builderArray = localData;
      }
    }


    formValidation() {
      debugger;
        const group: any = {};
        for (var field of this.lstForm) {
            if (field.f_Type == 'text') {
                group[field.f_Name] = new FormControl(field.f_Value || '', [
                    Validators.required,
                ]);
            } else if (field.f_Name.toLowerCase().indexOf('email') > -1) {
                group[field.f_Name] = new FormControl(field.f_Value || '', [
                    Validators.required,
                    Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$'),
                ]);
            }else if (field.f_Type == 'number') {
              group[field.f_Name] = new FormControl(field.f_Value || 0, [
                  Validators.required,
              ]);
          } else if (field.f_Type == 'select') {
                group[field.f_Name] = new FormControl(field.f_Value || '', Validators.required);
            } else if (field.f_Type == 'radio') {
                group[field.f_Name] = new FormControl(false, null);
            }else if (field.f_Type == 'checkbox') {
              group[field.f_Name] = new FormControl(false, null);
          }else if (field.f_Type == 'date') {
                group[field.f_Name] = new FormControl(field.f_Value || '', [
                    Validators.required,
                ]);
            }
        }
        this.sampleform = new FormGroup(group);
    }
    onSubmit() {
      debugger;
      console.log(this.sampleform.value);
        this.formValidation();
        if (this.sampleform.valid) {
            console.log(this.lstForm);
        }
        this.formFillerArr=[];
        this.storedLocallyFormFiller(this.sampleform.value);
    }

    storedLocallyFormFiller(b:any){
      this.formFillerArr.push(b);
      const isData =localStorage.getItem("FormFillerData");
    if(isData == null){
      const newArr = [];
     this.formFillerObj.Id=0;
      newArr.push(this.formFillerArr);
      localStorage.setItem("FormFillerData",JSON.stringify(newArr));
    }
    else{
        const oldData = JSON.parse(isData);
        const newId = oldData.length;
        this.formFillerObj.Id =newId;
        oldData.push(this.formFillerObj);
        localStorage.setItem("FormFillerData",JSON.stringify(this.formFillerArr));
     }

    }
    getFormFiller(){
      const isData =localStorage.getItem("FormFillerData");
      if(isData != null){
        const localData = JSON.parse(isData);
        this.formFillerArr = localData;
      }
    }
}
export class Builder{
  controlId : number;
  controlName: string;
    controlType: string;
    controlLabel: string;

  constructor(){
    this.controlId = 0;
    this.controlName = '';
    this.controlType= '';
    this.controlLabel= '';
  }
}
