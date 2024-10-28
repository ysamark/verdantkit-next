import { getObjectProp, Nullable } from "@verdantkit/utils";
import { NextRequest, NextResponse } from "next/server";

import { MiddlewareAction, NextApiHandlerUtils, NextApiProps } from "~/types";
// import { ApiMiddleware, apiMiddlewares } from "~/middlewares/api";
// import { MiddlewareAction } from "~/Types/api";

type MiddlewareHandlerProps = NextApiHandlerUtils & {
  request: NextRequest;
  response: typeof NextResponse;
  props: NextApiProps;
  body: Nullable<object>;
};

type DefaultApiMiddlewareMapObject = {
  [key: string]: any;
};

export const handleMiddleware = async <
  ApiMiddlewareMapObject extends DefaultApiMiddlewareMapObject
>(
  middlewareMapObject: ApiMiddlewareMapObject,
  middlewareRef: keyof ApiMiddlewareMapObject,
  middlewareHandlerProps: MiddlewareHandlerProps
) => {
  const apiMiddleware = getObjectProp<MiddlewareAction>(
    middlewareRef as never,
    middlewareMapObject
  );

  if (apiMiddleware) {
    try {
      return await apiMiddleware(middlewareHandlerProps);
    } catch (err) {
      console.log(`Error: Running api middleware ${String(middlewareRef)}`);

      return NextResponse.json(
        {
          error: true,
          success: false,
          message: "Sorry, something went wrong",
          type: "middleware:error",
          middleware: middlewareRef,
        },
        {
          status: 500,
        }
      );
    }
  }
};
