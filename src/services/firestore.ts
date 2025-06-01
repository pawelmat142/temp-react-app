import { getFirestore } from "firebase/firestore";
import fs from "./firebase";

const firestore = getFirestore(fs.app);

export default firestore
