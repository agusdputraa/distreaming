
export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Rp 54.000',
    period: '/bulan',
    features: ['720p Quality', '1 Device', 'Limited Content', 'Ads Supported'],
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 'Rp 120.000',
    period: '/bulan',
    features: ['1080p Full HD', '2 Devices', 'All Content', 'No Ads', 'Download'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'Rp 186.000',
    period: '/bulan',
    features: ['4K + HDR', '4 Devices', 'All Content', 'No Ads', 'Download', 'Spatial Audio'],
    popular: false,
  },
];


export const FAQS = [
  {
    question: 'What is diStreaming?',
    answer: 'diStreaming is your ultimate destination for streaming movies and TV series. We offer a vast library of content across various genres, accessible anytime and anywhere on your favorite devices.',
  },
  {
    question: 'How much does diStreaming cost?',
    answer: 'We offer three subscription tiers: Basic (Rp 54.000/month), Standard (Rp 120.000/month), and Premium (Rp 186.000/month). Each tier offers different features including video quality, number of devices, and download capabilities.',
  },
  {
    question: 'Where can I watch?',
    answer: 'Watch anywhere, anytime. Sign in with your diStreaming account to watch instantly on the web at distreaming.com from your personal computer or on any internet-connected device that offers the diStreaming app.',
  },
  {
    question: 'How do I cancel?',
    answer: 'diStreaming is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online with just two clicks. There are no cancellation fees – start or stop your account anytime.',
  },
  {
    question: 'What can I watch on diStreaming?',
    answer: 'diStreaming has an extensive library of feature films, documentaries, TV series, anime, award-winning originals, and more. Watch as much as you want, anytime you want.',
  },
  {
    question: 'Is diStreaming good for kids?',
    answer: 'The diStreaming Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV series and movies in their own space. Kids profiles come with PIN-protected parental controls.',
  },
];

export default {
  PLANS,
  FAQS,
};
