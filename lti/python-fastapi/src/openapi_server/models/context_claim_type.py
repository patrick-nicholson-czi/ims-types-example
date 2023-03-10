# coding: utf-8

from __future__ import annotations
from datetime import date, datetime  # noqa: F401

import re  # noqa: F401
from typing import Any, Dict, List, Optional  # noqa: F401

from pydantic import AnyUrl, BaseModel, EmailStr, Field, validator  # noqa: F401
from openapi_server.models.context_claim_type_type_inner import ContextClaimTypeTypeInner


class ContextClaimType(BaseModel):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.

    ContextClaimType - a model defined in OpenAPI

        id: The id of this ContextClaimType.
        label: The label of this ContextClaimType [Optional].
        title: The title of this ContextClaimType [Optional].
        type: The type of this ContextClaimType [Optional].
    """

    id: str = Field(alias="id")
    label: Optional[str] = Field(alias="label", default=None)
    title: Optional[str] = Field(alias="title", default=None)
    type: Optional[List[ContextClaimTypeTypeInner]] = Field(alias="type", default=None)

ContextClaimType.update_forward_refs()
