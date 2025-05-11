import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"


function NotificationItem({
  notification,
  onUpdate,
  onDelete,
}: {
  notification: any
  onUpdate: (id: string, updates: Partial<any>) => void
  onDelete: (id: string) => void
}) {
  const toggleRead = () => {
    onUpdate(notification.id, { isRead: !notification.isRead })
  }

  const deleteNotification = () => {
    onDelete(notification.id)
  }

  return (
    <Alert className={notification.isRead ? "opacity-60" : ""}>
      <AlertTitle>{notification.title}</AlertTitle>
      <AlertDescription>
        <div className="flex justify-between items-start gap-2">
          <div>
            {notification.message}
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleRead}
            >
              {notification.isRead ? "Marcar como no leída" : "Marcar como leída"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={deleteNotification}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}

export default NotificationItem