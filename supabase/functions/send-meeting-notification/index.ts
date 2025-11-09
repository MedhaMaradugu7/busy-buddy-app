import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  meetingId: string;
  type: 'created' | 'updated' | 'cancelled';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { meetingId, type }: NotificationRequest = await req.json();

    console.log(`Processing notification for meeting ${meetingId}, type: ${type}`);

    // Fetch meeting details
    const { data: meeting, error: meetingError } = await supabase
      .from('meetings')
      .select(`
        *,
        created_by_profile:profiles!meetings_created_by_fkey(full_name, email)
      `)
      .eq('id', meetingId)
      .single();

    if (meetingError) throw meetingError;

    // Fetch participants
    const { data: participants, error: participantsError } = await supabase
      .from('meeting_participants')
      .select(`
        user:profiles(full_name, email)
      `)
      .eq('meeting_id', meetingId);

    if (participantsError) throw participantsError;

    // Log notification (in a real app, this would send actual emails)
    const notifications = participants?.map((p: any) => ({
      recipient: p.user.email,
      subject: `Meeting ${type}: ${meeting.title}`,
      body: `
        Meeting Details:
        Title: ${meeting.title}
        Venue: ${meeting.venue}
        Start: ${new Date(meeting.start_time).toLocaleString()}
        End: ${new Date(meeting.end_time).toLocaleString()}
        Purpose: ${meeting.purpose || 'N/A'}
        Organizer: ${meeting.created_by_profile.full_name}
      `
    }));

    console.log('Notifications prepared:', notifications);

    return new Response(
      JSON.stringify({ 
        success: true, 
        notificationsSent: notifications?.length || 0,
        notifications 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error: any) {
    console.error('Error in send-meeting-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
