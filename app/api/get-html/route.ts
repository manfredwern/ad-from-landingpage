export async function POST(request: Request) {
  const res = await request.json();
  const { url } = res;

  if (!url) {
    return new Response('SERVER ERROR');
  }

  const response = await fetch(url, { method: 'GET' });
  const htmlContent = await response.text();

  return Response.json({ data: htmlContent });
}
