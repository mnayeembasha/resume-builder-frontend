import { motion } from "framer-motion";
import { ResumeData } from "../../pages/edit-and-preview/types";
import { Edit2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold ">Basic Information</h2>
          <Edit2 className="w-5 h-5" />
        </div>

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
            className="input-field"
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
            className="input-field"
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
            className="input-field"
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
            className="input-field"
            placeholder="Mobile"
          />
        </div>

         {/* Education */}
         <div className="space-y-4 pb-8 border-b">
          <h3 className="text-lg font-medium">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
        type="text"
        value={data.education.ssc.instistutionName}
        onChange={(e) =>
          onChange({
            ...data,
            education:{
              ssc:{
                ...data.education.ssc,
                instistutionName:e.target.value
              }
            }
          })
        }
        className="px-3 py-1 rounded-full"
        placeholder="Enter school name"
      />
      <Input
        type="text"
        value={data.education.ssc.city}
        onChange={(e) =>
          onChange({
            ...data,
            education:{
              ssc:{
                ...data.education.ssc,
                city:e.target.value
              }
            }
          })
        }
        className="px-3 py-1 rounded-full"
        placeholder="Enter city"
      />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <Textarea
            value={data.summary.summary}
            onChange={(e) =>
              onChange({
                ...data,
                summary: { summary: e.target.value },
              })
            }
            className="h-32"
            placeholder="Professional Summary"
          />
        </div>



        <div className="space-y-4 pb-8 border-b">
  <h3 className="text-lg font-medium">Skills</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        className="px-3 py-1 rounded-full"
        placeholder="Enter skill"
      />
    ))}
  </div>
</div>


      </motion.div>
    </div>
  );
}
