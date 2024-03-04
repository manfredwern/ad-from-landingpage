import { Metadata } from '@/app/interfaces';
import { getImageExtension } from '@/app/utils/htmlParser';
import { indexHtmlMarkup } from '@/app/utils/htmlTemplate';
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
      //   const contentType = imageResponse.headers.get('content-type');
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
