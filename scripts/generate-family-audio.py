"""Bundle family words with the exact voice and speed used by Me comunico.

Requires edge-tts >= 7.3.1 (the service changed its protocol in October 2026).
"""
import asyncio
from pathlib import Path
import edge_tts

VOICE = "es-AR-ElenaNeural"
WORDS = ("grandmother", "grandfather", "mother", "father", "sister", "sisters", "brother", "brothers")
OUTPUT = Path(__file__).resolve().parents[1] / "app/assets/english/family/audio"

async def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for word in WORDS:
        path = OUTPUT / f"{word}.mp3"
        if path.exists() and path.stat().st_size > 1000:
            continue
        await edge_tts.Communicate(word.capitalize(), VOICE, rate="-12%").save(str(path))
        print(f"Saved {word}", flush=True)

if __name__ == "__main__":
    asyncio.run(main())
