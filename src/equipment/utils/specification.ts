import { IEquipment } from './equipment.interface';

export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: Specification<T>): Specification<T>;
  or(other: Specification<T>): Specification<T>;
  not(other: Specification<T>): Specification<T>;
}

abstract class AbstractSpecification<T> implements Specification<T> {
  public abstract isSatisfiedBy(entity: T): boolean;

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification<T>(this);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification<T>(this, other);
  }
}

class AndSpecification<T> extends AbstractSpecification<T> {
  private one: Specification<T>;
  private other: Specification<T>;
  constructor(one: Specification<T>, other: Specification<T>) {
    super();
    this.one = one;
    this.other = other;
  }

  isSatisfiedBy = (entity: T): boolean => {
    return this.one.isSatisfiedBy(entity) && this.other.isSatisfiedBy(entity);
  }
}

class OrSpecification<T> extends AbstractSpecification<T> {
  private one: Specification<T>;
  private other: Specification<T>;
  constructor(one: Specification<T>, other: Specification<T>) {
    super();
    this.one = one;
    this.other = other;
  }

  isSatisfiedBy(entity: T): boolean {
    return this.one.isSatisfiedBy(entity) || this.other.isSatisfiedBy(entity);
  }
}

class NotSpecification<T> extends AbstractSpecification<T> {
  private wrapped: Specification<T>;
  constructor(wrapped: Specification<T>) {
    super();
    this.wrapped = wrapped;
  }

  isSatisfiedBy(entity: T): boolean {
    return !this.wrapped.isSatisfiedBy(entity);
  }
}

export class EmptySpecification extends AbstractSpecification<IEquipment> {
  isSatisfiedBy(entity: IEquipment): boolean {
    return true;
  }
}

export class NameSpecification extends AbstractSpecification<IEquipment> {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  isSatisfiedBy(entity: IEquipment): boolean {
    return entity.name.toLocaleLowerCase().includes(this.name.toLocaleLowerCase());
  }
}

export class IdSpecification extends AbstractSpecification<IEquipment> {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public isSatisfiedBy(entity: IEquipment): boolean {
    return entity.id.toString() === this.id.toString();
  }
}

export class PriceMinSpecification extends AbstractSpecification<
  IEquipment
  > {
  private price: number;
  private field: string;

  constructor(price: number, field: string) {
    super();
    this.price = price;
    this.field = field;
  }

  isSatisfiedBy(entity: IEquipment): boolean {
    return +entity[this.field] >= +this.price;
  }
}

export class PriceMaxSpecification extends AbstractSpecification<
  IEquipment
  > {
  private price: number;
  private field: string;

  constructor(price: number, field: string) {
    super();
    this.price = price;
    this.field = field;
  }

  isSatisfiedBy(entity: IEquipment): boolean {
    return entity[this.field] <= this.price;
  }
}
