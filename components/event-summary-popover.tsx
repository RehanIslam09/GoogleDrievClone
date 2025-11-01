'use client'

import React, { useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import { Button } from "@/components/ui/button"
import { IoCloseSharp } from "react-icons/io5"
import { CalendarEventType } from '@/lib/store'

interface EventSummaryPopoverProps {
  isOpen: boolean
  onClose: () => void
  event: CalendarEventType
}

export function EventSummaryPopover({ isOpen, onClose, event }: EventSummaryPopoverProps) {

    
    
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md rounded-lg bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-google-gray-200 px-6 py-4">
          <h2 className="text-xl font-medium text-google-gray-800">Event Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-google-gray-100"
          >
            <IoCloseSharp className="h-5 w-5 text-google-gray-600" />
          </Button>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-3 w-3 rounded-sm bg-google-blue-500"></div>
            <div className="flex-1">
              <h3 className="text-2xl font-normal text-google-gray-800">{event.title}</h3>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 text-google-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-google-gray-700">{dayjs(event.date).format("dddd, MMMM D, YYYY")}</p>
              <p className="text-sm text-google-gray-600">{dayjs(event.date).format("h:mm A")}</p>
            </div>
          </div>
          {event.description && (
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 text-google-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <p className="flex-1 text-sm text-google-gray-700">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
