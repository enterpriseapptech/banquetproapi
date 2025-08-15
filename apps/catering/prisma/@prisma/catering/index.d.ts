
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
 * Model Catering
 * 
 */
export type Catering = $Result.DefaultSelection<Prisma.$CateringPayload>
/**
 * Model Menu
 * 
 */
export type Menu = $Result.DefaultSelection<Prisma.$MenuPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ServiceStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]

}

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Caterings
 * const caterings = await prisma.catering.findMany()
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
   * // Fetch zero or more Caterings
   * const caterings = await prisma.catering.findMany()
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
   * `prisma.catering`: Exposes CRUD operations for the **Catering** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Caterings
    * const caterings = await prisma.catering.findMany()
    * ```
    */
  get catering(): Prisma.CateringDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menu`: Exposes CRUD operations for the **Menu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Menus
    * const menus = await prisma.menu.findMany()
    * ```
    */
  get menu(): Prisma.MenuDelegate<ExtArgs, ClientOptions>;
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
    Catering: 'Catering',
    Menu: 'Menu'
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
      modelProps: "catering" | "menu"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Catering: {
        payload: Prisma.$CateringPayload<ExtArgs>
        fields: Prisma.CateringFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CateringFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CateringFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>
          }
          findFirst: {
            args: Prisma.CateringFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CateringFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>
          }
          findMany: {
            args: Prisma.CateringFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>[]
          }
          create: {
            args: Prisma.CateringCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>
          }
          createMany: {
            args: Prisma.CateringCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CateringCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>[]
          }
          delete: {
            args: Prisma.CateringDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>
          }
          update: {
            args: Prisma.CateringUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>
          }
          deleteMany: {
            args: Prisma.CateringDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CateringUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CateringUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>[]
          }
          upsert: {
            args: Prisma.CateringUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CateringPayload>
          }
          aggregate: {
            args: Prisma.CateringAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatering>
          }
          groupBy: {
            args: Prisma.CateringGroupByArgs<ExtArgs>
            result: $Utils.Optional<CateringGroupByOutputType>[]
          }
          count: {
            args: Prisma.CateringCountArgs<ExtArgs>
            result: $Utils.Optional<CateringCountAggregateOutputType> | number
          }
        }
      }
      Menu: {
        payload: Prisma.$MenuPayload<ExtArgs>
        fields: Prisma.MenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findFirst: {
            args: Prisma.MenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findMany: {
            args: Prisma.MenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          create: {
            args: Prisma.MenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          createMany: {
            args: Prisma.MenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          delete: {
            args: Prisma.MenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          update: {
            args: Prisma.MenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          deleteMany: {
            args: Prisma.MenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          upsert: {
            args: Prisma.MenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          aggregate: {
            args: Prisma.MenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenu>
          }
          groupBy: {
            args: Prisma.MenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuCountArgs<ExtArgs>
            result: $Utils.Optional<MenuCountAggregateOutputType> | number
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
    catering?: CateringOmit
    menu?: MenuOmit
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
   * Count Type CateringCountOutputType
   */

  export type CateringCountOutputType = {
    menu: number
  }

  export type CateringCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | CateringCountOutputTypeCountMenuArgs
  }

  // Custom InputTypes
  /**
   * CateringCountOutputType without action
   */
  export type CateringCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CateringCountOutputType
     */
    select?: CateringCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CateringCountOutputType without action
   */
  export type CateringCountOutputTypeCountMenuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Catering
   */

  export type AggregateCatering = {
    _count: CateringCountAggregateOutputType | null
    _avg: CateringAvgAggregateOutputType | null
    _sum: CateringSumAggregateOutputType | null
    _min: CateringMinAggregateOutputType | null
    _max: CateringMaxAggregateOutputType | null
  }

  export type CateringAvgAggregateOutputType = {
    depositPercentage: number | null
    discountPercentage: number | null
    startPrice: number | null
    minCapacity: number | null
    maxCapacity: number | null
    rating: Decimal | null
  }

  export type CateringSumAggregateOutputType = {
    depositPercentage: number | null
    discountPercentage: number | null
    startPrice: number | null
    minCapacity: number | null
    maxCapacity: number | null
    rating: Decimal | null
  }

  export type CateringMinAggregateOutputType = {
    id: string | null
    name: string | null
    serviceProviderId: string | null
    tagLine: string | null
    depositPercentage: number | null
    discountPercentage: number | null
    startPrice: number | null
    minCapacity: number | null
    maxCapacity: number | null
    description: string | null
    termsOfUse: string | null
    cancellationPolicy: string | null
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    postal: string | null
    status: $Enums.ServiceStatus | null
    isFeatured: boolean | null
    featureExpiringAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    rating: Decimal | null
    paymentRequired: boolean | null
    contact: string | null
  }

  export type CateringMaxAggregateOutputType = {
    id: string | null
    name: string | null
    serviceProviderId: string | null
    tagLine: string | null
    depositPercentage: number | null
    discountPercentage: number | null
    startPrice: number | null
    minCapacity: number | null
    maxCapacity: number | null
    description: string | null
    termsOfUse: string | null
    cancellationPolicy: string | null
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    postal: string | null
    status: $Enums.ServiceStatus | null
    isFeatured: boolean | null
    featureExpiringAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    rating: Decimal | null
    paymentRequired: boolean | null
    contact: string | null
  }

  export type CateringCountAggregateOutputType = {
    id: number
    name: number
    eventTypes: number
    serviceProviderId: number
    tagLine: number
    depositPercentage: number
    discountPercentage: number
    startPrice: number
    minCapacity: number
    maxCapacity: number
    description: number
    dishTypes: number
    cuisine: number
    images: number
    termsOfUse: number
    cancellationPolicy: number
    streetAddress: number
    streetAddress2: number
    city: number
    location: number
    postal: number
    status: number
    isFeatured: number
    featureExpiringAt: number
    createdAt: number
    updatedAt: number
    updatedBy: number
    deletedAt: number
    deletedBy: number
    rating: number
    paymentRequired: number
    contact: number
    _all: number
  }


  export type CateringAvgAggregateInputType = {
    depositPercentage?: true
    discountPercentage?: true
    startPrice?: true
    minCapacity?: true
    maxCapacity?: true
    rating?: true
  }

  export type CateringSumAggregateInputType = {
    depositPercentage?: true
    discountPercentage?: true
    startPrice?: true
    minCapacity?: true
    maxCapacity?: true
    rating?: true
  }

  export type CateringMinAggregateInputType = {
    id?: true
    name?: true
    serviceProviderId?: true
    tagLine?: true
    depositPercentage?: true
    discountPercentage?: true
    startPrice?: true
    minCapacity?: true
    maxCapacity?: true
    description?: true
    termsOfUse?: true
    cancellationPolicy?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    postal?: true
    status?: true
    isFeatured?: true
    featureExpiringAt?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    rating?: true
    paymentRequired?: true
    contact?: true
  }

  export type CateringMaxAggregateInputType = {
    id?: true
    name?: true
    serviceProviderId?: true
    tagLine?: true
    depositPercentage?: true
    discountPercentage?: true
    startPrice?: true
    minCapacity?: true
    maxCapacity?: true
    description?: true
    termsOfUse?: true
    cancellationPolicy?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    postal?: true
    status?: true
    isFeatured?: true
    featureExpiringAt?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    rating?: true
    paymentRequired?: true
    contact?: true
  }

  export type CateringCountAggregateInputType = {
    id?: true
    name?: true
    eventTypes?: true
    serviceProviderId?: true
    tagLine?: true
    depositPercentage?: true
    discountPercentage?: true
    startPrice?: true
    minCapacity?: true
    maxCapacity?: true
    description?: true
    dishTypes?: true
    cuisine?: true
    images?: true
    termsOfUse?: true
    cancellationPolicy?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    location?: true
    postal?: true
    status?: true
    isFeatured?: true
    featureExpiringAt?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    rating?: true
    paymentRequired?: true
    contact?: true
    _all?: true
  }

  export type CateringAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Catering to aggregate.
     */
    where?: CateringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Caterings to fetch.
     */
    orderBy?: CateringOrderByWithRelationInput | CateringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CateringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Caterings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Caterings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Caterings
    **/
    _count?: true | CateringCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CateringAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CateringSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CateringMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CateringMaxAggregateInputType
  }

  export type GetCateringAggregateType<T extends CateringAggregateArgs> = {
        [P in keyof T & keyof AggregateCatering]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatering[P]>
      : GetScalarType<T[P], AggregateCatering[P]>
  }




  export type CateringGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CateringWhereInput
    orderBy?: CateringOrderByWithAggregationInput | CateringOrderByWithAggregationInput[]
    by: CateringScalarFieldEnum[] | CateringScalarFieldEnum
    having?: CateringScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CateringCountAggregateInputType | true
    _avg?: CateringAvgAggregateInputType
    _sum?: CateringSumAggregateInputType
    _min?: CateringMinAggregateInputType
    _max?: CateringMaxAggregateInputType
  }

  export type CateringGroupByOutputType = {
    id: string
    name: string | null
    eventTypes: string[]
    serviceProviderId: string
    tagLine: string
    depositPercentage: number
    discountPercentage: number | null
    startPrice: number
    minCapacity: number | null
    maxCapacity: number | null
    description: string | null
    dishTypes: string[]
    cuisine: string[]
    images: string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location: string[]
    postal: string
    status: $Enums.ServiceStatus
    isFeatured: boolean
    featureExpiringAt: Date | null
    createdAt: Date
    updatedAt: Date
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    rating: Decimal | null
    paymentRequired: boolean | null
    contact: string | null
    _count: CateringCountAggregateOutputType | null
    _avg: CateringAvgAggregateOutputType | null
    _sum: CateringSumAggregateOutputType | null
    _min: CateringMinAggregateOutputType | null
    _max: CateringMaxAggregateOutputType | null
  }

  type GetCateringGroupByPayload<T extends CateringGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CateringGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CateringGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CateringGroupByOutputType[P]>
            : GetScalarType<T[P], CateringGroupByOutputType[P]>
        }
      >
    >


  export type CateringSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    tagLine?: boolean
    depositPercentage?: boolean
    discountPercentage?: boolean
    startPrice?: boolean
    minCapacity?: boolean
    maxCapacity?: boolean
    description?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    isFeatured?: boolean
    featureExpiringAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    rating?: boolean
    paymentRequired?: boolean
    contact?: boolean
    menu?: boolean | Catering$menuArgs<ExtArgs>
    _count?: boolean | CateringCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catering"]>

  export type CateringSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    tagLine?: boolean
    depositPercentage?: boolean
    discountPercentage?: boolean
    startPrice?: boolean
    minCapacity?: boolean
    maxCapacity?: boolean
    description?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    isFeatured?: boolean
    featureExpiringAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    rating?: boolean
    paymentRequired?: boolean
    contact?: boolean
  }, ExtArgs["result"]["catering"]>

  export type CateringSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    tagLine?: boolean
    depositPercentage?: boolean
    discountPercentage?: boolean
    startPrice?: boolean
    minCapacity?: boolean
    maxCapacity?: boolean
    description?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    isFeatured?: boolean
    featureExpiringAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    rating?: boolean
    paymentRequired?: boolean
    contact?: boolean
  }, ExtArgs["result"]["catering"]>

  export type CateringSelectScalar = {
    id?: boolean
    name?: boolean
    eventTypes?: boolean
    serviceProviderId?: boolean
    tagLine?: boolean
    depositPercentage?: boolean
    discountPercentage?: boolean
    startPrice?: boolean
    minCapacity?: boolean
    maxCapacity?: boolean
    description?: boolean
    dishTypes?: boolean
    cuisine?: boolean
    images?: boolean
    termsOfUse?: boolean
    cancellationPolicy?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    location?: boolean
    postal?: boolean
    status?: boolean
    isFeatured?: boolean
    featureExpiringAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    rating?: boolean
    paymentRequired?: boolean
    contact?: boolean
  }

  export type CateringOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "eventTypes" | "serviceProviderId" | "tagLine" | "depositPercentage" | "discountPercentage" | "startPrice" | "minCapacity" | "maxCapacity" | "description" | "dishTypes" | "cuisine" | "images" | "termsOfUse" | "cancellationPolicy" | "streetAddress" | "streetAddress2" | "city" | "location" | "postal" | "status" | "isFeatured" | "featureExpiringAt" | "createdAt" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "rating" | "paymentRequired" | "contact", ExtArgs["result"]["catering"]>
  export type CateringInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | Catering$menuArgs<ExtArgs>
    _count?: boolean | CateringCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CateringIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CateringIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CateringPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Catering"
    objects: {
      menu: Prisma.$MenuPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      eventTypes: string[]
      serviceProviderId: string
      tagLine: string
      depositPercentage: number
      discountPercentage: number | null
      startPrice: number
      minCapacity: number | null
      maxCapacity: number | null
      description: string | null
      dishTypes: string[]
      cuisine: string[]
      images: string[]
      termsOfUse: string
      cancellationPolicy: string
      streetAddress: string
      streetAddress2: string
      city: string
      location: string[]
      postal: string
      status: $Enums.ServiceStatus
      isFeatured: boolean
      featureExpiringAt: Date | null
      createdAt: Date
      updatedAt: Date
      updatedBy: string | null
      deletedAt: Date | null
      deletedBy: string | null
      rating: Prisma.Decimal | null
      paymentRequired: boolean | null
      contact: string | null
    }, ExtArgs["result"]["catering"]>
    composites: {}
  }

  type CateringGetPayload<S extends boolean | null | undefined | CateringDefaultArgs> = $Result.GetResult<Prisma.$CateringPayload, S>

  type CateringCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CateringFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CateringCountAggregateInputType | true
    }

  export interface CateringDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Catering'], meta: { name: 'Catering' } }
    /**
     * Find zero or one Catering that matches the filter.
     * @param {CateringFindUniqueArgs} args - Arguments to find a Catering
     * @example
     * // Get one Catering
     * const catering = await prisma.catering.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CateringFindUniqueArgs>(args: SelectSubset<T, CateringFindUniqueArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Catering that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CateringFindUniqueOrThrowArgs} args - Arguments to find a Catering
     * @example
     * // Get one Catering
     * const catering = await prisma.catering.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CateringFindUniqueOrThrowArgs>(args: SelectSubset<T, CateringFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Catering that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringFindFirstArgs} args - Arguments to find a Catering
     * @example
     * // Get one Catering
     * const catering = await prisma.catering.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CateringFindFirstArgs>(args?: SelectSubset<T, CateringFindFirstArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Catering that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringFindFirstOrThrowArgs} args - Arguments to find a Catering
     * @example
     * // Get one Catering
     * const catering = await prisma.catering.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CateringFindFirstOrThrowArgs>(args?: SelectSubset<T, CateringFindFirstOrThrowArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Caterings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Caterings
     * const caterings = await prisma.catering.findMany()
     * 
     * // Get first 10 Caterings
     * const caterings = await prisma.catering.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cateringWithIdOnly = await prisma.catering.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CateringFindManyArgs>(args?: SelectSubset<T, CateringFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Catering.
     * @param {CateringCreateArgs} args - Arguments to create a Catering.
     * @example
     * // Create one Catering
     * const Catering = await prisma.catering.create({
     *   data: {
     *     // ... data to create a Catering
     *   }
     * })
     * 
     */
    create<T extends CateringCreateArgs>(args: SelectSubset<T, CateringCreateArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Caterings.
     * @param {CateringCreateManyArgs} args - Arguments to create many Caterings.
     * @example
     * // Create many Caterings
     * const catering = await prisma.catering.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CateringCreateManyArgs>(args?: SelectSubset<T, CateringCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Caterings and returns the data saved in the database.
     * @param {CateringCreateManyAndReturnArgs} args - Arguments to create many Caterings.
     * @example
     * // Create many Caterings
     * const catering = await prisma.catering.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Caterings and only return the `id`
     * const cateringWithIdOnly = await prisma.catering.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CateringCreateManyAndReturnArgs>(args?: SelectSubset<T, CateringCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Catering.
     * @param {CateringDeleteArgs} args - Arguments to delete one Catering.
     * @example
     * // Delete one Catering
     * const Catering = await prisma.catering.delete({
     *   where: {
     *     // ... filter to delete one Catering
     *   }
     * })
     * 
     */
    delete<T extends CateringDeleteArgs>(args: SelectSubset<T, CateringDeleteArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Catering.
     * @param {CateringUpdateArgs} args - Arguments to update one Catering.
     * @example
     * // Update one Catering
     * const catering = await prisma.catering.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CateringUpdateArgs>(args: SelectSubset<T, CateringUpdateArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Caterings.
     * @param {CateringDeleteManyArgs} args - Arguments to filter Caterings to delete.
     * @example
     * // Delete a few Caterings
     * const { count } = await prisma.catering.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CateringDeleteManyArgs>(args?: SelectSubset<T, CateringDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Caterings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Caterings
     * const catering = await prisma.catering.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CateringUpdateManyArgs>(args: SelectSubset<T, CateringUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Caterings and returns the data updated in the database.
     * @param {CateringUpdateManyAndReturnArgs} args - Arguments to update many Caterings.
     * @example
     * // Update many Caterings
     * const catering = await prisma.catering.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Caterings and only return the `id`
     * const cateringWithIdOnly = await prisma.catering.updateManyAndReturn({
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
    updateManyAndReturn<T extends CateringUpdateManyAndReturnArgs>(args: SelectSubset<T, CateringUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Catering.
     * @param {CateringUpsertArgs} args - Arguments to update or create a Catering.
     * @example
     * // Update or create a Catering
     * const catering = await prisma.catering.upsert({
     *   create: {
     *     // ... data to create a Catering
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Catering we want to update
     *   }
     * })
     */
    upsert<T extends CateringUpsertArgs>(args: SelectSubset<T, CateringUpsertArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Caterings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringCountArgs} args - Arguments to filter Caterings to count.
     * @example
     * // Count the number of Caterings
     * const count = await prisma.catering.count({
     *   where: {
     *     // ... the filter for the Caterings we want to count
     *   }
     * })
    **/
    count<T extends CateringCountArgs>(
      args?: Subset<T, CateringCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CateringCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Catering.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CateringAggregateArgs>(args: Subset<T, CateringAggregateArgs>): Prisma.PrismaPromise<GetCateringAggregateType<T>>

    /**
     * Group by Catering.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CateringGroupByArgs} args - Group by arguments.
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
      T extends CateringGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CateringGroupByArgs['orderBy'] }
        : { orderBy?: CateringGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CateringGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCateringGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Catering model
   */
  readonly fields: CateringFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Catering.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CateringClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menu<T extends Catering$menuArgs<ExtArgs> = {}>(args?: Subset<T, Catering$menuArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Catering model
   */
  interface CateringFieldRefs {
    readonly id: FieldRef<"Catering", 'String'>
    readonly name: FieldRef<"Catering", 'String'>
    readonly eventTypes: FieldRef<"Catering", 'String[]'>
    readonly serviceProviderId: FieldRef<"Catering", 'String'>
    readonly tagLine: FieldRef<"Catering", 'String'>
    readonly depositPercentage: FieldRef<"Catering", 'Int'>
    readonly discountPercentage: FieldRef<"Catering", 'Int'>
    readonly startPrice: FieldRef<"Catering", 'Float'>
    readonly minCapacity: FieldRef<"Catering", 'Int'>
    readonly maxCapacity: FieldRef<"Catering", 'Int'>
    readonly description: FieldRef<"Catering", 'String'>
    readonly dishTypes: FieldRef<"Catering", 'String[]'>
    readonly cuisine: FieldRef<"Catering", 'String[]'>
    readonly images: FieldRef<"Catering", 'String[]'>
    readonly termsOfUse: FieldRef<"Catering", 'String'>
    readonly cancellationPolicy: FieldRef<"Catering", 'String'>
    readonly streetAddress: FieldRef<"Catering", 'String'>
    readonly streetAddress2: FieldRef<"Catering", 'String'>
    readonly city: FieldRef<"Catering", 'String'>
    readonly location: FieldRef<"Catering", 'String[]'>
    readonly postal: FieldRef<"Catering", 'String'>
    readonly status: FieldRef<"Catering", 'ServiceStatus'>
    readonly isFeatured: FieldRef<"Catering", 'Boolean'>
    readonly featureExpiringAt: FieldRef<"Catering", 'DateTime'>
    readonly createdAt: FieldRef<"Catering", 'DateTime'>
    readonly updatedAt: FieldRef<"Catering", 'DateTime'>
    readonly updatedBy: FieldRef<"Catering", 'String'>
    readonly deletedAt: FieldRef<"Catering", 'DateTime'>
    readonly deletedBy: FieldRef<"Catering", 'String'>
    readonly rating: FieldRef<"Catering", 'Decimal'>
    readonly paymentRequired: FieldRef<"Catering", 'Boolean'>
    readonly contact: FieldRef<"Catering", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Catering findUnique
   */
  export type CateringFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * Filter, which Catering to fetch.
     */
    where: CateringWhereUniqueInput
  }

  /**
   * Catering findUniqueOrThrow
   */
  export type CateringFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * Filter, which Catering to fetch.
     */
    where: CateringWhereUniqueInput
  }

  /**
   * Catering findFirst
   */
  export type CateringFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * Filter, which Catering to fetch.
     */
    where?: CateringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Caterings to fetch.
     */
    orderBy?: CateringOrderByWithRelationInput | CateringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Caterings.
     */
    cursor?: CateringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Caterings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Caterings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Caterings.
     */
    distinct?: CateringScalarFieldEnum | CateringScalarFieldEnum[]
  }

  /**
   * Catering findFirstOrThrow
   */
  export type CateringFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * Filter, which Catering to fetch.
     */
    where?: CateringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Caterings to fetch.
     */
    orderBy?: CateringOrderByWithRelationInput | CateringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Caterings.
     */
    cursor?: CateringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Caterings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Caterings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Caterings.
     */
    distinct?: CateringScalarFieldEnum | CateringScalarFieldEnum[]
  }

  /**
   * Catering findMany
   */
  export type CateringFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * Filter, which Caterings to fetch.
     */
    where?: CateringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Caterings to fetch.
     */
    orderBy?: CateringOrderByWithRelationInput | CateringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Caterings.
     */
    cursor?: CateringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Caterings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Caterings.
     */
    skip?: number
    distinct?: CateringScalarFieldEnum | CateringScalarFieldEnum[]
  }

  /**
   * Catering create
   */
  export type CateringCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * The data needed to create a Catering.
     */
    data: XOR<CateringCreateInput, CateringUncheckedCreateInput>
  }

  /**
   * Catering createMany
   */
  export type CateringCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Caterings.
     */
    data: CateringCreateManyInput | CateringCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Catering createManyAndReturn
   */
  export type CateringCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * The data used to create many Caterings.
     */
    data: CateringCreateManyInput | CateringCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Catering update
   */
  export type CateringUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * The data needed to update a Catering.
     */
    data: XOR<CateringUpdateInput, CateringUncheckedUpdateInput>
    /**
     * Choose, which Catering to update.
     */
    where: CateringWhereUniqueInput
  }

  /**
   * Catering updateMany
   */
  export type CateringUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Caterings.
     */
    data: XOR<CateringUpdateManyMutationInput, CateringUncheckedUpdateManyInput>
    /**
     * Filter which Caterings to update
     */
    where?: CateringWhereInput
    /**
     * Limit how many Caterings to update.
     */
    limit?: number
  }

  /**
   * Catering updateManyAndReturn
   */
  export type CateringUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * The data used to update Caterings.
     */
    data: XOR<CateringUpdateManyMutationInput, CateringUncheckedUpdateManyInput>
    /**
     * Filter which Caterings to update
     */
    where?: CateringWhereInput
    /**
     * Limit how many Caterings to update.
     */
    limit?: number
  }

  /**
   * Catering upsert
   */
  export type CateringUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * The filter to search for the Catering to update in case it exists.
     */
    where: CateringWhereUniqueInput
    /**
     * In case the Catering found by the `where` argument doesn't exist, create a new Catering with this data.
     */
    create: XOR<CateringCreateInput, CateringUncheckedCreateInput>
    /**
     * In case the Catering was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CateringUpdateInput, CateringUncheckedUpdateInput>
  }

  /**
   * Catering delete
   */
  export type CateringDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
    /**
     * Filter which Catering to delete.
     */
    where: CateringWhereUniqueInput
  }

  /**
   * Catering deleteMany
   */
  export type CateringDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Caterings to delete
     */
    where?: CateringWhereInput
    /**
     * Limit how many Caterings to delete.
     */
    limit?: number
  }

  /**
   * Catering.menu
   */
  export type Catering$menuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    cursor?: MenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Catering without action
   */
  export type CateringDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catering
     */
    select?: CateringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catering
     */
    omit?: CateringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CateringInclude<ExtArgs> | null
  }


  /**
   * Model Menu
   */

  export type AggregateMenu = {
    _count: MenuCountAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  export type MenuMinAggregateOutputType = {
    id: string | null
    cateringId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type MenuMaxAggregateOutputType = {
    id: string | null
    cateringId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type MenuCountAggregateOutputType = {
    id: number
    cateringId: number
    name: number
    description: number
    images: number
    createdAt: number
    updatedAt: number
    updatedBy: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type MenuMinAggregateInputType = {
    id?: true
    cateringId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type MenuMaxAggregateInputType = {
    id?: true
    cateringId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type MenuCountAggregateInputType = {
    id?: true
    cateringId?: true
    name?: true
    description?: true
    images?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type MenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menu to aggregate.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Menus
    **/
    _count?: true | MenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuMaxAggregateInputType
  }

  export type GetMenuAggregateType<T extends MenuAggregateArgs> = {
        [P in keyof T & keyof AggregateMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenu[P]>
      : GetScalarType<T[P], AggregateMenu[P]>
  }




  export type MenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithAggregationInput | MenuOrderByWithAggregationInput[]
    by: MenuScalarFieldEnum[] | MenuScalarFieldEnum
    having?: MenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuCountAggregateInputType | true
    _min?: MenuMinAggregateInputType
    _max?: MenuMaxAggregateInputType
  }

  export type MenuGroupByOutputType = {
    id: string
    cateringId: string
    name: string
    description: string | null
    images: string[]
    createdAt: Date
    updatedAt: Date
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    _count: MenuCountAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  type GetMenuGroupByPayload<T extends MenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuGroupByOutputType[P]>
            : GetScalarType<T[P], MenuGroupByOutputType[P]>
        }
      >
    >


  export type MenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cateringId?: boolean
    name?: boolean
    description?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    cateringService?: boolean | CateringDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cateringId?: boolean
    name?: boolean
    description?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    cateringService?: boolean | CateringDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cateringId?: boolean
    name?: boolean
    description?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    cateringService?: boolean | CateringDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectScalar = {
    id?: boolean
    cateringId?: boolean
    name?: boolean
    description?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type MenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cateringId" | "name" | "description" | "images" | "createdAt" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy", ExtArgs["result"]["menu"]>
  export type MenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cateringService?: boolean | CateringDefaultArgs<ExtArgs>
  }
  export type MenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cateringService?: boolean | CateringDefaultArgs<ExtArgs>
  }
  export type MenuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cateringService?: boolean | CateringDefaultArgs<ExtArgs>
  }

  export type $MenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Menu"
    objects: {
      cateringService: Prisma.$CateringPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cateringId: string
      name: string
      description: string | null
      images: string[]
      createdAt: Date
      updatedAt: Date
      updatedBy: string | null
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["menu"]>
    composites: {}
  }

  type MenuGetPayload<S extends boolean | null | undefined | MenuDefaultArgs> = $Result.GetResult<Prisma.$MenuPayload, S>

  type MenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuCountAggregateInputType | true
    }

  export interface MenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Menu'], meta: { name: 'Menu' } }
    /**
     * Find zero or one Menu that matches the filter.
     * @param {MenuFindUniqueArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuFindUniqueArgs>(args: SelectSubset<T, MenuFindUniqueArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Menu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuFindUniqueOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuFindFirstArgs>(args?: SelectSubset<T, MenuFindFirstArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menus
     * const menus = await prisma.menu.findMany()
     * 
     * // Get first 10 Menus
     * const menus = await prisma.menu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuWithIdOnly = await prisma.menu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuFindManyArgs>(args?: SelectSubset<T, MenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Menu.
     * @param {MenuCreateArgs} args - Arguments to create a Menu.
     * @example
     * // Create one Menu
     * const Menu = await prisma.menu.create({
     *   data: {
     *     // ... data to create a Menu
     *   }
     * })
     * 
     */
    create<T extends MenuCreateArgs>(args: SelectSubset<T, MenuCreateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Menus.
     * @param {MenuCreateManyArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuCreateManyArgs>(args?: SelectSubset<T, MenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Menus and returns the data saved in the database.
     * @param {MenuCreateManyAndReturnArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Menus and only return the `id`
     * const menuWithIdOnly = await prisma.menu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Menu.
     * @param {MenuDeleteArgs} args - Arguments to delete one Menu.
     * @example
     * // Delete one Menu
     * const Menu = await prisma.menu.delete({
     *   where: {
     *     // ... filter to delete one Menu
     *   }
     * })
     * 
     */
    delete<T extends MenuDeleteArgs>(args: SelectSubset<T, MenuDeleteArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Menu.
     * @param {MenuUpdateArgs} args - Arguments to update one Menu.
     * @example
     * // Update one Menu
     * const menu = await prisma.menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuUpdateArgs>(args: SelectSubset<T, MenuUpdateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Menus.
     * @param {MenuDeleteManyArgs} args - Arguments to filter Menus to delete.
     * @example
     * // Delete a few Menus
     * const { count } = await prisma.menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuDeleteManyArgs>(args?: SelectSubset<T, MenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuUpdateManyArgs>(args: SelectSubset<T, MenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus and returns the data updated in the database.
     * @param {MenuUpdateManyAndReturnArgs} args - Arguments to update many Menus.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Menus and only return the `id`
     * const menuWithIdOnly = await prisma.menu.updateManyAndReturn({
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
    updateManyAndReturn<T extends MenuUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Menu.
     * @param {MenuUpsertArgs} args - Arguments to update or create a Menu.
     * @example
     * // Update or create a Menu
     * const menu = await prisma.menu.upsert({
     *   create: {
     *     // ... data to create a Menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menu we want to update
     *   }
     * })
     */
    upsert<T extends MenuUpsertArgs>(args: SelectSubset<T, MenuUpsertArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCountArgs} args - Arguments to filter Menus to count.
     * @example
     * // Count the number of Menus
     * const count = await prisma.menu.count({
     *   where: {
     *     // ... the filter for the Menus we want to count
     *   }
     * })
    **/
    count<T extends MenuCountArgs>(
      args?: Subset<T, MenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuAggregateArgs>(args: Subset<T, MenuAggregateArgs>): Prisma.PrismaPromise<GetMenuAggregateType<T>>

    /**
     * Group by Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuGroupByArgs} args - Group by arguments.
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
      T extends MenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuGroupByArgs['orderBy'] }
        : { orderBy?: MenuGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Menu model
   */
  readonly fields: MenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Menu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cateringService<T extends CateringDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CateringDefaultArgs<ExtArgs>>): Prisma__CateringClient<$Result.GetResult<Prisma.$CateringPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Menu model
   */
  interface MenuFieldRefs {
    readonly id: FieldRef<"Menu", 'String'>
    readonly cateringId: FieldRef<"Menu", 'String'>
    readonly name: FieldRef<"Menu", 'String'>
    readonly description: FieldRef<"Menu", 'String'>
    readonly images: FieldRef<"Menu", 'String[]'>
    readonly createdAt: FieldRef<"Menu", 'DateTime'>
    readonly updatedAt: FieldRef<"Menu", 'DateTime'>
    readonly updatedBy: FieldRef<"Menu", 'String'>
    readonly deletedAt: FieldRef<"Menu", 'DateTime'>
    readonly deletedBy: FieldRef<"Menu", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Menu findUnique
   */
  export type MenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findUniqueOrThrow
   */
  export type MenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findFirst
   */
  export type MenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findFirstOrThrow
   */
  export type MenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findMany
   */
  export type MenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menus to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu create
   */
  export type MenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The data needed to create a Menu.
     */
    data: XOR<MenuCreateInput, MenuUncheckedCreateInput>
  }

  /**
   * Menu createMany
   */
  export type MenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menu createManyAndReturn
   */
  export type MenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Menu update
   */
  export type MenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The data needed to update a Menu.
     */
    data: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
    /**
     * Choose, which Menu to update.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu updateMany
   */
  export type MenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to update.
     */
    limit?: number
  }

  /**
   * Menu updateManyAndReturn
   */
  export type MenuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Menu upsert
   */
  export type MenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The filter to search for the Menu to update in case it exists.
     */
    where: MenuWhereUniqueInput
    /**
     * In case the Menu found by the `where` argument doesn't exist, create a new Menu with this data.
     */
    create: XOR<MenuCreateInput, MenuUncheckedCreateInput>
    /**
     * In case the Menu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
  }

  /**
   * Menu delete
   */
  export type MenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter which Menu to delete.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu deleteMany
   */
  export type MenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menus to delete
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to delete.
     */
    limit?: number
  }

  /**
   * Menu without action
   */
  export type MenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
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


  export const CateringScalarFieldEnum: {
    id: 'id',
    name: 'name',
    eventTypes: 'eventTypes',
    serviceProviderId: 'serviceProviderId',
    tagLine: 'tagLine',
    depositPercentage: 'depositPercentage',
    discountPercentage: 'discountPercentage',
    startPrice: 'startPrice',
    minCapacity: 'minCapacity',
    maxCapacity: 'maxCapacity',
    description: 'description',
    dishTypes: 'dishTypes',
    cuisine: 'cuisine',
    images: 'images',
    termsOfUse: 'termsOfUse',
    cancellationPolicy: 'cancellationPolicy',
    streetAddress: 'streetAddress',
    streetAddress2: 'streetAddress2',
    city: 'city',
    location: 'location',
    postal: 'postal',
    status: 'status',
    isFeatured: 'isFeatured',
    featureExpiringAt: 'featureExpiringAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
    rating: 'rating',
    paymentRequired: 'paymentRequired',
    contact: 'contact'
  };

  export type CateringScalarFieldEnum = (typeof CateringScalarFieldEnum)[keyof typeof CateringScalarFieldEnum]


  export const MenuScalarFieldEnum: {
    id: 'id',
    cateringId: 'cateringId',
    name: 'name',
    description: 'description',
    images: 'images',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type MenuScalarFieldEnum = (typeof MenuScalarFieldEnum)[keyof typeof MenuScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type CateringWhereInput = {
    AND?: CateringWhereInput | CateringWhereInput[]
    OR?: CateringWhereInput[]
    NOT?: CateringWhereInput | CateringWhereInput[]
    id?: StringFilter<"Catering"> | string
    name?: StringNullableFilter<"Catering"> | string | null
    eventTypes?: StringNullableListFilter<"Catering">
    serviceProviderId?: StringFilter<"Catering"> | string
    tagLine?: StringFilter<"Catering"> | string
    depositPercentage?: IntFilter<"Catering"> | number
    discountPercentage?: IntNullableFilter<"Catering"> | number | null
    startPrice?: FloatFilter<"Catering"> | number
    minCapacity?: IntNullableFilter<"Catering"> | number | null
    maxCapacity?: IntNullableFilter<"Catering"> | number | null
    description?: StringNullableFilter<"Catering"> | string | null
    dishTypes?: StringNullableListFilter<"Catering">
    cuisine?: StringNullableListFilter<"Catering">
    images?: StringNullableListFilter<"Catering">
    termsOfUse?: StringFilter<"Catering"> | string
    cancellationPolicy?: StringFilter<"Catering"> | string
    streetAddress?: StringFilter<"Catering"> | string
    streetAddress2?: StringFilter<"Catering"> | string
    city?: StringFilter<"Catering"> | string
    location?: StringNullableListFilter<"Catering">
    postal?: StringFilter<"Catering"> | string
    status?: EnumServiceStatusFilter<"Catering"> | $Enums.ServiceStatus
    isFeatured?: BoolFilter<"Catering"> | boolean
    featureExpiringAt?: DateTimeNullableFilter<"Catering"> | Date | string | null
    createdAt?: DateTimeFilter<"Catering"> | Date | string
    updatedAt?: DateTimeFilter<"Catering"> | Date | string
    updatedBy?: StringNullableFilter<"Catering"> | string | null
    deletedAt?: DateTimeNullableFilter<"Catering"> | Date | string | null
    deletedBy?: StringNullableFilter<"Catering"> | string | null
    rating?: DecimalNullableFilter<"Catering"> | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: BoolNullableFilter<"Catering"> | boolean | null
    contact?: StringNullableFilter<"Catering"> | string | null
    menu?: MenuListRelationFilter
  }

  export type CateringOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    eventTypes?: SortOrder
    serviceProviderId?: SortOrder
    tagLine?: SortOrder
    depositPercentage?: SortOrder
    discountPercentage?: SortOrderInput | SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrderInput | SortOrder
    maxCapacity?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    dishTypes?: SortOrder
    cuisine?: SortOrder
    images?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    featureExpiringAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    paymentRequired?: SortOrderInput | SortOrder
    contact?: SortOrderInput | SortOrder
    menu?: MenuOrderByRelationAggregateInput
  }

  export type CateringWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CateringWhereInput | CateringWhereInput[]
    OR?: CateringWhereInput[]
    NOT?: CateringWhereInput | CateringWhereInput[]
    name?: StringNullableFilter<"Catering"> | string | null
    eventTypes?: StringNullableListFilter<"Catering">
    serviceProviderId?: StringFilter<"Catering"> | string
    tagLine?: StringFilter<"Catering"> | string
    depositPercentage?: IntFilter<"Catering"> | number
    discountPercentage?: IntNullableFilter<"Catering"> | number | null
    startPrice?: FloatFilter<"Catering"> | number
    minCapacity?: IntNullableFilter<"Catering"> | number | null
    maxCapacity?: IntNullableFilter<"Catering"> | number | null
    description?: StringNullableFilter<"Catering"> | string | null
    dishTypes?: StringNullableListFilter<"Catering">
    cuisine?: StringNullableListFilter<"Catering">
    images?: StringNullableListFilter<"Catering">
    termsOfUse?: StringFilter<"Catering"> | string
    cancellationPolicy?: StringFilter<"Catering"> | string
    streetAddress?: StringFilter<"Catering"> | string
    streetAddress2?: StringFilter<"Catering"> | string
    city?: StringFilter<"Catering"> | string
    location?: StringNullableListFilter<"Catering">
    postal?: StringFilter<"Catering"> | string
    status?: EnumServiceStatusFilter<"Catering"> | $Enums.ServiceStatus
    isFeatured?: BoolFilter<"Catering"> | boolean
    featureExpiringAt?: DateTimeNullableFilter<"Catering"> | Date | string | null
    createdAt?: DateTimeFilter<"Catering"> | Date | string
    updatedAt?: DateTimeFilter<"Catering"> | Date | string
    updatedBy?: StringNullableFilter<"Catering"> | string | null
    deletedAt?: DateTimeNullableFilter<"Catering"> | Date | string | null
    deletedBy?: StringNullableFilter<"Catering"> | string | null
    rating?: DecimalNullableFilter<"Catering"> | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: BoolNullableFilter<"Catering"> | boolean | null
    contact?: StringNullableFilter<"Catering"> | string | null
    menu?: MenuListRelationFilter
  }, "id">

  export type CateringOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    eventTypes?: SortOrder
    serviceProviderId?: SortOrder
    tagLine?: SortOrder
    depositPercentage?: SortOrder
    discountPercentage?: SortOrderInput | SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrderInput | SortOrder
    maxCapacity?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    dishTypes?: SortOrder
    cuisine?: SortOrder
    images?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    featureExpiringAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    paymentRequired?: SortOrderInput | SortOrder
    contact?: SortOrderInput | SortOrder
    _count?: CateringCountOrderByAggregateInput
    _avg?: CateringAvgOrderByAggregateInput
    _max?: CateringMaxOrderByAggregateInput
    _min?: CateringMinOrderByAggregateInput
    _sum?: CateringSumOrderByAggregateInput
  }

  export type CateringScalarWhereWithAggregatesInput = {
    AND?: CateringScalarWhereWithAggregatesInput | CateringScalarWhereWithAggregatesInput[]
    OR?: CateringScalarWhereWithAggregatesInput[]
    NOT?: CateringScalarWhereWithAggregatesInput | CateringScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Catering"> | string
    name?: StringNullableWithAggregatesFilter<"Catering"> | string | null
    eventTypes?: StringNullableListFilter<"Catering">
    serviceProviderId?: StringWithAggregatesFilter<"Catering"> | string
    tagLine?: StringWithAggregatesFilter<"Catering"> | string
    depositPercentage?: IntWithAggregatesFilter<"Catering"> | number
    discountPercentage?: IntNullableWithAggregatesFilter<"Catering"> | number | null
    startPrice?: FloatWithAggregatesFilter<"Catering"> | number
    minCapacity?: IntNullableWithAggregatesFilter<"Catering"> | number | null
    maxCapacity?: IntNullableWithAggregatesFilter<"Catering"> | number | null
    description?: StringNullableWithAggregatesFilter<"Catering"> | string | null
    dishTypes?: StringNullableListFilter<"Catering">
    cuisine?: StringNullableListFilter<"Catering">
    images?: StringNullableListFilter<"Catering">
    termsOfUse?: StringWithAggregatesFilter<"Catering"> | string
    cancellationPolicy?: StringWithAggregatesFilter<"Catering"> | string
    streetAddress?: StringWithAggregatesFilter<"Catering"> | string
    streetAddress2?: StringWithAggregatesFilter<"Catering"> | string
    city?: StringWithAggregatesFilter<"Catering"> | string
    location?: StringNullableListFilter<"Catering">
    postal?: StringWithAggregatesFilter<"Catering"> | string
    status?: EnumServiceStatusWithAggregatesFilter<"Catering"> | $Enums.ServiceStatus
    isFeatured?: BoolWithAggregatesFilter<"Catering"> | boolean
    featureExpiringAt?: DateTimeNullableWithAggregatesFilter<"Catering"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Catering"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Catering"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Catering"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Catering"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Catering"> | string | null
    rating?: DecimalNullableWithAggregatesFilter<"Catering"> | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: BoolNullableWithAggregatesFilter<"Catering"> | boolean | null
    contact?: StringNullableWithAggregatesFilter<"Catering"> | string | null
  }

  export type MenuWhereInput = {
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    id?: StringFilter<"Menu"> | string
    cateringId?: StringFilter<"Menu"> | string
    name?: StringFilter<"Menu"> | string
    description?: StringNullableFilter<"Menu"> | string | null
    images?: StringNullableListFilter<"Menu">
    createdAt?: DateTimeFilter<"Menu"> | Date | string
    updatedAt?: DateTimeFilter<"Menu"> | Date | string
    updatedBy?: StringNullableFilter<"Menu"> | string | null
    deletedAt?: DateTimeNullableFilter<"Menu"> | Date | string | null
    deletedBy?: StringNullableFilter<"Menu"> | string | null
    cateringService?: XOR<CateringScalarRelationFilter, CateringWhereInput>
  }

  export type MenuOrderByWithRelationInput = {
    id?: SortOrder
    cateringId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    cateringService?: CateringOrderByWithRelationInput
  }

  export type MenuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    cateringId?: StringFilter<"Menu"> | string
    name?: StringFilter<"Menu"> | string
    description?: StringNullableFilter<"Menu"> | string | null
    images?: StringNullableListFilter<"Menu">
    createdAt?: DateTimeFilter<"Menu"> | Date | string
    updatedAt?: DateTimeFilter<"Menu"> | Date | string
    updatedBy?: StringNullableFilter<"Menu"> | string | null
    deletedAt?: DateTimeNullableFilter<"Menu"> | Date | string | null
    deletedBy?: StringNullableFilter<"Menu"> | string | null
    cateringService?: XOR<CateringScalarRelationFilter, CateringWhereInput>
  }, "id">

  export type MenuOrderByWithAggregationInput = {
    id?: SortOrder
    cateringId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: MenuCountOrderByAggregateInput
    _max?: MenuMaxOrderByAggregateInput
    _min?: MenuMinOrderByAggregateInput
  }

  export type MenuScalarWhereWithAggregatesInput = {
    AND?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    OR?: MenuScalarWhereWithAggregatesInput[]
    NOT?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Menu"> | string
    cateringId?: StringWithAggregatesFilter<"Menu"> | string
    name?: StringWithAggregatesFilter<"Menu"> | string
    description?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    images?: StringNullableListFilter<"Menu">
    createdAt?: DateTimeWithAggregatesFilter<"Menu"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Menu"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Menu"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Menu"> | string | null
  }

  export type CateringCreateInput = {
    id?: string
    name?: string | null
    eventTypes?: CateringCreateeventTypesInput | string[]
    serviceProviderId: string
    tagLine: string
    depositPercentage: number
    discountPercentage?: number | null
    startPrice: number
    minCapacity?: number | null
    maxCapacity?: number | null
    description?: string | null
    dishTypes?: CateringCreatedishTypesInput | string[]
    cuisine?: CateringCreatecuisineInput | string[]
    images?: CateringCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location?: CateringCreatelocationInput | string[]
    postal: string
    status: $Enums.ServiceStatus
    isFeatured?: boolean
    featureExpiringAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    paymentRequired?: boolean | null
    contact?: string | null
    menu?: MenuCreateNestedManyWithoutCateringServiceInput
  }

  export type CateringUncheckedCreateInput = {
    id?: string
    name?: string | null
    eventTypes?: CateringCreateeventTypesInput | string[]
    serviceProviderId: string
    tagLine: string
    depositPercentage: number
    discountPercentage?: number | null
    startPrice: number
    minCapacity?: number | null
    maxCapacity?: number | null
    description?: string | null
    dishTypes?: CateringCreatedishTypesInput | string[]
    cuisine?: CateringCreatecuisineInput | string[]
    images?: CateringCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location?: CateringCreatelocationInput | string[]
    postal: string
    status: $Enums.ServiceStatus
    isFeatured?: boolean
    featureExpiringAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    paymentRequired?: boolean | null
    contact?: string | null
    menu?: MenuUncheckedCreateNestedManyWithoutCateringServiceInput
  }

  export type CateringUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    eventTypes?: CateringUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    tagLine?: StringFieldUpdateOperationsInput | string
    depositPercentage?: IntFieldUpdateOperationsInput | number
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    startPrice?: FloatFieldUpdateOperationsInput | number
    minCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    maxCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringUpdatedishTypesInput | string[]
    cuisine?: CateringUpdatecuisineInput | string[]
    images?: CateringUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: CateringUpdatelocationInput | string[]
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featureExpiringAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    menu?: MenuUpdateManyWithoutCateringServiceNestedInput
  }

  export type CateringUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    eventTypes?: CateringUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    tagLine?: StringFieldUpdateOperationsInput | string
    depositPercentage?: IntFieldUpdateOperationsInput | number
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    startPrice?: FloatFieldUpdateOperationsInput | number
    minCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    maxCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringUpdatedishTypesInput | string[]
    cuisine?: CateringUpdatecuisineInput | string[]
    images?: CateringUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: CateringUpdatelocationInput | string[]
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featureExpiringAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    menu?: MenuUncheckedUpdateManyWithoutCateringServiceNestedInput
  }

  export type CateringCreateManyInput = {
    id?: string
    name?: string | null
    eventTypes?: CateringCreateeventTypesInput | string[]
    serviceProviderId: string
    tagLine: string
    depositPercentage: number
    discountPercentage?: number | null
    startPrice: number
    minCapacity?: number | null
    maxCapacity?: number | null
    description?: string | null
    dishTypes?: CateringCreatedishTypesInput | string[]
    cuisine?: CateringCreatecuisineInput | string[]
    images?: CateringCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location?: CateringCreatelocationInput | string[]
    postal: string
    status: $Enums.ServiceStatus
    isFeatured?: boolean
    featureExpiringAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    paymentRequired?: boolean | null
    contact?: string | null
  }

  export type CateringUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    eventTypes?: CateringUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    tagLine?: StringFieldUpdateOperationsInput | string
    depositPercentage?: IntFieldUpdateOperationsInput | number
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    startPrice?: FloatFieldUpdateOperationsInput | number
    minCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    maxCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringUpdatedishTypesInput | string[]
    cuisine?: CateringUpdatecuisineInput | string[]
    images?: CateringUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: CateringUpdatelocationInput | string[]
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featureExpiringAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    eventTypes?: CateringUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    tagLine?: StringFieldUpdateOperationsInput | string
    depositPercentage?: IntFieldUpdateOperationsInput | number
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    startPrice?: FloatFieldUpdateOperationsInput | number
    minCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    maxCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringUpdatedishTypesInput | string[]
    cuisine?: CateringUpdatecuisineInput | string[]
    images?: CateringUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: CateringUpdatelocationInput | string[]
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featureExpiringAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MenuCreateInput = {
    id?: string
    name: string
    description?: string | null
    images?: MenuCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    cateringService: CateringCreateNestedOneWithoutMenuInput
  }

  export type MenuUncheckedCreateInput = {
    id?: string
    cateringId: string
    name: string
    description?: string | null
    images?: MenuCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type MenuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cateringService?: CateringUpdateOneRequiredWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MenuCreateManyInput = {
    id?: string
    cateringId: string
    name: string
    description?: string | null
    images?: MenuCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type MenuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MenuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cateringId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type MenuListRelationFilter = {
    every?: MenuWhereInput
    some?: MenuWhereInput
    none?: MenuWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MenuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CateringCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventTypes?: SortOrder
    serviceProviderId?: SortOrder
    tagLine?: SortOrder
    depositPercentage?: SortOrder
    discountPercentage?: SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrder
    maxCapacity?: SortOrder
    description?: SortOrder
    dishTypes?: SortOrder
    cuisine?: SortOrder
    images?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    location?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    featureExpiringAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    rating?: SortOrder
    paymentRequired?: SortOrder
    contact?: SortOrder
  }

  export type CateringAvgOrderByAggregateInput = {
    depositPercentage?: SortOrder
    discountPercentage?: SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrder
    maxCapacity?: SortOrder
    rating?: SortOrder
  }

  export type CateringMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serviceProviderId?: SortOrder
    tagLine?: SortOrder
    depositPercentage?: SortOrder
    discountPercentage?: SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrder
    maxCapacity?: SortOrder
    description?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    featureExpiringAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    rating?: SortOrder
    paymentRequired?: SortOrder
    contact?: SortOrder
  }

  export type CateringMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serviceProviderId?: SortOrder
    tagLine?: SortOrder
    depositPercentage?: SortOrder
    discountPercentage?: SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrder
    maxCapacity?: SortOrder
    description?: SortOrder
    termsOfUse?: SortOrder
    cancellationPolicy?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    postal?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    featureExpiringAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    rating?: SortOrder
    paymentRequired?: SortOrder
    contact?: SortOrder
  }

  export type CateringSumOrderByAggregateInput = {
    depositPercentage?: SortOrder
    discountPercentage?: SortOrder
    startPrice?: SortOrder
    minCapacity?: SortOrder
    maxCapacity?: SortOrder
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

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type CateringScalarRelationFilter = {
    is?: CateringWhereInput
    isNot?: CateringWhereInput
  }

  export type MenuCountOrderByAggregateInput = {
    id?: SortOrder
    cateringId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type MenuMaxOrderByAggregateInput = {
    id?: SortOrder
    cateringId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type MenuMinOrderByAggregateInput = {
    id?: SortOrder
    cateringId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type CateringCreateeventTypesInput = {
    set: string[]
  }

  export type CateringCreatedishTypesInput = {
    set: string[]
  }

  export type CateringCreatecuisineInput = {
    set: string[]
  }

  export type CateringCreateimagesInput = {
    set: string[]
  }

  export type CateringCreatelocationInput = {
    set: string[]
  }

  export type MenuCreateNestedManyWithoutCateringServiceInput = {
    create?: XOR<MenuCreateWithoutCateringServiceInput, MenuUncheckedCreateWithoutCateringServiceInput> | MenuCreateWithoutCateringServiceInput[] | MenuUncheckedCreateWithoutCateringServiceInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutCateringServiceInput | MenuCreateOrConnectWithoutCateringServiceInput[]
    createMany?: MenuCreateManyCateringServiceInputEnvelope
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
  }

  export type MenuUncheckedCreateNestedManyWithoutCateringServiceInput = {
    create?: XOR<MenuCreateWithoutCateringServiceInput, MenuUncheckedCreateWithoutCateringServiceInput> | MenuCreateWithoutCateringServiceInput[] | MenuUncheckedCreateWithoutCateringServiceInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutCateringServiceInput | MenuCreateOrConnectWithoutCateringServiceInput[]
    createMany?: MenuCreateManyCateringServiceInputEnvelope
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CateringUpdateeventTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CateringUpdatedishTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CateringUpdatecuisineInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CateringUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CateringUpdatelocationInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type MenuUpdateManyWithoutCateringServiceNestedInput = {
    create?: XOR<MenuCreateWithoutCateringServiceInput, MenuUncheckedCreateWithoutCateringServiceInput> | MenuCreateWithoutCateringServiceInput[] | MenuUncheckedCreateWithoutCateringServiceInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutCateringServiceInput | MenuCreateOrConnectWithoutCateringServiceInput[]
    upsert?: MenuUpsertWithWhereUniqueWithoutCateringServiceInput | MenuUpsertWithWhereUniqueWithoutCateringServiceInput[]
    createMany?: MenuCreateManyCateringServiceInputEnvelope
    set?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    disconnect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    delete?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    update?: MenuUpdateWithWhereUniqueWithoutCateringServiceInput | MenuUpdateWithWhereUniqueWithoutCateringServiceInput[]
    updateMany?: MenuUpdateManyWithWhereWithoutCateringServiceInput | MenuUpdateManyWithWhereWithoutCateringServiceInput[]
    deleteMany?: MenuScalarWhereInput | MenuScalarWhereInput[]
  }

  export type MenuUncheckedUpdateManyWithoutCateringServiceNestedInput = {
    create?: XOR<MenuCreateWithoutCateringServiceInput, MenuUncheckedCreateWithoutCateringServiceInput> | MenuCreateWithoutCateringServiceInput[] | MenuUncheckedCreateWithoutCateringServiceInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutCateringServiceInput | MenuCreateOrConnectWithoutCateringServiceInput[]
    upsert?: MenuUpsertWithWhereUniqueWithoutCateringServiceInput | MenuUpsertWithWhereUniqueWithoutCateringServiceInput[]
    createMany?: MenuCreateManyCateringServiceInputEnvelope
    set?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    disconnect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    delete?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    update?: MenuUpdateWithWhereUniqueWithoutCateringServiceInput | MenuUpdateWithWhereUniqueWithoutCateringServiceInput[]
    updateMany?: MenuUpdateManyWithWhereWithoutCateringServiceInput | MenuUpdateManyWithWhereWithoutCateringServiceInput[]
    deleteMany?: MenuScalarWhereInput | MenuScalarWhereInput[]
  }

  export type MenuCreateimagesInput = {
    set: string[]
  }

  export type CateringCreateNestedOneWithoutMenuInput = {
    create?: XOR<CateringCreateWithoutMenuInput, CateringUncheckedCreateWithoutMenuInput>
    connectOrCreate?: CateringCreateOrConnectWithoutMenuInput
    connect?: CateringWhereUniqueInput
  }

  export type MenuUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CateringUpdateOneRequiredWithoutMenuNestedInput = {
    create?: XOR<CateringCreateWithoutMenuInput, CateringUncheckedCreateWithoutMenuInput>
    connectOrCreate?: CateringCreateOrConnectWithoutMenuInput
    upsert?: CateringUpsertWithoutMenuInput
    connect?: CateringWhereUniqueInput
    update?: XOR<XOR<CateringUpdateToOneWithWhereWithoutMenuInput, CateringUpdateWithoutMenuInput>, CateringUncheckedUpdateWithoutMenuInput>
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

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type MenuCreateWithoutCateringServiceInput = {
    id?: string
    name: string
    description?: string | null
    images?: MenuCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type MenuUncheckedCreateWithoutCateringServiceInput = {
    id?: string
    name: string
    description?: string | null
    images?: MenuCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type MenuCreateOrConnectWithoutCateringServiceInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutCateringServiceInput, MenuUncheckedCreateWithoutCateringServiceInput>
  }

  export type MenuCreateManyCateringServiceInputEnvelope = {
    data: MenuCreateManyCateringServiceInput | MenuCreateManyCateringServiceInput[]
    skipDuplicates?: boolean
  }

  export type MenuUpsertWithWhereUniqueWithoutCateringServiceInput = {
    where: MenuWhereUniqueInput
    update: XOR<MenuUpdateWithoutCateringServiceInput, MenuUncheckedUpdateWithoutCateringServiceInput>
    create: XOR<MenuCreateWithoutCateringServiceInput, MenuUncheckedCreateWithoutCateringServiceInput>
  }

  export type MenuUpdateWithWhereUniqueWithoutCateringServiceInput = {
    where: MenuWhereUniqueInput
    data: XOR<MenuUpdateWithoutCateringServiceInput, MenuUncheckedUpdateWithoutCateringServiceInput>
  }

  export type MenuUpdateManyWithWhereWithoutCateringServiceInput = {
    where: MenuScalarWhereInput
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyWithoutCateringServiceInput>
  }

  export type MenuScalarWhereInput = {
    AND?: MenuScalarWhereInput | MenuScalarWhereInput[]
    OR?: MenuScalarWhereInput[]
    NOT?: MenuScalarWhereInput | MenuScalarWhereInput[]
    id?: StringFilter<"Menu"> | string
    cateringId?: StringFilter<"Menu"> | string
    name?: StringFilter<"Menu"> | string
    description?: StringNullableFilter<"Menu"> | string | null
    images?: StringNullableListFilter<"Menu">
    createdAt?: DateTimeFilter<"Menu"> | Date | string
    updatedAt?: DateTimeFilter<"Menu"> | Date | string
    updatedBy?: StringNullableFilter<"Menu"> | string | null
    deletedAt?: DateTimeNullableFilter<"Menu"> | Date | string | null
    deletedBy?: StringNullableFilter<"Menu"> | string | null
  }

  export type CateringCreateWithoutMenuInput = {
    id?: string
    name?: string | null
    eventTypes?: CateringCreateeventTypesInput | string[]
    serviceProviderId: string
    tagLine: string
    depositPercentage: number
    discountPercentage?: number | null
    startPrice: number
    minCapacity?: number | null
    maxCapacity?: number | null
    description?: string | null
    dishTypes?: CateringCreatedishTypesInput | string[]
    cuisine?: CateringCreatecuisineInput | string[]
    images?: CateringCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location?: CateringCreatelocationInput | string[]
    postal: string
    status: $Enums.ServiceStatus
    isFeatured?: boolean
    featureExpiringAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    paymentRequired?: boolean | null
    contact?: string | null
  }

  export type CateringUncheckedCreateWithoutMenuInput = {
    id?: string
    name?: string | null
    eventTypes?: CateringCreateeventTypesInput | string[]
    serviceProviderId: string
    tagLine: string
    depositPercentage: number
    discountPercentage?: number | null
    startPrice: number
    minCapacity?: number | null
    maxCapacity?: number | null
    description?: string | null
    dishTypes?: CateringCreatedishTypesInput | string[]
    cuisine?: CateringCreatecuisineInput | string[]
    images?: CateringCreateimagesInput | string[]
    termsOfUse: string
    cancellationPolicy: string
    streetAddress: string
    streetAddress2: string
    city: string
    location?: CateringCreatelocationInput | string[]
    postal: string
    status: $Enums.ServiceStatus
    isFeatured?: boolean
    featureExpiringAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    paymentRequired?: boolean | null
    contact?: string | null
  }

  export type CateringCreateOrConnectWithoutMenuInput = {
    where: CateringWhereUniqueInput
    create: XOR<CateringCreateWithoutMenuInput, CateringUncheckedCreateWithoutMenuInput>
  }

  export type CateringUpsertWithoutMenuInput = {
    update: XOR<CateringUpdateWithoutMenuInput, CateringUncheckedUpdateWithoutMenuInput>
    create: XOR<CateringCreateWithoutMenuInput, CateringUncheckedCreateWithoutMenuInput>
    where?: CateringWhereInput
  }

  export type CateringUpdateToOneWithWhereWithoutMenuInput = {
    where?: CateringWhereInput
    data: XOR<CateringUpdateWithoutMenuInput, CateringUncheckedUpdateWithoutMenuInput>
  }

  export type CateringUpdateWithoutMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    eventTypes?: CateringUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    tagLine?: StringFieldUpdateOperationsInput | string
    depositPercentage?: IntFieldUpdateOperationsInput | number
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    startPrice?: FloatFieldUpdateOperationsInput | number
    minCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    maxCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringUpdatedishTypesInput | string[]
    cuisine?: CateringUpdatecuisineInput | string[]
    images?: CateringUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: CateringUpdatelocationInput | string[]
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featureExpiringAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CateringUncheckedUpdateWithoutMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    eventTypes?: CateringUpdateeventTypesInput | string[]
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    tagLine?: StringFieldUpdateOperationsInput | string
    depositPercentage?: IntFieldUpdateOperationsInput | number
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    startPrice?: FloatFieldUpdateOperationsInput | number
    minCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    maxCapacity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dishTypes?: CateringUpdatedishTypesInput | string[]
    cuisine?: CateringUpdatecuisineInput | string[]
    images?: CateringUpdateimagesInput | string[]
    termsOfUse?: StringFieldUpdateOperationsInput | string
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    streetAddress2?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    location?: CateringUpdatelocationInput | string[]
    postal?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featureExpiringAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paymentRequired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MenuCreateManyCateringServiceInput = {
    id?: string
    name: string
    description?: string | null
    images?: MenuCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type MenuUpdateWithoutCateringServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MenuUncheckedUpdateWithoutCateringServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MenuUncheckedUpdateManyWithoutCateringServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: MenuUpdateimagesInput | string[]
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