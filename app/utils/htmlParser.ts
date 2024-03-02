import { Metadata } from '@/interfaces';

export interface HTMLMetadata {
  title?: string | null;
  meta?: { [key: string]: string }[];
  // Add more metadata properties as needed
}

export const parseHTML = (htmlString: string): HTMLMetadata | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  if (!doc) {
    return null;
  }

  const titleElement = doc.querySelector('title');
  const title = titleElement?.textContent;
  console.log('title', doc);
  const metaElements = doc.querySelectorAll('meta');
  const meta: { [key: string]: string }[] = [];
  metaElements.forEach(metaElement => {
    const metaAttributes = metaElement.attributes;
    const metaObj: { [key: string]: string } = {};
    for (let i = 0; i < metaAttributes.length; i++) {
      const attr = metaAttributes[i];
      metaObj[attr.name] = attr.value;
    }
    meta.push(metaObj);
  });

  return { title, meta };
};

export const parseMetadata = (metadata: { [key: string]: string }[]): Metadata => {
  let data = {} as Metadata;
  const metaProperties = ['url', 'title', 'image', 'description', 'type'];

  metadata.forEach(metaElement => {
    const prop = (metaElement.name || metaElement.property)?.replace(/^(.*):/g, '');
    if (metaProperties.includes(prop)) {
      data[prop as keyof Metadata] = metaElement.content;
    }
  });

  return data;
};
