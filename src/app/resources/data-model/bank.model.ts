export class BankModel{

    public name!: string;
    public code!: string;

  constructor(initial?: Partial<BankModel>) {
    Object.assign(this, initial);
  }
}
