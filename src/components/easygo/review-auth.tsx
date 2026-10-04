import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const ReviewAuthContext = createContext<{ userId?: string | undefined; signIn: () => Promise<void>; signingIn: boolean; authError?: string | undefined }>({ signIn: async () => {}, signingIn: false });

export function ReviewAuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>();
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string>();
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => { if (active) setUserId(data.session?.user.id); });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) return;
      setUserId(session?.user.id);
      void router.invalidate();
      if (session) void queryClient.invalidateQueries();
      else {
        queryClient.removeQueries({ queryKey: ["google-place-search"] });
        queryClient.removeQueries({ queryKey: ["google-place-reviews"] });
      }
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [queryClient, router]);
  const signIn = async () => {
    setSigningIn(true); setAuthError(undefined);
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + window.location.pathname });
      if (result.error) throw result.error;
    } catch (error) { setAuthError(error instanceof Error ? error.message : "Google sign-in failed."); }
    finally { setSigningIn(false); }
  };
  return <ReviewAuthContext.Provider value={{ userId, signIn, signingIn, authError }}>{children}</ReviewAuthContext.Provider>;
}

export const useReviewAuth = () => useContext(ReviewAuthContext);