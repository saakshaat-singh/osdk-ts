/**
 * Represents the value of data in the following format. Note that these values can be nested, for example an array of structs.
 * | Type                      | JSON encoding                                         | Example                                                                       |
 * |---------------------------|-------------------------------------------------------|-------------------------------------------------------------------------------|
 * | Array                     | array                                                 | `["alpha", "bravo", "charlie"]`                                               |
 * | Attachment                | string                                                | `"ri.attachments.main.attachment.2f944bae-5851-4204-8615-920c969a9f2e"`       |
 * | Boolean                   | boolean                                               | `true`                                                                        |
 * | Byte                      | number                                                | `31`                                                                          |
 * | Date                      | ISO 8601 extended local date string                   | `"2021-05-01"`                                                                |
 * | Decimal                   | string                                                | `"2.718281828"`                                                               |
 * | Float                     | number                                                | `3.14159265`                                                                  |
 * | Double                    | number                                                | `3.14159265`                                                                  |
 * | Integer                   | number                                                | `238940`                                                                      |
 * | Long                      | string                                                | `"58319870951433"`                                                            |
 * | Null                      | null                                                  | `null`                                                                        |
 * | Object Set                | string                                                | `ri.object-set.main.versioned-object-set.h13274m8-23f5-431c-8aee-a4554157c57z`|
 * | Ontology Object Reference | JSON encoding of the object's primary key             | `10033123` or `"EMP1234"`                                                     |
 * | Set                       | array                                                 | `["alpha", "bravo", "charlie"]`                                               |
 * | Short                     | number                                                | `8739`                                                                        |
 * | String                    | string                                                | `"Call me Ishmael"`                                                           |
 * | Struct                    | JSON object                                           | `{"name": "John Doe", "age": 42}`                                             |
 * | Timestamp                 | ISO 8601 extended offset date-time string in UTC zone | `"2021-01-04T05:00:00Z"`                                                      |
 *
 */
export type DataValue = any;
