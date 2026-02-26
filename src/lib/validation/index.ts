import { ResponseError } from "../exception/ResponseError";

type ValidationProps = {
  schema: any;
  request: any;
  callback?: (error: any) => void;
};

export const validation = (
  schema: any,
  request: any,
  callback?: (error: any) => void
) => {
  const result = schema.safeParse(request);
  if (!result.success) {
    if (callback && typeof callback == "function") {
      callback(result.error);
    }

    throw new ResponseError(400, result.error.message);
  } else {
    return result.data;
  }
};
