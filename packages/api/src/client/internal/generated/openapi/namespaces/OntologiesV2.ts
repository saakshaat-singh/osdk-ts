import type { ListOntologiesV2Response } from "../components/ListOntologiesV2Response";
import type { OntologyApiName } from "../components/OntologyApiName";
import type { OntologyV2 } from "../components/OntologyV2";
import type { PageSize } from "../components/PageSize";
import type { PageToken } from "../components/PageToken";
import type { ListActionTypesResponseV2 } from "../components/ListActionTypesResponseV2";
import type { ActionTypeApiName } from "../components/ActionTypeApiName";
import type { ActionTypeV2 } from "../components/ActionTypeV2";
import type { ListObjectTypesV2Response } from "../components/ListObjectTypesV2Response";
import type { ObjectTypeApiName } from "../components/ObjectTypeApiName";
import type { ObjectTypeV2 } from "../components/ObjectTypeV2";
import type { ListOutgoingLinkTypesResponseV2 } from "../components/ListOutgoingLinkTypesResponseV2";
import type { LinkTypeApiName } from "../components/LinkTypeApiName";
import type { LinkTypeSideV2 } from "../components/LinkTypeSideV2";
import type { SelectedPropertyApiName } from "../components/SelectedPropertyApiName";
import type { OrderBy } from "../components/OrderBy";
import type { ListObjectsResponseV2 } from "../components/ListObjectsResponseV2";
import type { PropertyValueEscapedString } from "../components/PropertyValueEscapedString";
import type { OntologyObjectV2 } from "../components/OntologyObjectV2";
import type { CountObjectsResponseV2 } from "../components/CountObjectsResponseV2";
import type { SearchObjectsRequestV2 } from "../components/SearchObjectsRequestV2";
import type { SearchObjectsResponseV2 } from "../components/SearchObjectsResponseV2";
import type { AggregateObjectsRequestV2 } from "../components/AggregateObjectsRequestV2";
import type { AggregateObjectsResponseV2 } from "../components/AggregateObjectsResponseV2";
import type { ListLinkedObjectsResponseV2 } from "../components/ListLinkedObjectsResponseV2";
import type { PropertyApiName } from "../components/PropertyApiName";
import type { AttachmentMetadataResponse } from "../components/AttachmentMetadataResponse";
import type { AttachmentRid } from "../components/AttachmentRid";
import type { AttachmentV2 } from "../components/AttachmentV2";
import type { TimeSeriesPoint } from "../components/TimeSeriesPoint";
import type { StreamTimeSeriesPointsRequest } from "../components/StreamTimeSeriesPointsRequest";
import type { ApplyActionRequestV2 } from "../components/ApplyActionRequestV2";
import type { SyncApplyActionResponseV2 } from "../components/SyncApplyActionResponseV2";
import type { AsyncApplyActionRequestV2 } from "../components/AsyncApplyActionRequestV2";
import type { AsyncApplyActionResponseV2 } from "../components/AsyncApplyActionResponseV2";
import type { PreviewMode } from "../components/PreviewMode";
import type { ListQueryTypesResponseV2 } from "../components/ListQueryTypesResponseV2";
import type { QueryApiName } from "../components/QueryApiName";
import type { QueryTypeV2 } from "../components/QueryTypeV2";
import type { ExecuteQueryRequest } from "../components/ExecuteQueryRequest";
import type { ExecuteQueryResponse } from "../components/ExecuteQueryResponse";
import type { ObjectSetRid } from "../components/ObjectSetRid";
import type { ObjectSet } from "../components/ObjectSet";
import type { LoadObjectSetRequestV2 } from "../components/LoadObjectSetRequestV2";
import type { LoadObjectSetResponseV2 } from "../components/LoadObjectSetResponseV2";
import type { AggregateObjectSetRequestV2 } from "../components/AggregateObjectSetRequestV2";
import type { AggregateObjectSetResponseV2 } from "../components/AggregateObjectSetResponseV2";
import type { ListDeploymentsResponse } from "../components/ListDeploymentsResponse";
import type { DeploymentApiName } from "../components/DeploymentApiName";
import type { DeploymentMetadata } from "../components/DeploymentMetadata";
import type { TransformDataRequest } from "../components/TransformDataRequest";
import type { TransformDataResponse } from "../components/TransformDataResponse";
import { OpenApiRequest } from "../request";

