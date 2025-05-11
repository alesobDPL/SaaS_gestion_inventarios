'use client'

import { useEffect, useState } from "react"
import  NotificationItem from "@/components/NotificacionItem"

export default function NotificationList() {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch(() => setNotifications([]))
  }, [])

  const updateNotification = async (id: string, updates: Partial<any>) => {
    try {
      await fetch(`/api/notifications/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
      )
    } catch (err) {
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: "DELETE" })
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
    }
  }

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <p className="text-sm text-center text-gray-500">
          No hay notificaciones por el momento.
        </p>
      ) : (
        notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onUpdate={updateNotification}
            onDelete={deleteNotification}
          />
        ))
      )}
    </div>
  )
}

