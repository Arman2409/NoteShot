const trimString = (word: string, length: number) => {
    if(typeof word === "string") {
        if (word.length > length) {
          return word.substring(0, length - 1) + "...";
        }
        return word;
    }
    console.error("Not string received for triming");
    return "...";
}

export default trimString;