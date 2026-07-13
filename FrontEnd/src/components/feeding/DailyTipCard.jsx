import { Lightbulb, Info } from 'lucide-react';

const tipDetails = {
  'Feed patiently and encourage your baby to eat without forcing.': {
    detail: 'Responsive feeding means paying attention to your baby\'s hunger and fullness cues rather than pushing them to finish every bite. Babies have a natural ability to self-regulate their intake. Forcing food can create negative mealtime associations and lead to overeating or picky eating habits later. Offer, don\'t force — and celebrate small successes.',
    source: 'WHO — Responsive feeding practices',
  },
  'Let your baby touch and explore food — it builds healthy eating habits.': {
    detail: 'Food exploration is a critical part of learning to eat. When babies touch, squish, and smell food, they become familiar with different textures and are more likely to accept new flavors. This sensory play builds a positive relationship with food. Messy eating is actually a sign of healthy development.',
    source: 'WHO — Sensory development and feeding',
  },
  'Stay calm during mealtime — babies sense stress and may refuse food.': {
    detail: 'Babies are highly attuned to their caregiver\'s emotional state. Stress, frustration, or anxiety at mealtime can trigger a baby\'s stress response, reducing appetite and making them refuse food. Create a calm, relaxed feeding environment — take deep breaths, smile, and speak softly.',
    source: 'WHO — Emotional environment during feeding',
  },
  'Offer the same food multiple times — it can take 10–15 tries before acceptance.': {
    detail: 'Neophobia (fear of new foods) is a normal developmental phase in toddlers. Research shows it can take 10–15 exposures to a new food before a child accepts it. Keep offering without pressure — simply placing the food on their plate counts as an exposure. Don\'t give up after one or two rejections.',
    source: 'WHO — Addressing picky eating in early childhood',
  },
  'Talk to your baby during feeding — it makes the experience positive.': {
    detail: 'Narrating the feeding experience — naming foods, describing textures, and using a warm tone of voice — builds positive associations with mealtime. It also supports language development and strengthens the caregiver-child bond. Simple phrases like "Mmm, this banana is sweet!" go a long way.',
    source: 'WHO — Language development through feeding interactions',
  },
  'Never leave your baby alone while eating — always supervise.': {
    detail: 'Choking can happen silently and quickly. A baby can choke on foods that seem safe — including soft foods, pieces of fruit, or even bread. Always stay within arm\'s reach during meals. Learn the signs of choking (silent coughing, inability to make sounds, blue lips) and know infant first aid.',
    source: 'WHO — Choking prevention in infants and young children',
  },
  'Let your baby decide how much to eat — trust their hunger cues.': {
    detail: 'Babies are born with excellent appetite regulation — they eat when hungry and stop when full. Trusting your baby\'s signals helps maintain this natural ability. Signs of fullness include turning the head away, pushing food away, closing the mouth, or becoming distracted. Never pressure them to "clean the plate."',
    source: 'WHO — Infant self-regulation of food intake',
  },
  'Introduce one new food at a time and watch for reactions.': {
    detail: 'Introducing single foods one at a time (with 3–5 day gaps) makes it easier to identify any allergic reactions. Common signs of food allergy include hives, swelling, vomiting, diarrhea, or difficulty breathing. Start with low-allergy foods first and introduce common allergens (egg, peanut, fish) one at a time.',
    source: 'WHO — Introduction of allergenic foods',
  },
  'Make mealtime screen-free — focus on the food and each other.': {
    detail: 'Screen distractions during meals reduce a child\'s awareness of hunger and fullness cues, leading to overeating or undereating. Screen-free meals promote mindful eating, better digestion, and more meaningful family interaction. Keep phones, tablets, and TVs off during feeding times.',
    source: 'WHO — Screen time and feeding behavior',
  },
  'Praise your baby when they try new foods — positive reinforcement helps.': {
    detail: 'Positive reinforcement — clapping, smiling, or simple verbal praise like "Good job trying that carrot!" — encourages babies to continue exploring new foods. Focus praise on the act of trying rather than the amount eaten. Avoid using dessert as a reward, which can create unhealthy food hierarchies.',
    source: 'WHO — Positive feeding dynamics',
  },
  'Offer a variety of colors and textures to encourage curiosity.': {
    detail: 'A colorful plate is usually a nutritious one. Different colors in fruits and vegetables represent different vitamins and minerals. Offering a rainbow of foods — red tomatoes, orange carrots, green spinach, purple beets — ensures a broad range of nutrients and makes meals visually appealing.',
    source: 'WHO — Dietary diversity and nutritional adequacy',
  },
  'Sit your baby upright while eating to reduce choking risk.': {
    detail: 'An upright, supported sitting position is essential for safe swallowing. Babies should never be fed while reclining, lying down, or walking around. Use a high chair with proper foot support. The upright position aligns the esophagus properly and reduces the risk of choking and aspiration.',
    source: 'WHO — Safe feeding positions',
  },
  'Avoid distractions like toys or TV during meals.': {
    detail: 'Distractions during feeding can lead to mindless eating and poor food recognition. When babies focus on toys or screens, they may not register what or how much they are eating. This can disrupt the development of healthy eating habits and reduce the enjoyment of food.',
    source: 'WHO — Mindful feeding practices',
  },
  'Be patient with messy eating — it is part of learning.': {
    detail: 'Messy eating is a sign that your baby is actively learning about food — its texture, temperature, and how it feels in their hands and mouth. It takes time to develop the fine motor skills needed to self-feed cleanly. Use a bib, protect the floor, and remember: mess today means independence tomorrow.',
    source: 'WHO — Developmental benefits of self-feeding',
  },
  'Serve small portions — you can always offer more.': {
    detail: 'Large portions can overwhelm a baby and lead to food refusal. Start with a small amount (2–3 tablespoons) on the plate. Small portions feel manageable and give your baby a sense of accomplishment when they finish. Offering more when they finish builds confidence and trust.',
    source: 'WHO — Portion guidance for infants and young children',
  },
};

export default function DailyTipCard({ onInfo }) {
  const day = new Date().getDate();
  const tips = Object.keys(tipDetails);
  const tipText = tips[(day - 1) % tips.length];
  const tipData = tipDetails[tipText];

  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Daily Feeding Tip</h2>
      <button
        onClick={() => onInfo?.({
          title: 'Daily Tip',
          detail: tipData?.detail || tipText,
          source: tipData?.source || 'WHO recommendation',
          icon: '💡',
        })}
        className="w-full text-left bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl p-5 border border-pink-500/10 shadow-lg hover:shadow-xl hover:from-pink-500/10 hover:to-purple-500/10 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
            <Lightbulb size={18} className="text-pink-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-300 leading-relaxed">{tipText}</p>
            <p className="text-[10px] text-slate-600 mt-2">Tap for details</p>
          </div>
        </div>
      </button>
    </div>
  );
}
