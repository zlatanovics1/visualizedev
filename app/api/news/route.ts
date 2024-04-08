const REVALIDATE_TIME = 13000;

// news-sources=https://www.bbc.co.uk,https://cnn.com,https://www.vox.com&number=15`,

export async function GET(req: Request) {
  const techPromise = fetch(`${process.env.NEWS_API_URL}&text=frontend`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  const programmingPromise = fetch(`${process.env.NEWS_API_URL}&text=backend`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  const aiPromise = fetch(
    `${process.env.NEWS_API_URL}&text=artificial+intelligenceORchatgpt`,
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
  const res = await Promise.all([techPromise, programmingPromise, aiPromise]);
  const data = await Promise.all(res.map((res) => res.json()));
  // const data = await res.json();

  return Response.json({ data });
}
