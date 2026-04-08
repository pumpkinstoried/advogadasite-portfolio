// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // Adicione dentro do DOMContentLoaded
    const faqs = document.querySelectorAll('details');

    faqs.forEach((faq) => {
        const summary = faq.querySelector('summary');
        const content = faq.querySelector('.faq-content');

        summary.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o fecho imediato

            if (faq.open) {
                // Se estiver aberto, inicia animação de fecho
                faq.classList.remove('group-open');
                // Aguarda a transição de grid-template-rows: 0fr
                setTimeout(() => { faq.open = false; }, 400);
            } else {
                // Se estiver fechado, abre e a transição CSS (1fr) ocorre
                faq.open = true;
                faq.classList.add('group-open');
            }
        });
    });

    // --- 1. INICIALIZAÇÃO DE BIBLIOTECAS ---
    lucide.createIcons(); // Ativa os ícones Lucide
    AOS.init({            // Ativa animações de scroll
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
    });


    // --- 2. MENU MOBILE (FUNCIONALIDADE) ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        // Muda o ícone de menu para "X" (fechar) se estiver aberto
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.setAttribute('data-lucide', 'menu');
        } else {
            icon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons(); // Recarrega o ícone alterado
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link (âncora)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) toggleMenu();
        });
    });


    // --- 3. NAVBAR SCROLL EFFECT ---
    // Adiciona uma sombra e fundo mais sólido ao rolar a página
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'bg-white/95');
            header.classList.remove('bg-[#F9F8F6]/85');
        } else {
            header.classList.remove('shadow-lg', 'bg-white/95');
            header.classList.add('bg-[#F9F8F6]/85');
        }
    });


    // --- 4. WHATSAPP ENGINE (TRATAMENTO DE CLIQUES) ---
    // Centralizamos aqui para facilitar se o cliente quiser mudar o número ou a mensagem futuramente
    const CONFIG = {
        phone: "5511999999999", // Substitua pelo número real (DDI + DDD + Numero)
        defaultMessage: "Olá, Dra. Nome! Gostaria de uma orientação jurídica estratégica."
    };

    // Seleciona todos os links que devem abrir o WhatsApp
    // Para isso funcionar, adicione a classe 'btn-whatsapp' nos links desejados no HTML
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Se quiser personalizar mensagens diferentes por botão, pode usar data-attributes no HTML
            // Ex: <a href="..." data-msg="Quero falar sobre Direito Civil">
            const customMsg = btn.getAttribute('data-msg') || CONFIG.defaultMessage;
            const finalUrl = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(customMsg)}`;

            btn.setAttribute('href', finalUrl);
        });
    });

});
