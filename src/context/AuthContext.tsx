import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  newsletterOptIn: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  authModalOpen: boolean;
  accountModalOpen: boolean;
  supabaseModalOpen: boolean;
  connectionStatus: {
    tested: boolean;
    connected: boolean;
    message: string;
    latencyMs?: number;
  };
  setAuthModalOpen: (open: boolean) => void;
  setAccountModalOpen: (open: boolean) => void;
  setSupabaseModalOpen: (open: boolean) => void;
  signInWithPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithPassword: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  useDemoAccount: () => void;
  recheckConnection: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_PROFILE: UserProfile = {
  id: 'demo-sister-amina-patel',
  email: 'amina.patel@sisterhood.co',
  firstName: 'Amina',
  lastName: 'Patel',
  phone: '9512607726',
  streetAddress: 'Flat 402, Al-Noor Residency, Near Jubilee Baug',
  landmark: 'Opposite Old Clock Tower',
  city: 'Vadodara (Baroda)',
  state: 'Gujarat',
  pincode: '390001',
  country: 'India',
  newsletterOptIn: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hb_active_profile');
    return saved ? JSON.parse(saved) : DEMO_USER_PROFILE;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean;
    connected: boolean;
    message: string;
    latencyMs?: number;
  }>({
    tested: false,
    connected: false,
    message: isSupabaseConfigured ? 'Connecting to Supabase...' : 'Local storage mode (Supabase not configured)',
  });

  const checkConnection = async () => {
    const res = await testSupabaseConnection();
    setConnectionStatus({
      tested: true,
      connected: res.connected,
      message: res.message,
      latencyMs: res.latencyMs,
    });
  };

  useEffect(() => {
    checkConnection();

    if (!isSupabaseConfigured) {
      // In local mode, keep demo sister profile or saved local profile
      setLoading(false);
      return;
    }

    // Initialize session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '');
      } else {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email || '');
      } else {
        setProfile(null);
        localStorage.removeItem('hb_active_profile');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Could not fetch Supabase profile:', error.message);
      }

      if (data) {
        const loadedProfile: UserProfile = {
          id: data.id,
          email: data.email || email,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          phone: data.phone || '',
          streetAddress: data.street_address || '',
          landmark: data.landmark || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          country: data.country || 'India',
          newsletterOptIn: data.newsletter_opt_in ?? true,
        };
        setProfile(loadedProfile);
        localStorage.setItem('hb_active_profile', JSON.stringify(loadedProfile));
      } else {
        // Fallback default profile from auth metadata
        const defaultProfile: UserProfile = {
          id: userId,
          email,
          firstName: user?.user_metadata?.first_name || 'Sister',
          lastName: user?.user_metadata?.last_name || '',
          phone: '',
          streetAddress: '',
          landmark: '',
          city: 'Vadodara (Baroda)',
          state: 'Gujarat',
          pincode: '390001',
          country: 'India',
          newsletterOptIn: true,
        };
        setProfile(defaultProfile);
      }
    } catch (err) {
      console.warn('Error querying profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Local fallback mock login
      const mockProfile: UserProfile = {
        ...DEMO_USER_PROFILE,
        email,
        firstName: email.split('@')[0],
      };
      setProfile(mockProfile);
      localStorage.setItem('hb_active_profile', JSON.stringify(mockProfile));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id, data.user.email || email);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Login failed' };
    }
  };

  const signUpWithPassword = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    if (!isSupabaseConfigured) {
      // Local fallback registration
      const newProfile: UserProfile = {
        id: `local-user-${Date.now()}`,
        email,
        firstName,
        lastName,
        phone: '',
        streetAddress: '',
        landmark: '',
        city: 'Vadodara (Baroda)',
        state: 'Gujarat',
        pincode: '390001',
        country: 'India',
        newsletterOptIn: true,
      };
      setProfile(newProfile);
      localStorage.setItem('hb_active_profile', JSON.stringify(newProfile));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Upsert initial profile directly
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        });

        await fetchProfile(data.user.id, email);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Registration failed' };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    localStorage.removeItem('hb_active_profile');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates } as UserProfile;
    setProfile(updated);
    localStorage.setItem('hb_active_profile', JSON.stringify(updated));

    if (isSupabaseConfigured && (user?.id || profile?.id)) {
      const targetId = user?.id || profile?.id;
      const { error } = await supabase.from('profiles').upsert({
        id: targetId,
        email: updated.email,
        first_name: updated.firstName,
        last_name: updated.lastName,
        phone: updated.phone,
        street_address: updated.streetAddress,
        landmark: updated.landmark,
        city: updated.city,
        state: updated.state,
        pincode: updated.pincode,
        country: updated.country,
        newsletter_opt_in: updated.newsletterOptIn,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  };

  const useDemoAccount = () => {
    setProfile(DEMO_USER_PROFILE);
    localStorage.setItem('hb_active_profile', JSON.stringify(DEMO_USER_PROFILE));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        authModalOpen,
        accountModalOpen,
        supabaseModalOpen,
        connectionStatus,
        setAuthModalOpen,
        setAccountModalOpen,
        setSupabaseModalOpen,
        signInWithPassword,
        signUpWithPassword,
        signOut,
        updateProfile,
        useDemoAccount,
        recheckConnection: checkConnection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
