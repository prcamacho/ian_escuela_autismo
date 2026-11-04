"""Generate the offline Spanish audio for multiplication tables 1 through 10.

Usage (after installing edge-tts):
    py scripts/generate-multiplication-audio.py
"""

import asyncio
from pathlib import Path

import edge_tts


VOICE = "es-AR-ElenaNeural"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "app" / "assets" / "supports" / "audio" / "multiplication"

UNITS = (
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
)
TENS = {
    20: "veinte",
    30: "treinta",
    40: "cuarenta",
    50: "cincuenta",
    60: "sesenta",
    70: "setenta",
    80: "ochenta",
    90: "noventa",
}
SPECIALS = {
    16: "dieciséis",
    17: "diecisiete",
    18: "dieciocho",
    19: "diecinueve",
    21: "veintiuno",
    22: "veintidós",
    23: "veintitrés",
    24: "veinticuatro",
    25: "veinticinco",
    26: "veintiséis",
    27: "veintisiete",
    28: "veintiocho",
    29: "veintinueve",
}


def number_in_spanish(value: int) -> str:
    if 0 <= value < len(UNITS):
        return UNITS[value]
    if value in SPECIALS:
        return SPECIALS[value]
    if value < 100:
        tens = value - value % 10
        unit = value % 10
        return TENS[tens] if unit == 0 else f"{TENS[tens]} y {UNITS[unit]}"
    if value == 100:
        return "cien"
    raise ValueError(f"Unsupported number: {value}")


async def generate(table: int, multiplier: int, semaphore: asyncio.Semaphore) -> None:
    async with semaphore:
        output = OUTPUT_DIR / f"{table}x{multiplier}.mp3"
        phrase = (
            f"{number_in_spanish(table)} por {number_in_spanish(multiplier)} "
            f"es {number_in_spanish(table * multiplier)}"
        )
        communicate = edge_tts.Communicate(phrase, VOICE, rate="-12%")
        await communicate.save(str(output))


async def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(4)
    await asyncio.gather(
        *(generate(table, multiplier, semaphore) for table in range(1, 11) for multiplier in range(1, 11))
    )


if __name__ == "__main__":
    asyncio.run(main())
