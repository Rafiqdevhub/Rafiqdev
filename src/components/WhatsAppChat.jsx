import { FloatingWhatsApp } from "react-floating-whatsapp";
import RafiqImage from "/Rafiq.PNG";

const WhatsAppChat = () => (
  <div className="whatsapp-wrapper" style={{ zIndex: 998 }}>
    <FloatingWhatsApp
      phoneNumber="+923068970901"
      accountName="Muhammad Rafiq"
      avatar={RafiqImage}
      statusMessage="Typically replies within 1 hour"
      chatMessage="Hello! 👋 How can I help you?"
      allowClickAway={true}
      notification={true}
      notificationDelay={60}
      notificationSound={true}
      className="whatsapp-chat"
      darkMode={true}
      buttonStyle={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 998,
      }}
      chatboxStyle={{
        zIndex: 998,
        right: "unset",
        left: "20px",
      }}
      chatboxHeight={320}
    />
  </div>
);

export default WhatsAppChat;
