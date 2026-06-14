import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './models/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  employeeForm!: FormGroup;
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId || 1),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      state: new FormControl(this.employeeObj.state || ''),
      contactNo: new FormControl(this.employeeObj.contactNo || ''),
      city: new FormControl(this.employeeObj.city || ''),
      emailId: new FormControl(this.employeeObj.emailId || ''), // تم تعديل الاسم ليتوافق مع الـ HTML والـ Model
      pinCode: new FormControl(this.employeeObj.pinCode, [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormControl(this.employeeObj.adderess || ''),
    });
  }

  onSave() {
    const oldData = localStorage.getItem('EmpData');

    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      // تصحيح اسم الحقل ليكون empId مطابقتًا للتعريف الفوقي
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      // إذا كان أول موظف، نعطيه رقم معرف 1
      this.employeeForm.controls['empId'].setValue(1);
      this.employeeList.unshift(this.employeeForm.value);
    }

    // حفظ وتحديث البيانات في التخزين المحلي فوراً
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));

    // إعادة تهيئة الفورم بعد الحفظ بنجاح لتجهيزه لإدخال جديد
    this.employeeForm.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }

  // ميثود التحديث النهائي لحفظ التعديلات
  onUpdate() {
    const record = this.employeeList.find(
      (m) => m.empId == this.employeeForm.controls['empId'].value,
    );
    if (record != null) {
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.adderess = this.employeeForm.controls['address'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.employeeForm.reset();
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this employee?');
    if (isDelete) {
      // ترشيح المصفوفة لاستبعاد العنصر المحذوف
      this.employeeList = this.employeeList.filter((m) => m.empId !== id);
      // تحديث التخزين المحلي بعد الحذف
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
}
