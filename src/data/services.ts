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
  icon: React.ElementType;
}

export const services: Service[] = [
  {
    id: "5-panel",
    title: "5 Panel Drug Screen",
    description:
      "Standard five-substance urine drug test covering marijuana, cocaine, opiates, amphetamines, and PCP. Ideal for pre-employment and routine screening.",
    turnaround: "24–48 hours",
    price: "$55",
    icon: FlaskConical,
  },
  {
    id: "10-panel",
    title: "10 Panel Drug Screen",
    description:
      "Comprehensive ten-substance urine drug test adding benzodiazepines, barbiturates, methadone, propoxyphene, and methaqualone to the standard 5-panel.",
    turnaround: "24–48 hours",
    price: "$75",
    icon: TestTubeDiagonal,
  },
  {
    id: "etg",
    title: "ETG Alcohol Test",
    description:
      "Ethyl glucuronide urine test detecting alcohol consumption up to 80 hours prior. Used in court-ordered and treatment monitoring programs.",
    turnaround: "2–3 business days",
    price: "$85",
    icon: Beaker,
  },
  {
    id: "stg",
    title: "STG Alcohol Test",
    description:
      "Ethyl sulfate urine test confirming recent alcohol use alongside ETG for enhanced accuracy in compliance programs.",
    turnaround: "2–3 business days",
    price: "$85",
    icon: HeartPulse,
  },
  {
    id: "breath-alcohol",
    title: "Breath Alcohol Testing",
    description:
      "Instant on-site breath alcohol screening using DOT-approved devices. Results available immediately for workplace and legal needs.",
    turnaround: "Immediate",
    price: "$45",
    icon: Wind,
  },
  {
    id: "dna",
    title: "DNA Testing",
    description:
      "Paternity, maternity, and family relationship DNA testing with legally admissible chain-of-custody documentation available. Confidential results.",
    turnaround: "5–7 business days",
    price: "$299",
    icon: Dna,
  },
  {
    id: "background",
    title: "Background Checks",
    description:
      "Comprehensive criminal background screening for employers, landlords, and organizations. County, state, and national searches available.",
    turnaround: "1–3 business days",
    price: "$49",
    icon: ShieldCheck,
  },
  {
    id: "dot",
    title: "Employer / DOT Testing",
    description:
      "DOT-compliant and non-DOT workplace drug and alcohol testing programs including random selection, post-accident, and reasonable suspicion testing.",
    turnaround: "Varies",
    price: "Contact Us",
    icon: Truck,
  },
];
