// ============================================================
// DRB PLUS — SITE CONTENT CONFIG
// Edit facts (hours, fees, phone, etc.) here — nowhere else.
// ============================================================

export const CLINIC = {
  name: "DRB PLUS Neuro-Psychiatric Clinic",
  doctor: "Dr. Biswadeep Borthakur",
  credentials: "M.B.B.S., D.P.M. (Reg. 17886-AMC)", // TODO: confirm current preferred credential line
  phone: "+91 94351 66121",
  phoneDial: "+919435166121",
  whatsapp: "919435166121",
  email: "drbborthakur@gmail.com",
  instagram: "https://instagram.com/drb_plus",
  facebook: "https://facebook.com/share/1GTB1aSBua/",
  upiId: "9401216987@airtel",
};

export const CLINICS = [
  {
    id: "margherita",
    name: "Margherita Clinic",
    address: "NH 315, Margherita, Dist. Tinsukia, Assam – 786181",
    hours: [
      "Daily except Saturday: 9:00 AM – 2:00 PM",
      "5:30 PM – 7:00 PM (by prior appointment only)",
      "Saturday: Closed",
    ],
    mapQuery: "Dr. Biswadeep Borthakur NEURO-PSYCHIATRIST Margherita",
  },
  {
    id: "digboi",
    name: "Digboi Clinic",
    address: "Itabhata, Duliajan Road, Digboi, Assam – 786171",
    hours: ["Monday – Friday: 2:30 PM – 5:00 PM"],
    mapQuery: "Digboi Assam clinic Dr Biswadeep Borthakur",
  },
];

export const SERVICES = [
  {
    id: "general-psychiatry",
    title: "General Psychiatry",
    blurb:
      "Assessment and treatment for anxiety, depression, stress, sleep issues, and other mental health concerns, with medication management where needed.",
  },
  {
    id: "de-addiction",
    title: "De-Addiction Medicine",
    blurb:
      "A structured, non-judgemental program for alcohol and substance dependence — assessment, withdrawal management, and relapse-prevention counselling.",
  },
  {
    id: "neuro-psychiatry",
    title: "Neuro-Psychiatry",
    blurb:
      "Combined neurology and psychiatry care for conditions such as epilepsy-related concerns, neurodegenerative disorders, and cognitive decline.",
  },
  {
    id: "counselling",
    title: "Psychiatric Counselling",
    blurb:
      "One-on-one therapy and counselling for trauma, anxiety, relationship stress, and personal growth, in a confidential setting.",
  },
  {
    id: "teleconsultation",
    title: "Online Teleconsultation",
    blurb:
      "Follow-ups and select consultations over video call — useful if you're outside Margherita/Digboi or unable to travel.",
  },
];

export const FAQS = [
  {
    q: "Do I need a referral to see Dr. Borthakur?",
    a: "No referral is needed. You can book directly through this website, WhatsApp, Practo, or DaySchedule.",
  },
  {
    q: "Is everything I discuss confidential?",
    a: "Yes. All consultations, whether for mental health or de-addiction concerns, are held in strict confidence.",
  },
  {
    q: "Can I get a teleconsultation instead of visiting in person?",
    a: "Yes, for follow-ups and select cases teleconsultation is available. Mention this when booking so we can prepare a video link.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Any previous prescriptions, test reports, or referral notes, if available. If not, that's fine — we'll start with a full assessment.",
  },
  {
    q: "Do you treat family members supporting someone with addiction?",
    a: "Yes, family counselling sessions are available to help you understand and support a loved one's recovery.",
  },
  {
    q: "What happens after I pay the booking amount online?",
    a: "You'll get an on-screen confirmation and a WhatsApp message is prepared automatically to confirm your slot with our team.",
  },
];

// Booking amount collected online to confirm a slot.
// This is NOT the full consultation fee — it's an advance/booking amount.
// TODO: Replace with your actual advance amount before going live.
export const BOOKING_AMOUNT_INR = 500;
