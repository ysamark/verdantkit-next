import { NextResponse } from "next/server";

import { ApiHandler, NextApiHandlerArg, NextApiHandlerFactory } from "~/types";

import { getRequestBody } from "./getRequestBody";
import { handleMiddleware } from "./handleMiddleware";

export const nextApiHandlerFactory = <ApiMiddlewareMapObject extends object>(
  apiMiddlewaresMapObject: ApiMiddlewareMapObject
): NextApiHandlerFactory<ApiMiddlewareMapObject> => {
  const handler: NextApiHandlerFactory<ApiMiddlewareMapObject> =
    (...args) =>
    async (request, props) => {
      const response = NextResponse;
      const apiMiddlewares = args
        .slice(0, -1)
        .map((apiMiddleware) => String(apiMiddleware));
      const apiHandler = args[
        -1 + args.length
      ] as ApiHandler<NextApiHandlerArg>;
      const body = await getRequestBody(request);
      const apiHandlerArgs: Array<any> = [];

      for (const apiMiddleware of apiMiddlewares) {
        const middlewareHandlerResponse = await handleMiddleware(
          apiMiddlewaresMapObject,
          apiMiddleware as keyof ApiMiddlewareMapObject,
          {
            request,
            response,
            props,
            body,
            json(responseBody, responseInit) {
              return NextResponse.json(responseBody, responseInit);
            },
          }
        );

        if (
          typeof middlewareHandlerResponse === "object" &&
          middlewareHandlerResponse instanceof response
        ) {
          return middlewareHandlerResponse;
        }

        if (middlewareHandlerResponse instanceof Array) {
          apiHandlerArgs.push(...middlewareHandlerResponse);
        }
      }

      try {
        return await apiHandler(
          {
            request,
            props,
            response,
            body,
            json(responseBody, responseInit) {
              return NextResponse.json(responseBody, responseInit);
            },
          },
          ...apiHandlerArgs
        );
      } catch (err) {
        return response.json(
          {
            error: true,
            success: false,
            message: "Sorry, something went wrong processing request data.",
            type: "route:error",
            route: request.nextUrl.pathname,
          },
          {
            status: 500,
          }
        );
      }
    };

  return handler;
};
