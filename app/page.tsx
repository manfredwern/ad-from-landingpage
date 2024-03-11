import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-6 text-center text-4xl font-bold">Adify: Ad Creation Made Easy</h1>
        <p className="mb-8 text-center text-lg">Transform Landing Pages into Eye-Catching Ads</p>
        <Link href="/main">
          <span className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-blue-600">Get Started</span>
        </Link>
      </div>
    </main>
  );
}
