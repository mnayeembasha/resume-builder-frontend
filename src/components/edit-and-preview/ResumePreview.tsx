import { motion } from 'framer-motion';
import { Maximize2, Minimize2, Download } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import { ResumeData } from '../../pages/edit-and-preview/types';

// interface ResumeData {
//   basicInformation: {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     currentDesignation: string;
//     email: string;
//     mobile: string;
//   };
//   summary: {
//     summary: string;
//   };
//   education: {
//     ssc: {
//       instistutionName: string;
//       city: string;
//       startDate: Date;
//       endDate: Date;
//     };
//   };
//   skills: string[];
//   projects: {
//     name: string;
//     client: string;
//     link: string;
//   }[];
//   achievements: string[];
// }

interface ResumePreviewProps {
  data: ResumeData;
  maximized: boolean;
  onToggleMaximize: () => void;
}

export function ResumePreview({ data, maximized, onToggleMaximize }: ResumePreviewProps) {
  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
  });

  return (
    <motion.div
      layout
      className={`bg-gray-50 rounded-lg shadow-lg border border-gray-200 ${
        maximized ? 'fixed inset-4 z-50 overflow-auto' : 'h-full'
      }`}
    >
      {/* Header */}
      <div className="sticky top-0 right-0 p-4 flex justify-end gap-2 bg-gray-100 backdrop-blur-sm">
        <button
          onClick={onToggleMaximize}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          {maximized ? <Minimize2 className="w-5 h-5 text-blue-600" /> : <Maximize2 className="w-5 h-5 text-blue-600" />}
        </button>
        <button
          onClick={() => toPDF()}
          className="p-2 hover:bg-blue-100 rounded-full"
        >
          <Download className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      <div ref={targetRef} className="p-8 space-y-8">
        {/* Basic Information */}
        <motion.div layout className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {`${data.basicInformation.firstName} ${data.basicInformation.middleName} ${data.basicInformation.lastName}`}
          </h1>
          <p className="text-lg font-medium text-gray-700">
            {data.basicInformation.currentDesignation}
          </p>
          <div className="text-sm text-gray-500 flex justify-center gap-4">
            <span>{data.basicInformation.email}</span>
            <span>{data.basicInformation.mobile}</span>
          </div>
        </motion.div>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-1">Education</h2>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-700">SSC</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <p>{data.education.ssc.instistutionName}, {data.education.ssc.city}</p>
              <p>{`${data.education.ssc.startDate.toLocaleString('default', { month: 'short' })} ${data.education.ssc.startDate.getFullYear()} - ${data.education.ssc.endDate.toLocaleString('default', { month: 'short' })} ${data.education.ssc.endDate.getFullYear()}`}</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-1">Summary</h2>
          <p className="text-gray-600 mt-4">{data.summary.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-1">Projects</h2>
          <div className="space-y-4 mt-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-gray-800">{project.name}</h3>
                <p className="text-sm text-gray-600">Client: {project.client}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-1">Achievements</h2>
          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
            {data.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
}
