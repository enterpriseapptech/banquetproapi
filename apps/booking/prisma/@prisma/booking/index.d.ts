
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model AvailableLocations
 * 
 */
export type AvailableLocations = $Result.DefaultSelection<Prisma.$AvailableLocationsPayload>
/**
 * Model TimeSlot
 * 
 */
export type TimeSlot = $Result.DefaultSelection<Prisma.$TimeSlotPayload>
/**
 * Model EventCenterBooking
 * 
 */
export type EventCenterBooking = $Result.DefaultSelection<Prisma.$EventCenterBookingPayload>
/**
 * Model CateringBooking
 * 
 */
export type CateringBooking = $Result.DefaultSelection<Prisma.$CateringBookingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LocationStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type LocationStatus = (typeof LocationStatus)[keyof typeof LocationStatus]


export const BookingSource: {
  WEB: 'WEB',
  MOBILE: 'MOBILE'
};

export type BookingSource = (typeof BookingSource)[keyof typeof BookingSource]


export const ServiceType: {
  CATERING: 'CATERING',
  EVENTCENTER: 'EVENTCENTER'
};

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]


export const BookingStatus: {
  PENDING: 'PENDING',
  BOOKED: 'BOOKED',
  RESERVED: 'RESERVED',
  POSTPONED: 'POSTPONED',
  CANCELED: 'CANCELED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  UNPAID: 'UNPAID',
  FULLY_PAID: 'FULLY_PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const SpecialRequirement: {
  WHEELCHAIRACCESS: 'WHEELCHAIRACCESS',
  TEMPERATUREADJUSTMENT: 'TEMPERATUREADJUSTMENT'
};

export type SpecialRequirement = (typeof SpecialRequirement)[keyof typeof SpecialRequirement]

}

export type LocationStatus = $Enums.LocationStatus

export const LocationStatus: typeof $Enums.LocationStatus

export type BookingSource = $Enums.BookingSource

export const BookingSource: typeof $Enums.BookingSource

export type ServiceType = $Enums.ServiceType

export const ServiceType: typeof $Enums.ServiceType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type SpecialRequirement = $Enums.SpecialRequirement

