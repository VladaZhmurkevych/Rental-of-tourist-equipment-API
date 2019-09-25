export interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
}

export interface IObserver {
  update(subject: ISubject): void;
}

export class Subject<T> implements ISubject {
  public data: T;

  private subscribers: IObserver[] = [];

  public subscribe(observer: IObserver): void {
    this.subscribers.push(observer);
  }

  public unsubscribe(observer: IObserver): void {
    const index = this.subscribers.indexOf(observer);
    this.subscribers.splice(index, 1);
  }

  notify(): void {
    this.subscribers.forEach((subscriber: IObserver) => {
      subscriber.update(this);
    });
  }

  nextValue(data: T) {
    this.data = data;
    this.notify();
  }
}

export class Observer<T> implements IObserver {
  constructor(private callback: (data: T) => unknown) {}

  public update(subject: Subject<T>): void {
    this.callback(subject.data);
  }
}
