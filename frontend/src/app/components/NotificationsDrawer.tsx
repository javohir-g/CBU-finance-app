import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { notificationService, Notification } from "../api/services/notification.service";
import { IconX, IconPlus, IconMinus, IconCreditCard, IconStar } from "@tabler/icons-react";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await notificationService.getNotifications();
      setNotifications(response.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleMarkRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const content = {
    rus: {
      title: "Уведомления",
      markAllRead: "Отметить все прочитанными",
      today: "Сегодня",
      yesterday: "Вчера",
      thisWeek: "На этой неделе"
    },
    uzb: {
      title: "Bildirishnomalar",
      markAllRead: "Barchasini o'qilgan deb belgilash",
      today: "Bugun",
      yesterday: "Kecha",
      thisWeek: "Bu hafta"
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <div className="w-11 h-11 rounded-full bg-[#22c55e] flex items-center justify-center">
            <IconPlus size={20} className="text-white" />
          </div>
        );
      case "error":
        return (
          <div className="w-11 h-11 rounded-full bg-[#ff4757] flex items-center justify-center">
            <IconMinus size={20} className="text-white" />
          </div>
        );
      case "warning":
        return (
          <div className="w-11 h-11 rounded-full bg-[#7c3aed] flex items-center justify-center">
            <IconCreditCard size={20} className="text-white" />
          </div>
        );
      case "info":
        return (
          <div className="w-11 h-11 rounded-full bg-[#f59e0b] flex items-center justify-center">
            <IconStar size={20} className="text-white" />
          </div>
        );
      default:
        return (
          <div className="w-11 h-11 rounded-full bg-[#7c3aed] flex items-center justify-center">
            <IconStar size={20} className="text-white" />
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <IconX size={20} style={{ color: colors.text }} />
              </button>
            </div>

            {/* Mark all read button */}
            <div className="px-6 py-3">
              <button
                onClick={handleMarkAllRead}
                className="text-[#7c3aed] text-sm font-medium hover:text-[#6d32d4] transition-colors"
              >
                {content[language].markAllRead}
              </button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto h-[calc(100%-130px)] px-6">
              <div className="space-y-3 pb-6">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-24 rounded-3xl w-full" style={{ backgroundColor: colors.cardBackground }}></div>
                  ))
                ) : notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => !notification.is_read && handleMarkRead(notification.id)}
                      className={`rounded-3xl p-4 flex items-start gap-3 transition-colors cursor-pointer relative ${!notification.is_read ? "border-l-4 border-[#7c3aed]" : ""
                        }`}
                      style={{ backgroundColor: colors.cardBackground }}
                    >
                      {getNotificationIcon(notification.type)}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm" style={{ color: colors.text }}>{notification.title}</p>
                          {!notification.is_read && (
                            <span className="w-2 h-2 bg-[#7c3aed] rounded-full flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>{notification.message}</p>
                        <p className="text-xs" style={{ color: colors.textSecondary, opacity: 0.6 }}>
                          {new Date(notification.created_at).toLocaleDateString(language === "rus" ? "ru-RU" : "uz-UZ")} • {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12" style={{ color: colors.textSecondary }}>
                    {language === "rus" ? "У вас нет уведомлений" : "Sizda bildirishnomalar yo'q"}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}