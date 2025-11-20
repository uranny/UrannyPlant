import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const gridMap: { [key: string]: [number, number] } = {
  서울특별시: [60, 127],
  부산광역시: [98, 76],
  대구광역시: [89, 90],
  인천광역시: [55, 124],
  광주광역시: [58, 74],
  대전광역시: [67, 100],
  울산광역시: [102, 84],
  세종특별자치시: [66, 103],
  경기도: [60, 120],
  충청북도: [69, 107],
  충청남도: [55, 107],
  전라남도: [51, 67],
  경상북도: [87, 106],
  경상남도: [91, 77],
  제주특별자치도: [52, 38],
  이어도: [28, 8],
  강원특별자치도: [73, 134],
  전북특별자치도: [63, 89],
};

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignUp = async () => {
    setError("");

    // 위치 선택 검증
    if (!location) {
      setError("위치를 선택해주세요.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const coordinates = gridMap[location];
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        location: location,
        coordinates: {
          nx: coordinates[0],
          ny: coordinates[1],
        },
      });

      console.log("회원가입 성공:", user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("회원가입 실패:", err);
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="email"
        value={email}
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">위치를 선택하세요</option>
        {Object.keys(gridMap).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <button onClick={handleSignUp}>회원가입</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
