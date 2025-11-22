import DefaultGIF from "../../assets/gif/background/default.gif";
import SunnyGIF from "../../assets/gif/background/sunny.gif";
import RainyGIF from "../../assets/gif/background/rainy.gif";
import SnowyGIF from "../../assets/gif/background/snowy.gif";
import type { WeatherResponse } from "../../types/weather";

const PTY_MAP: Record<string, string> = {
    "0": SunnyGIF,
    "1": RainyGIF,
    "2": SnowyGIF,
    "3": SnowyGIF,
    "5": RainyGIF,
    "6": SnowyGIF,
    "7": SnowyGIF,
};

type BackgroundImageProps = {
    response: WeatherResponse | null;
}

export default function BackgroundImage({ response }: BackgroundImageProps) {
    if (!response) {
        return (
            <img
                className="absolute w-screen h-screen object-cover"
                src={DefaultGIF}
            />
        );
    }
    const ptyItem = response.response.body.items.item.find(
        (v) => v.category === "PTY"
    );
    const backgroundSrc = PTY_MAP[ptyItem?.obsrValue ?? ""] ?? DefaultGIF;
    return (
        <img
            className="absolute w-screen h-screen object-cover"
            src={backgroundSrc}
        />
    );
}
