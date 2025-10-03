import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Heart, ShoppingCart, Plus, Minus, MapPin, Clock, Star, Phone, Instagram, Facebook, CheckCircle } from 'lucide-react'
import cookiesImg from './assets/cookies_centered.png'
import browniesImg from './assets/brownies.jpg'
import './App.css'

function App() {
  const [cart, setCart] = useState({})
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'checkout', 'about'
  const [showNotification, setShowNotification] = useState(false)

  const products = [
    {
      id: 'cookies',
      name: 'Cookies Artesanais',
      price: 6.90,
      originalPrice: 7.90,
      description: 'Deliciosos cookies caseiros feitos com ingredientes premium selecionados',
      longDescription: 'Nossos cookies são preparados diariamente com farinha especial, chocolate belga e muito amor. Cada cookie é cuidadosamente moldado à mão para garantir a textura perfeita.',
      emoji: '🍪',
      image: cookiesImg,
      rating: 4.9,
      reviews: 127,
      category: 'Cookies'
    },
    {
      id: 'brownies',
      name: 'Brownies Gourmet',
      price: 6.90,
      originalPrice: 8.90,
      description: 'Brownies irresistíveis com chocolate belga e textura perfeita',
      longDescription: 'Feitos com chocolate 70% cacau importado, nossos brownies têm a combinação ideal entre cremosidade e consistência. Uma explosão de sabor em cada pedaço.',
      emoji: '🍫',
      image: browniesImg,
      rating: 4.8,
      reviews: 89,
      category: 'Brownies'
    }
  ]

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
    showAddToCartNotification()
  }

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const showAddToCartNotification = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId)
      return total + (product.price * quantity)
    }, 0)
  }

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  const goToCheckout = () => {
    setCurrentPage('checkout')
    window.scrollTo(0, 0)
  }

  const goToAbout = () => {
    setCurrentPage('about')
  }

  const goHome = () => {
    setCurrentPage('home')
  }

  if (currentPage === 'checkout') {
    return <CheckoutPage cart={cart} products={products} setCurrentPage={setCurrentPage} />
  }

  if (currentPage === 'about') {
    return <AboutPage setCurrentPage={setCurrentPage} />
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <Card className="product-card p-4 border-green-500 border-2">
            <div className="flex items-center gap-2 text-green-700">
              <ShoppingCart className="w-5 h-5" />
              <span className="content-font font-semibold">Produto adicionado ao carrinho!</span>
            </div>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h2 className="brand-title text-2xl text-white cursor-pointer" onClick={goHome}>
                Doces <Heart className="inline heart-accent w-6 h-6" fill="currentColor" /> da Paixão
              </h2>
              <div className="flex gap-4 md:gap-6">
                <button 
                  onClick={goHome}
                  className={`content-font text-white/90 hover:text-white transition-colors text-sm md:text-base ${currentPage === 'home' ? 'font-semibold' : ''}`}
                >
                  Início
                </button>
                <button 
                  onClick={goToAbout}
                  className={`content-font text-white/90 hover:text-white transition-colors text-sm md:text-base ${currentPage === 'about' ? 'font-semibold' : ''}`}
                >
                  Sobre Nós
                </button>
              </div>
            </div>
            
            {getCartItemsCount() > 0 && (
              <Button 
                onClick={goToCheckout}
                className="btn-primary flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{getCartItemsCount()}</span>
                <span className="hidden sm:inline">R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="brand-title text-6xl md:text-8xl mb-6">
            Doces <Heart className="inline heart-accent w-12 h-12 md:w-16 md:h-16" fill="currentColor" /> da Paixão
          </h1>
          <div className="decorative-line mb-8"></div>
          <p className="content-font text-white text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Cookies e brownies artesanais feitos com muito amor e ingredientes premium selecionados
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              ⭐ Avaliação 4.9/5
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              🏆 Melhor de Espera Feliz
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              🍪 Feito com Amor
            </Badge>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="text-center mb-12">
          <h2 className="content-font text-3xl font-bold text-white mb-4">Nossos Produtos</h2>
          <p className="content-font text-white/80 text-lg">Produtos sempre frescos, feitos com ingredientes premium</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {products.map(product => (
            <Card key={product.id} className="product-card p-6 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-40 h-40 object-cover rounded-xl mx-auto shadow-lg"
                  />
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="content-font text-sm text-gray-600">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>

                <CardTitle className="content-font text-2xl text-gray-800 mb-2">{product.name}</CardTitle>
                <Badge variant="outline" className="mb-3">{product.category}</Badge>
                <CardDescription className="content-font text-gray-600 mb-4">
                  {product.description}
                </CardDescription>
                
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-800">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="content-font text-sm text-green-600 font-semibold">
                    Você economiza R$ {(product.originalPrice - product.price).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromCart(product.id)}
                    disabled={!cart[product.id]}
                    className="rounded-full hover:bg-red-50 hover:border-red-300"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="content-font text-xl font-semibold min-w-[3rem] text-center bg-gray-100 px-4 py-2 rounded-lg">
                    {cart[product.id] || 0}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => addToCart(product.id)}
                    className="rounded-full hover:bg-green-50 hover:border-green-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button 
                  onClick={() => addToCart(product.id)}
                  className="btn-primary w-full content-font mb-4"
                >
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {getCartItemsCount() > 0 && (
          <div className="text-center mb-16">
            <Card className="product-card max-w-md mx-auto p-6">
              <CardHeader>
                <CardTitle className="content-font flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId)
                    return (
                      <div key={productId} className="flex justify-between items-center content-font">
                        <div className="flex items-center gap-2">
                          <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                          <span className="text-sm">{quantity}x {product.name}</span>
                        </div>
                        <span className="font-semibold">R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    )
                  })}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between content-font font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={goToCheckout} className="btn-primary w-full content-font text-lg py-3">
                  Finalizar Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Order Info */}
        <div className="max-w-4xl mx-auto">
          <Card className="product-card p-8">
            <CardHeader>
              <CardTitle className="content-font text-2xl text-center text-gray-800 mb-6">
                Faça sua encomenda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-center mb-8">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 heart-accent" />
                  </div>
                  <h3 className="content-font font-semibold text-gray-800">Localização</h3>
                  <p className="content-font text-gray-600">Espera Feliz - MG</p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 heart-accent" />
                  </div>
                  <h3 className="content-font font-semibold text-gray-800">Confirme seu pedido</h3>
                  <p className="content-font text-gray-600">Pelo WhatsApp</p>
                </div>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="content-font font-semibold text-gray-800 mb-3 text-center">Como Funciona</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                    <p className="content-font text-sm text-gray-700">Escolha seus produtos</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                    <p className="content-font text-sm text-gray-700">Finalize pelo WhatsApp</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                    <p className="content-font text-sm text-gray-700">Aproveite</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="brand-title text-2xl text-white mb-4">
                Doces <Heart className="inline heart-accent w-5 h-5" fill="currentColor" /> da Paixão
              </h3>
              <p className="content-font text-white/80 text-sm">
                Doces artesanais feitos com amor e ingredientes premium em Espera Feliz - MG.
              </p>
            </div>
            
            <div>
              <h4 className="content-font font-semibold text-white mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Phone className="w-4 h-4" />
                  <span className="content-font text-sm">(32) 98482-5912</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="content-font text-sm">Espera Feliz - MG</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="content-font font-semibold text-white mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/80 hover:text-white"
                  onClick={() => window.open('https://www.instagram.com/dapaixaodoces?igsh=MXNnZG02MmV0dW1rag%3D%3D&utm_source=qr', '_blank')}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/80 hover:text-white"
                  onClick={() => window.open('https://wa.me/5532984825912?text=Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es.', '_blank')}
                >
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-6 text-center">
            <p className="content-font text-white/60 text-sm">
              © 2025 Doces da Paixão. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Componente About Page
function AboutPage({ setCurrentPage }) {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="brand-title text-2xl text-white cursor-pointer" onClick={() => setCurrentPage('home')}>
              Doces <Heart className="inline heart-accent w-6 h-6" fill="currentColor" /> da Paixão
            </h2>
            <Button 
              onClick={() => setCurrentPage('home')}
              variant="ghost"
              className="text-white hover:text-white/80"
            >
              Voltar
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="product-card p-8">
          <CardHeader>
            <CardTitle className="content-font text-3xl text-center text-gray-800 mb-6">
              Nossa História
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-16 h-16 heart-accent" fill="currentColor" />
              </div>
            </div>

            <p className="content-font text-gray-700 text-lg leading-relaxed">
              A <strong>Doces da Paixão</strong> nasceu do amor pela confeitaria artesanal e do desejo de levar momentos especiais para as famílias de Espera Feliz. Começamos pequenos, em nossa cozinha caseira, com receitas tradicionais passadas de geração em geração.
            </p>

            <p className="content-font text-gray-700 leading-relaxed">
              Cada cookie e brownie é preparado com ingredientes cuidadosamente selecionados, priorizando sempre a qualidade e o sabor autêntico. Utilizamos chocolate belga, farinha especial e ovos caipiras para garantir que cada mordida seja uma experiência única.
            </p>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="content-font font-semibold text-gray-800 mb-4">Nossos Valores</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="content-font font-semibold text-gray-700 mb-2">🌟 Qualidade</h4>
                  <p className="content-font text-sm text-gray-600">Ingredientes premium e receitas testadas</p>
                </div>
                <div>
                  <h4 className="content-font font-semibold text-gray-700 mb-2">❤️ Amor</h4>
                  <p className="content-font text-sm text-gray-600">Cada doce é feito com carinho e dedicação</p>
                </div>
                <div>
                  <h4 className="content-font font-semibold text-gray-700 mb-2">🏠 Tradição</h4>
                  <p className="content-font text-sm text-gray-600">Receitas familiares e métodos artesanais</p>
                </div>
                <div>
                  <h4 className="content-font font-semibold text-gray-700 mb-2">🤝 Comunidade</h4>
                  <p className="content-font text-sm text-gray-600">Apoiamos produtores locais</p>
                </div>
              </div>
            </div>

            <p className="content-font text-gray-700 leading-relaxed">
              Hoje, atendemos toda a região de Espera Feliz, sempre mantendo o compromisso com a qualidade e o atendimento personalizado que nos tornou referência na cidade.
            </p>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentPage('home')}
                className="btn-primary content-font px-8 py-3"
              >
                Conheça Nossos Produtos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Componente de Checkout Simplificado
function CheckoutPage({ cart, products, setCurrentPage }) {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: ''
  })
  const [upsellQuantity, setUpsellQuantity] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')

  // Garantir que a página carregue sempre no topo
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Determinar qual produto oferecer como upsell (produto com menor quantidade)
  const getUpsellProduct = () => {
    const cartProductIds = Object.keys(cart)
    
    if (cartProductIds.length === 0) {
      return null
    }
    
    if (cartProductIds.length === 1) {
      // Se só tem um produto no carrinho, oferece o outro
      const currentProductId = cartProductIds[0]
      return products.find(p => p.id !== currentProductId)
    }
    
    if (cartProductIds.length >= 2) {
      // Se tem 2 ou mais produtos, oferece o que tem menor quantidade
      let minQuantity = Infinity
      let productWithMinQuantity = null
      
      cartProductIds.forEach(productId => {
        const quantity = cart[productId]
        if (quantity < minQuantity) {
          minQuantity = quantity
          productWithMinQuantity = products.find(p => p.id === productId)
        }
      })
      
      return productWithMinQuantity
    }
    
    return null
  }

  const upsellProduct = getUpsellProduct()

  // Calcular totais
  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId)
      return total + (product.price * quantity)
    }, 0)
  }

  const getUpsellTotal = () => {
    if (!upsellProduct || upsellQuantity === 0) return 0
    return upsellProduct.price * upsellQuantity
  }

  // Calcular desconto de 15% apenas para o produto de upsell com 2+ unidades
  const getDiscountAmount = () => {
    let totalDiscount = 0
    
    // Aplicar desconto APENAS no produto de upsell, a partir da 2ª unidade
    if (upsellQuantity >= 2 && upsellProduct) {
      const discountedQuantity = upsellQuantity - 1 // Primeira unidade sem desconto
      totalDiscount += (upsellProduct.price * discountedQuantity * 0.15)
    }
    
    return totalDiscount
  }

  const getFinalTotal = () => {
    const cartTotal = getCartTotal()
    const upsellTotal = getUpsellTotal()
    const discountAmount = getDiscountAmount()
    let subtotal = cartTotal + upsellTotal - discountAmount
    
    // Aplicar acréscimo de 5% se escolheu cartão
    if (paymentMethod === 'cartao') {
      subtotal = subtotal * 1.05
    }
    
    return subtotal
  }

  const getCardFeeAmount = () => {
    if (paymentMethod === 'cartao') {
      const cartTotal = getCartTotal()
      const upsellTotal = getUpsellTotal()
      const discountAmount = getDiscountAmount()
      const subtotal = cartTotal + upsellTotal - discountAmount
      
      return subtotal * 0.05
    }
    return 0
  }

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormValid = () => {
    return customerData.name.trim() && 
           customerData.phone.trim() && 
           paymentMethod
  }

  const handleConfirmOrder = () => {
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos obrigatórios e selecione a forma de pagamento.')
      return
    }

    // Criar carrinho final incluindo upsell se selecionado
    const finalCart = { ...cart }
    if (upsellProduct && upsellQuantity > 0) {
      finalCart[upsellProduct.id] = upsellQuantity
    }

    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
      return `DP${timestamp}${random}`
    }

    const orderNumber = generateOrderNumber()
    const finalTotal = getFinalTotal()

    // Gerar mensagem do WhatsApp
    let message = `🍪 *NOVO PEDIDO - DOCES DA PAIXÃO* 🍫\n\n`
    message += `📋 *Pedido:* ${orderNumber}\n`
    message += `👤 *Cliente:* ${customerData.name}\n`
    message += `📱 *WhatsApp:* ${customerData.phone}\n\n`
    
    message += `🛒 *PRODUTOS:*\n`
    Object.entries(finalCart).forEach(([productId, quantity]) => {
      const product = products.find(p => p.id === productId)
      message += `• ${quantity}x ${product.name} - R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}\n`
    })
    
    if (upsellQuantity === 2) {
      message += `\n🎉 *DESCONTO ESPECIAL:* 10% aplicado!\n`
      message += `💚 *Economia:* R$ ${getDiscountAmount().toFixed(2).replace('.', ',')}\n`
    }
    
    message += `\n💰 *Total:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n`
    
    const paymentLabels = {
      'pix': '💰 PIX',
      'cartao': '💳 Cartão'
    }
    message += `💳 *Forma de Pagamento:* ${paymentLabels[paymentMethod]}\n`
    
    if (paymentMethod === 'cartao') {
      message += `💳 *Acréscimo Cartão (5%):* R$ ${getCardFeeAmount().toFixed(2).replace('.', ',')}\n`
      message += `💳 *Confirme o pagamento pelo WhatsApp*\n`
    }
    
    if (specialInstructions.trim()) {
      message += `\n📝 *Observações:* ${specialInstructions}\n`
    }
    
    message += `\n✅ Cliente confirma o pedido e aguarda instruções.`

    const whatsappNumber = '5532984825912'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 mb-8">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="brand-title text-2xl text-white">
              Doces <Heart className="inline heart-accent w-6 h-6" fill="currentColor" /> da Paixão
            </h2>
            <Button 
              onClick={() => setCurrentPage('home')}
              variant="ghost"
              className="text-white hover:text-white/80"
            >
              Voltar
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <Card className="product-card p-8">
          <CardHeader>
            <CardTitle className="content-font text-3xl text-center text-gray-800 mb-8">
              Finalizar Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Resumo do Pedido */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="content-font font-semibold text-gray-800 mb-4 text-lg">Resumo do Pedido</h4>
              <div className="space-y-3">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find(p => p.id === productId)
                  return (
                    <div key={productId} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <span className="content-font font-medium">{quantity}x {product.name}</span>
                          <p className="content-font text-sm text-gray-600">R$ {product.price.toFixed(2).replace('.', ',')} cada</p>
                        </div>
                      </div>
                      <span className="content-font font-semibold">R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                  )
                })}
                
                {upsellProduct && upsellQuantity > 0 && (
                  <div className="flex justify-between items-center border-t pt-3">
                    <div className="flex items-center gap-3">
                      <img src={upsellProduct.image} alt={upsellProduct.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <span className="content-font font-medium text-green-600">{upsellQuantity}x {upsellProduct.name}</span>
                        <p className="content-font text-sm text-gray-600">R$ {upsellProduct.price.toFixed(2).replace('.', ',')} cada</p>
                      </div>
                    </div>
                    <span className="content-font font-semibold text-green-600">R$ {getUpsellTotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between content-font text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {(getCartTotal() + getUpsellTotal()).toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  {getDiscountAmount() > 0 && (
                    <div className="flex justify-between content-font text-sm text-green-600">
                      <span>Desconto Especial (15%):</span>
                      <span>-R$ {getDiscountAmount().toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  {paymentMethod === 'cartao' && (
                    <div className="flex justify-between content-font text-sm text-orange-600">
                      <span>Acréscimo Cartão (5%):</span>
                      <span>+R$ {getCardFeeAmount().toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between content-font font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {getFinalTotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upsell Section */}
            {upsellProduct && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
                <h4 className="content-font font-semibold text-gray-800 mb-4 text-lg">
                  🎉 Oferta Especial para Você!
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <img src={upsellProduct.image} alt={upsellProduct.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <h5 className="content-font font-semibold text-gray-800">{upsellProduct.name}</h5>
                    <p className="content-font text-sm text-gray-600">{upsellProduct.description}</p>
                    <p className="content-font text-lg font-bold text-green-600">
                      R$ {upsellProduct.price.toFixed(2).replace('.', ',')} cada
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-4">
                  <span className="content-font font-medium block">Quantidade:</span>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <Button
                      variant={upsellQuantity === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUpsellQuantity(0)}
                      className="w-full sm:w-auto"
                    >
                      Não, obrigado
                    </Button>
                    <Button
                      variant={upsellQuantity === 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUpsellQuantity(1)}
                      className="w-full sm:w-auto"
                    >
                      1 unidade
                    </Button>
                    <Button
                      variant={upsellQuantity >= 2 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUpsellQuantity(2)}
                      className="relative w-full sm:w-auto"
                    >
                      2+ unidades
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">15% OFF</Badge>
                    </Button>
                  </div>
                  
                  {upsellQuantity >= 2 && (
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setUpsellQuantity(Math.max(2, upsellQuantity - 1))}
                        className="rounded-full hover:bg-red-50 hover:border-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="content-font text-xl font-semibold min-w-[3rem] text-center bg-gray-100 px-4 py-2 rounded-lg">
                        {upsellQuantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setUpsellQuantity(upsellQuantity + 1)}
                        className="rounded-full hover:bg-green-50 hover:border-green-300"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                {upsellQuantity >= 2 && (
                  <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                    <p className="content-font text-sm text-green-800 font-semibold mb-1">
                      🎉 Desconto Especial Ativado!
                    </p>
                    <p className="content-font text-xs text-green-700">
                      15% de desconto a partir da 2ª unidade de {upsellProduct.name}!
                    </p>
                    <p className="content-font text-sm text-green-800 font-bold">
                      Você economiza: R$ {((upsellProduct.price * (upsellQuantity - 1)) * 0.15).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Opções de Pagamento */}
            <div className="space-y-4">
              <h4 className="content-font font-semibold text-gray-800 text-lg">Como você quer pagar?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'pix' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <div className="text-center">
                    <div className={`w-5 h-5 rounded-full border-2 mx-auto mb-3 ${
                      paymentMethod === 'pix' 
                        ? 'border-pink-500 bg-pink-500' 
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'pix' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <h5 className="content-font font-semibold text-gray-800 mb-2">💰 PIX</h5>
                    <p className="content-font text-sm text-gray-600 mb-1">Instantâneo e seguro</p>
                    <p className="content-font text-xs text-green-600 font-semibold">Sem taxas adicionais</p>
                  </div>
                </div>
                
                <div 
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cartao' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                  onClick={() => setPaymentMethod('cartao')}
                >
                  <div className="text-center">
                    <div className={`w-5 h-5 rounded-full border-2 mx-auto mb-3 ${
                      paymentMethod === 'cartao' 
                        ? 'border-pink-500 bg-pink-500' 
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'cartao' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <h5 className="content-font font-semibold text-gray-800 mb-2">💳 Cartão</h5>
                    <p className="content-font text-sm text-gray-600 mb-1">Débito ou Crédito</p>
                    <p className="content-font text-xs text-orange-600 font-semibold">Acréscimo de 5%</p>
                  </div>
                </div>
              </div>
              
              {/* Instruções de Pagamento */}
              {paymentMethod === 'pix' && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h5 className="content-font font-semibold text-green-800 mb-3">
                    🎉 Ótima escolha! PIX é rápido e sem taxas
                  </h5>
                  <p className="content-font text-sm text-green-700 mb-3">
                    Após confirmar o pedido, você receberá a chave PIX:
                  </p>
                  <div className="bg-white p-4 rounded border border-green-300 text-center">
                    <p className="content-font text-xl font-bold text-green-800">
                      32984825912
                    </p>
                  </div>
                  <p className="content-font text-xs text-green-600 mt-3 text-center">
                    Envie o comprovante via WhatsApp após o pagamento
                  </p>
                </div>
              )}
              
              {paymentMethod === 'cartao' && (
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h5 className="content-font font-semibold text-orange-800 mb-3">
                    💳 Pagamento no Cartão
                  </h5>
                  <p className="content-font text-sm text-orange-700 mb-3">
                    Acréscimo de 5% aplicado ao valor total:
                  </p>
                  <div className="bg-white p-4 rounded border border-orange-300">
                    <div className="text-center">
                      <p className="content-font text-sm text-orange-800 mb-1">
                        <strong>Acréscimo:</strong> R$ {getCardFeeAmount().toFixed(2).replace('.', ',')}
                      </p>
                      <p className="content-font text-lg font-bold text-orange-800">
                        <strong>Total final:</strong> R$ {getFinalTotal().toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                  <p className="content-font text-xs text-orange-600 mt-3 text-center">
                    Confirme o pagamento pelo WhatsApp
                  </p>
                </div>
              )}
            </div>

            {/* Formulário de Dados */}
            <div className="space-y-6">
              <h4 className="content-font font-semibold text-gray-800 text-lg">Seus Dados</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="content-font text-sm font-medium text-gray-700 block mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    type="text"
                    value={customerData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="content-font"
                  />
                </div>
                
                <div>
                  <label className="content-font text-sm font-medium text-gray-700 block mb-2">
                    WhatsApp *
                  </label>
                  <Input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(32) 99999-9999"
                    className="content-font"
                  />
                </div>
              </div>

              <div>
                <label className="content-font text-sm font-medium text-gray-700 block mb-2">
                  Observações (opcional)
                </label>
                <Textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Alguma observação especial sobre seu pedido?"
                  rows={2}
                  className="content-font"
                />
              </div>
            </div>

            {/* Informações Importantes */}
            <div className="bg-pink-50 p-6 rounded-lg">
              <h4 className="content-font font-semibold text-gray-800 mb-3">📋 Informações Importantes</h4>
              <ul className="content-font text-sm text-gray-700 space-y-2">
                <li>• Produtos sempre frescos, feitos com ingredientes premium</li>
                <li>• Entre em contato pelo WhatsApp para mais informações</li>
                <li>• Localização: Espera Feliz - MG</li>
              </ul>
            </div>

            {/* Botões */}
            <div className="space-y-4">
              <Button 
                onClick={handleConfirmOrder}
                disabled={!isFormValid()}
                className="btn-primary w-full content-font text-sm sm:text-lg py-4 px-2 sm:px-4 whitespace-nowrap"
              >
                📱 Confirmar Pedido via WhatsApp
              </Button>
              
              <Button 
                onClick={() => setCurrentPage('home')} 
                variant="outline"
                className="w-full content-font"
              >
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
