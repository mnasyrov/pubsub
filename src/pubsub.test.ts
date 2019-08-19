import {Emitter} from './pubsub';

describe('class Emitter', () => {
  describe('.isSubscribed', () => {
    it('should return true in case there is a subscriber', () => {
      const emitter = new Emitter();
      emitter.subscribe(() => {});
      expect(emitter.isSubscribed).toBe(true);
    });

    it('should return false in case there is no subscribers', () => {
      const emitter = new Emitter();
      expect(emitter.isSubscribed).toBe(false);
    });

    it('should return false in case there were subscribers', () => {
      const emitter = new Emitter();

      const sub1 = emitter.subscribe(() => {});
      const sub2 = emitter.subscribe(() => {});
      sub1.unsubscribe();
      sub2.unsubscribe();
      expect(emitter.isSubscribed).toBe(false);
    });
  });

  describe('.size', () => {
    it('should return 1 in case there is a single subscriber', () => {
      const emitter = new Emitter();
      emitter.subscribe(() => {});
      expect(emitter.size).toBe(1);
    });

    it('should return 0 in case there is no subscribers', () => {
      const emitter = new Emitter();
      expect(emitter.size).toBe(0);
    });

    it('should return 0 in case there were subscribers', () => {
      const emitter = new Emitter();

      const sub1 = emitter.subscribe(() => {});
      const sub2 = emitter.subscribe(() => {});
      expect(emitter.size).toBe(2);

      sub1.unsubscribe();
      sub2.unsubscribe();
      expect(emitter.size).toBe(0);
    });
  });

  describe('.subscribe()', () => {
    it('should subscribe a consumer for future values', () => {
      const emitter = new Emitter<number>();

      let futureValue = 0;
      emitter.subscribe(value => (futureValue = value));
      emitter.emit(1);
      expect(futureValue).toBe(1);
    });

    it('should return a subscription object which can be used to unsubscribe a consumer', () => {
      const emitter = new Emitter<number>();

      let futureValue = 0;
      const sub1 = emitter.subscribe(value => (futureValue = value));
      sub1.unsubscribe();
      emitter.emit(1);
      expect(futureValue).toBe(0);
    });

    it('should return an empty subscription object in case a consumer is not defined', () => {
      const emitter = new Emitter<number>();

      const emptySub1 = emitter.subscribe(undefined as any);
      const emptySub2 = emitter.subscribe(null as any);
      expect(emptySub1).toBeDefined();
      expect(emptySub1).toBe(emptySub2);
      emptySub1.unsubscribe();
    });

    it('should return an empty subscription object in case a consumer is not defined', () => {
      const emitter = new Emitter<number>();

      const emptySub1 = emitter.subscribe(undefined as any);
      const emptySub2 = emitter.subscribe(null as any);
      expect(emptySub1).toBeDefined();
      expect(emptySub1).toBe(emptySub2);

      emptySub1.unsubscribe();
    });
  });

  describe('.emit()', () => {
    it('should emit a value to all subscribers', () => {
      const emitter = new Emitter<number>();

      let futureValue1 = 0;
      let futureValue2 = 0;
      emitter.subscribe(value => (futureValue1 = value));
      emitter.subscribe(value => (futureValue2 = value));
      emitter.emit(1);
      expect(futureValue1).toBe(1);
      expect(futureValue2).toBe(1);
    });

    it('should not fail in case there are no subscribers', () => {
      const emitter = new Emitter<number>();
      emitter.emit(1);
    });
  });

  describe('.dispose()', () => {
    it('should unsubscribe all subscribed consumers', () => {
      const emitter = new Emitter<number>();

      let futureValue1 = 0;
      let futureValue2 = 0;
      emitter.subscribe(value => (futureValue1 = value));
      emitter.subscribe(value => (futureValue2 = value));
      emitter.emit(1);

      emitter.dispose();
      emitter.emit(2);
      expect(emitter.isSubscribed).toBe(false);
      expect(emitter.size).toBe(0);
      expect(futureValue1).toBe(1);
      expect(futureValue2).toBe(1);
    });

    it('should not fail in case there are no subscribers', () => {
      const emitter = new Emitter<number>();
      emitter.dispose();
    });

    it('should allow to unsubscribe a disposed subscription', () => {
      const emitter = new Emitter();
      const sub1 = emitter.subscribe(() => {});
      emitter.dispose();
      sub1.unsubscribe();
    });
  });
});
