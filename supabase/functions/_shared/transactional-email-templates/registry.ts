import * as React from 'npm:react@18.3.1'
import { template as bookingRequest } from './booking-request.tsx'
import { template as contactMessage } from './contact-message.tsx'
import { template as bookingPaid } from './booking-paid.tsx'
import { template as bookingConfirmation } from './booking-confirmation.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'booking-request': bookingRequest,
  'contact-message': contactMessage,
  'booking-paid': bookingPaid,
  'booking-confirmation': bookingConfirmation,
}
