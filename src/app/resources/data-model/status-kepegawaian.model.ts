export class StatusKepegawaianModel{

    public id!: string;
    public nama!: string;

  constructor(initial?: Partial<StatusKepegawaianModel>) {
    Object.assign(this, initial);
  }
}
