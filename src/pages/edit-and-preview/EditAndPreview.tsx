import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ResumeData } from './types';
import { initialResumeData } from './data/resumeData';
import { TemplateSelector } from '../../components/edit-and-preview/TemplateSelector';
import { ResumePreview } from '../../components/edit-and-preview/ResumePreview';
import { ResumeForm } from '../../components/edit-and-preview/ResumeForm';
import TEMPLATES from "./templates.json";
import Navbar from '../../components/Navbar';

 const EditAndPreview=() =>{
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>({ ...initialResumeData, selectedTemplate: '' });
  const [previewMaximized, setPreviewMaximized] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen">
      {/* <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-500">
                Step {step} of 3
              </div>
            </div>
          </div>
        </div>
      </nav> */}
      <Navbar/>

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
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    Choose a Template
                  </h2>
                </div>
                <TemplateSelector
                  templates={TEMPLATES}
                  selectedTemplate={resumeData.selectedTemplate || ''}
                  onSelect={(id) => setResumeData({ ...resumeData, selectedTemplate: id })}
                />
                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!resumeData.selectedTemplate}
                    className="px-4 py-2 bg-blue-500  rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <ResumeForm
                data={resumeData}
                onChange={setResumeData}
              />
              <ResumePreview
                data={resumeData}
                maximized={previewMaximized}
                onToggleMaximize={() => setPreviewMaximized(!previewMaximized)}
              />
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

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Final Resume
                </h2>
                <ResumePreview
                  data={resumeData}
                  maximized={previewMaximized}
                  onToggleMaximize={() => setPreviewMaximized(!previewMaximized)}
                />
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
export default EditAndPreview;