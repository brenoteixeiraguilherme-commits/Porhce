import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react'

const models = [
  {
    number: '01',
    name: '911',
    type: 'ÍCONE ESPORTIVO',
    description: 'Uma silhueta inconfundível. A emoção de dirigir, em sua forma mais pura.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    alt: 'Cupê esportivo em tom prata fotografado em ambiente externo',
    className: 'model-card--911',
  },
  {
    number: '02',
    name: 'Taycan',
    type: '100% ELÉTRICO',
    description: 'Performance elétrica com uma presença que transforma cada trajeto.',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1400&q=85',
    alt: 'Automóvel esportivo elétrico em cenário arquitetônico',
    className: 'model-card--taycan',
  },
  {
    number: '03',
    name: 'Cayenne',
    type: 'SUV ESPORTIVO',
    description: 'Versatilidade, potência visual e conforto para ir além do esperado.',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1400&q=85',
    alt: 'SUV premium em estrada aberta',
    className: 'model-card--cayenne',
  },
]

const gallery = [
  {
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85',
    alt: 'Detalhe da carroceria de um automóvel esportivo',
    label: 'Forma & função',
  },
  {
    image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=85',
    alt: 'Automóvel esportivo em ambiente urbano',
    label: 'Feito para sentir',
  },
  {
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=85',
    alt: 'Carro visto de frente em uma composição minimalista',
    label: 'A presença',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Porsche Concept — início" onClick={closeMenu}>
          <span className="wordmark-symbol">P</span>
          <span className="wordmark-text">PORSCHE<span>CONCEPT</span></span>
        </a>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#modelos" onClick={closeMenu}>Modelos</a>
          <a href="#essencia" onClick={closeMenu}>Essência</a>
          <a href="#galeria" onClick={closeMenu}>Galeria</a>
          <a className="nav-contact" href="#conceito" onClick={closeMenu}>Sobre o projeto <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-image" role="img" aria-label="Porsche 911 prateado em uma estrada de montanha ao entardecer" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span /> PRECISÃO EM MOVIMENTO</p>
          <h1 id="hero-title">A arte de<br /><em>desafiar limites.</em></h1>
          <p className="hero-description">Não é apenas sobre chegar. É sobre tudo o que você sente no caminho.</p>
          <a className="button button-light" href="#modelos">Explorar modelos <ArrowRight size={17} /></a>
        </div>
        <div className="hero-bottom">
          <span className="hero-caption">DESIGN QUE MOVE. EMOÇÃO QUE FICA.</span>
          <a className="scroll-cue" href="#intro" aria-label="Rolar para a próxima seção">SCROLL <ArrowDownRight size={15} /></a>
        </div>
        <div className="hero-index"><span>01</span><i /><span>03</span></div>
      </section>

      <section className="intro section-wrap" id="intro">
        <div className="intro-kicker"><span className="section-number">01 /</span><span>UMA IDEIA EM CONSTANTE MOVIMENTO</span></div>
        <div className="intro-copy">
          <p className="eyebrow">MAIS DO QUE MÁQUINAS</p>
          <h2>Engenharia com<br /> <span>alma.</span> Design com propósito.</h2>
          <div className="intro-bottom">
            <p>Cada linha tem uma intenção. Cada detalhe, uma razão. Uma homenagem à busca incansável por experiências que ficam na memória muito depois da estrada terminar.</p>
            <a className="text-link" href="#essencia">Descubra a essência <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="intro-watermark" aria-hidden="true">P.</div>
      </section>

      <section className="models-section section-wrap" id="modelos">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="section-number">02 /</span> A EXPRESSÃO DA PERFORMANCE</p>
            <h2>Três formas de<br /><span>sentir o extraordinário.</span></h2>
          </div>
          <p className="section-aside">Personalidades distintas.<br />A mesma obsessão por cada detalhe.</p>
        </div>

        <div className="models-grid">
          {models.map((model) => (
            <article className={`model-card ${model.className}`} key={model.name}>
              <div className="model-image-wrap">
                <img src={model.image} alt={model.alt} loading="lazy" />
                <span className="model-number">{model.number}</span>
                <span className="model-image-label">{model.type}</span>
                <a className="model-arrow" href="#conceito" aria-label={`Conheça o conceito do modelo ${model.name}`}><ArrowUpRight size={20} /></a>
              </div>
              <div className="model-info">
                <div>
                  <h3>{model.name}</h3>
                  <p>{model.description}</p>
                </div>
                <span className="model-line" />
              </div>
            </article>
          ))}
        </div>
        <p className="disclaimer-inline">Nomes de modelos utilizados apenas para fins ilustrativos. Projeto independente e não oficial.</p>
      </section>

      <section className="experience" id="essencia">
        <div className="experience-image" role="img" aria-label="Automóvel esportivo em uma composição cinematográfica de luz e sombra" />
        <div className="experience-overlay" />
        <div className="experience-content">
          <p className="eyebrow"><span className="section-number">03 /</span> A EXPERIÊNCIA</p>
          <h2>O destino é só<br />parte da <em>história.</em></h2>
          <p className="experience-description">A verdadeira performance está no equilíbrio entre o que a engenharia cria e o que você sente. Em cada curva, uma nova perspectiva.</p>
          <a className="button button-outline" href="#galeria">Explore a sensação <MoveUpRight size={16} /></a>
        </div>
        <div className="experience-stamp"><span>FORM</span><span>FOLLOWS</span><span>FEELING.</span></div>
      </section>

      <section className="pillars section-wrap" aria-label="Pilares da experiência">
        <article className="pillar">
          <span className="pillar-index">01</span>
          <h3>Design</h3>
          <p>Proporções marcantes e linhas que atravessam o tempo sem perder sua identidade.</p>
          <ChevronDown size={16} aria-hidden="true" />
        </article>
        <article className="pillar">
          <span className="pillar-index">02</span>
          <h3>Engenharia</h3>
          <p>Uma cultura de precisão em que cada componente tem seu lugar e seu propósito.</p>
          <ChevronDown size={16} aria-hidden="true" />
        </article>
        <article className="pillar">
          <span className="pillar-index">03</span>
          <h3>Performance</h3>
          <p>A conexão entre máquina e condutor, transformando movimento em emoção.</p>
          <ChevronDown size={16} aria-hidden="true" />
        </article>
      </section>

      <section className="gallery-section section-wrap" id="galeria">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow"><span className="section-number">04 /</span> DETALHES QUE FALAM</p>
            <h2>Uma questão<br /><span>de perspectiva.</span></h2>
          </div>
          <p>Da primeira impressão ao último detalhe, a beleza está naquilo que não precisa ser explicado.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure className={`gallery-item gallery-item--${index + 1}`} key={item.label}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <figcaption><span>0{index + 1}</span>{item.label}<ArrowUpRight size={15} /></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="closing" id="conceito">
        <div className="closing-line" />
        <p className="eyebrow">UM PROJETO CONCEITUAL INDEPENDENTE</p>
        <h2>Feito para quem<br /><em>não fica parado.</em></h2>
        <a className="button button-light" href="#inicio">Voltar ao início <ArrowUpRight size={16} /></a>
        <span className="closing-mark" aria-hidden="true">P.</span>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#inicio">PORSCHE<span>CONCEPT</span></a>
        <p>Projeto de estudo visual, sem vínculo com a Porsche AG.</p>
        <span>© {new Date().getFullYear()} · CONCEITO INDEPENDENTE</span>
      </footer>
    </main>
  )
}

export default App
