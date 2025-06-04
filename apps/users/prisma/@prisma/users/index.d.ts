
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model ServiceProvider
 * 
 */
export type ServiceProvider = $Result.DefaultSelection<Prisma.$ServiceProviderPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model PasswordHistory
 * 
 */
export type PasswordHistory = $Result.DefaultSelection<Prisma.$PasswordHistoryPayload>
/**
 * Model PersonalAccessTokens
 * 
 */
export type PersonalAccessTokens = $Result.DefaultSelection<Prisma.$PersonalAccessTokensPayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model SubscriptionPlan
 * 
 */
export type SubscriptionPlan = $Result.DefaultSelection<Prisma.$SubscriptionPlanPayload>
/**
 * Model KYCVerification
 * KYCVerification - know your cusomers for both proseekers and profixers
 */
export type KYCVerification = $Result.DefaultSelection<Prisma.$KYCVerificationPayload>
/**
 * Model Featured
 * 
 */
export type Featured = $Result.DefaultSelection<Prisma.$FeaturedPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VerificationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const SUBSCRIPTIONSTATUS: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type SUBSCRIPTIONSTATUS = (typeof SUBSCRIPTIONSTATUS)[keyof typeof SUBSCRIPTIONSTATUS]


export const ServiceType: {
  EVENTCENTERS: 'EVENTCENTERS',
  CATERING: 'CATERING',
  ALL: 'ALL'
};

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]


export const UserType: {
  ADMIN: 'ADMIN',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const AdminRole: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  CUSTOMERSERVICE: 'CUSTOMERSERVICE'
};

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole]


export const TokenType: {
  PASSWORDRESET: 'PASSWORDRESET',
  DELETEACCOUNT: 'DELETEACCOUNT',
  VERIFYACCOUNT: 'VERIFYACCOUNT'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  DEACTIVATED: 'DEACTIVATED',
  RESTRICTED: 'RESTRICTED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

}

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type SUBSCRIPTIONSTATUS = $Enums.SUBSCRIPTIONSTATUS

export const SUBSCRIPTIONSTATUS: typeof $Enums.SUBSCRIPTIONSTATUS

export type ServiceType = $Enums.ServiceType

export const ServiceType: typeof $Enums.ServiceType

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type AdminRole = $Enums.AdminRole

