/**
 * Google Analytics 4 - Rastreamento Completo
 * Lotérica Premium
 *
 * INSTRUÇÕES:
 * 1. Substitua 'G-XXXXXXXXXX' pelo seu ID de rastreamento do Google Analytics
 * 2. Adicione este arquivo no seu index.html
 * 3. Execute a verificação no console do navegador
 */

// ============================================
// CONFIGURAÇÃO - ALTERE APENAS ISSO
// ============================================
const GA4_ID = 'G-LOTERIAPREMIUM01'; // ✅ ID CONFIGURADO - Lotérica Premium

// ============================================
// GOOGLE ANALYTICS 4 - INICIALIZAÇÃO
// ============================================
function initializeGA4() {
  // Criar script do Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID);

  console.log('✅ Google Analytics 4 inicializado com ID:', GA4_ID);
  return true;
}

// ============================================
// RASTREAMENTO DE EVENTOS
// ============================================
function setupEventTracking() {
  // Rastrear cliques em links do WhatsApp
  function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');

    whatsappLinks.forEach((link) => {
      link.addEventListener('click', function(e) {
        const linkText = this.textContent.trim() || 'WhatsApp Link';

        gtag('event', 'whatsapp_click', {
          'event_category': 'engagement',
          'event_label': linkText,
          'value': 1,
          'timestamp': new Date().toISOString()
        });

        console.log('📲 Clique em WhatsApp rastreado:', linkText);
      });
    });

    console.log('✅ Rastreamento de WhatsApp ativado. Links encontrados:', whatsappLinks.length);
  }

  // Rastrear cliques em links da Caixa (Vitrine Online)
  function trackCaixaLinks() {
    const caixaLinks = document.querySelectorAll('a[href*="loteriasonline.caixa"]');

    caixaLinks.forEach((link) => {
      link.addEventListener('click', function(e) {
        const linkText = this.textContent.trim() || 'Vitrine Online';

        gtag('event', 'caixa_link_click', {
          'event_category': 'engagement',
          'event_label': linkText,
          'value': 1,
          'timestamp': new Date().toISOString()
        });

        console.log('🎟️ Clique em link Caixa rastreado:', linkText);
      });
    });

    console.log('✅ Rastreamento de Vitrine Online ativado. Links encontrados:', caixaLinks.length);
  }

  // Rastrear cliques em botões específicos
  function trackButtonClicks() {
    const buttons = document.querySelectorAll('button, a.btn, a.botao, [role="button"]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', function(e) {
        const btnText = this.textContent.trim() || 'Button Click';

        gtag('event', 'button_click', {
          'event_category': 'engagement',
          'event_label': btnText,
          'value': 1
        });
      });
    });

    console.log('✅ Rastreamento de botões ativado. Botões encontrados:', buttons.length);
  }

  // Rastrear tempo na página
  function trackPageTime() {
    let startTime = Date.now();

    window.addEventListener('beforeunload', function() {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      gtag('event', 'page_time', {
        'event_category': 'engagement',
        'event_label': document.title,
        'value': timeSpent
      });

      console.log('⏱️ Tempo na página:', timeSpent, 'segundos');
    });

    console.log('✅ Rastreamento de tempo ativado');
  }

  // Executar todos os rastreamentos
  trackWhatsAppClicks();
  trackCaixaLinks();
  trackButtonClicks();
  trackPageTime();
}

// ============================================
// VERIFICAÇÃO DE INSTALAÇÃO
// ============================================
function verifyInstallation() {
  console.log('═══════════════════════════════════════════════════');
  console.log('🔍 VERIFICAÇÃO DE GOOGLE ANALYTICS 4');
  console.log('═══════════════════════════════════════════════════');

  let allGood = true;

  // Verificar GA ID
  if (GA4_ID === 'G-XXXXXXXXXX') {
    console.error('❌ ERRO: GA4_ID não foi substituído! Use seu ID real.');
    allGood = false;
  } else if (!GA4_ID.startsWith('G-')) {
    console.error('❌ ERRO: GA4_ID deve começar com "G-"');
    allGood = false;
  } else {
    console.log('✅ GA4_ID configurado corretamente:', GA4_ID);
  }

  // Verificar se gtag está carregado
  if (typeof window.gtag === 'function') {
    console.log('✅ Google Analytics carregado corretamente');
  } else {
    console.warn('⚠️ AVISO: Google Analytics pode estar carregando...');
  }

  // Verificar dataLayer
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    console.log('✅ dataLayer inicializado:', window.dataLayer.length, 'eventos');
  } else {
    console.error('❌ ERRO: dataLayer não encontrado');
    allGood = false;
  }

  // Verificar WhatsApp links
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
  console.log(`✅ Links de WhatsApp encontrados: ${whatsappLinks.length}`);
  if (whatsappLinks.length === 0) {
    console.warn('⚠️ AVISO: Nenhum link de WhatsApp encontrado. Verifique o HTML.');
  }

  // Verificar Caixa links
  const caixaLinks = document.querySelectorAll('a[href*="loteriasonline.caixa"]');
  console.log(`✅ Links da Caixa encontrados: ${caixaLinks.length}`);
  if (caixaLinks.length === 0) {
    console.warn('⚠️ AVISO: Nenhum link da Caixa encontrado. Verifique o HTML.');
  }

  console.log('═══════════════════════════════════════════════════');
  if (allGood) {
    console.log('✅ INSTALAÇÃO COMPLETA E FUNCIONANDO!');
    console.log('📊 Dados começarão a aparecer em 24-48 horas no Google Analytics');
  } else {
    console.log('❌ EXISTEM ERROS - Verifique acima');
  }
  console.log('═══════════════════════════════════════════════════');
}

// ============================================
// INICIALIZAR QUANDO PÁGINA CARREGAR
// ============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeGA4();
    setupEventTracking();
    verifyInstallation();
  });
} else {
  // Página já carregou
  initializeGA4();
  setupEventTracking();
  verifyInstallation();
}

// ============================================
// FUNÇÃO DE TESTE MANUAL
// ============================================
window.testGA4 = function() {
  console.log('🧪 Teste manual de GA4');
  gtag('event', 'test_event', {
    'event_category': 'test',
    'event_label': 'Manual Test',
    'value': 1
  });
  console.log('✅ Evento de teste enviado para Google Analytics');
};

console.log('💡 Dica: Digite testGA4() no console para fazer um teste manual');
