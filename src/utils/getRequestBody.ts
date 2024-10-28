import { formDataToJson, Nullable } from "@verdantkit/utils";
import { NextRequest } from "next/server";

export const getRequestBody = async <
  RequestDataProps extends object = Record<string, any>
>(
  request: NextRequest
): Promise<Nullable<RequestDataProps>> => {
  try {
    const jsonData = await request.json();

    return jsonData as RequestDataProps;
  } catch (err) {}

  try {
    const formData = await request.formData();

    const requestBody = formDataToJson<RequestDataProps>(formData);

    return requestBody;
  } catch (err) {
    return null;
  }
};
