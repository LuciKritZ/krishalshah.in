import EventLink from '@/components/event-link';
import SocialLink from '@/components/social-link';
import { siteConfig } from '@/config';

const Footer = () => (
  <footer className='mt-auto border-t border-border px-6 py-12'>
    <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row'>
      <div className='flex flex-wrap justify-center gap-6'>
        {siteConfig.socialLinks.map(socialLinkProps => (
          <SocialLink key={socialLinkProps._id} {...socialLinkProps} />
        ))}
      </div>

      <div className='flex flex-col items-center gap-2 text-center md:items-end md:text-right'>
        <div className='text-[10px] font-bold uppercase tracking-widest text-content-tertiary md:text-xs'>
          <EventLink
            className='transition-colors hover:text-content-primary'
            eventName='Clicked on Copyright link from footer'
            href={siteConfig.links.github}
            target='_blank'
          >
            © {new Date().getFullYear()} {siteConfig.fullName.toUpperCase()}
          </EventLink>
        </div>
        <div className='text-[10px] font-bold uppercase leading-relaxed tracking-widest text-content-tertiary md:text-xs'>
          CRAFTED IN DARK MODE WITH{' '}
          <span className='text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]'>
            BRIGHT IDEAS
          </span>{' '}
          AND{' '}
          <span className='group/commit inline-flex cursor-default items-center whitespace-nowrap underline decoration-border underline-offset-4 text-content-primary transition-all duration-300 hover:text-emerald-400 hover:decoration-emerald-400/50 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]'>
            CLEAN COMMITS
            <span className='ml-0 max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/commit:ml-1 group-hover/commit:max-w-[20px] group-hover/commit:opacity-100'>
              ✨
            </span>
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
