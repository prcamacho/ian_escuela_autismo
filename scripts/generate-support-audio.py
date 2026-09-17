"""Generate the offline Spanish audio used by the visual supports.

Usage (after installing edge-tts):
    py scripts/generate-support-audio.py
"""

import asyncio
from pathlib import Path

import edge_tts


NUMBER_WORDS = (
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
    "veinte",
)

COLORS = {
    "rojo": "rojo",
    "azul": "azul",
    "amarillo": "amarillo",
    "verde": "verde",
    "naranja": "naranja",
    "violeta": "violeta",
    "rosa": "rosa",
    "celeste": "celeste",
    "marron": "marrón",
    "gris": "gris",
    "blanco": "blanco",
    "negro": "negro",
}

VOICE = "es-AR-ElenaNeural"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "app" / "assets" / "supports" / "audio"


async def generate(relative_path: Path, text: str, semaphore: asyncio.Semaphore) -> None:
    async with semaphore:
        output = OUTPUT_DIR / relative_path
        output.parent.mkdir(parents=True, exist_ok=True)
        communicate = edge_tts.Communicate(text, VOICE, rate="-12%")
        await communicate.save(str(output))


async def main() -> None:
    semaphore = asyncio.Semaphore(4)
    items = [
        *((Path("numbers") / f"{value}.mp3", word) for value, word in enumerate(NUMBER_WORDS)),
        *((Path("colors") / f"{slug}.mp3", word) for slug, word in COLORS.items()),
    ]
    await asyncio.gather(*(generate(path, text, semaphore) for path, text in items))


if __name__ == "__main__":
    asyncio.run(main())
