import SkillsDomainAchievementTemplate from "./SkillsDomainAchievementTemplate";

const DomainKnowledge = ({ form }) => (
    <SkillsDomainAchievementTemplate
      form={form}
      sectionName="domainKnowledge"
      label="Domain Knowledge"
      placeholder="Enter a domain knowledge item (e.g., Software Development)"
      maxItems={6}
    />
  );
export default DomainKnowledge;