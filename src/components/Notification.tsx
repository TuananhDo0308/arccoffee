// SlideInNotifications.tsx
import React from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { removeNotification } from "@/src/slices/UIcomponentSlice/NotificationSlice";

const SlideInNotifications: React.FC = () => {
  const notifications = useAppSelector((state) => state.notification.notifications);
  const dispatch = useAppDispatch();

  const handleRemoveNotif = (id: number) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="flex flex-col gap-1 w-72 fixed top-[90px] right-2 z-[70] pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            removeNotif={handleRemoveNotif}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NOTIFICATION_TTL = 3000;

const Notification: React.FC<{ notification: Notification; removeNotif: (id: number) => void }> = ({
  notification,
  removeNotif,
}) => {
  const { id, message } = notification;

  React.useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-blue-700 pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{message}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default SlideInNotifications;
