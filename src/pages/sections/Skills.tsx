import SkillsDomainAchievementTemplate from "./SkillsDomainAchievementTemplate";

const Skills = ({ form }) => (
  <SkillsDomainAchievementTemplate
    form={form}
    sectionName="skills"
    label="Skills"
    placeholder="Enter a skill (e.g., Java Programming)"
    maxItems={6}
  />
);
export default Skills;





