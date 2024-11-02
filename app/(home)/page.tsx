import Introduction from './_sections/introduction';
import RecentPosts from './_sections/recent-posts';

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container max-w-3xl'>
        <Introduction />

        <RecentPosts />
      </div>
    </section>
  );
}
