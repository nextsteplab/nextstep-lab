import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
  }
  return _supabase;
}

function formatAmount(cents: number | null | undefined, currency = 'usd'): string {
  if (cents == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100);
}

async function sendEmail(templateName: string, templateData: Record<string, any>, recipientEmail?: string) {
  try {
    const supabase = getSupabase();
    await supabase.functions.invoke('send-transactional-email', {
      body: { templateName, templateData, ...(recipientEmail && { recipientEmail }) },
    });
  } catch (e) {
    console.error(`Failed to send ${templateName}:`, e);
  }
}

async function handleCheckoutCompleted(session: any) {
  const supabase = getSupabase();
  const bookingId = session.metadata?.booking_id;
  if (!bookingId) {
    console.error('checkout.session.completed missing booking_id metadata', session.id);
    return;
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'paid',
      stripe_payment_intent: session.payment_intent ?? null,
      paid_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .select('*')
    .single();

  if (error || !booking) {
    console.error('Failed to update booking', bookingId, error);
    return;
  }

  const amountPaid = formatAmount(session.amount_total ?? booking.amount_cents, session.currency || 'usd');

  // Notify admin
  await sendEmail('booking-paid', {
    fullName: booking.full_name,
    phone: booking.phone,
    email: booking.email,
    service: booking.service_label,
    location: booking.location,
    preferredDate: booking.preferred_date,
    preferredTime: booking.preferred_time,
    notes: booking.notes,
    amountPaid,
    sessionId: session.id,
  });

  // Confirmation to customer
  await sendEmail('booking-confirmation', {
    fullName: booking.full_name,
    service: booking.service_label,
    location: booking.location,
    preferredDate: booking.preferred_date,
    preferredTime: booking.preferred_time,
    amountPaid,
  }, booking.email);
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get('env');
  if (rawEnv !== 'sandbox' && rawEnv !== 'live') {
    console.error('payments-webhook invalid env:', rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: 'invalid env' }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  }
  const env: StripeEnv = rawEnv;

  try {
    const event = await verifyWebhook(req, env);
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'checkout.session.async_payment_failed':
      case 'checkout.session.expired': {
        const session = event.data.object;
        const bookingId = session.metadata?.booking_id;
        if (bookingId) {
          await getSupabase().from('bookings')
            .update({ payment_status: 'failed' })
            .eq('id', bookingId);
        }
        break;
      }
      default:
        console.log('Unhandled event:', event.type);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Webhook error:', e);
    return new Response('Webhook error', { status: 400 });
  }
});
