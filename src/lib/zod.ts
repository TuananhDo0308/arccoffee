// src/utils/formSchemas.ts
import { z } from "zod";

export const step1Schema = z.object({
  FirstName: z.string().min(1, "First Name is required"),
  LastName: z.string().min(1, "Last Name is required"),
  Gender: z.string().min(1, "Gender is required"),
  Year: z.number().gte(1900, "Invalid year"),
  Month: z.number().gte(1).lte(12, "Invalid month"),
  Day: z.number().gte(1).lte(31, "Invalid day"),
});

export const step2Schema = z.object({
  Email: z.string().email("Invalid email address"),
  Password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const step3Schema = z.object({
  PhoneNumber: z.string().min(1, "Phone Number is required"),
  Street: z.string().min(1, "Street is required"),
  RegionId: z.string().min(1, "Region is required"),
  CityId: z.string().min(1, "City is required"),
  DistrictId: z.string().min(1, "District is required"),
});

