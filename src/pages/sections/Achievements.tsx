import SkillsDomainAchievementTemplate from "./SkillsDomainAchievementTemplate";

const Achievements = ({ form }) => (
    <SkillsDomainAchievementTemplate
      form={form}
      sectionName="achievements"
      label="Achievements"
      placeholder="Enter an achievement (e.g., Best Project Award)"
      maxItems={6}
    />
  );

export default Achievements;