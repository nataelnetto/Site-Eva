import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, ShoppingCart, Plus, Minus, MapPin, Clock, Bike } from 'lucide-react'
import cookiesImg from './assets/cookies.jpg'
import browniesImg from './assets/brownies.jpg'
import './App.css'

function App() {
  const [cart, setCart] = useState({})
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'checkout'

  const products = [
    {
      id: 'cookies',
      name: 'Cookies Artesanais',
      price: 7.90,
      description: 'Deliciosos cookies caseiros feitos com ingredientes selecionados',
      emoji: '🍪',
      image: cookiesImg
    },
    {
      id: 'brownies',
      name: 'Brownies Gourmet',
      price: 10.90,
      description: 'Brownies irresistíveis com chocolate belga e textura perfeita',
      emoji: '🍫',
      image: browniesImg
    }
  ]

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
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
  }

  if (currentPage === 'checkout') {
    return <CheckoutPage cart={cart} products={products} setCurrentPage={setCurrentPage} />
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="brand-title text-6xl md:text-8xl mb-4">
            Doces <Heart className="inline heart-accent w-12 h-12 md:w-16 md:h-16" fill="currentColor" /> da Paixão
          </h1>
          <div className="decorative-line mb-6"></div>
          <p className="content-font text-white text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Cookies e brownies artesanais feitos com muito amor e ingredientes selecionados
          </p>
        </div>
      </header>

      {/* Produtos */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {products.map(product => (
            <Card key={product.id} className="product-card p-6">
              <CardHeader className="text-center">
                <div className="mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg mx-auto shadow-lg"
                  />
                </div>
                <CardTitle className="content-font text-2xl text-gray-800">{product.name}</CardTitle>
                <CardDescription className="content-font text-gray-600 mt-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-6">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromCart(product.id)}
                    disabled={!cart[product.id]}
                    className="rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="content-font text-xl font-semibold min-w-[3rem] text-center">
                    {cart[product.id] || 0}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => addToCart(product.id)}
                    className="rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Carrinho e Checkout */}
        {getCartItemsCount() > 0 && (
          <div className="text-center">
            <Card className="product-card max-w-md mx-auto p-6">
              <CardHeader>
                <CardTitle className="content-font flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Seu Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId)
                    return (
                      <div key={productId} className="flex justify-between content-font text-sm">
                        <span>{quantity}x {product.name}</span>
                        <span>R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    )
                  })}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between content-font font-bold">
                      <span>Total:</span>
                      <span>R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={goToCheckout} className="btn-primary w-full content-font">
                  Finalizar Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Informações de Entrega */}
        <div className="max-w-md mx-auto mt-12">
          <Card className="product-card p-6">
            <CardHeader>
              <CardTitle className="content-font text-xl text-center text-gray-800">
                Informações de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="content-font text-lg text-gray-700">
                Confirmar via WhatsApp
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Componente de Checkout com Upsell Integrado
function CheckoutPage({ cart, products, setCurrentPage }) {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: ''
  })
  const [upsellQuantity, setUpsellQuantity] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')
  // Determinar qual produto oferecer como upsell
  const getUpsellProduct = () => {
    const cartProductIds = Object.keys(cart)
    if (cartProductIds.length === 1) {
      // Se tem apenas um produto no carrinho, oferece o outro
      const currentProductId = cartProductIds[0]
      return products.find(p => p.id !== currentProductId)
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

  const getFinalTotal = () => {
    const cartTotal = getCartTotal()
    const upsellTotal = getUpsellTotal()
    let subtotal = cartTotal + upsellTotal
    
    // Aplicar desconto de 10% se escolheu 2 unidades do produto upsell
    if (upsellQuantity === 2) {
      subtotal = subtotal * 0.9
    }
    
    // Aplicar acréscimo de 5% se escolheu cartão
    if (paymentMethod === 'cartao') {
      subtotal = subtotal * 1.05
    }
    
    return subtotal
  }

  const getDiscountAmount = () => {
    if (upsellQuantity === 2) {
      const subtotal = getCartTotal() + getUpsellTotal()
      return subtotal * 0.1
    }
    return 0
  }

  const getCardFeeAmount = () => {
    if (paymentMethod === 'cartao') {
      const cartTotal = getCartTotal()
      const upsellTotal = getUpsellTotal()
      let subtotal = cartTotal + upsellTotal
      
      // Aplicar desconto primeiro se aplicável
      if (upsellQuantity === 2) {
        subtotal = subtotal * 0.9
      }
      
      return subtotal * 0.05
    }
    return 0
  }

  const showDiscount = upsellQuantity === 2
  const showCardFee = paymentMethod === 'cartao'

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormValid = () => {
    return customerData.name.trim() && 
           customerData.phone.trim() && 
           customerData.address.trim() &&
           paymentMethod
  }

  const handleConfirmOrder = () => {
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos obrigatórios e selecione as opções de pagamento e recebimento.')
      return
    }

    // Criar carrinho final incluindo upsell se selecionado
    const finalCart = { ...cart }
    if (upsellProduct && upsellQuantity > 0) {
      finalCart[upsellProduct.id] = upsellQuantity
    }

    // Gerar número do pedido
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
      return `DP${timestamp}${random}`
    }

    const orderNumber = generateOrderNumber()
    const finalTotal = getFinalTotal()

    const discountAmount = getDiscountAmount()

    // Gerar mensagem do WhatsApp
    let message = `🍪 *NOVO PEDIDO - DOCES DA PAIXÃO* 🍫\n\n`
    message += `📋 *Pedido:* ${orderNumber}\n`
    message += `👤 *Cliente:* ${customerData.name}\n`
    message += `📱 *WhatsApp:* ${customerData.phone}\n`
    
    message += `📍 *Endereço:* ${customerData.address}\n`
    message += `\n`
    
    message += `🛒 *PRODUTOS:*\n`
    Object.entries(finalCart).forEach(([productId, quantity]) => {
      const product = products.find(p => p.id === productId)
      message += `• ${quantity}x ${product.name} - R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}\n`
    })
    
    if (showDiscount) {
      const originalTotal = getCartTotal() + getUpsellTotal()
      message += `\n🎉 *DESCONTO ESPECIAL:* 10% aplicado!\n`
      message += `💰 *Valor original:* R$ ${originalTotal.toFixed(2).replace('.', ',')}\n`
      message += `💰 *Valor com desconto:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n`
      message += `💚 *Economia:* R$ ${discountAmount.toFixed(2).replace('.', ',')}\n`
    } else {
      message += `\n💰 *Total:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n`
    }
    
    message += `\n`
    
    // Adicionar informações de pagamento
    const paymentLabels = {
      'pix': '💰 PIX',
      'cartao': '💳 Cartão'
    }
    message += `💳 *Forma de Pagamento:* ${paymentLabels[paymentMethod]}\n`
    
    // Adicionar acréscimo do cartão se aplicável
    if (showCardFee) {
      message += `💳 *Acréscimo Cartão (5%):* R$ ${getCardFeeAmount().toFixed(2).replace('.', ',')}\n`
    }
    
    message += `🚚 *Recebimento:* Confirmar via WhatsApp\n\n`
    
    message += `✅ Cliente confirma o pedido e aguarda instruções de pagamento.`

    // Redirecionar para WhatsApp
    const whatsappNumber = '5532984825912'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="product-card p-6">
          <CardHeader>
            <CardTitle className="content-font text-2xl text-center text-gray-800 mb-6">
              Finalizar Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resumo do Pedido */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="content-font font-semibold text-gray-800 mb-3">Resumo do Pedido</h4>
              <div className="space-y-2">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find(p => p.id === productId)
                  return (
                    <div key={productId} className="flex justify-between content-font text-sm">
                      <span>{quantity}x {product.name}</span>
                      <span>R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                  )
                })}
                
                {/* Mostrar produto upsell se selecionado */}
                {upsellProduct && upsellQuantity > 0 && (
                  <div className="flex justify-between content-font text-sm text-green-600">
                    <span>{upsellQuantity}x {upsellProduct.name}</span>
                    <span>R$ {getUpsellTotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                {/* Mostrar desconto se aplicável */}
                {showDiscount && (
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between content-font text-sm text-gray-500 line-through">
                      <span>Subtotal:</span>
                      <span>R$ {(getCartTotal() + getUpsellTotal()).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between content-font text-sm text-green-600">
                      <span>Desconto (10%):</span>
                      <span>-R$ {getDiscountAmount().toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                )}
                
                {/* Mostrar acréscimo do cartão se aplicável */}
                {showCardFee && (
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between content-font text-sm text-orange-600">
                      <span>Acréscimo Cartão (5%):</span>
                      <span>+R$ {getCardFeeAmount().toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between content-font font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {getFinalTotal().toFixed(2).replace('.', ',')}</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Oferta Upsell */}
            {upsellProduct && (
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                <h4 className="content-font font-semibold text-gray-800 mb-3 text-center">
                  🎉 Oferta Especial! 
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={upsellProduct.image} 
                    alt={upsellProduct.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h5 className="content-font font-semibold text-gray-800">
                      Que tal adicionar {upsellProduct.name}?
                    </h5>
                    <p className="content-font text-sm text-gray-600">
                      {upsellProduct.description}
                    </p>
                    <p className="content-font font-bold text-lg text-gray-800">
                      R$ {upsellProduct.price.toFixed(2).replace('.', ',')} cada
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="content-font text-sm text-gray-700 mb-3">Escolha a quantidade:</p>
                  <div className="flex justify-center gap-2 mb-3">
                    <Button 
                      onClick={() => setUpsellQuantity(0)}
                      variant={upsellQuantity === 0 ? "default" : "outline"}
                      className="content-font"
                    >
                      Não, obrigado
                    </Button>
                    <Button 
                      onClick={() => setUpsellQuantity(1)}
                      variant={upsellQuantity === 1 ? "default" : "outline"}
                      className="content-font"
                    >
                      1 unidade
                    </Button>
                    <Button 
                      onClick={() => setUpsellQuantity(2)}
                      variant={upsellQuantity === 2 ? "default" : "outline"}
                      className="content-font"
                    >
                      2 unidades
                    </Button>
                  </div>
                  
                  {upsellQuantity === 2 && (
                    <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                      <p className="content-font text-sm text-green-800 font-semibold">
                        🎉 Desconto Especial Ativado! 🎉
                      </p>
                      <p className="content-font text-xs text-green-700">
                        Ao escolher 2 unidades de {upsellProduct.name}, você ganha 10% de desconto em todo o pedido!
                      </p>
                      <p className="content-font text-sm text-green-800 font-bold">
                        Você economiza: R$ {getDiscountAmount().toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}



            {/* Opções de Pagamento */}
            <div className="space-y-4">
              <h4 className="content-font font-semibold text-gray-800">Como você quer pagar?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    customerData.address.trim() &&
           paymentMethod === 'pix' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <div className="text-center">
                    <div className={`w-4 h-4 rounded-full border-2 mx-auto mb-2 ${
                      customerData.address.trim() &&
           paymentMethod === 'pix' 
                        ? 'border-pink-500 bg-pink-500' 
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'pix' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <h5 className="content-font font-semibold text-gray-800">💰 PIX</h5>
                    <p className="content-font text-xs text-gray-600">Instantâneo</p>
                  </div>
                </div>
                
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    customerData.address.trim() &&
           paymentMethod === 'cartao' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                  onClick={() => setPaymentMethod('cartao')}
                >
                  <div className="text-center">
                    <div className={`w-4 h-4 rounded-full border-2 mx-auto mb-2 ${
                      customerData.address.trim() &&
           paymentMethod === 'cartao' 
                        ? 'border-pink-500 bg-pink-500' 
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'cartao' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <h5 className="content-font font-semibold text-gray-800">💳 Cartão</h5>
                    <p className="content-font text-xs text-gray-600">Débito/Crédito (+5%)</p>
                  </div>
                </div>
              </div>
              
              {/* Instruções de Pagamento */}
              {paymentMethod === 'pix' && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="content-font font-semibold text-green-800 mb-2">
                    🎉 Obrigado por escolher PIX!
                  </h5>
                  <p className="content-font text-sm text-green-700 mb-2">
                    Realize o pagamento na chave PIX abaixo:
                  </p>
                  <div className="bg-white p-3 rounded border border-green-300">
                    <p className="content-font text-lg font-bold text-center text-green-800">32984825912
                    </p>
                  </div>
                  <p className="content-font text-xs text-green-600 mt-2 text-center">
                    Após o pagamento, envie o comprovante via WhatsApp
                  </p>
                </div>
              )}
              
              {paymentMethod === 'cartao' && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="content-font font-semibold text-orange-800 mb-2">
                    🎉 Obrigado por escolher Cartão!
                  </h5>
                  <p className="content-font text-sm text-orange-700 mb-2">
                    Há um pequeno acréscimo de 5% para pagamento no cartão.
                  </p>
                  <div className="bg-white p-3 rounded border border-orange-300">
                    <p className="content-font text-sm text-center text-orange-800">
                      <strong>Acréscimo:</strong> R$ {getCardFeeAmount().toFixed(2).replace('.', ',')}
                    </p>
                    <p className="content-font text-lg font-bold text-center text-orange-800">
                      <strong>Total com cartão:</strong> R$ {getFinalTotal().toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <p className="content-font text-xs text-orange-600 mt-2 text-center">
                    Confirme seu pagamento via WhatsApp
                  </p>
                </div>
              )}
            </div>

            {/* Formulário de Dados */}
            <div className="space-y-4">
              <h4 className="content-font font-semibold text-gray-800">Seus Dados</h4>
              
              <div>
                <label className="content-font text-sm font-medium text-gray-700 block mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full p-3 border border-gray-300 rounded-lg content-font focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="content-font text-sm font-medium text-gray-700 block mb-1">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(31) 99999-9999"
                  className="w-full p-3 border border-gray-300 rounded-lg content-font focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              {/* Endereço apenas se for entrega */}
              {deliveryMethod === 'entrega' && (
                <div>
                  <label className="content-font text-sm font-medium text-gray-700 block mb-1">
                    Endereço de Entrega *
                  </label>
                  <textarea
                    value={customerData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Rua, número, bairro - Espera Feliz, MG"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg content-font focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>



            {/* Botões */}
            <div className="space-y-3">
              <Button 
                onClick={handleConfirmOrder}
                disabled={!isFormValid()}
                className="btn-primary w-full content-font text-lg py-4"
              >
                📱 Confirmar Pedido via WhatsApp
              </Button>
              
              <Button 
                onClick={() => setCurrentPage('home')} 
                variant="outline"
                className="w-full content-font"
              >
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

