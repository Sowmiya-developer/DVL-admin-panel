"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import Header from "@/app/admin/components/Header"
import type { FormData, PatientImage } from "@/types/patient-management/patient.type"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ViewPatientListPage() {
  const searchParams = useSearchParams()
  const patientId = searchParams.get("id") || ""

  // State for image viewer
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [currentImage, setCurrentImage] = useState<PatientImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)

  // State for visit selection - will be set to the latest visit in useEffect
  const [selectedVisit, setSelectedVisit] = useState<string>("")
  const [, setSelectedFormType] = useState<string>("form-1")

  // Define image URLs
  const imageUrls = [
    "https://sjc.microlink.io/WGtqB9256PRica8fmSd1WBItFTTqkf3VYX5_cicAzC6LmdjvopQAtEoErklvZ3mXyQyAY3vOpo2JrSCOyIioOA.jpeg",
    "https://img.freepik.com/premium-photo/close-up-detail-dry-skin-medical-problem_178355-256.jpg",
    "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/dry%20skin%20-%20Freedom_Studio%20_thumb.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Human_skin_structure.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZq0kOSMo8HEmnZa9CvUvXviiiz_o-fvbY7x6JTvYcy_0CykrNHUB5hEHVyXF-ne3dhvs&usqp=CAU",
  ]

  // Mock patient data - changes based on patient ID
  const [patient] = useState(() => {
    // Default patient data
    const defaultPatient = {
      patientInfo: {
        id: "1",
        uhid: patientId,
        name: "Salman",
        sex: "Male",
        age: 22,
        phoneNumber: "9876556567",
        occupation: "Engineer",
        status: "Approved",
      },
      visits: [{ id: "visit-1", date: "12 OCT 2023" }],
      forms: [
        {
          id: "form1",
          title: "Form 1 - AI - Dermatology",
          visitId: "visit-1",
          createdBy: "Dr. Wilson",
          diagnosis: "Psoriasis",
          fitzpatrickSkinType: "Type-II",
          erythema: "Absent",
          lifestyleHabits: "Regular exercise",
          bodyWeight: "Overweight",
          courseDisease: "Chronic",
          duration: "6 months",
          skinSymptoms: "scaling",
          lesionsCount: "Multiple",
          majorityOfLesions: "Plaques",
          evolutionOfLesion: "Stable",
          affectedArea: ["Elbows", "Knees", "Scalp"],
          comorbidities: ["Diabetes"],
          familyHistory: "Yes",
          previousTreatment: "Topical steroids",
          images: [
            {
              id: "img1",
              title: "Close up image of plaques",
              url: imageUrls[0],
              type: "closeup",
            },
            {
              id: "img2",
              title: "Distanced image of affected areas",
              url: imageUrls[1],
              type: "distanced",
            },
            {
              id: "img3",
              title: "Dermoscopic image of lesions",
              url: imageUrls[2],
              type: "dermoscopic",
            },
            {
              id: "img4",
              title: "Reports of the patient",
              url: imageUrls[3],
              type: "reports",
            },
            {
              id: "img5",
              title: "Consent section",
              url: imageUrls[4],
              type: "consent",
            },
          ],
        },
      ],
    }

    // Patient with ID 1 (Salman - first visit)
    if (patientId === "1") {
      return {
        patientInfo: {
          id: "1",
          uhid: patientId,
          name: "Salman",
          sex: "Male",
          age: 22,
          phoneNumber: "9876556567",
          occupation: "Engineer",
          status: "Approved",
        },
        visits: [
          { id: "visit-3", date: "10 DEC 2023" },
          { id: "visit-2", date: "25 NOV 2023" },
          { id: "visit-1", date: "12 OCT 2023" },
        ],
        forms: [
          {
            id: "form1",
            title: "Form 1 - AI - Dermatology",
            visitId: "visit-3",
            createdBy: "Dr. Adams",
            diagnosis: "Psoriasis",
            fitzpatrickSkinType: "Type-II",
            erythema: "Absent",
            lifestyleHabits: "Regular exercise",
            bodyWeight: "Overweight",
            courseDisease: "Chronic",
            duration: "6 months",
            skinSymptoms: "scaling",
            lesionsCount: "Multiple",
            majorityOfLesions: "Plaques",
            evolutionOfLesion: "Stable",
            affectedArea: ["Elbows", "Knees", "Scalp"],
            comorbidities: ["Diabetes"],
            familyHistory: "Yes",
            previousTreatment: "Topical steroids",
            images: [
              {
                id: "img1",
                title: "Close up image of plaques",
                url: imageUrls[0],
                type: "closeup",
              },
              {
                id: "img2",
                title: "Distanced image of affected areas",
                url: imageUrls[1],
                type: "distanced",
              },
              {
                id: "img3",
                title: "Dermoscopic image of lesions",
                url: imageUrls[2],
                type: "dermoscopic",
              },
              {
                id: "img4",
                title: "Reports of the patient",
                url: imageUrls[3],
                type: "reports",
              },
              {
                id: "img5",
                title: "Consent section",
                url: imageUrls[4],
                type: "consent",
              },
            ],
          },
          {
            id: "form2",
            title: "Form 2 - Leprosy",
            visitId: "visit-3",
            createdBy: "Dr. Smith",
            diagnosis: "Leprosy",
            fitzpatrickSkinType: "Type-III",
            erythema: "Moderate",
            lifestyleHabits: "Stress",
            bodyWeight: "Normal",
            courseDisease: "Recurrent",
            duration: "2 years",
            skinSymptoms: "itching",
            lesionsCount: "Diffuse",
            majorityOfLesions: "Patches",
            evolutionOfLesion: "Waxing and waning",
            affectedArea: ["Flexural areas", "Neck"],
            comorbidities: ["Asthma", "Allergies"],
            familyHistory: "Yes",
            previousTreatment: "Emollients, topical steroids",
            images: [
              {
                id: "img2",
                title: "Close up of patches",
                url: imageUrls[1],
                type: "closeup",
              },
            ],
          },
          {
            id: "form3",
            title: "Form 1 - AI - Dermatology",
            visitId: "visit-2",
            createdBy: "Dr. Johnson",
            diagnosis: "Contact Dermatitis",
            fitzpatrickSkinType: "Type-II",
            erythema: "Severe",
            lifestyleHabits: "Exposure to irritants",
            bodyWeight: "Normal",
            courseDisease: "Acute",
            duration: "2 weeks",
            skinSymptoms: "burning, itching",
            lesionsCount: "Localized",
            majorityOfLesions: "Vesicles",
            evolutionOfLesion: "Rapidly spreading",
            affectedArea: ["Hands", "Forearms"],
            comorbidities: ["None"],
            familyHistory: "No",
            previousTreatment: "Antihistamines",
            images: [
              {
                id: "img3",
                title: "Contact dermatitis on hands",
                url: imageUrls[2],
                type: "closeup",
              },
            ],
          },
          {
            id: "form4",
            title: "Form 3 - STD",
            visitId: "visit-1",
            createdBy: "Dr. Wilson",
            diagnosis: "Seborrheic dermatitis",
            fitzpatrickSkinType: "Type-II",
            erythema: "Mild",
            lifestyleHabits: "Stress",
            bodyWeight: "Normal",
            courseDisease: "Chronic",
            duration: "3 months",
            skinSymptoms: "scaling, itching",
            lesionsCount: "Diffuse",
            majorityOfLesions: "Scaly patches",
            evolutionOfLesion: "Fluctuating",
            affectedArea: ["Scalp", "Eyebrows", "Nasolabial folds"],
            comorbidities: ["None"],
            familyHistory: "No",
            previousTreatment: "Ketoconazole shampoo",
            images: [
              {
                id: "img4",
                title: "Seborrheic dermatitis on scalp",
                url: imageUrls[3],
                type: "closeup",
              },
            ],
          },
        ],
      }
    }

    // Patient with ID 2 (Jennifer - second visit)
    else if (patientId === "2") {
      return {
        patientInfo: {
          id: "2",
          uhid: patientId,
          name: "Jennifer",
          sex: "Female",
          age: 28,
          phoneNumber: "9876543210",
          occupation: "Designer",
          status: "Approved",
        },
        visits: [
          { id: "visit-2", date: "15 NOV 2023" },
          { id: "visit-1", date: "20 AUG 2023" },
        ],
        forms: [
          {
            id: "form1",
            title: "Form 1 - AI - Dermatology",
            visitId: "visit-2",
            createdBy: "Dr. Smith",
            diagnosis: "Rosacea",
            fitzpatrickSkinType: "Type-II",
            erythema: "Severe",
            lifestyleHabits: "Spicy food consumption",
            bodyWeight: "Normal",
            courseDisease: "Chronic with flares",
            duration: "1 year",
            skinSymptoms: "flushing, papules",
            lesionsCount: "Numerous",
            majorityOfLesions: "Papules and pustules",
            evolutionOfLesion: "Worsening with triggers",
            affectedArea: ["Cheeks", "Nose", "Chin"],
            comorbidities: ["None"],
            familyHistory: "Yes",
            previousTreatment: "Topical metronidazole",
            images: [
              {
                id: "img5",
                title: "Facial rosacea",
                url: imageUrls[4],
                type: "closeup",
              },
            ],
          },
          {
            id: "form2",
            title: "Form 2 - Leprosy",
            visitId: "visit-1",
            createdBy: "Dr. Johnson",
            diagnosis: "Eczema",
            fitzpatrickSkinType: "Type-III",
            erythema: "Moderate",
            lifestyleHabits: "Stress",
            bodyWeight: "Normal",
            courseDisease: "Recurrent",
            duration: "2 years",
            skinSymptoms: "itching",
            lesionsCount: "Diffuse",
            majorityOfLesions: "Patches",
            evolutionOfLesion: "Waxing and waning",
            affectedArea: ["Flexural areas", "Neck"],
            comorbidities: ["Asthma", "Allergies"],
            familyHistory: "Yes",
            previousTreatment: "Emollients, topical steroids",
            images: [
              {
                id: "img3",
                title: "Close up of eczematous patches",
                url: imageUrls[2],
                type: "closeup",
              },
            ],
          },
        ],
      }
    }

    // Default to the first patient if ID doesn't match
    return defaultPatient
  })

  // Add state for selected form
  const [selectedFormId, setSelectedFormId] = useState<string>("")

  // Set the latest visit as active when component loads
  useEffect(() => {
    if (patient.visits.length > 0) {
      // Set the latest visit (first in the array) as the active one
      setSelectedVisit(patient.visits[0].id)
    }
  }, [patient.visits])

  // Update useEffect to set the first form of the selected visit as active
  useEffect(() => {
    const formsForVisit = patient.forms.filter((form) => form.visitId === selectedVisit)
    if (formsForVisit.length > 0) {
      setSelectedFormId(formsForVisit[0].id)
      setSelectedFormType(formsForVisit[0].title.toLowerCase().replace(/\s+/g, "-").substring(0, 6))
    }
  }, [selectedVisit, patient.forms])

  // Filter forms by selected visit
  const formsForSelectedVisit = patient.forms.filter((form) => form.visitId === selectedVisit)

  // Get all images from filtered forms
  const allImages = formsForSelectedVisit.flatMap((form) => form.images)

  // Function to open image viewer
  const openImageViewer = (image: PatientImage, formImages: PatientImage[]) => {
    setCurrentImage(image)
    setCurrentImageIndex(formImages.indexOf(image))
    setZoomLevel(1)
    setRotation(0)
    setShowImageViewer(true)
  }

  // Functions for image navigation
  const nextImage = (formImages: PatientImage[]) => {
    const newIndex = (currentImageIndex + 1) % formImages.length
    setCurrentImageIndex(newIndex)
    setCurrentImage(formImages[newIndex])
    setZoomLevel(1)
    setRotation(0)
  }

  const prevImage = (formImages: PatientImage[]) => {
    const newIndex = (currentImageIndex - 1 + formImages.length) % formImages.length
    setCurrentImageIndex(newIndex)
    setCurrentImage(formImages[newIndex])
    setZoomLevel(1)
    setRotation(0)
  }

  // Render form content
  const renderFormContent = (form: FormData) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm text-gray-500">Diagnosis</label>
          <p className="font-medium">{form.diagnosis}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Fitzpatrick skin Type</label>
          <p className="font-medium">{form.fitzpatrickSkinType}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Erythema</label>
          <p className="font-medium">{form.erythema}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Lifestyle Habits</label>
          <p className="font-medium">{form.lifestyleHabits}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Body weight</label>
          <p className="font-medium">{form.bodyWeight}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Course Disease</label>
          <p className="font-medium">{form.courseDisease}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Duration</label>
          <p className="font-medium">{form.duration}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Skin Symptoms</label>
          <p className="font-medium">{form.skinSymptoms}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">No. of lesions</label>
          <p className="font-medium">{form.lesionsCount}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Majority of lesions</label>
          <p className="font-medium">{form.majorityOfLesions}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Evolution of lesion</label>
          <p className="font-medium">{form.evolutionOfLesion}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Affected Area</label>
          <p className="font-medium">{form.affectedArea.join(", ")}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Family history</label>
          <p className="font-medium">{form.familyHistory}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">History of previous treatment</label>
          <p className="font-medium">{form.previousTreatment}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Comorbidities</label>
          <p className="font-medium">{form.comorbidities.join(", ")}</p>
        </div>
      </div>

      {/* Images section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {form.images.map((image) => (
          <Card
            key={image.id}
            className="cursor-pointer hover:border-primary overflow-hidden py-2"
            onClick={() => openImageViewer(image, form.images)}
          >
            <CardContent className="px-2">
              <div className="flex items-center gap-2">
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <div className="px-3">
                <p className="text-sm font-medium">{image.title}</p>
                <Button variant="link" className="p-0 h-auto text-xs text-blue-500 justify-start">
                  View image
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Using Header component */}
        <Header icon={true}>
          {patient.patientInfo.name} ({patient.patientInfo.uhid})
          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            {patient.patientInfo.status}
          </span>
        </Header>

        <div className="px-4 h-[calc(100vh-13rem)] overflow-auto">
          {/* Patient Details */}
          <Accordion type="multiple" defaultValue={["patient-details", "form-details" ]}>
            <AccordionItem value="patient-details">
              <AccordionTrigger className="text-lg font-semibold">Patient Details</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">UHID</label>
                    <Input value={patient.patientInfo.uhid} disabled className="bg-gray-50 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <Input value={patient.patientInfo.name} disabled className="bg-gray-50 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone Number</label>
                    <Input value={patient.patientInfo.phoneNumber} disabled className="bg-gray-50 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Age</label>
                    <Input value={patient.patientInfo.age.toString()} disabled className="bg-gray-50 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Sex</label>
                    <Input value={patient.patientInfo.sex} disabled className="bg-gray-50 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Occupation</label>
                    <Input value={patient.patientInfo.occupation || ""} disabled className="bg-gray-50 mt-1" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          {/* Form Details */}
            <AccordionItem value="form-details">
              <AccordionTrigger className="text-lg font-semibold">Form Details</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {/* Visit dropdown */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Select value={selectedVisit} onValueChange={setSelectedVisit}>
                        <SelectTrigger className="w-[180px] text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {patient.visits.map((visit) => (
                            <SelectItem key={visit.id} value={visit.id}>
                              Visit-{visit.id.split("-")[1]} {visit.date}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Form tabs - Only show the active form for the selected visit */}
                    <div className="flex items-center">
                      <p className="text-sm font-medium">
                        {formsForSelectedVisit.length > 0 && formsForSelectedVisit[0].title}
                      </p>
                    </div>
                  </div>

                  {/* AI Data section */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2 border-b ">
                    <h3 className="font-medium mb-4">AI Data</h3>
              <h3>Created by - {patient.patientInfo.name}</h3>
                    </div>

                    {/* Show the selected form */}
                    {formsForSelectedVisit.length > 0 && selectedFormId && (
                      <Card className="border-none shadow-none">
                        <CardContent className="p-0">
                          {renderFormContent(
                            formsForSelectedVisit.find((form) => form.id === selectedFormId) ||
                              formsForSelectedVisit[0],
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Image Viewer Dialog */}
      {currentImage && (
        <Dialog open={showImageViewer} onOpenChange={setShowImageViewer}>
          <DialogContent className="sm:max-w-4xl p-0 overflow-hidden ">
            <DialogHeader className="px-4 pt-4">
              <DialogTitle>{currentImage.title}</DialogTitle>
            </DialogHeader>

            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
              {/* Image navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full h-10 w-10 z-10"
                onClick={() => prevImage(allImages)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full h-10 w-10 z-10"
                onClick={() => nextImage(allImages)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image with zoom/rotation */}
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <Image
                  src={currentImage.url || "/placeholder.svg"}
                  alt={currentImage.title}
                  className="max-w-full max-h-full object-contain"
                  width={800}
                  height={600}
                  unoptimized={true}
                />
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}
                >
                  <ZoomOut className="h-4 w-4 mr-2" /> Zoom Out
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 3))}
                >
                  <ZoomIn className="h-4 w-4 mr-2" /> Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => setRotation((rotation + 90) % 360)}
                >
                  <RotateCw className="h-4 w-4 mr-2" /> Rotate
                </Button>
              </div>

              {/* Pagination */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
