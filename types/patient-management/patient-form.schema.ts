import { z } from "zod"

// Base schema for common patient details
export const patientDetailsSchema = z.object({
  uhid: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  sex: z.string(),
  age: z.string().or(z.number()),
  phoneNumber: z.string(),
  occupation: z.string().optional(),
})

// Schema for a single form
export const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  visitDate: z.string().optional(),
  diagnosis: z.string().optional(),
  fitzpatrickSkinType: z.string().optional(),
  erythema: z.string().optional(),
  lifestyleHabits: z.string().optional(),
  bodyWeight: z.string().optional(),
  courseDisease: z.string().optional(),
  duration: z.string().optional(),
  skinSymptoms: z.string().optional(),
  lesionsCount: z.string().optional(),
  majorityOfLesions: z.string().optional(),
  evolutionOfLesion: z.string().optional(),
  comorbidities: z.array(z.string()).default([]),
  familyHistory: z.string().optional(),
  previousTreatment: z.string().optional(),
  affectedArea: z.array(z.string()).default([]),
  images: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
        type: z.string().optional(),
      }),
    )
    .default([]),
})

// Schema for the complete patient record
export const patientFormSchema = z.object({
  patientDetails: patientDetailsSchema,
  forms: z.array(formSchema),
  status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending"),
  rejectReason: z.string().optional(),
})

export type PatientDetails = z.infer<typeof patientDetailsSchema>
export type PatientForm = z.infer<typeof formSchema>
export type PatientFormValues = z.infer<typeof patientFormSchema>
