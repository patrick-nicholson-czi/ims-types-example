
# ContextClaimType

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Stable identifier that uniquely identifies the context from which the LTI message initiates. This MUST be locally unique to the &#39;deployment_id. | 
**label** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Short descriptive name for the context. |  [optional]
**title** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Full descriptive name for the context. |  [optional]
**type** | [**kotlin.collections.List&lt;ContextClaimTypeTypeInner&gt;**](ContextClaimTypeTypeInner.md) | An array of URI values for context types. The contained values come from either the associated enumerated vocabulary or a proprietary URI. |  [optional]



