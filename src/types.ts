import { PathInternal } from "@verdantkit/utils";
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
  [key: string]: string;
};

export type NextApiProps<Params = DefaultNextApiParams> = {
  params: Params;
};

export type NextApiResponse = NextResponse | Promise<NextResponse>;

export type NextApiHandler<Params = DefaultNextApiParams> = (args: {
  request: NextRequest;
  response: typeof NextResponse;
  props: NextApiProps<Params>;
}) => NextApiResponse;

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

export type MiddlewareActionProps = {
  request: NextRequest;
  response: typeof NextResponse;
  props: any;
};

export type MiddlewareAction = (props: MiddlewareActionProps) => any;
