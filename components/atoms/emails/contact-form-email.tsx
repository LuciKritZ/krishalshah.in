import * as React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from 'react-email';

import { siteConfig } from '@/config';

interface ContactUsEmailTemplateProps {
  email: string;
  message: string;
  name: string;
}

const baseUrl = process.env.APP_URL || 'https://krishalshah.in';

export const ContactUsEmailTemplate = ({
  email,
  message = 'Demo Message',
  name = 'Dear Human',
}: ContactUsEmailTemplateProps) => (
  <Html lang='en'>
    <Head>
      <meta content='light dark' name='color-scheme' />
      <meta content='light dark' name='supported-color-schemes' />
      <style>
        {`
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
          body {
            background-color: #ffffff !important;
            color: #1a1a1a !important;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #1a1a1a !important;
              color: #ffffff !important;
            }
            .theme-invert {
              filter: invert(100%) !important;
            }
            .dark-text {
              color: #ffffff !important;
            }
            .light-text {
              color: #b7b7b7 !important;
            }
            .message-box {
              border-color: #333333 !important;
            }
          }
        `}
      </style>
    </Head>
    <Preview>Thank you for reaching out to me, {name}!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Link
            href={baseUrl}
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            <Img
              alt={siteConfig.name}
              height='38'
              src='cid:logo-image'
              width='120'
            />
          </Link>
        </Section>
        <Heading className='dark-text' style={h1}>
          Thank you reaching out to me, {name}!
        </Heading>
        <Text className='light-text' style={heroText}>
          I have received your message and I will contact you shortly.
        </Text>

        <Section className='message-box' style={messageSection}>
          <Text className='light-text' style={contactFormLabel}>
            P.S: You conveyed the following message through the contact form:
          </Text>
          <Text className='dark-text' style={contactFormMessage}>
            {message}
          </Text>
          <Link href={`mailto:${email}`} style={contactFormEmail}>
            - {email}
          </Link>
        </Section>

        <Text style={text}>
          If you did not enter your details on{' '}
          <Link href={baseUrl} style={link}>
            krishalshah.in
          </Link>
          , there&apos;s nothing to worry about, you can safely ignore it.
        </Text>

        <Section style={footerSeparator}>
          <Row style={footerLogos}>
            <Column style={{ width: '66%' }}>
              <Link
                href={baseUrl}
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                <Img
                  alt={siteConfig.name}
                  height='38'
                  src='cid:logo-image'
                  width='120'
                />
              </Link>
            </Column>
            <Column>
              <Section>
                <Row>
                  {/* Github */}
                  <Column>
                    <Link
                      href={siteConfig.links.github}
                      style={socialMediaIcon}
                    >
                      <Img
                        className='theme-invert'
                        height={20}
                        src='cid:github-icon'
                        width={20}
                      />
                    </Link>
                  </Column>
                  <Column>
                    {/* Linkedin */}
                    <Link
                      href={siteConfig.links.linkedin}
                      style={socialMediaIcon}
                    >
                      <Img
                        className='theme-invert'
                        height={20}
                        src='cid:linkedin-icon'
                        width={20}
                      />
                    </Link>
                  </Column>
                  {/* Twitter */}
                  <Column>
                    <Link
                      href={siteConfig.links.twitter}
                      style={socialMediaIcon}
                    >
                      <Img
                        className='theme-invert'
                        height={20}
                        src='cid:twitter-icon'
                        width={20}
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
          </Row>
        </Section>

        <Section>
          <Text style={footerText}>
            Made with ❤️ by Krishal Shah
            <br />
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactUsEmailTemplate;

const footerLogos = {
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%',
};

const socialMediaIcon = {
  display: 'inline-block',
  height: 20,
  width: 20,
};

const main = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  margin: '0 auto',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  width: '580px',
};

const logoContainer = {
  marginBottom: '40px',
  marginTop: '32px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '42px',
  fontWeight: '800',
  letterSpacing: '-0.04em',
  lineHeight: '1.1',
  margin: '0 0 32px 0',
  padding: '0',
};

const heroText = {
  color: '#666666',
  fontSize: '20px',
  lineHeight: '1.5',
  marginBottom: '40px',
};

const text = {
  color: '#b7b7b7',
  fontSize: '14px',
  lineHeight: '1.6',
};

const link = {
  color: '#00d1ff',
  textDecoration: 'underline',
};

const contactFormLabel = {
  color: '#666666',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '12px',
  marginTop: '0',
};

const contactFormMessage = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.6',
  marginBottom: '16px',
};

const contactFormEmail = {
  color: '#bf5af2',
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '0',
  textAlign: 'right' as const,
  textDecoration: 'underline',
};

const messageSection = {
  backgroundColor: 'transparent',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  marginBottom: '40px',
  padding: '24px',
};

const footerSeparator = {
  borderTop: '1px solid #333333',
  marginTop: '40px',
  paddingTop: '32px',
};

const footerText = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '15px',
  marginBottom: '50px',
  textAlign: 'center' as const,
};
