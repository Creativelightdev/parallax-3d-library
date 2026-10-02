# parallax-3d-library

Biblioteca de efeitos parallax e 3D para projetos web, baseada em [simpleParallax.js](https://github.com/geosigno/simpleParallax.js).

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- [simple-parallax-js](https://www.npmjs.com/package/simple-parallax-js) v7
- [react-scroll-parallax](https://www.npmjs.com/package/react-scroll-parallax) v3
- [rellax](https://www.npmjs.com/package/rellax) v1 — parallax leve via atributo `data-rellax-speed`
- [jarallax](https://www.npmjs.com/package/jarallax) v3 — parallax em backgrounds de vídeo e imagem
- [parallax-effect](https://www.npmjs.com/package/parallax-effect) v2 — parallax 3D via rastreamento facial com TensorFlow.js
- [@grokku/parallax-scroller](https://github.com/grokku/parallax-scroller) — parallax scroller via GitHub
- [ukiyojs](https://github.com/yitengjun/ukiyo-js) v4 — parallax de background dinâmico e moderno
- [pureParallax](https://github.com/pballasiotes/pureParallax) — **referência** (sem pacote npm publicado)

## Instalação

```bash
npm install
npm run dev
```

## Uso

```tsx
import { useEffect, useRef } from 'react'
import simpleParallax from 'simple-parallax-js'

function ParallaxImage() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const instance = new simpleParallax(imgRef.current, {
      scale: 1.5,
      delay: 0.6,
      orientation: 'down', // 'up' | 'down' | 'left' | 'right'
    })
    return () => instance.destroy()
  }, [])

  return <img ref={imgRef} src="sua-imagem.jpg" alt="parallax" />
}
```

## ukiyojs (uso)

Parallax de background eficiente com suporte a imagem, vídeo e elementos inline.

```tsx
import { useEffect, useRef } from 'react'
import Ukiyo from 'ukiyojs'

function App() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const ukiyo = new Ukiyo(imgRef.current, {
      scale: 1.5,   // zoom do parallax
      speed: 1.5,   // velocidade (1 = normal)
      willChange: true,
    })
    return () => ukiyo.destroy()
  }, [])

  return (
    <img
      ref={imgRef}
      src="sua-imagem.jpg"
      alt="parallax"
      style={{ width: '100%', height: '600px', objectFit: 'cover' }}
    />
  )
}
```

> Também funciona com `<video>` e qualquer elemento com `background-image`.

---

## @grokku/parallax-scroller (uso)

```tsx
import { useEffect, useRef } from 'react'
import ParallaxScroller from '@grokku/parallax-scroller'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const scroller = new ParallaxScroller(containerRef.current)
    return () => scroller.destroy()
  }, [])

  return <div ref={containerRef}>...</div>
}
```

---

## pureParallax

> Não publicado no npm. Para usar, clone diretamente:
> ```bash
> git clone https://github.com/pballasiotes/pureParallax
> ```
> Referência salva em `references/sites.md`.

---

## parallax-effect (uso)

Efeito parallax 3D baseado em **rastreamento facial** via webcam usando TensorFlow.js.
A imagem reage à posição do rosto do usuário, criando ilusão de profundidade.

```tsx
import { useEffect, useRef } from 'react'
import ParallaxEffect from 'parallax-effect'

function FaceParallax() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const effect = new ParallaxEffect(canvasRef.current, {
      layers: [
        { src: '/camada-fundo.png', depth: 0.1 },
        { src: '/camada-meio.png',  depth: 0.3 },
        { src: '/camada-frente.png', depth: 0.6 },
      ],
    })
    return () => effect.destroy()
  }, [])

  return <canvas ref={canvasRef} width={800} height={600} />
}
```

> Requer permissão de câmera. Quanto maior o `depth`, mais a camada se move.

---

## jarallax (uso)

```tsx
import { useEffect, useRef } from 'react'
import { jarallax } from 'jarallax'
import 'jarallax/dist/jarallax.min.css'

function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    jarallax(sectionRef.current, {
      speed: 0.5, // 0 = fixo, 1 = scroll normal, < 1 = efeito parallax
    })
    return () => jarallax(sectionRef.current!, 'destroy')
  }, [])

  return (
    <div
      ref={sectionRef}
      className="jarallax"
      style={{
        minHeight: '500px',
        backgroundImage: 'url(sua-imagem.jpg)',
      }}
    >
      <h2>Conteúdo sobre o parallax</h2>
    </div>
  )
}
```

> Suporta também **vídeo como background**: `data-jarallax-video="https://youtu.be/..."`.

---

## rellax (uso)

```tsx
import { useEffect } from 'react'
import Rellax from 'rellax'

function App() {
  useEffect(() => {
    const rellax = new Rellax('.rellax')
    return () => rellax.destroy()
  }, [])

  return (
    <div>
      <img className="rellax" data-rellax-speed="-5" src="imagem.jpg" alt="parallax" />
      <h1 className="rellax" data-rellax-speed="2">Título parallax</h1>
    </div>
  )
}
```

> `data-rellax-speed`: negativo = move para cima, positivo = move para baixo. Intervalo recomendado: `-10` a `10`.

---

## react-scroll-parallax (uso)

```tsx
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'

function App() {
  return (
    <ParallaxProvider>
      <Parallax speed={-10}>
        <img src="imagem.jpg" alt="parallax" />
      </Parallax>
    </ParallaxProvider>
  )
}
```

## Opções disponíveis (simple-parallax-js)

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `orientation` | string | `'up'` | Direção do efeito |
| `scale` | number | `1.3` | Intensidade do zoom |
| `overflow` | boolean | `false` | Permite overflow |
| `delay` | number | `0` | Suavização (0–1) |
| `maxTransition` | number | `0` | Limita a transição (%) |
