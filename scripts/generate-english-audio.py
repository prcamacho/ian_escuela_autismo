"""Generate the offline English vocabulary audio bundled with the app.

Usage (after installing edge-tts):
    py scripts/generate-english-audio.py
"""

import asyncio
from pathlib import Path

import edge_tts


WORDS = (
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "purple",
    "black",
    "white",
    "pencil",
    "notebook",
    "book",
    "eraser",
    "ruler",
    "scissors",
    "glue",
    "backpack",
    "pen",
    "crayons",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
)

VOICE = "en-US-JennyNeural"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "app" / "assets" / "english" / "audio"


async def generate(word: str, semaphore: asyncio.Semaphore) -> None:
    async with semaphore:
        output = OUTPUT_DIR / f"{word}.mp3"
        communicate = edge_tts.Communicate(word, VOICE, rate="-12%")
        await communicate.save(str(output))


async def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(4)
    await asyncio.gather(*(generate(word, semaphore) for word in WORDS))


if __name__ == "__main__":
    asyncio.run(main())
