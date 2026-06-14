export class EmployeeModel {
  empId: number;
  name: string;
  city: string;
  state: string;
  emailId: string;
  contactNo: string;
  adderess: string;
  pinCode: string;

  constructor() {
    this.empId = 1;
    this.adderess = '';
    this.name = '';
    this.city = '';
    this.state = '';
    this.contactNo = '';
    this.emailId = '';
    this.pinCode = '';
  }
}
