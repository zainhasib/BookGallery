export class Toast {
  message: string;
  time: number;
  type: string;

  constructor(
    msg: string,
    t: number,
    ty: string) {
      this.message = msg;
      this.time = t;
      this.type = ty;
  }
}
