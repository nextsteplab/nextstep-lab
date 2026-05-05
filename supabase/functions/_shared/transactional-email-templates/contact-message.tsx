import * as React from 'npm:react@18.3.1'
import {
  Html, Head, Body, Container, Heading, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const Email = (p: Props) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', maxWidth: '600px' }}>
        <Heading style={{ color: '#000', borderBottom: '3px solid #2563eb', paddingBottom: '8px' }}>
          New Contact Message
        </Heading>
        <Section style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '6px', marginTop: '16px' }}>
          <Text><strong>Name:</strong> {p.name || '—'}</Text>
          <Text><strong>Email:</strong> {p.email || '—'}</Text>
          <Text><strong>Phone:</strong> {p.phone || '—'}</Text>
          <Text><strong>Message:</strong></Text>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{p.message || '—'}</Text>
        </Section>
        <Hr />
        <Text style={{ fontSize: '12px', color: '#666' }}>NextStep Lab</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Props) => `New Contact Message — ${d.name || 'Unknown'}`,
  displayName: 'Contact Form Message',
  to: 'info@nextsteplab.org',
  previewData: { name: 'Jane Doe', email: 'jane@example.com', phone: '(806) 555-0199', message: 'Hi, I have a question.' },
} satisfies TemplateEntry
