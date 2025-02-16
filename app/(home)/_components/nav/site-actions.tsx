import { Rss } from 'lucide-react';

import EventLink from '@/components/event-link';

const SiteActions = () => (
  <div className='hidden gap-2 sm:flex md'>
    <EventLink eventName='Clicked on RSS link' href='/rss' target='_blank'>
      <Rss className='size-4' />
    </EventLink>

    {/* Show login and logout functionalities in future */}
  </div>
);

export default SiteActions;
