
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
 * Model EventCenter
 * 
 */
export type EventCenter = $Result.DefaultSelection<Prisma.$EventCenterPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ServiceStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]


export const Amenities: {
  WIFI: 'WIFI',
  PACKINGSPACE: 'PACKINGSPACE',
  SECURITY: 'SECURITY'
};

export type Amenities = (typeof Amenities)[keyof typeof Amenities]


export const EventType: {
  WEDDING: 'WEDDING',
  CONFERENCE: 'CONFERENCE',
  SEMINAR: 'SEMINAR',
  CONCERT: 'CONCERT'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const BookingStatus: {
  SCHEDULED: 'SCHEDULED',
  POSTPONED: 'POSTPONED',
  CANCELED: 'CANCELED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  SCHEDULED: 'SCHEDULED',
  POSTPONED: 'POSTPONED',
  CANCELED: 'CANCELED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

export type Amenities = $Enums.Amenities

export const Amenities: typeof $Enums.Amenities

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more EventCenters
 * const eventCenters = await prisma.eventCenter.findMany()
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
   * // Fetch zero or more EventCenters
   * const eventCenters = await prisma.eventCenter.findMany()
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
   * `prisma.eventCenter`: Exposes CRUD operations for the **EventCenter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventCenters
    * const eventCenters = await prisma.eventCenter.findMany()
    * ```
    */
  get eventCenter(): Prisma.EventCenterDelegate<ExtArgs, ClientOptions>;
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
    EventCenter: 'EventCenter'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    banquestproeventsdb?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "eventCenter"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      EventCenter: {
        payload: Prisma.$EventCenterPayload<ExtArgs>
        fields: Prisma.EventCenterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventCenterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventCenterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>
          }
          findFirst: {
            args: Prisma.EventCenterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventCenterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>
          }
          findMany: {
            args: Prisma.EventCenterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>[]
          }
          create: {
            args: Prisma.EventCenterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>
          }
          createMany: {
            args: Prisma.EventCenterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCenterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>[]
          }
          delete: {
            args: Prisma.EventCenterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>
          }
          update: {
            args: Prisma.EventCenterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>
          }
          deleteMany: {
            args: Prisma.EventCenterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventCenterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventCenterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>[]
          }
          upsert: {
            args: Prisma.EventCenterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventCenterPayload>
          }
          aggregate: {
            args: Prisma.EventCenterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventCenter>
          }
          groupBy: {
            args: Prisma.EventCenterGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventCenterGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCenterCountArgs<ExtArgs>
            result: $Utils.Optional<EventCenterCountAggregateOutputType> | number
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
    eventCenter?: EventCenterOmit
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
   * Models
   */

  /**
   * Model EventCenter
   */

  export type AggregateEventCenter = {
    _count: EventCenterCountAggregateOutputType | null
    _avg: EventCenterAvgAggregateOutputType | null
    _sum: EventCenterSumAggregateOutputType | null
    _min: EventCenterMinAggregateOutputType | null
    _max: EventCenterMaxAggregateOutputType | null
  }

  export type EventCenterAvgAggregateOutputType = {
    depositAmount: number | null
    pricingPerSlot: number | null
    sittingCapacity: number | null
    rating: Decimal | null
  }

  export type EventCenterSumAggregateOutputType = {
    depositAmount: number | null
    pricingPerSlot: number | null
    sittingCapacity: number | null
    rating: Decimal | null
  }

  export type EventCenterMinAggregateOutputType = {
    id: string | null
    name: string | null
    serviceProviderId: string | null
    depositAmount: number | null
    description: string | null
    pricingPerSlot: number | null
    sittingCapacity: number | null
    venueLayout: string | null
    termsOfUse: string | null
    cancellationPolicy: string | null
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    location: string | null
    postal: string | null
    status: $Enums.ServiceStatus | null
    paymentRequired: boolean | null
    rating: Decimal | null
    contact: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type EventCenterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    serviceProviderId: string | null
    depositAmount: number | null
    description: string | null
    pricingPerSlot: number | null
    sittingCapacity: number | null
    venueLayout: string | null
    termsOfUse: string | null
    cancellationPolicy: string | null
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    location: string | null
    postal: string | null
    status: $Enums.ServiceStatus | null
    paymentRequired: boolean | null
    rating: Decimal | null
    contact: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type EventCenterCountAggregateOutputType = {
    id: number
    name: number
    eventTypes: number
    serviceProviderId: number
    depositAmount: number
    description: number
    pricingPerSlot: number
    sittingCapacity: number
    venueLayout: number
    amenities: number
    images: number
    termsOfUse: number
    cancellationPolicy: number
    streetAddress: number
    streetAddress2: number
    city: number
    location: number
    postal: number
    status: number
    paymentRequired: number
    rating: number
    contact: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type EventCenterAvgAggregateInputType = {
    depositAmount?: true
    pricingPerSlot?: true
    sittingCapacity?: true
    rating?: true
  }

  export type EventCenterSumAggregateInputType = {
    depositAmount?: true
    pricingPerSlot?: true
    sittingCapacity?: true
    rating?: true
  }

  export type EventCenterMinAggregateInputType = {
    id?: true
    name?: true
    serviceProviderId?: true
    depositAmount?: true
    description?: true
    pricingPerSlot?: true
    sittingCapacity?: true
    venueLayout?: true
    termsOfUse?: true
    cancellationPolicy?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    location?: true
    postal?: true
    status?: true
    paymentRequired?: true
    rating?: true
    contact?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type EventCenterMaxAggregateInputType = {
    id?: true
    name?: true
    serviceProviderId?: true
    depositAmount?: true
    description?: true
    pricingPerSlot?: true
    sittingCapacity?: true
    venueLayout?: true
    termsOfUse?: true
    cancellationPolicy?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    location?: true
    postal?: true
    status?: true
    paymentRequired?: true
    rating?: true
    contact?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type EventCenterCountAggregateInputType = {
    id?: true
    name?: true
    eventTypes?: true
    serviceProviderId?: true
    depositAmount?: true
    description?: true
    pricingPerSlot?: true
    sittingCapacity?: true
    venueLayout?: true
    amenities?: true
    images?: true
    termsOfUse?: true
    cancellationPolicy?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    location?: true
    postal?: true
    status?: true
    paymentRequired?: true
    rating?: true
    contact?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type EventCenterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventCenter to aggregate.
     */
    where?: EventCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenters to fetch.
     */
    orderBy?: EventCenterOrderByWithRelationInput | EventCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventCenters
    **/
    _count?: true | EventCenterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventCenterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventCenterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventCenterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventCenterMaxAggregateInputType
  }

  export type GetEventCenterAggregateType<T extends EventCenterAggregateArgs> = {
        [P in keyof T & keyof AggregateEventCenter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventCenter[P]>
      : GetScalarType<T[P], AggregateEventCenter[P]>
  }




  export type EventCenterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventCenterWhereInput
    orderBy?: EventCenterOrderByWithAggregationInput | EventCenterOrderByWithAggregationInput[]
    by: EventCenterScalarFieldEnum[] | EventCenterScalarFieldEnum
    having?: EventCenterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCenterCountAggregateInputType | true
    _avg?: EventCenterAvgAggregateInputType
    _sum?: EventCenterSumAggregateInputType
    _min?: EventCenterMinAggregateInputType
    _max?: EventCenterMaxAggregateInputType
  }

  export type EventCenterGroupByOutputType = {
    id: string
    name: string
    eventTypes: string[]
    serviceProviderId: string
    depositAmount: number
    description: string | null
    pricingPerSlot: number
    sittingCapacity: number
    venueLayout: string | null
    amenities: $Enums.Amenities[]
    images: string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location: string
    postal: string
    status: $Enums.ServiceStatus
    paymentRequired: boolean | null
    rating: Decimal | null
    contact: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    deletedBy: string | null
    _count: EventCenterCountAggregateOutputType | null
    _avg: EventCenterAvgAggregateOutputType | null
    _sum: EventCenterSumAggregateOutputType | null
    _min: EventCenterMinAggregateOutputType | null
    _max: EventCenterMaxAggregateOutputType | null
  }

  type GetEventCenterGroupByPayload<T extends EventCenterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventCenterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventCenterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventCenterGroupByOutputType[P]>
            : GetScalarType<T[P], EventCenterGroupByOutputType[P]>
        }
      >
    >


  export type EventCenterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    depositAmount?: boolean
    description?: boolean
    pricingPerSlot?: boolean
    sittingCapacity?: boolean
    venueLayout?: boolean
    amenities?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    paymentRequired?: boolean
    rating?: boolean
    contact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["eventCenter"]>

  export type EventCenterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    depositAmount?: boolean
    description?: boolean
    pricingPerSlot?: boolean
    sittingCapacity?: boolean
    venueLayout?: boolean
    amenities?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    paymentRequired?: boolean
    rating?: boolean
    contact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["eventCenter"]>

  export type EventCenterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    depositAmount?: boolean
    description?: boolean
    pricingPerSlot?: boolean
    sittingCapacity?: boolean
    venueLayout?: boolean
    amenities?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    paymentRequired?: boolean
    rating?: boolean
    contact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["eventCenter"]>

  export type EventCenterSelectScalar = {
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    depositAmount?: boolean
    description?: boolean
    pricingPerSlot?: boolean
    sittingCapacity?: boolean
    venueLayout?: boolean
    amenities?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    paymentRequired?: boolean
    rating?: boolean
    contact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type EventCenterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "eventTypes" | "serviceProviderId" | "depositAmount" | "description" | "pricingPerSlot" | "sittingCapacity" | "venueLayout" | "amenities" | "images" | "termsOfUse" | "cancellationPolicy" | "streetAddress" | "streetAddress2" | "city" | "location" | "postal" | "status" | "paymentRequired" | "rating" | "contact" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy", ExtArgs["result"]["eventCenter"]>

  export type $EventCenterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventCenter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      eventTypes: string[]
      serviceProviderId: string
      depositAmount: number
      description: string | null
      pricingPerSlot: number
      sittingCapacity: number
      venueLayout: string | null
      amenities: $Enums.Amenities[]
      images: string[]
      termsOfUse: string
      cancellationPolicy: string
      streetAddress: string
      streetAddress2: string
      city: string
      location: string
      postal: string
      status: $Enums.ServiceStatus
      paymentRequired: boolean | null
      rating: Prisma.Decimal | null
      contact: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["eventCenter"]>
    composites: {}
  }

  type EventCenterGetPayload<S extends boolean | null | undefined | EventCenterDefaultArgs> = $Result.GetResult<Prisma.$EventCenterPayload, S>

  type EventCenterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventCenterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCenterCountAggregateInputType | true
    }

  export interface EventCenterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventCenter'], meta: { name: 'EventCenter' } }
    /**
     * Find zero or one EventCenter that matches the filter.
     * @param {EventCenterFindUniqueArgs} args - Arguments to find a EventCenter
     * @example
     * // Get one EventCenter
     * const eventCenter = await prisma.eventCenter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventCenterFindUniqueArgs>(args: SelectSubset<T, EventCenterFindUniqueArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventCenter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventCenterFindUniqueOrThrowArgs} args - Arguments to find a EventCenter
     * @example
     * // Get one EventCenter
     * const eventCenter = await prisma.eventCenter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventCenterFindUniqueOrThrowArgs>(args: SelectSubset<T, EventCenterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCenter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterFindFirstArgs} args - Arguments to find a EventCenter
     * @example
     * // Get one EventCenter
     * const eventCenter = await prisma.eventCenter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventCenterFindFirstArgs>(args?: SelectSubset<T, EventCenterFindFirstArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCenter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterFindFirstOrThrowArgs} args - Arguments to find a EventCenter
     * @example
     * // Get one EventCenter
     * const eventCenter = await prisma.eventCenter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventCenterFindFirstOrThrowArgs>(args?: SelectSubset<T, EventCenterFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventCenters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventCenters
     * const eventCenters = await prisma.eventCenter.findMany()
     * 
     * // Get first 10 EventCenters
     * const eventCenters = await prisma.eventCenter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventCenterWithIdOnly = await prisma.eventCenter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventCenterFindManyArgs>(args?: SelectSubset<T, EventCenterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventCenter.
     * @param {EventCenterCreateArgs} args - Arguments to create a EventCenter.
     * @example
     * // Create one EventCenter
     * const EventCenter = await prisma.eventCenter.create({
     *   data: {
     *     // ... data to create a EventCenter
     *   }
     * })
     * 
     */
    create<T extends EventCenterCreateArgs>(args: SelectSubset<T, EventCenterCreateArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventCenters.
     * @param {EventCenterCreateManyArgs} args - Arguments to create many EventCenters.
     * @example
     * // Create many EventCenters
     * const eventCenter = await prisma.eventCenter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCenterCreateManyArgs>(args?: SelectSubset<T, EventCenterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventCenters and returns the data saved in the database.
     * @param {EventCenterCreateManyAndReturnArgs} args - Arguments to create many EventCenters.
     * @example
     * // Create many EventCenters
     * const eventCenter = await prisma.eventCenter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventCenters and only return the `id`
     * const eventCenterWithIdOnly = await prisma.eventCenter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCenterCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCenterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventCenter.
     * @param {EventCenterDeleteArgs} args - Arguments to delete one EventCenter.
     * @example
     * // Delete one EventCenter
     * const EventCenter = await prisma.eventCenter.delete({
     *   where: {
     *     // ... filter to delete one EventCenter
     *   }
     * })
     * 
     */
    delete<T extends EventCenterDeleteArgs>(args: SelectSubset<T, EventCenterDeleteArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventCenter.
     * @param {EventCenterUpdateArgs} args - Arguments to update one EventCenter.
     * @example
     * // Update one EventCenter
     * const eventCenter = await prisma.eventCenter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventCenterUpdateArgs>(args: SelectSubset<T, EventCenterUpdateArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventCenters.
     * @param {EventCenterDeleteManyArgs} args - Arguments to filter EventCenters to delete.
     * @example
     * // Delete a few EventCenters
     * const { count } = await prisma.eventCenter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventCenterDeleteManyArgs>(args?: SelectSubset<T, EventCenterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCenters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventCenters
     * const eventCenter = await prisma.eventCenter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventCenterUpdateManyArgs>(args: SelectSubset<T, EventCenterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCenters and returns the data updated in the database.
     * @param {EventCenterUpdateManyAndReturnArgs} args - Arguments to update many EventCenters.
     * @example
     * // Update many EventCenters
     * const eventCenter = await prisma.eventCenter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventCenters and only return the `id`
     * const eventCenterWithIdOnly = await prisma.eventCenter.updateManyAndReturn({
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
    updateManyAndReturn<T extends EventCenterUpdateManyAndReturnArgs>(args: SelectSubset<T, EventCenterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventCenter.
     * @param {EventCenterUpsertArgs} args - Arguments to update or create a EventCenter.
     * @example
     * // Update or create a EventCenter
     * const eventCenter = await prisma.eventCenter.upsert({
     *   create: {
     *     // ... data to create a EventCenter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventCenter we want to update
     *   }
     * })
     */
    upsert<T extends EventCenterUpsertArgs>(args: SelectSubset<T, EventCenterUpsertArgs<ExtArgs>>): Prisma__EventCenterClient<$Result.GetResult<Prisma.$EventCenterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventCenters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterCountArgs} args - Arguments to filter EventCenters to count.
     * @example
     * // Count the number of EventCenters
     * const count = await prisma.eventCenter.count({
     *   where: {
     *     // ... the filter for the EventCenters we want to count
     *   }
     * })
    **/
    count<T extends EventCenterCountArgs>(
      args?: Subset<T, EventCenterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCenterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventCenter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventCenterAggregateArgs>(args: Subset<T, EventCenterAggregateArgs>): Prisma.PrismaPromise<GetEventCenterAggregateType<T>>

    /**
     * Group by EventCenter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCenterGroupByArgs} args - Group by arguments.
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
      T extends EventCenterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventCenterGroupByArgs['orderBy'] }
        : { orderBy?: EventCenterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventCenterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventCenterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventCenter model
   */
  readonly fields: EventCenterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventCenter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventCenterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EventCenter model
   */
  interface EventCenterFieldRefs {
    readonly id: FieldRef<"EventCenter", 'String'>
    readonly name: FieldRef<"EventCenter", 'String'>
    readonly eventTypes: FieldRef<"EventCenter", 'String[]'>
    readonly serviceProviderId: FieldRef<"EventCenter", 'String'>
    readonly depositAmount: FieldRef<"EventCenter", 'Float'>
    readonly description: FieldRef<"EventCenter", 'String'>
    readonly pricingPerSlot: FieldRef<"EventCenter", 'Float'>
    readonly sittingCapacity: FieldRef<"EventCenter", 'Int'>
    readonly venueLayout: FieldRef<"EventCenter", 'String'>
    readonly amenities: FieldRef<"EventCenter", 'Amenities[]'>
    readonly images: FieldRef<"EventCenter", 'String[]'>
    readonly termsOfUse: FieldRef<"EventCenter", 'String'>
    readonly cancellationPolicy: FieldRef<"EventCenter", 'String'>
    readonly streetAddress: FieldRef<"EventCenter", 'String'>
    readonly streetAddress2: FieldRef<"EventCenter", 'String'>
    readonly city: FieldRef<"EventCenter", 'String'>
    readonly location: FieldRef<"EventCenter", 'String'>
    readonly postal: FieldRef<"EventCenter", 'String'>
    readonly status: FieldRef<"EventCenter", 'ServiceStatus'>
    readonly paymentRequired: FieldRef<"EventCenter", 'Boolean'>
    readonly rating: FieldRef<"EventCenter", 'Decimal'>
    readonly contact: FieldRef<"EventCenter", 'String'>
    readonly createdAt: FieldRef<"EventCenter", 'DateTime'>
    readonly updatedAt: FieldRef<"EventCenter", 'DateTime'>
    readonly deletedAt: FieldRef<"EventCenter", 'DateTime'>
    readonly deletedBy: FieldRef<"EventCenter", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EventCenter findUnique
   */
  export type EventCenterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * Filter, which EventCenter to fetch.
     */
    where: EventCenterWhereUniqueInput
  }

  /**
   * EventCenter findUniqueOrThrow
   */
  export type EventCenterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * Filter, which EventCenter to fetch.
     */
    where: EventCenterWhereUniqueInput
  }

  /**
   * EventCenter findFirst
   */
  export type EventCenterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * Filter, which EventCenter to fetch.
     */
    where?: EventCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenters to fetch.
     */
    orderBy?: EventCenterOrderByWithRelationInput | EventCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventCenters.
     */
    cursor?: EventCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventCenters.
     */
    distinct?: EventCenterScalarFieldEnum | EventCenterScalarFieldEnum[]
  }

  /**
   * EventCenter findFirstOrThrow
   */
  export type EventCenterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * Filter, which EventCenter to fetch.
     */
    where?: EventCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenters to fetch.
     */
    orderBy?: EventCenterOrderByWithRelationInput | EventCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventCenters.
     */
    cursor?: EventCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventCenters.
     */
    distinct?: EventCenterScalarFieldEnum | EventCenterScalarFieldEnum[]
  }

  /**
   * EventCenter findMany
   */
  export type EventCenterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * Filter, which EventCenters to fetch.
     */
    where?: EventCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventCenters to fetch.
     */
    orderBy?: EventCenterOrderByWithRelationInput | EventCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventCenters.
     */
    cursor?: EventCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventCenters.
     */
    skip?: number
    distinct?: EventCenterScalarFieldEnum | EventCenterScalarFieldEnum[]
  }

  /**
   * EventCenter create
   */
  export type EventCenterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * The data needed to create a EventCenter.
     */
    data: XOR<EventCenterCreateInput, EventCenterUncheckedCreateInput>
  }

  /**
   * EventCenter createMany
   */
  export type EventCenterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventCenters.
     */
    data: EventCenterCreateManyInput | EventCenterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventCenter createManyAndReturn
   */
  export type EventCenterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * The data used to create many EventCenters.
     */
    data: EventCenterCreateManyInput | EventCenterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventCenter update
   */
  export type EventCenterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * The data needed to update a EventCenter.
     */
    data: XOR<EventCenterUpdateInput, EventCenterUncheckedUpdateInput>
    /**
     * Choose, which EventCenter to update.
     */
    where: EventCenterWhereUniqueInput
  }

  /**
   * EventCenter updateMany
   */
  export type EventCenterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventCenters.
     */
    data: XOR<EventCenterUpdateManyMutationInput, EventCenterUncheckedUpdateManyInput>
    /**
     * Filter which EventCenters to update
     */
    where?: EventCenterWhereInput
    /**
     * Limit how many EventCenters to update.
     */
    limit?: number
  }

  /**
   * EventCenter updateManyAndReturn
   */
  export type EventCenterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * The data used to update EventCenters.
     */
    data: XOR<EventCenterUpdateManyMutationInput, EventCenterUncheckedUpdateManyInput>
    /**
     * Filter which EventCenters to update
     */
    where?: EventCenterWhereInput
    /**
     * Limit how many EventCenters to update.
     */
    limit?: number
  }

  /**
   * EventCenter upsert
   */
  export type EventCenterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * The filter to search for the EventCenter to update in case it exists.
     */
    where: EventCenterWhereUniqueInput
    /**
     * In case the EventCenter found by the `where` argument doesn't exist, create a new EventCenter with this data.
     */
    create: XOR<EventCenterCreateInput, EventCenterUncheckedCreateInput>
    /**
     * In case the EventCenter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventCenterUpdateInput, EventCenterUncheckedUpdateInput>
  }

  /**
   * EventCenter delete
   */
  export type EventCenterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
    /**
     * Filter which EventCenter to delete.
     */
    where: EventCenterWhereUniqueInput
  }

  /**
   * EventCenter deleteMany
   */
  export type EventCenterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventCenters to delete
     */
    where?: EventCenterWhereInput
    /**
     * Limit how many EventCenters to delete.
     */
    limit?: number
  }

  /**
   * EventCenter without action
   */
  export type EventCenterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCenter
     */
    select?: EventCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventCenter
     */
    omit?: EventCenterOmit<ExtArgs> | null
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


  export const EventCenterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    eventTypes: 'eventTypes',
    serviceProviderId: 'serviceProviderId',
    depositAmount: 'depositAmount',
    description: 'description',
    pricingPerSlot: 'pricingPerSlot',
    sittingCapacity: 'sittingCapacity',
    venueLayout: 'venueLayout',
    amenities: 'amenities',
    images: 'images',
    termsOfUse: 'termsOfUse',
    cancellationPolicy: 'cancellationPolicy',
    streetAddress: 'streetAddress',
    streetAddress2: 'streetAddress2',
    city: 'city',
    location: 'location',
    postal: 'postal',
    status: 'status',
    paymentRequired: 'paymentRequired',
    rating: 'rating',
    contact: 'contact',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type EventCenterScalarFieldEnum = (typeof EventCenterScalarFieldEnum)[keyof typeof EventCenterScalarFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Amenities[]'
   */
  export type ListEnumAmenitiesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Amenities[]'>
    


  /**
   * Reference to a field of type 'Amenities'
   */
  export type EnumAmenitiesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Amenities'>
    


  /**
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'ServiceStatus[]'
   */
  export type ListEnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type EventCenterWhereInput = {
    AND?: EventCenterWhereInput | EventCenterWhereInput[]
    OR?: EventCenterWhereInput[]
    NOT?: EventCenterWhereInput | EventCenterWhereInput[]
    id?: StringFilter<"EventCenter"> | string
    name?: StringFilter<"EventCenter"> | string
    eventTypes?: StringNullableListFilter<"EventCenter">
    serviceProviderId?: StringFilter<"EventCenter"> | string
    depositAmount?: FloatFilter<"EventCenter"> | number
    description?: StringNullableFilter<"EventCenter"> | string | null
    pricingPerSlot?: FloatFilter<"EventCenter"> | number
    sittingCapacity?: IntFilter<"EventCenter"> | number
    venueLayout?: StringNullableFilter<"EventCenter"> | string | null
    amenities?: EnumAmenitiesNullableListFilter<"EventCenter">
    images?: StringNullableListFilter<"EventCenter">
    termsOfUse?: StringFilter<"EventCenter"> | string
    cancellationPolicy?: StringFilter<"EventCenter"> | string
    streetAddress?: StringFilter<"EventCenter"> | string
    streetAddress2?: StringFilter<"EventCenter"> | string
    city?: StringFilter<"EventCenter"> | string
    location?: StringFilter<"EventCenter"> | string
    postal?: StringFilter<"EventCenter"> | string
    status?: EnumServiceStatusFilter<"EventCenter"> | $Enums.ServiceStatus
    paymentRequired?: BoolNullableFilter<"EventCenter"> | boolean | null
    rating?: DecimalNullableFilter<"EventCenter"> | Decimal | DecimalJsLike | number | string | null
    contact?: StringNullableFilter<"EventCenter"> | string | null
    createdAt?: DateTimeFilter<"EventCenter"> | Date | string
    updatedAt?: DateTimeFilter<"EventCenter"> | Date | string
    deletedAt?: DateTimeNullableFilter<"EventCenter"> | Date | string | null
    deletedBy?: StringNullableFilter<"EventCenter"> | string | null
  }

  export type EventCenterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    eventTypes?: SortOrder
    serviceProviderId?: SortOrder
    depositAmount?: SortOrder
    description?: SortOrderInput | SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    venueLayout?: SortOrderInput | SortOrder
    amenities?: SortOrder
    images?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    paymentRequired?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    contact?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
  }

  export type EventCenterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventCenterWhereInput | EventCenterWhereInput[]
    OR?: EventCenterWhereInput[]
    NOT?: EventCenterWhereInput | EventCenterWhereInput[]
    name?: StringFilter<"EventCenter"> | string
    eventTypes?: StringNullableListFilter<"EventCenter">
    serviceProviderId?: StringFilter<"EventCenter"> | string
    depositAmount?: FloatFilter<"EventCenter"> | number
    description?: StringNullableFilter<"EventCenter"> | string | null
    pricingPerSlot?: FloatFilter<"EventCenter"> | number
    sittingCapacity?: IntFilter<"EventCenter"> | number
    venueLayout?: StringNullableFilter<"EventCenter"> | string | null
    amenities?: EnumAmenitiesNullableListFilter<"EventCenter">
    images?: StringNullableListFilter<"EventCenter">
    termsOfUse?: StringFilter<"EventCenter"> | string
    cancellationPolicy?: StringFilter<"EventCenter"> | string
    streetAddress?: StringFilter<"EventCenter"> | string
    streetAddress2?: StringFilter<"EventCenter"> | string
    city?: StringFilter<"EventCenter"> | string
    location?: StringFilter<"EventCenter"> | string
    postal?: StringFilter<"EventCenter"> | string
    status?: EnumServiceStatusFilter<"EventCenter"> | $Enums.ServiceStatus
    paymentRequired?: BoolNullableFilter<"EventCenter"> | boolean | null
    rating?: DecimalNullableFilter<"EventCenter"> | Decimal | DecimalJsLike | number | string | null
    contact?: StringNullableFilter<"EventCenter"> | string | null
    createdAt?: DateTimeFilter<"EventCenter"> | Date | string
    updatedAt?: DateTimeFilter<"EventCenter"> | Date | string
    deletedAt?: DateTimeNullableFilter<"EventCenter"> | Date | string | null
    deletedBy?: StringNullableFilter<"EventCenter"> | string | null
  }, "id">

  export type EventCenterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    eventTypes?: SortOrder
    serviceProviderId?: SortOrder
    depositAmount?: SortOrder
    description?: SortOrderInput | SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    venueLayout?: SortOrderInput | SortOrder
    amenities?: SortOrder
    images?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    paymentRequired?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    contact?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: EventCenterCountOrderByAggregateInput
    _avg?: EventCenterAvgOrderByAggregateInput
    _max?: EventCenterMaxOrderByAggregateInput
    _min?: EventCenterMinOrderByAggregateInput
    _sum?: EventCenterSumOrderByAggregateInput
  }

  export type EventCenterScalarWhereWithAggregatesInput = {
    AND?: EventCenterScalarWhereWithAggregatesInput | EventCenterScalarWhereWithAggregatesInput[]
    OR?: EventCenterScalarWhereWithAggregatesInput[]
    NOT?: EventCenterScalarWhereWithAggregatesInput | EventCenterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventCenter"> | string
    name?: StringWithAggregatesFilter<"EventCenter"> | string
    eventTypes?: StringNullableListFilter<"EventCenter">
    serviceProviderId?: StringWithAggregatesFilter<"EventCenter"> | string
    depositAmount?: FloatWithAggregatesFilter<"EventCenter"> | number
    description?: StringNullableWithAggregatesFilter<"EventCenter"> | string | null
    pricingPerSlot?: FloatWithAggregatesFilter<"EventCenter"> | number
    sittingCapacity?: IntWithAggregatesFilter<"EventCenter"> | number
    venueLayout?: StringNullableWithAggregatesFilter<"EventCenter"> | string | null
    amenities?: EnumAmenitiesNullableListFilter<"EventCenter">
    images?: StringNullableListFilter<"EventCenter">
    termsOfUse?: StringWithAggregatesFilter<"EventCenter"> | string
    cancellationPolicy?: StringWithAggregatesFilter<"EventCenter"> | string
    streetAddress?: StringWithAggregatesFilter<"EventCenter"> | string
    streetAddress2?: StringWithAggregatesFilter<"EventCenter"> | string
    city?: StringWithAggregatesFilter<"EventCenter"> | string
    location?: StringWithAggregatesFilter<"EventCenter"> | string
    postal?: StringWithAggregatesFilter<"EventCenter"> | string
    status?: EnumServiceStatusWithAggregatesFilter<"EventCenter"> | $Enums.ServiceStatus
    paymentRequired?: BoolNullableWithAggregatesFilter<"EventCenter"> | boolean | null
    rating?: DecimalNullableWithAggregatesFilter<"EventCenter"> | Decimal | DecimalJsLike | number | string | null
    contact?: StringNullableWithAggregatesFilter<"EventCenter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EventCenter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventCenter"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"EventCenter"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"EventCenter"> | string | null
  }

  export type EventCenterCreateInput = {
    id?: string
    name: string
    eventTypes?: EventCenterCreateeventTypesInput | string[]
    serviceProviderId: string
    depositAmount: number
    description?: string | null
    pricingPerSlot: number
    sittingCapacity: number
    venueLayout?: string | null
    amenities?: EventCenterCreateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location: string
    postal: string
    status: $Enums.ServiceStatus
    paymentRequired?: boolean | null
    rating?: Decimal | DecimalJsLike | number | string | null
    contact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterUncheckedCreateInput = {
    id?: string
    name: string
    eventTypes?: EventCenterCreateeventTypesInput | string[]
    serviceProviderId: string
    depositAmount: number
    description?: string | null
    pricingPerSlot: number
    sittingCapacity: number
    venueLayout?: string | null
    amenities?: EventCenterCreateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location: string
    postal: string
    status: $Enums.ServiceStatus
    paymentRequired?: boolean | null
    rating?: Decimal | DecimalJsLike | number | string | null
    contact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventTypes?: EventCenterUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    depositAmount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricingPerSlot?: FloatFieldUpdateOperationsInput | number
    sittingCapacity?: IntFieldUpdateOperationsInput | number
    venueLayout?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: EventCenterUpdateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventTypes?: EventCenterUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    depositAmount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricingPerSlot?: FloatFieldUpdateOperationsInput | number
    sittingCapacity?: IntFieldUpdateOperationsInput | number
    venueLayout?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: EventCenterUpdateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterCreateManyInput = {
    id?: string
    name: string
    eventTypes?: EventCenterCreateeventTypesInput | string[]
    serviceProviderId: string
    depositAmount: number
    description?: string | null
    pricingPerSlot: number
    sittingCapacity: number
    venueLayout?: string | null
    amenities?: EventCenterCreateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location: string
    postal: string
    status: $Enums.ServiceStatus
    paymentRequired?: boolean | null
    rating?: Decimal | DecimalJsLike | number | string | null
    contact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type EventCenterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventTypes?: EventCenterUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    depositAmount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricingPerSlot?: FloatFieldUpdateOperationsInput | number
    sittingCapacity?: IntFieldUpdateOperationsInput | number
    venueLayout?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: EventCenterUpdateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCenterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventTypes?: EventCenterUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    depositAmount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricingPerSlot?: FloatFieldUpdateOperationsInput | number
    sittingCapacity?: IntFieldUpdateOperationsInput | number
    venueLayout?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: EventCenterUpdateamenitiesInput | $Enums.Amenities[]
    images?: EventCenterUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumAmenitiesNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Amenities[] | ListEnumAmenitiesFieldRefInput<$PrismaModel> | null
    has?: $Enums.Amenities | EnumAmenitiesFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Amenities[] | ListEnumAmenitiesFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Amenities[] | ListEnumAmenitiesFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventCenterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventTypes?: SortOrder
    serviceProviderId?: SortOrder
    depositAmount?: SortOrder
    description?: SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    venueLayout?: SortOrder
    amenities?: SortOrder
    images?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    paymentRequired?: SortOrder
    rating?: SortOrder
    contact?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EventCenterAvgOrderByAggregateInput = {
    depositAmount?: SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    rating?: SortOrder
  }

  export type EventCenterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serviceProviderId?: SortOrder
    depositAmount?: SortOrder
    description?: SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    venueLayout?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    paymentRequired?: SortOrder
    rating?: SortOrder
    contact?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EventCenterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serviceProviderId?: SortOrder
    depositAmount?: SortOrder
    description?: SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    venueLayout?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    paymentRequired?: SortOrder
    rating?: SortOrder
    contact?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EventCenterSumOrderByAggregateInput = {
    depositAmount?: SortOrder
    pricingPerSlot?: SortOrder
    sittingCapacity?: SortOrder
    rating?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type EventCenterCreateeventTypesInput = {
    set: string[]
  }

  export type EventCenterCreateamenitiesInput = {
    set: $Enums.Amenities[]
  }

  export type EventCenterCreateimagesInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EventCenterUpdateeventTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventCenterUpdateamenitiesInput = {
    set?: $Enums.Amenities[]
    push?: $Enums.Amenities | $Enums.Amenities[]
  }

  export type EventCenterUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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