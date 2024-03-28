export class EmployeeCompleteModel{

  
    public id: string | any = null;
    public nik: string | any = null;
    public firstName: string | any = null;
    public fullName: string | any = null;
    public lastName: string | any = null;
    public countryBirth: string | any = null;
    public gender: string | any = null;
    public birthDate: Date | any = null;
    public marriageStatus: string | any = null;
    public identityNumber: string | any = null;
    public ptkpStatus: string | any = null;
    public telpNumber: string | any = null;
    public hanphoneNumber: string | any = null;
    public email: string | any = null;
    public agama: string | any = null;
    public isDiffDomicili: boolean | any = null;
    public idAddress: string | any = null;
    public idProvinsi: string | any = null;
    public idKabupaten: string | any = null;
    public idKecamatan: string | any = null;
    public idKelurahan: string | any = null;
    public domiciliAddress: string | any = null;
    public domiciliProvinsi: string | any = null;
    public domiciliKabupaten: string | any = null;
    public domiciliKecamatan: string | any = null;
    public domiciliKelurahan: string | any = null;
    public basicSalary: string | any = null;
    public employeeStatus: string | any = null;
    public departement: string | any = null;
    public position: string | any = null;
    public startWorkingDate: Date | any = null;
    public startContractDate: Date | any = null;
    public endContractDate: Date | any = null;
    public bankRekening: string | any = null;
    public namaRekening: string | any = null;
    public nomorRekening: string | any = null;

  constructor(initial?: Partial<EmployeeCompleteModel>) {
    Object.assign(this, initial);
  }
}
