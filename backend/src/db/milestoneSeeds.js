const defaultMilestones = [
  { milestone_key: 'first_smile', milestone_name: 'First smile', expected_age_months: 2 },
  { milestone_key: 'holds_head_up', milestone_name: 'Holds head up', expected_age_months: 3 },
  { milestone_key: 'rolls_over', milestone_name: 'Rolls over', expected_age_months: 4 },
  { milestone_key: 'sits_up', milestone_name: 'Sits up', expected_age_months: 6 },
  { milestone_key: 'crawls', milestone_name: 'Crawls', expected_age_months: 8 },
  { milestone_key: 'stands', milestone_name: 'Stands with support', expected_age_months: 10 },
];

import { DevelopmentMilestone } from '../models/index.js';

export const seedMilestonesForBaby = async (babyId) => {
  try {
    const existingCount = await DevelopmentMilestone.count({ where: { baby_id: babyId } });
    if (existingCount > 0) return;

    const milestones = defaultMilestones.map(m => ({
      baby_id: babyId,
      ...m,
      completed: false,
    }));

    await DevelopmentMilestone.bulkCreate(milestones);
    console.log(`Seeded ${milestones.length} milestones for baby ${babyId}`);
  } catch (error) {
    console.error('Error seeding milestones:', error.message);
  }
};

export default defaultMilestones;
