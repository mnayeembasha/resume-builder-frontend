import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Brain, LoaderCircle, Trophy } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../services/AImodal"; // Assuming AI service is imported here
import { ResumeData } from "../../pages/edit-and-preview/types/index";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const prompt = "Job Title: {jobTitle}, Depends on job title give me a list of summaries for 3 experience levels: Senior, Mid, and Fresher levels in 3-4 lines each. Provide the output in JSON format with summary and experience_level fields.";

export default function TemplateOneForm({ data, onChange }: ResumeFormProps) {
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaries, setAIGeneratedSummaries] = useState([]);
  const [atsLoading, setATSLoading] = useState(false);
  const [atsScore, setATSScore] = useState<number | null>(null);
  const [improvementTips, setImprovementTips] = useState<string | null>(null);

  const generateSummariesFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", "Full Stack Developer");
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const parsedResult = JSON.parse(await result.response.text());
      setAIGeneratedSummaries(parsedResult.summaries);
    } catch (error) {
      console.error("Error generating summaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchATSScore = async () => {
    setATSLoading(true);
    try {
      const atsPrompt = `Evaluate the following resume for an ATS score in percentage. Provide the score and suggest improvements to make it more ATS-friendly. Response format: {"score": <percentage>, "suggestions": <list of improvements>}. Resume: ${JSON.stringify(
        data
      )}`;
      const result = await AIChatSession.sendMessage(atsPrompt);
      const rawResponse = await result.response.text();

      let parsedResult;
      try {
        parsedResult = JSON.parse(rawResponse);
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError);
        throw new Error("Invalid JSON format in API response.");
      }

      if (parsedResult?.score !== undefined && parsedResult?.suggestions) {
        setATSScore(parsedResult.score);
        setImprovementTips(parsedResult.suggestions);
        toast.success("ATS score calculated successfully!");
      } else {
        console.warn("Unexpected response structure:", parsedResult);
        throw new Error("Response is missing expected fields.");
      }
    } catch (error) {
      console.error("Error fetching ATS score:", error);
      toast.error("Failed to calculate ATS score. Please try again later.");
    } finally {
      setATSLoading(false);
    }
  };



  useEffect(() => {
    console.log("Updated AI Summaries:", aiGeneratedSummaries);
  }, [aiGeneratedSummaries]);

  const onSave = () => {
    toast.success("Summary saved successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-600">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            value={data.basicInformation.firstName}
            onChange={(e) =>
              onChange({
                ...data,
                basicInformation: {
                  ...data.basicInformation,
                  firstName: e.target.value,
                },
              })
            }
            placeholder="First Name"
          />
          <Input
            type="text"
            value={data.basicInformation.lastName}
            onChange={(e) =>
              onChange({
                ...data,
                basicInformation: {
                  ...data.basicInformation,
                  lastName: e.target.value,
                },
              })
            }
            placeholder="Last Name"
          />
          <Input
            type="email"
            value={data.basicInformation.email}
            onChange={(e) =>
              onChange({
                ...data,
                basicInformation: {
                  ...data.basicInformation,
                  email: e.target.value,
                },
              })
            }
            placeholder="Email"
          />
          <Input
            type="tel"
            value={data.basicInformation.mobile}
            onChange={(e) =>
              onChange({
                ...data,
                basicInformation: {
                  ...data.basicInformation,
                  mobile: e.target.value,
                },
              })
            }
            placeholder="Mobile Number"
          />
        </div>
      </motion.div>

      {/* Summary Section with AI */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-between">
          Summary
          <Button
            variant="outline"
            onClick={generateSummariesFromAI}
            disabled={loading}
            className="border-primary text-primary flex gap-2"
          >
            <Brain className="h-4 w-4" />
            {loading ? <LoaderCircle className="animate-spin" /> : "Generate with AI"}
          </Button>
        </h2>
        <Textarea
          value={aiGeneratedSummaries[0]?.summary ? aiGeneratedSummaries[0].summary : data.summary.summary}
          onChange={(e) =>
            onChange({
              ...data,
              summary: { summary: e.target.value },
            })
          }
          placeholder="Professional Summary"
          className="h-32 mt-2"
        />
        <div className="mt-2">
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>

      {/* AI Suggestions */}
      {/* {aiGeneratedSummaries.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">AI Suggestions</h2>
          {aiGeneratedSummaries.map((item, index) => (
            <div
              key={index}
              onClick={() => onSummaryClick(item.summary)}
              className="p-4 shadow-lg rounded-lg cursor-pointer my-2 hover:bg-gray-100"
            >
              <h3 className="font-bold text-primary mb-1">Level: {item.experience_level}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )} */}

      {/* Technical Skills */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Technical Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.skills.map((skill, index) => (
            <Input
              key={index}
              type="text"
              value={skill}
              onChange={(e) =>
                onChange({
                  ...data,
                  skills: data.skills.map((s, i) =>
                    i === index ? e.target.value : s
                  ),
                })
              }
              placeholder="Enter skill"
            />
          ))}
        </div>
      </div>

      {/* Professional Experience */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Professional Experience</h2>
        {data.internships.map((internship, index) => (
          <div key={index} className="space-y-2">
            <Input
              value={internship.title}
              onChange={(e) =>
                onChange({
                  ...data,
                  internships: data.internships.map((i, idx) =>
                    idx === index ? { ...i, title: e.target.value } : i
                  ),
                })
              }
              placeholder="Job Title"
            />
            <Input
              value={internship.organization}
              onChange={(e) =>
                onChange({
                  ...data,
                  internships: data.internships.map((i, idx) =>
                    idx === index ? { ...i, organization: e.target.value } : i
                  ),
                })
              }
              placeholder="Organization"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Education</h2>
        <div>
          <Input
            value={data.education.ssc.instistutionName}
            onChange={(e) =>
              onChange({
                ...data,
                education: {
                  ...data.education,
                  ssc: { ...data.education.ssc, instistutionName: e.target.value },
                },
              })
            }
            placeholder="Institution Name"
          />
          <Input
            value={data.education.ssc.city}
            onChange={(e) =>
              onChange({
                ...data,
                education: {
                  ...data.education,
                  ssc: { ...data.education.ssc, city: e.target.value },
                },
              })
            }
            placeholder="City"
          />
        </div>
      </div>

      {/* ATS Score Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">ATS Score</h2>
        <Button
          variant="outline"
          onClick={fetchATSScore}
          disabled={atsLoading}
          className="flex items-center gap-2 mt-2"
        >
          <Trophy className="h-4 w-4" />
          {atsLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Check Resume Score"
          )}
        </Button>
        {atsScore !== null && (
          <div className="mt-4 p-4 bg-gray-50 border-l-4 border-blue-500 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-blue-600">Your ATS Score</h3>
            <p className="text-2xl font-extrabold text-gray-800">{atsScore}%</p>

            {improvementTips && (
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-700">
                  Suggestions for Improvement:
                </h4>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  {Array.isArray(improvementTips) ? (
                    improvementTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))
                  ) : (
                    <li>{improvementTips}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

    </div >
  );
}
