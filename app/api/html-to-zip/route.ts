import { Metadata } from '@/interfaces';
import { getImageExtension } from '@/utils/htmlParser';
import { indexHtmlMarkup } from '@/utils/htmlTemplate';
import JSZip from 'jszip';

export async function POST(request: Request): Promise<Response> {
  const metadataRes = (await request.json()) as Metadata;
  const { url, image } = metadataRes;
  if (!url) {
    return new Response('SERVER ERROR');
  }

  const zip = new JSZip();

  // Save image as file
  try {
    const imageResponse = await fetch(encodeURI(image), { cache: 'no-store' });
    if (imageResponse.ok) {
      const imageBlob = await imageResponse.blob();
      zip.file(`ad-image.${getImageExtension(image)}`, imageBlob.arrayBuffer());
    }
  } catch (error) {}

  const indexHtml = indexHtmlMarkup(metadataRes);

  // Create index.html
  zip.file('index.html', indexHtml);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const headers = {
    'Content-Type': 'application/zip',
    'Content-Disposition': 'attachement; filename=ad-ladingpage.zip'
  };

  return new Response(zipBlob, { headers });
}
