export class GlobalDataModel{

    public id!: string;
    public nama!: string;

  constructor(initial?: Partial<GlobalDataModel>) {
    Object.assign(this, initial);
  }
}
