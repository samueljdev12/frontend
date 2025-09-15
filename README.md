# QuickMeet - AI-Powered Meeting Agenda Generator

QuickMeet is a modern web application that instantly generates professional, structured meeting agendas using AI. Simply enter a meeting title, and our AI will create a tailored agenda that you can edit, save, and share with meeting participants.

## ✨ Features

- **AI-Powered Generation**: Uses DeepSeek AI to create professional meeting agendas based on your meeting title
- **Smart Validation**: Ensures meaningful meeting titles for better AI results
- **Inline Editing**: Edit agenda sections (opening, topics, wrap-up) directly in the interface
- **Dynamic Topics**: Add, remove, or modify discussion topics with custom durations
- **Persistent Storage**: Save agendas to Supabase database for future access
- **Shareable Links**: Generate unique URLs to share agendas with meeting participants
- **Modern UI**: Clean, minimal interface built with Next.js and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- DeepSeek API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd QuickMeet/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # DeepSeek AI Configuration
   DEEPSEEK_API_KEY=your_deepseek_api_key
   AI_PROVIDER=deepseek
   AI_MODEL=deepseek-chat
   AI_BASE_URL=https://api.deepseek.com/v1
   ```

4. **Set up Supabase database**
   Create a table called `agendas` with the following schema:
   ```sql
   CREATE TABLE agendas (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content JSONB NOT NULL,
     share_token TEXT UNIQUE DEFAULT gen_random_uuid()::text,
     user_id UUID,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Enter Meeting Title**: Type a descriptive meeting title (e.g., "Sprint Planning", "Q3 Sales Review")
2. **Generate Agenda**: Click "Generate Agenda" to create an AI-powered agenda
3. **Edit Content**: Use the inline edit buttons to modify opening, topics, or wrap-up sections
4. **Add Topics**: Click "Edit" on topics section to add, remove, or modify discussion points
5. **Save Agenda**: Click "Save Agenda" to store it in the database
6. **Share**: Click "Copy URL" to copy the shareable link to your clipboard

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: DeepSeek API (OpenAI compatible)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/generate-agenda/    # AI agenda generation API
│   │   └── page.tsx                # Main application page
│   ├── components/
│   │   ├── agenda/
│   │   │   └── AgendaDisplay.tsx   # Agenda display and editing
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Reusable button component
│   │   │   └── Input.tsx           # Reusable input component
│   │   └── MeetingInput.tsx        # Meeting title input
│   ├── lib/
│   │   ├── aiConfig.ts             # AI provider configuration
│   │   ├── agendaService.ts        # Supabase agenda operations
│   │   └── supabase.ts             # Supabase client setup
│   └── types/
│       └── agenda.ts               # TypeScript type definitions
```

## 🔧 Configuration

### AI Provider Setup

QuickMeet supports multiple AI providers through environment variables:

- **DeepSeek** (default): Set `AI_PROVIDER=deepseek`
- **OpenAI**: Set `AI_PROVIDER=openai` and update `AI_BASE_URL`
- **Custom**: Modify `aiConfig.ts` for other OpenAI-compatible APIs

### Database Schema

The `agendas` table stores:
- `id`: Unique identifier
- `title`: Meeting title
- `content`: JSON structure with opening, topics, and wrap-up
- `share_token`: Unique token for sharing
- `user_id`: Optional user association
- `created_at`/`updated_at`: Timestamps

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](../LICENSE).

The MIT License is an OSI-approved open source license that allows others to:
- Use the software for any purpose
- Modify and distribute the software
- Include the software in proprietary products
- Sell the software

The only requirement is that the original copyright notice and license text must be included in all copies or substantial portions of the software.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Check the [setup instructions](SETUP_INSTRUCTIONS.md)
- Review the [environment setup guide](ENVIRONMENT_SETUP.md)

---

**QuickMeet** - Making meeting preparation effortless with AI ✨