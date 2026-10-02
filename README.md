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
- [lax.js](https://www.npmjs.com/package/lax.js) v2 — animações suaves no scroll, < 4kb
- [locomotive-scroll](https://www.npmjs.com/package/locomotive-scroll) v5 — scroll suave com parallax e detecção de visibilidade
- [atropos](https://www.npmjs.com/package/atropos) v2 — efeito parallax 3D ao toque/hover
- [tilt.js](https://www.npmjs.com/package/tilt.js) v1 — inclinação parallax ao passar o mouse

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

## lax.js (uso)

Animações baseadas em scroll com sintaxe declarativa simples.

```tsx
import { useEffect } from 'react'
import lax from 'lax.js'

function App() {
  useEffect(() => {
    lax.init()
    lax.addDriver('scrollY', () => window.scrollY)
    lax.addElements('.lax', {
      scrollY: { translateY: [[0, 500], [0, -150]] }
    })
  }, [])

  return <div className="lax"><h1>Título com parallax</h1></div>
}
```

---

## locomotive-scroll (uso)

Scroll suave com parallax e detecção de elementos visíveis.

```tsx
import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: containerRef.current!,
      smooth: true,
    })
    return () => scroll.destroy()
  }, [])

  return (
    <div ref={containerRef} data-scroll-container>
      <section data-scroll-section>
        <h1 data-scroll data-scroll-speed="2">Título rápido</h1>
        <p  data-scroll data-scroll-speed="-1">Parágrafo lento</p>
      </section>
    </div>
  )
}
```

---

## atropos (uso)

Efeito parallax 3D responsivo ao toque e mouse.

```tsx
import Atropos from 'atropos/react'
import 'atropos/css'

function Card3D() {
  return (
    <Atropos className="my-atropos" shadow={true} highlight={true}>
      <img data-atropos-offset="-5" src="fundo.jpg" alt="bg" />
      <h2 data-atropos-offset="5">Texto em destaque</h2>
      <p  data-atropos-offset="2">Subtítulo</p>
    </Atropos>
  )
}
```

> `data-atropos-offset`: negativo = recuado, positivo = saliente. Intervalo: `-10` a `10`.

---

## tilt.js (uso)

Inclinação 3D ao passar o mouse, baseado em jQuery.

```html
<!-- Via CDN (vanilla) -->
<div class="tilt-card" data-tilt data-tilt-max="25" data-tilt-speed="400" data-tilt-glare="true">
  <p>Card com tilt</p>
</div>
<script src="https://unpkg.com/tilt.js/dest/tilt.jquery.js"></script>
```

```tsx
// Via React (vanilla JS)
import { useEffect, useRef } from 'react'
import VanillaTilt from 'tilt.js'

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    VanillaTilt.init(ref.current, { max: 25, speed: 400, glare: true, 'max-glare': 0.5 })
    return () => (ref.current as any)?.vanillaTilt?.destroy()
  }, [])
  return <div ref={ref} style={{ padding: '2rem', background: '#1a1a2e', borderRadius: 12 }}>Card Tilt</div>
}
```

---

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
