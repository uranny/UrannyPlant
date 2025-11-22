type DiaryInputProps = {
    title: string;
    content: string;
    setTitle: (v: string) => void;
    setContent: (v: string) => void;
    onCancel: () => void;
    onSave: () => void;
}

export default function DiaryInput({ title, content, setTitle, setContent, onCancel, onSave }: DiaryInputProps) {
    return (
        <div className="flex flex-1 flex-col w-full pt-13 pr-16 pl-16 pb-16">
            <div className="flex flex-1 flex-col w-full h-full">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="w-full text-lg border-gray-300 focus:outline-none"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    className="w-full h-full text-lg mt-10 border-gray-300 focus:outline-none resize-none"
                />
            </div>
            <div className="flex flex-row">
                <button
                    onClick={onCancel}
                    className="w-full mt-3 text-lg cursor-pointer"
                >
                    취소하기
                </button>
                <button
                    onClick={onSave}
                    className="w-full mt-3 text-lg cursor-pointer"
                >
                    완료하기
                </button>
            </div>
        </div>
    );
}
