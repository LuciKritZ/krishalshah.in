import Section from '@/components/atoms/section';
import Marquee from '@/components/molecules/marquee';
import { EXPERIENCES } from '@/config';

const TrustedBy = () => {
  // Get unique companies with their links
  const companies = Array.from(
    new Map(
      EXPERIENCES.map(exp => [
        exp.companyShortName || exp.companyName,
        exp.companyLink,
      ])
    ).entries()
  ).map(([name, link]) => ({ link, name }));

  return (
    <Section className='border-y border-border bg-surface/50 py-ui-xl md:py-ui-2xl'>
      <div className='container overflow-hidden'>
        <div className='flex flex-col items-center gap-ui-xl md:flex-row md:gap-ui-2xl'>
          <span className='micro-text shrink-0 text-content-tertiary md:border-r md:border-border md:pr-ui-2xl'>
            Trusted By
          </span>
          <div className='relative flex flex-1 items-center overflow-hidden footer-mask'>
            <Marquee className='py-2' duration={60}>
              {companies.map((company, i) => (
                <a
                  className='font-display text-2xl font-bold tracking-tighter text-content-secondary/60 transition-colors hover:text-brand md:text-4xl lg:text-5xl'
                  href={company.link}
                  key={`${company.name}-${i}`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {company.name.toUpperCase()}
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TrustedBy;
