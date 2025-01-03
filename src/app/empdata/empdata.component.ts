import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { empdatamodel } from './empdata.model';
import { ApiIntService } from '../shared/api-int.service';

@Component({
  selector: 'app-empdata',
  templateUrl: './empdata.component.html',
  styleUrls: ['./empdata.component.scss']
})
export class EmpdataComponent implements OnInit {
  

 

  fromValue !: FormGroup;
  empdataModalObj : empdatamodel = new empdatamodel();
  empDataShow !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor( private formbuilder : FormBuilder,
    private api : ApiIntService
  ) { }
 
  ngOnInit(): void {
    this.fromValue = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })

    this.getAllData();
  }

    clickAdd(){
        this.fromValue.reset();
        this.showAdd = true;
        this.showUpdate = false;
    }
  

  postempdata(){
    this.empdataModalObj.firstName = this.fromValue.value.firstname;
    this.empdataModalObj.lastName = this.fromValue.value.lastname;
    this.empdataModalObj.email = this.fromValue.value.email;
    this.empdataModalObj.mobile = this.fromValue.value.mobile;
    this.empdataModalObj.salary = this.fromValue.value.salary;

    this.api.postData(this.empdataModalObj)
    .subscribe(res => {
      console.log(res);
      alert("Data posted successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.fromValue.reset();
      this.getAllData()
    },
      err => {
        alert("DSomething went wrong");
      });
      
  }

  getAllData(){
    this.api.getData()
    .subscribe(res  => {
     this.empDataShow = res;
    })
  }

  deleterow(row : any){
    this.api.delete(row.id)
    .subscribe(res => {
      alert("Data deleted successfully");
      this.getAllData();
  })
  }

  onedit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.empdataModalObj.id = row.id
     this.fromValue.controls['firstname'].setValue(row.firstName);
     this.fromValue.controls['lastname'].setValue(row.lastName);
     this.fromValue.controls['email'].setValue(row.email);
     this.fromValue.controls['mobile'].setValue(row.mobile);
     this.fromValue.controls['salary'].setValue(row.salary);
  }

  updateempdata(){
    this.empdataModalObj.firstName = this.fromValue.value.firstname;
    this.empdataModalObj.lastName = this.fromValue.value.lastname;
    this.empdataModalObj.email = this.fromValue.value.email;
    this.empdataModalObj.mobile = this.fromValue.value.mobile;
    this.empdataModalObj.salary = this.fromValue.value.salary;

    this.api.updateData(this.empdataModalObj, this.empdataModalObj.id)
    .subscribe(res => {
      alert("Updated Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.fromValue.reset();
      this.getAllData();
    })
    }
  

 
}