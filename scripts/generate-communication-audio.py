"""Generate offline audio for the quick messages in Me comunico.

Usage (after installing edge-tts):
    py scripts/generate-communication-audio.py
"""

import asyncio
from pathlib import Path

import edge_tts


VOICE = "es-AR-ElenaNeural"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "app" / "assets" / "communication" / "audio"
MESSAGES = {
    "quick-si": "Sí",
    "quick-no": "No",
    "quick-hambre": "Tengo hambre",
    "quick-enojado": "Estoy enojado",
    "quick-hola": "Hola",
    "quick-adios": "Adiós",
    "quick-no-quiero": "No quiero",
    "quick-bano": "Necesito ir al baño",
    "quick-ayuda": "Necesito ayuda",
}


async def generate(name: str, phrase: str, semaphore: asyncio.Semaphore) -> None:
    async with semaphore:
        audio = edge_tts.Communicate(phrase, VOICE, rate="-12%")
        await audio.save(str(OUTPUT_DIR / f"{name}.mp3"))


async def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(3)
    await asyncio.gather(
        *(generate(name, phrase, semaphore) for name, phrase in MESSAGES.items())
    )


if __name__ == "__main__":
    asyncio.run(main())
