# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration (for future API integration)
OPENAI_API_KEY=your_openai_api_key
```

## How to Get Supabase Credentials

1. **Go to your Supabase project dashboard**
2. **Navigate to Settings > API**
3. **Copy the following:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys > anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Example .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-...
```

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe to expose in the browser
- ❌ Never commit `.env.local` to version control
- ✅ Use `.env.example` for sharing the required structure
- ✅ Add `.env.local` to `.gitignore`

## Database Setup

Make sure your Supabase `agendas` table is created with the following structure:

- `id` (uuid, primary key)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
- `user_id` (uuid, nullable)
- `meeting_title` (text)
- `opening` (text)
- `topics` (jsonb)
- `wrap_up` (text)
- `is_public` (boolean)
- `share_token` (text, unique, auto-generated)
- `view_count` (integer)
- `meeting_date` (timestamptz, nullable)
- `meeting_duration` (integer, nullable)
- `tags` (text[], nullable)
- `notes` (text, nullable)
