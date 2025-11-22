import { useCallback, useEffect, useState } from "react";
import getWeather from "../../api/weather";
import type { WeatherResponse } from "../../types/weather";
import PlantGIF from "../../assets/gif/plant.gif";
import DiaryGIF from "../../assets/gif/diary.gif";
import WindowGIF from "../../assets/gif/background/window.gif";
import PageGIF from "../../assets/gif/page.gif";
import type { UserData } from "../../types/user";
import { getUserData } from "../../api/user";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ImageButton from "../../components/ImageButton";
import type { DiaryEntry } from "../../types/diary";
import { createDiary, deleteDiary, fetchDiaries, updateDiary } from "../../api/diary";
import WeatherInfo from "../../components/main/WeatherInfo";
import BackgroundImage from "../../components/main/BackgroundImage";
import DiaryList from "../../components/main/DiaryList";
import DiaryInput from "../../components/main/DiaryInput";

export default function Main() {
  const [response, setResponse] = useState<WeatherResponse | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState<UserData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showPage, setShowPage] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      console.log("사용자가 로그인하지 않았습니다.");
      return;
    }

    const fetchUserData = async () => {
      const data = await getUserData(user.uid);
      if (!data) {
        console.log("사용자 정보 받아오기 실패");
        return;
      }
      setUserData(data);
    };

    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    console.log("userData changed:", userData);

    if (!userData?.coordinates) {
      console.log("coordinates 없음, 날씨 요청 안함");
      return;
    }

    const initWeather = async () => {
      console.log(
        "날씨 API 호출",
        userData.coordinates.nx,
        userData.coordinates.ny
      );
      const data = await getWeather(
        userData.coordinates.nx,
        userData.coordinates.ny
      );
      console.log("날씨 API 결과:", data);
      if (!data) {
        console.log("값 받아오기 실패");
        return;
      }
      setResponse(data);
    };
    initWeather();
  }, [userData]);

  useEffect(() => {
    if (!user?.uid) return;
    const load = async () => {
      const list = await fetchDiaries(user.uid);
      setDiaryList(list);
    };
    load();
  }, [user?.uid]);

  const handleSaveDiary = useCallback(async () => {
    if (!user?.uid) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const now = Date.now();

      if (editingId) {
        // 수정 모드일 경우
        await updateDiary(user.uid, editingId, {
          title,
          content,
          updatedAt: now,
        });
      } else {
        // 새 일기 작성
        await createDiary(user.uid, {
          title,
          content,
          createdAt: now,
          updatedAt: now,
        });
      }

      // 입력 초기화
      setTitle("");
      setContent("");
      setEditingId(null);
      setShowInput(false);

      // 최신 일기 가져오기
      const list = await fetchDiaries(user.uid);
      setDiaryList(list);
    } catch (error) {
      console.error("일기 저장 실패:", error);
      alert("일기 저장에 실패했습니다.");
    }
  }, [user?.uid, title, content, editingId]);

  const handleEditDiary = (entry: DiaryEntry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setEditingId(entry.id);
    setShowInput(true);
  };

  const handleDeleteDiary = async (id: string) => {
    if (!user?.uid) return;
    try {
      await deleteDiary(user.uid, id);
      setDiaryList((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="relative w-screen h-screen bg-blue-200">
      <BackgroundImage response={response} />
      <img
        className="absolute w-screen h-screen object-cover"
        src={WindowGIF}
      />
      <img
        className="w-60 left-1/2 top-1/2 -translate-x-1/2 absolute object-contain"
        src={PlantGIF}
      />
      <ImageButton
        className="w-80 right-1/6 top-1/2 absolute object-contain cursor-pointer"
        src={DiaryGIF}
        onClick={() => {
          setShowPage(true);
        }}
      />
      <WeatherInfo response={response} />
      {showPage && (
        <div className="w-screen h-full absolute bg-black/50 backdrop-blur-2xl flex items-center justify-center">
          <div className="relative">
            <img className="h-[80vh] w-auto" src={PageGIF} alt="page" />
            <div className="absolute inset-0 flex h-full flex-col items-center">
              {showInput ? (
                <DiaryInput
                  title={title}
                  content={content}
                  setTitle={setTitle}
                  setContent={setContent}
                  onCancel={() => setShowInput(false)}
                  onSave={handleSaveDiary}
                />
              ) : (
                <div className="flex flex-1 flex-col w-full pt-13 pr-16 pl-16 pb-16">
                  <div className="flex flex-1 flex-col w-full h-full">
                    <p>내 일기 목록</p>
                    <DiaryList
                      diaryList={diaryList}
                      onEdit={handleEditDiary}
                      onDelete={handleDeleteDiary}
                    />
                  </div>
                  <div className="flex flex-row">
                    <button
                      onClick={() => setShowPage(false)}
                      className="w-full mt-3 text-lg cursor-pointer"
                    >
                      나가기
                    </button>
                    <button
                      onClick={() => setShowInput(true)}
                      className="w-full mt-3 text-lg cursor-pointer"
                    >
                      일기 쓰기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
