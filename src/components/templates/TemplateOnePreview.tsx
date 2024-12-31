import { motion } from "framer-motion";
import { Maximize2, Minimize2, Download } from "lucide-react";
import { usePDF } from "react-to-pdf";
import { ResumeData } from "../../pages/edit-and-preview/types/index";

interface ResumePreviewProps {
  data: ResumeData;
  maximized: boolean;
  onToggleMaximize: () => void;
}

export default function TemplateOnePreview({
  data,
  maximized,
  onToggleMaximize,
}: ResumePreviewProps) {
  const { toPDF, targetRef } = usePDF({
    filename: "resume.pdf",
  });

  return (
    <motion.div
      layout
      className={`bg-white rounded-lg shadow-lg border border-gray-300 ${maximized ? "fixed inset-4 z-50 overflow-auto" : "h-full"
        }`}
    >
      {/* Header */}
      <div className="sticky top-0 right-0 p-4 flex justify-end gap-2 bg-gray-100 backdrop-blur-sm">
        <button
          onClick={onToggleMaximize}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          {maximized ? (
            <Minimize2 className="w-5 h-5 text-blue-600" />
          ) : (
            <Maximize2 className="w-5 h-5 text-blue-600" />
          )}
        </button>
        <button
          onClick={() => toPDF()}
          className="p-2 hover:bg-blue-100 rounded-full"
        >
          <Download className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      <div ref={targetRef} className="p-8 space-y-8">
        {/* Header Section */}
        <div className="text-left">
          <h1 className="text-4xl font-extrabold text-blue-600">
            {`${data.basicInformation?.firstName || ""} ${data.basicInformation?.lastName || ""
              }`}
          </h1>
          <p className="text-lg font-semibold text-gray-700">
            {data.basicInformation?.currentDesignation || "N/A"}
          </p>
          <div className="text-sm text-gray-500 flex justify-left gap-4 mt-2">
            <span>{data.basicInformation?.email || ""}</span>
            <span>{data.basicInformation?.mobile || ""}</span>
            <span>
              {data.basicInformation?.address?.city || ""},{" "}
              {data.basicInformation?.address?.state || ""}
            </span>
          </div>
        </div>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-t-2 border-blue-200 pb-1">
            SUMMARY
          </h2>
          <p className="text-sm text-gray-700 mt-4">
            {data.summary.summary || "A brief professional summary goes here."}
          </p>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-xl font-bold text-blue-600 border-t-2 border-b-2 border-blue-200 pb-1">
            TECHNICAL SKILLS
          </h2>
          <ul className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-700">
            {data.skills.map((skill, index) => (
              <li key={index} className="list-disc list-inside">
                {skill || "Skill not specified"}
              </li>
            ))}
          </ul>
        </section>

        {/* Professional Experience */}
        <section>
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-t-2 border-blue-200 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6 mt-4">
            {data.internships?.map((internship, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-800">
                  {internship.title || "N/A"}
                </h3>
                <p className="text-sm text-gray-600">
                  {internship.organization || "N/A"}, {internship.location || "N/A"} (
                  {internship.startDate
                    ? new Date(internship.startDate).toLocaleDateString()
                    : "Start Date N/A"}{" "}
                  -{" "}
                  {internship.endDate
                    ? new Date(internship.endDate).toLocaleDateString()
                    : internship.ongoing
                      ? "Present"
                      : "End Date N/A"}
                  )
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                  <li>{internship.description || "No description available"}</li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-t-2 border-blue-200 pb-1">
            EDUCATION
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {data.education?.ssc?.instistutionName || "Institution Name"}
              </h3>
              <p className="text-sm text-gray-600">
                {data.education?.ssc?.city || "City"},{" "}
                {data.education?.ssc?.state || "State"}
              </p>
              <p className="text-sm text-gray-600">
                {data.education?.ssc?.startDate
                  ? new Date(data.education.ssc.startDate).toLocaleDateString()
                  : "Start Date"}{" "}
                -{" "}
                {data.education?.ssc?.endDate
                  ? new Date(data.education.ssc.endDate).toLocaleDateString()
                  : "End Date"}
              </p>
            </div>
          </div>
        </section>
        {/* Additional information */}
        <section>
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-t-2 border-blue-200 pb-1">
            Additional Information
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {data.domainKnowledge || "Domain Knowledge"}
              </h3>
              {data.domainKnowledge.map((domainKnowledge, index) => (
                <p key={index} className="list-disc list-inside">
                  {domainKnowledge || "domainKnowledge not specified"}
                </p>
              ))}
            </div>
          </div>
        </section>
        {/* Certifications */}
        <section>
          <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
            CERTIFICATIONS
          </h2>
          <ul className="space-y-2 text-sm">
            {data.certifications.map((cert, index) => (
              <li key={index}>
                <p className="font-medium">{cert.certificationName}</p>
                <p className="text-white/80">{cert.institute}</p>
                <p className="text-white/60">ID: {cert.certificationId}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
}