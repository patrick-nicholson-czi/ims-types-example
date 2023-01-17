# coding: utf-8

from __future__ import annotations
from datetime import date, datetime  # noqa: F401

import re  # noqa: F401
from typing import Any, Dict, List, Optional  # noqa: F401

from pydantic import AnyUrl, BaseModel, EmailStr, Field, validator  # noqa: F401


class LaunchPresentationClaimType(BaseModel):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.

    LaunchPresentationClaimType - a model defined in OpenAPI

        document_target: The document_target of this LaunchPresentationClaimType [Optional].
        height: The height of this LaunchPresentationClaimType [Optional].
        width: The width of this LaunchPresentationClaimType [Optional].
        return_url: The return_url of this LaunchPresentationClaimType [Optional].
        locale: The locale of this LaunchPresentationClaimType [Optional].
    """

    document_target: Optional[str] = Field(alias="document_target", default=None)
    height: Optional[int] = Field(alias="height", default=None)
    width: Optional[int] = Field(alias="width", default=None)
    return_url: Optional[str] = Field(alias="return_url", default=None)
    locale: Optional[str] = Field(alias="locale", default=None)

LaunchPresentationClaimType.update_forward_refs()
