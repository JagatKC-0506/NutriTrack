/**
 * VACCINE SEED DATA
 * =================
 * National Immunization Program - Official Vaccination Schedule
 * Complete list of vaccines with detailed administration information
 */

import sequelize from '../db/sequelize.js';
import { Vaccine } from '../models/index.js';

const vaccines = [
  {
    name: 'BCG (Bacillus Calmette Guerin)',
    emoji: '💉',
    description: 'Protects against tuberculosis. Given at birth. Route: Intradermal. Dose: 1 dose.',
    total_doses: 1,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'Pentavalent Vaccine (Diphtheria, Pertussis, Tetanus, Hepatitis B and Hemophilus influenza B)',
    emoji: '💉',
    description: 'Protects against diphtheria, pertussis, tetanus, hepatitis B and haemophilus influenza B. Given at 6, 10 and 14 weeks. Route: Intramuscular.',
    total_doses: 3,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'OPV (Oral Polio Vaccine)',
    emoji: '💉',
    description: 'Protects against polio. Given at 6, 10 and 14 weeks. Route: Oral.',
    total_doses: 3,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'PCV (Pneumococcal Conjugate Vaccine)',
    emoji: '💉',
    description: 'Protects against pneumococcal diseases (meninges, ear and chest infections). Given at 6, 10 weeks and 9 months. Route: Intramuscular.',
    total_doses: 3,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'Rotavirus Vaccine',
    emoji: '💉',
    description: 'Protects against rotavirus diarrhea. Given at 6, 10 weeks. Route: Oral.',
    total_doses: 2,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'fIPV (Fractional Injectable Polio Vaccine)',
    emoji: '💉',
    description: 'Protects against polio. Given at 6, 14 weeks. Route: Intramuscular.',
    total_doses: 2,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'MR (Measles - Rubella)',
    emoji: '💉',
    description: 'Protects against measles and rubella. Given at 9 and 15 months. Route: Subcutaneous.',
    total_doses: 2,
    recipient_type: 'baby',
    recommended: true,
  },
  {
    name: 'JE (Japanese Encephalitis)',
    emoji: '💉',
    description: 'Protects against Japanese encephalitis. Given at 12 months. Route: Subcutaneous.',
    total_doses: 1,
    recipient_type: 'baby',
    recommended: true,
  },
  // Optional vaccines (not marked recommended)
  {
    name: 'Hepatitis A Vaccine',
    emoji: '💉',
    description: 'Protects against Hepatitis A (food and water-borne infection). Common in developing countries. Age: after 1 year.',
    total_doses: 2,
    recipient_type: 'both',
    recommended: false,
  },
  {
    name: 'Typhoid Vaccine',
    emoji: '💉',
    description: 'Protects against typhoid fever. Useful in poor sanitation areas. Age: after 2 years injectable / 6 months conjugate.',
    total_doses: 1,
    recipient_type: 'baby',
    recommended: false,
  },
  {
    name: 'Varicella (Chickenpox) Vaccine',
    emoji: '💉',
    description: 'Protects against chickenpox; prevents complications and school absence. Age: after 12 months.',
    total_doses: 2,
    recipient_type: 'baby',
    recommended: false,
  },
  {
    name: 'Influenza (Flu) Vaccine',
    emoji: '💉',
    description: 'Protects against seasonal influenza; prevents severe flu and complications. Age: after 6 months (yearly).',
    total_doses: 1,
    recipient_type: 'both',
    recommended: false,
  },
  {
    name: 'HPV (Human Papillomavirus) Vaccine',
    emoji: '💉',
    description: 'Protects against cervical cancer and genital warts. Age: 9–14 years (before sexual activity).',
    total_doses: 2,
    recipient_type: 'both',
    recommended: false,
  },
  {
    name: 'Meningococcal Vaccine',
    emoji: '💉',
    description: 'Protects against meningitis; useful for outbreaks, travel, hostels. Age: infancy or adolescence.',
    total_doses: 1,
    recipient_type: 'both',
    recommended: false,
  },
  {
    name: 'Rabies (Pre-exposure) Vaccine',
    emoji: '💉',
    description: 'Protects against rabies; important in high dog-bite risk areas. Age: any age.',
    total_doses: 3,
    recipient_type: 'both',
    recommended: false,
  },
  // Vaccines specifically for pregnant women
  {
    name: 'Flu Shot (Inactivated)',
    emoji: '💉',
    description: 'Pregnant women should receive inactivated flu vaccine anytime during pregnancy. Protects mother and passes antibodies to baby. Protects against seasonal influenza.',
    total_doses: 1,
    recipient_type: 'mother',
    recommended: true,
  },
  {
    name: 'COVID-19 Vaccine',
    emoji: '💉',
    description: 'Safe during pregnancy. Reduces risk of severe illness, hospitalization, and death. Passes protective antibodies to baby. Recommended for all trimesters.',
    total_doses: 2,
    recipient_type: 'mother',
    recommended: true,
  },
  {
    name: 'Tdap (Tetanus, Diphtheria, Pertussis)',
    emoji: '💉',
    description: 'Preferably given during 3rd trimester (weeks 27-36). Protects newborn from pertussis (whooping cough) in first months of life. Can be given anytime if not previously given.',
    total_doses: 1,
    recipient_type: 'mother',
    recommended: true,
  },
  {
    name: 'Meningococcal Vaccine',
    emoji: '💉',
    description: 'Safe during pregnancy if risk factors present. Protects against meningococcal disease. Recommended for travel to endemic areas.',
    total_doses: 1,
    recipient_type: 'mother',
    recommended: false,
  },
  {
    name: 'Hepatitis B Vaccine',
    emoji: '💉',
    description: 'Can be given during pregnancy if not previously vaccinated or to those with risk factors. Protects from hepatitis B infection.',
    total_doses: 3,
    recipient_type: 'mother',
    recommended: false,
  },
  {
    name: 'Pneumococcal Vaccine (PPSV23)',
    emoji: '💉',
    description: 'Can be given during pregnancy if indicated by medical conditions. Protects against pneumococcal disease.',
    total_doses: 1,
    recipient_type: 'mother',
    recommended: false,
  },
  {
    name: 'Varicella (Chickenpox) Vaccine',
    emoji: '⚠️',
    description: 'LIVE VACCINE - NOT RECOMMENDED during pregnancy. Should be given before pregnancy. Contains live virus.',
    total_doses: 2,
    recipient_type: 'mother',
    recommended: false,
  },
  {
    name: 'MMR (Measles, Mumps, Rubella) Vaccine',
    emoji: '⚠️',
    description: 'LIVE VACCINE - NOT RECOMMENDED during pregnancy. Should be given before pregnancy or after delivery. Contains live virus.',
    total_doses: 2,
    recipient_type: 'mother',
    recommended: false,
  },
  {
    name: 'Rotavirus Vaccine',
    emoji: '⚠️',
    description: 'LIVE VACCINE - NOT RECOMMENDED during pregnancy. Only given to babies, not adults.',
    total_doses: 2,
    recipient_type: 'mother',
    recommended: false,
  },
];

/**
 * Seed vaccines into the database
 * Clears existing vaccines and inserts fresh data
 */
export const seedVaccines = async () => {
  try {
    // Establish database connection
    await sequelize.authenticate();
    console.log('Database connection established');

    // Sync database schema
    await sequelize.sync({ force: false, alter: false });
    console.log('Database synced');

    // Delete all existing vaccines
    const deletedCount = await Vaccine.destroy({ where: {}, truncate: true });
    console.log(`Deleted ${deletedCount} existing vaccines`);

    // Insert new vaccine list
    await Vaccine.bulkCreate(vaccines);
    console.log(`✓ Successfully seeded ${vaccines.length} vaccines`);
    
  } catch (error) {
    console.error('Error seeding vaccines:', error);
    throw error;
  }
};

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedVaccines().then(() => process.exit(0)).catch(() => process.exit(1));
}

export default seedVaccines;
