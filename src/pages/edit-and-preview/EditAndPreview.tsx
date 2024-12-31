import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateSelector } from "../../components/templates/TemplateSelector";
import Navbar from "../../components/Navbar";
import { fetchUserInfo } from "../../services/api";
import TEMPLATES from "./templates.json";
import React from "react";

// Lazy import template-specific components
const componentMap: any = {
  TemplateOneForm: React.lazy(() => import("../../components/templates/TemplateOneForm")),
  TemplateOnePreview: React.lazy(() => import("../../components/templates/TemplateOnePreview")),
  TemplateTwoForm: React.lazy(() => import("../../components/templates/TemplateTwoForm")),
  TemplateTwoPreview: React.lazy(() => import("../../components/templates/TemplateTwoPreview")),
  // Add more templates as needed
};

const EditAndPreview = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);
  const [previewMaximized, setPreviewMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data when a template is selected
  useEffect(() => {
    if (selectedTemplate) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const email = localStorage.getItem("email");  // Get email from local storage
          const data = await fetchUserInfo(email);
          setResumeData(data.resumeDetails);
        } catch (error) {
          console.error("Error fetching resume data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedTemplate]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const template = TEMPLATES.find((t) => t.id === selectedTemplate);
  const FormComponent = template ? componentMap[template.formComponent] : null;
  const PreviewComponent = template ? componentMap[template.previewComponent] : null;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Choose a Template</h2>
                <TemplateSelector
                  templates={TEMPLATES}
                  selectedTemplate={selectedTemplate || ""}
                  onSelect={setSelectedTemplate}
                />
                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!selectedTemplate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && selectedTemplate && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {FormComponent && (
                    <React.Suspense fallback={<div>Loading Form...</div>}>
                      <FormComponent data={resumeData} onChange={setResumeData} />
                    </React.Suspense>
                  )}
                  {PreviewComponent && (
                    <React.Suspense fallback={<div>Loading Preview...</div>}>
                      <PreviewComponent
                        data={resumeData}
                        maximized={previewMaximized}
                        onToggleMaximize={() => setPreviewMaximized(!previewMaximized)}
                      />
                    </React.Suspense>
                  )}
                </>
              )}
              <div className="col-span-2 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EditAndPreview;
