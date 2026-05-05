import {
  FlaskConical,
  TestTubeDiagonal,
  Wind,
  Dna,
  ShieldCheck,
  Truck,
  Beaker,
  HeartPulse,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  turnaround: string;
  price: string;
  priceId?: string;
  amountCents?: number;
  icon: React.ElementType;
}

export const services: Service[] = [
  {
    id: "5-panel",
    title: "Rapid 5 Panel Drug Screen",
    description:
      "Standard five-substance urine drug test covering marijuana, cocaine, opiates, amphetamines, and PCP. Ideal for pre-employment and routine screening.",
    turnaround: "15–20 minutes",
    price: "$55",
    priceId: "svc_5_panel_price",
    amountCents: 5500,
    icon: FlaskConical,
  },
  {
    id: "10-panel",
    title: "Rapid 10 Panel Drug Screen",
    description:
      "Comprehensive ten-substance urine drug test adding benzodiazepines, barbiturates, methadone, propoxyphene, and methaqualone to the standard 5-panel.",
    turnaround: "15–20 minutes",
    price: "$65",
    priceId: "svc_10_panel_price",
    amountCents: 6500,
    icon: TestTubeDiagonal,
  },
  {
    id: "etg",
    title: "ETG Alcohol Test",
    description:
      "Ethyl glucuronide urine test detecting alcohol consumption up to 80 hours prior. Used in court-ordered and treatment monitoring programs.",
    turnaround: "2–3 business days",
    price: "$85",
    priceId: "svc_etg_price",
    amountCents: 8500,
    icon: Beaker,
  },
  {
    id: "stg",
    title: "STG Alcohol Test",
    description:
      "Ethyl sulfate urine test confirming recent alcohol use alongside ETG for enhanced accuracy in compliance programs.",
    turnaround: "2–3 business days",
    price: "$85",
    priceId: "svc_stg_price",
    amountCents: 8500,
    icon: HeartPulse,
  },
  {
    id: "breath-alcohol",
    title: "Breath Alcohol Testing",
    description:
      "Instant on-site breath alcohol screening using DOT-approved devices. Results available immediately for workplace and legal needs.",
    turnaround: "Immediate",
    price: "$45",
    priceId: "svc_breath_alcohol_price",
    amountCents: 4500,
    icon: Wind,
  },
  {
    id: "dna",
    title: "DNA Testing",
    description:
      "Paternity, maternity, and family relationship DNA testing with legally admissible chain-of-custody documentation available. Confidential results.",
    turnaround: "5–7 business days",
    price: "$299",
    priceId: "svc_dna_price",
    amountCents: 29900,
    icon: Dna,
  },
  {
    id: "background",
    title: "Background Checks",
    description:
      "Comprehensive criminal background screening for employers, landlords, and organizations. County, state, and national searches available.",
    turnaround: "1–3 business days",
    price: "$49",
    priceId: "svc_background_price",
    amountCents: 4900,
    icon: ShieldCheck,
  },
  {
    id: "non-dot-urine",
    title: "Non-DOT - Urine Drug Screen",
    description:
      "Non-DOT urine drug screen for employers, individuals, legal, and personal use. Quick on-site collection with rapid results.",
    turnaround: "15–20 minutes",
    price: "$55",
    priceId: "svc_non_dot_urine_price",
    amountCents: 5500,
    icon: FlaskConical,
  },
  {
    id: "dot-urine",
    title: "DOT - Urine Drug Screen",
    description:
      "DOT-regulated urine drug screen performed on-site with proper chain-of-custody documentation. Quick 15-minute appointment for CDL drivers and DOT-covered employees.",
    turnaround: "15 minutes",
    price: "$65",
    priceId: "svc_dot_urine_price",
    amountCents: 6500,
    icon: Truck,
  },
  {
    id: "dot",
    title: "Employer / DOT Testing",
    description:
      "DOT-compliant and non-DOT workplace drug and alcohol testing programs including random selection, post-accident, and reasonable suspicion testing. Pay a $50 deposit to lock in your appointment; balance billed after service.",
    turnaround: "Varies",
    price: "$50 deposit",
    priceId: "svc_dot_deposit_price",
    amountCents: 5000,
    icon: Truck,
  },
];
