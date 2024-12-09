import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Customer = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
