import {fireStorage} from "./firebase";
import axios from "axios";
import {Tab} from "../comm/Comm";

/**
 * Firebase storage GET method (read data.json)
 */
export async function getFirebaseStorageData() {
    const storageRef = fireStorage.ref().child('data.json');
    const url = await storageRef.getDownloadURL();
    const res = await axios.get(url);
    return res.data
}

/**
 * Firebase storage POST method
 */
export function setFirebaseStorageData(newData: Tab[]) {
    const storageRef = fireStorage.ref().child('data.json');
    const jsonString = JSON.stringify(newData);
    const blob = new Blob([jsonString], {type: "application/json"});
    storageRef.put(blob).then(() => {
        console.log("success upload data to firebase storage");
    });
}