"""Generate the bundled Spanish audio for the PSP Sofía language activities.

Usage (after installing edge-tts):
    py scripts/generate-sofia-language-audio.py
"""

import asyncio
from pathlib import Path

import edge_tts


VOICE = "es-AR-ElenaNeural"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "app" / "assets" / "language" / "sofia" / "audio"

ITEMS = {
    "grammar/prompts/armar-oracion.mp3": "Armá la oración.",
    "grammar/prompts/tocar-sujeto.mp3": "Tocá el sujeto. ¿Quién hace la acción?",
    "grammar/prompts/tocar-verbo.mp3": "Tocá el verbo. ¿Qué hace?",
    "grammar/prompts/tocar-predicado.mp3": "Tocá el predicado. Es el verbo y lo que decimos del sujeto.",
    "grammar/prompts/probar-otra-vez.mp3": "Mirá con atención y probá otra vez.",
    "grammar/sentences/01-ian-come-una-manzana.mp3": "Ian come una manzana.",
    "grammar/sentences/02-sofia-lee-un-cuento.mp3": "Sofía lee un cuento.",
    "grammar/sentences/03-el-perro-corre-en-el-patio.mp3": "El perro corre en el patio.",
    "grammar/sentences/04-la-nena-patea-la-pelota.mp3": "La nena patea la pelota.",
    "grammar/sentences/05-el-gato-duerme-en-la-cama.mp3": "El gato duerme en la cama.",
    "grammar/sentences/06-papa-cocina-la-cena.mp3": "Papá cocina la cena.",
    "grammar/sentences/07-la-maestra-escribe-una-palabra.mp3": "La maestra escribe una palabra.",
    "grammar/sentences/08-ian-guarda-los-juguetes.mp3": "Ian guarda los juguetes.",
    "recipe/intro.mp3": "Vamos a preparar milanesa con puré. Primero hacemos el puré. Después, la milanesa. Al final, servimos el plato.",
    "recipe/complete.mp3": "¡Receta terminada! Preparamos milanesa con puré.",
    "recipe/steps/01-pelar-las-papas.mp3": "Primero, un adulto pela las papas.",
    "recipe/steps/02-papas-en-la-olla.mp3": "Después, pone las papas en una olla con agua.",
    "recipe/steps/03-hervir-las-papas.mp3": "Luego, hierve las papas.",
    "recipe/steps/04-papas-al-colador.mp3": "Pasa las papas al colador.",
    "recipe/steps/05-aplastar-las-papas.mp3": "Aplasta las papas para hacer el puré.",
    "recipe/steps/06-manteca-y-leche.mp3": "Agrega manteca y leche.",
    "recipe/steps/07-agregar-sal.mp3": "Agrega un poco de sal.",
    "recipe/steps/08-preparar-el-huevo.mp3": "Para la milanesa, prepara el huevo.",
    "recipe/steps/09-carne-por-el-huevo.mp3": "Pasa la carne por el huevo.",
    "recipe/steps/10-carne-por-pan-rallado.mp3": "Pasa la carne por el pan rallado.",
    "recipe/steps/11-cocinar-la-milanesa.mp3": "Un adulto cocina la milanesa.",
    "recipe/steps/12-servir-el-plato.mp3": "Por último, sirve la milanesa con el puré.",
}


async def generate(relative_path: str, text: str, semaphore: asyncio.Semaphore) -> None:
    async with semaphore:
        output = OUTPUT_DIR / relative_path
        output.parent.mkdir(parents=True, exist_ok=True)
        communicate = edge_tts.Communicate(text, VOICE, rate="-12%")
        await communicate.save(str(output))


async def main() -> None:
    semaphore = asyncio.Semaphore(4)
    await asyncio.gather(*(generate(path, text, semaphore) for path, text in ITEMS.items()))


if __name__ == "__main__":
    asyncio.run(main())
