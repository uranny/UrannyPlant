import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { UserData } from "../types/user";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data() as UserData;
    } else {
      console.log("사용자 정보를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    return null;
  }
};
