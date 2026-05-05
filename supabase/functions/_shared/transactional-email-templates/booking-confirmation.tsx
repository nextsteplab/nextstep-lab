import * as React from 'npm:react@18.3.1'
import {
  Html, Head, Body, Container, Heading, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  fullName?: string; service?: string; location?: string;
  preferredDate?: string; preferredTime?: string; amountPaid?: string;
}

const Email = (p: Props) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', maxWidth: '600px' }}>
        <Heading style={{ color: '#000', borderBottom: '3px solid #2563eb', paddingBottom: '8px' }}>
          Appointment Confirmed
        </Heading>
        <Text>Hi {p.fullName || 'there'},</Text>
        <Text>
          Thank you for booking with NextStep Lab. Your payment of <strong>{p.amountPaid}</strong> has been received and your appointment is locked in.
        </Text>
        <Section style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '6px', marginTop: '16px' }}>
          <Text><strong>Service:</strong> {p.service || '—'}</Text>
          <Text><strong>Date:</strong> {p.preferredDate || '—'}</Text>
          <Text><strong>Time:</strong> {p.preferredTime || '—'}</Text>
          <Text><strong>Location:</strong> {p.location || '—'}</Text>
        </Section>
        <Text style={{ marginTop: '16px' }}>
          We will reach out shortly to confirm details. If you need to reach us, call (806) 304-3424 or reply to this email.
        </Text>
        <Hr />
        <Text style={{ fontSize: '12px', color: '#666' }}>
          NextStep Lab & Drug Testing Services LLC — Mobile lab serving Lubbock, TX.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Props) => `Your NextStep Lab appointment is confirmed${d.amountPaid ? ` (${d.amountPaid})` : ''}`,
  displayName: 'Customer Booking Confirmation',
  previewData: {
    fullName: 'Jane Doe', service: 'Rapid 5 Panel Drug Screen',
    location: '123 Main St, Lubbock TX', preferredDate: '2026-05-10',
    preferredTime: '10:00', amountPaid: '$55.00',
  },
} satisfies TemplateEntry
