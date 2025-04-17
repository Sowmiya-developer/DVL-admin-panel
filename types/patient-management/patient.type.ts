export interface Patient {
  id: string
  uhid: string
  name: string
  sex: string
  age: number
  phoneNumber: string
  occupation?: string
  status: "Pending" | "Approved" | "Rejected"
}

export interface PatientImage {
  id: string
  title: string
  url: string
  type?: string
}

export interface FormData {
  createdBy: ReactNode
  id: string
  title: string
  visitDate?: string
  diagnosis?: string
  fitzpatrickSkinType?: string
  erythema?: string
  lifestyleHabits?: string
  bodyWeight?: string
  courseDisease?: string
  duration?: string
  skinSymptoms?: string
  lesionsCount?: string
  majorityOfLesions?: string
  evolutionOfLesion?: string
  comorbidities: string[]
  familyHistory?: string
  previousTreatment?: string
  affectedArea: string[]
  images: PatientImage[]
}

export interface PatientDetail {
  patientInfo: Patient
  forms: FormData[]
}
