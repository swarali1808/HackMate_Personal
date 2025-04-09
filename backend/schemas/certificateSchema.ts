import { z } from "zod";

export const CertificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  issuingOrganization: z.string().min(1, "Issuing organization is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  credentialUrl: z.string().url().optional(),
  description: z.string().optional(),
});