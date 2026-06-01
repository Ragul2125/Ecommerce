import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if已经installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      
      // Don't show immediately, maybe wait a bit or use specific logic
      // For demo purposes, we show it after 3 seconds if not installed
      const timer = setTimeout(() => {
        if (!sessionStorage.getItem("installPromptDismissed")) {
          setShowPrompt(true)
        }
      }, 3000)
      
      return () => clearTimeout(timer)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem("installPromptDismissed", "true")
  }

  if (!showPrompt || isInstalled) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 md:max-w-sm rounded-xl border bg-background/95 backdrop-blur shadow-2xl p-4 flex items-start gap-4 animate-in slide-in-from-bottom-8">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span className="font-bold font-heading">E</span>
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-sm">Install Premium App</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Install our application for a faster, offline-ready shopping experience right from your home screen.
        </p>
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="h-8" onClick={handleInstallClick}>
            <Download className="mr-2 h-3 w-3" /> Install App
          </Button>
          <Button size="sm" variant="outline" className="h-8" onClick={handleDismiss}>
            Not Now
          </Button>
        </div>
      </div>
      
      <button 
        onClick={handleDismiss}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
