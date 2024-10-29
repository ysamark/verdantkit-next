import { Nullable, PathInternal } from "@verdantkit/utils";
import { I18NConfig } from "next/dist/server/config-shared";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export type LayoutProps<Params = DefaultNextApiParams> = {
  children: React.ReactNode;
  params: Params;
};

export type PageProps<Params = DefaultNextApiParams> = {
  params: Params;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export type DefaultNextApiParams = {
  [key: string]: string | Array<string>;
};

export type NextApiProps<Params = DefaultNextApiParams> = {
  params: Params;
};

export type NextApiResponse = NextResponse | Promise<NextResponse>;

type NextApiHandlerSuccessResponse = {
  success: true;
  error?: false;
  data: object | Array<any> | string;
};

type NextApiHandlerErrorResponse = {
  success?: false;
  error: true;
  data: undefined;
};

export type NextApiHandlerResponse =
  | NextApiHandlerSuccessResponse
  | NextApiHandlerErrorResponse;

interface ResponseInit extends globalThis.ResponseInit {
  nextConfig?: {
    basePath?: string;
    i18n?: I18NConfig;
    trailingSlash?: boolean;
  };
  url?: string;
}

type NextApiHandlerJsonUtil = (
  responseBody: NextApiHandlerResponse,
  responseInit?: ResponseInit
) => NextResponse;

export type NextApiHandlerUtils = {
  // format: NextApiHandlerFormatUtil;
  json: NextApiHandlerJsonUtil;
};

export type NextApiHandler<Params = DefaultNextApiParams> = (
  args: NextApiHandlerUtils & {
    request: NextRequest;
    response: typeof NextResponse;
    props: NextApiProps<Params>;
    body: Nullable<object>;
  },
  ...rest: Array<any>
) => NextApiResponse;

export type NextApiHandlerArg = NextApiHandler | NextApiHandler<any>;

export type ApiHandler<TNextApiHandler> =
  TNextApiHandler extends NextApiHandlerArg
    ? TNextApiHandler
    : NextApiHandler<TNextApiHandler>;

export type NextApiHandlerFactory<
  ApiMiddlewareMapObject extends object = Record<string, any>
> = <TNextApiHandler extends NextApiHandlerArg | object = NextApiHandler>(
  ...args:
    | [
        ...apiMiddlewares: Array<PathInternal<ApiMiddlewareMapObject>>,
        ApiHandler<TNextApiHandler>
      ]
    | [ApiHandler<TNextApiHandler>]
) => (request: NextRequest, props: NextApiProps) => NextApiResponse;

export type MiddlewareActionProps<
  Params extends DefaultNextApiParams = DefaultNextApiParams
> = {
  request: NextRequest;
  response: typeof NextResponse;
  props: NextApiProps<Params>;
};

export type MiddlewareAction<
  Params extends DefaultNextApiParams = DefaultNextApiParams
> = (
  props: MiddlewareActionProps<Params>,
  ...apiHandlerArgs: Array<any>
) => any;
