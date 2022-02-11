declare module 'noyb' {
  /**
   * Returns type of a given object.
   * @param obj       Object to inspect for type.
   * @returns         Type of the given object.
   */
  export function getType(obj: any): string;

  /**
   * Queries an object for a specific value.
   * @param query     Query string.
   * @param obj       Object to query.
   * @param value     New value to replace the property with. Omit this
   *                  parameter if you just want to read the property.
   * @returns         The object, part of it or a value in the object.
   */
  export function queryObject(query: string, obj: object, value?: any): any;

  /**
   * Updates an object by merging a fragment object into it.
   * @param objA      Object to update.
   * @param objB      Fragment object.
   * @returns         The updated object.
   */
  export function mergeObjects<T>(objA: T, objB: Partial<T>): T;

  /**
   * Deep-copies an object or an array.
   * @param obj       Object or Array to copy.
   * @returns         Copied Object or Array.
   */
  export function deepCopy<T>(obj: T): T;

  /**
   * Deeply compares two objects and returns a boolean that specifies
   * whether the two objects are equal.
   * @param objA      First object.
   * @param objB      Second object.
   * @returns         Result is true if the two objects are equal
   */
  export function deepCompare<T, U>(objA: T, objB: U): boolean;

  /**
   * Fills an object with default values.
   * @param obj       Object to be filled.
   * @param defaults  Default values object.
   * @returns         Filled object.
   */
  export function applyDefaults<T>(obj: Partial<T>, defaults: T): T;
}
