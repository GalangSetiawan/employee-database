export class StatusPernihanModel{

    public id!: string;
    public nama!: string;

  constructor(initial?: Partial<StatusPernihanModel>) {
    Object.assign(this, initial);
  }
}
