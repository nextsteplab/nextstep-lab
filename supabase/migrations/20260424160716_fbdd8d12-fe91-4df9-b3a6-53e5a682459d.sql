-- Add RLS policies for the private 'locations' storage bucket
-- Files must be stored under a folder named after the user's id: {user_id}/filename

CREATE POLICY "Users can view their own location files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'locations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own location files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'locations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own location files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'locations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own location files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'locations' AND auth.uid()::text = (storage.foldername(name))[1]);