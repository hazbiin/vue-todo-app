import { ref } from "vue";
import type { NotificationMessageType } from "@/types";


const NOTIFICATION_POP_OUT_TIME = 5000;
const notificationMessages = ref<NotificationMessageType[]>([]);

export default function useNotification() {
  const showNotification = (message :string):void => {
    notificationMessages.value.push({id: crypto.randomUUID(), messagetext: message});
    
    setTimeout(() => {
      notificationMessages.value.shift();
    }, NOTIFICATION_POP_OUT_TIME);  
  };

  return {
    notificationMessages,
    showNotification  
  }
}