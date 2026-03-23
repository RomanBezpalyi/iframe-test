"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Info, X, HelpCircle } from "lucide-react"

export function InfoBox() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load visibility state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("info-box-visible")
    if (stored !== null) {
      setIsVisible(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [])

  // Save visibility state to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("info-box-visible", JSON.stringify(isVisible))
    }
  }, [isVisible, isLoaded])

  const handleHide = () => {
    setIsVisible(false)
  }

  const handleShow = () => {
    setIsVisible(true)
  }

  // Don't render anything until we've loaded the state from localStorage
  if (!isLoaded) {
    return null
  }

  if (!isVisible) {
    return (
      <div className="max-w-4xl mx-auto flex justify-end">
        <Button variant="outline" size="sm" onClick={handleShow} className="bg-transparent">
          <HelpCircle className="h-4 w-4 mr-2" />
          Show Help
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <strong>How to use this URL viewer:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Enter a URL in the input below and click Submit to view it in the iframe</li>
                <li>
                  • Use the direct link feature: visit{" "}
                  <code className="bg-muted px-1 rounded">/setUrl?url=https://example.com</code> to set a URL directly
                </li>
                <li>• Click the Edit button to change the current URL</li>
                <li>• The URL is saved in a cookie and persists across sessions</li>
                <li>• Toggle between light and dark mode using the theme button</li>
              </ul>
            </div>
            <Button variant="ghost" size="sm" onClick={handleHide} className="ml-4 h-6 w-6 p-0 hover:bg-muted">
              <X className="h-4 w-4" />
              <span className="sr-only">Hide help</span>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
