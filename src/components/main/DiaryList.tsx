import type { DiaryEntry } from "../../types/diary";

interface DiaryListProps {
    diaryList: DiaryEntry[];
    onEdit: (entry: DiaryEntry) => void;
    onDelete: (id: string) => void;
}

export default function DiaryList({ diaryList, onEdit, onDelete }: DiaryListProps) {
    if (diaryList.length === 0) {
        return <p>일기가 없습니다</p>;
    }
    return (
        <div className="w-full h-full mt-10 flex flex-col overflow-y-auto gap-2">
            {diaryList.map((v, i) => (
                <div key={i} className="flex flex-row w-full gap-2">
                    <div className="flex flex-col flex-1">
                        <p>{`제목 : ${v.title}`}</p>
                        <p>{`날짜 : ${v.createdAt}`}</p>
                    </div>
                    <div className="flex flex-row w-auto gap-2">
                        <button onClick={() => onEdit(v)}>수정</button>
                        <button onClick={() => onDelete(v.id)}>삭제</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
