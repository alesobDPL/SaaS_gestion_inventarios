"use client"

/*  import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getAuthStatus } from "./Actions"
import { useRouter } from "next/navigation" */
import { Loader2 } from "lucide-react/icons" 

const Page = () => {
/*   const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Fetch configuration ID from localStorage
    const configurationId = localStorage.getItem("configurationId")
    if (configurationId) setConfigId(configurationId)
  }, [])

  const { data } = useQuery({
    queryKey: ["auth.callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem("configurationId")
        router.push(`/configure/preview?id=${configId}`)
      } else {
        router.push("/")
      }
    }
  }, [data, configId, router]) // Only run effect when data or configId changes */

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500"/>
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  )
}

export default Page
