export class GenderModel{

    public id!: string;
    public nama!: string;

  constructor(initial?: Partial<GenderModel>) {
    Object.assign(this, initial);
  }
}
