export interface Metadata {
  url: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  type?: string;
  siteName: string;
}

export type HTMLMetadataEntry = { [key: string]: string };
export interface HTMLMetadata {
  title?: string | null;
  meta?: HTMLMetadataEntry[];
  // Add more metadata properties as needed
}
