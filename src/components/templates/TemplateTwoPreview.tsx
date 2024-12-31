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
            {/* Controls */}
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

            {/* Resume Content */}
            <div ref={targetRef} className="flex min-h-[1056px]">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-[#1A2744] text-white p-8 space-y-8 break-words whitespace-normal overflow-hidden">
                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-white">
                            <img
                                src={data.personalInformation?.photo || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
                            CONTACT
                        </h2>
                        <div className="space-y-2 text-sm">
                            <p>{data.basicInformation?.mobile}</p>
                            <p className="inline w-full">{data.basicInformation?.email}</p>
                            <p>{data.basicInformation?.address?.addressLine}</p>
                            <p>
                                {data.basicInformation?.address?.city},{" "}
                                {data.basicInformation?.address?.state}
                            </p>
                            <p>{data.basicInformation?.linkedIn}</p>
                            <p>{data.basicInformation?.github}</p>
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
                            EDUCATION
                        </h2>
                        <div className="space-y-4">
                            {data.education?.ssc && (
                                <div>
                                    <p className="text-sm font-semibold">
                                        {new Date(data.education.graduation.startDate).getFullYear()} -{" "}
                                        {data.education.ssc.endDate
                                            ? "Present"
                                            : new Date(data.education.graduation.endDate).getFullYear()}
                                    </p>
                                    <p className="font-medium">
                                        {data.education.ssc.instistutionName}
                                    </p>
                                    {/* <p className="text-sm text-white/80">
                                        {data.education.graduation.specialization}
                                    </p> */}
                                    <p className="text-sm text-white/60">
                                        CGPA: {data.education.graduation.cgpa}
                                    </p>
                                </div>
                            )}
                            {/* {data.education?.underGraduation && (
                                <div>
                                    <p className="text-sm font-semibold">
                                        {new Date(
                                            data.education.underGraduation.startDate
                                        ).getFullYear()}{" "}
                                        -{" "}
                                        {new Date(
                                            data.education.underGraduation.endDate
                                        ).getFullYear()}
                                    </p>
                                    <p className="font-medium">
                                        {data.education.underGraduation.institutionName}
                                    </p>
                                    <p className="text-sm text-white/80">
                                        {data.education.underGraduation.specialization}
                                    </p>
                                    <p className="text-sm text-white/60">
                                        CGPA: {data.education.underGraduation.cgpa}
                                    </p>
                                </div>
                            )} */}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
                            SKILLS
                        </h2>
                        <ul className="space-y-1 text-sm">
                            {data.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Domain Knowledge */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
                            DOMAIN KNOWLEDGE
                        </h2>
                        <ul className="space-y-1 text-sm">
                            {data.domainKnowledge.map((domain, index) => (
                                <li key={index}>{domain}</li>
                            ))}
                        </ul>
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

                {/* Main Content */}
                <div className="w-2/3 p-8 space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            {data.basicInformation?.firstName}{" "}
                            {data.basicInformation?.middleName}{" "}
                            {data.basicInformation?.lastName}
                        </h1>
                        <p className="text-xl text-gray-600 mt-2">
                            {data.basicInformation?.currentDesignation}
                        </p>
                    </div>

                    {/* Profile */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
                            PROFILE
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {data.summary.summary}
                        </p>
                    </section>

                    {/* Work Experience */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
                            WORK EXPERIENCE
                        </h2>
                        <div className="space-y-6">
                            {data.internships?.map((internship, index) => (
                                <div
                                    key={index}
                                    className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-400 before:rounded-full"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {internship.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {internship.organization}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(internship.startDate).getFullYear()} -{" "}
                                            {internship.ongoing
                                                ? "PRESENT"
                                                : new Date(internship.endDate).getFullYear()}
                                        </p>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {internship.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
                            ACHIEVEMENTS
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            {data.achievements.map((achievement, index) => (
                                <li key={index} className="text-gray-600">
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}