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
  const metaProperties = ['url', 'title', 'image', 'description', 'type', 'image:alt', 'site_name'];

  metadata.forEach(metaElement => {
    let prop = (metaElement.name || metaElement.property)?.replace(/^(\w+):/, '');

    if (metaProperties.includes(prop)) {
      prop = convertToCamelCase(prop);
      data[prop as keyof Metadata] = metaElement.content;
    }
  });

  return data;
};

export const convertToCamelCase = (input: string): string => {
  // Split the input string by 'separatorString'
  const parts = input.split(/[:\-_]/);

  // Convert each part to camel case, except the first part
  const camelCaseParts = parts.map((part, index) => {
    if (index === 0) {
      return part;
    } else {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
  });

  // Join the parts back together and return
  return camelCaseParts.join('');
};

export const getImageExtension = (imageUrl: string): string => {
  const originalExtension = imageUrl.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i);
  return originalExtension ? originalExtension[1] : '';
};
