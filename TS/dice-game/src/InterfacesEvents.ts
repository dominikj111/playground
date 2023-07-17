export type IListener<A> = (a: A) => void;

export class Event<A> {
  private callbacks: Array<IListener<A>> = [];

  public add(listener: IListener<A>): void {
    this.callbacks.push(listener);
  }

  public trigger(a: A): void {
    this.callbacks.forEach((l) => l(a));
  }
}
