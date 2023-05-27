export class UserInfo {
  firstname: string;
  lastname: string;
  telephone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  cardholder: string;
  cardnumber: string;
  month: string;
  year: string;
  cvv: string;

  constructor(fname: string, lname: string, tel: string, email: string, add: string, city: string, country: string, pc: string, cholder: string, cnm: string, mon: string, year: string, cvv: string) {
    this.firstname = fname;
    this.lastname = lname;
    this.telephone = tel;
    this.email = email;
    this.address = add;
    this.city = city;
    this.country = country;
    this.postcode = pc;
    this.cardholder = cholder;
    this.cardnumber = cnm;
    this.month = mon;
    this.year = year;
    this.cvv = cvv;
  }
}
