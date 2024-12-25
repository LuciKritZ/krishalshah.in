import { Rss } from 'lucide-react';
import Link from 'next/link';

const SiteActions = () => (
  <div className='hidden gap-2 sm:flex md'>
    <Link href='/rss' target='_blank'>
      <Rss className='size-4' />
    </Link>

    {/* Show login and logout functionalities in future */}
  </div>
);

export default SiteActions;
