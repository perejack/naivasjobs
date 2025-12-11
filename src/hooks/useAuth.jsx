import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔄 AuthProvider: Getting initial session...');

        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            console.log('⏰ AuthProvider: Timeout - setting loading to false');
            setLoading(false);
        }, 5000);

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('📧 AuthProvider: Session result:', session ? 'Found' : 'None');
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                clearTimeout(timeoutId);
                setLoading(false);
            }
        }).catch(err => {
            console.error('❌ AuthProvider: getSession error:', err);
            clearTimeout(timeoutId);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('🔔 AuthProvider: Auth state changed:', event);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id);
                } else {
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        return () => {
            clearTimeout(timeoutId);
            subscription.unsubscribe();
        };
    }, []);

    const fetchProfile = async (userId) => {
        console.log('👤 AuthProvider: Fetching profile for:', userId);

        // Set a timeout for profile fetch
        const timeoutId = setTimeout(() => {
            console.log('⏰ Profile fetch timeout - continuing without profile');
            setLoading(false);
        }, 3000);

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            clearTimeout(timeoutId);

            if (!error && data) {
                console.log('✅ AuthProvider: Profile found');
                setProfile(data);
            } else {
                console.log('⚠️ AuthProvider: No profile found, that is OK');
                // Create a basic profile object from user metadata
                setProfile({ id: userId, business_name: 'My Business' });
            }
        } catch (err) {
            clearTimeout(timeoutId);
            console.error('❌ AuthProvider: fetchProfile error:', err);
            // Still set a basic profile so app works
            setProfile({ id: userId, business_name: 'My Business' });
        }
        setLoading(false);
    };

    const signUp = async (email, password, businessName) => {
        console.log('📝 SignUp: Starting with email:', email);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { business_name: businessName }
            }
        });

        console.log('📝 SignUp: Result:', { data: data ? 'success' : 'null', error });

        if (error) throw error;
        return data;
    };

    const signIn = async (email, password) => {
        console.log('🔐 SignIn: Starting with email:', email);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        console.log('🔐 SignIn: Result:', { data: data ? 'success' : 'null', error });

        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        console.log('🚪 SignOut: Starting...');
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setProfile(null);
        console.log('✅ SignOut: Complete');
    };

    const value = {
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
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
