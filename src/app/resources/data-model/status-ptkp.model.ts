export class StatusPtkpModel{

    public id!: string;
    public code!: string;
    public marryStatus!: string;
    public dependentNumbers!: number;
    public orderNumber!: number
    public fullName!: string;

  constructor(initial?: Partial<StatusPtkpModel>) {
    Object.assign(this, initial);
  }
}
