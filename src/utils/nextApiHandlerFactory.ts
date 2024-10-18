import { ApiHandler, NextApiHandlerArg, NextApiHandlerFactory } from "~/types";

import { NextResponse } from "next/server";
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

      for (const apiMiddleware of apiMiddlewares) {
        const middlewareHandlerResponse = await handleMiddleware(
          apiMiddlewaresMapObject,
          apiMiddleware as keyof ApiMiddlewareMapObject,
          {
            request,
            response,
            props,
          }
        );

        if (
          typeof middlewareHandlerResponse === "object" &&
          middlewareHandlerResponse instanceof response
        ) {
          return middlewareHandlerResponse;
        }
      }

      try {
        return await apiHandler({ request, props, response });
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
