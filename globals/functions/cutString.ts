const cutString = (word: string, length: number) => {
    if(typeof word === "string") {
        if (word.length > length) {
          return word.slice(0, length - 1) + "...";
        }
        return word;
    }
    return "...";
}

export default cutString;