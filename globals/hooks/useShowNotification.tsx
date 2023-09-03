import { useCallback } from "react"

import { notificationStyles } from "./media/notificationStyles";
import variables from "../../styles/variables";
import trimString from "../functions/trimString";

const useShowNotification = () => {
    const showNotification = useCallback((message:string, type: "success" | "warning" = "success") => {
        const messageCont = document.createElement("div");
        const {notificationInlineStyles:notification} = {...notificationStyles};
        for(let property in notification) {
            messageCont.style[property as any] = notification[property as keyof typeof notification];
        }
        if (type === "success") {
            messageCont.style.color = variables.colorSuccess
        }
        if (type === "warning") {
            messageCont.style.color = variables.colorWarning
        }
        messageCont.textContent = trimString(message, 30);
        document.body.appendChild(messageCont);
        setTimeout(() => {
            messageCont.style.top = "50px";
        }, 500)
        setTimeout(() => {
            messageCont.style.opacity = "0";
            messageCont.style.transition = "0.15s";
        }, 1500)
        setTimeout(() => {
            document.body.prepend(messageCont);
        }, 1700)
    }, [])

    return {showNotification};
}

export default useShowNotification;