export const SpecialRequirement: typeof $Enums.SpecialRequirement

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bookings
 * const bookings = await prisma.booking.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bookings
   * const bookings = await prisma.booking.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.availableLocations`: Exposes CRUD operations for the **AvailableLocations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailableLocations
    * const availableLocations = await prisma.availableLocations.findMany()
    * ```
    */
  get availableLocations(): Prisma.AvailableLocationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeSlot`: Exposes CRUD operations for the **TimeSlot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeSlots
    * const timeSlots = await prisma.timeSlot.findMany()
    * ```
    */
  get timeSlot(): Prisma.TimeSlotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventCenterBooking`: Exposes CRUD operations for the **EventCenterBooking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventCenterBookings
    * const eventCenterBookings = await prisma.eventCenterBooking.findMany()
    * ```
    */
  get eventCenterBooking(): Prisma.EventCenterBookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cateringBooking`: Exposes CRUD operations for the **CateringBooking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CateringBookings
    * const cateringBookings = await prisma.cateringBooking.findMany()
    * ```
    */
  get cateringBooking(): Prisma.CateringBookingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Booking: 'Booking',
    AvailableLocations: 'AvailableLocations',
    TimeSlot: 'TimeSlot',
    EventCenterBooking: 'EventCenterBooking',
    CateringBooking: 'CateringBooking'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    banquestprobookingdb?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "booking" | "availableLocations" | "timeSlot" | "eventCenterBooking" | "cateringBooking"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      AvailableLocations: {
        payload: Prisma.$AvailableLocationsPayload<ExtArgs>
        fields: Prisma.AvailableLocationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailableLocationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailableLocationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>
          }
          findFirst: {
            args: Prisma.AvailableLocationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailableLocationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>
          }
          findMany: {
            args: Prisma.AvailableLocationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>[]
          }
          create: {
            args: Prisma.AvailableLocationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>
          }
          createMany: {
            args: Prisma.AvailableLocationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailableLocationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>[]
          }
          delete: {
            args: Prisma.AvailableLocationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>
          }
          update: {
            args: Prisma.AvailableLocationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>
          }
          deleteMany: {
            args: Prisma.AvailableLocationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailableLocationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailableLocationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>[]
          }
          upsert: {
            args: Prisma.AvailableLocationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableLocationsPayload>
          }
          aggregate: {
            args: Prisma.AvailableLocationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailableLocations>
          }
          groupBy: {
            args: Prisma.AvailableLocationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailableLocationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailableLocationsCountArgs<ExtArgs>
            result: $Utils.Optional<AvailableLocationsCountAggregateOutputType> | number
          }
        }
      }
      TimeSlot: {
        payload: Prisma.$TimeSlotPayload<ExtArgs>
        fields: Prisma.TimeSlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeSlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeSlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          findFirst: {
            args: Prisma.TimeSlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeSlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          findMany: {
            args: Prisma.TimeSlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          create: {
            args: Prisma.TimeSlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          createMany: {
            args: Prisma.TimeSlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeSlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          delete: {
            args: Prisma.TimeSlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          update: {
            args: Prisma.TimeSlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          deleteMany: {
            args: Prisma.TimeSlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeSlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeSlotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          upsert: {
            args: Prisma.TimeSlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          aggregate: {
            args: Prisma.TimeSlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeSlot>
          }
          groupBy: {
            args: Prisma.TimeSlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeSlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeSlotCountArgs<ExtArgs>
            result: $Utils.Optional<TimeSlotCountAggregateOutputType> | number
          }
        }
      }
      EventCenterBooking: {
        payload: Prisma.$EventCenterBookingPayload<ExtArgs>
        fields: Prisma.EventCenterBookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventCenterBookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventCenterBookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>
          }
          findFirst: {
            args: Prisma.EventCenterBookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventCenterBookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>
          }
          findMany: {
            args: Prisma.EventCenterBookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>[]
          }
          create: {
            args: Prisma.EventCenterBookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>
          }
          createMany: {
            args: Prisma.EventCenterBookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCenterBookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>[]
          }
          delete: {
            args: Prisma.EventCenterBookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>
          }
          update: {
            args: Prisma.EventCenterBookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>
          }
          deleteMany: {
            args: Prisma.EventCenterBookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventCenterBookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventCenterBookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>[]
          }
          upsert: {
            args: Prisma.EventCenterBookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterBookingPayload>
          }
          aggregate: {
            args: Prisma.EventCenterBookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventCenterBooking>
          }
          groupBy: {
            args: Prisma.EventCenterBookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventCenterBookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCenterBookingCountArgs<ExtArgs>
            result: $Utils.Optional<EventCenterBookingCountAggregateOutputType> | number
          }
        }
      }
      CateringBooking: {
        payload: Prisma.$CateringBookingPayload<ExtArgs>
        fields: Prisma.CateringBookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CateringBookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CateringBookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>
          }
          findFirst: {
            args: Prisma.CateringBookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CateringBookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>
          }
          findMany: {
            args: Prisma.CateringBookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>[]
          }
          create: {
            args: Prisma.CateringBookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>
          }
          createMany: {
            args: Prisma.CateringBookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CateringBookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>[]
          }
          delete: {
            args: Prisma.CateringBookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>
          }
          update: {
            args: Prisma.CateringBookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>
          }
          deleteMany: {
            args: Prisma.CateringBookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CateringBookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CateringBookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>[]
          }
          upsert: {
            args: Prisma.CateringBookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringBookingPayload>
          }
          aggregate: {
            args: Prisma.CateringBookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCateringBooking>
          }
          groupBy: {
            args: Prisma.CateringBookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CateringBookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.CateringBookingCountArgs<ExtArgs>
            result: $Utils.Optional<CateringBookingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    booking?: BookingOmit
    availableLocations?: AvailableLocationsOmit
    timeSlot?: TimeSlotOmit
    eventCenterBooking?: EventCenterBookingOmit
    cateringBooking?: CateringBookingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    timeslot: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeslot?: boolean | BookingCountOutputTypeCountTimeslotArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountTimeslotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeSlotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    totalBeforeDiscount: number | null
    discount: number | null
    totalAfterDiscount: number | null
  }

  export type BookingSumAggregateOutputType = {
    totalBeforeDiscount: number | null
    discount: number | null
    totalAfterDiscount: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    confirmedBy: string | null
    confirmedAt: Date | null
    servicebookingId: string | null
    serviceId: string | null
    serviceType: $Enums.ServiceType | null
    totalBeforeDiscount: number | null
    discount: number | null
    totalAfterDiscount: number | null
    paymentStatus: $Enums.PaymentStatus | null
    status: $Enums.BookingStatus | null
    isTermsAccepted: boolean | null
    isCancellationPolicyAccepted: boolean | null
    isLiabilityWaiverSigned: boolean | null
    bookingReference: string | null
    source: $Enums.BookingSource | null
    serviceNotes: string | null
    customerNotes: string | null
    rescheduledBy: string | null
    rescheduledAt: Date | null
    cancelledBy: string | null
    canceledAt: Date | null
    cancelationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    confirmedBy: string | null
    confirmedAt: Date | null
    servicebookingId: string | null
    serviceId: string | null
    serviceType: $Enums.ServiceType | null
    totalBeforeDiscount: number | null
    discount: number | null
    totalAfterDiscount: number | null
    paymentStatus: $Enums.PaymentStatus | null
    status: $Enums.BookingStatus | null
    isTermsAccepted: boolean | null
    isCancellationPolicyAccepted: boolean | null
    isLiabilityWaiverSigned: boolean | null
    bookingReference: string | null
    source: $Enums.BookingSource | null
    serviceNotes: string | null
    customerNotes: string | null
    rescheduledBy: string | null
    rescheduledAt: Date | null
    cancelledBy: string | null
    canceledAt: Date | null
    cancelationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    customerId: number
    confirmedBy: number
    confirmedAt: number
    servicebookingId: number
    serviceId: number
    serviceType: number
    totalBeforeDiscount: number
    discount: number
    totalAfterDiscount: number
    paymentStatus: number
    status: number
    bookingDates: number
    isTermsAccepted: number
    isCancellationPolicyAccepted: number
    isLiabilityWaiverSigned: number
    bookingReference: number
    source: number
    serviceNotes: number
    customerNotes: number
    rescheduledBy: number
    rescheduledAt: number
    previousDates: number
    cancelledBy: number
    canceledAt: number
    cancelationReason: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    totalBeforeDiscount?: true
    discount?: true
    totalAfterDiscount?: true
  }

  export type BookingSumAggregateInputType = {
    totalBeforeDiscount?: true
    discount?: true
    totalAfterDiscount?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    customerId?: true
    confirmedBy?: true
    confirmedAt?: true
    servicebookingId?: true
    serviceId?: true
    serviceType?: true
    totalBeforeDiscount?: true
    discount?: true
    totalAfterDiscount?: true
    paymentStatus?: true
    status?: true
    isTermsAccepted?: true
    isCancellationPolicyAccepted?: true
    isLiabilityWaiverSigned?: true
    bookingReference?: true
    source?: true
    serviceNotes?: true
    customerNotes?: true
    rescheduledBy?: true
    rescheduledAt?: true
    cancelledBy?: true
    canceledAt?: true
    cancelationReason?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    customerId?: true
    confirmedBy?: true
    confirmedAt?: true
    servicebookingId?: true
    serviceId?: true
    serviceType?: true
    totalBeforeDiscount?: true
    discount?: true
    totalAfterDiscount?: true
    paymentStatus?: true
    status?: true
    isTermsAccepted?: true
    isCancellationPolicyAccepted?: true
    isLiabilityWaiverSigned?: true
    bookingReference?: true
    source?: true
    serviceNotes?: true
    customerNotes?: true
    rescheduledBy?: true
    rescheduledAt?: true
    cancelledBy?: true
    canceledAt?: true
    cancelationReason?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    customerId?: true
    confirmedBy?: true
    confirmedAt?: true
    servicebookingId?: true
    serviceId?: true
    serviceType?: true
    totalBeforeDiscount?: true
    discount?: true
    totalAfterDiscount?: true
    paymentStatus?: true
    status?: true
    bookingDates?: true
    isTermsAccepted?: true
    isCancellationPolicyAccepted?: true
    isLiabilityWaiverSigned?: true
    bookingReference?: true
    source?: true
    serviceNotes?: true
    customerNotes?: true
    rescheduledBy?: true
    rescheduledAt?: true
    previousDates?: true
    cancelledBy?: true
    canceledAt?: true
    cancelationReason?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    customerId: string
    confirmedBy: string | null
    confirmedAt: Date | null
    servicebookingId: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates: string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes: string | null
    customerNotes: string | null
    rescheduledBy: string | null
    rescheduledAt: Date | null
    previousDates: string[]
    cancelledBy: string | null
    canceledAt: Date | null
    cancelationReason: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    deletedBy: string | null
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    confirmedBy?: boolean
    confirmedAt?: boolean
    servicebookingId?: boolean
    serviceId?: boolean
    serviceType?: boolean
    totalBeforeDiscount?: boolean
    discount?: boolean
    totalAfterDiscount?: boolean
    paymentStatus?: boolean
    status?: boolean
    bookingDates?: boolean
    isTermsAccepted?: boolean
    isCancellationPolicyAccepted?: boolean
    isLiabilityWaiverSigned?: boolean
    bookingReference?: boolean
    source?: boolean
    serviceNotes?: boolean
    customerNotes?: boolean
    rescheduledBy?: boolean
    rescheduledAt?: boolean
    previousDates?: boolean
    cancelledBy?: boolean
    canceledAt?: boolean
    cancelationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    eventCenterBooking?: boolean | Booking$eventCenterBookingArgs<ExtArgs>
    cateringBooking?: boolean | Booking$cateringBookingArgs<ExtArgs>
    timeslot?: boolean | Booking$timeslotArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    confirmedBy?: boolean
    confirmedAt?: boolean
    servicebookingId?: boolean
    serviceId?: boolean
    serviceType?: boolean
    totalBeforeDiscount?: boolean
    discount?: boolean
    totalAfterDiscount?: boolean
    paymentStatus?: boolean
    status?: boolean
    bookingDates?: boolean
    isTermsAccepted?: boolean
    isCancellationPolicyAccepted?: boolean
    isLiabilityWaiverSigned?: boolean
    bookingReference?: boolean
    source?: boolean
    serviceNotes?: boolean
    customerNotes?: boolean
    rescheduledBy?: boolean
    rescheduledAt?: boolean
    previousDates?: boolean
    cancelledBy?: boolean
    canceledAt?: boolean
    cancelationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    confirmedBy?: boolean
    confirmedAt?: boolean
    servicebookingId?: boolean
    serviceId?: boolean
    serviceType?: boolean
    totalBeforeDiscount?: boolean
    discount?: boolean
    totalAfterDiscount?: boolean
    paymentStatus?: boolean
    status?: boolean
    bookingDates?: boolean
    isTermsAccepted?: boolean
    isCancellationPolicyAccepted?: boolean
    isLiabilityWaiverSigned?: boolean
    bookingReference?: boolean
    source?: boolean
    serviceNotes?: boolean
    customerNotes?: boolean
    rescheduledBy?: boolean
    rescheduledAt?: boolean
    previousDates?: boolean
    cancelledBy?: boolean
    canceledAt?: boolean
    cancelationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    customerId?: boolean
    confirmedBy?: boolean
    confirmedAt?: boolean
    servicebookingId?: boolean
    serviceId?: boolean
    serviceType?: boolean
    totalBeforeDiscount?: boolean
    discount?: boolean
    totalAfterDiscount?: boolean
    paymentStatus?: boolean
    status?: boolean
    bookingDates?: boolean
    isTermsAccepted?: boolean
    isCancellationPolicyAccepted?: boolean
    isLiabilityWaiverSigned?: boolean
    bookingReference?: boolean
    source?: boolean
    serviceNotes?: boolean
    customerNotes?: boolean
    rescheduledBy?: boolean
    rescheduledAt?: boolean
    previousDates?: boolean
    cancelledBy?: boolean
    canceledAt?: boolean
    cancelationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "confirmedBy" | "confirmedAt" | "servicebookingId" | "serviceId" | "serviceType" | "totalBeforeDiscount" | "discount" | "totalAfterDiscount" | "paymentStatus" | "status" | "bookingDates" | "isTermsAccepted" | "isCancellationPolicyAccepted" | "isLiabilityWaiverSigned" | "bookingReference" | "source" | "serviceNotes" | "customerNotes" | "rescheduledBy" | "rescheduledAt" | "previousDates" | "cancelledBy" | "canceledAt" | "cancelationReason" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventCenterBooking?: boolean | Booking$eventCenterBookingArgs<ExtArgs>
    cateringBooking?: boolean | Booking$cateringBookingArgs<ExtArgs>
    timeslot?: boolean | Booking$timeslotArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      eventCenterBooking: Prisma.$EventCenterBookingPayload<ExtArgs> | null
      cateringBooking: Prisma.$CateringBookingPayload<ExtArgs> | null
      timeslot: Prisma.$TimeSlotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      confirmedBy: string | null
      confirmedAt: Date | null
      servicebookingId: string | null
      serviceId: string
      serviceType: $Enums.ServiceType
      totalBeforeDiscount: number
      discount: number | null
      totalAfterDiscount: number
      paymentStatus: $Enums.PaymentStatus
      status: $Enums.BookingStatus
      bookingDates: string[]
      isTermsAccepted: boolean
      isCancellationPolicyAccepted: boolean
      isLiabilityWaiverSigned: boolean
      bookingReference: string
      source: $Enums.BookingSource
      serviceNotes: string | null
      customerNotes: string | null
      rescheduledBy: string | null
      rescheduledAt: Date | null
      previousDates: string[]
      cancelledBy: string | null
      canceledAt: Date | null
      cancelationReason: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eventCenterBooking<T extends Booking$eventCenterBookingArgs<ExtArgs> = {}>(args?: Subset<T, Booking$eventCenterBookingArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    cateringBooking<T extends Booking$cateringBookingArgs<ExtArgs> = {}>(args?: Subset<T, Booking$cateringBookingArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    timeslot<T extends Booking$timeslotArgs<ExtArgs> = {}>(args?: Subset<T, Booking$timeslotArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly customerId: FieldRef<"Booking", 'String'>
    readonly confirmedBy: FieldRef<"Booking", 'String'>
    readonly confirmedAt: FieldRef<"Booking", 'DateTime'>
    readonly servicebookingId: FieldRef<"Booking", 'String'>
    readonly serviceId: FieldRef<"Booking", 'String'>
    readonly serviceType: FieldRef<"Booking", 'ServiceType'>
    readonly totalBeforeDiscount: FieldRef<"Booking", 'Float'>
    readonly discount: FieldRef<"Booking", 'Float'>
    readonly totalAfterDiscount: FieldRef<"Booking", 'Float'>
    readonly paymentStatus: FieldRef<"Booking", 'PaymentStatus'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly bookingDates: FieldRef<"Booking", 'String[]'>
    readonly isTermsAccepted: FieldRef<"Booking", 'Boolean'>
    readonly isCancellationPolicyAccepted: FieldRef<"Booking", 'Boolean'>
    readonly isLiabilityWaiverSigned: FieldRef<"Booking", 'Boolean'>
    readonly bookingReference: FieldRef<"Booking", 'String'>
    readonly source: FieldRef<"Booking", 'BookingSource'>
    readonly serviceNotes: FieldRef<"Booking", 'String'>
    readonly customerNotes: FieldRef<"Booking", 'String'>
    readonly rescheduledBy: FieldRef<"Booking", 'String'>
    readonly rescheduledAt: FieldRef<"Booking", 'DateTime'>
    readonly previousDates: FieldRef<"Booking", 'String[]'>
    readonly cancelledBy: FieldRef<"Booking", 'String'>
    readonly canceledAt: FieldRef<"Booking", 'DateTime'>
    readonly cancelationReason: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
    readonly deletedAt: FieldRef<"Booking", 'DateTime'>
    readonly deletedBy: FieldRef<"Booking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.eventCenterBooking
   */
  export type Booking$eventCenterBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    where?: EventCenterBookingWhereInput
  }

  /**
   * Booking.cateringBooking
   */
  export type Booking$cateringBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    where?: CateringBookingWhereInput
  }

  /**
   * Booking.timeslot
   */
  export type Booking$timeslotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    where?: TimeSlotWhereInput
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    cursor?: TimeSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model AvailableLocations
   */

  export type AggregateAvailableLocations = {
    _count: AvailableLocationsCountAggregateOutputType | null
    _min: AvailableLocationsMinAggregateOutputType | null
    _max: AvailableLocationsMaxAggregateOutputType | null
  }

  export type AvailableLocationsMinAggregateOutputType = {
    id: string | null
    country: string | null
    state: string | null
    city: string | null
    status: $Enums.LocationStatus | null
  }

  export type AvailableLocationsMaxAggregateOutputType = {
    id: string | null
    country: string | null
    state: string | null
    city: string | null
    status: $Enums.LocationStatus | null
  }

  export type AvailableLocationsCountAggregateOutputType = {
    id: number
    country: number
    state: number
    city: number
    status: number
    _all: number
  }


  export type AvailableLocationsMinAggregateInputType = {
    id?: true
    country?: true
    state?: true
    city?: true
    status?: true
  }

  export type AvailableLocationsMaxAggregateInputType = {
    id?: true
    country?: true
    state?: true
    city?: true
    status?: true
  }

  export type AvailableLocationsCountAggregateInputType = {
    id?: true
    country?: true
    state?: true
    city?: true
    status?: true
    _all?: true
  }

  export type AvailableLocationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailableLocations to aggregate.
     */
    where?: AvailableLocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableLocations to fetch.
     */
    orderBy?: AvailableLocationsOrderByWithRelationInput | AvailableLocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailableLocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailableLocations
    **/
    _count?: true | AvailableLocationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailableLocationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailableLocationsMaxAggregateInputType
  }

  export type GetAvailableLocationsAggregateType<T extends AvailableLocationsAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailableLocations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailableLocations[P]>
      : GetScalarType<T[P], AggregateAvailableLocations[P]>
  }




  export type AvailableLocationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailableLocationsWhereInput
    orderBy?: AvailableLocationsOrderByWithAggregationInput | AvailableLocationsOrderByWithAggregationInput[]
    by: AvailableLocationsScalarFieldEnum[] | AvailableLocationsScalarFieldEnum
    having?: AvailableLocationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailableLocationsCountAggregateInputType | true
    _min?: AvailableLocationsMinAggregateInputType
    _max?: AvailableLocationsMaxAggregateInputType
  }

  export type AvailableLocationsGroupByOutputType = {
    id: string
    country: string
    state: string
    city: string | null
    status: $Enums.LocationStatus
    _count: AvailableLocationsCountAggregateOutputType | null
    _min: AvailableLocationsMinAggregateOutputType | null
    _max: AvailableLocationsMaxAggregateOutputType | null
  }

  type GetAvailableLocationsGroupByPayload<T extends AvailableLocationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailableLocationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailableLocationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailableLocationsGroupByOutputType[P]>
            : GetScalarType<T[P], AvailableLocationsGroupByOutputType[P]>
        }
      >
    >


  export type AvailableLocationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    country?: boolean
    state?: boolean
    city?: boolean
    status?: boolean
  }, ExtArgs["result"]["availableLocations"]>

  export type AvailableLocationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    country?: boolean
    state?: boolean
    city?: boolean
    status?: boolean
  }, ExtArgs["result"]["availableLocations"]>

  export type AvailableLocationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    country?: boolean
    state?: boolean
    city?: boolean
    status?: boolean
  }, ExtArgs["result"]["availableLocations"]>

  export type AvailableLocationsSelectScalar = {
    id?: boolean
    country?: boolean
    state?: boolean
    city?: boolean
    status?: boolean
  }

  export type AvailableLocationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "country" | "state" | "city" | "status", ExtArgs["result"]["availableLocations"]>

  export type $AvailableLocationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailableLocations"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      country: string
      state: string
      city: string | null
      status: $Enums.LocationStatus
    }, ExtArgs["result"]["availableLocations"]>
    composites: {}
  }

  type AvailableLocationsGetPayload<S extends boolean | null | undefined | AvailableLocationsDefaultArgs> = $Result.GetResult<Prisma.$AvailableLocationsPayload, S>

  type AvailableLocationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailableLocationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailableLocationsCountAggregateInputType | true
    }

  export interface AvailableLocationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailableLocations'], meta: { name: 'AvailableLocations' } }
    /**
     * Find zero or one AvailableLocations that matches the filter.
     * @param {AvailableLocationsFindUniqueArgs} args - Arguments to find a AvailableLocations
     * @example
     * // Get one AvailableLocations
     * const availableLocations = await prisma.availableLocations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailableLocationsFindUniqueArgs>(args: SelectSubset<T, AvailableLocationsFindUniqueArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailableLocations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailableLocationsFindUniqueOrThrowArgs} args - Arguments to find a AvailableLocations
     * @example
     * // Get one AvailableLocations
     * const availableLocations = await prisma.availableLocations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailableLocationsFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailableLocationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailableLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsFindFirstArgs} args - Arguments to find a AvailableLocations
     * @example
     * // Get one AvailableLocations
     * const availableLocations = await prisma.availableLocations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailableLocationsFindFirstArgs>(args?: SelectSubset<T, AvailableLocationsFindFirstArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailableLocations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsFindFirstOrThrowArgs} args - Arguments to find a AvailableLocations
     * @example
     * // Get one AvailableLocations
     * const availableLocations = await prisma.availableLocations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailableLocationsFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailableLocationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailableLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailableLocations
     * const availableLocations = await prisma.availableLocations.findMany()
     * 
     * // Get first 10 AvailableLocations
     * const availableLocations = await prisma.availableLocations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availableLocationsWithIdOnly = await prisma.availableLocations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailableLocationsFindManyArgs>(args?: SelectSubset<T, AvailableLocationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailableLocations.
     * @param {AvailableLocationsCreateArgs} args - Arguments to create a AvailableLocations.
     * @example
     * // Create one AvailableLocations
     * const AvailableLocations = await prisma.availableLocations.create({
     *   data: {
     *     // ... data to create a AvailableLocations
     *   }
     * })
     * 
     */
    create<T extends AvailableLocationsCreateArgs>(args: SelectSubset<T, AvailableLocationsCreateArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailableLocations.
     * @param {AvailableLocationsCreateManyArgs} args - Arguments to create many AvailableLocations.
     * @example
     * // Create many AvailableLocations
     * const availableLocations = await prisma.availableLocations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailableLocationsCreateManyArgs>(args?: SelectSubset<T, AvailableLocationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailableLocations and returns the data saved in the database.
     * @param {AvailableLocationsCreateManyAndReturnArgs} args - Arguments to create many AvailableLocations.
     * @example
     * // Create many AvailableLocations
     * const availableLocations = await prisma.availableLocations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailableLocations and only return the `id`
     * const availableLocationsWithIdOnly = await prisma.availableLocations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailableLocationsCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailableLocationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailableLocations.
     * @param {AvailableLocationsDeleteArgs} args - Arguments to delete one AvailableLocations.
     * @example
     * // Delete one AvailableLocations
     * const AvailableLocations = await prisma.availableLocations.delete({
     *   where: {
     *     // ... filter to delete one AvailableLocations
     *   }
     * })
     * 
     */
    delete<T extends AvailableLocationsDeleteArgs>(args: SelectSubset<T, AvailableLocationsDeleteArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailableLocations.
     * @param {AvailableLocationsUpdateArgs} args - Arguments to update one AvailableLocations.
     * @example
     * // Update one AvailableLocations
     * const availableLocations = await prisma.availableLocations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailableLocationsUpdateArgs>(args: SelectSubset<T, AvailableLocationsUpdateArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailableLocations.
     * @param {AvailableLocationsDeleteManyArgs} args - Arguments to filter AvailableLocations to delete.
     * @example
     * // Delete a few AvailableLocations
     * const { count } = await prisma.availableLocations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailableLocationsDeleteManyArgs>(args?: SelectSubset<T, AvailableLocationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailableLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailableLocations
     * const availableLocations = await prisma.availableLocations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailableLocationsUpdateManyArgs>(args: SelectSubset<T, AvailableLocationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailableLocations and returns the data updated in the database.
     * @param {AvailableLocationsUpdateManyAndReturnArgs} args - Arguments to update many AvailableLocations.
     * @example
     * // Update many AvailableLocations
     * const availableLocations = await prisma.availableLocations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailableLocations and only return the `id`
     * const availableLocationsWithIdOnly = await prisma.availableLocations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvailableLocationsUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailableLocationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailableLocations.
     * @param {AvailableLocationsUpsertArgs} args - Arguments to update or create a AvailableLocations.
     * @example
     * // Update or create a AvailableLocations
     * const availableLocations = await prisma.availableLocations.upsert({
     *   create: {
     *     // ... data to create a AvailableLocations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailableLocations we want to update
     *   }
     * })
     */
    upsert<T extends AvailableLocationsUpsertArgs>(args: SelectSubset<T, AvailableLocationsUpsertArgs<ExtArgs>>): Prisma__AvailableLocationsClient<$Result.GetResult<Prisma.$AvailableLocationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailableLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsCountArgs} args - Arguments to filter AvailableLocations to count.
     * @example
     * // Count the number of AvailableLocations
     * const count = await prisma.availableLocations.count({
     *   where: {
     *     // ... the filter for the AvailableLocations we want to count
     *   }
     * })
    **/
    count<T extends AvailableLocationsCountArgs>(
      args?: Subset<T, AvailableLocationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailableLocationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailableLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvailableLocationsAggregateArgs>(args: Subset<T, AvailableLocationsAggregateArgs>): Prisma.PrismaPromise<GetAvailableLocationsAggregateType<T>>

    /**
     * Group by AvailableLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableLocationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvailableLocationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailableLocationsGroupByArgs['orderBy'] }
        : { orderBy?: AvailableLocationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvailableLocationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailableLocationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailableLocations model
   */
  readonly fields: AvailableLocationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailableLocations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailableLocationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvailableLocations model
   */
  interface AvailableLocationsFieldRefs {
    readonly id: FieldRef<"AvailableLocations", 'String'>
    readonly country: FieldRef<"AvailableLocations", 'String'>
    readonly state: FieldRef<"AvailableLocations", 'String'>
    readonly city: FieldRef<"AvailableLocations", 'String'>
    readonly status: FieldRef<"AvailableLocations", 'LocationStatus'>
  }
    

  // Custom InputTypes
  /**
   * AvailableLocations findUnique
   */
  export type AvailableLocationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * Filter, which AvailableLocations to fetch.
     */
    where: AvailableLocationsWhereUniqueInput
  }

  /**
   * AvailableLocations findUniqueOrThrow
   */
  export type AvailableLocationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * Filter, which AvailableLocations to fetch.
     */
    where: AvailableLocationsWhereUniqueInput
  }

  /**
   * AvailableLocations findFirst
   */
  export type AvailableLocationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * Filter, which AvailableLocations to fetch.
     */
    where?: AvailableLocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableLocations to fetch.
     */
    orderBy?: AvailableLocationsOrderByWithRelationInput | AvailableLocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailableLocations.
     */
    cursor?: AvailableLocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailableLocations.
     */
    distinct?: AvailableLocationsScalarFieldEnum | AvailableLocationsScalarFieldEnum[]
  }

  /**
   * AvailableLocations findFirstOrThrow
   */
  export type AvailableLocationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * Filter, which AvailableLocations to fetch.
     */
    where?: AvailableLocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableLocations to fetch.
     */
    orderBy?: AvailableLocationsOrderByWithRelationInput | AvailableLocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailableLocations.
     */
    cursor?: AvailableLocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailableLocations.
     */
    distinct?: AvailableLocationsScalarFieldEnum | AvailableLocationsScalarFieldEnum[]
  }

  /**
   * AvailableLocations findMany
   */
  export type AvailableLocationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * Filter, which AvailableLocations to fetch.
     */
    where?: AvailableLocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableLocations to fetch.
     */
    orderBy?: AvailableLocationsOrderByWithRelationInput | AvailableLocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailableLocations.
     */
    cursor?: AvailableLocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableLocations.
     */
    skip?: number
    distinct?: AvailableLocationsScalarFieldEnum | AvailableLocationsScalarFieldEnum[]
  }

  /**
   * AvailableLocations create
   */
  export type AvailableLocationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * The data needed to create a AvailableLocations.
     */
    data: XOR<AvailableLocationsCreateInput, AvailableLocationsUncheckedCreateInput>
  }

  /**
   * AvailableLocations createMany
   */
  export type AvailableLocationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailableLocations.
     */
    data: AvailableLocationsCreateManyInput | AvailableLocationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailableLocations createManyAndReturn
   */
  export type AvailableLocationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * The data used to create many AvailableLocations.
     */
    data: AvailableLocationsCreateManyInput | AvailableLocationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailableLocations update
   */
  export type AvailableLocationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * The data needed to update a AvailableLocations.
     */
    data: XOR<AvailableLocationsUpdateInput, AvailableLocationsUncheckedUpdateInput>
    /**
     * Choose, which AvailableLocations to update.
     */
    where: AvailableLocationsWhereUniqueInput
  }

  /**
   * AvailableLocations updateMany
   */
  export type AvailableLocationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailableLocations.
     */
    data: XOR<AvailableLocationsUpdateManyMutationInput, AvailableLocationsUncheckedUpdateManyInput>
    /**
     * Filter which AvailableLocations to update
     */
    where?: AvailableLocationsWhereInput
    /**
     * Limit how many AvailableLocations to update.
     */
    limit?: number
  }

  /**
   * AvailableLocations updateManyAndReturn
   */
  export type AvailableLocationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * The data used to update AvailableLocations.
     */
    data: XOR<AvailableLocationsUpdateManyMutationInput, AvailableLocationsUncheckedUpdateManyInput>
    /**
     * Filter which AvailableLocations to update
     */
    where?: AvailableLocationsWhereInput
    /**
     * Limit how many AvailableLocations to update.
     */
    limit?: number
  }

  /**
   * AvailableLocations upsert
   */
  export type AvailableLocationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * The filter to search for the AvailableLocations to update in case it exists.
     */
    where: AvailableLocationsWhereUniqueInput
    /**
     * In case the AvailableLocations found by the `where` argument doesn't exist, create a new AvailableLocations with this data.
     */
    create: XOR<AvailableLocationsCreateInput, AvailableLocationsUncheckedCreateInput>
    /**
     * In case the AvailableLocations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailableLocationsUpdateInput, AvailableLocationsUncheckedUpdateInput>
  }

  /**
   * AvailableLocations delete
   */
  export type AvailableLocationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
    /**
     * Filter which AvailableLocations to delete.
     */
    where: AvailableLocationsWhereUniqueInput
  }

  /**
   * AvailableLocations deleteMany
   */
  export type AvailableLocationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailableLocations to delete
     */
    where?: AvailableLocationsWhereInput
    /**
     * Limit how many AvailableLocations to delete.
     */
    limit?: number
  }

  /**
   * AvailableLocations without action
   */
  export type AvailableLocationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableLocations
     */
    select?: AvailableLocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableLocations
     */
    omit?: AvailableLocationsOmit<ExtArgs> | null
  }


  /**
   * Model TimeSlot
   */

  export type AggregateTimeSlot = {
    _count: TimeSlotCountAggregateOutputType | null
    _min: TimeSlotMinAggregateOutputType | null
    _max: TimeSlotMaxAggregateOutputType | null
  }

  export type TimeSlotMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    serviceType: $Enums.ServiceType | null
    bookingId: string | null
    startTime: Date | null
    endTime: Date | null
    isAvailable: boolean | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type TimeSlotMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    serviceType: $Enums.ServiceType | null
    bookingId: string | null
    startTime: Date | null
    endTime: Date | null
    isAvailable: boolean | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type TimeSlotCountAggregateOutputType = {
    id: number
    serviceId: number
    serviceType: number
    bookingId: number
    startTime: number
    endTime: number
    isAvailable: number
    previousBookings: number
    createdBy: number
    createdAt: number
    updatedAt: number
    updatedBy: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type TimeSlotMinAggregateInputType = {
    id?: true
    serviceId?: true
    serviceType?: true
    bookingId?: true
    startTime?: true
    endTime?: true
    isAvailable?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type TimeSlotMaxAggregateInputType = {
    id?: true
    serviceId?: true
    serviceType?: true
    bookingId?: true
    startTime?: true
    endTime?: true
    isAvailable?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type TimeSlotCountAggregateInputType = {
    id?: true
    serviceId?: true
    serviceType?: true
    bookingId?: true
    startTime?: true
    endTime?: true
    isAvailable?: true
    previousBookings?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type TimeSlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeSlot to aggregate.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeSlots
    **/
    _count?: true | TimeSlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeSlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeSlotMaxAggregateInputType
  }

  export type GetTimeSlotAggregateType<T extends TimeSlotAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeSlot[P]>
      : GetScalarType<T[P], AggregateTimeSlot[P]>
  }




  export type TimeSlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeSlotWhereInput
    orderBy?: TimeSlotOrderByWithAggregationInput | TimeSlotOrderByWithAggregationInput[]
    by: TimeSlotScalarFieldEnum[] | TimeSlotScalarFieldEnum
    having?: TimeSlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeSlotCountAggregateInputType | true
    _min?: TimeSlotMinAggregateInputType
    _max?: TimeSlotMaxAggregateInputType
  }

  export type TimeSlotGroupByOutputType = {
    id: string
    serviceId: string
    serviceType: $Enums.ServiceType
    bookingId: string | null
    startTime: Date
    endTime: Date
    isAvailable: boolean
    previousBookings: string[]
    createdBy: string
    createdAt: Date
    updatedAt: Date
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    _count: TimeSlotCountAggregateOutputType | null
    _min: TimeSlotMinAggregateOutputType | null
    _max: TimeSlotMaxAggregateOutputType | null
  }

  type GetTimeSlotGroupByPayload<T extends TimeSlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeSlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeSlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeSlotGroupByOutputType[P]>
            : GetScalarType<T[P], TimeSlotGroupByOutputType[P]>
        }
      >
    >


  export type TimeSlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    serviceType?: boolean
    bookingId?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    previousBookings?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | TimeSlot$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    serviceType?: boolean
    bookingId?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    previousBookings?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | TimeSlot$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    serviceType?: boolean
    bookingId?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    previousBookings?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | TimeSlot$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectScalar = {
    id?: boolean
    serviceId?: boolean
    serviceType?: boolean
    bookingId?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    previousBookings?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type TimeSlotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceId" | "serviceType" | "bookingId" | "startTime" | "endTime" | "isAvailable" | "previousBookings" | "createdBy" | "createdAt" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy", ExtArgs["result"]["timeSlot"]>
  export type TimeSlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | TimeSlot$bookingArgs<ExtArgs>
  }
  export type TimeSlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | TimeSlot$bookingArgs<ExtArgs>
  }
  export type TimeSlotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | TimeSlot$bookingArgs<ExtArgs>
  }

  export type $TimeSlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeSlot"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      serviceType: $Enums.ServiceType
      bookingId: string | null
      startTime: Date
      endTime: Date
      isAvailable: boolean
      previousBookings: string[]
      createdBy: string
      createdAt: Date
      updatedAt: Date
      updatedBy: string | null
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["timeSlot"]>
    composites: {}
  }

  type TimeSlotGetPayload<S extends boolean | null | undefined | TimeSlotDefaultArgs> = $Result.GetResult<Prisma.$TimeSlotPayload, S>

  type TimeSlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeSlotCountAggregateInputType | true
    }

  export interface TimeSlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeSlot'], meta: { name: 'TimeSlot' } }
    /**
     * Find zero or one TimeSlot that matches the filter.
     * @param {TimeSlotFindUniqueArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeSlotFindUniqueArgs>(args: SelectSubset<T, TimeSlotFindUniqueArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeSlot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeSlotFindUniqueOrThrowArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeSlotFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindFirstArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeSlotFindFirstArgs>(args?: SelectSubset<T, TimeSlotFindFirstArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindFirstOrThrowArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeSlotFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeSlots
     * const timeSlots = await prisma.timeSlot.findMany()
     * 
     * // Get first 10 TimeSlots
     * const timeSlots = await prisma.timeSlot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeSlotFindManyArgs>(args?: SelectSubset<T, TimeSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeSlot.
     * @param {TimeSlotCreateArgs} args - Arguments to create a TimeSlot.
     * @example
     * // Create one TimeSlot
     * const TimeSlot = await prisma.timeSlot.create({
     *   data: {
     *     // ... data to create a TimeSlot
     *   }
     * })
     * 
     */
    create<T extends TimeSlotCreateArgs>(args: SelectSubset<T, TimeSlotCreateArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeSlots.
     * @param {TimeSlotCreateManyArgs} args - Arguments to create many TimeSlots.
     * @example
     * // Create many TimeSlots
     * const timeSlot = await prisma.timeSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeSlotCreateManyArgs>(args?: SelectSubset<T, TimeSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeSlots and returns the data saved in the database.
     * @param {TimeSlotCreateManyAndReturnArgs} args - Arguments to create many TimeSlots.
     * @example
     * // Create many TimeSlots
     * const timeSlot = await prisma.timeSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeSlots and only return the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeSlotCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimeSlot.
     * @param {TimeSlotDeleteArgs} args - Arguments to delete one TimeSlot.
     * @example
     * // Delete one TimeSlot
     * const TimeSlot = await prisma.timeSlot.delete({
     *   where: {
     *     // ... filter to delete one TimeSlot
     *   }
     * })
     * 
     */
    delete<T extends TimeSlotDeleteArgs>(args: SelectSubset<T, TimeSlotDeleteArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeSlot.
     * @param {TimeSlotUpdateArgs} args - Arguments to update one TimeSlot.
     * @example
     * // Update one TimeSlot
     * const timeSlot = await prisma.timeSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeSlotUpdateArgs>(args: SelectSubset<T, TimeSlotUpdateArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeSlots.
     * @param {TimeSlotDeleteManyArgs} args - Arguments to filter TimeSlots to delete.
     * @example
     * // Delete a few TimeSlots
     * const { count } = await prisma.timeSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeSlotDeleteManyArgs>(args?: SelectSubset<T, TimeSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeSlots
     * const timeSlot = await prisma.timeSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeSlotUpdateManyArgs>(args: SelectSubset<T, TimeSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeSlots and returns the data updated in the database.
     * @param {TimeSlotUpdateManyAndReturnArgs} args - Arguments to update many TimeSlots.
     * @example
     * // Update many TimeSlots
     * const timeSlot = await prisma.timeSlot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimeSlots and only return the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeSlotUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimeSlot.
     * @param {TimeSlotUpsertArgs} args - Arguments to update or create a TimeSlot.
     * @example
     * // Update or create a TimeSlot
     * const timeSlot = await prisma.timeSlot.upsert({
     *   create: {
     *     // ... data to create a TimeSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeSlot we want to update
     *   }
     * })
     */
    upsert<T extends TimeSlotUpsertArgs>(args: SelectSubset<T, TimeSlotUpsertArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotCountArgs} args - Arguments to filter TimeSlots to count.
     * @example
     * // Count the number of TimeSlots
     * const count = await prisma.timeSlot.count({
     *   where: {
     *     // ... the filter for the TimeSlots we want to count
     *   }
     * })
    **/
    count<T extends TimeSlotCountArgs>(
      args?: Subset<T, TimeSlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeSlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeSlotAggregateArgs>(args: Subset<T, TimeSlotAggregateArgs>): Prisma.PrismaPromise<GetTimeSlotAggregateType<T>>

    /**
     * Group by TimeSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeSlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeSlotGroupByArgs['orderBy'] }
        : { orderBy?: TimeSlotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeSlot model
   */
  readonly fields: TimeSlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeSlot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeSlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends TimeSlot$bookingArgs<ExtArgs> = {}>(args?: Subset<T, TimeSlot$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeSlot model
   */
  interface TimeSlotFieldRefs {
    readonly id: FieldRef<"TimeSlot", 'String'>
    readonly serviceId: FieldRef<"TimeSlot", 'String'>
    readonly serviceType: FieldRef<"TimeSlot", 'ServiceType'>
    readonly bookingId: FieldRef<"TimeSlot", 'String'>
    readonly startTime: FieldRef<"TimeSlot", 'DateTime'>
    readonly endTime: FieldRef<"TimeSlot", 'DateTime'>
    readonly isAvailable: FieldRef<"TimeSlot", 'Boolean'>
    readonly previousBookings: FieldRef<"TimeSlot", 'String[]'>
    readonly createdBy: FieldRef<"TimeSlot", 'String'>
    readonly createdAt: FieldRef<"TimeSlot", 'DateTime'>
    readonly updatedAt: FieldRef<"TimeSlot", 'DateTime'>
    readonly updatedBy: FieldRef<"TimeSlot", 'String'>
    readonly deletedAt: FieldRef<"TimeSlot", 'DateTime'>
    readonly deletedBy: FieldRef<"TimeSlot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimeSlot findUnique
   */
  export type TimeSlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot findUniqueOrThrow
   */
  export type TimeSlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot findFirst
   */
  export type TimeSlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeSlots.
     */
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot findFirstOrThrow
   */
  export type TimeSlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeSlots.
     */
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot findMany
   */
  export type TimeSlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlots to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot create
   */
  export type TimeSlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeSlot.
     */
    data: XOR<TimeSlotCreateInput, TimeSlotUncheckedCreateInput>
  }

  /**
   * TimeSlot createMany
   */
  export type TimeSlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeSlots.
     */
    data: TimeSlotCreateManyInput | TimeSlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeSlot createManyAndReturn
   */
  export type TimeSlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * The data used to create many TimeSlots.
     */
    data: TimeSlotCreateManyInput | TimeSlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeSlot update
   */
  export type TimeSlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeSlot.
     */
    data: XOR<TimeSlotUpdateInput, TimeSlotUncheckedUpdateInput>
    /**
     * Choose, which TimeSlot to update.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot updateMany
   */
  export type TimeSlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeSlots.
     */
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyInput>
    /**
     * Filter which TimeSlots to update
     */
    where?: TimeSlotWhereInput
    /**
     * Limit how many TimeSlots to update.
     */
    limit?: number
  }

  /**
   * TimeSlot updateManyAndReturn
   */
  export type TimeSlotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * The data used to update TimeSlots.
     */
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyInput>
    /**
     * Filter which TimeSlots to update
     */
    where?: TimeSlotWhereInput
    /**
     * Limit how many TimeSlots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeSlot upsert
   */
  export type TimeSlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeSlot to update in case it exists.
     */
    where: TimeSlotWhereUniqueInput
    /**
     * In case the TimeSlot found by the `where` argument doesn't exist, create a new TimeSlot with this data.
     */
    create: XOR<TimeSlotCreateInput, TimeSlotUncheckedCreateInput>
    /**
     * In case the TimeSlot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeSlotUpdateInput, TimeSlotUncheckedUpdateInput>
  }

  /**
   * TimeSlot delete
   */
  export type TimeSlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter which TimeSlot to delete.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot deleteMany
   */
  export type TimeSlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeSlots to delete
     */
    where?: TimeSlotWhereInput
    /**
     * Limit how many TimeSlots to delete.
     */
    limit?: number
  }

  /**
   * TimeSlot.booking
   */
  export type TimeSlot$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * TimeSlot without action
   */
  export type TimeSlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
  }


  /**
   * Model EventCenterBooking
   */

  export type AggregateEventCenterBooking = {
    _count: EventCenterBookingCountAggregateOutputType | null
    _avg: EventCenterBookingAvgAggregateOutputType | null
    _sum: EventCenterBookingSumAggregateOutputType | null
    _min: EventCenterBookingMinAggregateOutputType | null
    _max: EventCenterBookingMaxAggregateOutputType | null
  }

  export type EventCenterBookingAvgAggregateOutputType = {
    noOfGuest: number | null
  }

  export type EventCenterBookingSumAggregateOutputType = {
    noOfGuest: number | null
  }

  export type EventCenterBookingMinAggregateOutputType = {
    id: string | null
    eventcenterId: string | null
    bookingId: string | null
    eventName: string | null
    eventTheme: string | null
    eventType: string | null
    description: string | null
    noOfGuest: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type EventCenterBookingMaxAggregateOutputType = {
    id: string | null
    eventcenterId: string | null
    bookingId: string | null
    eventName: string | null
    eventTheme: string | null
    eventType: string | null
    description: string | null
    noOfGuest: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type EventCenterBookingCountAggregateOutputType = {
    id: number
    eventcenterId: number
    bookingId: number
    eventName: number
    eventTheme: number
    eventType: number
    description: number
    noOfGuest: number
    specialRequirements: number
    images: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type EventCenterBookingAvgAggregateInputType = {
    noOfGuest?: true
  }

  export type EventCenterBookingSumAggregateInputType = {
    noOfGuest?: true
  }

  export type EventCenterBookingMinAggregateInputType = {
    id?: true
    eventcenterId?: true
    bookingId?: true
    eventName?: true
    eventTheme?: true
    eventType?: true
    description?: true
    noOfGuest?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type EventCenterBookingMaxAggregateInputType = {
    id?: true
    eventcenterId?: true
    bookingId?: true
    eventName?: true
    eventTheme?: true
    eventType?: true
    description?: true
    noOfGuest?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type EventCenterBookingCountAggregateInputType = {
    id?: true
    eventcenterId?: true
    bookingId?: true
    eventName?: true
    eventTheme?: true
    eventType?: true
    description?: true
    noOfGuest?: true
    specialRequirements?: true
    images?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type EventCenterBookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventCenterBooking to aggregate.
     */
    where?: EventCenterBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenterBookings to fetch.
     */
    orderBy?: EventCenterBookingOrderByWithRelationInput | EventCenterBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventCenterBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenterBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenterBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventCenterBookings
    **/
    _count?: true | EventCenterBookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventCenterBookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventCenterBookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventCenterBookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventCenterBookingMaxAggregateInputType
  }

  export type GetEventCenterBookingAggregateType<T extends EventCenterBookingAggregateArgs> = {
        [P in keyof T & keyof AggregateEventCenterBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventCenterBooking[P]>
      : GetScalarType<T[P], AggregateEventCenterBooking[P]>
  }




  export type EventCenterBookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventCenterBookingWhereInput
    orderBy?: EventCenterBookingOrderByWithAggregationInput | EventCenterBookingOrderByWithAggregationInput[]
    by: EventCenterBookingScalarFieldEnum[] | EventCenterBookingScalarFieldEnum
    having?: EventCenterBookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCenterBookingCountAggregateInputType | true
    _avg?: EventCenterBookingAvgAggregateInputType
    _sum?: EventCenterBookingSumAggregateInputType
    _min?: EventCenterBookingMinAggregateInputType
    _max?: EventCenterBookingMaxAggregateInputType
  }

  export type EventCenterBookingGroupByOutputType = {
    id: string
    eventcenterId: string
    bookingId: string
    eventName: string | null
    eventTheme: string | null
    eventType: string | null
    description: string | null
    noOfGuest: number | null
    specialRequirements: $Enums.SpecialRequirement[]
    images: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    deletedBy: string | null
    _count: EventCenterBookingCountAggregateOutputType | null
    _avg: EventCenterBookingAvgAggregateOutputType | null
    _sum: EventCenterBookingSumAggregateOutputType | null
    _min: EventCenterBookingMinAggregateOutputType | null
    _max: EventCenterBookingMaxAggregateOutputType | null
  }

  type GetEventCenterBookingGroupByPayload<T extends EventCenterBookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventCenterBookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventCenterBookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventCenterBookingGroupByOutputType[P]>
            : GetScalarType<T[P], EventCenterBookingGroupByOutputType[P]>
        }
      >
    >


  export type EventCenterBookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventcenterId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventTheme?: boolean
    eventType?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventCenterBooking"]>

  export type EventCenterBookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventcenterId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventTheme?: boolean
    eventType?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventCenterBooking"]>

  export type EventCenterBookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventcenterId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventTheme?: boolean
    eventType?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventCenterBooking"]>

  export type EventCenterBookingSelectScalar = {
    id?: boolean
    eventcenterId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventTheme?: boolean
    eventType?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type EventCenterBookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventcenterId" | "bookingId" | "eventName" | "eventTheme" | "eventType" | "description" | "noOfGuest" | "specialRequirements" | "images" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy", ExtArgs["result"]["eventCenterBooking"]>
  export type EventCenterBookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type EventCenterBookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type EventCenterBookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $EventCenterBookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventCenterBooking"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventcenterId: string
      bookingId: string
      eventName: string | null
      eventTheme: string | null
      eventType: string | null
      description: string | null
      noOfGuest: number | null
      specialRequirements: $Enums.SpecialRequirement[]
      images: string[]
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["eventCenterBooking"]>
    composites: {}
  }

  type EventCenterBookingGetPayload<S extends boolean | null | undefined | EventCenterBookingDefaultArgs> = $Result.GetResult<Prisma.$EventCenterBookingPayload, S>

  type EventCenterBookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventCenterBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCenterBookingCountAggregateInputType | true
    }

  export interface EventCenterBookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventCenterBooking'], meta: { name: 'EventCenterBooking' } }
    /**
     * Find zero or one EventCenterBooking that matches the filter.
     * @param {EventCenterBookingFindUniqueArgs} args - Arguments to find a EventCenterBooking
     * @example
     * // Get one EventCenterBooking
     * const eventCenterBooking = await prisma.eventCenterBooking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventCenterBookingFindUniqueArgs>(args: SelectSubset<T, EventCenterBookingFindUniqueArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventCenterBooking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventCenterBookingFindUniqueOrThrowArgs} args - Arguments to find a EventCenterBooking
     * @example
     * // Get one EventCenterBooking
     * const eventCenterBooking = await prisma.eventCenterBooking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventCenterBookingFindUniqueOrThrowArgs>(args: SelectSubset<T, EventCenterBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCenterBooking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingFindFirstArgs} args - Arguments to find a EventCenterBooking
     * @example
     * // Get one EventCenterBooking
     * const eventCenterBooking = await prisma.eventCenterBooking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventCenterBookingFindFirstArgs>(args?: SelectSubset<T, EventCenterBookingFindFirstArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCenterBooking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingFindFirstOrThrowArgs} args - Arguments to find a EventCenterBooking
     * @example
     * // Get one EventCenterBooking
     * const eventCenterBooking = await prisma.eventCenterBooking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventCenterBookingFindFirstOrThrowArgs>(args?: SelectSubset<T, EventCenterBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventCenterBookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventCenterBookings
     * const eventCenterBookings = await prisma.eventCenterBooking.findMany()
     * 
     * // Get first 10 EventCenterBookings
     * const eventCenterBookings = await prisma.eventCenterBooking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventCenterBookingWithIdOnly = await prisma.eventCenterBooking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventCenterBookingFindManyArgs>(args?: SelectSubset<T, EventCenterBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventCenterBooking.
     * @param {EventCenterBookingCreateArgs} args - Arguments to create a EventCenterBooking.
     * @example
     * // Create one EventCenterBooking
     * const EventCenterBooking = await prisma.eventCenterBooking.create({
     *   data: {
     *     // ... data to create a EventCenterBooking
     *   }
     * })
     * 
     */
    create<T extends EventCenterBookingCreateArgs>(args: SelectSubset<T, EventCenterBookingCreateArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventCenterBookings.
     * @param {EventCenterBookingCreateManyArgs} args - Arguments to create many EventCenterBookings.
     * @example
     * // Create many EventCenterBookings
     * const eventCenterBooking = await prisma.eventCenterBooking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCenterBookingCreateManyArgs>(args?: SelectSubset<T, EventCenterBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventCenterBookings and returns the data saved in the database.
     * @param {EventCenterBookingCreateManyAndReturnArgs} args - Arguments to create many EventCenterBookings.
     * @example
     * // Create many EventCenterBookings
     * const eventCenterBooking = await prisma.eventCenterBooking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventCenterBookings and only return the `id`
     * const eventCenterBookingWithIdOnly = await prisma.eventCenterBooking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCenterBookingCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCenterBookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventCenterBooking.
     * @param {EventCenterBookingDeleteArgs} args - Arguments to delete one EventCenterBooking.
     * @example
     * // Delete one EventCenterBooking
     * const EventCenterBooking = await prisma.eventCenterBooking.delete({
     *   where: {
     *     // ... filter to delete one EventCenterBooking
     *   }
     * })
     * 
     */
    delete<T extends EventCenterBookingDeleteArgs>(args: SelectSubset<T, EventCenterBookingDeleteArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventCenterBooking.
     * @param {EventCenterBookingUpdateArgs} args - Arguments to update one EventCenterBooking.
     * @example
     * // Update one EventCenterBooking
     * const eventCenterBooking = await prisma.eventCenterBooking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventCenterBookingUpdateArgs>(args: SelectSubset<T, EventCenterBookingUpdateArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventCenterBookings.
     * @param {EventCenterBookingDeleteManyArgs} args - Arguments to filter EventCenterBookings to delete.
     * @example
     * // Delete a few EventCenterBookings
     * const { count } = await prisma.eventCenterBooking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventCenterBookingDeleteManyArgs>(args?: SelectSubset<T, EventCenterBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCenterBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventCenterBookings
     * const eventCenterBooking = await prisma.eventCenterBooking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventCenterBookingUpdateManyArgs>(args: SelectSubset<T, EventCenterBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCenterBookings and returns the data updated in the database.
     * @param {EventCenterBookingUpdateManyAndReturnArgs} args - Arguments to update many EventCenterBookings.
     * @example
     * // Update many EventCenterBookings
     * const eventCenterBooking = await prisma.eventCenterBooking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventCenterBookings and only return the `id`
     * const eventCenterBookingWithIdOnly = await prisma.eventCenterBooking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventCenterBookingUpdateManyAndReturnArgs>(args: SelectSubset<T, EventCenterBookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventCenterBooking.
     * @param {EventCenterBookingUpsertArgs} args - Arguments to update or create a EventCenterBooking.
     * @example
     * // Update or create a EventCenterBooking
     * const eventCenterBooking = await prisma.eventCenterBooking.upsert({
     *   create: {
     *     // ... data to create a EventCenterBooking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventCenterBooking we want to update
     *   }
     * })
     */
    upsert<T extends EventCenterBookingUpsertArgs>(args: SelectSubset<T, EventCenterBookingUpsertArgs<ExtArgs>>): Prisma__EventCenterBookingClient<$Result.GetResult<Prisma.$EventCenterBookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventCenterBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingCountArgs} args - Arguments to filter EventCenterBookings to count.
     * @example
     * // Count the number of EventCenterBookings
     * const count = await prisma.eventCenterBooking.count({
     *   where: {
     *     // ... the filter for the EventCenterBookings we want to count
     *   }
     * })
    **/
    count<T extends EventCenterBookingCountArgs>(
      args?: Subset<T, EventCenterBookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCenterBookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventCenterBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventCenterBookingAggregateArgs>(args: Subset<T, EventCenterBookingAggregateArgs>): Prisma.PrismaPromise<GetEventCenterBookingAggregateType<T>>

    /**
     * Group by EventCenterBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterBookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventCenterBookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventCenterBookingGroupByArgs['orderBy'] }
        : { orderBy?: EventCenterBookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventCenterBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventCenterBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventCenterBooking model
   */
  readonly fields: EventCenterBookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventCenterBooking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventCenterBookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventCenterBooking model
   */
  interface EventCenterBookingFieldRefs {
    readonly id: FieldRef<"EventCenterBooking", 'String'>
    readonly eventcenterId: FieldRef<"EventCenterBooking", 'String'>
    readonly bookingId: FieldRef<"EventCenterBooking", 'String'>
    readonly eventName: FieldRef<"EventCenterBooking", 'String'>
    readonly eventTheme: FieldRef<"EventCenterBooking", 'String'>
    readonly eventType: FieldRef<"EventCenterBooking", 'String'>
    readonly description: FieldRef<"EventCenterBooking", 'String'>
    readonly noOfGuest: FieldRef<"EventCenterBooking", 'Int'>
    readonly specialRequirements: FieldRef<"EventCenterBooking", 'SpecialRequirement[]'>
    readonly images: FieldRef<"EventCenterBooking", 'String[]'>
    readonly createdAt: FieldRef<"EventCenterBooking", 'DateTime'>
    readonly updatedAt: FieldRef<"EventCenterBooking", 'DateTime'>
    readonly deletedAt: FieldRef<"EventCenterBooking", 'DateTime'>
    readonly deletedBy: FieldRef<"EventCenterBooking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EventCenterBooking findUnique
   */
  export type EventCenterBookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * Filter, which EventCenterBooking to fetch.
     */
    where: EventCenterBookingWhereUniqueInput
  }

  /**
   * EventCenterBooking findUniqueOrThrow
   */
  export type EventCenterBookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * Filter, which EventCenterBooking to fetch.
     */
    where: EventCenterBookingWhereUniqueInput
  }

  /**
   * EventCenterBooking findFirst
   */
  export type EventCenterBookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * Filter, which EventCenterBooking to fetch.
     */
    where?: EventCenterBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenterBookings to fetch.
     */
    orderBy?: EventCenterBookingOrderByWithRelationInput | EventCenterBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventCenterBookings.
     */
    cursor?: EventCenterBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenterBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenterBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventCenterBookings.
     */
    distinct?: EventCenterBookingScalarFieldEnum | EventCenterBookingScalarFieldEnum[]
  }

  /**
   * EventCenterBooking findFirstOrThrow
   */
  export type EventCenterBookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * Filter, which EventCenterBooking to fetch.
     */
    where?: EventCenterBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenterBookings to fetch.
     */
    orderBy?: EventCenterBookingOrderByWithRelationInput | EventCenterBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventCenterBookings.
     */
    cursor?: EventCenterBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenterBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenterBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventCenterBookings.
     */
    distinct?: EventCenterBookingScalarFieldEnum | EventCenterBookingScalarFieldEnum[]
  }

  /**
   * EventCenterBooking findMany
   */
  export type EventCenterBookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * Filter, which EventCenterBookings to fetch.
     */
    where?: EventCenterBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenterBookings to fetch.
     */
    orderBy?: EventCenterBookingOrderByWithRelationInput | EventCenterBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventCenterBookings.
     */
    cursor?: EventCenterBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenterBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenterBookings.
     */
    skip?: number
    distinct?: EventCenterBookingScalarFieldEnum | EventCenterBookingScalarFieldEnum[]
  }

  /**
   * EventCenterBooking create
   */
  export type EventCenterBookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * The data needed to create a EventCenterBooking.
     */
    data: XOR<EventCenterBookingCreateInput, EventCenterBookingUncheckedCreateInput>
  }

  /**
   * EventCenterBooking createMany
   */
  export type EventCenterBookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventCenterBookings.
     */
    data: EventCenterBookingCreateManyInput | EventCenterBookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventCenterBooking createManyAndReturn
   */
  export type EventCenterBookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * The data used to create many EventCenterBookings.
     */
    data: EventCenterBookingCreateManyInput | EventCenterBookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventCenterBooking update
   */
  export type EventCenterBookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * The data needed to update a EventCenterBooking.
     */
    data: XOR<EventCenterBookingUpdateInput, EventCenterBookingUncheckedUpdateInput>
    /**
     * Choose, which EventCenterBooking to update.
     */
    where: EventCenterBookingWhereUniqueInput
  }

  /**
   * EventCenterBooking updateMany
   */
  export type EventCenterBookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventCenterBookings.
     */
    data: XOR<EventCenterBookingUpdateManyMutationInput, EventCenterBookingUncheckedUpdateManyInput>
    /**
     * Filter which EventCenterBookings to update
     */
    where?: EventCenterBookingWhereInput
    /**
     * Limit how many EventCenterBookings to update.
     */
    limit?: number
  }

  /**
   * EventCenterBooking updateManyAndReturn
   */
  export type EventCenterBookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * The data used to update EventCenterBookings.
     */
    data: XOR<EventCenterBookingUpdateManyMutationInput, EventCenterBookingUncheckedUpdateManyInput>
    /**
     * Filter which EventCenterBookings to update
     */
    where?: EventCenterBookingWhereInput
    /**
     * Limit how many EventCenterBookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventCenterBooking upsert
   */
  export type EventCenterBookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * The filter to search for the EventCenterBooking to update in case it exists.
     */
    where: EventCenterBookingWhereUniqueInput
    /**
     * In case the EventCenterBooking found by the `where` argument doesn't exist, create a new EventCenterBooking with this data.
     */
    create: XOR<EventCenterBookingCreateInput, EventCenterBookingUncheckedCreateInput>
    /**
     * In case the EventCenterBooking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventCenterBookingUpdateInput, EventCenterBookingUncheckedUpdateInput>
  }

  /**
   * EventCenterBooking delete
   */
  export type EventCenterBookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
    /**
     * Filter which EventCenterBooking to delete.
     */
    where: EventCenterBookingWhereUniqueInput
  }

  /**
   * EventCenterBooking deleteMany
   */
  export type EventCenterBookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventCenterBookings to delete
     */
    where?: EventCenterBookingWhereInput
    /**
     * Limit how many EventCenterBookings to delete.
     */
    limit?: number
  }

  /**
   * EventCenterBooking without action
   */
  export type EventCenterBookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenterBooking
     */
    select?: EventCenterBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenterBooking
     */
    omit?: EventCenterBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventCenterBookingInclude<ExtArgs> | null
  }


  /**
   * Model CateringBooking
   */

  export type AggregateCateringBooking = {
    _count: CateringBookingCountAggregateOutputType | null
    _avg: CateringBookingAvgAggregateOutputType | null
    _sum: CateringBookingSumAggregateOutputType | null
    _min: CateringBookingMinAggregateOutputType | null
    _max: CateringBookingMaxAggregateOutputType | null
  }

  export type CateringBookingAvgAggregateOutputType = {
    noOfGuest: number | null
  }

  export type CateringBookingSumAggregateOutputType = {
    noOfGuest: number | null
  }

  export type CateringBookingMinAggregateOutputType = {
    id: string | null
    cateringId: string | null
    bookingId: string | null
    eventName: string | null
    eventType: string | null
    description: string | null
    noOfGuest: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type CateringBookingMaxAggregateOutputType = {
    id: string | null
    cateringId: string | null
    bookingId: string | null
    eventName: string | null
    eventType: string | null
    description: string | null
    noOfGuest: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type CateringBookingCountAggregateOutputType = {
    id: number
    cateringId: number
    bookingId: number
    eventName: number
    eventType: number
    dishTypes: number
    cuisine: number
    description: number
    noOfGuest: number
    specialRequirements: number
    images: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type CateringBookingAvgAggregateInputType = {
    noOfGuest?: true
  }

  export type CateringBookingSumAggregateInputType = {
    noOfGuest?: true
  }

  export type CateringBookingMinAggregateInputType = {
    id?: true
    cateringId?: true
    bookingId?: true
    eventName?: true
    eventType?: true
    description?: true
    noOfGuest?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type CateringBookingMaxAggregateInputType = {
    id?: true
    cateringId?: true
    bookingId?: true
    eventName?: true
    eventType?: true
    description?: true
    noOfGuest?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type CateringBookingCountAggregateInputType = {
    id?: true
    cateringId?: true
    bookingId?: true
    eventName?: true
    eventType?: true
    dishTypes?: true
    cuisine?: true
    description?: true
    noOfGuest?: true
    specialRequirements?: true
    images?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type CateringBookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CateringBooking to aggregate.
     */
    where?: CateringBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CateringBookings to fetch.
     */
    orderBy?: CateringBookingOrderByWithRelationInput | CateringBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CateringBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CateringBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CateringBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CateringBookings
    **/
    _count?: true | CateringBookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CateringBookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CateringBookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CateringBookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CateringBookingMaxAggregateInputType
  }

  export type GetCateringBookingAggregateType<T extends CateringBookingAggregateArgs> = {
        [P in keyof T & keyof AggregateCateringBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCateringBooking[P]>
      : GetScalarType<T[P], AggregateCateringBooking[P]>
  }




  export type CateringBookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CateringBookingWhereInput
    orderBy?: CateringBookingOrderByWithAggregationInput | CateringBookingOrderByWithAggregationInput[]
    by: CateringBookingScalarFieldEnum[] | CateringBookingScalarFieldEnum
    having?: CateringBookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CateringBookingCountAggregateInputType | true
    _avg?: CateringBookingAvgAggregateInputType
    _sum?: CateringBookingSumAggregateInputType
    _min?: CateringBookingMinAggregateInputType
    _max?: CateringBookingMaxAggregateInputType
  }

  export type CateringBookingGroupByOutputType = {
    id: string
    cateringId: string
    bookingId: string
    eventName: string | null
    eventType: string | null
    dishTypes: string[]
    cuisine: string[]
    description: string | null
    noOfGuest: number | null
    specialRequirements: $Enums.SpecialRequirement[]
    images: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    deletedBy: string | null
    _count: CateringBookingCountAggregateOutputType | null
    _avg: CateringBookingAvgAggregateOutputType | null
    _sum: CateringBookingSumAggregateOutputType | null
    _min: CateringBookingMinAggregateOutputType | null
    _max: CateringBookingMaxAggregateOutputType | null
  }

  type GetCateringBookingGroupByPayload<T extends CateringBookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CateringBookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CateringBookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CateringBookingGroupByOutputType[P]>
            : GetScalarType<T[P], CateringBookingGroupByOutputType[P]>
        }
      >
    >


  export type CateringBookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cateringId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventType?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cateringBooking"]>

  export type CateringBookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cateringId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventType?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cateringBooking"]>

  export type CateringBookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cateringId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventType?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cateringBooking"]>

  export type CateringBookingSelectScalar = {
    id?: boolean
    cateringId?: boolean
    bookingId?: boolean
    eventName?: boolean
    eventType?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    description?: boolean
    noOfGuest?: boolean
    specialRequirements?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type CateringBookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cateringId" | "bookingId" | "eventName" | "eventType" | "dishTypes" | "cuisine" | "description" | "noOfGuest" | "specialRequirements" | "images" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy", ExtArgs["result"]["cateringBooking"]>
  export type CateringBookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type CateringBookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type CateringBookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $CateringBookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CateringBooking"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cateringId: string
      bookingId: string
      eventName: string | null
      eventType: string | null
      dishTypes: string[]
      cuisine: string[]
      description: string | null
      noOfGuest: number | null
      specialRequirements: $Enums.SpecialRequirement[]
      images: string[]
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["cateringBooking"]>
    composites: {}
  }

  type CateringBookingGetPayload<S extends boolean | null | undefined | CateringBookingDefaultArgs> = $Result.GetResult<Prisma.$CateringBookingPayload, S>

  type CateringBookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CateringBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CateringBookingCountAggregateInputType | true
    }

  export interface CateringBookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CateringBooking'], meta: { name: 'CateringBooking' } }
    /**
     * Find zero or one CateringBooking that matches the filter.
     * @param {CateringBookingFindUniqueArgs} args - Arguments to find a CateringBooking
     * @example
     * // Get one CateringBooking
     * const cateringBooking = await prisma.cateringBooking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CateringBookingFindUniqueArgs>(args: SelectSubset<T, CateringBookingFindUniqueArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CateringBooking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CateringBookingFindUniqueOrThrowArgs} args - Arguments to find a CateringBooking
     * @example
     * // Get one CateringBooking
     * const cateringBooking = await prisma.cateringBooking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CateringBookingFindUniqueOrThrowArgs>(args: SelectSubset<T, CateringBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CateringBooking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingFindFirstArgs} args - Arguments to find a CateringBooking
     * @example
     * // Get one CateringBooking
     * const cateringBooking = await prisma.cateringBooking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CateringBookingFindFirstArgs>(args?: SelectSubset<T, CateringBookingFindFirstArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CateringBooking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingFindFirstOrThrowArgs} args - Arguments to find a CateringBooking
     * @example
     * // Get one CateringBooking
     * const cateringBooking = await prisma.cateringBooking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CateringBookingFindFirstOrThrowArgs>(args?: SelectSubset<T, CateringBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CateringBookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CateringBookings
     * const cateringBookings = await prisma.cateringBooking.findMany()
     * 
     * // Get first 10 CateringBookings
     * const cateringBookings = await prisma.cateringBooking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cateringBookingWithIdOnly = await prisma.cateringBooking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CateringBookingFindManyArgs>(args?: SelectSubset<T, CateringBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CateringBooking.
     * @param {CateringBookingCreateArgs} args - Arguments to create a CateringBooking.
     * @example
     * // Create one CateringBooking
     * const CateringBooking = await prisma.cateringBooking.create({
     *   data: {
     *     // ... data to create a CateringBooking
     *   }
     * })
     * 
     */
    create<T extends CateringBookingCreateArgs>(args: SelectSubset<T, CateringBookingCreateArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CateringBookings.
     * @param {CateringBookingCreateManyArgs} args - Arguments to create many CateringBookings.
     * @example
     * // Create many CateringBookings
     * const cateringBooking = await prisma.cateringBooking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CateringBookingCreateManyArgs>(args?: SelectSubset<T, CateringBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CateringBookings and returns the data saved in the database.
     * @param {CateringBookingCreateManyAndReturnArgs} args - Arguments to create many CateringBookings.
     * @example
     * // Create many CateringBookings
     * const cateringBooking = await prisma.cateringBooking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CateringBookings and only return the `id`
     * const cateringBookingWithIdOnly = await prisma.cateringBooking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CateringBookingCreateManyAndReturnArgs>(args?: SelectSubset<T, CateringBookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CateringBooking.
     * @param {CateringBookingDeleteArgs} args - Arguments to delete one CateringBooking.
     * @example
     * // Delete one CateringBooking
     * const CateringBooking = await prisma.cateringBooking.delete({
     *   where: {
     *     // ... filter to delete one CateringBooking
     *   }
     * })
     * 
     */
    delete<T extends CateringBookingDeleteArgs>(args: SelectSubset<T, CateringBookingDeleteArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CateringBooking.
     * @param {CateringBookingUpdateArgs} args - Arguments to update one CateringBooking.
     * @example
     * // Update one CateringBooking
     * const cateringBooking = await prisma.cateringBooking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CateringBookingUpdateArgs>(args: SelectSubset<T, CateringBookingUpdateArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CateringBookings.
     * @param {CateringBookingDeleteManyArgs} args - Arguments to filter CateringBookings to delete.
     * @example
     * // Delete a few CateringBookings
     * const { count } = await prisma.cateringBooking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CateringBookingDeleteManyArgs>(args?: SelectSubset<T, CateringBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CateringBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CateringBookings
     * const cateringBooking = await prisma.cateringBooking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CateringBookingUpdateManyArgs>(args: SelectSubset<T, CateringBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CateringBookings and returns the data updated in the database.
     * @param {CateringBookingUpdateManyAndReturnArgs} args - Arguments to update many CateringBookings.
     * @example
     * // Update many CateringBookings
     * const cateringBooking = await prisma.cateringBooking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CateringBookings and only return the `id`
     * const cateringBookingWithIdOnly = await prisma.cateringBooking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CateringBookingUpdateManyAndReturnArgs>(args: SelectSubset<T, CateringBookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CateringBooking.
     * @param {CateringBookingUpsertArgs} args - Arguments to update or create a CateringBooking.
     * @example
     * // Update or create a CateringBooking
     * const cateringBooking = await prisma.cateringBooking.upsert({
     *   create: {
     *     // ... data to create a CateringBooking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CateringBooking we want to update
     *   }
     * })
     */
    upsert<T extends CateringBookingUpsertArgs>(args: SelectSubset<T, CateringBookingUpsertArgs<ExtArgs>>): Prisma__CateringBookingClient<$Result.GetResult<Prisma.$CateringBookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CateringBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingCountArgs} args - Arguments to filter CateringBookings to count.
     * @example
     * // Count the number of CateringBookings
     * const count = await prisma.cateringBooking.count({
     *   where: {
     *     // ... the filter for the CateringBookings we want to count
     *   }
     * })
    **/
    count<T extends CateringBookingCountArgs>(
      args?: Subset<T, CateringBookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CateringBookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CateringBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CateringBookingAggregateArgs>(args: Subset<T, CateringBookingAggregateArgs>): Prisma.PrismaPromise<GetCateringBookingAggregateType<T>>

    /**
     * Group by CateringBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringBookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CateringBookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CateringBookingGroupByArgs['orderBy'] }
        : { orderBy?: CateringBookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CateringBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCateringBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CateringBooking model
   */
  readonly fields: CateringBookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CateringBooking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CateringBookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CateringBooking model
   */
  interface CateringBookingFieldRefs {
    readonly id: FieldRef<"CateringBooking", 'String'>
    readonly cateringId: FieldRef<"CateringBooking", 'String'>
    readonly bookingId: FieldRef<"CateringBooking", 'String'>
    readonly eventName: FieldRef<"CateringBooking", 'String'>
    readonly eventType: FieldRef<"CateringBooking", 'String'>
    readonly dishTypes: FieldRef<"CateringBooking", 'String[]'>
    readonly cuisine: FieldRef<"CateringBooking", 'String[]'>
    readonly description: FieldRef<"CateringBooking", 'String'>
    readonly noOfGuest: FieldRef<"CateringBooking", 'Int'>
    readonly specialRequirements: FieldRef<"CateringBooking", 'SpecialRequirement[]'>
    readonly images: FieldRef<"CateringBooking", 'String[]'>
    readonly createdAt: FieldRef<"CateringBooking", 'DateTime'>
    readonly updatedAt: FieldRef<"CateringBooking", 'DateTime'>
    readonly deletedAt: FieldRef<"CateringBooking", 'DateTime'>
    readonly deletedBy: FieldRef<"CateringBooking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CateringBooking findUnique
   */
  export type CateringBookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * Filter, which CateringBooking to fetch.
     */
    where: CateringBookingWhereUniqueInput
  }

  /**
   * CateringBooking findUniqueOrThrow
   */
  export type CateringBookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * Filter, which CateringBooking to fetch.
     */
    where: CateringBookingWhereUniqueInput
  }

  /**
   * CateringBooking findFirst
   */
  export type CateringBookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * Filter, which CateringBooking to fetch.
     */
    where?: CateringBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CateringBookings to fetch.
     */
    orderBy?: CateringBookingOrderByWithRelationInput | CateringBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CateringBookings.
     */
    cursor?: CateringBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CateringBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CateringBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CateringBookings.
     */
    distinct?: CateringBookingScalarFieldEnum | CateringBookingScalarFieldEnum[]
  }

  /**
   * CateringBooking findFirstOrThrow
   */
  export type CateringBookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * Filter, which CateringBooking to fetch.
     */
    where?: CateringBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CateringBookings to fetch.
     */
    orderBy?: CateringBookingOrderByWithRelationInput | CateringBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CateringBookings.
     */
    cursor?: CateringBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CateringBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CateringBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CateringBookings.
     */
    distinct?: CateringBookingScalarFieldEnum | CateringBookingScalarFieldEnum[]
  }

  /**
   * CateringBooking findMany
   */
  export type CateringBookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * Filter, which CateringBookings to fetch.
     */
    where?: CateringBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CateringBookings to fetch.
     */
    orderBy?: CateringBookingOrderByWithRelationInput | CateringBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CateringBookings.
     */
    cursor?: CateringBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CateringBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CateringBookings.
     */
    skip?: number
    distinct?: CateringBookingScalarFieldEnum | CateringBookingScalarFieldEnum[]
  }

  /**
   * CateringBooking create
   */
  export type CateringBookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * The data needed to create a CateringBooking.
     */
    data: XOR<CateringBookingCreateInput, CateringBookingUncheckedCreateInput>
  }

  /**
   * CateringBooking createMany
   */
  export type CateringBookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CateringBookings.
     */
    data: CateringBookingCreateManyInput | CateringBookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CateringBooking createManyAndReturn
   */
  export type CateringBookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * The data used to create many CateringBookings.
     */
    data: CateringBookingCreateManyInput | CateringBookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CateringBooking update
   */
  export type CateringBookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * The data needed to update a CateringBooking.
     */
    data: XOR<CateringBookingUpdateInput, CateringBookingUncheckedUpdateInput>
    /**
     * Choose, which CateringBooking to update.
     */
    where: CateringBookingWhereUniqueInput
  }

  /**
   * CateringBooking updateMany
   */
  export type CateringBookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CateringBookings.
     */
    data: XOR<CateringBookingUpdateManyMutationInput, CateringBookingUncheckedUpdateManyInput>
    /**
     * Filter which CateringBookings to update
     */
    where?: CateringBookingWhereInput
    /**
     * Limit how many CateringBookings to update.
     */
    limit?: number
  }

  /**
   * CateringBooking updateManyAndReturn
   */
  export type CateringBookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * The data used to update CateringBookings.
     */
    data: XOR<CateringBookingUpdateManyMutationInput, CateringBookingUncheckedUpdateManyInput>
    /**
     * Filter which CateringBookings to update
     */
    where?: CateringBookingWhereInput
    /**
     * Limit how many CateringBookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CateringBooking upsert
   */
  export type CateringBookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * The filter to search for the CateringBooking to update in case it exists.
     */
    where: CateringBookingWhereUniqueInput
    /**
     * In case the CateringBooking found by the `where` argument doesn't exist, create a new CateringBooking with this data.
     */
    create: XOR<CateringBookingCreateInput, CateringBookingUncheckedCreateInput>
    /**
     * In case the CateringBooking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CateringBookingUpdateInput, CateringBookingUncheckedUpdateInput>
  }

  /**
   * CateringBooking delete
   */
  export type CateringBookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
    /**
     * Filter which CateringBooking to delete.
     */
    where: CateringBookingWhereUniqueInput
  }

  /**
   * CateringBooking deleteMany
   */
  export type CateringBookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CateringBookings to delete
     */
    where?: CateringBookingWhereInput
    /**
     * Limit how many CateringBookings to delete.
     */
    limit?: number
  }

  /**
   * CateringBooking without action
   */
  export type CateringBookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringBooking
     */
    select?: CateringBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CateringBooking
     */
    omit?: CateringBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringBookingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BookingScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    confirmedBy: 'confirmedBy',
    confirmedAt: 'confirmedAt',
    servicebookingId: 'servicebookingId',
    serviceId: 'serviceId',
    serviceType: 'serviceType',
    totalBeforeDiscount: 'totalBeforeDiscount',
    discount: 'discount',
    totalAfterDiscount: 'totalAfterDiscount',
    paymentStatus: 'paymentStatus',
    status: 'status',
    bookingDates: 'bookingDates',
    isTermsAccepted: 'isTermsAccepted',
    isCancellationPolicyAccepted: 'isCancellationPolicyAccepted',
    isLiabilityWaiverSigned: 'isLiabilityWaiverSigned',
    bookingReference: 'bookingReference',
    source: 'source',
    serviceNotes: 'serviceNotes',
    customerNotes: 'customerNotes',
    rescheduledBy: 'rescheduledBy',
    rescheduledAt: 'rescheduledAt',
    previousDates: 'previousDates',
    cancelledBy: 'cancelledBy',
    canceledAt: 'canceledAt',
    cancelationReason: 'cancelationReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const AvailableLocationsScalarFieldEnum: {
    id: 'id',
    country: 'country',
    state: 'state',
    city: 'city',
    status: 'status'
  };

  export type AvailableLocationsScalarFieldEnum = (typeof AvailableLocationsScalarFieldEnum)[keyof typeof AvailableLocationsScalarFieldEnum]


  export const TimeSlotScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    serviceType: 'serviceType',
    bookingId: 'bookingId',
    startTime: 'startTime',
    endTime: 'endTime',
    isAvailable: 'isAvailable',
    previousBookings: 'previousBookings',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type TimeSlotScalarFieldEnum = (typeof TimeSlotScalarFieldEnum)[keyof typeof TimeSlotScalarFieldEnum]


  export const EventCenterBookingScalarFieldEnum: {
    id: 'id',
    eventcenterId: 'eventcenterId',
    bookingId: 'bookingId',
    eventName: 'eventName',
    eventTheme: 'eventTheme',
    eventType: 'eventType',
    description: 'description',
    noOfGuest: 'noOfGuest',
    specialRequirements: 'specialRequirements',
    images: 'images',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type EventCenterBookingScalarFieldEnum = (typeof EventCenterBookingScalarFieldEnum)[keyof typeof EventCenterBookingScalarFieldEnum]


  export const CateringBookingScalarFieldEnum: {
    id: 'id',
    cateringId: 'cateringId',
    bookingId: 'bookingId',
    eventName: 'eventName',
    eventType: 'eventType',
    dishTypes: 'dishTypes',
    cuisine: 'cuisine',
    description: 'description',
    noOfGuest: 'noOfGuest',
    specialRequirements: 'specialRequirements',
    images: 'images',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type CateringBookingScalarFieldEnum = (typeof CateringBookingScalarFieldEnum)[keyof typeof CateringBookingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ServiceType'
   */
  export type EnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType'>
    


  /**
   * Reference to a field of type 'ServiceType[]'
   */
  export type ListEnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BookingSource'
   */
  export type EnumBookingSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingSource'>
    


  /**
   * Reference to a field of type 'BookingSource[]'
   */
  export type ListEnumBookingSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingSource[]'>
    


  /**
   * Reference to a field of type 'LocationStatus'
   */
  export type EnumLocationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocationStatus'>
    


  /**
   * Reference to a field of type 'LocationStatus[]'
   */
  export type ListEnumLocationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocationStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SpecialRequirement[]'
   */
  export type ListEnumSpecialRequirementFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpecialRequirement[]'>
    


  /**
   * Reference to a field of type 'SpecialRequirement'
   */
  export type EnumSpecialRequirementFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpecialRequirement'>
    
  /**
   * Deep Input Types
   */


  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    customerId?: StringFilter<"Booking"> | string
    confirmedBy?: StringNullableFilter<"Booking"> | string | null
    confirmedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    servicebookingId?: StringNullableFilter<"Booking"> | string | null
    serviceId?: StringFilter<"Booking"> | string
    serviceType?: EnumServiceTypeFilter<"Booking"> | $Enums.ServiceType
    totalBeforeDiscount?: FloatFilter<"Booking"> | number
    discount?: FloatNullableFilter<"Booking"> | number | null
    totalAfterDiscount?: FloatFilter<"Booking"> | number
    paymentStatus?: EnumPaymentStatusFilter<"Booking"> | $Enums.PaymentStatus
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    bookingDates?: StringNullableListFilter<"Booking">
    isTermsAccepted?: BoolFilter<"Booking"> | boolean
    isCancellationPolicyAccepted?: BoolFilter<"Booking"> | boolean
    isLiabilityWaiverSigned?: BoolFilter<"Booking"> | boolean
    bookingReference?: StringFilter<"Booking"> | string
    source?: EnumBookingSourceFilter<"Booking"> | $Enums.BookingSource
    serviceNotes?: StringNullableFilter<"Booking"> | string | null
    customerNotes?: StringNullableFilter<"Booking"> | string | null
    rescheduledBy?: StringNullableFilter<"Booking"> | string | null
    rescheduledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    previousDates?: StringNullableListFilter<"Booking">
    cancelledBy?: StringNullableFilter<"Booking"> | string | null
    canceledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    cancelationReason?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    deletedBy?: StringNullableFilter<"Booking"> | string | null
    eventCenterBooking?: XOR<EventCenterBookingNullableScalarRelationFilter, EventCenterBookingWhereInput> | null
    cateringBooking?: XOR<CateringBookingNullableScalarRelationFilter, CateringBookingWhereInput> | null
    timeslot?: TimeSlotListRelationFilter
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    confirmedBy?: SortOrderInput | SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    servicebookingId?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    totalBeforeDiscount?: SortOrder
    discount?: SortOrderInput | SortOrder
    totalAfterDiscount?: SortOrder
    paymentStatus?: SortOrder
    status?: SortOrder
    bookingDates?: SortOrder
    isTermsAccepted?: SortOrder
    isCancellationPolicyAccepted?: SortOrder
    isLiabilityWaiverSigned?: SortOrder
    bookingReference?: SortOrder
    source?: SortOrder
    serviceNotes?: SortOrderInput | SortOrder
    customerNotes?: SortOrderInput | SortOrder
    rescheduledBy?: SortOrderInput | SortOrder
    rescheduledAt?: SortOrderInput | SortOrder
    previousDates?: SortOrder
    cancelledBy?: SortOrderInput | SortOrder
    canceledAt?: SortOrderInput | SortOrder
    cancelationReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    eventCenterBooking?: EventCenterBookingOrderByWithRelationInput
    cateringBooking?: CateringBookingOrderByWithRelationInput
    timeslot?: TimeSlotOrderByRelationAggregateInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    customerId?: StringFilter<"Booking"> | string
    confirmedBy?: StringNullableFilter<"Booking"> | string | null
    confirmedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    servicebookingId?: StringNullableFilter<"Booking"> | string | null
    serviceId?: StringFilter<"Booking"> | string
    serviceType?: EnumServiceTypeFilter<"Booking"> | $Enums.ServiceType
    totalBeforeDiscount?: FloatFilter<"Booking"> | number
    discount?: FloatNullableFilter<"Booking"> | number | null
    totalAfterDiscount?: FloatFilter<"Booking"> | number
    paymentStatus?: EnumPaymentStatusFilter<"Booking"> | $Enums.PaymentStatus
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    bookingDates?: StringNullableListFilter<"Booking">
    isTermsAccepted?: BoolFilter<"Booking"> | boolean
    isCancellationPolicyAccepted?: BoolFilter<"Booking"> | boolean
    isLiabilityWaiverSigned?: BoolFilter<"Booking"> | boolean
    bookingReference?: StringFilter<"Booking"> | string
    source?: EnumBookingSourceFilter<"Booking"> | $Enums.BookingSource
    serviceNotes?: StringNullableFilter<"Booking"> | string | null
    customerNotes?: StringNullableFilter<"Booking"> | string | null
    rescheduledBy?: StringNullableFilter<"Booking"> | string | null
    rescheduledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    previousDates?: StringNullableListFilter<"Booking">
    cancelledBy?: StringNullableFilter<"Booking"> | string | null
    canceledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    cancelationReason?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    deletedBy?: StringNullableFilter<"Booking"> | string | null
    eventCenterBooking?: XOR<EventCenterBookingNullableScalarRelationFilter, EventCenterBookingWhereInput> | null
    cateringBooking?: XOR<CateringBookingNullableScalarRelationFilter, CateringBookingWhereInput> | null
    timeslot?: TimeSlotListRelationFilter
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    confirmedBy?: SortOrderInput | SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    servicebookingId?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    totalBeforeDiscount?: SortOrder
    discount?: SortOrderInput | SortOrder
    totalAfterDiscount?: SortOrder
    paymentStatus?: SortOrder
    status?: SortOrder
    bookingDates?: SortOrder
    isTermsAccepted?: SortOrder
    isCancellationPolicyAccepted?: SortOrder
    isLiabilityWaiverSigned?: SortOrder
    bookingReference?: SortOrder
    source?: SortOrder
    serviceNotes?: SortOrderInput | SortOrder
    customerNotes?: SortOrderInput | SortOrder
    rescheduledBy?: SortOrderInput | SortOrder
    rescheduledAt?: SortOrderInput | SortOrder
    previousDates?: SortOrder
    cancelledBy?: SortOrderInput | SortOrder
    canceledAt?: SortOrderInput | SortOrder
    cancelationReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    customerId?: StringWithAggregatesFilter<"Booking"> | string
    confirmedBy?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    servicebookingId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    serviceId?: StringWithAggregatesFilter<"Booking"> | string
    serviceType?: EnumServiceTypeWithAggregatesFilter<"Booking"> | $Enums.ServiceType
    totalBeforeDiscount?: FloatWithAggregatesFilter<"Booking"> | number
    discount?: FloatNullableWithAggregatesFilter<"Booking"> | number | null
    totalAfterDiscount?: FloatWithAggregatesFilter<"Booking"> | number
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Booking"> | $Enums.PaymentStatus
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    bookingDates?: StringNullableListFilter<"Booking">
    isTermsAccepted?: BoolWithAggregatesFilter<"Booking"> | boolean
    isCancellationPolicyAccepted?: BoolWithAggregatesFilter<"Booking"> | boolean
    isLiabilityWaiverSigned?: BoolWithAggregatesFilter<"Booking"> | boolean
    bookingReference?: StringWithAggregatesFilter<"Booking"> | string
    source?: EnumBookingSourceWithAggregatesFilter<"Booking"> | $Enums.BookingSource
    serviceNotes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    customerNotes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    rescheduledBy?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    rescheduledAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    previousDates?: StringNullableListFilter<"Booking">
    cancelledBy?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    canceledAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    cancelationReason?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Booking"> | string | null
  }

  export type AvailableLocationsWhereInput = {
    AND?: AvailableLocationsWhereInput | AvailableLocationsWhereInput[]
    OR?: AvailableLocationsWhereInput[]
    NOT?: AvailableLocationsWhereInput | AvailableLocationsWhereInput[]
    id?: StringFilter<"AvailableLocations"> | string
    country?: StringFilter<"AvailableLocations"> | string
    state?: StringFilter<"AvailableLocations"> | string
    city?: StringNullableFilter<"AvailableLocations"> | string | null
    status?: EnumLocationStatusFilter<"AvailableLocations"> | $Enums.LocationStatus
  }

  export type AvailableLocationsOrderByWithRelationInput = {
    id?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrderInput | SortOrder
    status?: SortOrder
  }

  export type AvailableLocationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvailableLocationsWhereInput | AvailableLocationsWhereInput[]
    OR?: AvailableLocationsWhereInput[]
    NOT?: AvailableLocationsWhereInput | AvailableLocationsWhereInput[]
    country?: StringFilter<"AvailableLocations"> | string
    state?: StringFilter<"AvailableLocations"> | string
    city?: StringNullableFilter<"AvailableLocations"> | string | null
    status?: EnumLocationStatusFilter<"AvailableLocations"> | $Enums.LocationStatus
  }, "id">

  export type AvailableLocationsOrderByWithAggregationInput = {
    id?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: AvailableLocationsCountOrderByAggregateInput
    _max?: AvailableLocationsMaxOrderByAggregateInput
    _min?: AvailableLocationsMinOrderByAggregateInput
  }

  export type AvailableLocationsScalarWhereWithAggregatesInput = {
    AND?: AvailableLocationsScalarWhereWithAggregatesInput | AvailableLocationsScalarWhereWithAggregatesInput[]
    OR?: AvailableLocationsScalarWhereWithAggregatesInput[]
    NOT?: AvailableLocationsScalarWhereWithAggregatesInput | AvailableLocationsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailableLocations"> | string
    country?: StringWithAggregatesFilter<"AvailableLocations"> | string
    state?: StringWithAggregatesFilter<"AvailableLocations"> | string
    city?: StringNullableWithAggregatesFilter<"AvailableLocations"> | string | null
    status?: EnumLocationStatusWithAggregatesFilter<"AvailableLocations"> | $Enums.LocationStatus
  }

  export type TimeSlotWhereInput = {
    AND?: TimeSlotWhereInput | TimeSlotWhereInput[]
    OR?: TimeSlotWhereInput[]
    NOT?: TimeSlotWhereInput | TimeSlotWhereInput[]
    id?: StringFilter<"TimeSlot"> | string
    serviceId?: StringFilter<"TimeSlot"> | string
    serviceType?: EnumServiceTypeFilter<"TimeSlot"> | $Enums.ServiceType
    bookingId?: StringNullableFilter<"TimeSlot"> | string | null
    startTime?: DateTimeFilter<"TimeSlot"> | Date | string
    endTime?: DateTimeFilter<"TimeSlot"> | Date | string
    isAvailable?: BoolFilter<"TimeSlot"> | boolean
    previousBookings?: StringNullableListFilter<"TimeSlot">
    createdBy?: StringFilter<"TimeSlot"> | string
    createdAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedBy?: StringNullableFilter<"TimeSlot"> | string | null
    deletedAt?: DateTimeNullableFilter<"TimeSlot"> | Date | string | null
    deletedBy?: StringNullableFilter<"TimeSlot"> | string | null
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
  }

  export type TimeSlotOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    previousBookings?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type TimeSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeSlotWhereInput | TimeSlotWhereInput[]
    OR?: TimeSlotWhereInput[]
    NOT?: TimeSlotWhereInput | TimeSlotWhereInput[]
    serviceId?: StringFilter<"TimeSlot"> | string
    serviceType?: EnumServiceTypeFilter<"TimeSlot"> | $Enums.ServiceType
    bookingId?: StringNullableFilter<"TimeSlot"> | string | null
    startTime?: DateTimeFilter<"TimeSlot"> | Date | string
    endTime?: DateTimeFilter<"TimeSlot"> | Date | string
    isAvailable?: BoolFilter<"TimeSlot"> | boolean
    previousBookings?: StringNullableListFilter<"TimeSlot">
    createdBy?: StringFilter<"TimeSlot"> | string
    createdAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedBy?: StringNullableFilter<"TimeSlot"> | string | null
    deletedAt?: DateTimeNullableFilter<"TimeSlot"> | Date | string | null
    deletedBy?: StringNullableFilter<"TimeSlot"> | string | null
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
  }, "id">

  export type TimeSlotOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    previousBookings?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: TimeSlotCountOrderByAggregateInput
    _max?: TimeSlotMaxOrderByAggregateInput
    _min?: TimeSlotMinOrderByAggregateInput
  }

  export type TimeSlotScalarWhereWithAggregatesInput = {
    AND?: TimeSlotScalarWhereWithAggregatesInput | TimeSlotScalarWhereWithAggregatesInput[]
    OR?: TimeSlotScalarWhereWithAggregatesInput[]
    NOT?: TimeSlotScalarWhereWithAggregatesInput | TimeSlotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeSlot"> | string
    serviceId?: StringWithAggregatesFilter<"TimeSlot"> | string
    serviceType?: EnumServiceTypeWithAggregatesFilter<"TimeSlot"> | $Enums.ServiceType
    bookingId?: StringNullableWithAggregatesFilter<"TimeSlot"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string
    isAvailable?: BoolWithAggregatesFilter<"TimeSlot"> | boolean
    previousBookings?: StringNullableListFilter<"TimeSlot">
    createdBy?: StringWithAggregatesFilter<"TimeSlot"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"TimeSlot"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"TimeSlot"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"TimeSlot"> | string | null
  }

  export type EventCenterBookingWhereInput = {
    AND?: EventCenterBookingWhereInput | EventCenterBookingWhereInput[]
    OR?: EventCenterBookingWhereInput[]
    NOT?: EventCenterBookingWhereInput | EventCenterBookingWhereInput[]
    id?: StringFilter<"EventCenterBooking"> | string
    eventcenterId?: StringFilter<"EventCenterBooking"> | string
    bookingId?: StringFilter<"EventCenterBooking"> | string
    eventName?: StringNullableFilter<"EventCenterBooking"> | string | null
    eventTheme?: StringNullableFilter<"EventCenterBooking"> | string | null
    eventType?: StringNullableFilter<"EventCenterBooking"> | string | null
    description?: StringNullableFilter<"EventCenterBooking"> | string | null
    noOfGuest?: IntNullableFilter<"EventCenterBooking"> | number | null
    specialRequirements?: EnumSpecialRequirementNullableListFilter<"EventCenterBooking">
    images?: StringNullableListFilter<"EventCenterBooking">
    createdAt?: DateTimeFilter<"EventCenterBooking"> | Date | string
    updatedAt?: DateTimeFilter<"EventCenterBooking"> | Date | string
    deletedAt?: DateTimeNullableFilter<"EventCenterBooking"> | Date | string | null
    deletedBy?: StringNullableFilter<"EventCenterBooking"> | string | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type EventCenterBookingOrderByWithRelationInput = {
    id?: SortOrder
    eventcenterId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrderInput | SortOrder
    eventTheme?: SortOrderInput | SortOrder
    eventType?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    noOfGuest?: SortOrderInput | SortOrder
    specialRequirements?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type EventCenterBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: EventCenterBookingWhereInput | EventCenterBookingWhereInput[]
    OR?: EventCenterBookingWhereInput[]
    NOT?: EventCenterBookingWhereInput | EventCenterBookingWhereInput[]
    eventcenterId?: StringFilter<"EventCenterBooking"> | string
    eventName?: StringNullableFilter<"EventCenterBooking"> | string | null
    eventTheme?: StringNullableFilter<"EventCenterBooking"> | string | null
    eventType?: StringNullableFilter<"EventCenterBooking"> | string | null
    description?: StringNullableFilter<"EventCenterBooking"> | string | null
    noOfGuest?: IntNullableFilter<"EventCenterBooking"> | number | null
    specialRequirements?: EnumSpecialRequirementNullableListFilter<"EventCenterBooking">
    images?: StringNullableListFilter<"EventCenterBooking">
    createdAt?: DateTimeFilter<"EventCenterBooking"> | Date | string
    updatedAt?: DateTimeFilter<"EventCenterBooking"> | Date | string
    deletedAt?: DateTimeNullableFilter<"EventCenterBooking"> | Date | string | null
    deletedBy?: StringNullableFilter<"EventCenterBooking"> | string | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id" | "bookingId">

  export type EventCenterBookingOrderByWithAggregationInput = {
    id?: SortOrder
    eventcenterId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrderInput | SortOrder
    eventTheme?: SortOrderInput | SortOrder
    eventType?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    noOfGuest?: SortOrderInput | SortOrder
    specialRequirements?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: EventCenterBookingCountOrderByAggregateInput
    _avg?: EventCenterBookingAvgOrderByAggregateInput
    _max?: EventCenterBookingMaxOrderByAggregateInput
    _min?: EventCenterBookingMinOrderByAggregateInput
    _sum?: EventCenterBookingSumOrderByAggregateInput
  }

  export type EventCenterBookingScalarWhereWithAggregatesInput = {
    AND?: EventCenterBookingScalarWhereWithAggregatesInput | EventCenterBookingScalarWhereWithAggregatesInput[]
    OR?: EventCenterBookingScalarWhereWithAggregatesInput[]
    NOT?: EventCenterBookingScalarWhereWithAggregatesInput | EventCenterBookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventCenterBooking"> | string
    eventcenterId?: StringWithAggregatesFilter<"EventCenterBooking"> | string
    bookingId?: StringWithAggregatesFilter<"EventCenterBooking"> | string
    eventName?: StringNullableWithAggregatesFilter<"EventCenterBooking"> | string | null
    eventTheme?: StringNullableWithAggregatesFilter<"EventCenterBooking"> | string | null
    eventType?: StringNullableWithAggregatesFilter<"EventCenterBooking"> | string | null
    description?: StringNullableWithAggregatesFilter<"EventCenterBooking"> | string | null
    noOfGuest?: IntNullableWithAggregatesFilter<"EventCenterBooking"> | number | null
    specialRequirements?: EnumSpecialRequirementNullableListFilter<"EventCenterBooking">
    images?: StringNullableListFilter<"EventCenterBooking">
    createdAt?: DateTimeWithAggregatesFilter<"EventCenterBooking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventCenterBooking"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"EventCenterBooking"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"EventCenterBooking"> | string | null
  }

  export type CateringBookingWhereInput = {
    AND?: CateringBookingWhereInput | CateringBookingWhereInput[]
    OR?: CateringBookingWhereInput[]
    NOT?: CateringBookingWhereInput | CateringBookingWhereInput[]
    id?: StringFilter<"CateringBooking"> | string
    cateringId?: StringFilter<"CateringBooking"> | string
    bookingId?: StringFilter<"CateringBooking"> | string
    eventName?: StringNullableFilter<"CateringBooking"> | string | null
    eventType?: StringNullableFilter<"CateringBooking"> | string | null
    dishTypes?: StringNullableListFilter<"CateringBooking">
    cuisine?: StringNullableListFilter<"CateringBooking">
    description?: StringNullableFilter<"CateringBooking"> | string | null
    noOfGuest?: IntNullableFilter<"CateringBooking"> | number | null
    specialRequirements?: EnumSpecialRequirementNullableListFilter<"CateringBooking">
    images?: StringNullableListFilter<"CateringBooking">
    createdAt?: DateTimeFilter<"CateringBooking"> | Date | string
    updatedAt?: DateTimeFilter<"CateringBooking"> | Date | string
    deletedAt?: DateTimeNullableFilter<"CateringBooking"> | Date | string | null
    deletedBy?: StringNullableFilter<"CateringBooking"> | string | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type CateringBookingOrderByWithRelationInput = {
    id?: SortOrder
    cateringId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrderInput | SortOrder
    eventType?: SortOrderInput | SortOrder
    dishTypes?: SortOrder
    cuisine?: SortOrder
    description?: SortOrderInput | SortOrder
    noOfGuest?: SortOrderInput | SortOrder
    specialRequirements?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type CateringBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: CateringBookingWhereInput | CateringBookingWhereInput[]
    OR?: CateringBookingWhereInput[]
    NOT?: CateringBookingWhereInput | CateringBookingWhereInput[]
    cateringId?: StringFilter<"CateringBooking"> | string
    eventName?: StringNullableFilter<"CateringBooking"> | string | null
    eventType?: StringNullableFilter<"CateringBooking"> | string | null
    dishTypes?: StringNullableListFilter<"CateringBooking">
    cuisine?: StringNullableListFilter<"CateringBooking">
    description?: StringNullableFilter<"CateringBooking"> | string | null
    noOfGuest?: IntNullableFilter<"CateringBooking"> | number | null
    specialRequirements?: EnumSpecialRequirementNullableListFilter<"CateringBooking">
    images?: StringNullableListFilter<"CateringBooking">
    createdAt?: DateTimeFilter<"CateringBooking"> | Date | string
    updatedAt?: DateTimeFilter<"CateringBooking"> | Date | string
    deletedAt?: DateTimeNullableFilter<"CateringBooking"> | Date | string | null
    deletedBy?: StringNullableFilter<"CateringBooking"> | string | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id" | "bookingId">

  export type CateringBookingOrderByWithAggregationInput = {
    id?: SortOrder
    cateringId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrderInput | SortOrder
    eventType?: SortOrderInput | SortOrder
    dishTypes?: SortOrder
    cuisine?: SortOrder
    description?: SortOrderInput | SortOrder
    noOfGuest?: SortOrderInput | SortOrder
    specialRequirements?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: CateringBookingCountOrderByAggregateInput
    _avg?: CateringBookingAvgOrderByAggregateInput
    _max?: CateringBookingMaxOrderByAggregateInput
    _min?: CateringBookingMinOrderByAggregateInput
    _sum?: CateringBookingSumOrderByAggregateInput
  }

  export type CateringBookingScalarWhereWithAggregatesInput = {
    AND?: CateringBookingScalarWhereWithAggregatesInput | CateringBookingScalarWhereWithAggregatesInput[]
    OR?: CateringBookingScalarWhereWithAggregatesInput[]
    NOT?: CateringBookingScalarWhereWithAggregatesInput | CateringBookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CateringBooking"> | string
    cateringId?: StringWithAggregatesFilter<"CateringBooking"> | string
    bookingId?: StringWithAggregatesFilter<"CateringBooking"> | string
    eventName?: StringNullableWithAggregatesFilter<"CateringBooking"> | string | null
    eventType?: StringNullableWithAggregatesFilter<"CateringBooking"> | string | null
    dishTypes?: StringNullableListFilter<"CateringBooking">
    cuisine?: StringNullableListFilter<"CateringBooking">
    description?: StringNullableWithAggregatesFilter<"CateringBooking"> | string | null
    noOfGuest?: IntNullableWithAggregatesFilter<"CateringBooking"> | number | null
    specialRequirements?: EnumSpecialRequirementNullableListFilter<"CateringBooking">
    images?: StringNullableListFilter<"CateringBooking">
    createdAt?: DateTimeWithAggregatesFilter<"CateringBooking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CateringBooking"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"CateringBooking"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"CateringBooking"> | string | null
  }

  export type BookingCreateInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    eventCenterBooking?: EventCenterBookingCreateNestedOneWithoutBookingInput
    cateringBooking?: CateringBookingCreateNestedOneWithoutBookingInput
    timeslot?: TimeSlotCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    eventCenterBooking?: EventCenterBookingUncheckedCreateNestedOneWithoutBookingInput
    cateringBooking?: CateringBookingUncheckedCreateNestedOneWithoutBookingInput
    timeslot?: TimeSlotUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    eventCenterBooking?: EventCenterBookingUpdateOneWithoutBookingNestedInput
    cateringBooking?: CateringBookingUpdateOneWithoutBookingNestedInput
    timeslot?: TimeSlotUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    eventCenterBooking?: EventCenterBookingUncheckedUpdateOneWithoutBookingNestedInput
    cateringBooking?: CateringBookingUncheckedUpdateOneWithoutBookingNestedInput
    timeslot?: TimeSlotUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AvailableLocationsCreateInput = {
    id?: string
    country: string
    state: string
    city?: string | null
    status: $Enums.LocationStatus
  }

  export type AvailableLocationsUncheckedCreateInput = {
    id?: string
    country: string
    state: string
    city?: string | null
    status: $Enums.LocationStatus
  }

  export type AvailableLocationsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLocationStatusFieldUpdateOperationsInput | $Enums.LocationStatus
  }

  export type AvailableLocationsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLocationStatusFieldUpdateOperationsInput | $Enums.LocationStatus
  }

  export type AvailableLocationsCreateManyInput = {
    id?: string
    country: string
    state: string
    city?: string | null
    status: $Enums.LocationStatus
  }

  export type AvailableLocationsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLocationStatusFieldUpdateOperationsInput | $Enums.LocationStatus
  }

  export type AvailableLocationsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLocationStatusFieldUpdateOperationsInput | $Enums.LocationStatus
  }

  export type TimeSlotCreateInput = {
    id?: string
    serviceId: string
    serviceType: $Enums.ServiceType
    startTime: Date | string
    endTime: Date | string
    isAvailable?: boolean
    previousBookings?: TimeSlotCreatepreviousBookingsInput | string[]
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    booking?: BookingCreateNestedOneWithoutTimeslotInput
  }

  export type TimeSlotUncheckedCreateInput = {
    id?: string
    serviceId: string
    serviceType: $Enums.ServiceType
    bookingId?: string | null
    startTime: Date | string
    endTime: Date | string
    isAvailable?: boolean
    previousBookings?: TimeSlotCreatepreviousBookingsInput | string[]
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type TimeSlotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    booking?: BookingUpdateOneWithoutTimeslotNestedInput
  }

  export type TimeSlotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeSlotCreateManyInput = {
    id?: string
    serviceId: string
    serviceType: $Enums.ServiceType
    bookingId?: string | null
    startTime: Date | string
    endTime: Date | string
    isAvailable?: boolean
    previousBookings?: TimeSlotCreatepreviousBookingsInput | string[]
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type TimeSlotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeSlotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterBookingCreateInput = {
    id?: string
    eventcenterId: string
    eventName?: string | null
    eventTheme?: string | null
    eventType?: string | null
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: EventCenterBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    booking: BookingCreateNestedOneWithoutEventCenterBookingInput
  }

  export type EventCenterBookingUncheckedCreateInput = {
    id?: string
    eventcenterId: string
    bookingId: string
    eventName?: string | null
    eventTheme?: string | null
    eventType?: string | null
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: EventCenterBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterBookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventcenterId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventTheme?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: EventCenterBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    booking?: BookingUpdateOneRequiredWithoutEventCenterBookingNestedInput
  }

  export type EventCenterBookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventcenterId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventTheme?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: EventCenterBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterBookingCreateManyInput = {
    id?: string
    eventcenterId: string
    bookingId: string
    eventName?: string | null
    eventTheme?: string | null
    eventType?: string | null
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: EventCenterBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterBookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventcenterId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventTheme?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: EventCenterBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterBookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventcenterId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventTheme?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: EventCenterBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringBookingCreateInput = {
    id?: string
    cateringId: string
    eventName?: string | null
    eventType?: string | null
    dishTypes?: CateringBookingCreatedishTypesInput | string[]
    cuisine?: CateringBookingCreatecuisineInput | string[]
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: CateringBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    booking: BookingCreateNestedOneWithoutCateringBookingInput
  }

  export type CateringBookingUncheckedCreateInput = {
    id?: string
    cateringId: string
    bookingId: string
    eventName?: string | null
    eventType?: string | null
    dishTypes?: CateringBookingCreatedishTypesInput | string[]
    cuisine?: CateringBookingCreatecuisineInput | string[]
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: CateringBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type CateringBookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringBookingUpdatedishTypesInput | string[]
    cuisine?: CateringBookingUpdatecuisineInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: CateringBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    booking?: BookingUpdateOneRequiredWithoutCateringBookingNestedInput
  }

  export type CateringBookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringBookingUpdatedishTypesInput | string[]
    cuisine?: CateringBookingUpdatecuisineInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: CateringBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringBookingCreateManyInput = {
    id?: string
    cateringId: string
    bookingId: string
    eventName?: string | null
    eventType?: string | null
    dishTypes?: CateringBookingCreatedishTypesInput | string[]
    cuisine?: CateringBookingCreatecuisineInput | string[]
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: CateringBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type CateringBookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringBookingUpdatedishTypesInput | string[]
    cuisine?: CateringBookingUpdatecuisineInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: CateringBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringBookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringBookingUpdatedishTypesInput | string[]
    cuisine?: CateringBookingUpdatecuisineInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: CateringBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumBookingSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSource | EnumBookingSourceFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSourceFilter<$PrismaModel> | $Enums.BookingSource
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EventCenterBookingNullableScalarRelationFilter = {
    is?: EventCenterBookingWhereInput | null
    isNot?: EventCenterBookingWhereInput | null
  }

  export type CateringBookingNullableScalarRelationFilter = {
    is?: CateringBookingWhereInput | null
    isNot?: CateringBookingWhereInput | null
  }

  export type TimeSlotListRelationFilter = {
    every?: TimeSlotWhereInput
    some?: TimeSlotWhereInput
    none?: TimeSlotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TimeSlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    confirmedBy?: SortOrder
    confirmedAt?: SortOrder
    servicebookingId?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    totalBeforeDiscount?: SortOrder
    discount?: SortOrder
    totalAfterDiscount?: SortOrder
    paymentStatus?: SortOrder
    status?: SortOrder
    bookingDates?: SortOrder
    isTermsAccepted?: SortOrder
    isCancellationPolicyAccepted?: SortOrder
    isLiabilityWaiverSigned?: SortOrder
    bookingReference?: SortOrder
    source?: SortOrder
    serviceNotes?: SortOrder
    customerNotes?: SortOrder
    rescheduledBy?: SortOrder
    rescheduledAt?: SortOrder
    previousDates?: SortOrder
    cancelledBy?: SortOrder
    canceledAt?: SortOrder
    cancelationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    totalBeforeDiscount?: SortOrder
    discount?: SortOrder
    totalAfterDiscount?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    confirmedBy?: SortOrder
    confirmedAt?: SortOrder
    servicebookingId?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    totalBeforeDiscount?: SortOrder
    discount?: SortOrder
    totalAfterDiscount?: SortOrder
    paymentStatus?: SortOrder
    status?: SortOrder
    isTermsAccepted?: SortOrder
    isCancellationPolicyAccepted?: SortOrder
    isLiabilityWaiverSigned?: SortOrder
    bookingReference?: SortOrder
    source?: SortOrder
    serviceNotes?: SortOrder
    customerNotes?: SortOrder
    rescheduledBy?: SortOrder
    rescheduledAt?: SortOrder
    cancelledBy?: SortOrder
    canceledAt?: SortOrder
    cancelationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    confirmedBy?: SortOrder
    confirmedAt?: SortOrder
    servicebookingId?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    totalBeforeDiscount?: SortOrder
    discount?: SortOrder
    totalAfterDiscount?: SortOrder
    paymentStatus?: SortOrder
    status?: SortOrder
    isTermsAccepted?: SortOrder
    isCancellationPolicyAccepted?: SortOrder
    isLiabilityWaiverSigned?: SortOrder
    bookingReference?: SortOrder
    source?: SortOrder
    serviceNotes?: SortOrder
    customerNotes?: SortOrder
    rescheduledBy?: SortOrder
    rescheduledAt?: SortOrder
    cancelledBy?: SortOrder
    canceledAt?: SortOrder
    cancelationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    totalBeforeDiscount?: SortOrder
    discount?: SortOrder
    totalAfterDiscount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumBookingSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSource | EnumBookingSourceFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSourceWithAggregatesFilter<$PrismaModel> | $Enums.BookingSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingSourceFilter<$PrismaModel>
    _max?: NestedEnumBookingSourceFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumLocationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationStatus | EnumLocationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationStatusFilter<$PrismaModel> | $Enums.LocationStatus
  }

  export type AvailableLocationsCountOrderByAggregateInput = {
    id?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrder
    status?: SortOrder
  }

  export type AvailableLocationsMaxOrderByAggregateInput = {
    id?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrder
    status?: SortOrder
  }

  export type AvailableLocationsMinOrderByAggregateInput = {
    id?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrder
    status?: SortOrder
  }

  export type EnumLocationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationStatus | EnumLocationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationStatusWithAggregatesFilter<$PrismaModel> | $Enums.LocationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationStatusFilter<$PrismaModel>
    _max?: NestedEnumLocationStatusFilter<$PrismaModel>
  }

  export type BookingNullableScalarRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type TimeSlotCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    bookingId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    previousBookings?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type TimeSlotMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    bookingId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type TimeSlotMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceType?: SortOrder
    bookingId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSpecialRequirementNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.SpecialRequirement[] | ListEnumSpecialRequirementFieldRefInput<$PrismaModel> | null
    has?: $Enums.SpecialRequirement | EnumSpecialRequirementFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.SpecialRequirement[] | ListEnumSpecialRequirementFieldRefInput<$PrismaModel>
    hasSome?: $Enums.SpecialRequirement[] | ListEnumSpecialRequirementFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type EventCenterBookingCountOrderByAggregateInput = {
    id?: SortOrder
    eventcenterId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrder
    eventTheme?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    noOfGuest?: SortOrder
    specialRequirements?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EventCenterBookingAvgOrderByAggregateInput = {
    noOfGuest?: SortOrder
  }

  export type EventCenterBookingMaxOrderByAggregateInput = {
    id?: SortOrder
    eventcenterId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrder
    eventTheme?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    noOfGuest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EventCenterBookingMinOrderByAggregateInput = {
    id?: SortOrder
    eventcenterId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrder
    eventTheme?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    noOfGuest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EventCenterBookingSumOrderByAggregateInput = {
    noOfGuest?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CateringBookingCountOrderByAggregateInput = {
    id?: SortOrder
    cateringId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrder
    eventType?: SortOrder
    dishTypes?: SortOrder
    cuisine?: SortOrder
    description?: SortOrder
    noOfGuest?: SortOrder
    specialRequirements?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type CateringBookingAvgOrderByAggregateInput = {
    noOfGuest?: SortOrder
  }

  export type CateringBookingMaxOrderByAggregateInput = {
    id?: SortOrder
    cateringId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    noOfGuest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type CateringBookingMinOrderByAggregateInput = {
    id?: SortOrder
    cateringId?: SortOrder
    bookingId?: SortOrder
    eventName?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    noOfGuest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type CateringBookingSumOrderByAggregateInput = {
    noOfGuest?: SortOrder
  }

  export type BookingCreatebookingDatesInput = {
    set: string[]
  }

  export type BookingCreatepreviousDatesInput = {
    set: string[]
  }

  export type EventCenterBookingCreateNestedOneWithoutBookingInput = {
    create?: XOR<EventCenterBookingCreateWithoutBookingInput, EventCenterBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: EventCenterBookingCreateOrConnectWithoutBookingInput
    connect?: EventCenterBookingWhereUniqueInput
  }

  export type CateringBookingCreateNestedOneWithoutBookingInput = {
    create?: XOR<CateringBookingCreateWithoutBookingInput, CateringBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: CateringBookingCreateOrConnectWithoutBookingInput
    connect?: CateringBookingWhereUniqueInput
  }

  export type TimeSlotCreateNestedManyWithoutBookingInput = {
    create?: XOR<TimeSlotCreateWithoutBookingInput, TimeSlotUncheckedCreateWithoutBookingInput> | TimeSlotCreateWithoutBookingInput[] | TimeSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutBookingInput | TimeSlotCreateOrConnectWithoutBookingInput[]
    createMany?: TimeSlotCreateManyBookingInputEnvelope
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
  }

  export type EventCenterBookingUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<EventCenterBookingCreateWithoutBookingInput, EventCenterBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: EventCenterBookingCreateOrConnectWithoutBookingInput
    connect?: EventCenterBookingWhereUniqueInput
  }

  export type CateringBookingUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<CateringBookingCreateWithoutBookingInput, CateringBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: CateringBookingCreateOrConnectWithoutBookingInput
    connect?: CateringBookingWhereUniqueInput
  }

  export type TimeSlotUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<TimeSlotCreateWithoutBookingInput, TimeSlotUncheckedCreateWithoutBookingInput> | TimeSlotCreateWithoutBookingInput[] | TimeSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutBookingInput | TimeSlotCreateOrConnectWithoutBookingInput[]
    createMany?: TimeSlotCreateManyBookingInputEnvelope
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type BookingUpdatebookingDatesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumBookingSourceFieldUpdateOperationsInput = {
    set?: $Enums.BookingSource
  }

  export type BookingUpdatepreviousDatesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EventCenterBookingUpdateOneWithoutBookingNestedInput = {
    create?: XOR<EventCenterBookingCreateWithoutBookingInput, EventCenterBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: EventCenterBookingCreateOrConnectWithoutBookingInput
    upsert?: EventCenterBookingUpsertWithoutBookingInput
    disconnect?: EventCenterBookingWhereInput | boolean
    delete?: EventCenterBookingWhereInput | boolean
    connect?: EventCenterBookingWhereUniqueInput
    update?: XOR<XOR<EventCenterBookingUpdateToOneWithWhereWithoutBookingInput, EventCenterBookingUpdateWithoutBookingInput>, EventCenterBookingUncheckedUpdateWithoutBookingInput>
  }

  export type CateringBookingUpdateOneWithoutBookingNestedInput = {
    create?: XOR<CateringBookingCreateWithoutBookingInput, CateringBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: CateringBookingCreateOrConnectWithoutBookingInput
    upsert?: CateringBookingUpsertWithoutBookingInput
    disconnect?: CateringBookingWhereInput | boolean
    delete?: CateringBookingWhereInput | boolean
    connect?: CateringBookingWhereUniqueInput
    update?: XOR<XOR<CateringBookingUpdateToOneWithWhereWithoutBookingInput, CateringBookingUpdateWithoutBookingInput>, CateringBookingUncheckedUpdateWithoutBookingInput>
  }

  export type TimeSlotUpdateManyWithoutBookingNestedInput = {
    create?: XOR<TimeSlotCreateWithoutBookingInput, TimeSlotUncheckedCreateWithoutBookingInput> | TimeSlotCreateWithoutBookingInput[] | TimeSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutBookingInput | TimeSlotCreateOrConnectWithoutBookingInput[]
    upsert?: TimeSlotUpsertWithWhereUniqueWithoutBookingInput | TimeSlotUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: TimeSlotCreateManyBookingInputEnvelope
    set?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    disconnect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    delete?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    update?: TimeSlotUpdateWithWhereUniqueWithoutBookingInput | TimeSlotUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: TimeSlotUpdateManyWithWhereWithoutBookingInput | TimeSlotUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
  }

  export type EventCenterBookingUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<EventCenterBookingCreateWithoutBookingInput, EventCenterBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: EventCenterBookingCreateOrConnectWithoutBookingInput
    upsert?: EventCenterBookingUpsertWithoutBookingInput
    disconnect?: EventCenterBookingWhereInput | boolean
    delete?: EventCenterBookingWhereInput | boolean
    connect?: EventCenterBookingWhereUniqueInput
    update?: XOR<XOR<EventCenterBookingUpdateToOneWithWhereWithoutBookingInput, EventCenterBookingUpdateWithoutBookingInput>, EventCenterBookingUncheckedUpdateWithoutBookingInput>
  }

  export type CateringBookingUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<CateringBookingCreateWithoutBookingInput, CateringBookingUncheckedCreateWithoutBookingInput>
    connectOrCreate?: CateringBookingCreateOrConnectWithoutBookingInput
    upsert?: CateringBookingUpsertWithoutBookingInput
    disconnect?: CateringBookingWhereInput | boolean
    delete?: CateringBookingWhereInput | boolean
    connect?: CateringBookingWhereUniqueInput
    update?: XOR<XOR<CateringBookingUpdateToOneWithWhereWithoutBookingInput, CateringBookingUpdateWithoutBookingInput>, CateringBookingUncheckedUpdateWithoutBookingInput>
  }

  export type TimeSlotUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<TimeSlotCreateWithoutBookingInput, TimeSlotUncheckedCreateWithoutBookingInput> | TimeSlotCreateWithoutBookingInput[] | TimeSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutBookingInput | TimeSlotCreateOrConnectWithoutBookingInput[]
    upsert?: TimeSlotUpsertWithWhereUniqueWithoutBookingInput | TimeSlotUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: TimeSlotCreateManyBookingInputEnvelope
    set?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    disconnect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    delete?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    update?: TimeSlotUpdateWithWhereUniqueWithoutBookingInput | TimeSlotUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: TimeSlotUpdateManyWithWhereWithoutBookingInput | TimeSlotUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
  }

  export type EnumLocationStatusFieldUpdateOperationsInput = {
    set?: $Enums.LocationStatus
  }

  export type TimeSlotCreatepreviousBookingsInput = {
    set: string[]
  }

  export type BookingCreateNestedOneWithoutTimeslotInput = {
    create?: XOR<BookingCreateWithoutTimeslotInput, BookingUncheckedCreateWithoutTimeslotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutTimeslotInput
    connect?: BookingWhereUniqueInput
  }

  export type TimeSlotUpdatepreviousBookingsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookingUpdateOneWithoutTimeslotNestedInput = {
    create?: XOR<BookingCreateWithoutTimeslotInput, BookingUncheckedCreateWithoutTimeslotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutTimeslotInput
    upsert?: BookingUpsertWithoutTimeslotInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutTimeslotInput, BookingUpdateWithoutTimeslotInput>, BookingUncheckedUpdateWithoutTimeslotInput>
  }

  export type EventCenterBookingCreatespecialRequirementsInput = {
    set: $Enums.SpecialRequirement[]
  }

  export type EventCenterBookingCreateimagesInput = {
    set: string[]
  }

  export type BookingCreateNestedOneWithoutEventCenterBookingInput = {
    create?: XOR<BookingCreateWithoutEventCenterBookingInput, BookingUncheckedCreateWithoutEventCenterBookingInput>
    connectOrCreate?: BookingCreateOrConnectWithoutEventCenterBookingInput
    connect?: BookingWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventCenterBookingUpdatespecialRequirementsInput = {
    set?: $Enums.SpecialRequirement[]
    push?: $Enums.SpecialRequirement | $Enums.SpecialRequirement[]
  }

  export type EventCenterBookingUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookingUpdateOneRequiredWithoutEventCenterBookingNestedInput = {
    create?: XOR<BookingCreateWithoutEventCenterBookingInput, BookingUncheckedCreateWithoutEventCenterBookingInput>
    connectOrCreate?: BookingCreateOrConnectWithoutEventCenterBookingInput
    upsert?: BookingUpsertWithoutEventCenterBookingInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutEventCenterBookingInput, BookingUpdateWithoutEventCenterBookingInput>, BookingUncheckedUpdateWithoutEventCenterBookingInput>
  }

  export type CateringBookingCreatedishTypesInput = {
    set: string[]
  }

  export type CateringBookingCreatecuisineInput = {
    set: string[]
  }

  export type CateringBookingCreatespecialRequirementsInput = {
    set: $Enums.SpecialRequirement[]
  }

  export type CateringBookingCreateimagesInput = {
    set: string[]
  }

  export type BookingCreateNestedOneWithoutCateringBookingInput = {
    create?: XOR<BookingCreateWithoutCateringBookingInput, BookingUncheckedCreateWithoutCateringBookingInput>
    connectOrCreate?: BookingCreateOrConnectWithoutCateringBookingInput
    connect?: BookingWhereUniqueInput
  }

  export type CateringBookingUpdatedishTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CateringBookingUpdatecuisineInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CateringBookingUpdatespecialRequirementsInput = {
    set?: $Enums.SpecialRequirement[]
    push?: $Enums.SpecialRequirement | $Enums.SpecialRequirement[]
  }

  export type CateringBookingUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookingUpdateOneRequiredWithoutCateringBookingNestedInput = {
    create?: XOR<BookingCreateWithoutCateringBookingInput, BookingUncheckedCreateWithoutCateringBookingInput>
    connectOrCreate?: BookingCreateOrConnectWithoutCateringBookingInput
    upsert?: BookingUpsertWithoutCateringBookingInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutCateringBookingInput, BookingUpdateWithoutCateringBookingInput>, BookingUncheckedUpdateWithoutCateringBookingInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumBookingSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSource | EnumBookingSourceFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSourceFilter<$PrismaModel> | $Enums.BookingSource
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumBookingSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSource | EnumBookingSourceFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSource[] | ListEnumBookingSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSourceWithAggregatesFilter<$PrismaModel> | $Enums.BookingSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingSourceFilter<$PrismaModel>
    _max?: NestedEnumBookingSourceFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumLocationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationStatus | EnumLocationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationStatusFilter<$PrismaModel> | $Enums.LocationStatus
  }

  export type NestedEnumLocationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationStatus | EnumLocationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationStatus[] | ListEnumLocationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationStatusWithAggregatesFilter<$PrismaModel> | $Enums.LocationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationStatusFilter<$PrismaModel>
    _max?: NestedEnumLocationStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EventCenterBookingCreateWithoutBookingInput = {
    id?: string
    eventcenterId: string
    eventName?: string | null
    eventTheme?: string | null
    eventType?: string | null
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: EventCenterBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterBookingUncheckedCreateWithoutBookingInput = {
    id?: string
    eventcenterId: string
    eventName?: string | null
    eventTheme?: string | null
    eventType?: string | null
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: EventCenterBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterBookingCreateOrConnectWithoutBookingInput = {
    where: EventCenterBookingWhereUniqueInput
    create: XOR<EventCenterBookingCreateWithoutBookingInput, EventCenterBookingUncheckedCreateWithoutBookingInput>
  }

  export type CateringBookingCreateWithoutBookingInput = {
    id?: string
    cateringId: string
    eventName?: string | null
    eventType?: string | null
    dishTypes?: CateringBookingCreatedishTypesInput | string[]
    cuisine?: CateringBookingCreatecuisineInput | string[]
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: CateringBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type CateringBookingUncheckedCreateWithoutBookingInput = {
    id?: string
    cateringId: string
    eventName?: string | null
    eventType?: string | null
    dishTypes?: CateringBookingCreatedishTypesInput | string[]
    cuisine?: CateringBookingCreatecuisineInput | string[]
    description?: string | null
    noOfGuest?: number | null
    specialRequirements?: CateringBookingCreatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type CateringBookingCreateOrConnectWithoutBookingInput = {
    where: CateringBookingWhereUniqueInput
    create: XOR<CateringBookingCreateWithoutBookingInput, CateringBookingUncheckedCreateWithoutBookingInput>
  }

  export type TimeSlotCreateWithoutBookingInput = {
    id?: string
    serviceId: string
    serviceType: $Enums.ServiceType
    startTime: Date | string
    endTime: Date | string
    isAvailable?: boolean
    previousBookings?: TimeSlotCreatepreviousBookingsInput | string[]
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type TimeSlotUncheckedCreateWithoutBookingInput = {
    id?: string
    serviceId: string
    serviceType: $Enums.ServiceType
    startTime: Date | string
    endTime: Date | string
    isAvailable?: boolean
    previousBookings?: TimeSlotCreatepreviousBookingsInput | string[]
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type TimeSlotCreateOrConnectWithoutBookingInput = {
    where: TimeSlotWhereUniqueInput
    create: XOR<TimeSlotCreateWithoutBookingInput, TimeSlotUncheckedCreateWithoutBookingInput>
  }

  export type TimeSlotCreateManyBookingInputEnvelope = {
    data: TimeSlotCreateManyBookingInput | TimeSlotCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type EventCenterBookingUpsertWithoutBookingInput = {
    update: XOR<EventCenterBookingUpdateWithoutBookingInput, EventCenterBookingUncheckedUpdateWithoutBookingInput>
    create: XOR<EventCenterBookingCreateWithoutBookingInput, EventCenterBookingUncheckedCreateWithoutBookingInput>
    where?: EventCenterBookingWhereInput
  }

  export type EventCenterBookingUpdateToOneWithWhereWithoutBookingInput = {
    where?: EventCenterBookingWhereInput
    data: XOR<EventCenterBookingUpdateWithoutBookingInput, EventCenterBookingUncheckedUpdateWithoutBookingInput>
  }

  export type EventCenterBookingUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventcenterId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventTheme?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: EventCenterBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterBookingUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventcenterId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventTheme?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: EventCenterBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: EventCenterBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringBookingUpsertWithoutBookingInput = {
    update: XOR<CateringBookingUpdateWithoutBookingInput, CateringBookingUncheckedUpdateWithoutBookingInput>
    create: XOR<CateringBookingCreateWithoutBookingInput, CateringBookingUncheckedCreateWithoutBookingInput>
    where?: CateringBookingWhereInput
  }

  export type CateringBookingUpdateToOneWithWhereWithoutBookingInput = {
    where?: CateringBookingWhereInput
    data: XOR<CateringBookingUpdateWithoutBookingInput, CateringBookingUncheckedUpdateWithoutBookingInput>
  }

  export type CateringBookingUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringBookingUpdatedishTypesInput | string[]
    cuisine?: CateringBookingUpdatecuisineInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: CateringBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringBookingUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringBookingUpdatedishTypesInput | string[]
    cuisine?: CateringBookingUpdatecuisineInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    noOfGuest?: NullableIntFieldUpdateOperationsInput | number | null
    specialRequirements?: CateringBookingUpdatespecialRequirementsInput | $Enums.SpecialRequirement[]
    images?: CateringBookingUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeSlotUpsertWithWhereUniqueWithoutBookingInput = {
    where: TimeSlotWhereUniqueInput
    update: XOR<TimeSlotUpdateWithoutBookingInput, TimeSlotUncheckedUpdateWithoutBookingInput>
    create: XOR<TimeSlotCreateWithoutBookingInput, TimeSlotUncheckedCreateWithoutBookingInput>
  }

  export type TimeSlotUpdateWithWhereUniqueWithoutBookingInput = {
    where: TimeSlotWhereUniqueInput
    data: XOR<TimeSlotUpdateWithoutBookingInput, TimeSlotUncheckedUpdateWithoutBookingInput>
  }

  export type TimeSlotUpdateManyWithWhereWithoutBookingInput = {
    where: TimeSlotScalarWhereInput
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyWithoutBookingInput>
  }

  export type TimeSlotScalarWhereInput = {
    AND?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
    OR?: TimeSlotScalarWhereInput[]
    NOT?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
    id?: StringFilter<"TimeSlot"> | string
    serviceId?: StringFilter<"TimeSlot"> | string
    serviceType?: EnumServiceTypeFilter<"TimeSlot"> | $Enums.ServiceType
    bookingId?: StringNullableFilter<"TimeSlot"> | string | null
    startTime?: DateTimeFilter<"TimeSlot"> | Date | string
    endTime?: DateTimeFilter<"TimeSlot"> | Date | string
    isAvailable?: BoolFilter<"TimeSlot"> | boolean
    previousBookings?: StringNullableListFilter<"TimeSlot">
    createdBy?: StringFilter<"TimeSlot"> | string
    createdAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedBy?: StringNullableFilter<"TimeSlot"> | string | null
    deletedAt?: DateTimeNullableFilter<"TimeSlot"> | Date | string | null
    deletedBy?: StringNullableFilter<"TimeSlot"> | string | null
  }

  export type BookingCreateWithoutTimeslotInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    eventCenterBooking?: EventCenterBookingCreateNestedOneWithoutBookingInput
    cateringBooking?: CateringBookingCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutTimeslotInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    eventCenterBooking?: EventCenterBookingUncheckedCreateNestedOneWithoutBookingInput
    cateringBooking?: CateringBookingUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutTimeslotInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutTimeslotInput, BookingUncheckedCreateWithoutTimeslotInput>
  }

  export type BookingUpsertWithoutTimeslotInput = {
    update: XOR<BookingUpdateWithoutTimeslotInput, BookingUncheckedUpdateWithoutTimeslotInput>
    create: XOR<BookingCreateWithoutTimeslotInput, BookingUncheckedCreateWithoutTimeslotInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutTimeslotInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutTimeslotInput, BookingUncheckedUpdateWithoutTimeslotInput>
  }

  export type BookingUpdateWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    eventCenterBooking?: EventCenterBookingUpdateOneWithoutBookingNestedInput
    cateringBooking?: CateringBookingUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    eventCenterBooking?: EventCenterBookingUncheckedUpdateOneWithoutBookingNestedInput
    cateringBooking?: CateringBookingUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateWithoutEventCenterBookingInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    cateringBooking?: CateringBookingCreateNestedOneWithoutBookingInput
    timeslot?: TimeSlotCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutEventCenterBookingInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    cateringBooking?: CateringBookingUncheckedCreateNestedOneWithoutBookingInput
    timeslot?: TimeSlotUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutEventCenterBookingInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutEventCenterBookingInput, BookingUncheckedCreateWithoutEventCenterBookingInput>
  }

  export type BookingUpsertWithoutEventCenterBookingInput = {
    update: XOR<BookingUpdateWithoutEventCenterBookingInput, BookingUncheckedUpdateWithoutEventCenterBookingInput>
    create: XOR<BookingCreateWithoutEventCenterBookingInput, BookingUncheckedCreateWithoutEventCenterBookingInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutEventCenterBookingInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutEventCenterBookingInput, BookingUncheckedUpdateWithoutEventCenterBookingInput>
  }

  export type BookingUpdateWithoutEventCenterBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cateringBooking?: CateringBookingUpdateOneWithoutBookingNestedInput
    timeslot?: TimeSlotUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutEventCenterBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cateringBooking?: CateringBookingUncheckedUpdateOneWithoutBookingNestedInput
    timeslot?: TimeSlotUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateWithoutCateringBookingInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    eventCenterBooking?: EventCenterBookingCreateNestedOneWithoutBookingInput
    timeslot?: TimeSlotCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutCateringBookingInput = {
    id?: string
    customerId: string
    confirmedBy?: string | null
    confirmedAt?: Date | string | null
    servicebookingId?: string | null
    serviceId: string
    serviceType: $Enums.ServiceType
    totalBeforeDiscount: number
    discount?: number | null
    totalAfterDiscount: number
    paymentStatus: $Enums.PaymentStatus
    status: $Enums.BookingStatus
    bookingDates?: BookingCreatebookingDatesInput | string[]
    isTermsAccepted: boolean
    isCancellationPolicyAccepted: boolean
    isLiabilityWaiverSigned: boolean
    bookingReference: string
    source: $Enums.BookingSource
    serviceNotes?: string | null
    customerNotes?: string | null
    rescheduledBy?: string | null
    rescheduledAt?: Date | string | null
    previousDates?: BookingCreatepreviousDatesInput | string[]
    cancelledBy?: string | null
    canceledAt?: Date | string | null
    cancelationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    eventCenterBooking?: EventCenterBookingUncheckedCreateNestedOneWithoutBookingInput
    timeslot?: TimeSlotUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutCateringBookingInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCateringBookingInput, BookingUncheckedCreateWithoutCateringBookingInput>
  }

  export type BookingUpsertWithoutCateringBookingInput = {
    update: XOR<BookingUpdateWithoutCateringBookingInput, BookingUncheckedUpdateWithoutCateringBookingInput>
    create: XOR<BookingCreateWithoutCateringBookingInput, BookingUncheckedCreateWithoutCateringBookingInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutCateringBookingInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutCateringBookingInput, BookingUncheckedUpdateWithoutCateringBookingInput>
  }

  export type BookingUpdateWithoutCateringBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    eventCenterBooking?: EventCenterBookingUpdateOneWithoutBookingNestedInput
    timeslot?: TimeSlotUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutCateringBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servicebookingId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    totalBeforeDiscount?: FloatFieldUpdateOperationsInput | number
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalAfterDiscount?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDates?: BookingUpdatebookingDatesInput | string[]
    isTermsAccepted?: BoolFieldUpdateOperationsInput | boolean
    isCancellationPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    isLiabilityWaiverSigned?: BoolFieldUpdateOperationsInput | boolean
    bookingReference?: StringFieldUpdateOperationsInput | string
    source?: EnumBookingSourceFieldUpdateOperationsInput | $Enums.BookingSource
    serviceNotes?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledBy?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousDates?: BookingUpdatepreviousDatesInput | string[]
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    eventCenterBooking?: EventCenterBookingUncheckedUpdateOneWithoutBookingNestedInput
    timeslot?: TimeSlotUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type TimeSlotCreateManyBookingInput = {
    id?: string
    serviceId: string
    serviceType: $Enums.ServiceType
    startTime: Date | string
    endTime: Date | string
    isAvailable?: boolean
    previousBookings?: TimeSlotCreatepreviousBookingsInput | string[]
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type TimeSlotUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeSlotUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeSlotUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    previousBookings?: TimeSlotUpdatepreviousBookingsInput | string[]
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}