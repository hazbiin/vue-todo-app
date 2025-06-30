import { ref } from "vue";

type MessageObj = {
  id:number;
  text: string;
}

const NOTIFICATION_POP_OUT_TIME = 5000;
const notificationMessages = ref<MessageObj[]>([]);

export default function useNotification() {
  const showNotification = (message :string):void => {
    notificationMessages.value.push({id: Date.now(), text: message});
    
    setTimeout(() => {
      notificationMessages.value.shift();
    }, NOTIFICATION_POP_OUT_TIME);  
  };

  return {
    notificationMessages,
    showNotification  
  }
}