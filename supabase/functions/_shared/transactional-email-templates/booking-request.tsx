import * as React from 'npm:react@18.3.1'
import {
  Html, Head, Body, Container, Heading, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  fullName?: string
  phone?: string
  email?: string
  service?: string
  location?: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

const Email = (p: Props) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', maxWidth: '600px' }}>
        <Heading style={{ color: '#000', borderBottom: '3px solid #ec4899', paddingBottom: '8px' }}>
          New Appointment Request
        </Heading>
        <Text>A new booking request has been submitted on nextsteplab.org.</Text>
        <Section style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '6px', marginTop: '16px' }}>
          <Text><strong>Name:</strong> {p.fullName || '—'}</Text>
          <Text><strong>Phone:</strong> {p.phone || '—'}</Text>
          <Text><strong>Email:</strong> {p.email || '—'}</Text>
          <Text><strong>Service:</strong> {p.service || '—'}</Text>
          <Text><strong>Location:</strong> {p.location || '—'}</Text>
          <Text><strong>Preferred Date:</strong> {p.preferredDate || '—'}</Text>
          <Text><strong>Preferred Time:</strong> {p.preferredTime || '—'}</Text>
          {p.notes && <Text><strong>Notes:</strong> {p.notes}</Text>}
        </Section>
        <Hr />
        <Text style={{ fontSize: '12px', color: '#666' }}>
          NextStep Lab & Drug Testing Services LLC
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Props) => `New Appointment Request — ${d.fullName || 'Unknown'}`,
  displayName: 'Booking Request Notification',
  to: 'info@nextsteplab.org',
  previewData: {
    fullName: 'Jane Doe', phone: '(806) 555-0199', email: 'jane@example.com',
    service: 'Drug Test', location: '123 Main St, Lubbock TX',
    preferredDate: '2026-05-10', preferredTime: '10:00', notes: 'Please call ahead.',
  },
} satisfies TemplateEntry
