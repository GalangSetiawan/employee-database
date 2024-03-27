export class AgamaModel{

    public id!: string;
    public nama!: string;

  constructor(initial?: Partial<AgamaModel>) {
    Object.assign(this, initial);
  }
}
