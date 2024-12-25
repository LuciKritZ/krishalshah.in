import * as React from 'react';

import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Img,
} from '@react-email/components';

import { siteConfig } from '@/config';

interface ContactUsEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

const baseUrl = process.env.APP_URL ?? '';

export const ContactUsEmailTemplate = ({
  name = 'Dear Human',
  email,
  message = 'Demo Message',
}: ContactUsEmailTemplateProps) => (
  <Html className='py-24'>
    <Head />
    <Preview>Thank you for reaching out to me, {name}!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Link href={baseUrl}>
            <Heading style={h2}>{siteConfig.name}</Heading>
          </Link>
        </Section>
        <Heading style={h1}>Thank you reaching out to me, {name}!</Heading>
        <Text style={heroText}>
          I have received your message and I will contact you shortly.
        </Text>

        <Section>
          <Text style={contactFormMessage}>
            P.S: You conveyed the following message through the contact form:
          </Text>
          <Text style={contactFormMessage}>{message}</Text>
          <Text style={contactFormEmail}>- {email}</Text>
        </Section>

        <Text style={text}>
          If you did not enter your details on{' '}
          <Link href={baseUrl}>krishalshah.in</Link>, there&apos;s nothing to
          worry about, you can safely ignore it.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: '66%' }}>
              <Link href={baseUrl}>
                <Heading style={h2}>{siteConfig.name}</Heading>
              </Link>
            </Column>
            <Column>
              <Section>
                <Row>
                  {/* Github */}
                  <Column>
                    <Link
                      style={socialMediaIcon}
                      href={siteConfig.links.github}
                    >
                      <Img
                        src={`${baseUrl}/images/github.png`}
                        width={20}
                        height={20}
                      />
                    </Link>
                  </Column>
                  <Column>
                    {/* Linkedin */}
                    <Link
                      style={socialMediaIcon}
                      href={siteConfig.links.linkedin}
                    >
                      <Img
                        src={`${baseUrl}/images/linked-in.png`}
                        width={20}
                        height={20}
                      />
                    </Link>
                  </Column>
                  {/* Twitter */}
                  <Column>
                    <Link
                      style={socialMediaIcon}
                      href={siteConfig.links.twitter}
                    >
                      <Img
                        src={`${baseUrl}/images/twitter.png`}
                        width={20}
                        height={20}
                      />
                    </Link>
                  </Column>
                  {/* Instagram */}
                  <Column>
                    <Link
                      style={socialMediaIcon}
                      href={siteConfig.links.instagram}
                    >
                      <Img
                        src={`${baseUrl}/images/instagram.png`}
                        width={20}
                        height={20}
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
            Made with ♥️ by Krishal Shah
            <br />
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactUsEmailTemplate;

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'center' as const,
  marginBottom: '50px',
};

const footerLogos = {
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%',
};

const socialMediaIcon = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  fill: 'white',
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '0px 20px',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const h2 = {
  color: '#1d1c1d',
  fontSize: '20px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};

const contactFormMessage = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '20px',
};

const contactFormEmail = {
  color: '#000',
  fontSize: '14px',
  marginBottom: '16px',
  textAlign: 'right' as const,
};
