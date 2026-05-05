import * as React from 'npm:react@18.3.1'
import {
  Html, Head, Body, Container, Heading, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  fullName?: string; phone?: string; email?: string; service?: string;
  location?: string; preferredDate?: string; preferredTime?: string; notes?: string;
  amountPaid?: string; sessionId?: string;
}

const Email = (p: Props) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', maxWidth: '600px' }}>
        <Heading style={{ color: '#000', borderBottom: '3px solid #16a34a', paddingBottom: '8px' }}>
          ✅ PAID Booking — {p.amountPaid}
        </Heading>
        <Text>A customer just paid online and locked in an appointment.</Text>
        <Section style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '6px', marginTop: '16px' }}>
          <Text><strong>Name:</strong> {p.fullName || '—'}</Text>
          <Text><strong>Phone:</strong> {p.phone || '—'}</Text>
          <Text><strong>Email:</strong> {p.email || '—'}</Text>
          <Text><strong>Service:</strong> {p.service || '—'}</Text>
          <Text><strong>Amount Paid:</strong> {p.amountPaid || '—'}</Text>
          <Text><strong>Location:</strong> {p.location || '—'}</Text>
          <Text><strong>Preferred Date:</strong> {p.preferredDate || '—'}</Text>
          <Text><strong>Preferred Time:</strong> {p.preferredTime || '—'}</Text>
          {p.notes && <Text><strong>Notes:</strong> {p.notes}</Text>}
          <Text style={{ fontSize: '11px', color: '#666' }}><strong>Stripe session:</strong> {p.sessionId}</Text>
        </Section>
        <Hr />
        <Text style={{ fontSize: '12px', color: '#666' }}>NextStep Lab & Drug Testing Services LLC</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Props) => `PAID — ${d.fullName || 'Booking'} — ${d.amountPaid || ''}`,
  displayName: 'Booking Paid Notification',
  to: 'info@nextsteplab.org',
  previewData: {
    fullName: 'Jane Doe', phone: '(806) 555-0199', email: 'jane@example.com',
    service: 'Rapid 5 Panel Drug Screen', amountPaid: '$55.00',
    location: '123 Main St, Lubbock TX', preferredDate: '2026-05-10',
    preferredTime: '10:00', sessionId: 'cs_test_123',
  },
} satisfies TemplateEntry
