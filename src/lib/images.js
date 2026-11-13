/**
 * images.js — single manifest of every photographic slot on the platform.
 * Slot → { src, alt, focal } — one swap updates all usages.
 * Hosting: images.unsplash.com (allow-listed in next.config.mjs).
 */
const base = "https://images.unsplash.com/photo-";
const q = "?auto=format&fit=crop&w=1400&q=80";

const shot = (id, alt, focal = "50% 45%") => ({ src: `${base}${id}${q}`, alt, focal });

export const images = {
  "hero.home": shot("1590650153855-d9e808231d41", "A loan advisor smiles while reviewing a customer's application at her desk", "50% 40%"),
  "service.personal": shot("1554224155-6726b3ff858f", "Calculator, documents and a pen on a clean wooden desk", "50% 50%"),
  "service.overdraft": shot("1559526324-4b87b5e36e44", "A laptop showing a finance dashboard on a bright desk", "45% 45%"),
  "service.home": shot("1560518883-ce09059eeffa", "House keys resting beside a small model home", "50% 55%"),
  "service.business": shot("1521737604893-d14cc237f11d", "A small business team working together around a table", "50% 45%"),
  "service.transfer": shot("1454165804606-c3d57bc86b40", "Hands reviewing loan documents beside a laptop", "50% 45%"),
  "usecase.medical": shot("1584515933487-779824d29309", "A family member holding a patient's hand with care", "50% 50%"),
  "usecase.travel": shot("1507525428034-b723cf961d3e", "A calm beach at sunset, the kind of trip a planned loan can fund", "50% 55%"),
  "usecase.wedding": shot("1519741497674-611481863552", "A couple at their wedding holding a bouquet", "50% 45%"),
  "usecase.planned": shot("1516321318423-f06f85e504b3", "Hands planning a personal budget on a laptop", "45% 50%"),
  "usecase.other": shot("1522204523234-8729aa6e3d5f", "A tidy flat lay with a plant, notebook and tablet", "50% 50%"),
  "home.purchase": shot("1560448204-e02f11c3d0e2", "A bright, furnished living room in a new home", "50% 50%"),
  "home.construction": shot("1581092160562-40aa08e78837", "An engineer reviewing building plans with tools nearby", "50% 50%"),
  "home.renovation": shot("1581578731548-c64695cc6952", "A person cleaning a bright window during a home renovation", "50% 45%"),
  "home.interior": shot("1522708323590-d24dbb6b0267", "A calm, finished living room interior", "50% 50%"),
  "biz.msme": shot("1441986300917-64674bd600d8", "The interior of a small retail store with stocked shelves", "50% 50%"),
  "biz.machinery": shot("1504328345606-18bbc8c9d7d1", "A metalworker finishing a component with bright sparks", "50% 50%"),
  "biz.retail": shot("1556740738-b6a63e27c4df", "A shopkeeper and customer at a card payment counter", "50% 45%"),
  "biz.services": shot("1521737711867-e3b97375f902", "A consultant explaining figures to a small business owner", "50% 45%"),
  "team.advisor": shot("1560250097-0b93528c311a", "A senior loan advisor in a navy blazer", "50% 35%"),
  "team.support": shot("1573496359142-b8d87734a5a2", "A customer support specialist smiling at her desk", "50% 35%"),
  "popup.personal": shot("1600880292089-90a7e086ee0c", "Two colleagues celebrating progress together at a desk", "50% 45%"),
  "popup.overdraft": shot("1497366754035-f200968a6e72", "A modern open-plan office with glass partitions", "50% 50%"),
  "popup.transfer": shot("1524230572899-a752b3835840", "Clean white arches and stairs in bright daylight", "50% 50%"),
  "about.office": shot("1497366216548-37526070297c", "The Mirvex office floor with plants and natural light", "50% 50%"),
  "about.team": shot("1522071820081-009f0129c71c", "The Mirvex advisory team collaborating at a shared table", "50% 45%"),
  "contact.office": shot("1497215728101-856f4ea42174", "A quiet desk by a window, ready for customer calls", "50% 50%"),
  "how.journey": shot("1531482615713-2afd69097998", "An advisor walking a customer through options on screen", "50% 45%"),
  "emi.desk": shot("1554415707-6e8cfc93fe23", "A calculator, documents and a phone on a desk", "50% 50%"),
  "eligible.desk": shot("1553877522-43269d4ea984", "A borrower comparing numbers on a laptop at home", "50% 45%"),
  "track.desk": shot("1519389950473-47ba0277781c", "A phone, tablet and laptop showing progress on a project", "50% 50%"),
  "about.mission": shot("1556157382-97eda2d62296", "Colleagues talking beside a bright office window", "50% 45%"),
  "about.values": shot("1512917774080-9991f1c4c750", "A modern home exterior with a pool at dusk", "50% 55%"),
  "faq.desk": shot("1573497019940-1c28c88b4f3e", "A professional woman smiling in a grey blazer", "50% 35%"),
  "apply.desk": shot("1533750349088-cd871a92f312", "A person drafting a plan in a notebook beside a laptop", "50% 50%"),
  "legal.desk": shot("1450101499163-c8848c66ca85", "A hand signing a document with a fountain pen", "50% 50%"),
  "grievance.desk": shot("1596526131083-e8c633c948d2", "A smiling support agent wearing a headset", "50% 35%"),
  "demo.desk": shot("1516321318423-f06f85e504b3", "A development workspace with a laptop and plans", "50% 50%"),
  "contact.map": shot("1486406146926-c627a92ad1ab", "Modern office towers against a clear sky", "50% 45%"),
};

export const getImage = (slot) =>
  images[slot] || {
    src: "",
    alt: "Mirvex Loan Assist",
    focal: "50% 50%",
  };

export default images;
