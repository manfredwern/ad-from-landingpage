export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(request: Request) {
  const res = await request.json();
  const { url } = res;
  console.log('SERVER ', url);
  if (!url) {
    return new Response('SERVER ERROR');
  }

  const response = await fetch(url, { method: 'GET' });
  const htmlContent = await response.text();

  return Response.json({ data: htmlContent });
}
