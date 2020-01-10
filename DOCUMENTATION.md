# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

- [Query](#query)
- [Mutation](#mutation)
- [Objects](#objects)
  - [Auth](#auth)
  - [Author](#author)
  - [Import](#import)
  - [ImportFile](#importfile)
  - [ImportLog](#importlog)
  - [Info](#info)
  - [User](#user)
- [Enums](#enums)
  - [CacheControlScope](#cachecontrolscope)
  - [ImportStatus](#importstatus)
- [Scalars](#scalars)
  - [Boolean](#boolean)
  - [Date](#date)
  - [ID](#id)
  - [Int](#int)
  - [String](#string)
  - [Upload](#upload)

</details>

## Query

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>listImports</strong></td>
<td valign="top">[<a href="#import">Import</a>]!</td>
<td>

List the top n-most recents imports performed into sync server. I you don't inform top parameter, It'll bring all imports.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">top</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>info</strong></td>
<td valign="top"><a href="#info">Info</a>!</td>
<td>

Retrieve the API information

</td>
</tr>
</tbody>
</table>

## Mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>login</strong></td>
<td valign="top"><a href="#auth">Auth</a>!</td>
<td>

Log-in to sync server.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">username</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>import</strong></td>
<td valign="top"><a href="#import">Import</a>!</td>
<td>

Runs a import into sync server.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">pdfUrl</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeImport</strong></td>
<td valign="top"><a href="#import">Import</a>!</td>
<td>

Removes imported data from sync server.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Auth

Auth data type. Used to return auth data at authentication methods.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

It indicates the authentication operation was successfuly or not

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Authentication operation message. If the authentication fails, this message will be set.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>token</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The authorization token. If the authentication was succeed, this token will be set.

</td>
</tr>
</tbody>
</table>

### Author

Author data type

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>firstName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Import

Import data type.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

Import ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startDate</strong></td>
<td valign="top"><a href="#date">Date</a>!</td>
<td>

Date and time that the import started.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>finishDate</strong></td>
<td valign="top"><a href="#date">Date</a></td>
<td>

Date and time that the import finished.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#importstatus">ImportStatus</a>!</td>
<td>

Import status. The domain values are: RUNNING, FAIL, SUCCESS

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>author</strong></td>
<td valign="top"><a href="#author">Author</a>!</td>
<td>

Import author

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>file</strong></td>
<td valign="top"><a href="#importfile">ImportFile</a>!</td>
<td>

The imported file.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>logs</strong></td>
<td valign="top">[<a href="#importlog">ImportLog</a>]!</td>
<td>

Logs list.

</td>
</tr>
</tbody>
</table>

### ImportFile

File data

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

File name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hash</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

File hash digest.

</td>
</tr>
</tbody>
</table>

### ImportLog

Import log data type.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#date">Date</a>!</td>
<td>

Log entry date time

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Log message

</td>
</tr>
</tbody>
</table>

### Info

API info data type

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>version</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>author</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>license</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>homepage</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### User

User data type

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

User name that can be used to login into sync server.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

User email. It can be used to login into sync server.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fullname</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

User full name.

</td>
</tr>
</tbody>
</table>

## Enums

### CacheControlScope

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>PUBLIC</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>PRIVATE</strong></td>
<td></td>
</tr>
</tbody>
</table>

### ImportStatus

Import status enum

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>RUNNING</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>SUCCESS</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>FAIL</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Date

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### Upload

The `Upload` scalar type represents a file upload.
