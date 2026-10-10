import { useMemo, useState } from 'react'
import { ArrowRight, Menu, X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'

type Category = 'Bovinos' | 'Frango' | 'Veganos'
type Burger = { id: number; name: string; category: Category; description: string; price: number; image: string; tag?: string }

const burgers: Burger[] = [
  { id: 1, name: 'Cheddar Supremo', category: 'Bovinos', description: 'Duplo smash bovino, cheddar cremoso, cebola caramelizada e molho da casa.', price: 32.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85', tag: 'Mais pedido' },
  { id: 2, name: 'Bacon Crocante', category: 'Bovinos', description: 'Hambúrguer bovino, cheddar, bacon crocante, alface e molho barbecue.', price: 34.9, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=1000&q=85' },
  { id: 3, name: 'Smash Clássico', category: 'Bovinos', description: 'Dois smash burgers, queijo, picles, cebola e molho especial.', price: 27.9, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1000&q=85' },
  { id: 4, name: 'BBQ Bruto', category: 'Bovinos', description: 'Carne bovina suculenta, cheddar, onion rings e barbecue defumado.', price: 36.9, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85' },
  { id: 5, name: 'Triplo Insano', category: 'Bovinos', description: 'Três camadas de carne, cheddar derretido, cebola e molho da casa.', price: 39.9, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1000&q=85', tag: 'Para os famintos' },
  { id: 6, name: 'Chicken Crispy', category: 'Frango', description: 'Frango empanado crocante, queijo, alface, tomate e maionese temperada.', price: 29.9, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=85' },
  { id: 7, name: 'Frango Cheddar', category: 'Frango', description: 'Frango grelhado, cheddar cremoso, cebola roxa e molho de ervas.', price: 28.9, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=85' },
  { id: 8, name: 'Veggie Fresh', category: 'Veganos', description: 'Burger de feijão, alface, tomate, avocado e molho vegano.', price: 27.9, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=85', tag: '100% vegetal' },
  { id: 9, name: 'Vegan Cheddar', category: 'Veganos', description: 'Burger vegetal, cheddar vegano, cebola caramelizada e maionese vegana.', price: 31.9, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=85' },
  { id: 10, name: 'Grão Crocante', category: 'Veganos', description: 'Burger de grão-de-bico, rúcula, tomate, cebola roxa e molho de alho vegano.', price: 26.9, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=85' },
]

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<'Todos' | Category>('Todos')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const visibleBurgers = useMemo(() => filter === 'Todos' ? burgers : burgers.filter((burger) => burger.category === filter), [filter])
  const cartItems = burgers.filter((burger) => cart[burger.id])
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const total = cartItems.reduce((sum, burger) => sum + burger.price * cart[burger.id], 0)
  const add = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  const change = (id: number, amount: number) => setCart((current) => {
    const next = { ...current }
    const quantity = (next[id] || 0) + amount
    if (quantity <= 0) delete next[id]
    else next[id] = quantity
    return next
  })
  const checkout = () => {
    const order = cartItems.map((burger) => `${cart[burger.id]}x ${burger.name} — ${money(burger.price * cart[burger.id])}`).join('\n')
    const message = encodeURIComponent(`Olá! Quero fazer um pedido:\n${order}\nTotal: ${money(total)}\n\nPor favor, confirmem a disponibilidade e a entrega.`)
    window.open(`https://wa.me/5500000000000?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)} aria-label="Brasa Burger — início">
          <span className="brand-mark">B<span>.</span></span><span className="brand-name">BRASA<span>BURGER & LANCHES</span></span>
        </a>
        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#cardapio" onClick={() => setMenuOpen(false)}>Cardápio</a><a href="#sobre" onClick={() => setMenuOpen(false)}>Nossa brasa</a><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          <button className="cart-button" onClick={() => { setCartOpen(true); setMenuOpen(false) }}><ShoppingBag size={17} /> Sacola <span>{cartCount}</span></button>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Hambúrguer artesanal suculento com queijo derretido" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span /> HAMBÚRGUER ARTESANAL • FEITO NA BRASA</p>
          <h1>O sabor que<br /><em>incendeia</em> sua fome.</h1>
          <p className="hero-description">Pão macio, carne suculenta e ingredientes de verdade. Seu próximo favorito está aqui.</p>
          <a className="button button-light" href="#cardapio">Explorar cardápio <ArrowRight size={17} /></a>
        </div>
        <div className="hero-bottom"><span className="hero-caption">FEITO NA HORA. FEITO COM VONTADE.</span><a className="scroll-cue" href="#cardapio">DESCUBRA ↓</a></div>
      </section>

      <section className="intro section-wrap" id="sobre">
        <div className="intro-kicker"><span className="section-number">01 /</span><span>MAIS QUE UM LANCHE</span></div>
        <div className="intro-copy">
          <p className="eyebrow">A GENTE LEVA A BRASA A SÉRIO</p>
          <h2>Ingredientes honestos.<br /><span>Sabor de verdade.</span></h2>
          <div className="intro-bottom"><p>Do primeiro tostado do pão à última mordida, cada detalhe importa. Criamos lanches caprichados para transformar a fome em um momento que dá vontade de repetir.</p><a className="text-link" href="#cardapio">Conheça o cardápio <ArrowRight size={16} /></a></div>
        </div>
        <div className="intro-watermark" aria-hidden="true">B.</div>
      </section>

      <section className="menu-section section-wrap" id="cardapio">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-number">02 /</span> ESCOLHA SEU FAVORITO</p><h2>Feitos para matar<br /><span>a sua fome.</span></h2></div><p className="section-aside">De clássicos irresistíveis<br />a opções vegetais cheias de sabor.</p></div>
        <div className="filters" role="group" aria-label="Filtrar cardápio">
          {(['Todos', 'Bovinos', 'Frango', 'Veganos'] as const).map((category) => <button key={category} className={filter === category ? 'filter-button active' : 'filter-button'} onClick={() => setFilter(category)}>{category}</button>)}
        </div>
        <div className="burgers-grid">
          {visibleBurgers.map((burger) => <article className="burger-card" key={burger.id}>
            <div className="burger-image-wrap"><img src={burger.image} alt={burger.name} loading="lazy" />{burger.tag && <span className="burger-tag">{burger.tag}</span>}<span className="burger-category">{burger.category}</span></div>
            <div className="burger-info"><div className="burger-title-row"><h3>{burger.name}</h3><span className="burger-price">{money(burger.price)}</span></div><p>{burger.description}</p><button className="add-button" onClick={() => add(burger.id)}><Plus size={16} /> Adicionar à sacola</button></div>
          </article>)}
        </div>
        <p className="menu-note">Imagens ilustrativas. Consulte a equipe sobre ingredientes, alergênicos e disponibilidade.</p>
      </section>

      <section className="experience">
        <div className="experience-image" role="img" aria-label="Hambúrguer artesanal preparado na chapa" />
        <div className="experience-overlay" />
        <div className="experience-content"><p className="eyebrow">03 / NOSSA RECEITA</p><h2>O segredo está<br />no <em>capricho.</em></h2><p className="experience-description">Carne bem selada, queijo derretendo, combinações que funcionam e aquele molho especial que faz você voltar.</p><a className="button button-outline" href="#cardapio">Encontrar meu lanche <ArrowRight size={16} /></a></div>
        <div className="experience-stamp"><span>FEITO</span><span>NA</span><span>BRASA.</span></div>
      </section>

      <section className="pillars section-wrap" aria-label="Nossos compromissos">
        <article className="pillar"><span className="pillar-index">01</span><h3>Ingredientes frescos</h3><p>Combinações caprichadas e ingredientes escolhidos para valorizar cada mordida.</p><span className="pillar-symbol">✳</span></article>
        <article className="pillar"><span className="pillar-index">02</span><h3>Feito na hora</h3><p>Preparo cuidadoso para seu lanche chegar quentinho e cheio de sabor.</p><span className="pillar-symbol">✳</span></article>
        <article className="pillar"><span className="pillar-index">03</span><h3>Tem opção pra geral</h3><p>Do smash bovino às opções veganas, todo mundo merece um lanche especial.</p><span className="pillar-symbol">✳</span></article>
      </section>

      <section className="closing" id="contato"><div className="closing-line" /><p className="eyebrow">A FOME NÃO VAI ESPERAR</p><h2>Partiu um<br /><em>Brasa Burger?</em></h2><p className="closing-description">Escolha seus favoritos e monte seu pedido na sacola.</p><button className="button button-dark" onClick={() => { setCartOpen(true); document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' }) }}>Montar meu pedido <ArrowRight size={16} /></button><span className="closing-mark" aria-hidden="true">B.</span></section>
      <footer className="site-footer"><a className="footer-brand" href="#inicio">BRASA<span>BURGER & LANCHES</span></a><p>Um projeto demonstrativo de hamburgueria.</p><span>© {new Date().getFullYear()} · FEITO COM FOME</span></footer>

      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Sua sacola">
        <div className="cart-heading"><div><p className="eyebrow">SEU PEDIDO</p><h2>Sacola <span>({cartCount})</span></h2></div><button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Fechar sacola"><X /></button></div>
        {cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><h3>Sua sacola está vazia</h3><p>Escolha um lanche no cardápio para começar.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' }) }}>Ver cardápio <ArrowRight size={16} /></button></div> : <>
          <div className="cart-items">{cartItems.map((burger) => <div className="cart-item" key={burger.id}><img src={burger.image} alt="" /><div className="cart-item-info"><h3>{burger.name}</h3><p>{money(burger.price)}</p><div className="quantity-controls"><button onClick={() => change(burger.id, -1)} aria-label={`Diminuir ${burger.name}`}><Minus size={13} /></button><span>{cart[burger.id]}</span><button onClick={() => add(burger.id)} aria-label={`Aumentar ${burger.name}`}><Plus size={13} /></button><button className="remove-item" onClick={() => change(burger.id, -cart[burger.id])} aria-label={`Remover ${burger.name}`}><Trash2 size={14} /></button></div></div><strong>{money(burger.price * cart[burger.id])}</strong></div>)}</div>
          <div className="cart-footer"><div className="cart-total"><span>Total estimado</span><strong>{money(total)}</strong></div><p>Entrega e taxas serão confirmadas no atendimento.</p><button className="checkout-button" onClick={checkout}>Continuar pelo WhatsApp <ArrowRight size={17} /></button><small>Configure o número de WhatsApp da loja antes de usar em produção.</small></div>
        </>}
      </aside></div>}
    </main>
  )
}

export default App
