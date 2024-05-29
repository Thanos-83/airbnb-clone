// import {
//   Body,
//   Button,
//   Container,
//   Column,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Img,
//   Link,
//   Preview,
//   Row,
//   Section,
//   Text,
// } from '@react-email/components';
// import { Tailwind } from '@react-email/tailwind';
// import * as React from 'react';

// export const MagicLinkEmail = ({ identifier, url }) => {
//   return (
//     <Html>
//       <Head />
//       <Preview>This is a preview text</Preview>
//       <Tailwind>
//         <Body className='bg-white my-auto mx-auto font-sans px-2'>
//           <Heading>This is the identifier: {identifier}</Heading>
//           <Heading>This is the magic link:</Heading>
//           <Link href={url}>Click the Link</Link>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// export default MagicLinkEmail;

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { Tailwind } from '@react-email/tailwind';

const MagicLinkEmail = ({ identifier, url }) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Tailwind>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://${process.env.SITE_URL}/images/logo.png`}
            width={48}
            height={48}
            alt='airbnb clone'
          />
          <Heading style={heading}>🪄 Your magic link</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link style={link} href={url}>
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              If you didn &apos; t request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br /> - Thanos Team
          </Text>
          <Hr style={hr} />
          <Img
            src={`https://${process.env.SITE_URL}/images/airbnb-logo-mobile.png`}
            width={32}
            height={32}
            alt='airbnb clone'
            style={{
              WebkitFilter: 'grayscale(100%)',
              filter: 'grayscale(100%)',
              margin: '20px 0',
            }}
          />
          <Text style={footer}>Thanos Web Dev Technologies Inc.</Text>
          <Text style={footer}>
            2093 Philadelphia Pike #3222, Athens, DE 19703
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default MagicLinkEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#FF6363',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
