"""Generate the adapted story voice locally, matching the displayed text.

Uses the same Argentine Spanish voice as the existing communication supports.
Requires edge-tts >= 7.3.1. Source: app/story-books.js.
"""
import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
VOICE = 'es-AR-ElenaNeural'

async def main():
    script = "const fs=require('fs'),vm=require('vm'); process.stdout.write(vm.runInNewContext(fs.readFileSync('app/story-books.js','utf8')+';JSON.stringify(STORY_BOOKS)'));"
    books = json.loads(subprocess.check_output(['node', '-e', script], cwd=ROOT).decode('utf-8'))
    for book in books:
        output = ROOT / 'app' / 'assets' / 'stories' / book['id'] / 'audio'
        output.mkdir(parents=True, exist_ok=True)
        texts = {f'scene-{i+1:02d}': scene['text'] for i, scene in enumerate(book['scenes'])}
        texts.update({key: item['text'] for key, item in book['helps'].items()})
        manifest_path = output / 'texts.json'
        previous = json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {}
        for name, text in texts.items():
            destination = output / f'{name}.mp3'
            if destination.exists() and destination.stat().st_size > 1000 and previous.get(name) == text:
                continue
            await edge_tts.Communicate(text, VOICE, rate='-12%').save(str(destination))
            print(f'Saved {book["id"]}/{name}', flush=True)
        manifest_path.write_text(json.dumps(texts, ensure_ascii=False, indent=2), encoding='utf-8')

if __name__ == '__main__':
    asyncio.run(main())
