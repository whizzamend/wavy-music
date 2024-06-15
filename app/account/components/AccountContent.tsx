"use client";

import UserInfo from "@/components/UserInfo";
import { useUser } from "@/hooks/useUsers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const supabase = useSupabaseClient();

  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (
    <div className="mb-7 px-6">
      <UserInfo user={{ ...user }} />
    </div>
  );
};

export default AccountContent;
