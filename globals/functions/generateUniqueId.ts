import bcrypt from "react-native-bcrypt";

export const generateUniqueId = (itemsArr: any[], callback: Function) =>
    bcrypt.hash(itemsArr.length.toString(), 5, (err: Error, newId: string | undefined) => {
        if (err?.message) {
            console.error(err.message);
            return Math.random() * 100 * (itemsArr.length + 1);
        }
        if (newId) {
            itemsArr.forEach(({ id }: any) => {
                if (newId === id) {
                    return generateUniqueId(itemsArr, callback);
                }
            })
        }
        return callback(newId);
    });

export default generateUniqueId;