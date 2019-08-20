# Simple PubSub

_Simple PubSub for Typescript. Implements Publisher/Subscriber pattern. Provides a value emitter, subscription and consumer interface._

[![npm version](https://badge.fury.io/js/%40mnasyrov%2Fpubsub.svg)](https://www.npmjs.com/@mnasyrov/pubsub)
[![Actions Status](https://github.com/mnasyrov/pubsub/workflows/build/badge.svg)](https://github.com/mnasyrov/pubsub/actions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Usage

Install dependencies:

```bash
$ npm install --save @mnasyrov/pubsub
```

Use a value emitter:

```typescript
import {Emitter} from '@mnasyrov/pubsub';

// Declare a value emitter.
const emitter = new Emitter<number>();

// Subscribe by a listener.
const subscription = emitter.subscribe(value => {
  console.log(value);
});

// Emit a value.
emitter.emit(42);

// Cancel a subscription.
subscription.unsubscribe();
```

## Public API

```typescript
/** Allows to cancel a subscription. It is compatible with RxJS/Subscription. */
export interface Subscription {
  unsubscribe(): void;
}

export type Consumer<T> = (value: T) => any;

export interface Publisher<T> {
  subscribe(consumer: Consumer<T>): Subscription;
}

export interface Emitter<T> {
  constructor();

  /** Returns true in case there is a subscriber. */
  readonly isSubscribed: boolean;

  /** Returns a count of subscribers. */
  readonly size: number;

  /** Subscribes a consumer for future values. */
  subscribe(consumer: Consumer<T>): Subscription;

  /** Emits a value to all subscribers. */
  emit(value: T);

  /** Unsubscribes all subscribed consumers. */
  dispose();
}
```

## License

[MIT](LICENSE)
