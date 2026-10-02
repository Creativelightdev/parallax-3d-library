# parallax-3d-library

Biblioteca de efeitos parallax e 3D para projetos web, baseada em [simpleParallax.js](https://github.com/geosigno/simpleParallax.js).

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- [simple-parallax-js](https://www.npmjs.com/package/simple-parallax-js) v7
- [react-scroll-parallax](https://www.npmjs.com/package/react-scroll-parallax) v3

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
