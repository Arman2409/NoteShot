import variables from "../../styles/variables"

export const notificationStyles = {
    width: "150px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: variables.colorGreyLight,
    boxShadow: variables.buttonBoxShadow,
    transition: "1s",
    marginLeft: "auto",
    marginRight: "auto",
    border: `1px solid ${variables.colorGreyLight}`,
    top: "-100px",
    position: "absolute",
    right: "0px",
    left: "0px",
    fontSize: "20px"
 }