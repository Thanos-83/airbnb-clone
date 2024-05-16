import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

export const MagicLinkEmail = ({ identifier, url }) => {
  return (
    <Html>
      <Head />
      <Preview>This is a preview text</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Heading>This is the identifier: {identifier}</Heading>
          <Heading>This is the magic link:</Heading>
          <Link href={url}>Click the Link</Link>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
