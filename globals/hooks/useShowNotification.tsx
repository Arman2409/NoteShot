import { useCallback } from "react"

import { notificationStyles } from "./styles";
import variables from "../../styles/variables";
import cutString from "../functions/cutString";

const useShowNotification = () => {

    const showNotification = useCallback((message:string, type: "success" | "warning" = "success") => {
        const messageCont = document.createElement("div");
        for(let property in notificationStyles) {
            messageCont.style[property as any] = notificationStyles[property as keyof typeof notificationStyles];
        }
        if (type === "success") {
            messageCont.style.color = variables.colorSuccess
        }
        if (type === "warning") {
            messageCont.style.color = variables.colorWarning
        }
        messageCont.textContent = cutString(message, 25);
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
        }, 2000)
    }, [])

    return {showNotification};
}

export default useShowNotification;