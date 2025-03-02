export type SliderImage = {
  description: string;
  image: string;
};

export type EditableSliderImage = SliderImage & {
  id: number;
  isNew?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type EditableFAQItem = FAQItem & {
  id: number;
  isNew?: boolean;
};

export type ReasonItem = {
  reason_id: number;
  title: string;
  description: string;
};

export type EditableReasonItem = ReasonItem & {
  id: number;
  isNew?: boolean;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  [key: string]: string;
};

export type EditableContactInfo = ContactInfo & {
  id?: number;
}; 