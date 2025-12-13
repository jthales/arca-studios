export interface ContactPerson {
  name: string;
  email: string;
  role?: string;
}

export interface SocialLink {
  network: string;
  url: string;
  handle?: string;
}

export interface ContactDirectory {
  primary: ContactPerson[];
  social: SocialLink[];
}