/**
 * Lists the Ontologies visible to the current user.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function listOntologiesV2<TResponse>(_request: OpenApiRequest<ListOntologiesV2Response, TResponse>): Promise<TResponse> {
    return _request(
        "listOntologiesV2",
        "GET",
        "/v2/ontologies",
        __undefined,
        __undefined,
        __undefined,
        __undefined,
        __undefined,
        "application/json",
    );
}

/**
 * Gets a specific ontology with the given Ontology RID.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getOntologyV2<TResponse>(_request: OpenApiRequest<OntologyV2, TResponse>, ontology: OntologyApiName): Promise<TResponse> {
    return _request(
        "getOntologyV2",
        "GET",
        "/v2/ontologies/{ontology}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Lists the action types for the given Ontology.
 *
 * Each page may be smaller than the requested page size. However, it is guaranteed that if there are more
 * results available, at least one result will be present in the response.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function listActionTypesV2<TResponse>(_request: OpenApiRequest<ListActionTypesResponseV2, TResponse>, ontology: OntologyApiName, pageSize?: PageSize, pageToken?: PageToken): Promise<TResponse> {
    return _request(
        "listActionTypesV2",
        "GET",
        "/v2/ontologies/{ontology}/actionTypes",
        __undefined,
        __undefined,
        {
            pageSize,
            pageToken,
        },
        {
            ontology,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Gets a specific action type with the given API name.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getActionTypeV2<TResponse>(_request: OpenApiRequest<ActionTypeV2, TResponse>, ontology: OntologyApiName, actionType: ActionTypeApiName): Promise<TResponse> {
    return _request(
        "getActionTypeV2",
        "GET",
        "/v2/ontologies/{ontology}/actionTypes/{actionType}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            actionType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Lists the object types for the given Ontology.
 *
 * Each page may be smaller or larger than the requested page size. However, it is guaranteed that if there are
 * more results available, at least one result will be present in the
 * response.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function listObjectTypesV2<TResponse>(_request: OpenApiRequest<ListObjectTypesV2Response, TResponse>, ontology: OntologyApiName, pageSize?: PageSize, pageToken?: PageToken): Promise<TResponse> {
    return _request(
        "listObjectTypesV2",
        "GET",
        "/v2/ontologies/{ontology}/objectTypes",
        __undefined,
        __undefined,
        {
            pageSize,
            pageToken,
        },
        {
            ontology,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Gets a specific object type with the given API name.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getObjectTypeV2<TResponse>(_request: OpenApiRequest<ObjectTypeV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName): Promise<TResponse> {
    return _request(
        "getObjectTypeV2",
        "GET",
        "/v2/ontologies/{ontology}/objectTypes/{objectType}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * List the outgoing links for an object type.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function listOutgoingLinkTypesV2<TResponse>(_request: OpenApiRequest<ListOutgoingLinkTypesResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, pageSize?: PageSize, pageToken?: PageToken): Promise<TResponse> {
    return _request(
        "listOutgoingLinkTypesV2",
        "GET",
        "/v2/ontologies/{ontology}/objectTypes/{objectType}/outgoingLinkTypes",
        __undefined,
        __undefined,
        {
            pageSize,
            pageToken,
        },
        {
            ontology,
            objectType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Get an outgoing link for an object type.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getOutgoingLinkTypeV2<TResponse>(_request: OpenApiRequest<LinkTypeSideV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, linkType: LinkTypeApiName): Promise<TResponse> {
    return _request(
        "getOutgoingLinkTypeV2",
        "GET",
        "/v2/ontologies/{ontology}/objectTypes/{objectType}/outgoingLinkTypes/{linkType}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            linkType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Lists the objects for the given Ontology and object type.
 *
 * Note that this endpoint does not guarantee consistency. Changes to the data could result in missing or
 * repeated objects in the response pages.
 *
 * This endpoint returns a maximum of 10,000 objects. After 10,000 objects have been returned and if more objects
 * are available, attempting to load another page will result in an `ObjectsExceededLimit` error being returned.
 *
 * Each page may be smaller or larger than the requested page size. However, it
 * is guaranteed that if there are more results available, at least one result will be present
 * in the response, up to 10,000 results.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function listObjectsV2<TResponse>(_request: OpenApiRequest<ListObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, pageSize?: PageSize, pageToken?: PageToken, select?: Array<SelectedPropertyApiName>, orderBy?: OrderBy): Promise<TResponse> {
    return _request(
        "listObjectsV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}",
        __undefined,
        __undefined,
        {
            pageSize,
            pageToken,
            select,
            orderBy,
        },
        {
            ontology,
            objectType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Gets a specific object with the given primary key.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getObjectV2<TResponse>(_request: OpenApiRequest<OntologyObjectV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, select?: Array<SelectedPropertyApiName>): Promise<TResponse> {
    return _request(
        "getObjectV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}",
        __undefined,
        __undefined,
        {
            select,
        },
        {
            ontology,
            objectType,
            primaryKey,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Returns a count of the objects of the given object type.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function countObjects<TResponse>(_request: OpenApiRequest<CountObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName): Promise<TResponse> {
    return _request(
        "countObjects",
        "POST",
        "/v2/ontologies/{ontology}/objects/{objectType}/count",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Search for objects in the specified ontology and object type. The request body is used
 * to filter objects based on the specified query. The supported queries are:
 *
 * | Query type                              | Description                                                                                                       | Supported Types                 |
 * |-----------------------------------------|-------------------------------------------------------------------------------------------------------------------|---------------------------------|
 * | lt                                      | The provided property is less than the provided value.                                                            | number, string, date, timestamp |
 * | gt                                      | The provided property is greater than the provided value.                                                         | number, string, date, timestamp |
 * | lte                                     | The provided property is less than or equal to the provided value.                                                | number, string, date, timestamp |
 * | gte                                     | The provided property is greater than or equal to the provided value.                                             | number, string, date, timestamp |
 * | eq                                      | The provided property is exactly equal to the provided value.                                                     | number, string, date, timestamp |
 * | isNull                                  | The provided property is (or is not) null.                                                                        | all                             |
 * | contains                                | The provided property contains the provided value.                                                                | array                           |
 * | not                                     | The sub-query does not match.                                                                                     | N/A (applied on a query)        |
 * | and                                     | All the sub-queries match.                                                                                        | N/A (applied on queries)        |
 * | or                                      | At least one of the sub-queries match.                                                                            | N/A (applied on queries)        |
 * | startsWith                              | The provided property starts with the provided value.                                                             | string                          |
 * | containsAllTermsInOrderPrefixLastTerm   | The provided property contains all the terms provided in order. The last term can be a partial prefix match.      | string                          |
 * | containsAllTermsInOrder                 | The provided property contains the provided value as a substring.                                                 | string                          |
 * | containsAnyTerm                         | The provided property contains at least one of the terms separated by whitespace.                                 | string                          |
 * | containsAllTerms                        | The provided property contains all the terms separated by whitespace.                                             | string                          |                                                                   
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function searchObjectsV2<TResponse>(_request: OpenApiRequest<SearchObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, request: SearchObjectsRequestV2): Promise<TResponse> {
    return _request(
        "searchObjectsV2",
        "POST",
        "/v2/ontologies/{ontology}/objects/{objectType}/search",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
        },
        "application/json",
        "application/json",
    );
}

/** Temporary endpoint for search. */
export function deprecatedSearchObjectsV2<TResponse>(_request: OpenApiRequest<SearchObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, request: SearchObjectsRequestV2): Promise<TResponse> {
    return _request(
        "deprecatedSearchObjectsV2",
        "POST",
        "/v2/ontologies/{ontology}/objects/{objectType}/_search",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Perform functions on object fields in the specified ontology and object type.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function aggregateObjectsV2<TResponse>(_request: OpenApiRequest<AggregateObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, request: AggregateObjectsRequestV2): Promise<TResponse> {
    return _request(
        "aggregateObjectsV2",
        "POST",
        "/v2/ontologies/{ontology}/objects/{objectType}/aggregate",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Temporary endpoint for aggregations
 *
 */
export function deprecatedAggregateObjectsV2<TResponse>(_request: OpenApiRequest<AggregateObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, request: AggregateObjectsRequestV2): Promise<TResponse> {
    return _request(
        "deprecatedAggregateObjectsV2",
        "POST",
        "/v2/ontologies/{ontology}/objects/{objectType}/_aggregate",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Lists the linked objects for a specific object and the given link type.
 *
 * Note that this endpoint does not guarantee consistency. Changes to the data could result in missing or
 * repeated objects in the response pages.
 *
 * This endpoint returns a maximum of 10,000 objects. After 10,000 objects have been returned and if more objects
 * are available, attempting to load another page will result in an `ObjectsExceededLimit` error being returned.
 *
 * Each page may be smaller or larger than the requested page size. However, it
 * is guaranteed that if there are more results available, at least one result will be present
 * in the response, up to 10,000 results.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function listLinkedObjectsV2<TResponse>(_request: OpenApiRequest<ListLinkedObjectsResponseV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, linkType: LinkTypeApiName, pageSize?: PageSize, pageToken?: PageToken, select?: Array<SelectedPropertyApiName>, orderBy?: OrderBy): Promise<TResponse> {
    return _request(
        "listLinkedObjectsV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/links/{linkType}",
        __undefined,
        __undefined,
        {
            pageSize,
            pageToken,
            select,
            orderBy,
        },
        {
            ontology,
            objectType,
            primaryKey,
            linkType,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Get a specific linked object that originates from another object.
 *
 * If there is no link between the two objects, `LinkedObjectNotFound` is thrown.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getLinkedObjectV2<TResponse>(_request: OpenApiRequest<OntologyObjectV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, linkType: LinkTypeApiName, linkedObjectPrimaryKey: PropertyValueEscapedString, select?: Array<SelectedPropertyApiName>): Promise<TResponse> {
    return _request(
        "getLinkedObjectV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/links/{linkType}/{linkedObjectPrimaryKey}",
        __undefined,
        __undefined,
        {
            select,
        },
        {
            ontology,
            objectType,
            primaryKey,
            linkType,
            linkedObjectPrimaryKey,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Get the metadata of attachments parented to the given object.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getAttachmentsV2<TResponse>(_request: OpenApiRequest<AttachmentMetadataResponse, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName): Promise<TResponse> {
    return _request(
        "getAttachmentsV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/attachments/{property}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Get the metadata of a particular attachment in an attachment list.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getAttachmentByRidV2<TResponse>(_request: OpenApiRequest<AttachmentV2, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName, attachmentRid: AttachmentRid): Promise<TResponse> {
    return _request(
        "getAttachmentByRidV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/attachments/{property}/{attachmentRid}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
            attachmentRid,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Get the content of an attachment.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getAttachmentContentV2<TResponse>(_request: OpenApiRequest<ReadableStream<Uint8Array> | Blob, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName): Promise<TResponse> {
    return _request(
        "getAttachmentContentV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/attachments/{property}/content",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
        },
        __undefined,
        AnyMediaType,
    );
}

/**
 * Get the content of an attachment by its RID.
 *
 * The RID must exist in the attachment array of the property.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getAttachmentContentByRidV2<TResponse>(_request: OpenApiRequest<ReadableStream<Uint8Array> | Blob, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName, attachmentRid: AttachmentRid): Promise<TResponse> {
    return _request(
        "getAttachmentContentByRidV2",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/attachments/{property}/{attachmentRid}/content",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
            attachmentRid,
        },
        __undefined,
        AnyMediaType,
    );
}

/**
 * Get the first point of a time series property.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getFirstPoint<TResponse>(_request: OpenApiRequest<TimeSeriesPoint, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName): Promise<TResponse> {
    return _request(
        "getFirstPoint",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/timeseries/{property}/firstPoint",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Get the last point of a time series property.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function getLastPoint<TResponse>(_request: OpenApiRequest<TimeSeriesPoint, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName): Promise<TResponse> {
    return _request(
        "getLastPoint",
        "GET",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/timeseries/{property}/lastPoint",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Stream all of the points of a time series property.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data`.
 *
 */
export function streamPoints<TResponse>(_request: OpenApiRequest<ReadableStream<Uint8Array> | Blob, TResponse>, ontology: OntologyApiName, objectType: ObjectTypeApiName, primaryKey: PropertyValueEscapedString, property: PropertyApiName, request: StreamTimeSeriesPointsRequest): Promise<TResponse> {
    return _request(
        "streamPoints",
        "POST",
        "/v2/ontologies/{ontology}/objects/{objectType}/{primaryKey}/timeseries/{property}/streamPoints",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            objectType,
            primaryKey,
            property,
        },
        "application/json",
        AnyMediaType,
    );
}

/**
 * Applies an action using the given parameters. 
 *
 * Changes to the Ontology are eventually consistent and may take some time to be visible.
 *
 * Note that [parameter default values](/docs/foundry/action-types/parameters-default-value/) are not currently supported by
 * this endpoint.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data api:write-data`.
 *
 */
export function applyActionV2<TResponse>(_request: OpenApiRequest<SyncApplyActionResponseV2, TResponse>, ontology: OntologyApiName, action: ActionTypeApiName, request: ApplyActionRequestV2): Promise<TResponse> {
    return _request(
        "applyActionV2",
        "POST",
        "/v2/ontologies/{ontology}/actions/{action}/apply",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            action,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Applies an action using the given parameters. 
 *
 * Changes to the Ontology are eventually consistent and may take some time to be visible.
 *
 * Note that [parameter default values](/docs/foundry/action-types/parameters-default-value/) are not currently supported by
 * this endpoint.
 *
 * Third-party applications using this endpoint via OAuth2 must request the
 * following operation scopes: `api:read-data api:write-data`.
 *
 */
export function applyActionAsyncV2<TResponse>(_request: OpenApiRequest<AsyncApplyActionResponseV2, TResponse>, ontology: OntologyApiName, action: ActionTypeApiName, request: AsyncApplyActionRequestV2): Promise<TResponse> {
    return _request(
        "applyActionAsyncV2",
        "POST",
        "/v2/ontologies/{ontology}/actions/{action}/applyAsync",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            action,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Lists the query types for the given Ontology.        
 *
 * Each page may be smaller than the requested page size. However, it is guaranteed that if there are more
 * results available, at least one result will be present in the response.        
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function listQueryTypesV2<TResponse>(_request: OpenApiRequest<ListQueryTypesResponseV2, TResponse>, ontology: OntologyApiName, pageSize?: PageSize, pageToken?: PageToken, preview?: PreviewMode): Promise<TResponse> {
    return _request(
        "listQueryTypesV2",
        "GET",
        "/v2/ontologies/{ontology}/queryTypes",
        __undefined,
        __undefined,
        {
            pageSize,
            pageToken,
            preview,
        },
        {
            ontology,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Gets a specific query type with the given API name.
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getQueryTypeV2<TResponse>(_request: OpenApiRequest<QueryTypeV2, TResponse>, ontology: OntologyApiName, queryApiName: QueryApiName, preview?: PreviewMode): Promise<TResponse> {
    return _request(
        "getQueryTypeV2",
        "GET",
        "/v2/ontologies/{ontology}/queryTypes/{queryApiName}",
        __undefined,
        __undefined,
        {
            preview,
        },
        {
            ontology,
            queryApiName,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Executes a Query using the given parameters.
 *
 * Optional parameters do not need to be supplied.
 *
 * Third-party applications using this endpoint via OAuth2 must request the 
 * following operation scopes: `api:read-data`.
 *
 */
export function executeQueryV2<TResponse>(_request: OpenApiRequest<ExecuteQueryResponse, TResponse>, ontology: OntologyApiName, queryApiName: QueryApiName, request: ExecuteQueryRequest, preview?: PreviewMode): Promise<TResponse> {
    return _request(
        "executeQueryV2",
        "POST",
        "/v2/ontologies/{ontology}/queries/{queryApiName}/execute",
        request,
        __undefined,
        {
            preview,
        },
        {
            ontology,
            queryApiName,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Gets the definition of the `ObjectSet` with the given RID.        
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function getObjectSetV2<TResponse>(_request: OpenApiRequest<ObjectSet, TResponse>, ontology: OntologyApiName, objectSetRid: ObjectSetRid): Promise<TResponse> {
    return _request(
        "getObjectSetV2",
        "GET",
        "/v2/ontologies/{ontology}/objectSets/{objectSetRid}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            objectSetRid,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Load the ontology objects present in the `ObjectSet` from the provided object set definition.        
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function loadObjectSetV2<TResponse>(_request: OpenApiRequest<LoadObjectSetResponseV2, TResponse>, ontology: OntologyApiName, request: LoadObjectSetRequestV2): Promise<TResponse> {
    return _request(
        "loadObjectSetV2",
        "POST",
        "/v2/ontologies/{ontology}/objectSets/loadObjects",
        request,
        __undefined,
        __undefined,
        {
            ontology,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Aggregates the ontology objects present in the `ObjectSet` from the provided object set definition.        
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function aggregateObjectSetV2<TResponse>(_request: OpenApiRequest<AggregateObjectSetResponseV2, TResponse>, ontology: OntologyApiName, request: AggregateObjectSetRequestV2): Promise<TResponse> {
    return _request(
        "aggregateObjectSetV2",
        "POST",
        "/v2/ontologies/{ontology}/objectSets/aggregate",
        request,
        __undefined,
        __undefined,
        {
            ontology,
        },
        "application/json",
        "application/json",
    );
}

/**
 * Fetches a list of the available model deployments within a given Ontology.
 *
 */
export function listDeployments<TResponse>(_request: OpenApiRequest<ListDeploymentsResponse, TResponse>, ontology: OntologyApiName): Promise<TResponse> {
    return _request(
        "listDeployments",
        "GET",
        "/v2/ontologies/{ontology}/models/deployments",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Fetches information about a model deployment within a given Ontology.
 *
 */
export function getDeployment<TResponse>(_request: OpenApiRequest<DeploymentMetadata, TResponse>, ontology: OntologyApiName, deployment: DeploymentApiName): Promise<TResponse> {
    return _request(
        "getDeployment",
        "GET",
        "/v2/ontologies/{ontology}/models/deployments/{deployment}",
        __undefined,
        __undefined,
        __undefined,
        {
            ontology,
            deployment,
        },
        __undefined,
        "application/json",
    );
}

/**
 * Use a given model deployment to transform the provided data.
 *
 * Third-party applications using this endpoint via OAuth2 must request the following operation scope: `api:read-data`.
 *
 */
export function transformDeployment<TResponse>(_request: OpenApiRequest<TransformDataResponse, TResponse>, ontology: OntologyApiName, deployment: DeploymentApiName, request: TransformDataRequest): Promise<TResponse> {
    return _request(
        "transformDeployment",
        "POST",
        "/v2/ontologies/{ontology}/models/deployments/{deployment}/transform",
        request,
        __undefined,
        __undefined,
        {
            ontology,
            deployment,
        },
        "application/json",
        "application/json",
    );
}

const AnyMediaType: string = "*/*";
/** Constant reference to `undefined` that we expect to get minified and therefore reduce total code size */
const __undefined: undefined = undefined;