export const AdminRole: typeof $Enums.AdminRole

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceProvider`: Exposes CRUD operations for the **ServiceProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceProviders
    * const serviceProviders = await prisma.serviceProvider.findMany()
    * ```
    */
  get serviceProvider(): Prisma.ServiceProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordHistory`: Exposes CRUD operations for the **PasswordHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordHistories
    * const passwordHistories = await prisma.passwordHistory.findMany()
    * ```
    */
  get passwordHistory(): Prisma.PasswordHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personalAccessTokens`: Exposes CRUD operations for the **PersonalAccessTokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonalAccessTokens
    * const personalAccessTokens = await prisma.personalAccessTokens.findMany()
    * ```
    */
  get personalAccessTokens(): Prisma.PersonalAccessTokensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptionPlan`: Exposes CRUD operations for the **SubscriptionPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionPlans
    * const subscriptionPlans = await prisma.subscriptionPlan.findMany()
    * ```
    */
  get subscriptionPlan(): Prisma.SubscriptionPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kYCVerification`: Exposes CRUD operations for the **KYCVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KYCVerifications
    * const kYCVerifications = await prisma.kYCVerification.findMany()
    * ```
    */
  get kYCVerification(): Prisma.KYCVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.featured`: Exposes CRUD operations for the **Featured** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Featureds
    * const featureds = await prisma.featured.findMany()
    * ```
    */
  get featured(): Prisma.FeaturedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    Admin: 'Admin',
    ServiceProvider: 'ServiceProvider',
    Customer: 'Customer',
    Staff: 'Staff',
    PasswordHistory: 'PasswordHistory',
    PersonalAccessTokens: 'PersonalAccessTokens',
    Permission: 'Permission',
    SubscriptionPlan: 'SubscriptionPlan',
    KYCVerification: 'KYCVerification',
    Featured: 'Featured',
    Subscription: 'Subscription'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    banquestprousersdb?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "admin" | "serviceProvider" | "customer" | "staff" | "passwordHistory" | "personalAccessTokens" | "permission" | "subscriptionPlan" | "kYCVerification" | "featured" | "subscription"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      ServiceProvider: {
        payload: Prisma.$ServiceProviderPayload<ExtArgs>
        fields: Prisma.ServiceProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>
          }
          findFirst: {
            args: Prisma.ServiceProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>
          }
          findMany: {
            args: Prisma.ServiceProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>[]
          }
          create: {
            args: Prisma.ServiceProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>
          }
          createMany: {
            args: Prisma.ServiceProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>[]
          }
          delete: {
            args: Prisma.ServiceProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>
          }
          update: {
            args: Prisma.ServiceProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>
          }
          deleteMany: {
            args: Prisma.ServiceProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>[]
          }
          upsert: {
            args: Prisma.ServiceProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProviderPayload>
          }
          aggregate: {
            args: Prisma.ServiceProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceProvider>
          }
          groupBy: {
            args: Prisma.ServiceProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceProviderCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceProviderCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      PasswordHistory: {
        payload: Prisma.$PasswordHistoryPayload<ExtArgs>
        fields: Prisma.PasswordHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          findFirst: {
            args: Prisma.PasswordHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          findMany: {
            args: Prisma.PasswordHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[]
          }
          create: {
            args: Prisma.PasswordHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          createMany: {
            args: Prisma.PasswordHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[]
          }
          delete: {
            args: Prisma.PasswordHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          update: {
            args: Prisma.PasswordHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PasswordHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[]
          }
          upsert: {
            args: Prisma.PasswordHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>
          }
          aggregate: {
            args: Prisma.PasswordHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordHistory>
          }
          groupBy: {
            args: Prisma.PasswordHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordHistoryCountAggregateOutputType> | number
          }
        }
      }
      PersonalAccessTokens: {
        payload: Prisma.$PersonalAccessTokensPayload<ExtArgs>
        fields: Prisma.PersonalAccessTokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalAccessTokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalAccessTokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>
          }
          findFirst: {
            args: Prisma.PersonalAccessTokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalAccessTokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>
          }
          findMany: {
            args: Prisma.PersonalAccessTokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>[]
          }
          create: {
            args: Prisma.PersonalAccessTokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>
          }
          createMany: {
            args: Prisma.PersonalAccessTokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalAccessTokensCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>[]
          }
          delete: {
            args: Prisma.PersonalAccessTokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>
          }
          update: {
            args: Prisma.PersonalAccessTokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>
          }
          deleteMany: {
            args: Prisma.PersonalAccessTokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalAccessTokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalAccessTokensUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>[]
          }
          upsert: {
            args: Prisma.PersonalAccessTokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalAccessTokensPayload>
          }
          aggregate: {
            args: Prisma.PersonalAccessTokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonalAccessTokens>
          }
          groupBy: {
            args: Prisma.PersonalAccessTokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalAccessTokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalAccessTokensCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalAccessTokensCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionPlan: {
        payload: Prisma.$SubscriptionPlanPayload<ExtArgs>
        fields: Prisma.SubscriptionPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          findMany: {
            args: Prisma.SubscriptionPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[]
          }
          create: {
            args: Prisma.SubscriptionPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          createMany: {
            args: Prisma.SubscriptionPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          update: {
            args: Prisma.SubscriptionPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionPlan>
          }
          groupBy: {
            args: Prisma.SubscriptionPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionPlanCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionPlanCountAggregateOutputType> | number
          }
        }
      }
      KYCVerification: {
        payload: Prisma.$KYCVerificationPayload<ExtArgs>
        fields: Prisma.KYCVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KYCVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KYCVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>
          }
          findFirst: {
            args: Prisma.KYCVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KYCVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>
          }
          findMany: {
            args: Prisma.KYCVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>[]
          }
          create: {
            args: Prisma.KYCVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>
          }
          createMany: {
            args: Prisma.KYCVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KYCVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>[]
          }
          delete: {
            args: Prisma.KYCVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>
          }
          update: {
            args: Prisma.KYCVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>
          }
          deleteMany: {
            args: Prisma.KYCVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KYCVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KYCVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>[]
          }
          upsert: {
            args: Prisma.KYCVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCVerificationPayload>
          }
          aggregate: {
            args: Prisma.KYCVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKYCVerification>
          }
          groupBy: {
            args: Prisma.KYCVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<KYCVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.KYCVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<KYCVerificationCountAggregateOutputType> | number
          }
        }
      }
      Featured: {
        payload: Prisma.$FeaturedPayload<ExtArgs>
        fields: Prisma.FeaturedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeaturedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeaturedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>
          }
          findFirst: {
            args: Prisma.FeaturedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeaturedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>
          }
          findMany: {
            args: Prisma.FeaturedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>[]
          }
          create: {
            args: Prisma.FeaturedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>
          }
          createMany: {
            args: Prisma.FeaturedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeaturedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>[]
          }
          delete: {
            args: Prisma.FeaturedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>
          }
          update: {
            args: Prisma.FeaturedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>
          }
          deleteMany: {
            args: Prisma.FeaturedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeaturedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeaturedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>[]
          }
          upsert: {
            args: Prisma.FeaturedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturedPayload>
          }
          aggregate: {
            args: Prisma.FeaturedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeatured>
          }
          groupBy: {
            args: Prisma.FeaturedGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeaturedGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeaturedCountArgs<ExtArgs>
            result: $Utils.Optional<FeaturedCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
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
    user?: UserOmit
    admin?: AdminOmit
    serviceProvider?: ServiceProviderOmit
    customer?: CustomerOmit
    staff?: StaffOmit
    passwordHistory?: PasswordHistoryOmit
    personalAccessTokens?: PersonalAccessTokensOmit
    permission?: PermissionOmit
    subscriptionPlan?: SubscriptionPlanOmit
    kYCVerification?: KYCVerificationOmit
    featured?: FeaturedOmit
    subscription?: SubscriptionOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    personalAccessToken: number
    featured: number
    passwordHistory: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personalAccessToken?: boolean | UserCountOutputTypeCountPersonalAccessTokenArgs
    featured?: boolean | UserCountOutputTypeCountFeaturedArgs
    passwordHistory?: boolean | UserCountOutputTypeCountPasswordHistoryArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPersonalAccessTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalAccessTokensWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeaturedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeaturedWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordHistoryWhereInput
  }


  /**
   * Count Type ServiceProviderCountOutputType
   */

  export type ServiceProviderCountOutputType = {
    staffs: number
  }

  export type ServiceProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staffs?: boolean | ServiceProviderCountOutputTypeCountStaffsArgs
  }

  // Custom InputTypes
  /**
   * ServiceProviderCountOutputType without action
   */
  export type ServiceProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProviderCountOutputType
     */
    select?: ServiceProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceProviderCountOutputType without action
   */
  export type ServiceProviderCountOutputTypeCountStaffsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    loginAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    loginAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    isEmailVerified: boolean | null
    password: string | null
    userType: $Enums.UserType | null
    status: $Enums.UserStatus | null
    refreshToken: string | null
    lastLoginAt: Date | null
    loginAttempts: number | null
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    state: string | null
    country: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    isEmailVerified: boolean | null
    password: string | null
    userType: $Enums.UserType | null
    status: $Enums.UserStatus | null
    refreshToken: string | null
    lastLoginAt: Date | null
    loginAttempts: number | null
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    state: string | null
    country: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    isEmailVerified: number
    password: number
    userType: number
    status: number
    refreshToken: number
    lastLoginAt: number
    loginAttempts: number
    streetAddress: number
    streetAddress2: number
    city: number
    state: number
    country: number
    location: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    loginAttempts?: true
  }

  export type UserSumAggregateInputType = {
    loginAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    isEmailVerified?: true
    password?: true
    userType?: true
    status?: true
    refreshToken?: true
    lastLoginAt?: true
    loginAttempts?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    state?: true
    country?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    isEmailVerified?: true
    password?: true
    userType?: true
    status?: true
    refreshToken?: true
    lastLoginAt?: true
    loginAttempts?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    state?: true
    country?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    isEmailVerified?: true
    password?: true
    userType?: true
    status?: true
    refreshToken?: true
    lastLoginAt?: true
    loginAttempts?: true
    streetAddress?: true
    streetAddress2?: true
    city?: true
    state?: true
    country?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string | null
    lastName: string | null
    email: string
    isEmailVerified: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken: string | null
    lastLoginAt: Date | null
    loginAttempts: number
    streetAddress: string | null
    streetAddress2: string | null
    city: string | null
    state: string | null
    country: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    deletedBy: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    isEmailVerified?: boolean
    password?: boolean
    userType?: boolean
    status?: boolean
    refreshToken?: boolean
    lastLoginAt?: boolean
    loginAttempts?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    admin?: boolean | User$adminArgs<ExtArgs>
    serviceProvider?: boolean | User$serviceProviderArgs<ExtArgs>
    customer?: boolean | User$customerArgs<ExtArgs>
    staff?: boolean | User$staffArgs<ExtArgs>
    personalAccessToken?: boolean | User$personalAccessTokenArgs<ExtArgs>
    kycVerification?: boolean | User$kycVerificationArgs<ExtArgs>
    featured?: boolean | User$featuredArgs<ExtArgs>
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    passwordHistory?: boolean | User$passwordHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    isEmailVerified?: boolean
    password?: boolean
    userType?: boolean
    status?: boolean
    refreshToken?: boolean
    lastLoginAt?: boolean
    loginAttempts?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    isEmailVerified?: boolean
    password?: boolean
    userType?: boolean
    status?: boolean
    refreshToken?: boolean
    lastLoginAt?: boolean
    loginAttempts?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    isEmailVerified?: boolean
    password?: boolean
    userType?: boolean
    status?: boolean
    refreshToken?: boolean
    lastLoginAt?: boolean
    loginAttempts?: boolean
    streetAddress?: boolean
    streetAddress2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "isEmailVerified" | "password" | "userType" | "status" | "refreshToken" | "lastLoginAt" | "loginAttempts" | "streetAddress" | "streetAddress2" | "city" | "state" | "country" | "location" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | User$adminArgs<ExtArgs>
    serviceProvider?: boolean | User$serviceProviderArgs<ExtArgs>
    customer?: boolean | User$customerArgs<ExtArgs>
    staff?: boolean | User$staffArgs<ExtArgs>
    personalAccessToken?: boolean | User$personalAccessTokenArgs<ExtArgs>
    kycVerification?: boolean | User$kycVerificationArgs<ExtArgs>
    featured?: boolean | User$featuredArgs<ExtArgs>
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    passwordHistory?: boolean | User$passwordHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs> | null
      serviceProvider: Prisma.$ServiceProviderPayload<ExtArgs> | null
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      staff: Prisma.$StaffPayload<ExtArgs> | null
      personalAccessToken: Prisma.$PersonalAccessTokensPayload<ExtArgs>[]
      kycVerification: Prisma.$KYCVerificationPayload<ExtArgs> | null
      featured: Prisma.$FeaturedPayload<ExtArgs>[]
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
      passwordHistory: Prisma.$PasswordHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string | null
      lastName: string | null
      email: string
      isEmailVerified: boolean
      password: string
      userType: $Enums.UserType
      status: $Enums.UserStatus
      refreshToken: string | null
      lastLoginAt: Date | null
      loginAttempts: number
      streetAddress: string | null
      streetAddress2: string | null
      city: string | null
      state: string | null
      country: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends User$adminArgs<ExtArgs> = {}>(args?: Subset<T, User$adminArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    serviceProvider<T extends User$serviceProviderArgs<ExtArgs> = {}>(args?: Subset<T, User$serviceProviderArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    customer<T extends User$customerArgs<ExtArgs> = {}>(args?: Subset<T, User$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    staff<T extends User$staffArgs<ExtArgs> = {}>(args?: Subset<T, User$staffArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    personalAccessToken<T extends User$personalAccessTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$personalAccessTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    kycVerification<T extends User$kycVerificationArgs<ExtArgs> = {}>(args?: Subset<T, User$kycVerificationArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    featured<T extends User$featuredArgs<ExtArgs> = {}>(args?: Subset<T, User$featuredArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscription<T extends User$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    passwordHistory<T extends User$passwordHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly password: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly loginAttempts: FieldRef<"User", 'Int'>
    readonly streetAddress: FieldRef<"User", 'String'>
    readonly streetAddress2: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly state: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly deletedBy: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.admin
   */
  export type User$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * User.serviceProvider
   */
  export type User$serviceProviderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    where?: ServiceProviderWhereInput
  }

  /**
   * User.customer
   */
  export type User$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * User.staff
   */
  export type User$staffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
  }

  /**
   * User.personalAccessToken
   */
  export type User$personalAccessTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    where?: PersonalAccessTokensWhereInput
    orderBy?: PersonalAccessTokensOrderByWithRelationInput | PersonalAccessTokensOrderByWithRelationInput[]
    cursor?: PersonalAccessTokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonalAccessTokensScalarFieldEnum | PersonalAccessTokensScalarFieldEnum[]
  }

  /**
   * User.kycVerification
   */
  export type User$kycVerificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    where?: KYCVerificationWhereInput
  }

  /**
   * User.featured
   */
  export type User$featuredArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    where?: FeaturedWhereInput
    orderBy?: FeaturedOrderByWithRelationInput | FeaturedOrderByWithRelationInput[]
    cursor?: FeaturedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeaturedScalarFieldEnum | FeaturedScalarFieldEnum[]
  }

  /**
   * User.subscription
   */
  export type User$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * User.passwordHistory
   */
  export type User$passwordHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    where?: PasswordHistoryWhereInput
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    cursor?: PasswordHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    role: $Enums.AdminRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    role: $Enums.AdminRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    role: $Enums.AdminRole | null
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.AdminRole | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
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
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'AdminRole'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model ServiceProvider
   */

  export type AggregateServiceProvider = {
    _count: ServiceProviderCountAggregateOutputType | null
    _min: ServiceProviderMinAggregateOutputType | null
    _max: ServiceProviderMaxAggregateOutputType | null
  }

  export type ServiceProviderMinAggregateOutputType = {
    id: string | null
    businessName: string | null
    serviceType: $Enums.ServiceType | null
    businessLogo: string | null
    pricingInfo: string | null
    regulations: string | null
    additionalInformation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceProviderMaxAggregateOutputType = {
    id: string | null
    businessName: string | null
    serviceType: $Enums.ServiceType | null
    businessLogo: string | null
    pricingInfo: string | null
    regulations: string | null
    additionalInformation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceProviderCountAggregateOutputType = {
    id: number
    businessName: number
    serviceType: number
    businessLogo: number
    pricingInfo: number
    regulations: number
    additionalInformation: number
    workingHours: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceProviderMinAggregateInputType = {
    id?: true
    businessName?: true
    serviceType?: true
    businessLogo?: true
    pricingInfo?: true
    regulations?: true
    additionalInformation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceProviderMaxAggregateInputType = {
    id?: true
    businessName?: true
    serviceType?: true
    businessLogo?: true
    pricingInfo?: true
    regulations?: true
    additionalInformation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceProviderCountAggregateInputType = {
    id?: true
    businessName?: true
    serviceType?: true
    businessLogo?: true
    pricingInfo?: true
    regulations?: true
    additionalInformation?: true
    workingHours?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceProvider to aggregate.
     */
    where?: ServiceProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProviders to fetch.
     */
    orderBy?: ServiceProviderOrderByWithRelationInput | ServiceProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceProviders
    **/
    _count?: true | ServiceProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceProviderMaxAggregateInputType
  }

  export type GetServiceProviderAggregateType<T extends ServiceProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceProvider[P]>
      : GetScalarType<T[P], AggregateServiceProvider[P]>
  }




  export type ServiceProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceProviderWhereInput
    orderBy?: ServiceProviderOrderByWithAggregationInput | ServiceProviderOrderByWithAggregationInput[]
    by: ServiceProviderScalarFieldEnum[] | ServiceProviderScalarFieldEnum
    having?: ServiceProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceProviderCountAggregateInputType | true
    _min?: ServiceProviderMinAggregateInputType
    _max?: ServiceProviderMaxAggregateInputType
  }

  export type ServiceProviderGroupByOutputType = {
    id: string
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo: string | null
    pricingInfo: string | null
    regulations: string | null
    additionalInformation: string | null
    workingHours: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceProviderCountAggregateOutputType | null
    _min: ServiceProviderMinAggregateOutputType | null
    _max: ServiceProviderMaxAggregateOutputType | null
  }

  type GetServiceProviderGroupByPayload<T extends ServiceProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceProviderGroupByOutputType[P]>
        }
      >
    >


  export type ServiceProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessName?: boolean
    serviceType?: boolean
    businessLogo?: boolean
    pricingInfo?: boolean
    regulations?: boolean
    additionalInformation?: boolean
    workingHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    staffs?: boolean | ServiceProvider$staffsArgs<ExtArgs>
    _count?: boolean | ServiceProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceProvider"]>

  export type ServiceProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessName?: boolean
    serviceType?: boolean
    businessLogo?: boolean
    pricingInfo?: boolean
    regulations?: boolean
    additionalInformation?: boolean
    workingHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceProvider"]>

  export type ServiceProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessName?: boolean
    serviceType?: boolean
    businessLogo?: boolean
    pricingInfo?: boolean
    regulations?: boolean
    additionalInformation?: boolean
    workingHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceProvider"]>

  export type ServiceProviderSelectScalar = {
    id?: boolean
    businessName?: boolean
    serviceType?: boolean
    businessLogo?: boolean
    pricingInfo?: boolean
    regulations?: boolean
    additionalInformation?: boolean
    workingHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "businessName" | "serviceType" | "businessLogo" | "pricingInfo" | "regulations" | "additionalInformation" | "workingHours" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceProvider"]>
  export type ServiceProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    staffs?: boolean | ServiceProvider$staffsArgs<ExtArgs>
    _count?: boolean | ServiceProviderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServiceProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ServiceProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceProvider"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      staffs: Prisma.$StaffPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessName: string
      serviceType: $Enums.ServiceType
      businessLogo: string | null
      pricingInfo: string | null
      regulations: string | null
      additionalInformation: string | null
      workingHours: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceProvider"]>
    composites: {}
  }

  type ServiceProviderGetPayload<S extends boolean | null | undefined | ServiceProviderDefaultArgs> = $Result.GetResult<Prisma.$ServiceProviderPayload, S>

  type ServiceProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceProviderCountAggregateInputType | true
    }

  export interface ServiceProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceProvider'], meta: { name: 'ServiceProvider' } }
    /**
     * Find zero or one ServiceProvider that matches the filter.
     * @param {ServiceProviderFindUniqueArgs} args - Arguments to find a ServiceProvider
     * @example
     * // Get one ServiceProvider
     * const serviceProvider = await prisma.serviceProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceProviderFindUniqueArgs>(args: SelectSubset<T, ServiceProviderFindUniqueArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceProviderFindUniqueOrThrowArgs} args - Arguments to find a ServiceProvider
     * @example
     * // Get one ServiceProvider
     * const serviceProvider = await prisma.serviceProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderFindFirstArgs} args - Arguments to find a ServiceProvider
     * @example
     * // Get one ServiceProvider
     * const serviceProvider = await prisma.serviceProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceProviderFindFirstArgs>(args?: SelectSubset<T, ServiceProviderFindFirstArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderFindFirstOrThrowArgs} args - Arguments to find a ServiceProvider
     * @example
     * // Get one ServiceProvider
     * const serviceProvider = await prisma.serviceProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceProviders
     * const serviceProviders = await prisma.serviceProvider.findMany()
     * 
     * // Get first 10 ServiceProviders
     * const serviceProviders = await prisma.serviceProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceProviderWithIdOnly = await prisma.serviceProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceProviderFindManyArgs>(args?: SelectSubset<T, ServiceProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceProvider.
     * @param {ServiceProviderCreateArgs} args - Arguments to create a ServiceProvider.
     * @example
     * // Create one ServiceProvider
     * const ServiceProvider = await prisma.serviceProvider.create({
     *   data: {
     *     // ... data to create a ServiceProvider
     *   }
     * })
     * 
     */
    create<T extends ServiceProviderCreateArgs>(args: SelectSubset<T, ServiceProviderCreateArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceProviders.
     * @param {ServiceProviderCreateManyArgs} args - Arguments to create many ServiceProviders.
     * @example
     * // Create many ServiceProviders
     * const serviceProvider = await prisma.serviceProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceProviderCreateManyArgs>(args?: SelectSubset<T, ServiceProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceProviders and returns the data saved in the database.
     * @param {ServiceProviderCreateManyAndReturnArgs} args - Arguments to create many ServiceProviders.
     * @example
     * // Create many ServiceProviders
     * const serviceProvider = await prisma.serviceProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceProviders and only return the `id`
     * const serviceProviderWithIdOnly = await prisma.serviceProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceProvider.
     * @param {ServiceProviderDeleteArgs} args - Arguments to delete one ServiceProvider.
     * @example
     * // Delete one ServiceProvider
     * const ServiceProvider = await prisma.serviceProvider.delete({
     *   where: {
     *     // ... filter to delete one ServiceProvider
     *   }
     * })
     * 
     */
    delete<T extends ServiceProviderDeleteArgs>(args: SelectSubset<T, ServiceProviderDeleteArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceProvider.
     * @param {ServiceProviderUpdateArgs} args - Arguments to update one ServiceProvider.
     * @example
     * // Update one ServiceProvider
     * const serviceProvider = await prisma.serviceProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceProviderUpdateArgs>(args: SelectSubset<T, ServiceProviderUpdateArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceProviders.
     * @param {ServiceProviderDeleteManyArgs} args - Arguments to filter ServiceProviders to delete.
     * @example
     * // Delete a few ServiceProviders
     * const { count } = await prisma.serviceProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceProviderDeleteManyArgs>(args?: SelectSubset<T, ServiceProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceProviders
     * const serviceProvider = await prisma.serviceProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceProviderUpdateManyArgs>(args: SelectSubset<T, ServiceProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceProviders and returns the data updated in the database.
     * @param {ServiceProviderUpdateManyAndReturnArgs} args - Arguments to update many ServiceProviders.
     * @example
     * // Update many ServiceProviders
     * const serviceProvider = await prisma.serviceProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceProviders and only return the `id`
     * const serviceProviderWithIdOnly = await prisma.serviceProvider.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceProvider.
     * @param {ServiceProviderUpsertArgs} args - Arguments to update or create a ServiceProvider.
     * @example
     * // Update or create a ServiceProvider
     * const serviceProvider = await prisma.serviceProvider.upsert({
     *   create: {
     *     // ... data to create a ServiceProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceProvider we want to update
     *   }
     * })
     */
    upsert<T extends ServiceProviderUpsertArgs>(args: SelectSubset<T, ServiceProviderUpsertArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderCountArgs} args - Arguments to filter ServiceProviders to count.
     * @example
     * // Count the number of ServiceProviders
     * const count = await prisma.serviceProvider.count({
     *   where: {
     *     // ... the filter for the ServiceProviders we want to count
     *   }
     * })
    **/
    count<T extends ServiceProviderCountArgs>(
      args?: Subset<T, ServiceProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceProviderAggregateArgs>(args: Subset<T, ServiceProviderAggregateArgs>): Prisma.PrismaPromise<GetServiceProviderAggregateType<T>>

    /**
     * Group by ServiceProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProviderGroupByArgs} args - Group by arguments.
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
      T extends ServiceProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceProviderGroupByArgs['orderBy'] }
        : { orderBy?: ServiceProviderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceProvider model
   */
  readonly fields: ServiceProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    staffs<T extends ServiceProvider$staffsArgs<ExtArgs> = {}>(args?: Subset<T, ServiceProvider$staffsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ServiceProvider model
   */
  interface ServiceProviderFieldRefs {
    readonly id: FieldRef<"ServiceProvider", 'String'>
    readonly businessName: FieldRef<"ServiceProvider", 'String'>
    readonly serviceType: FieldRef<"ServiceProvider", 'ServiceType'>
    readonly businessLogo: FieldRef<"ServiceProvider", 'String'>
    readonly pricingInfo: FieldRef<"ServiceProvider", 'String'>
    readonly regulations: FieldRef<"ServiceProvider", 'String'>
    readonly additionalInformation: FieldRef<"ServiceProvider", 'String'>
    readonly workingHours: FieldRef<"ServiceProvider", 'Json'>
    readonly createdAt: FieldRef<"ServiceProvider", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceProvider findUnique
   */
  export type ServiceProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProvider to fetch.
     */
    where: ServiceProviderWhereUniqueInput
  }

  /**
   * ServiceProvider findUniqueOrThrow
   */
  export type ServiceProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProvider to fetch.
     */
    where: ServiceProviderWhereUniqueInput
  }

  /**
   * ServiceProvider findFirst
   */
  export type ServiceProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProvider to fetch.
     */
    where?: ServiceProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProviders to fetch.
     */
    orderBy?: ServiceProviderOrderByWithRelationInput | ServiceProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceProviders.
     */
    cursor?: ServiceProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceProviders.
     */
    distinct?: ServiceProviderScalarFieldEnum | ServiceProviderScalarFieldEnum[]
  }

  /**
   * ServiceProvider findFirstOrThrow
   */
  export type ServiceProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProvider to fetch.
     */
    where?: ServiceProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProviders to fetch.
     */
    orderBy?: ServiceProviderOrderByWithRelationInput | ServiceProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceProviders.
     */
    cursor?: ServiceProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceProviders.
     */
    distinct?: ServiceProviderScalarFieldEnum | ServiceProviderScalarFieldEnum[]
  }

  /**
   * ServiceProvider findMany
   */
  export type ServiceProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProviders to fetch.
     */
    where?: ServiceProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProviders to fetch.
     */
    orderBy?: ServiceProviderOrderByWithRelationInput | ServiceProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceProviders.
     */
    cursor?: ServiceProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProviders.
     */
    skip?: number
    distinct?: ServiceProviderScalarFieldEnum | ServiceProviderScalarFieldEnum[]
  }

  /**
   * ServiceProvider create
   */
  export type ServiceProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceProvider.
     */
    data: XOR<ServiceProviderCreateInput, ServiceProviderUncheckedCreateInput>
  }

  /**
   * ServiceProvider createMany
   */
  export type ServiceProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceProviders.
     */
    data: ServiceProviderCreateManyInput | ServiceProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceProvider createManyAndReturn
   */
  export type ServiceProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceProviders.
     */
    data: ServiceProviderCreateManyInput | ServiceProviderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceProvider update
   */
  export type ServiceProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceProvider.
     */
    data: XOR<ServiceProviderUpdateInput, ServiceProviderUncheckedUpdateInput>
    /**
     * Choose, which ServiceProvider to update.
     */
    where: ServiceProviderWhereUniqueInput
  }

  /**
   * ServiceProvider updateMany
   */
  export type ServiceProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceProviders.
     */
    data: XOR<ServiceProviderUpdateManyMutationInput, ServiceProviderUncheckedUpdateManyInput>
    /**
     * Filter which ServiceProviders to update
     */
    where?: ServiceProviderWhereInput
    /**
     * Limit how many ServiceProviders to update.
     */
    limit?: number
  }

  /**
   * ServiceProvider updateManyAndReturn
   */
  export type ServiceProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * The data used to update ServiceProviders.
     */
    data: XOR<ServiceProviderUpdateManyMutationInput, ServiceProviderUncheckedUpdateManyInput>
    /**
     * Filter which ServiceProviders to update
     */
    where?: ServiceProviderWhereInput
    /**
     * Limit how many ServiceProviders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceProvider upsert
   */
  export type ServiceProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceProvider to update in case it exists.
     */
    where: ServiceProviderWhereUniqueInput
    /**
     * In case the ServiceProvider found by the `where` argument doesn't exist, create a new ServiceProvider with this data.
     */
    create: XOR<ServiceProviderCreateInput, ServiceProviderUncheckedCreateInput>
    /**
     * In case the ServiceProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceProviderUpdateInput, ServiceProviderUncheckedUpdateInput>
  }

  /**
   * ServiceProvider delete
   */
  export type ServiceProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
    /**
     * Filter which ServiceProvider to delete.
     */
    where: ServiceProviderWhereUniqueInput
  }

  /**
   * ServiceProvider deleteMany
   */
  export type ServiceProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceProviders to delete
     */
    where?: ServiceProviderWhereInput
    /**
     * Limit how many ServiceProviders to delete.
     */
    limit?: number
  }

  /**
   * ServiceProvider.staffs
   */
  export type ServiceProvider$staffsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    cursor?: StaffWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * ServiceProvider without action
   */
  export type ServiceProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProvider
     */
    select?: ServiceProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProvider
     */
    omit?: ServiceProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProviderInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    referralCode: string | null
    profilePicture: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    referralCode: string | null
    profilePicture: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    historyOfServiceProviders: number
    preferences: number
    referralCode: number
    profilePicture: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    referralCode?: true
    profilePicture?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    referralCode?: true
    profilePicture?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    historyOfServiceProviders?: true
    preferences?: true
    referralCode?: true
    profilePicture?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    historyOfServiceProviders: string[]
    preferences: JsonValue | null
    referralCode: string | null
    profilePicture: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    historyOfServiceProviders?: boolean
    preferences?: boolean
    referralCode?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    historyOfServiceProviders?: boolean
    preferences?: boolean
    referralCode?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    historyOfServiceProviders?: boolean
    preferences?: boolean
    referralCode?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    historyOfServiceProviders?: boolean
    preferences?: boolean
    referralCode?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "historyOfServiceProviders" | "preferences" | "referralCode" | "profilePicture" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      historyOfServiceProviders: string[]
      preferences: Prisma.JsonValue | null
      referralCode: string | null
      profilePicture: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly historyOfServiceProviders: FieldRef<"Customer", 'String[]'>
    readonly preferences: FieldRef<"Customer", 'Json'>
    readonly referralCode: FieldRef<"Customer", 'String'>
    readonly profilePicture: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    id: string | null
    serviceProviderId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    id: string | null
    serviceProviderId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    serviceProviderId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    id?: true
    serviceProviderId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    serviceProviderId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    serviceProviderId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: string
    serviceProviderId: string
    createdAt: Date
    updatedAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceProviderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    serviceProvider?: boolean | ServiceProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceProviderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    serviceProvider?: boolean | ServiceProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceProviderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    serviceProvider?: boolean | ServiceProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    serviceProviderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceProviderId" | "createdAt" | "updatedAt", ExtArgs["result"]["staff"]>
  export type StaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    serviceProvider?: boolean | ServiceProviderDefaultArgs<ExtArgs>
  }
  export type StaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    serviceProvider?: boolean | ServiceProviderDefaultArgs<ExtArgs>
  }
  export type StaffIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    serviceProvider?: boolean | ServiceProviderDefaultArgs<ExtArgs>
  }

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      serviceProvider: Prisma.$ServiceProviderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceProviderId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff and returns the data updated in the database.
     * @param {StaffUpdateManyAndReturnArgs} args - Arguments to update many Staff.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.updateManyAndReturn({
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
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
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
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    serviceProvider<T extends ServiceProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceProviderDefaultArgs<ExtArgs>>): Prisma__ServiceProviderClient<$Result.GetResult<Prisma.$ServiceProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Staff model
   */
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'String'>
    readonly serviceProviderId: FieldRef<"Staff", 'String'>
    readonly createdAt: FieldRef<"Staff", 'DateTime'>
    readonly updatedAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff updateManyAndReturn
   */
  export type StaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to delete.
     */
    limit?: number
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
  }


  /**
   * Model PasswordHistory
   */

  export type AggregatePasswordHistory = {
    _count: PasswordHistoryCountAggregateOutputType | null
    _min: PasswordHistoryMinAggregateOutputType | null
    _max: PasswordHistoryMaxAggregateOutputType | null
  }

  export type PasswordHistoryMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PasswordHistoryMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PasswordHistoryCountAggregateOutputType = {
    id: number
    user_id: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PasswordHistoryMinAggregateInputType = {
    id?: true
    user_id?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PasswordHistoryMaxAggregateInputType = {
    id?: true
    user_id?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PasswordHistoryCountAggregateInputType = {
    id?: true
    user_id?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PasswordHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordHistory to aggregate.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordHistories
    **/
    _count?: true | PasswordHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordHistoryMaxAggregateInputType
  }

  export type GetPasswordHistoryAggregateType<T extends PasswordHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordHistory[P]>
      : GetScalarType<T[P], AggregatePasswordHistory[P]>
  }




  export type PasswordHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordHistoryWhereInput
    orderBy?: PasswordHistoryOrderByWithAggregationInput | PasswordHistoryOrderByWithAggregationInput[]
    by: PasswordHistoryScalarFieldEnum[] | PasswordHistoryScalarFieldEnum
    having?: PasswordHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordHistoryCountAggregateInputType | true
    _min?: PasswordHistoryMinAggregateInputType
    _max?: PasswordHistoryMaxAggregateInputType
  }

  export type PasswordHistoryGroupByOutputType = {
    id: string
    user_id: string
    password: string
    createdAt: Date
    updatedAt: Date | null
    _count: PasswordHistoryCountAggregateOutputType | null
    _min: PasswordHistoryMinAggregateOutputType | null
    _max: PasswordHistoryMaxAggregateOutputType | null
  }

  type GetPasswordHistoryGroupByPayload<T extends PasswordHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PasswordHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordHistory"]>

  export type PasswordHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordHistory"]>

  export type PasswordHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordHistory"]>

  export type PasswordHistorySelectScalar = {
    id?: boolean
    user_id?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PasswordHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["passwordHistory"]>
  export type PasswordHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      password: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["passwordHistory"]>
    composites: {}
  }

  type PasswordHistoryGetPayload<S extends boolean | null | undefined | PasswordHistoryDefaultArgs> = $Result.GetResult<Prisma.$PasswordHistoryPayload, S>

  type PasswordHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordHistoryCountAggregateInputType | true
    }

  export interface PasswordHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordHistory'], meta: { name: 'PasswordHistory' } }
    /**
     * Find zero or one PasswordHistory that matches the filter.
     * @param {PasswordHistoryFindUniqueArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordHistoryFindUniqueArgs>(args: SelectSubset<T, PasswordHistoryFindUniqueArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordHistoryFindUniqueOrThrowArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryFindFirstArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordHistoryFindFirstArgs>(args?: SelectSubset<T, PasswordHistoryFindFirstArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryFindFirstOrThrowArgs} args - Arguments to find a PasswordHistory
     * @example
     * // Get one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordHistories
     * const passwordHistories = await prisma.passwordHistory.findMany()
     * 
     * // Get first 10 PasswordHistories
     * const passwordHistories = await prisma.passwordHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordHistoryWithIdOnly = await prisma.passwordHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordHistoryFindManyArgs>(args?: SelectSubset<T, PasswordHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordHistory.
     * @param {PasswordHistoryCreateArgs} args - Arguments to create a PasswordHistory.
     * @example
     * // Create one PasswordHistory
     * const PasswordHistory = await prisma.passwordHistory.create({
     *   data: {
     *     // ... data to create a PasswordHistory
     *   }
     * })
     * 
     */
    create<T extends PasswordHistoryCreateArgs>(args: SelectSubset<T, PasswordHistoryCreateArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordHistories.
     * @param {PasswordHistoryCreateManyArgs} args - Arguments to create many PasswordHistories.
     * @example
     * // Create many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordHistoryCreateManyArgs>(args?: SelectSubset<T, PasswordHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordHistories and returns the data saved in the database.
     * @param {PasswordHistoryCreateManyAndReturnArgs} args - Arguments to create many PasswordHistories.
     * @example
     * // Create many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordHistories and only return the `id`
     * const passwordHistoryWithIdOnly = await prisma.passwordHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordHistory.
     * @param {PasswordHistoryDeleteArgs} args - Arguments to delete one PasswordHistory.
     * @example
     * // Delete one PasswordHistory
     * const PasswordHistory = await prisma.passwordHistory.delete({
     *   where: {
     *     // ... filter to delete one PasswordHistory
     *   }
     * })
     * 
     */
    delete<T extends PasswordHistoryDeleteArgs>(args: SelectSubset<T, PasswordHistoryDeleteArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordHistory.
     * @param {PasswordHistoryUpdateArgs} args - Arguments to update one PasswordHistory.
     * @example
     * // Update one PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordHistoryUpdateArgs>(args: SelectSubset<T, PasswordHistoryUpdateArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordHistories.
     * @param {PasswordHistoryDeleteManyArgs} args - Arguments to filter PasswordHistories to delete.
     * @example
     * // Delete a few PasswordHistories
     * const { count } = await prisma.passwordHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordHistoryDeleteManyArgs>(args?: SelectSubset<T, PasswordHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordHistoryUpdateManyArgs>(args: SelectSubset<T, PasswordHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordHistories and returns the data updated in the database.
     * @param {PasswordHistoryUpdateManyAndReturnArgs} args - Arguments to update many PasswordHistories.
     * @example
     * // Update many PasswordHistories
     * const passwordHistory = await prisma.passwordHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordHistories and only return the `id`
     * const passwordHistoryWithIdOnly = await prisma.passwordHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends PasswordHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordHistory.
     * @param {PasswordHistoryUpsertArgs} args - Arguments to update or create a PasswordHistory.
     * @example
     * // Update or create a PasswordHistory
     * const passwordHistory = await prisma.passwordHistory.upsert({
     *   create: {
     *     // ... data to create a PasswordHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordHistory we want to update
     *   }
     * })
     */
    upsert<T extends PasswordHistoryUpsertArgs>(args: SelectSubset<T, PasswordHistoryUpsertArgs<ExtArgs>>): Prisma__PasswordHistoryClient<$Result.GetResult<Prisma.$PasswordHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryCountArgs} args - Arguments to filter PasswordHistories to count.
     * @example
     * // Count the number of PasswordHistories
     * const count = await prisma.passwordHistory.count({
     *   where: {
     *     // ... the filter for the PasswordHistories we want to count
     *   }
     * })
    **/
    count<T extends PasswordHistoryCountArgs>(
      args?: Subset<T, PasswordHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordHistoryAggregateArgs>(args: Subset<T, PasswordHistoryAggregateArgs>): Prisma.PrismaPromise<GetPasswordHistoryAggregateType<T>>

    /**
     * Group by PasswordHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordHistoryGroupByArgs} args - Group by arguments.
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
      T extends PasswordHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PasswordHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordHistory model
   */
  readonly fields: PasswordHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordHistory model
   */
  interface PasswordHistoryFieldRefs {
    readonly id: FieldRef<"PasswordHistory", 'String'>
    readonly user_id: FieldRef<"PasswordHistory", 'String'>
    readonly password: FieldRef<"PasswordHistory", 'String'>
    readonly createdAt: FieldRef<"PasswordHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"PasswordHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordHistory findUnique
   */
  export type PasswordHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory findUniqueOrThrow
   */
  export type PasswordHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory findFirst
   */
  export type PasswordHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordHistories.
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordHistories.
     */
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * PasswordHistory findFirstOrThrow
   */
  export type PasswordHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistory to fetch.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordHistories.
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordHistories.
     */
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * PasswordHistory findMany
   */
  export type PasswordHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PasswordHistories to fetch.
     */
    where?: PasswordHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordHistories to fetch.
     */
    orderBy?: PasswordHistoryOrderByWithRelationInput | PasswordHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordHistories.
     */
    cursor?: PasswordHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordHistories.
     */
    skip?: number
    distinct?: PasswordHistoryScalarFieldEnum | PasswordHistoryScalarFieldEnum[]
  }

  /**
   * PasswordHistory create
   */
  export type PasswordHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordHistory.
     */
    data: XOR<PasswordHistoryCreateInput, PasswordHistoryUncheckedCreateInput>
  }

  /**
   * PasswordHistory createMany
   */
  export type PasswordHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordHistories.
     */
    data: PasswordHistoryCreateManyInput | PasswordHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordHistory createManyAndReturn
   */
  export type PasswordHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordHistories.
     */
    data: PasswordHistoryCreateManyInput | PasswordHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordHistory update
   */
  export type PasswordHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordHistory.
     */
    data: XOR<PasswordHistoryUpdateInput, PasswordHistoryUncheckedUpdateInput>
    /**
     * Choose, which PasswordHistory to update.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory updateMany
   */
  export type PasswordHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordHistories.
     */
    data: XOR<PasswordHistoryUpdateManyMutationInput, PasswordHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PasswordHistories to update
     */
    where?: PasswordHistoryWhereInput
    /**
     * Limit how many PasswordHistories to update.
     */
    limit?: number
  }

  /**
   * PasswordHistory updateManyAndReturn
   */
  export type PasswordHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * The data used to update PasswordHistories.
     */
    data: XOR<PasswordHistoryUpdateManyMutationInput, PasswordHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PasswordHistories to update
     */
    where?: PasswordHistoryWhereInput
    /**
     * Limit how many PasswordHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordHistory upsert
   */
  export type PasswordHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordHistory to update in case it exists.
     */
    where: PasswordHistoryWhereUniqueInput
    /**
     * In case the PasswordHistory found by the `where` argument doesn't exist, create a new PasswordHistory with this data.
     */
    create: XOR<PasswordHistoryCreateInput, PasswordHistoryUncheckedCreateInput>
    /**
     * In case the PasswordHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordHistoryUpdateInput, PasswordHistoryUncheckedUpdateInput>
  }

  /**
   * PasswordHistory delete
   */
  export type PasswordHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
    /**
     * Filter which PasswordHistory to delete.
     */
    where: PasswordHistoryWhereUniqueInput
  }

  /**
   * PasswordHistory deleteMany
   */
  export type PasswordHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordHistories to delete
     */
    where?: PasswordHistoryWhereInput
    /**
     * Limit how many PasswordHistories to delete.
     */
    limit?: number
  }

  /**
   * PasswordHistory without action
   */
  export type PasswordHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordHistory
     */
    select?: PasswordHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordHistory
     */
    omit?: PasswordHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordHistoryInclude<ExtArgs> | null
  }


  /**
   * Model PersonalAccessTokens
   */

  export type AggregatePersonalAccessTokens = {
    _count: PersonalAccessTokensCountAggregateOutputType | null
    _min: PersonalAccessTokensMinAggregateOutputType | null
    _max: PersonalAccessTokensMaxAggregateOutputType | null
  }

  export type PersonalAccessTokensMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    type: $Enums.TokenType | null
    expiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonalAccessTokensMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    type: $Enums.TokenType | null
    expiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonalAccessTokensCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    type: number
    expiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PersonalAccessTokensMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonalAccessTokensMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonalAccessTokensCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonalAccessTokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalAccessTokens to aggregate.
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokensOrderByWithRelationInput | PersonalAccessTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalAccessTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonalAccessTokens
    **/
    _count?: true | PersonalAccessTokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalAccessTokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalAccessTokensMaxAggregateInputType
  }

  export type GetPersonalAccessTokensAggregateType<T extends PersonalAccessTokensAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonalAccessTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonalAccessTokens[P]>
      : GetScalarType<T[P], AggregatePersonalAccessTokens[P]>
  }




  export type PersonalAccessTokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalAccessTokensWhereInput
    orderBy?: PersonalAccessTokensOrderByWithAggregationInput | PersonalAccessTokensOrderByWithAggregationInput[]
    by: PersonalAccessTokensScalarFieldEnum[] | PersonalAccessTokensScalarFieldEnum
    having?: PersonalAccessTokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalAccessTokensCountAggregateInputType | true
    _min?: PersonalAccessTokensMinAggregateInputType
    _max?: PersonalAccessTokensMaxAggregateInputType
  }

  export type PersonalAccessTokensGroupByOutputType = {
    id: string
    userId: string
    token: string
    type: $Enums.TokenType
    expiry: Date
    createdAt: Date
    updatedAt: Date
    _count: PersonalAccessTokensCountAggregateOutputType | null
    _min: PersonalAccessTokensMinAggregateOutputType | null
    _max: PersonalAccessTokensMaxAggregateOutputType | null
  }

  type GetPersonalAccessTokensGroupByPayload<T extends PersonalAccessTokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalAccessTokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalAccessTokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalAccessTokensGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalAccessTokensGroupByOutputType[P]>
        }
      >
    >


  export type PersonalAccessTokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalAccessTokens"]>

  export type PersonalAccessTokensSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalAccessTokens"]>

  export type PersonalAccessTokensSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalAccessTokens"]>

  export type PersonalAccessTokensSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PersonalAccessTokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "type" | "expiry" | "createdAt" | "updatedAt", ExtArgs["result"]["personalAccessTokens"]>
  export type PersonalAccessTokensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PersonalAccessTokensIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PersonalAccessTokensIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PersonalAccessTokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonalAccessTokens"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      type: $Enums.TokenType
      expiry: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["personalAccessTokens"]>
    composites: {}
  }

  type PersonalAccessTokensGetPayload<S extends boolean | null | undefined | PersonalAccessTokensDefaultArgs> = $Result.GetResult<Prisma.$PersonalAccessTokensPayload, S>

  type PersonalAccessTokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalAccessTokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalAccessTokensCountAggregateInputType | true
    }

  export interface PersonalAccessTokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonalAccessTokens'], meta: { name: 'PersonalAccessTokens' } }
    /**
     * Find zero or one PersonalAccessTokens that matches the filter.
     * @param {PersonalAccessTokensFindUniqueArgs} args - Arguments to find a PersonalAccessTokens
     * @example
     * // Get one PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalAccessTokensFindUniqueArgs>(args: SelectSubset<T, PersonalAccessTokensFindUniqueArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonalAccessTokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalAccessTokensFindUniqueOrThrowArgs} args - Arguments to find a PersonalAccessTokens
     * @example
     * // Get one PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalAccessTokensFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalAccessTokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalAccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensFindFirstArgs} args - Arguments to find a PersonalAccessTokens
     * @example
     * // Get one PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalAccessTokensFindFirstArgs>(args?: SelectSubset<T, PersonalAccessTokensFindFirstArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalAccessTokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensFindFirstOrThrowArgs} args - Arguments to find a PersonalAccessTokens
     * @example
     * // Get one PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalAccessTokensFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalAccessTokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonalAccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.findMany()
     * 
     * // Get first 10 PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personalAccessTokensWithIdOnly = await prisma.personalAccessTokens.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonalAccessTokensFindManyArgs>(args?: SelectSubset<T, PersonalAccessTokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonalAccessTokens.
     * @param {PersonalAccessTokensCreateArgs} args - Arguments to create a PersonalAccessTokens.
     * @example
     * // Create one PersonalAccessTokens
     * const PersonalAccessTokens = await prisma.personalAccessTokens.create({
     *   data: {
     *     // ... data to create a PersonalAccessTokens
     *   }
     * })
     * 
     */
    create<T extends PersonalAccessTokensCreateArgs>(args: SelectSubset<T, PersonalAccessTokensCreateArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonalAccessTokens.
     * @param {PersonalAccessTokensCreateManyArgs} args - Arguments to create many PersonalAccessTokens.
     * @example
     * // Create many PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalAccessTokensCreateManyArgs>(args?: SelectSubset<T, PersonalAccessTokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonalAccessTokens and returns the data saved in the database.
     * @param {PersonalAccessTokensCreateManyAndReturnArgs} args - Arguments to create many PersonalAccessTokens.
     * @example
     * // Create many PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonalAccessTokens and only return the `id`
     * const personalAccessTokensWithIdOnly = await prisma.personalAccessTokens.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalAccessTokensCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalAccessTokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonalAccessTokens.
     * @param {PersonalAccessTokensDeleteArgs} args - Arguments to delete one PersonalAccessTokens.
     * @example
     * // Delete one PersonalAccessTokens
     * const PersonalAccessTokens = await prisma.personalAccessTokens.delete({
     *   where: {
     *     // ... filter to delete one PersonalAccessTokens
     *   }
     * })
     * 
     */
    delete<T extends PersonalAccessTokensDeleteArgs>(args: SelectSubset<T, PersonalAccessTokensDeleteArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonalAccessTokens.
     * @param {PersonalAccessTokensUpdateArgs} args - Arguments to update one PersonalAccessTokens.
     * @example
     * // Update one PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalAccessTokensUpdateArgs>(args: SelectSubset<T, PersonalAccessTokensUpdateArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonalAccessTokens.
     * @param {PersonalAccessTokensDeleteManyArgs} args - Arguments to filter PersonalAccessTokens to delete.
     * @example
     * // Delete a few PersonalAccessTokens
     * const { count } = await prisma.personalAccessTokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalAccessTokensDeleteManyArgs>(args?: SelectSubset<T, PersonalAccessTokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalAccessTokensUpdateManyArgs>(args: SelectSubset<T, PersonalAccessTokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalAccessTokens and returns the data updated in the database.
     * @param {PersonalAccessTokensUpdateManyAndReturnArgs} args - Arguments to update many PersonalAccessTokens.
     * @example
     * // Update many PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonalAccessTokens and only return the `id`
     * const personalAccessTokensWithIdOnly = await prisma.personalAccessTokens.updateManyAndReturn({
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
    updateManyAndReturn<T extends PersonalAccessTokensUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalAccessTokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonalAccessTokens.
     * @param {PersonalAccessTokensUpsertArgs} args - Arguments to update or create a PersonalAccessTokens.
     * @example
     * // Update or create a PersonalAccessTokens
     * const personalAccessTokens = await prisma.personalAccessTokens.upsert({
     *   create: {
     *     // ... data to create a PersonalAccessTokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonalAccessTokens we want to update
     *   }
     * })
     */
    upsert<T extends PersonalAccessTokensUpsertArgs>(args: SelectSubset<T, PersonalAccessTokensUpsertArgs<ExtArgs>>): Prisma__PersonalAccessTokensClient<$Result.GetResult<Prisma.$PersonalAccessTokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonalAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensCountArgs} args - Arguments to filter PersonalAccessTokens to count.
     * @example
     * // Count the number of PersonalAccessTokens
     * const count = await prisma.personalAccessTokens.count({
     *   where: {
     *     // ... the filter for the PersonalAccessTokens we want to count
     *   }
     * })
    **/
    count<T extends PersonalAccessTokensCountArgs>(
      args?: Subset<T, PersonalAccessTokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalAccessTokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonalAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonalAccessTokensAggregateArgs>(args: Subset<T, PersonalAccessTokensAggregateArgs>): Prisma.PrismaPromise<GetPersonalAccessTokensAggregateType<T>>

    /**
     * Group by PersonalAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalAccessTokensGroupByArgs} args - Group by arguments.
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
      T extends PersonalAccessTokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalAccessTokensGroupByArgs['orderBy'] }
        : { orderBy?: PersonalAccessTokensGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PersonalAccessTokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalAccessTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonalAccessTokens model
   */
  readonly fields: PersonalAccessTokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonalAccessTokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalAccessTokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PersonalAccessTokens model
   */
  interface PersonalAccessTokensFieldRefs {
    readonly id: FieldRef<"PersonalAccessTokens", 'String'>
    readonly userId: FieldRef<"PersonalAccessTokens", 'String'>
    readonly token: FieldRef<"PersonalAccessTokens", 'String'>
    readonly type: FieldRef<"PersonalAccessTokens", 'TokenType'>
    readonly expiry: FieldRef<"PersonalAccessTokens", 'DateTime'>
    readonly createdAt: FieldRef<"PersonalAccessTokens", 'DateTime'>
    readonly updatedAt: FieldRef<"PersonalAccessTokens", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PersonalAccessTokens findUnique
   */
  export type PersonalAccessTokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * Filter, which PersonalAccessTokens to fetch.
     */
    where: PersonalAccessTokensWhereUniqueInput
  }

  /**
   * PersonalAccessTokens findUniqueOrThrow
   */
  export type PersonalAccessTokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * Filter, which PersonalAccessTokens to fetch.
     */
    where: PersonalAccessTokensWhereUniqueInput
  }

  /**
   * PersonalAccessTokens findFirst
   */
  export type PersonalAccessTokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * Filter, which PersonalAccessTokens to fetch.
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokensOrderByWithRelationInput | PersonalAccessTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalAccessTokens.
     */
    cursor?: PersonalAccessTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalAccessTokens.
     */
    distinct?: PersonalAccessTokensScalarFieldEnum | PersonalAccessTokensScalarFieldEnum[]
  }

  /**
   * PersonalAccessTokens findFirstOrThrow
   */
  export type PersonalAccessTokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * Filter, which PersonalAccessTokens to fetch.
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokensOrderByWithRelationInput | PersonalAccessTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalAccessTokens.
     */
    cursor?: PersonalAccessTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalAccessTokens.
     */
    distinct?: PersonalAccessTokensScalarFieldEnum | PersonalAccessTokensScalarFieldEnum[]
  }

  /**
   * PersonalAccessTokens findMany
   */
  export type PersonalAccessTokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * Filter, which PersonalAccessTokens to fetch.
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalAccessTokens to fetch.
     */
    orderBy?: PersonalAccessTokensOrderByWithRelationInput | PersonalAccessTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonalAccessTokens.
     */
    cursor?: PersonalAccessTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalAccessTokens.
     */
    skip?: number
    distinct?: PersonalAccessTokensScalarFieldEnum | PersonalAccessTokensScalarFieldEnum[]
  }

  /**
   * PersonalAccessTokens create
   */
  export type PersonalAccessTokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * The data needed to create a PersonalAccessTokens.
     */
    data: XOR<PersonalAccessTokensCreateInput, PersonalAccessTokensUncheckedCreateInput>
  }

  /**
   * PersonalAccessTokens createMany
   */
  export type PersonalAccessTokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonalAccessTokens.
     */
    data: PersonalAccessTokensCreateManyInput | PersonalAccessTokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalAccessTokens createManyAndReturn
   */
  export type PersonalAccessTokensCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * The data used to create many PersonalAccessTokens.
     */
    data: PersonalAccessTokensCreateManyInput | PersonalAccessTokensCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalAccessTokens update
   */
  export type PersonalAccessTokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * The data needed to update a PersonalAccessTokens.
     */
    data: XOR<PersonalAccessTokensUpdateInput, PersonalAccessTokensUncheckedUpdateInput>
    /**
     * Choose, which PersonalAccessTokens to update.
     */
    where: PersonalAccessTokensWhereUniqueInput
  }

  /**
   * PersonalAccessTokens updateMany
   */
  export type PersonalAccessTokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonalAccessTokens.
     */
    data: XOR<PersonalAccessTokensUpdateManyMutationInput, PersonalAccessTokensUncheckedUpdateManyInput>
    /**
     * Filter which PersonalAccessTokens to update
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * Limit how many PersonalAccessTokens to update.
     */
    limit?: number
  }

  /**
   * PersonalAccessTokens updateManyAndReturn
   */
  export type PersonalAccessTokensUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * The data used to update PersonalAccessTokens.
     */
    data: XOR<PersonalAccessTokensUpdateManyMutationInput, PersonalAccessTokensUncheckedUpdateManyInput>
    /**
     * Filter which PersonalAccessTokens to update
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * Limit how many PersonalAccessTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalAccessTokens upsert
   */
  export type PersonalAccessTokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * The filter to search for the PersonalAccessTokens to update in case it exists.
     */
    where: PersonalAccessTokensWhereUniqueInput
    /**
     * In case the PersonalAccessTokens found by the `where` argument doesn't exist, create a new PersonalAccessTokens with this data.
     */
    create: XOR<PersonalAccessTokensCreateInput, PersonalAccessTokensUncheckedCreateInput>
    /**
     * In case the PersonalAccessTokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalAccessTokensUpdateInput, PersonalAccessTokensUncheckedUpdateInput>
  }

  /**
   * PersonalAccessTokens delete
   */
  export type PersonalAccessTokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
    /**
     * Filter which PersonalAccessTokens to delete.
     */
    where: PersonalAccessTokensWhereUniqueInput
  }

  /**
   * PersonalAccessTokens deleteMany
   */
  export type PersonalAccessTokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalAccessTokens to delete
     */
    where?: PersonalAccessTokensWhereInput
    /**
     * Limit how many PersonalAccessTokens to delete.
     */
    limit?: number
  }

  /**
   * PersonalAccessTokens without action
   */
  export type PersonalAccessTokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalAccessTokens
     */
    select?: PersonalAccessTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalAccessTokens
     */
    omit?: PersonalAccessTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalAccessTokensInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    role: $Enums.AdminRole | null
    action: string | null
    resource: string | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    role: $Enums.AdminRole | null
    action: string | null
    resource: string | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    role: number
    action: number
    resource: number
    condition: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    role?: true
    action?: true
    resource?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    role?: true
    action?: true
    resource?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    role?: true
    action?: true
    resource?: true
    condition?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    role: $Enums.AdminRole
    action: string
    resource: string
    condition: JsonValue | null
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    action?: boolean
    resource?: boolean
    condition?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    action?: boolean
    resource?: boolean
    condition?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    action?: boolean
    resource?: boolean
    condition?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    role?: boolean
    action?: boolean
    resource?: boolean
    condition?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "action" | "resource" | "condition", ExtArgs["result"]["permission"]>

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.AdminRole
      action: string
      resource: string
      condition: Prisma.JsonValue | null
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
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
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
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
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly role: FieldRef<"Permission", 'AdminRole'>
    readonly action: FieldRef<"Permission", 'String'>
    readonly resource: FieldRef<"Permission", 'String'>
    readonly condition: FieldRef<"Permission", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
  }


  /**
   * Model SubscriptionPlan
   */

  export type AggregateSubscriptionPlan = {
    _count: SubscriptionPlanCountAggregateOutputType | null
    _min: SubscriptionPlanMinAggregateOutputType | null
    _max: SubscriptionPlanMaxAggregateOutputType | null
  }

  export type SubscriptionPlanMinAggregateOutputType = {
    id: string | null
  }

  export type SubscriptionPlanMaxAggregateOutputType = {
    id: string | null
  }

  export type SubscriptionPlanCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type SubscriptionPlanMinAggregateInputType = {
    id?: true
  }

  export type SubscriptionPlanMaxAggregateInputType = {
    id?: true
  }

  export type SubscriptionPlanCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type SubscriptionPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionPlan to aggregate.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionPlans
    **/
    _count?: true | SubscriptionPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionPlanMaxAggregateInputType
  }

  export type GetSubscriptionPlanAggregateType<T extends SubscriptionPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionPlan[P]>
      : GetScalarType<T[P], AggregateSubscriptionPlan[P]>
  }




  export type SubscriptionPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionPlanWhereInput
    orderBy?: SubscriptionPlanOrderByWithAggregationInput | SubscriptionPlanOrderByWithAggregationInput[]
    by: SubscriptionPlanScalarFieldEnum[] | SubscriptionPlanScalarFieldEnum
    having?: SubscriptionPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionPlanCountAggregateInputType | true
    _min?: SubscriptionPlanMinAggregateInputType
    _max?: SubscriptionPlanMaxAggregateInputType
  }

  export type SubscriptionPlanGroupByOutputType = {
    id: string
    _count: SubscriptionPlanCountAggregateOutputType | null
    _min: SubscriptionPlanMinAggregateOutputType | null
    _max: SubscriptionPlanMaxAggregateOutputType | null
  }

  type GetSubscriptionPlanGroupByPayload<T extends SubscriptionPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionPlanGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionPlanGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["subscriptionPlan"]>

  export type SubscriptionPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["subscriptionPlan"]>

  export type SubscriptionPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["subscriptionPlan"]>

  export type SubscriptionPlanSelectScalar = {
    id?: boolean
  }

  export type SubscriptionPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["subscriptionPlan"]>

  export type $SubscriptionPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
    }, ExtArgs["result"]["subscriptionPlan"]>
    composites: {}
  }

  type SubscriptionPlanGetPayload<S extends boolean | null | undefined | SubscriptionPlanDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPlanPayload, S>

  type SubscriptionPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionPlanCountAggregateInputType | true
    }

  export interface SubscriptionPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionPlan'], meta: { name: 'SubscriptionPlan' } }
    /**
     * Find zero or one SubscriptionPlan that matches the filter.
     * @param {SubscriptionPlanFindUniqueArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionPlanFindUniqueArgs>(args: SelectSubset<T, SubscriptionPlanFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscriptionPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionPlanFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanFindFirstArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionPlanFindFirstArgs>(args?: SelectSubset<T, SubscriptionPlanFindFirstArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanFindFirstOrThrowArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriptionPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionPlans
     * const subscriptionPlans = await prisma.subscriptionPlan.findMany()
     * 
     * // Get first 10 SubscriptionPlans
     * const subscriptionPlans = await prisma.subscriptionPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionPlanWithIdOnly = await prisma.subscriptionPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionPlanFindManyArgs>(args?: SelectSubset<T, SubscriptionPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscriptionPlan.
     * @param {SubscriptionPlanCreateArgs} args - Arguments to create a SubscriptionPlan.
     * @example
     * // Create one SubscriptionPlan
     * const SubscriptionPlan = await prisma.subscriptionPlan.create({
     *   data: {
     *     // ... data to create a SubscriptionPlan
     *   }
     * })
     * 
     */
    create<T extends SubscriptionPlanCreateArgs>(args: SelectSubset<T, SubscriptionPlanCreateArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscriptionPlans.
     * @param {SubscriptionPlanCreateManyArgs} args - Arguments to create many SubscriptionPlans.
     * @example
     * // Create many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionPlanCreateManyArgs>(args?: SelectSubset<T, SubscriptionPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscriptionPlans and returns the data saved in the database.
     * @param {SubscriptionPlanCreateManyAndReturnArgs} args - Arguments to create many SubscriptionPlans.
     * @example
     * // Create many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscriptionPlans and only return the `id`
     * const subscriptionPlanWithIdOnly = await prisma.subscriptionPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubscriptionPlan.
     * @param {SubscriptionPlanDeleteArgs} args - Arguments to delete one SubscriptionPlan.
     * @example
     * // Delete one SubscriptionPlan
     * const SubscriptionPlan = await prisma.subscriptionPlan.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionPlan
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionPlanDeleteArgs>(args: SelectSubset<T, SubscriptionPlanDeleteArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscriptionPlan.
     * @param {SubscriptionPlanUpdateArgs} args - Arguments to update one SubscriptionPlan.
     * @example
     * // Update one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionPlanUpdateArgs>(args: SelectSubset<T, SubscriptionPlanUpdateArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscriptionPlans.
     * @param {SubscriptionPlanDeleteManyArgs} args - Arguments to filter SubscriptionPlans to delete.
     * @example
     * // Delete a few SubscriptionPlans
     * const { count } = await prisma.subscriptionPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionPlanDeleteManyArgs>(args?: SelectSubset<T, SubscriptionPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionPlanUpdateManyArgs>(args: SelectSubset<T, SubscriptionPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionPlans and returns the data updated in the database.
     * @param {SubscriptionPlanUpdateManyAndReturnArgs} args - Arguments to update many SubscriptionPlans.
     * @example
     * // Update many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubscriptionPlans and only return the `id`
     * const subscriptionPlanWithIdOnly = await prisma.subscriptionPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubscriptionPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubscriptionPlan.
     * @param {SubscriptionPlanUpsertArgs} args - Arguments to update or create a SubscriptionPlan.
     * @example
     * // Update or create a SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.upsert({
     *   create: {
     *     // ... data to create a SubscriptionPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionPlan we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionPlanUpsertArgs>(args: SelectSubset<T, SubscriptionPlanUpsertArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubscriptionPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanCountArgs} args - Arguments to filter SubscriptionPlans to count.
     * @example
     * // Count the number of SubscriptionPlans
     * const count = await prisma.subscriptionPlan.count({
     *   where: {
     *     // ... the filter for the SubscriptionPlans we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionPlanCountArgs>(
      args?: Subset<T, SubscriptionPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriptionPlanAggregateArgs>(args: Subset<T, SubscriptionPlanAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionPlanAggregateType<T>>

    /**
     * Group by SubscriptionPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanGroupByArgs} args - Group by arguments.
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
      T extends SubscriptionPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionPlanGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscriptionPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionPlan model
   */
  readonly fields: SubscriptionPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SubscriptionPlan model
   */
  interface SubscriptionPlanFieldRefs {
    readonly id: FieldRef<"SubscriptionPlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionPlan findUnique
   */
  export type SubscriptionPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan findUniqueOrThrow
   */
  export type SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan findFirst
   */
  export type SubscriptionPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionPlans.
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionPlans.
     */
    distinct?: SubscriptionPlanScalarFieldEnum | SubscriptionPlanScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan findFirstOrThrow
   */
  export type SubscriptionPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionPlans.
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionPlans.
     */
    distinct?: SubscriptionPlanScalarFieldEnum | SubscriptionPlanScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan findMany
   */
  export type SubscriptionPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlans to fetch.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionPlans.
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    distinct?: SubscriptionPlanScalarFieldEnum | SubscriptionPlanScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan create
   */
  export type SubscriptionPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionPlan.
     */
    data?: XOR<SubscriptionPlanCreateInput, SubscriptionPlanUncheckedCreateInput>
  }

  /**
   * SubscriptionPlan createMany
   */
  export type SubscriptionPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionPlans.
     */
    data: SubscriptionPlanCreateManyInput | SubscriptionPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionPlan createManyAndReturn
   */
  export type SubscriptionPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * The data used to create many SubscriptionPlans.
     */
    data: SubscriptionPlanCreateManyInput | SubscriptionPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionPlan update
   */
  export type SubscriptionPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionPlan.
     */
    data: XOR<SubscriptionPlanUpdateInput, SubscriptionPlanUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionPlan to update.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan updateMany
   */
  export type SubscriptionPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionPlans.
     */
    data: XOR<SubscriptionPlanUpdateManyMutationInput, SubscriptionPlanUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionPlans to update
     */
    where?: SubscriptionPlanWhereInput
    /**
     * Limit how many SubscriptionPlans to update.
     */
    limit?: number
  }

  /**
   * SubscriptionPlan updateManyAndReturn
   */
  export type SubscriptionPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * The data used to update SubscriptionPlans.
     */
    data: XOR<SubscriptionPlanUpdateManyMutationInput, SubscriptionPlanUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionPlans to update
     */
    where?: SubscriptionPlanWhereInput
    /**
     * Limit how many SubscriptionPlans to update.
     */
    limit?: number
  }

  /**
   * SubscriptionPlan upsert
   */
  export type SubscriptionPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionPlan to update in case it exists.
     */
    where: SubscriptionPlanWhereUniqueInput
    /**
     * In case the SubscriptionPlan found by the `where` argument doesn't exist, create a new SubscriptionPlan with this data.
     */
    create: XOR<SubscriptionPlanCreateInput, SubscriptionPlanUncheckedCreateInput>
    /**
     * In case the SubscriptionPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionPlanUpdateInput, SubscriptionPlanUncheckedUpdateInput>
  }

  /**
   * SubscriptionPlan delete
   */
  export type SubscriptionPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
    /**
     * Filter which SubscriptionPlan to delete.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan deleteMany
   */
  export type SubscriptionPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionPlans to delete
     */
    where?: SubscriptionPlanWhereInput
    /**
     * Limit how many SubscriptionPlans to delete.
     */
    limit?: number
  }

  /**
   * SubscriptionPlan without action
   */
  export type SubscriptionPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: SubscriptionPlanOmit<ExtArgs> | null
  }


  /**
   * Model KYCVerification
   */

  export type AggregateKYCVerification = {
    _count: KYCVerificationCountAggregateOutputType | null
    _min: KYCVerificationMinAggregateOutputType | null
    _max: KYCVerificationMaxAggregateOutputType | null
  }

  export type KYCVerificationMinAggregateOutputType = {
    id: string | null
    facialVerificationImage: string | null
    idCardType: string | null
    idNumber: string | null
    expiryDate: Date | null
    facialVerificationStatus: $Enums.VerificationStatus | null
    idVerificationStatus: $Enums.VerificationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KYCVerificationMaxAggregateOutputType = {
    id: string | null
    facialVerificationImage: string | null
    idCardType: string | null
    idNumber: string | null
    expiryDate: Date | null
    facialVerificationStatus: $Enums.VerificationStatus | null
    idVerificationStatus: $Enums.VerificationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KYCVerificationCountAggregateOutputType = {
    id: number
    facialVerificationImage: number
    idCardType: number
    idNumber: number
    expiryDate: number
    facialVerificationStatus: number
    idVerificationStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KYCVerificationMinAggregateInputType = {
    id?: true
    facialVerificationImage?: true
    idCardType?: true
    idNumber?: true
    expiryDate?: true
    facialVerificationStatus?: true
    idVerificationStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KYCVerificationMaxAggregateInputType = {
    id?: true
    facialVerificationImage?: true
    idCardType?: true
    idNumber?: true
    expiryDate?: true
    facialVerificationStatus?: true
    idVerificationStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KYCVerificationCountAggregateInputType = {
    id?: true
    facialVerificationImage?: true
    idCardType?: true
    idNumber?: true
    expiryDate?: true
    facialVerificationStatus?: true
    idVerificationStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KYCVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KYCVerification to aggregate.
     */
    where?: KYCVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCVerifications to fetch.
     */
    orderBy?: KYCVerificationOrderByWithRelationInput | KYCVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KYCVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KYCVerifications
    **/
    _count?: true | KYCVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KYCVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KYCVerificationMaxAggregateInputType
  }

  export type GetKYCVerificationAggregateType<T extends KYCVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateKYCVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKYCVerification[P]>
      : GetScalarType<T[P], AggregateKYCVerification[P]>
  }




  export type KYCVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KYCVerificationWhereInput
    orderBy?: KYCVerificationOrderByWithAggregationInput | KYCVerificationOrderByWithAggregationInput[]
    by: KYCVerificationScalarFieldEnum[] | KYCVerificationScalarFieldEnum
    having?: KYCVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KYCVerificationCountAggregateInputType | true
    _min?: KYCVerificationMinAggregateInputType
    _max?: KYCVerificationMaxAggregateInputType
  }

  export type KYCVerificationGroupByOutputType = {
    id: string
    facialVerificationImage: string | null
    idCardType: string | null
    idNumber: string | null
    expiryDate: Date | null
    facialVerificationStatus: $Enums.VerificationStatus
    idVerificationStatus: $Enums.VerificationStatus
    createdAt: Date
    updatedAt: Date
    _count: KYCVerificationCountAggregateOutputType | null
    _min: KYCVerificationMinAggregateOutputType | null
    _max: KYCVerificationMaxAggregateOutputType | null
  }

  type GetKYCVerificationGroupByPayload<T extends KYCVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KYCVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KYCVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KYCVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], KYCVerificationGroupByOutputType[P]>
        }
      >
    >


  export type KYCVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facialVerificationImage?: boolean
    idCardType?: boolean
    idNumber?: boolean
    expiryDate?: boolean
    facialVerificationStatus?: boolean
    idVerificationStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kYCVerification"]>

  export type KYCVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facialVerificationImage?: boolean
    idCardType?: boolean
    idNumber?: boolean
    expiryDate?: boolean
    facialVerificationStatus?: boolean
    idVerificationStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kYCVerification"]>

  export type KYCVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facialVerificationImage?: boolean
    idCardType?: boolean
    idNumber?: boolean
    expiryDate?: boolean
    facialVerificationStatus?: boolean
    idVerificationStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kYCVerification"]>

  export type KYCVerificationSelectScalar = {
    id?: boolean
    facialVerificationImage?: boolean
    idCardType?: boolean
    idNumber?: boolean
    expiryDate?: boolean
    facialVerificationStatus?: boolean
    idVerificationStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KYCVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "facialVerificationImage" | "idCardType" | "idNumber" | "expiryDate" | "facialVerificationStatus" | "idVerificationStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["kYCVerification"]>
  export type KYCVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KYCVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KYCVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $KYCVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KYCVerification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      facialVerificationImage: string | null
      idCardType: string | null
      idNumber: string | null
      expiryDate: Date | null
      facialVerificationStatus: $Enums.VerificationStatus
      idVerificationStatus: $Enums.VerificationStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kYCVerification"]>
    composites: {}
  }

  type KYCVerificationGetPayload<S extends boolean | null | undefined | KYCVerificationDefaultArgs> = $Result.GetResult<Prisma.$KYCVerificationPayload, S>

  type KYCVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KYCVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KYCVerificationCountAggregateInputType | true
    }

  export interface KYCVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KYCVerification'], meta: { name: 'KYCVerification' } }
    /**
     * Find zero or one KYCVerification that matches the filter.
     * @param {KYCVerificationFindUniqueArgs} args - Arguments to find a KYCVerification
     * @example
     * // Get one KYCVerification
     * const kYCVerification = await prisma.kYCVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KYCVerificationFindUniqueArgs>(args: SelectSubset<T, KYCVerificationFindUniqueArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KYCVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KYCVerificationFindUniqueOrThrowArgs} args - Arguments to find a KYCVerification
     * @example
     * // Get one KYCVerification
     * const kYCVerification = await prisma.kYCVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KYCVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, KYCVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KYCVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationFindFirstArgs} args - Arguments to find a KYCVerification
     * @example
     * // Get one KYCVerification
     * const kYCVerification = await prisma.kYCVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KYCVerificationFindFirstArgs>(args?: SelectSubset<T, KYCVerificationFindFirstArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KYCVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationFindFirstOrThrowArgs} args - Arguments to find a KYCVerification
     * @example
     * // Get one KYCVerification
     * const kYCVerification = await prisma.kYCVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KYCVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, KYCVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KYCVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KYCVerifications
     * const kYCVerifications = await prisma.kYCVerification.findMany()
     * 
     * // Get first 10 KYCVerifications
     * const kYCVerifications = await prisma.kYCVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kYCVerificationWithIdOnly = await prisma.kYCVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KYCVerificationFindManyArgs>(args?: SelectSubset<T, KYCVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KYCVerification.
     * @param {KYCVerificationCreateArgs} args - Arguments to create a KYCVerification.
     * @example
     * // Create one KYCVerification
     * const KYCVerification = await prisma.kYCVerification.create({
     *   data: {
     *     // ... data to create a KYCVerification
     *   }
     * })
     * 
     */
    create<T extends KYCVerificationCreateArgs>(args: SelectSubset<T, KYCVerificationCreateArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KYCVerifications.
     * @param {KYCVerificationCreateManyArgs} args - Arguments to create many KYCVerifications.
     * @example
     * // Create many KYCVerifications
     * const kYCVerification = await prisma.kYCVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KYCVerificationCreateManyArgs>(args?: SelectSubset<T, KYCVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KYCVerifications and returns the data saved in the database.
     * @param {KYCVerificationCreateManyAndReturnArgs} args - Arguments to create many KYCVerifications.
     * @example
     * // Create many KYCVerifications
     * const kYCVerification = await prisma.kYCVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KYCVerifications and only return the `id`
     * const kYCVerificationWithIdOnly = await prisma.kYCVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KYCVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, KYCVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KYCVerification.
     * @param {KYCVerificationDeleteArgs} args - Arguments to delete one KYCVerification.
     * @example
     * // Delete one KYCVerification
     * const KYCVerification = await prisma.kYCVerification.delete({
     *   where: {
     *     // ... filter to delete one KYCVerification
     *   }
     * })
     * 
     */
    delete<T extends KYCVerificationDeleteArgs>(args: SelectSubset<T, KYCVerificationDeleteArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KYCVerification.
     * @param {KYCVerificationUpdateArgs} args - Arguments to update one KYCVerification.
     * @example
     * // Update one KYCVerification
     * const kYCVerification = await prisma.kYCVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KYCVerificationUpdateArgs>(args: SelectSubset<T, KYCVerificationUpdateArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KYCVerifications.
     * @param {KYCVerificationDeleteManyArgs} args - Arguments to filter KYCVerifications to delete.
     * @example
     * // Delete a few KYCVerifications
     * const { count } = await prisma.kYCVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KYCVerificationDeleteManyArgs>(args?: SelectSubset<T, KYCVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KYCVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KYCVerifications
     * const kYCVerification = await prisma.kYCVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KYCVerificationUpdateManyArgs>(args: SelectSubset<T, KYCVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KYCVerifications and returns the data updated in the database.
     * @param {KYCVerificationUpdateManyAndReturnArgs} args - Arguments to update many KYCVerifications.
     * @example
     * // Update many KYCVerifications
     * const kYCVerification = await prisma.kYCVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KYCVerifications and only return the `id`
     * const kYCVerificationWithIdOnly = await prisma.kYCVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends KYCVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, KYCVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KYCVerification.
     * @param {KYCVerificationUpsertArgs} args - Arguments to update or create a KYCVerification.
     * @example
     * // Update or create a KYCVerification
     * const kYCVerification = await prisma.kYCVerification.upsert({
     *   create: {
     *     // ... data to create a KYCVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KYCVerification we want to update
     *   }
     * })
     */
    upsert<T extends KYCVerificationUpsertArgs>(args: SelectSubset<T, KYCVerificationUpsertArgs<ExtArgs>>): Prisma__KYCVerificationClient<$Result.GetResult<Prisma.$KYCVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KYCVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationCountArgs} args - Arguments to filter KYCVerifications to count.
     * @example
     * // Count the number of KYCVerifications
     * const count = await prisma.kYCVerification.count({
     *   where: {
     *     // ... the filter for the KYCVerifications we want to count
     *   }
     * })
    **/
    count<T extends KYCVerificationCountArgs>(
      args?: Subset<T, KYCVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KYCVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KYCVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KYCVerificationAggregateArgs>(args: Subset<T, KYCVerificationAggregateArgs>): Prisma.PrismaPromise<GetKYCVerificationAggregateType<T>>

    /**
     * Group by KYCVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCVerificationGroupByArgs} args - Group by arguments.
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
      T extends KYCVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KYCVerificationGroupByArgs['orderBy'] }
        : { orderBy?: KYCVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KYCVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKYCVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KYCVerification model
   */
  readonly fields: KYCVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KYCVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KYCVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the KYCVerification model
   */
  interface KYCVerificationFieldRefs {
    readonly id: FieldRef<"KYCVerification", 'String'>
    readonly facialVerificationImage: FieldRef<"KYCVerification", 'String'>
    readonly idCardType: FieldRef<"KYCVerification", 'String'>
    readonly idNumber: FieldRef<"KYCVerification", 'String'>
    readonly expiryDate: FieldRef<"KYCVerification", 'DateTime'>
    readonly facialVerificationStatus: FieldRef<"KYCVerification", 'VerificationStatus'>
    readonly idVerificationStatus: FieldRef<"KYCVerification", 'VerificationStatus'>
    readonly createdAt: FieldRef<"KYCVerification", 'DateTime'>
    readonly updatedAt: FieldRef<"KYCVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KYCVerification findUnique
   */
  export type KYCVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * Filter, which KYCVerification to fetch.
     */
    where: KYCVerificationWhereUniqueInput
  }

  /**
   * KYCVerification findUniqueOrThrow
   */
  export type KYCVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * Filter, which KYCVerification to fetch.
     */
    where: KYCVerificationWhereUniqueInput
  }

  /**
   * KYCVerification findFirst
   */
  export type KYCVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * Filter, which KYCVerification to fetch.
     */
    where?: KYCVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCVerifications to fetch.
     */
    orderBy?: KYCVerificationOrderByWithRelationInput | KYCVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KYCVerifications.
     */
    cursor?: KYCVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KYCVerifications.
     */
    distinct?: KYCVerificationScalarFieldEnum | KYCVerificationScalarFieldEnum[]
  }

  /**
   * KYCVerification findFirstOrThrow
   */
  export type KYCVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * Filter, which KYCVerification to fetch.
     */
    where?: KYCVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCVerifications to fetch.
     */
    orderBy?: KYCVerificationOrderByWithRelationInput | KYCVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KYCVerifications.
     */
    cursor?: KYCVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KYCVerifications.
     */
    distinct?: KYCVerificationScalarFieldEnum | KYCVerificationScalarFieldEnum[]
  }

  /**
   * KYCVerification findMany
   */
  export type KYCVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * Filter, which KYCVerifications to fetch.
     */
    where?: KYCVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCVerifications to fetch.
     */
    orderBy?: KYCVerificationOrderByWithRelationInput | KYCVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KYCVerifications.
     */
    cursor?: KYCVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCVerifications.
     */
    skip?: number
    distinct?: KYCVerificationScalarFieldEnum | KYCVerificationScalarFieldEnum[]
  }

  /**
   * KYCVerification create
   */
  export type KYCVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a KYCVerification.
     */
    data: XOR<KYCVerificationCreateInput, KYCVerificationUncheckedCreateInput>
  }

  /**
   * KYCVerification createMany
   */
  export type KYCVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KYCVerifications.
     */
    data: KYCVerificationCreateManyInput | KYCVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KYCVerification createManyAndReturn
   */
  export type KYCVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many KYCVerifications.
     */
    data: KYCVerificationCreateManyInput | KYCVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KYCVerification update
   */
  export type KYCVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a KYCVerification.
     */
    data: XOR<KYCVerificationUpdateInput, KYCVerificationUncheckedUpdateInput>
    /**
     * Choose, which KYCVerification to update.
     */
    where: KYCVerificationWhereUniqueInput
  }

  /**
   * KYCVerification updateMany
   */
  export type KYCVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KYCVerifications.
     */
    data: XOR<KYCVerificationUpdateManyMutationInput, KYCVerificationUncheckedUpdateManyInput>
    /**
     * Filter which KYCVerifications to update
     */
    where?: KYCVerificationWhereInput
    /**
     * Limit how many KYCVerifications to update.
     */
    limit?: number
  }

  /**
   * KYCVerification updateManyAndReturn
   */
  export type KYCVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * The data used to update KYCVerifications.
     */
    data: XOR<KYCVerificationUpdateManyMutationInput, KYCVerificationUncheckedUpdateManyInput>
    /**
     * Filter which KYCVerifications to update
     */
    where?: KYCVerificationWhereInput
    /**
     * Limit how many KYCVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * KYCVerification upsert
   */
  export type KYCVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the KYCVerification to update in case it exists.
     */
    where: KYCVerificationWhereUniqueInput
    /**
     * In case the KYCVerification found by the `where` argument doesn't exist, create a new KYCVerification with this data.
     */
    create: XOR<KYCVerificationCreateInput, KYCVerificationUncheckedCreateInput>
    /**
     * In case the KYCVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KYCVerificationUpdateInput, KYCVerificationUncheckedUpdateInput>
  }

  /**
   * KYCVerification delete
   */
  export type KYCVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
    /**
     * Filter which KYCVerification to delete.
     */
    where: KYCVerificationWhereUniqueInput
  }

  /**
   * KYCVerification deleteMany
   */
  export type KYCVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KYCVerifications to delete
     */
    where?: KYCVerificationWhereInput
    /**
     * Limit how many KYCVerifications to delete.
     */
    limit?: number
  }

  /**
   * KYCVerification without action
   */
  export type KYCVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYCVerification
     */
    select?: KYCVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KYCVerification
     */
    omit?: KYCVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCVerificationInclude<ExtArgs> | null
  }


  /**
   * Model Featured
   */

  export type AggregateFeatured = {
    _count: FeaturedCountAggregateOutputType | null
    _min: FeaturedMinAggregateOutputType | null
    _max: FeaturedMaxAggregateOutputType | null
  }

  export type FeaturedMinAggregateOutputType = {
    id: string | null
    paymentId: string | null
    userId: string | null
    featurePlanId: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatededAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type FeaturedMaxAggregateOutputType = {
    id: string | null
    paymentId: string | null
    userId: string | null
    featurePlanId: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatededAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type FeaturedCountAggregateOutputType = {
    id: number
    paymentId: number
    userId: number
    featurePlanId: number
    startDate: number
    endDate: number
    createdAt: number
    updatededAt: number
    updatedBy: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type FeaturedMinAggregateInputType = {
    id?: true
    paymentId?: true
    userId?: true
    featurePlanId?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatededAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type FeaturedMaxAggregateInputType = {
    id?: true
    paymentId?: true
    userId?: true
    featurePlanId?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatededAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type FeaturedCountAggregateInputType = {
    id?: true
    paymentId?: true
    userId?: true
    featurePlanId?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatededAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type FeaturedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Featured to aggregate.
     */
    where?: FeaturedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Featureds to fetch.
     */
    orderBy?: FeaturedOrderByWithRelationInput | FeaturedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeaturedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Featureds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Featureds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Featureds
    **/
    _count?: true | FeaturedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeaturedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeaturedMaxAggregateInputType
  }

  export type GetFeaturedAggregateType<T extends FeaturedAggregateArgs> = {
        [P in keyof T & keyof AggregateFeatured]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeatured[P]>
      : GetScalarType<T[P], AggregateFeatured[P]>
  }




  export type FeaturedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeaturedWhereInput
    orderBy?: FeaturedOrderByWithAggregationInput | FeaturedOrderByWithAggregationInput[]
    by: FeaturedScalarFieldEnum[] | FeaturedScalarFieldEnum
    having?: FeaturedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeaturedCountAggregateInputType | true
    _min?: FeaturedMinAggregateInputType
    _max?: FeaturedMaxAggregateInputType
  }

  export type FeaturedGroupByOutputType = {
    id: string
    paymentId: string
    userId: string
    featurePlanId: string
    startDate: Date
    endDate: Date
    createdAt: Date
    updatededAt: Date
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    _count: FeaturedCountAggregateOutputType | null
    _min: FeaturedMinAggregateOutputType | null
    _max: FeaturedMaxAggregateOutputType | null
  }

  type GetFeaturedGroupByPayload<T extends FeaturedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeaturedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeaturedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeaturedGroupByOutputType[P]>
            : GetScalarType<T[P], FeaturedGroupByOutputType[P]>
        }
      >
    >


  export type FeaturedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    userId?: boolean
    featurePlanId?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatededAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featured"]>

  export type FeaturedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    userId?: boolean
    featurePlanId?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatededAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featured"]>

  export type FeaturedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    userId?: boolean
    featurePlanId?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatededAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featured"]>

  export type FeaturedSelectScalar = {
    id?: boolean
    paymentId?: boolean
    userId?: boolean
    featurePlanId?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatededAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type FeaturedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentId" | "userId" | "featurePlanId" | "startDate" | "endDate" | "createdAt" | "updatededAt" | "updatedBy" | "deletedAt" | "deletedBy", ExtArgs["result"]["featured"]>
  export type FeaturedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeaturedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeaturedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FeaturedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Featured"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentId: string
      userId: string
      featurePlanId: string
      startDate: Date
      endDate: Date
      createdAt: Date
      updatededAt: Date
      updatedBy: string | null
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["featured"]>
    composites: {}
  }

  type FeaturedGetPayload<S extends boolean | null | undefined | FeaturedDefaultArgs> = $Result.GetResult<Prisma.$FeaturedPayload, S>

  type FeaturedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeaturedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeaturedCountAggregateInputType | true
    }

  export interface FeaturedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Featured'], meta: { name: 'Featured' } }
    /**
     * Find zero or one Featured that matches the filter.
     * @param {FeaturedFindUniqueArgs} args - Arguments to find a Featured
     * @example
     * // Get one Featured
     * const featured = await prisma.featured.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeaturedFindUniqueArgs>(args: SelectSubset<T, FeaturedFindUniqueArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Featured that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeaturedFindUniqueOrThrowArgs} args - Arguments to find a Featured
     * @example
     * // Get one Featured
     * const featured = await prisma.featured.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeaturedFindUniqueOrThrowArgs>(args: SelectSubset<T, FeaturedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Featured that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedFindFirstArgs} args - Arguments to find a Featured
     * @example
     * // Get one Featured
     * const featured = await prisma.featured.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeaturedFindFirstArgs>(args?: SelectSubset<T, FeaturedFindFirstArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Featured that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedFindFirstOrThrowArgs} args - Arguments to find a Featured
     * @example
     * // Get one Featured
     * const featured = await prisma.featured.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeaturedFindFirstOrThrowArgs>(args?: SelectSubset<T, FeaturedFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Featureds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Featureds
     * const featureds = await prisma.featured.findMany()
     * 
     * // Get first 10 Featureds
     * const featureds = await prisma.featured.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featuredWithIdOnly = await prisma.featured.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeaturedFindManyArgs>(args?: SelectSubset<T, FeaturedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Featured.
     * @param {FeaturedCreateArgs} args - Arguments to create a Featured.
     * @example
     * // Create one Featured
     * const Featured = await prisma.featured.create({
     *   data: {
     *     // ... data to create a Featured
     *   }
     * })
     * 
     */
    create<T extends FeaturedCreateArgs>(args: SelectSubset<T, FeaturedCreateArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Featureds.
     * @param {FeaturedCreateManyArgs} args - Arguments to create many Featureds.
     * @example
     * // Create many Featureds
     * const featured = await prisma.featured.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeaturedCreateManyArgs>(args?: SelectSubset<T, FeaturedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Featureds and returns the data saved in the database.
     * @param {FeaturedCreateManyAndReturnArgs} args - Arguments to create many Featureds.
     * @example
     * // Create many Featureds
     * const featured = await prisma.featured.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Featureds and only return the `id`
     * const featuredWithIdOnly = await prisma.featured.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeaturedCreateManyAndReturnArgs>(args?: SelectSubset<T, FeaturedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Featured.
     * @param {FeaturedDeleteArgs} args - Arguments to delete one Featured.
     * @example
     * // Delete one Featured
     * const Featured = await prisma.featured.delete({
     *   where: {
     *     // ... filter to delete one Featured
     *   }
     * })
     * 
     */
    delete<T extends FeaturedDeleteArgs>(args: SelectSubset<T, FeaturedDeleteArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Featured.
     * @param {FeaturedUpdateArgs} args - Arguments to update one Featured.
     * @example
     * // Update one Featured
     * const featured = await prisma.featured.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeaturedUpdateArgs>(args: SelectSubset<T, FeaturedUpdateArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Featureds.
     * @param {FeaturedDeleteManyArgs} args - Arguments to filter Featureds to delete.
     * @example
     * // Delete a few Featureds
     * const { count } = await prisma.featured.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeaturedDeleteManyArgs>(args?: SelectSubset<T, FeaturedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Featureds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Featureds
     * const featured = await prisma.featured.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeaturedUpdateManyArgs>(args: SelectSubset<T, FeaturedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Featureds and returns the data updated in the database.
     * @param {FeaturedUpdateManyAndReturnArgs} args - Arguments to update many Featureds.
     * @example
     * // Update many Featureds
     * const featured = await prisma.featured.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Featureds and only return the `id`
     * const featuredWithIdOnly = await prisma.featured.updateManyAndReturn({
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
    updateManyAndReturn<T extends FeaturedUpdateManyAndReturnArgs>(args: SelectSubset<T, FeaturedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Featured.
     * @param {FeaturedUpsertArgs} args - Arguments to update or create a Featured.
     * @example
     * // Update or create a Featured
     * const featured = await prisma.featured.upsert({
     *   create: {
     *     // ... data to create a Featured
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Featured we want to update
     *   }
     * })
     */
    upsert<T extends FeaturedUpsertArgs>(args: SelectSubset<T, FeaturedUpsertArgs<ExtArgs>>): Prisma__FeaturedClient<$Result.GetResult<Prisma.$FeaturedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Featureds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedCountArgs} args - Arguments to filter Featureds to count.
     * @example
     * // Count the number of Featureds
     * const count = await prisma.featured.count({
     *   where: {
     *     // ... the filter for the Featureds we want to count
     *   }
     * })
    **/
    count<T extends FeaturedCountArgs>(
      args?: Subset<T, FeaturedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeaturedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Featured.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeaturedAggregateArgs>(args: Subset<T, FeaturedAggregateArgs>): Prisma.PrismaPromise<GetFeaturedAggregateType<T>>

    /**
     * Group by Featured.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeaturedGroupByArgs} args - Group by arguments.
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
      T extends FeaturedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeaturedGroupByArgs['orderBy'] }
        : { orderBy?: FeaturedGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeaturedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeaturedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Featured model
   */
  readonly fields: FeaturedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Featured.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeaturedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Featured model
   */
  interface FeaturedFieldRefs {
    readonly id: FieldRef<"Featured", 'String'>
    readonly paymentId: FieldRef<"Featured", 'String'>
    readonly userId: FieldRef<"Featured", 'String'>
    readonly featurePlanId: FieldRef<"Featured", 'String'>
    readonly startDate: FieldRef<"Featured", 'DateTime'>
    readonly endDate: FieldRef<"Featured", 'DateTime'>
    readonly createdAt: FieldRef<"Featured", 'DateTime'>
    readonly updatededAt: FieldRef<"Featured", 'DateTime'>
    readonly updatedBy: FieldRef<"Featured", 'String'>
    readonly deletedAt: FieldRef<"Featured", 'DateTime'>
    readonly deletedBy: FieldRef<"Featured", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Featured findUnique
   */
  export type FeaturedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * Filter, which Featured to fetch.
     */
    where: FeaturedWhereUniqueInput
  }

  /**
   * Featured findUniqueOrThrow
   */
  export type FeaturedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * Filter, which Featured to fetch.
     */
    where: FeaturedWhereUniqueInput
  }

  /**
   * Featured findFirst
   */
  export type FeaturedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * Filter, which Featured to fetch.
     */
    where?: FeaturedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Featureds to fetch.
     */
    orderBy?: FeaturedOrderByWithRelationInput | FeaturedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Featureds.
     */
    cursor?: FeaturedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Featureds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Featureds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Featureds.
     */
    distinct?: FeaturedScalarFieldEnum | FeaturedScalarFieldEnum[]
  }

  /**
   * Featured findFirstOrThrow
   */
  export type FeaturedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * Filter, which Featured to fetch.
     */
    where?: FeaturedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Featureds to fetch.
     */
    orderBy?: FeaturedOrderByWithRelationInput | FeaturedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Featureds.
     */
    cursor?: FeaturedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Featureds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Featureds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Featureds.
     */
    distinct?: FeaturedScalarFieldEnum | FeaturedScalarFieldEnum[]
  }

  /**
   * Featured findMany
   */
  export type FeaturedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * Filter, which Featureds to fetch.
     */
    where?: FeaturedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Featureds to fetch.
     */
    orderBy?: FeaturedOrderByWithRelationInput | FeaturedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Featureds.
     */
    cursor?: FeaturedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Featureds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Featureds.
     */
    skip?: number
    distinct?: FeaturedScalarFieldEnum | FeaturedScalarFieldEnum[]
  }

  /**
   * Featured create
   */
  export type FeaturedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * The data needed to create a Featured.
     */
    data: XOR<FeaturedCreateInput, FeaturedUncheckedCreateInput>
  }

  /**
   * Featured createMany
   */
  export type FeaturedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Featureds.
     */
    data: FeaturedCreateManyInput | FeaturedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Featured createManyAndReturn
   */
  export type FeaturedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * The data used to create many Featureds.
     */
    data: FeaturedCreateManyInput | FeaturedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Featured update
   */
  export type FeaturedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * The data needed to update a Featured.
     */
    data: XOR<FeaturedUpdateInput, FeaturedUncheckedUpdateInput>
    /**
     * Choose, which Featured to update.
     */
    where: FeaturedWhereUniqueInput
  }

  /**
   * Featured updateMany
   */
  export type FeaturedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Featureds.
     */
    data: XOR<FeaturedUpdateManyMutationInput, FeaturedUncheckedUpdateManyInput>
    /**
     * Filter which Featureds to update
     */
    where?: FeaturedWhereInput
    /**
     * Limit how many Featureds to update.
     */
    limit?: number
  }

  /**
   * Featured updateManyAndReturn
   */
  export type FeaturedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * The data used to update Featureds.
     */
    data: XOR<FeaturedUpdateManyMutationInput, FeaturedUncheckedUpdateManyInput>
    /**
     * Filter which Featureds to update
     */
    where?: FeaturedWhereInput
    /**
     * Limit how many Featureds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Featured upsert
   */
  export type FeaturedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * The filter to search for the Featured to update in case it exists.
     */
    where: FeaturedWhereUniqueInput
    /**
     * In case the Featured found by the `where` argument doesn't exist, create a new Featured with this data.
     */
    create: XOR<FeaturedCreateInput, FeaturedUncheckedCreateInput>
    /**
     * In case the Featured was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeaturedUpdateInput, FeaturedUncheckedUpdateInput>
  }

  /**
   * Featured delete
   */
  export type FeaturedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
    /**
     * Filter which Featured to delete.
     */
    where: FeaturedWhereUniqueInput
  }

  /**
   * Featured deleteMany
   */
  export type FeaturedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Featureds to delete
     */
    where?: FeaturedWhereInput
    /**
     * Limit how many Featureds to delete.
     */
    limit?: number
  }

  /**
   * Featured without action
   */
  export type FeaturedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Featured
     */
    select?: FeaturedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Featured
     */
    omit?: FeaturedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeaturedInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    subscriptionPlanId: string | null
    status: $Enums.SUBSCRIPTIONSTATUS | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    subscriptionPlanId: string | null
    status: $Enums.SUBSCRIPTIONSTATUS | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    paymentId: number
    subscriptionPlanId: number
    status: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    updatedBy: number
    deletedAt: number
    deletedBy: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    subscriptionPlanId?: true
    status?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    subscriptionPlanId?: true
    status?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    paymentId?: true
    subscriptionPlanId?: true
    status?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    deletedAt?: true
    deletedBy?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    paymentId: string[]
    subscriptionPlanId: string
    status: $Enums.SUBSCRIPTIONSTATUS
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    updatedBy: string | null
    deletedAt: Date | null
    deletedBy: string | null
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    subscriptionPlanId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    subscriptionPlanId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    subscriptionPlanId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    paymentId?: boolean
    subscriptionPlanId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentId" | "subscriptionPlanId" | "status" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentId: string[]
      subscriptionPlanId: string
      status: $Enums.SUBSCRIPTIONSTATUS
      startDate: Date
      endDate: Date
      createdAt: Date
      updatedAt: Date
      updatedBy: string | null
      deletedAt: Date | null
      deletedBy: string | null
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
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
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly paymentId: FieldRef<"Subscription", 'String[]'>
    readonly subscriptionPlanId: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'SUBSCRIPTIONSTATUS'>
    readonly startDate: FieldRef<"Subscription", 'DateTime'>
    readonly endDate: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedBy: FieldRef<"Subscription", 'String'>
    readonly deletedAt: FieldRef<"Subscription", 'DateTime'>
    readonly deletedBy: FieldRef<"Subscription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    isEmailVerified: 'isEmailVerified',
    password: 'password',
    userType: 'userType',
    status: 'status',
    refreshToken: 'refreshToken',
    lastLoginAt: 'lastLoginAt',
    loginAttempts: 'loginAttempts',
    streetAddress: 'streetAddress',
    streetAddress2: 'streetAddress2',
    city: 'city',
    state: 'state',
    country: 'country',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const ServiceProviderScalarFieldEnum: {
    id: 'id',
    businessName: 'businessName',
    serviceType: 'serviceType',
    businessLogo: 'businessLogo',
    pricingInfo: 'pricingInfo',
    regulations: 'regulations',
    additionalInformation: 'additionalInformation',
    workingHours: 'workingHours',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceProviderScalarFieldEnum = (typeof ServiceProviderScalarFieldEnum)[keyof typeof ServiceProviderScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    historyOfServiceProviders: 'historyOfServiceProviders',
    preferences: 'preferences',
    referralCode: 'referralCode',
    profilePicture: 'profilePicture',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const StaffScalarFieldEnum: {
    id: 'id',
    serviceProviderId: 'serviceProviderId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const PasswordHistoryScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PasswordHistoryScalarFieldEnum = (typeof PasswordHistoryScalarFieldEnum)[keyof typeof PasswordHistoryScalarFieldEnum]


  export const PersonalAccessTokensScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    type: 'type',
    expiry: 'expiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PersonalAccessTokensScalarFieldEnum = (typeof PersonalAccessTokensScalarFieldEnum)[keyof typeof PersonalAccessTokensScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    role: 'role',
    action: 'action',
    resource: 'resource',
    condition: 'condition'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const SubscriptionPlanScalarFieldEnum: {
    id: 'id'
  };

  export type SubscriptionPlanScalarFieldEnum = (typeof SubscriptionPlanScalarFieldEnum)[keyof typeof SubscriptionPlanScalarFieldEnum]


  export const KYCVerificationScalarFieldEnum: {
    id: 'id',
    facialVerificationImage: 'facialVerificationImage',
    idCardType: 'idCardType',
    idNumber: 'idNumber',
    expiryDate: 'expiryDate',
    facialVerificationStatus: 'facialVerificationStatus',
    idVerificationStatus: 'idVerificationStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KYCVerificationScalarFieldEnum = (typeof KYCVerificationScalarFieldEnum)[keyof typeof KYCVerificationScalarFieldEnum]


  export const FeaturedScalarFieldEnum: {
    id: 'id',
    paymentId: 'paymentId',
    userId: 'userId',
    featurePlanId: 'featurePlanId',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatededAt: 'updatededAt',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type FeaturedScalarFieldEnum = (typeof FeaturedScalarFieldEnum)[keyof typeof FeaturedScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    paymentId: 'paymentId',
    subscriptionPlanId: 'subscriptionPlanId',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AdminRole'
   */
  export type EnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole'>
    


  /**
   * Reference to a field of type 'AdminRole[]'
   */
  export type ListEnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole[]'>
    


  /**
   * Reference to a field of type 'ServiceType'
   */
  export type EnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType'>
    


  /**
   * Reference to a field of type 'ServiceType[]'
   */
  export type ListEnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'SUBSCRIPTIONSTATUS'
   */
  export type EnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SUBSCRIPTIONSTATUS'>
    


  /**
   * Reference to a field of type 'SUBSCRIPTIONSTATUS[]'
   */
  export type ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SUBSCRIPTIONSTATUS[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    isEmailVerified?: BoolFilter<"User"> | boolean
    password?: StringFilter<"User"> | string
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    refreshToken?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    loginAttempts?: IntFilter<"User"> | number
    streetAddress?: StringNullableFilter<"User"> | string | null
    streetAddress2?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedBy?: StringNullableFilter<"User"> | string | null
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    serviceProvider?: XOR<ServiceProviderNullableScalarRelationFilter, ServiceProviderWhereInput> | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    staff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    personalAccessToken?: PersonalAccessTokensListRelationFilter
    kycVerification?: XOR<KYCVerificationNullableScalarRelationFilter, KYCVerificationWhereInput> | null
    featured?: FeaturedListRelationFilter
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    passwordHistory?: PasswordHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrder
    isEmailVerified?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    loginAttempts?: SortOrder
    streetAddress?: SortOrderInput | SortOrder
    streetAddress2?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    admin?: AdminOrderByWithRelationInput
    serviceProvider?: ServiceProviderOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    staff?: StaffOrderByWithRelationInput
    personalAccessToken?: PersonalAccessTokensOrderByRelationAggregateInput
    kycVerification?: KYCVerificationOrderByWithRelationInput
    featured?: FeaturedOrderByRelationAggregateInput
    subscription?: SubscriptionOrderByWithRelationInput
    passwordHistory?: PasswordHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isEmailVerified?: BoolFilter<"User"> | boolean
    password?: StringFilter<"User"> | string
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    refreshToken?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    loginAttempts?: IntFilter<"User"> | number
    streetAddress?: StringNullableFilter<"User"> | string | null
    streetAddress2?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedBy?: StringNullableFilter<"User"> | string | null
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    serviceProvider?: XOR<ServiceProviderNullableScalarRelationFilter, ServiceProviderWhereInput> | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    staff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    personalAccessToken?: PersonalAccessTokensListRelationFilter
    kycVerification?: XOR<KYCVerificationNullableScalarRelationFilter, KYCVerificationWhereInput> | null
    featured?: FeaturedListRelationFilter
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    passwordHistory?: PasswordHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrder
    isEmailVerified?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    loginAttempts?: SortOrder
    streetAddress?: SortOrderInput | SortOrder
    streetAddress2?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    password?: StringWithAggregatesFilter<"User"> | string
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    loginAttempts?: IntWithAggregatesFilter<"User"> | number
    streetAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    streetAddress2?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    state?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    role?: EnumAdminRoleNullableFilter<"Admin"> | $Enums.AdminRole | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    role?: EnumAdminRoleNullableFilter<"Admin"> | $Enums.AdminRole | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    role?: EnumAdminRoleNullableWithAggregatesFilter<"Admin"> | $Enums.AdminRole | null
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type ServiceProviderWhereInput = {
    AND?: ServiceProviderWhereInput | ServiceProviderWhereInput[]
    OR?: ServiceProviderWhereInput[]
    NOT?: ServiceProviderWhereInput | ServiceProviderWhereInput[]
    id?: StringFilter<"ServiceProvider"> | string
    businessName?: StringFilter<"ServiceProvider"> | string
    serviceType?: EnumServiceTypeFilter<"ServiceProvider"> | $Enums.ServiceType
    businessLogo?: StringNullableFilter<"ServiceProvider"> | string | null
    pricingInfo?: StringNullableFilter<"ServiceProvider"> | string | null
    regulations?: StringNullableFilter<"ServiceProvider"> | string | null
    additionalInformation?: StringNullableFilter<"ServiceProvider"> | string | null
    workingHours?: JsonNullableFilter<"ServiceProvider">
    createdAt?: DateTimeFilter<"ServiceProvider"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceProvider"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    staffs?: StaffListRelationFilter
  }

  export type ServiceProviderOrderByWithRelationInput = {
    id?: SortOrder
    businessName?: SortOrder
    serviceType?: SortOrder
    businessLogo?: SortOrderInput | SortOrder
    pricingInfo?: SortOrderInput | SortOrder
    regulations?: SortOrderInput | SortOrder
    additionalInformation?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    staffs?: StaffOrderByRelationAggregateInput
  }

  export type ServiceProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceProviderWhereInput | ServiceProviderWhereInput[]
    OR?: ServiceProviderWhereInput[]
    NOT?: ServiceProviderWhereInput | ServiceProviderWhereInput[]
    businessName?: StringFilter<"ServiceProvider"> | string
    serviceType?: EnumServiceTypeFilter<"ServiceProvider"> | $Enums.ServiceType
    businessLogo?: StringNullableFilter<"ServiceProvider"> | string | null
    pricingInfo?: StringNullableFilter<"ServiceProvider"> | string | null
    regulations?: StringNullableFilter<"ServiceProvider"> | string | null
    additionalInformation?: StringNullableFilter<"ServiceProvider"> | string | null
    workingHours?: JsonNullableFilter<"ServiceProvider">
    createdAt?: DateTimeFilter<"ServiceProvider"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceProvider"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    staffs?: StaffListRelationFilter
  }, "id">

  export type ServiceProviderOrderByWithAggregationInput = {
    id?: SortOrder
    businessName?: SortOrder
    serviceType?: SortOrder
    businessLogo?: SortOrderInput | SortOrder
    pricingInfo?: SortOrderInput | SortOrder
    regulations?: SortOrderInput | SortOrder
    additionalInformation?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceProviderCountOrderByAggregateInput
    _max?: ServiceProviderMaxOrderByAggregateInput
    _min?: ServiceProviderMinOrderByAggregateInput
  }

  export type ServiceProviderScalarWhereWithAggregatesInput = {
    AND?: ServiceProviderScalarWhereWithAggregatesInput | ServiceProviderScalarWhereWithAggregatesInput[]
    OR?: ServiceProviderScalarWhereWithAggregatesInput[]
    NOT?: ServiceProviderScalarWhereWithAggregatesInput | ServiceProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceProvider"> | string
    businessName?: StringWithAggregatesFilter<"ServiceProvider"> | string
    serviceType?: EnumServiceTypeWithAggregatesFilter<"ServiceProvider"> | $Enums.ServiceType
    businessLogo?: StringNullableWithAggregatesFilter<"ServiceProvider"> | string | null
    pricingInfo?: StringNullableWithAggregatesFilter<"ServiceProvider"> | string | null
    regulations?: StringNullableWithAggregatesFilter<"ServiceProvider"> | string | null
    additionalInformation?: StringNullableWithAggregatesFilter<"ServiceProvider"> | string | null
    workingHours?: JsonNullableWithAggregatesFilter<"ServiceProvider">
    createdAt?: DateTimeWithAggregatesFilter<"ServiceProvider"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceProvider"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    historyOfServiceProviders?: StringNullableListFilter<"Customer">
    preferences?: JsonNullableFilter<"Customer">
    referralCode?: StringNullableFilter<"Customer"> | string | null
    profilePicture?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    historyOfServiceProviders?: SortOrder
    preferences?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    historyOfServiceProviders?: StringNullableListFilter<"Customer">
    preferences?: JsonNullableFilter<"Customer">
    referralCode?: StringNullableFilter<"Customer"> | string | null
    profilePicture?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    historyOfServiceProviders?: SortOrder
    preferences?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    historyOfServiceProviders?: StringNullableListFilter<"Customer">
    preferences?: JsonNullableWithAggregatesFilter<"Customer">
    referralCode?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    profilePicture?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: StringFilter<"Staff"> | string
    serviceProviderId?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    serviceProvider?: XOR<ServiceProviderScalarRelationFilter, ServiceProviderWhereInput>
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    serviceProviderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    serviceProvider?: ServiceProviderOrderByWithRelationInput
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    serviceProviderId?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    serviceProvider?: XOR<ServiceProviderScalarRelationFilter, ServiceProviderWhereInput>
  }, "id">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    serviceProviderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Staff"> | string
    serviceProviderId?: StringWithAggregatesFilter<"Staff"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type PasswordHistoryWhereInput = {
    AND?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    OR?: PasswordHistoryWhereInput[]
    NOT?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    id?: StringFilter<"PasswordHistory"> | string
    user_id?: StringFilter<"PasswordHistory"> | string
    password?: StringFilter<"PasswordHistory"> | string
    createdAt?: DateTimeFilter<"PasswordHistory"> | Date | string
    updatedAt?: DateTimeNullableFilter<"PasswordHistory"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordHistoryOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    OR?: PasswordHistoryWhereInput[]
    NOT?: PasswordHistoryWhereInput | PasswordHistoryWhereInput[]
    user_id?: StringFilter<"PasswordHistory"> | string
    password?: StringFilter<"PasswordHistory"> | string
    createdAt?: DateTimeFilter<"PasswordHistory"> | Date | string
    updatedAt?: DateTimeNullableFilter<"PasswordHistory"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PasswordHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: PasswordHistoryCountOrderByAggregateInput
    _max?: PasswordHistoryMaxOrderByAggregateInput
    _min?: PasswordHistoryMinOrderByAggregateInput
  }

  export type PasswordHistoryScalarWhereWithAggregatesInput = {
    AND?: PasswordHistoryScalarWhereWithAggregatesInput | PasswordHistoryScalarWhereWithAggregatesInput[]
    OR?: PasswordHistoryScalarWhereWithAggregatesInput[]
    NOT?: PasswordHistoryScalarWhereWithAggregatesInput | PasswordHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordHistory"> | string
    user_id?: StringWithAggregatesFilter<"PasswordHistory"> | string
    password?: StringWithAggregatesFilter<"PasswordHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordHistory"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"PasswordHistory"> | Date | string | null
  }

  export type PersonalAccessTokensWhereInput = {
    AND?: PersonalAccessTokensWhereInput | PersonalAccessTokensWhereInput[]
    OR?: PersonalAccessTokensWhereInput[]
    NOT?: PersonalAccessTokensWhereInput | PersonalAccessTokensWhereInput[]
    id?: StringFilter<"PersonalAccessTokens"> | string
    userId?: StringFilter<"PersonalAccessTokens"> | string
    token?: StringFilter<"PersonalAccessTokens"> | string
    type?: EnumTokenTypeFilter<"PersonalAccessTokens"> | $Enums.TokenType
    expiry?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    createdAt?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    updatedAt?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PersonalAccessTokensOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PersonalAccessTokensWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    userId_type?: PersonalAccessTokensUserIdTypeCompoundUniqueInput
    AND?: PersonalAccessTokensWhereInput | PersonalAccessTokensWhereInput[]
    OR?: PersonalAccessTokensWhereInput[]
    NOT?: PersonalAccessTokensWhereInput | PersonalAccessTokensWhereInput[]
    userId?: StringFilter<"PersonalAccessTokens"> | string
    type?: EnumTokenTypeFilter<"PersonalAccessTokens"> | $Enums.TokenType
    expiry?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    createdAt?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    updatedAt?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token" | "userId_type">

  export type PersonalAccessTokensOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonalAccessTokensCountOrderByAggregateInput
    _max?: PersonalAccessTokensMaxOrderByAggregateInput
    _min?: PersonalAccessTokensMinOrderByAggregateInput
  }

  export type PersonalAccessTokensScalarWhereWithAggregatesInput = {
    AND?: PersonalAccessTokensScalarWhereWithAggregatesInput | PersonalAccessTokensScalarWhereWithAggregatesInput[]
    OR?: PersonalAccessTokensScalarWhereWithAggregatesInput[]
    NOT?: PersonalAccessTokensScalarWhereWithAggregatesInput | PersonalAccessTokensScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PersonalAccessTokens"> | string
    userId?: StringWithAggregatesFilter<"PersonalAccessTokens"> | string
    token?: StringWithAggregatesFilter<"PersonalAccessTokens"> | string
    type?: EnumTokenTypeWithAggregatesFilter<"PersonalAccessTokens"> | $Enums.TokenType
    expiry?: DateTimeWithAggregatesFilter<"PersonalAccessTokens"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PersonalAccessTokens"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PersonalAccessTokens"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: StringFilter<"Permission"> | string
    role?: EnumAdminRoleFilter<"Permission"> | $Enums.AdminRole
    action?: StringFilter<"Permission"> | string
    resource?: StringFilter<"Permission"> | string
    condition?: JsonNullableFilter<"Permission">
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    condition?: SortOrderInput | SortOrder
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    role?: EnumAdminRoleFilter<"Permission"> | $Enums.AdminRole
    action?: StringFilter<"Permission"> | string
    resource?: StringFilter<"Permission"> | string
    condition?: JsonNullableFilter<"Permission">
  }, "id">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    condition?: SortOrderInput | SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permission"> | string
    role?: EnumAdminRoleWithAggregatesFilter<"Permission"> | $Enums.AdminRole
    action?: StringWithAggregatesFilter<"Permission"> | string
    resource?: StringWithAggregatesFilter<"Permission"> | string
    condition?: JsonNullableWithAggregatesFilter<"Permission">
  }

  export type SubscriptionPlanWhereInput = {
    AND?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    OR?: SubscriptionPlanWhereInput[]
    NOT?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    id?: StringFilter<"SubscriptionPlan"> | string
  }

  export type SubscriptionPlanOrderByWithRelationInput = {
    id?: SortOrder
  }

  export type SubscriptionPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    OR?: SubscriptionPlanWhereInput[]
    NOT?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
  }, "id">

  export type SubscriptionPlanOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: SubscriptionPlanCountOrderByAggregateInput
    _max?: SubscriptionPlanMaxOrderByAggregateInput
    _min?: SubscriptionPlanMinOrderByAggregateInput
  }

  export type SubscriptionPlanScalarWhereWithAggregatesInput = {
    AND?: SubscriptionPlanScalarWhereWithAggregatesInput | SubscriptionPlanScalarWhereWithAggregatesInput[]
    OR?: SubscriptionPlanScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionPlanScalarWhereWithAggregatesInput | SubscriptionPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubscriptionPlan"> | string
  }

  export type KYCVerificationWhereInput = {
    AND?: KYCVerificationWhereInput | KYCVerificationWhereInput[]
    OR?: KYCVerificationWhereInput[]
    NOT?: KYCVerificationWhereInput | KYCVerificationWhereInput[]
    id?: StringFilter<"KYCVerification"> | string
    facialVerificationImage?: StringNullableFilter<"KYCVerification"> | string | null
    idCardType?: StringNullableFilter<"KYCVerification"> | string | null
    idNumber?: StringNullableFilter<"KYCVerification"> | string | null
    expiryDate?: DateTimeNullableFilter<"KYCVerification"> | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFilter<"KYCVerification"> | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFilter<"KYCVerification"> | $Enums.VerificationStatus
    createdAt?: DateTimeFilter<"KYCVerification"> | Date | string
    updatedAt?: DateTimeFilter<"KYCVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type KYCVerificationOrderByWithRelationInput = {
    id?: SortOrder
    facialVerificationImage?: SortOrderInput | SortOrder
    idCardType?: SortOrderInput | SortOrder
    idNumber?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    facialVerificationStatus?: SortOrder
    idVerificationStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type KYCVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KYCVerificationWhereInput | KYCVerificationWhereInput[]
    OR?: KYCVerificationWhereInput[]
    NOT?: KYCVerificationWhereInput | KYCVerificationWhereInput[]
    facialVerificationImage?: StringNullableFilter<"KYCVerification"> | string | null
    idCardType?: StringNullableFilter<"KYCVerification"> | string | null
    idNumber?: StringNullableFilter<"KYCVerification"> | string | null
    expiryDate?: DateTimeNullableFilter<"KYCVerification"> | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFilter<"KYCVerification"> | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFilter<"KYCVerification"> | $Enums.VerificationStatus
    createdAt?: DateTimeFilter<"KYCVerification"> | Date | string
    updatedAt?: DateTimeFilter<"KYCVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type KYCVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    facialVerificationImage?: SortOrderInput | SortOrder
    idCardType?: SortOrderInput | SortOrder
    idNumber?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    facialVerificationStatus?: SortOrder
    idVerificationStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KYCVerificationCountOrderByAggregateInput
    _max?: KYCVerificationMaxOrderByAggregateInput
    _min?: KYCVerificationMinOrderByAggregateInput
  }

  export type KYCVerificationScalarWhereWithAggregatesInput = {
    AND?: KYCVerificationScalarWhereWithAggregatesInput | KYCVerificationScalarWhereWithAggregatesInput[]
    OR?: KYCVerificationScalarWhereWithAggregatesInput[]
    NOT?: KYCVerificationScalarWhereWithAggregatesInput | KYCVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KYCVerification"> | string
    facialVerificationImage?: StringNullableWithAggregatesFilter<"KYCVerification"> | string | null
    idCardType?: StringNullableWithAggregatesFilter<"KYCVerification"> | string | null
    idNumber?: StringNullableWithAggregatesFilter<"KYCVerification"> | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"KYCVerification"> | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusWithAggregatesFilter<"KYCVerification"> | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusWithAggregatesFilter<"KYCVerification"> | $Enums.VerificationStatus
    createdAt?: DateTimeWithAggregatesFilter<"KYCVerification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KYCVerification"> | Date | string
  }

  export type FeaturedWhereInput = {
    AND?: FeaturedWhereInput | FeaturedWhereInput[]
    OR?: FeaturedWhereInput[]
    NOT?: FeaturedWhereInput | FeaturedWhereInput[]
    id?: StringFilter<"Featured"> | string
    paymentId?: StringFilter<"Featured"> | string
    userId?: StringFilter<"Featured"> | string
    featurePlanId?: StringFilter<"Featured"> | string
    startDate?: DateTimeFilter<"Featured"> | Date | string
    endDate?: DateTimeFilter<"Featured"> | Date | string
    createdAt?: DateTimeFilter<"Featured"> | Date | string
    updatededAt?: DateTimeFilter<"Featured"> | Date | string
    updatedBy?: StringNullableFilter<"Featured"> | string | null
    deletedAt?: DateTimeNullableFilter<"Featured"> | Date | string | null
    deletedBy?: StringNullableFilter<"Featured"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FeaturedOrderByWithRelationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    userId?: SortOrder
    featurePlanId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatededAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FeaturedWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: FeaturedWhereInput | FeaturedWhereInput[]
    OR?: FeaturedWhereInput[]
    NOT?: FeaturedWhereInput | FeaturedWhereInput[]
    paymentId?: StringFilter<"Featured"> | string
    featurePlanId?: StringFilter<"Featured"> | string
    startDate?: DateTimeFilter<"Featured"> | Date | string
    endDate?: DateTimeFilter<"Featured"> | Date | string
    createdAt?: DateTimeFilter<"Featured"> | Date | string
    updatededAt?: DateTimeFilter<"Featured"> | Date | string
    updatedBy?: StringNullableFilter<"Featured"> | string | null
    deletedAt?: DateTimeNullableFilter<"Featured"> | Date | string | null
    deletedBy?: StringNullableFilter<"Featured"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type FeaturedOrderByWithAggregationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    userId?: SortOrder
    featurePlanId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatededAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: FeaturedCountOrderByAggregateInput
    _max?: FeaturedMaxOrderByAggregateInput
    _min?: FeaturedMinOrderByAggregateInput
  }

  export type FeaturedScalarWhereWithAggregatesInput = {
    AND?: FeaturedScalarWhereWithAggregatesInput | FeaturedScalarWhereWithAggregatesInput[]
    OR?: FeaturedScalarWhereWithAggregatesInput[]
    NOT?: FeaturedScalarWhereWithAggregatesInput | FeaturedScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Featured"> | string
    paymentId?: StringWithAggregatesFilter<"Featured"> | string
    userId?: StringWithAggregatesFilter<"Featured"> | string
    featurePlanId?: StringWithAggregatesFilter<"Featured"> | string
    startDate?: DateTimeWithAggregatesFilter<"Featured"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Featured"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Featured"> | Date | string
    updatededAt?: DateTimeWithAggregatesFilter<"Featured"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Featured"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Featured"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Featured"> | string | null
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    paymentId?: StringNullableListFilter<"Subscription">
    subscriptionPlanId?: StringFilter<"Subscription"> | string
    status?: EnumSUBSCRIPTIONSTATUSFilter<"Subscription"> | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedBy?: StringNullableFilter<"Subscription"> | string | null
    deletedAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    deletedBy?: StringNullableFilter<"Subscription"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    subscriptionPlanId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    paymentId?: StringNullableListFilter<"Subscription">
    subscriptionPlanId?: StringFilter<"Subscription"> | string
    status?: EnumSUBSCRIPTIONSTATUSFilter<"Subscription"> | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedBy?: StringNullableFilter<"Subscription"> | string | null
    deletedAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    deletedBy?: StringNullableFilter<"Subscription"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    subscriptionPlanId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    paymentId?: StringNullableListFilter<"Subscription">
    subscriptionPlanId?: StringWithAggregatesFilter<"Subscription"> | string
    status?: EnumSUBSCRIPTIONSTATUSWithAggregatesFilter<"Subscription"> | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminCreateInput = {
    role?: $Enums.AdminRole | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    role?: $Enums.AdminRole | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateInput = {
    role?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: string
    role?: $Enums.AdminRole | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    role?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceProviderCreateInput = {
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutServiceProviderInput
    staffs?: StaffCreateNestedManyWithoutServiceProviderInput
  }

  export type ServiceProviderUncheckedCreateInput = {
    id?: string
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    staffs?: StaffUncheckedCreateNestedManyWithoutServiceProviderInput
  }

  export type ServiceProviderUpdateInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceProviderNestedInput
    staffs?: StaffUpdateManyWithoutServiceProviderNestedInput
  }

  export type ServiceProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffs?: StaffUncheckedUpdateManyWithoutServiceProviderNestedInput
  }

  export type ServiceProviderCreateManyInput = {
    id?: string
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceProviderUpdateManyMutationInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    historyOfServiceProviders?: CustomerCreatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: string | null
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    historyOfServiceProviders?: CustomerCreatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: string | null
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateInput = {
    historyOfServiceProviders?: CustomerUpdatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    historyOfServiceProviders?: CustomerUpdatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyInput = {
    id?: string
    historyOfServiceProviders?: CustomerCreatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: string | null
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    historyOfServiceProviders?: CustomerUpdatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    historyOfServiceProviders?: CustomerUpdatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutStaffInput
    serviceProvider: ServiceProviderCreateNestedOneWithoutStaffsInput
  }

  export type StaffUncheckedCreateInput = {
    id?: string
    serviceProviderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
    serviceProvider?: ServiceProviderUpdateOneRequiredWithoutStaffsNestedInput
  }

  export type StaffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateManyInput = {
    id?: string
    serviceProviderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordHistoryCreateInput = {
    id?: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPasswordHistoryInput
  }

  export type PasswordHistoryUncheckedCreateInput = {
    id?: string
    user_id: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type PasswordHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPasswordHistoryNestedInput
  }

  export type PasswordHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordHistoryCreateManyInput = {
    id?: string
    user_id: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type PasswordHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PersonalAccessTokensCreateInput = {
    id?: string
    token: string
    type: $Enums.TokenType
    expiry: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPersonalAccessTokenInput
  }

  export type PersonalAccessTokensUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    type: $Enums.TokenType
    expiry: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalAccessTokensUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPersonalAccessTokenNestedInput
  }

  export type PersonalAccessTokensUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokensCreateManyInput = {
    id?: string
    userId: string
    token: string
    type: $Enums.TokenType
    expiry: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalAccessTokensUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokensUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    role: $Enums.AdminRole
    action: string
    resource: string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    role: $Enums.AdminRole
    action: string
    resource: string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PermissionCreateManyInput = {
    id?: string
    role: $Enums.AdminRole
    action: string
    resource: string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    condition?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SubscriptionPlanCreateInput = {
    id?: string
  }

  export type SubscriptionPlanUncheckedCreateInput = {
    id?: string
  }

  export type SubscriptionPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriptionPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriptionPlanCreateManyInput = {
    id?: string
  }

  export type SubscriptionPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriptionPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type KYCVerificationCreateInput = {
    facialVerificationImage?: string | null
    idCardType?: string | null
    idNumber?: string | null
    expiryDate?: Date | string | null
    facialVerificationStatus: $Enums.VerificationStatus
    idVerificationStatus: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutKycVerificationInput
  }

  export type KYCVerificationUncheckedCreateInput = {
    id?: string
    facialVerificationImage?: string | null
    idCardType?: string | null
    idNumber?: string | null
    expiryDate?: Date | string | null
    facialVerificationStatus: $Enums.VerificationStatus
    idVerificationStatus: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCVerificationUpdateInput = {
    facialVerificationImage?: NullableStringFieldUpdateOperationsInput | string | null
    idCardType?: NullableStringFieldUpdateOperationsInput | string | null
    idNumber?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutKycVerificationNestedInput
  }

  export type KYCVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    facialVerificationImage?: NullableStringFieldUpdateOperationsInput | string | null
    idCardType?: NullableStringFieldUpdateOperationsInput | string | null
    idNumber?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCVerificationCreateManyInput = {
    id?: string
    facialVerificationImage?: string | null
    idCardType?: string | null
    idNumber?: string | null
    expiryDate?: Date | string | null
    facialVerificationStatus: $Enums.VerificationStatus
    idVerificationStatus: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCVerificationUpdateManyMutationInput = {
    facialVerificationImage?: NullableStringFieldUpdateOperationsInput | string | null
    idCardType?: NullableStringFieldUpdateOperationsInput | string | null
    idNumber?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    facialVerificationImage?: NullableStringFieldUpdateOperationsInput | string | null
    idCardType?: NullableStringFieldUpdateOperationsInput | string | null
    idNumber?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeaturedCreateInput = {
    id?: string
    paymentId: string
    featurePlanId: string
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatededAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    user: UserCreateNestedOneWithoutFeaturedInput
  }

  export type FeaturedUncheckedCreateInput = {
    id?: string
    paymentId: string
    userId: string
    featurePlanId: string
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatededAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type FeaturedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutFeaturedNestedInput
  }

  export type FeaturedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeaturedCreateManyInput = {
    id?: string
    paymentId: string
    userId: string
    featurePlanId: string
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatededAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type FeaturedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeaturedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubscriptionCreateInput = {
    paymentId?: SubscriptionCreatepaymentIdInput | string[]
    subscriptionPlanId: string
    status: $Enums.SUBSCRIPTIONSTATUS
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    user?: UserCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    paymentId?: SubscriptionCreatepaymentIdInput | string[]
    subscriptionPlanId: string
    status: $Enums.SUBSCRIPTIONSTATUS
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type SubscriptionUpdateInput = {
    paymentId?: SubscriptionUpdatepaymentIdInput | string[]
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    status?: EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: SubscriptionUpdatepaymentIdInput | string[]
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    status?: EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    paymentId?: SubscriptionCreatepaymentIdInput | string[]
    subscriptionPlanId: string
    status: $Enums.SUBSCRIPTIONSTATUS
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type SubscriptionUpdateManyMutationInput = {
    paymentId?: SubscriptionUpdatepaymentIdInput | string[]
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    status?: EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: SubscriptionUpdatepaymentIdInput | string[]
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    status?: EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
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

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type ServiceProviderNullableScalarRelationFilter = {
    is?: ServiceProviderWhereInput | null
    isNot?: ServiceProviderWhereInput | null
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type StaffNullableScalarRelationFilter = {
    is?: StaffWhereInput | null
    isNot?: StaffWhereInput | null
  }

  export type PersonalAccessTokensListRelationFilter = {
    every?: PersonalAccessTokensWhereInput
    some?: PersonalAccessTokensWhereInput
    none?: PersonalAccessTokensWhereInput
  }

  export type KYCVerificationNullableScalarRelationFilter = {
    is?: KYCVerificationWhereInput | null
    isNot?: KYCVerificationWhereInput | null
  }

  export type FeaturedListRelationFilter = {
    every?: FeaturedWhereInput
    some?: FeaturedWhereInput
    none?: FeaturedWhereInput
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type PasswordHistoryListRelationFilter = {
    every?: PasswordHistoryWhereInput
    some?: PasswordHistoryWhereInput
    none?: PasswordHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PersonalAccessTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeaturedOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    isEmailVerified?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    refreshToken?: SortOrder
    lastLoginAt?: SortOrder
    loginAttempts?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    loginAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    isEmailVerified?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    refreshToken?: SortOrder
    lastLoginAt?: SortOrder
    loginAttempts?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    isEmailVerified?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    refreshToken?: SortOrder
    lastLoginAt?: SortOrder
    loginAttempts?: SortOrder
    streetAddress?: SortOrder
    streetAddress2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    loginAttempts?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
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

  export type EnumAdminRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAdminRoleNullableFilter<$PrismaModel> | $Enums.AdminRole | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAdminRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAdminRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
  }

  export type EnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StaffListRelationFilter = {
    every?: StaffWhereInput
    some?: StaffWhereInput
    none?: StaffWhereInput
  }

  export type StaffOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceProviderCountOrderByAggregateInput = {
    id?: SortOrder
    businessName?: SortOrder
    serviceType?: SortOrder
    businessLogo?: SortOrder
    pricingInfo?: SortOrder
    regulations?: SortOrder
    additionalInformation?: SortOrder
    workingHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    businessName?: SortOrder
    serviceType?: SortOrder
    businessLogo?: SortOrder
    pricingInfo?: SortOrder
    regulations?: SortOrder
    additionalInformation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceProviderMinOrderByAggregateInput = {
    id?: SortOrder
    businessName?: SortOrder
    serviceType?: SortOrder
    businessLogo?: SortOrder
    pricingInfo?: SortOrder
    regulations?: SortOrder
    additionalInformation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    historyOfServiceProviders?: SortOrder
    preferences?: SortOrder
    referralCode?: SortOrder
    profilePicture?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    referralCode?: SortOrder
    profilePicture?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    referralCode?: SortOrder
    profilePicture?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceProviderScalarRelationFilter = {
    is?: ServiceProviderWhereInput
    isNot?: ServiceProviderWhereInput
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    serviceProviderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceProviderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    serviceProviderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type PersonalAccessTokensUserIdTypeCompoundUniqueInput = {
    userId: string
    type: $Enums.TokenType
  }

  export type PersonalAccessTokensCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalAccessTokensMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalAccessTokensMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type EnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    condition?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    action?: SortOrder
    resource?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    action?: SortOrder
    resource?: SortOrder
  }

  export type EnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type SubscriptionPlanCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SubscriptionPlanMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SubscriptionPlanMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type KYCVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    facialVerificationImage?: SortOrder
    idCardType?: SortOrder
    idNumber?: SortOrder
    expiryDate?: SortOrder
    facialVerificationStatus?: SortOrder
    idVerificationStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KYCVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    facialVerificationImage?: SortOrder
    idCardType?: SortOrder
    idNumber?: SortOrder
    expiryDate?: SortOrder
    facialVerificationStatus?: SortOrder
    idVerificationStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KYCVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    facialVerificationImage?: SortOrder
    idCardType?: SortOrder
    idNumber?: SortOrder
    expiryDate?: SortOrder
    facialVerificationStatus?: SortOrder
    idVerificationStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type FeaturedCountOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    userId?: SortOrder
    featurePlanId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatededAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type FeaturedMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    userId?: SortOrder
    featurePlanId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatededAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type FeaturedMinOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    userId?: SortOrder
    featurePlanId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatededAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EnumSUBSCRIPTIONSTATUSFilter<$PrismaModel = never> = {
    equals?: $Enums.SUBSCRIPTIONSTATUS | EnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    in?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel> | $Enums.SUBSCRIPTIONSTATUS
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    subscriptionPlanId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriptionPlanId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    subscriptionPlanId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
  }

  export type EnumSUBSCRIPTIONSTATUSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SUBSCRIPTIONSTATUS | EnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    in?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumSUBSCRIPTIONSTATUSWithAggregatesFilter<$PrismaModel> | $Enums.SUBSCRIPTIONSTATUS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel>
    _max?: NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel>
  }

  export type AdminCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type ServiceProviderCreateNestedOneWithoutUserInput = {
    create?: XOR<ServiceProviderCreateWithoutUserInput, ServiceProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ServiceProviderCreateOrConnectWithoutUserInput
    connect?: ServiceProviderWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type StaffCreateNestedOneWithoutUserInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    connect?: StaffWhereUniqueInput
  }

  export type PersonalAccessTokensCreateNestedManyWithoutUserInput = {
    create?: XOR<PersonalAccessTokensCreateWithoutUserInput, PersonalAccessTokensUncheckedCreateWithoutUserInput> | PersonalAccessTokensCreateWithoutUserInput[] | PersonalAccessTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalAccessTokensCreateOrConnectWithoutUserInput | PersonalAccessTokensCreateOrConnectWithoutUserInput[]
    createMany?: PersonalAccessTokensCreateManyUserInputEnvelope
    connect?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
  }

  export type KYCVerificationCreateNestedOneWithoutUserInput = {
    create?: XOR<KYCVerificationCreateWithoutUserInput, KYCVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCVerificationCreateOrConnectWithoutUserInput
    connect?: KYCVerificationWhereUniqueInput
  }

  export type FeaturedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeaturedCreateWithoutUserInput, FeaturedUncheckedCreateWithoutUserInput> | FeaturedCreateWithoutUserInput[] | FeaturedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeaturedCreateOrConnectWithoutUserInput | FeaturedCreateOrConnectWithoutUserInput[]
    createMany?: FeaturedCreateManyUserInputEnvelope
    connect?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type PasswordHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
  }

  export type AdminUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type ServiceProviderUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ServiceProviderCreateWithoutUserInput, ServiceProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ServiceProviderCreateOrConnectWithoutUserInput
    connect?: ServiceProviderWhereUniqueInput
  }

  export type CustomerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type StaffUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    connect?: StaffWhereUniqueInput
  }

  export type PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PersonalAccessTokensCreateWithoutUserInput, PersonalAccessTokensUncheckedCreateWithoutUserInput> | PersonalAccessTokensCreateWithoutUserInput[] | PersonalAccessTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalAccessTokensCreateOrConnectWithoutUserInput | PersonalAccessTokensCreateOrConnectWithoutUserInput[]
    createMany?: PersonalAccessTokensCreateManyUserInputEnvelope
    connect?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
  }

  export type KYCVerificationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<KYCVerificationCreateWithoutUserInput, KYCVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCVerificationCreateOrConnectWithoutUserInput
    connect?: KYCVerificationWhereUniqueInput
  }

  export type FeaturedUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeaturedCreateWithoutUserInput, FeaturedUncheckedCreateWithoutUserInput> | FeaturedCreateWithoutUserInput[] | FeaturedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeaturedCreateOrConnectWithoutUserInput | FeaturedCreateOrConnectWithoutUserInput[]
    createMany?: FeaturedCreateManyUserInputEnvelope
    connect?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type PasswordHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AdminUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type ServiceProviderUpdateOneWithoutUserNestedInput = {
    create?: XOR<ServiceProviderCreateWithoutUserInput, ServiceProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ServiceProviderCreateOrConnectWithoutUserInput
    upsert?: ServiceProviderUpsertWithoutUserInput
    disconnect?: ServiceProviderWhereInput | boolean
    delete?: ServiceProviderWhereInput | boolean
    connect?: ServiceProviderWhereUniqueInput
    update?: XOR<XOR<ServiceProviderUpdateToOneWithWhereWithoutUserInput, ServiceProviderUpdateWithoutUserInput>, ServiceProviderUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type StaffUpdateOneWithoutUserNestedInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    upsert?: StaffUpsertWithoutUserInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutUserInput, StaffUpdateWithoutUserInput>, StaffUncheckedUpdateWithoutUserInput>
  }

  export type PersonalAccessTokensUpdateManyWithoutUserNestedInput = {
    create?: XOR<PersonalAccessTokensCreateWithoutUserInput, PersonalAccessTokensUncheckedCreateWithoutUserInput> | PersonalAccessTokensCreateWithoutUserInput[] | PersonalAccessTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalAccessTokensCreateOrConnectWithoutUserInput | PersonalAccessTokensCreateOrConnectWithoutUserInput[]
    upsert?: PersonalAccessTokensUpsertWithWhereUniqueWithoutUserInput | PersonalAccessTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PersonalAccessTokensCreateManyUserInputEnvelope
    set?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    disconnect?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    delete?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    connect?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    update?: PersonalAccessTokensUpdateWithWhereUniqueWithoutUserInput | PersonalAccessTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PersonalAccessTokensUpdateManyWithWhereWithoutUserInput | PersonalAccessTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PersonalAccessTokensScalarWhereInput | PersonalAccessTokensScalarWhereInput[]
  }

  export type KYCVerificationUpdateOneWithoutUserNestedInput = {
    create?: XOR<KYCVerificationCreateWithoutUserInput, KYCVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCVerificationCreateOrConnectWithoutUserInput
    upsert?: KYCVerificationUpsertWithoutUserInput
    disconnect?: KYCVerificationWhereInput | boolean
    delete?: KYCVerificationWhereInput | boolean
    connect?: KYCVerificationWhereUniqueInput
    update?: XOR<XOR<KYCVerificationUpdateToOneWithWhereWithoutUserInput, KYCVerificationUpdateWithoutUserInput>, KYCVerificationUncheckedUpdateWithoutUserInput>
  }

  export type FeaturedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeaturedCreateWithoutUserInput, FeaturedUncheckedCreateWithoutUserInput> | FeaturedCreateWithoutUserInput[] | FeaturedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeaturedCreateOrConnectWithoutUserInput | FeaturedCreateOrConnectWithoutUserInput[]
    upsert?: FeaturedUpsertWithWhereUniqueWithoutUserInput | FeaturedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeaturedCreateManyUserInputEnvelope
    set?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    disconnect?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    delete?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    connect?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    update?: FeaturedUpdateWithWhereUniqueWithoutUserInput | FeaturedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeaturedUpdateManyWithWhereWithoutUserInput | FeaturedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeaturedScalarWhereInput | FeaturedScalarWhereInput[]
  }

  export type SubscriptionUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type PasswordHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    upsert?: PasswordHistoryUpsertWithWhereUniqueWithoutUserInput | PasswordHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    set?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    disconnect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    delete?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    update?: PasswordHistoryUpdateWithWhereUniqueWithoutUserInput | PasswordHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordHistoryUpdateManyWithWhereWithoutUserInput | PasswordHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
  }

  export type AdminUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type ServiceProviderUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ServiceProviderCreateWithoutUserInput, ServiceProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ServiceProviderCreateOrConnectWithoutUserInput
    upsert?: ServiceProviderUpsertWithoutUserInput
    disconnect?: ServiceProviderWhereInput | boolean
    delete?: ServiceProviderWhereInput | boolean
    connect?: ServiceProviderWhereUniqueInput
    update?: XOR<XOR<ServiceProviderUpdateToOneWithWhereWithoutUserInput, ServiceProviderUpdateWithoutUserInput>, ServiceProviderUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type StaffUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    upsert?: StaffUpsertWithoutUserInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutUserInput, StaffUpdateWithoutUserInput>, StaffUncheckedUpdateWithoutUserInput>
  }

  export type PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PersonalAccessTokensCreateWithoutUserInput, PersonalAccessTokensUncheckedCreateWithoutUserInput> | PersonalAccessTokensCreateWithoutUserInput[] | PersonalAccessTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalAccessTokensCreateOrConnectWithoutUserInput | PersonalAccessTokensCreateOrConnectWithoutUserInput[]
    upsert?: PersonalAccessTokensUpsertWithWhereUniqueWithoutUserInput | PersonalAccessTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PersonalAccessTokensCreateManyUserInputEnvelope
    set?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    disconnect?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    delete?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    connect?: PersonalAccessTokensWhereUniqueInput | PersonalAccessTokensWhereUniqueInput[]
    update?: PersonalAccessTokensUpdateWithWhereUniqueWithoutUserInput | PersonalAccessTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PersonalAccessTokensUpdateManyWithWhereWithoutUserInput | PersonalAccessTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PersonalAccessTokensScalarWhereInput | PersonalAccessTokensScalarWhereInput[]
  }

  export type KYCVerificationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<KYCVerificationCreateWithoutUserInput, KYCVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCVerificationCreateOrConnectWithoutUserInput
    upsert?: KYCVerificationUpsertWithoutUserInput
    disconnect?: KYCVerificationWhereInput | boolean
    delete?: KYCVerificationWhereInput | boolean
    connect?: KYCVerificationWhereUniqueInput
    update?: XOR<XOR<KYCVerificationUpdateToOneWithWhereWithoutUserInput, KYCVerificationUpdateWithoutUserInput>, KYCVerificationUncheckedUpdateWithoutUserInput>
  }

  export type FeaturedUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeaturedCreateWithoutUserInput, FeaturedUncheckedCreateWithoutUserInput> | FeaturedCreateWithoutUserInput[] | FeaturedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeaturedCreateOrConnectWithoutUserInput | FeaturedCreateOrConnectWithoutUserInput[]
    upsert?: FeaturedUpsertWithWhereUniqueWithoutUserInput | FeaturedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeaturedCreateManyUserInputEnvelope
    set?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    disconnect?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    delete?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    connect?: FeaturedWhereUniqueInput | FeaturedWhereUniqueInput[]
    update?: FeaturedUpdateWithWhereUniqueWithoutUserInput | FeaturedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeaturedUpdateManyWithWhereWithoutUserInput | FeaturedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeaturedScalarWhereInput | FeaturedScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput> | PasswordHistoryCreateWithoutUserInput[] | PasswordHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordHistoryCreateOrConnectWithoutUserInput | PasswordHistoryCreateOrConnectWithoutUserInput[]
    upsert?: PasswordHistoryUpsertWithWhereUniqueWithoutUserInput | PasswordHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordHistoryCreateManyUserInputEnvelope
    set?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    disconnect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    delete?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    connect?: PasswordHistoryWhereUniqueInput | PasswordHistoryWhereUniqueInput[]
    update?: PasswordHistoryUpdateWithWhereUniqueWithoutUserInput | PasswordHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordHistoryUpdateManyWithWhereWithoutUserInput | PasswordHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdminInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumAdminRoleFieldUpdateOperationsInput = {
    set?: $Enums.AdminRole | null
  }

  export type UserUpdateOneRequiredWithoutAdminNestedInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    upsert?: UserUpsertWithoutAdminInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminInput, UserUpdateWithoutAdminInput>, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserCreateNestedOneWithoutServiceProviderInput = {
    create?: XOR<UserCreateWithoutServiceProviderInput, UserUncheckedCreateWithoutServiceProviderInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceProviderInput
    connect?: UserWhereUniqueInput
  }

  export type StaffCreateNestedManyWithoutServiceProviderInput = {
    create?: XOR<StaffCreateWithoutServiceProviderInput, StaffUncheckedCreateWithoutServiceProviderInput> | StaffCreateWithoutServiceProviderInput[] | StaffUncheckedCreateWithoutServiceProviderInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutServiceProviderInput | StaffCreateOrConnectWithoutServiceProviderInput[]
    createMany?: StaffCreateManyServiceProviderInputEnvelope
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
  }

  export type StaffUncheckedCreateNestedManyWithoutServiceProviderInput = {
    create?: XOR<StaffCreateWithoutServiceProviderInput, StaffUncheckedCreateWithoutServiceProviderInput> | StaffCreateWithoutServiceProviderInput[] | StaffUncheckedCreateWithoutServiceProviderInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutServiceProviderInput | StaffCreateOrConnectWithoutServiceProviderInput[]
    createMany?: StaffCreateManyServiceProviderInputEnvelope
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
  }

  export type EnumServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceType
  }

  export type UserUpdateOneRequiredWithoutServiceProviderNestedInput = {
    create?: XOR<UserCreateWithoutServiceProviderInput, UserUncheckedCreateWithoutServiceProviderInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceProviderInput
    upsert?: UserUpsertWithoutServiceProviderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServiceProviderInput, UserUpdateWithoutServiceProviderInput>, UserUncheckedUpdateWithoutServiceProviderInput>
  }

  export type StaffUpdateManyWithoutServiceProviderNestedInput = {
    create?: XOR<StaffCreateWithoutServiceProviderInput, StaffUncheckedCreateWithoutServiceProviderInput> | StaffCreateWithoutServiceProviderInput[] | StaffUncheckedCreateWithoutServiceProviderInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutServiceProviderInput | StaffCreateOrConnectWithoutServiceProviderInput[]
    upsert?: StaffUpsertWithWhereUniqueWithoutServiceProviderInput | StaffUpsertWithWhereUniqueWithoutServiceProviderInput[]
    createMany?: StaffCreateManyServiceProviderInputEnvelope
    set?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    disconnect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    delete?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    update?: StaffUpdateWithWhereUniqueWithoutServiceProviderInput | StaffUpdateWithWhereUniqueWithoutServiceProviderInput[]
    updateMany?: StaffUpdateManyWithWhereWithoutServiceProviderInput | StaffUpdateManyWithWhereWithoutServiceProviderInput[]
    deleteMany?: StaffScalarWhereInput | StaffScalarWhereInput[]
  }

  export type StaffUncheckedUpdateManyWithoutServiceProviderNestedInput = {
    create?: XOR<StaffCreateWithoutServiceProviderInput, StaffUncheckedCreateWithoutServiceProviderInput> | StaffCreateWithoutServiceProviderInput[] | StaffUncheckedCreateWithoutServiceProviderInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutServiceProviderInput | StaffCreateOrConnectWithoutServiceProviderInput[]
    upsert?: StaffUpsertWithWhereUniqueWithoutServiceProviderInput | StaffUpsertWithWhereUniqueWithoutServiceProviderInput[]
    createMany?: StaffCreateManyServiceProviderInputEnvelope
    set?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    disconnect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    delete?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    update?: StaffUpdateWithWhereUniqueWithoutServiceProviderInput | StaffUpdateWithWhereUniqueWithoutServiceProviderInput[]
    updateMany?: StaffUpdateManyWithWhereWithoutServiceProviderInput | StaffUpdateManyWithWhereWithoutServiceProviderInput[]
    deleteMany?: StaffScalarWhereInput | StaffScalarWhereInput[]
  }

  export type CustomerCreatehistoryOfServiceProvidersInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutCustomerInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerUpdatehistoryOfServiceProvidersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutCustomerNestedInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    upsert?: UserUpsertWithoutCustomerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomerInput, UserUpdateWithoutCustomerInput>, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserCreateNestedOneWithoutStaffInput = {
    create?: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
    connectOrCreate?: UserCreateOrConnectWithoutStaffInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceProviderCreateNestedOneWithoutStaffsInput = {
    create?: XOR<ServiceProviderCreateWithoutStaffsInput, ServiceProviderUncheckedCreateWithoutStaffsInput>
    connectOrCreate?: ServiceProviderCreateOrConnectWithoutStaffsInput
    connect?: ServiceProviderWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutStaffNestedInput = {
    create?: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
    connectOrCreate?: UserCreateOrConnectWithoutStaffInput
    upsert?: UserUpsertWithoutStaffInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStaffInput, UserUpdateWithoutStaffInput>, UserUncheckedUpdateWithoutStaffInput>
  }

  export type ServiceProviderUpdateOneRequiredWithoutStaffsNestedInput = {
    create?: XOR<ServiceProviderCreateWithoutStaffsInput, ServiceProviderUncheckedCreateWithoutStaffsInput>
    connectOrCreate?: ServiceProviderCreateOrConnectWithoutStaffsInput
    upsert?: ServiceProviderUpsertWithoutStaffsInput
    connect?: ServiceProviderWhereUniqueInput
    update?: XOR<XOR<ServiceProviderUpdateToOneWithWhereWithoutStaffsInput, ServiceProviderUpdateWithoutStaffsInput>, ServiceProviderUncheckedUpdateWithoutStaffsInput>
  }

  export type UserCreateNestedOneWithoutPasswordHistoryInput = {
    create?: XOR<UserCreateWithoutPasswordHistoryInput, UserUncheckedCreateWithoutPasswordHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordHistoryNestedInput = {
    create?: XOR<UserCreateWithoutPasswordHistoryInput, UserUncheckedCreateWithoutPasswordHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordHistoryInput
    upsert?: UserUpsertWithoutPasswordHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordHistoryInput, UserUpdateWithoutPasswordHistoryInput>, UserUncheckedUpdateWithoutPasswordHistoryInput>
  }

  export type UserCreateNestedOneWithoutPersonalAccessTokenInput = {
    create?: XOR<UserCreateWithoutPersonalAccessTokenInput, UserUncheckedCreateWithoutPersonalAccessTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPersonalAccessTokenInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type UserUpdateOneRequiredWithoutPersonalAccessTokenNestedInput = {
    create?: XOR<UserCreateWithoutPersonalAccessTokenInput, UserUncheckedCreateWithoutPersonalAccessTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPersonalAccessTokenInput
    upsert?: UserUpsertWithoutPersonalAccessTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPersonalAccessTokenInput, UserUpdateWithoutPersonalAccessTokenInput>, UserUncheckedUpdateWithoutPersonalAccessTokenInput>
  }

  export type EnumAdminRoleFieldUpdateOperationsInput = {
    set?: $Enums.AdminRole
  }

  export type UserCreateNestedOneWithoutKycVerificationInput = {
    create?: XOR<UserCreateWithoutKycVerificationInput, UserUncheckedCreateWithoutKycVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycVerificationInput
    connect?: UserWhereUniqueInput
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type UserUpdateOneRequiredWithoutKycVerificationNestedInput = {
    create?: XOR<UserCreateWithoutKycVerificationInput, UserUncheckedCreateWithoutKycVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycVerificationInput
    upsert?: UserUpsertWithoutKycVerificationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKycVerificationInput, UserUpdateWithoutKycVerificationInput>, UserUncheckedUpdateWithoutKycVerificationInput>
  }

  export type UserCreateNestedOneWithoutFeaturedInput = {
    create?: XOR<UserCreateWithoutFeaturedInput, UserUncheckedCreateWithoutFeaturedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeaturedInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeaturedNestedInput = {
    create?: XOR<UserCreateWithoutFeaturedInput, UserUncheckedCreateWithoutFeaturedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeaturedInput
    upsert?: UserUpsertWithoutFeaturedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeaturedInput, UserUpdateWithoutFeaturedInput>, UserUncheckedUpdateWithoutFeaturedInput>
  }

  export type SubscriptionCreatepaymentIdInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput
    connect?: UserWhereUniqueInput
  }

  export type SubscriptionUpdatepaymentIdInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput = {
    set?: $Enums.SUBSCRIPTIONSTATUS
  }

  export type UserUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput
    upsert?: UserUpsertWithoutSubscriptionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionInput, UserUpdateWithoutSubscriptionInput>, UserUncheckedUpdateWithoutSubscriptionInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
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

  export type NestedEnumAdminRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAdminRoleNullableFilter<$PrismaModel> | $Enums.AdminRole | null
  }

  export type NestedEnumAdminRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAdminRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
  }

  export type NestedEnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type NestedEnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel = never> = {
    equals?: $Enums.SUBSCRIPTIONSTATUS | EnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    in?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel> | $Enums.SUBSCRIPTIONSTATUS
  }

  export type NestedEnumSUBSCRIPTIONSTATUSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SUBSCRIPTIONSTATUS | EnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    in?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.SUBSCRIPTIONSTATUS[] | ListEnumSUBSCRIPTIONSTATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumSUBSCRIPTIONSTATUSWithAggregatesFilter<$PrismaModel> | $Enums.SUBSCRIPTIONSTATUS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel>
    _max?: NestedEnumSUBSCRIPTIONSTATUSFilter<$PrismaModel>
  }

  export type AdminCreateWithoutUserInput = {
    role?: $Enums.AdminRole | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    role?: $Enums.AdminRole | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type ServiceProviderCreateWithoutUserInput = {
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    staffs?: StaffCreateNestedManyWithoutServiceProviderInput
  }

  export type ServiceProviderUncheckedCreateWithoutUserInput = {
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    staffs?: StaffUncheckedCreateNestedManyWithoutServiceProviderInput
  }

  export type ServiceProviderCreateOrConnectWithoutUserInput = {
    where: ServiceProviderWhereUniqueInput
    create: XOR<ServiceProviderCreateWithoutUserInput, ServiceProviderUncheckedCreateWithoutUserInput>
  }

  export type CustomerCreateWithoutUserInput = {
    historyOfServiceProviders?: CustomerCreatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: string | null
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutUserInput = {
    historyOfServiceProviders?: CustomerCreatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: string | null
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutUserInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
  }

  export type StaffCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceProvider: ServiceProviderCreateNestedOneWithoutStaffsInput
  }

  export type StaffUncheckedCreateWithoutUserInput = {
    serviceProviderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffCreateOrConnectWithoutUserInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
  }

  export type PersonalAccessTokensCreateWithoutUserInput = {
    id?: string
    token: string
    type: $Enums.TokenType
    expiry: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalAccessTokensUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    type: $Enums.TokenType
    expiry: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalAccessTokensCreateOrConnectWithoutUserInput = {
    where: PersonalAccessTokensWhereUniqueInput
    create: XOR<PersonalAccessTokensCreateWithoutUserInput, PersonalAccessTokensUncheckedCreateWithoutUserInput>
  }

  export type PersonalAccessTokensCreateManyUserInputEnvelope = {
    data: PersonalAccessTokensCreateManyUserInput | PersonalAccessTokensCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type KYCVerificationCreateWithoutUserInput = {
    facialVerificationImage?: string | null
    idCardType?: string | null
    idNumber?: string | null
    expiryDate?: Date | string | null
    facialVerificationStatus: $Enums.VerificationStatus
    idVerificationStatus: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCVerificationUncheckedCreateWithoutUserInput = {
    facialVerificationImage?: string | null
    idCardType?: string | null
    idNumber?: string | null
    expiryDate?: Date | string | null
    facialVerificationStatus: $Enums.VerificationStatus
    idVerificationStatus: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCVerificationCreateOrConnectWithoutUserInput = {
    where: KYCVerificationWhereUniqueInput
    create: XOR<KYCVerificationCreateWithoutUserInput, KYCVerificationUncheckedCreateWithoutUserInput>
  }

  export type FeaturedCreateWithoutUserInput = {
    id?: string
    paymentId: string
    featurePlanId: string
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatededAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type FeaturedUncheckedCreateWithoutUserInput = {
    id?: string
    paymentId: string
    featurePlanId: string
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatededAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type FeaturedCreateOrConnectWithoutUserInput = {
    where: FeaturedWhereUniqueInput
    create: XOR<FeaturedCreateWithoutUserInput, FeaturedUncheckedCreateWithoutUserInput>
  }

  export type FeaturedCreateManyUserInputEnvelope = {
    data: FeaturedCreateManyUserInput | FeaturedCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutUserInput = {
    paymentId?: SubscriptionCreatepaymentIdInput | string[]
    subscriptionPlanId: string
    status: $Enums.SUBSCRIPTIONSTATUS
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type SubscriptionUncheckedCreateWithoutUserInput = {
    paymentId?: SubscriptionCreatepaymentIdInput | string[]
    subscriptionPlanId: string
    status: $Enums.SUBSCRIPTIONSTATUS
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type SubscriptionCreateOrConnectWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type PasswordHistoryCreateWithoutUserInput = {
    id?: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type PasswordHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type PasswordHistoryCreateOrConnectWithoutUserInput = {
    where: PasswordHistoryWhereUniqueInput
    create: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput>
  }

  export type PasswordHistoryCreateManyUserInputEnvelope = {
    data: PasswordHistoryCreateManyUserInput | PasswordHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AdminUpsertWithoutUserInput = {
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateWithoutUserInput = {
    role?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    role?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceProviderUpsertWithoutUserInput = {
    update: XOR<ServiceProviderUpdateWithoutUserInput, ServiceProviderUncheckedUpdateWithoutUserInput>
    create: XOR<ServiceProviderCreateWithoutUserInput, ServiceProviderUncheckedCreateWithoutUserInput>
    where?: ServiceProviderWhereInput
  }

  export type ServiceProviderUpdateToOneWithWhereWithoutUserInput = {
    where?: ServiceProviderWhereInput
    data: XOR<ServiceProviderUpdateWithoutUserInput, ServiceProviderUncheckedUpdateWithoutUserInput>
  }

  export type ServiceProviderUpdateWithoutUserInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffs?: StaffUpdateManyWithoutServiceProviderNestedInput
  }

  export type ServiceProviderUncheckedUpdateWithoutUserInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffs?: StaffUncheckedUpdateManyWithoutServiceProviderNestedInput
  }

  export type CustomerUpsertWithoutUserInput = {
    update: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUserInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateWithoutUserInput = {
    historyOfServiceProviders?: CustomerUpdatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutUserInput = {
    historyOfServiceProviders?: CustomerUpdatehistoryOfServiceProvidersInput | string[]
    preferences?: NullableJsonNullValueInput | InputJsonValue
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUpsertWithoutUserInput = {
    update: XOR<StaffUpdateWithoutUserInput, StaffUncheckedUpdateWithoutUserInput>
    create: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutUserInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutUserInput, StaffUncheckedUpdateWithoutUserInput>
  }

  export type StaffUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceProvider?: ServiceProviderUpdateOneRequiredWithoutStaffsNestedInput
  }

  export type StaffUncheckedUpdateWithoutUserInput = {
    serviceProviderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokensUpsertWithWhereUniqueWithoutUserInput = {
    where: PersonalAccessTokensWhereUniqueInput
    update: XOR<PersonalAccessTokensUpdateWithoutUserInput, PersonalAccessTokensUncheckedUpdateWithoutUserInput>
    create: XOR<PersonalAccessTokensCreateWithoutUserInput, PersonalAccessTokensUncheckedCreateWithoutUserInput>
  }

  export type PersonalAccessTokensUpdateWithWhereUniqueWithoutUserInput = {
    where: PersonalAccessTokensWhereUniqueInput
    data: XOR<PersonalAccessTokensUpdateWithoutUserInput, PersonalAccessTokensUncheckedUpdateWithoutUserInput>
  }

  export type PersonalAccessTokensUpdateManyWithWhereWithoutUserInput = {
    where: PersonalAccessTokensScalarWhereInput
    data: XOR<PersonalAccessTokensUpdateManyMutationInput, PersonalAccessTokensUncheckedUpdateManyWithoutUserInput>
  }

  export type PersonalAccessTokensScalarWhereInput = {
    AND?: PersonalAccessTokensScalarWhereInput | PersonalAccessTokensScalarWhereInput[]
    OR?: PersonalAccessTokensScalarWhereInput[]
    NOT?: PersonalAccessTokensScalarWhereInput | PersonalAccessTokensScalarWhereInput[]
    id?: StringFilter<"PersonalAccessTokens"> | string
    userId?: StringFilter<"PersonalAccessTokens"> | string
    token?: StringFilter<"PersonalAccessTokens"> | string
    type?: EnumTokenTypeFilter<"PersonalAccessTokens"> | $Enums.TokenType
    expiry?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    createdAt?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
    updatedAt?: DateTimeFilter<"PersonalAccessTokens"> | Date | string
  }

  export type KYCVerificationUpsertWithoutUserInput = {
    update: XOR<KYCVerificationUpdateWithoutUserInput, KYCVerificationUncheckedUpdateWithoutUserInput>
    create: XOR<KYCVerificationCreateWithoutUserInput, KYCVerificationUncheckedCreateWithoutUserInput>
    where?: KYCVerificationWhereInput
  }

  export type KYCVerificationUpdateToOneWithWhereWithoutUserInput = {
    where?: KYCVerificationWhereInput
    data: XOR<KYCVerificationUpdateWithoutUserInput, KYCVerificationUncheckedUpdateWithoutUserInput>
  }

  export type KYCVerificationUpdateWithoutUserInput = {
    facialVerificationImage?: NullableStringFieldUpdateOperationsInput | string | null
    idCardType?: NullableStringFieldUpdateOperationsInput | string | null
    idNumber?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCVerificationUncheckedUpdateWithoutUserInput = {
    facialVerificationImage?: NullableStringFieldUpdateOperationsInput | string | null
    idCardType?: NullableStringFieldUpdateOperationsInput | string | null
    idNumber?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facialVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    idVerificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeaturedUpsertWithWhereUniqueWithoutUserInput = {
    where: FeaturedWhereUniqueInput
    update: XOR<FeaturedUpdateWithoutUserInput, FeaturedUncheckedUpdateWithoutUserInput>
    create: XOR<FeaturedCreateWithoutUserInput, FeaturedUncheckedCreateWithoutUserInput>
  }

  export type FeaturedUpdateWithWhereUniqueWithoutUserInput = {
    where: FeaturedWhereUniqueInput
    data: XOR<FeaturedUpdateWithoutUserInput, FeaturedUncheckedUpdateWithoutUserInput>
  }

  export type FeaturedUpdateManyWithWhereWithoutUserInput = {
    where: FeaturedScalarWhereInput
    data: XOR<FeaturedUpdateManyMutationInput, FeaturedUncheckedUpdateManyWithoutUserInput>
  }

  export type FeaturedScalarWhereInput = {
    AND?: FeaturedScalarWhereInput | FeaturedScalarWhereInput[]
    OR?: FeaturedScalarWhereInput[]
    NOT?: FeaturedScalarWhereInput | FeaturedScalarWhereInput[]
    id?: StringFilter<"Featured"> | string
    paymentId?: StringFilter<"Featured"> | string
    userId?: StringFilter<"Featured"> | string
    featurePlanId?: StringFilter<"Featured"> | string
    startDate?: DateTimeFilter<"Featured"> | Date | string
    endDate?: DateTimeFilter<"Featured"> | Date | string
    createdAt?: DateTimeFilter<"Featured"> | Date | string
    updatededAt?: DateTimeFilter<"Featured"> | Date | string
    updatedBy?: StringNullableFilter<"Featured"> | string | null
    deletedAt?: DateTimeNullableFilter<"Featured"> | Date | string | null
    deletedBy?: StringNullableFilter<"Featured"> | string | null
  }

  export type SubscriptionUpsertWithoutUserInput = {
    update: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutUserInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionUpdateWithoutUserInput = {
    paymentId?: SubscriptionUpdatepaymentIdInput | string[]
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    status?: EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubscriptionUncheckedUpdateWithoutUserInput = {
    paymentId?: SubscriptionUpdatepaymentIdInput | string[]
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    status?: EnumSUBSCRIPTIONSTATUSFieldUpdateOperationsInput | $Enums.SUBSCRIPTIONSTATUS
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordHistoryWhereUniqueInput
    update: XOR<PasswordHistoryUpdateWithoutUserInput, PasswordHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordHistoryCreateWithoutUserInput, PasswordHistoryUncheckedCreateWithoutUserInput>
  }

  export type PasswordHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordHistoryWhereUniqueInput
    data: XOR<PasswordHistoryUpdateWithoutUserInput, PasswordHistoryUncheckedUpdateWithoutUserInput>
  }

  export type PasswordHistoryUpdateManyWithWhereWithoutUserInput = {
    where: PasswordHistoryScalarWhereInput
    data: XOR<PasswordHistoryUpdateManyMutationInput, PasswordHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordHistoryScalarWhereInput = {
    AND?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
    OR?: PasswordHistoryScalarWhereInput[]
    NOT?: PasswordHistoryScalarWhereInput | PasswordHistoryScalarWhereInput[]
    id?: StringFilter<"PasswordHistory"> | string
    user_id?: StringFilter<"PasswordHistory"> | string
    password?: StringFilter<"PasswordHistory"> | string
    createdAt?: DateTimeFilter<"PasswordHistory"> | Date | string
    updatedAt?: DateTimeNullableFilter<"PasswordHistory"> | Date | string | null
  }

  export type UserCreateWithoutAdminInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
  }

  export type UserUpsertWithoutAdminInput = {
    update: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutServiceProviderInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutServiceProviderInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutServiceProviderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServiceProviderInput, UserUncheckedCreateWithoutServiceProviderInput>
  }

  export type StaffCreateWithoutServiceProviderInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutServiceProviderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffCreateOrConnectWithoutServiceProviderInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutServiceProviderInput, StaffUncheckedCreateWithoutServiceProviderInput>
  }

  export type StaffCreateManyServiceProviderInputEnvelope = {
    data: StaffCreateManyServiceProviderInput | StaffCreateManyServiceProviderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutServiceProviderInput = {
    update: XOR<UserUpdateWithoutServiceProviderInput, UserUncheckedUpdateWithoutServiceProviderInput>
    create: XOR<UserCreateWithoutServiceProviderInput, UserUncheckedCreateWithoutServiceProviderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServiceProviderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServiceProviderInput, UserUncheckedUpdateWithoutServiceProviderInput>
  }

  export type UserUpdateWithoutServiceProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutServiceProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StaffUpsertWithWhereUniqueWithoutServiceProviderInput = {
    where: StaffWhereUniqueInput
    update: XOR<StaffUpdateWithoutServiceProviderInput, StaffUncheckedUpdateWithoutServiceProviderInput>
    create: XOR<StaffCreateWithoutServiceProviderInput, StaffUncheckedCreateWithoutServiceProviderInput>
  }

  export type StaffUpdateWithWhereUniqueWithoutServiceProviderInput = {
    where: StaffWhereUniqueInput
    data: XOR<StaffUpdateWithoutServiceProviderInput, StaffUncheckedUpdateWithoutServiceProviderInput>
  }

  export type StaffUpdateManyWithWhereWithoutServiceProviderInput = {
    where: StaffScalarWhereInput
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyWithoutServiceProviderInput>
  }

  export type StaffScalarWhereInput = {
    AND?: StaffScalarWhereInput | StaffScalarWhereInput[]
    OR?: StaffScalarWhereInput[]
    NOT?: StaffScalarWhereInput | StaffScalarWhereInput[]
    id?: StringFilter<"Staff"> | string
    serviceProviderId?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
  }

  export type UserCreateWithoutCustomerInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomerInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
  }

  export type UserUpsertWithoutCustomerInput = {
    update: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutStaffInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStaffInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStaffInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
  }

  export type ServiceProviderCreateWithoutStaffsInput = {
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutServiceProviderInput
  }

  export type ServiceProviderUncheckedCreateWithoutStaffsInput = {
    id?: string
    businessName: string
    serviceType: $Enums.ServiceType
    businessLogo?: string | null
    pricingInfo?: string | null
    regulations?: string | null
    additionalInformation?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceProviderCreateOrConnectWithoutStaffsInput = {
    where: ServiceProviderWhereUniqueInput
    create: XOR<ServiceProviderCreateWithoutStaffsInput, ServiceProviderUncheckedCreateWithoutStaffsInput>
  }

  export type UserUpsertWithoutStaffInput = {
    update: XOR<UserUpdateWithoutStaffInput, UserUncheckedUpdateWithoutStaffInput>
    create: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStaffInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStaffInput, UserUncheckedUpdateWithoutStaffInput>
  }

  export type UserUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ServiceProviderUpsertWithoutStaffsInput = {
    update: XOR<ServiceProviderUpdateWithoutStaffsInput, ServiceProviderUncheckedUpdateWithoutStaffsInput>
    create: XOR<ServiceProviderCreateWithoutStaffsInput, ServiceProviderUncheckedCreateWithoutStaffsInput>
    where?: ServiceProviderWhereInput
  }

  export type ServiceProviderUpdateToOneWithWhereWithoutStaffsInput = {
    where?: ServiceProviderWhereInput
    data: XOR<ServiceProviderUpdateWithoutStaffsInput, ServiceProviderUncheckedUpdateWithoutStaffsInput>
  }

  export type ServiceProviderUpdateWithoutStaffsInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceProviderNestedInput
  }

  export type ServiceProviderUncheckedUpdateWithoutStaffsInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    pricingInfo?: NullableStringFieldUpdateOperationsInput | string | null
    regulations?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPasswordHistoryInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordHistoryInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordHistoryInput, UserUncheckedCreateWithoutPasswordHistoryInput>
  }

  export type UserUpsertWithoutPasswordHistoryInput = {
    update: XOR<UserUpdateWithoutPasswordHistoryInput, UserUncheckedUpdateWithoutPasswordHistoryInput>
    create: XOR<UserCreateWithoutPasswordHistoryInput, UserUncheckedCreateWithoutPasswordHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordHistoryInput, UserUncheckedUpdateWithoutPasswordHistoryInput>
  }

  export type UserUpdateWithoutPasswordHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutPersonalAccessTokenInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPersonalAccessTokenInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPersonalAccessTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPersonalAccessTokenInput, UserUncheckedCreateWithoutPersonalAccessTokenInput>
  }

  export type UserUpsertWithoutPersonalAccessTokenInput = {
    update: XOR<UserUpdateWithoutPersonalAccessTokenInput, UserUncheckedUpdateWithoutPersonalAccessTokenInput>
    create: XOR<UserCreateWithoutPersonalAccessTokenInput, UserUncheckedCreateWithoutPersonalAccessTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPersonalAccessTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPersonalAccessTokenInput, UserUncheckedUpdateWithoutPersonalAccessTokenInput>
  }

  export type UserUpdateWithoutPersonalAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPersonalAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutKycVerificationInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutKycVerificationInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutKycVerificationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKycVerificationInput, UserUncheckedCreateWithoutKycVerificationInput>
  }

  export type UserUpsertWithoutKycVerificationInput = {
    update: XOR<UserUpdateWithoutKycVerificationInput, UserUncheckedUpdateWithoutKycVerificationInput>
    create: XOR<UserCreateWithoutKycVerificationInput, UserUncheckedCreateWithoutKycVerificationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKycVerificationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKycVerificationInput, UserUncheckedUpdateWithoutKycVerificationInput>
  }

  export type UserUpdateWithoutKycVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKycVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFeaturedInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFeaturedInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFeaturedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeaturedInput, UserUncheckedCreateWithoutFeaturedInput>
  }

  export type UserUpsertWithoutFeaturedInput = {
    update: XOR<UserUpdateWithoutFeaturedInput, UserUncheckedUpdateWithoutFeaturedInput>
    create: XOR<UserCreateWithoutFeaturedInput, UserUncheckedCreateWithoutFeaturedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeaturedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeaturedInput, UserUncheckedUpdateWithoutFeaturedInput>
  }

  export type UserUpdateWithoutFeaturedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeaturedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSubscriptionInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
    staff?: StaffCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationCreateNestedOneWithoutUserInput
    featured?: FeaturedCreateNestedManyWithoutUserInput
    passwordHistory?: PasswordHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email: string
    isEmailVerified?: boolean
    password: string
    userType: $Enums.UserType
    status: $Enums.UserStatus
    refreshToken?: string | null
    lastLoginAt?: Date | string | null
    loginAttempts?: number
    streetAddress?: string | null
    streetAddress2?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    deletedBy?: string | null
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    serviceProvider?: ServiceProviderUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    personalAccessToken?: PersonalAccessTokensUncheckedCreateNestedManyWithoutUserInput
    kycVerification?: KYCVerificationUncheckedCreateNestedOneWithoutUserInput
    featured?: FeaturedUncheckedCreateNestedManyWithoutUserInput
    passwordHistory?: PasswordHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscriptionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
  }

  export type UserUpsertWithoutSubscriptionInput = {
    update: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
    staff?: StaffUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUpdateOneWithoutUserNestedInput
    featured?: FeaturedUpdateManyWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    serviceProvider?: ServiceProviderUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    personalAccessToken?: PersonalAccessTokensUncheckedUpdateManyWithoutUserNestedInput
    kycVerification?: KYCVerificationUncheckedUpdateOneWithoutUserNestedInput
    featured?: FeaturedUncheckedUpdateManyWithoutUserNestedInput
    passwordHistory?: PasswordHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PersonalAccessTokensCreateManyUserInput = {
    id?: string
    token: string
    type: $Enums.TokenType
    expiry: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeaturedCreateManyUserInput = {
    id?: string
    paymentId: string
    featurePlanId: string
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatededAt?: Date | string
    updatedBy?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
  }

  export type PasswordHistoryCreateManyUserInput = {
    id?: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type PersonalAccessTokensUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokensUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalAccessTokensUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeaturedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeaturedUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeaturedUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    featurePlanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatededAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StaffCreateManyServiceProviderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateWithoutServiceProviderInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutServiceProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyWithoutServiceProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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