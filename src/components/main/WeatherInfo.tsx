import formatCategory from "../../utils/FormatCategory";
import type { WeatherResponse } from "../../types/weather";

interface WeatherInfoProps {
    response: WeatherResponse | null;
}

export default function WeatherInfo({ response }: WeatherInfoProps) {
    if (!response) return null;
    return (
        <div className="gap-3 absolute">
            {response.response.body.items.item.map(({ category, obsrValue }, i) => {
                const { label, value } = formatCategory(category, obsrValue);
                return (
                <div
                    className="inline-flex flex-row gap-2 p-2 mr-2 mb-2 bg-white flex-wrap"
                    key={i}
                >
                    <p className="text-3xl">{label}</p>
                    <p className="text-3xl">{value}</p>
                </div>
                );
            })}
        </div>
    );
}
