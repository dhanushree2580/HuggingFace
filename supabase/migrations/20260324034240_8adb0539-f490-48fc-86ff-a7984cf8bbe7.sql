-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Models table
CREATE TABLE public.models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  task TEXT,
  framework TEXT,
  likes INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  readme_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public models are viewable by everyone" ON public.models
  FOR SELECT USING (NOT is_private OR auth.uid() = owner_id);
CREATE POLICY "Users can create their own models" ON public.models
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own models" ON public.models
  FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own models" ON public.models
  FOR DELETE USING (auth.uid() = owner_id);

CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON public.models
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Datasets table
CREATE TABLE public.datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  task TEXT,
  likes INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  readme_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public datasets are viewable by everyone" ON public.datasets
  FOR SELECT USING (NOT is_private OR auth.uid() = owner_id);
CREATE POLICY "Users can create their own datasets" ON public.datasets
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own datasets" ON public.datasets
  FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own datasets" ON public.datasets
  FOR DELETE USING (auth.uid() = owner_id);

CREATE TRIGGER update_datasets_updated_at BEFORE UPDATE ON public.datasets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Spaces table
CREATE TABLE public.spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  sdk_type TEXT,
  likes INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public spaces are viewable by everyone" ON public.spaces
  FOR SELECT USING (NOT is_private OR auth.uid() = owner_id);
CREATE POLICY "Users can create their own spaces" ON public.spaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own spaces" ON public.spaces
  FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own spaces" ON public.spaces
  FOR DELETE USING (auth.uid() = owner_id);

CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON public.spaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orgs are viewable by everyone" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create orgs" ON public.organizations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Org members table
CREATE TABLE public.org_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  UNIQUE(org_id, user_id)
);

ALTER TABLE public.org_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members are viewable by everyone" ON public.org_members FOR SELECT USING (true);
CREATE POLICY "Users can manage their own membership" ON public.org_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Likes table
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL,
  resource_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_type, resource_id)
);

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are viewable by everyone" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- Discussions table
CREATE TABLE public.discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type TEXT NOT NULL,
  resource_id UUID NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Discussions are viewable by everyone" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create discussions" ON public.discussions
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Discussion comments table
CREATE TABLE public.discussion_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.discussion_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone" ON public.discussion_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.discussion_comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);