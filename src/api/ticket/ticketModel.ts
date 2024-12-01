import { z } from "zod";

export const TicketPurchaseSchema = z.object({
  function_id: z.number(),
  customer_id: z.number(),
  seat_id: z.number(),
});

export const TicketSchema = z.object({
  ticket_id: z.number(),
  function_id: z.number(),
  customer_id: z.number(),
  seat_id: z.number(),
  purchase_date: z.string().datetime(),
  total_price: z.number(),
});

export const CreateTicketSchema = z.object({
  body: TicketPurchaseSchema,
});

export const GetTicketSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const GetTicketsByCustomerSchema = z.object({
  params: z.object({
    customerId: z.string(),
  }),
});

export type TicketDTO = z.infer<typeof TicketSchema>;
export type CreateTicketDTO = z.infer<typeof CreateTicketSchema>["body"];
export type TicketPurchaseDTO = z.infer<typeof TicketPurchaseSchema>;
