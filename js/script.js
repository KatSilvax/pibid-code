// ===== CURSOR PERSONALIZADO =====
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.init();
    }

    init() {
        if (!this.cursor || !this.follower) return;
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.follower.style.left = e.clientX + 'px';
                this.follower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Efeitos hover
        const interactiveElements = document.querySelectorAll('a, button, .tool-card-modern, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.follower.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.follower.style.transform = 'scale(1)';
            });
        });
    }
}

// ===== NAVEGAÇÃO MODERNA =====
class ModernNavigation {
    constructor() {
        this.nav = document.querySelector('.modern-nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        // Scroll spy
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
            this.updateNavBackground();
        });

        // Smooth scroll
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    updateActiveLink() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    updateNavBackground() {
        if (window.scrollY > 50) {
            this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            this.nav.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ===== ANIMAÇÕES DE ENTRADA =====
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar elementos
        const animatedElements = document.querySelectorAll(
            '.tool-card-modern, .activity-card-mini, .pillar-card-modern, .timeline-item, .ods-card, .ods-stat, .accessibility-card, .principle-card'
        );
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            this.observer.observe(el);
        });
    }
}

// ===== CONTADOR ANIMADO =====
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.metric');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const numberElement = element.querySelector('.metric-number');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 100) {
                numberElement.textContent = Math.floor(current) + '%';
            } else {
                numberElement.textContent = Math.floor(current) + (target > 10 ? '+' : '');
            }
        }, 16);
    }
}

// ===== BARRAS DE PROGRESSO =====
class ProgressBars {
    constructor() {
        this.bars = document.querySelectorAll('.progress-bar');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.dataset.progress;
                    bar.style.width = progress + '%';
                    observer.unobserve(bar);
                }
            });
        });

        this.bars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

// ===== EFEITOS DE PARTÍCULAS =====
class ParticleEffect {
    constructor() {
        this.container = document.querySelector('.hero-particles');
        this.particles = [];
        this.init();
    }

    init() {
        if (!this.container) return;
        
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        this.resetParticle(particle);
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    resetParticle(particle) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
    }

    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                this.resetParticle(particle);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== DEMO INTERATIVO =====
class InteractiveDemo {
    constructor() {
        this.demoCards = document.querySelectorAll('.demo-card');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (this.demoCards.length === 0) return;
        
        setInterval(() => {
            this.nextDemo();
        }, 3000);
    }

    nextDemo() {
        this.demoCards[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.demoCards.length;
        this.demoCards[this.currentIndex].classList.add('active');
    }
}

// ===== EFEITOS DE HOVER AVANÇADOS =====
class AdvancedHoverEffects {
    constructor() {
        this.init();
    }

    init() {
        // Efeito de inclinação nos cards
        const cards = document.querySelectorAll('.tool-card-modern, .pillar-card-modern');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }
}

// ===== FUNÇÕES GLOBAIS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function playDemo() {
    alert('Demo em desenvolvimento! Em breve você poderá ver uma demonstração interativa das ferramentas.');
}

function showToolDetails(toolName) {
    const toolInfo = {
        kahoot: 'Kahoot! é uma plataforma de gamificação que torna o aprendizado divertido e interativo.',
        canva: 'Canva permite criar designs visuais incríveis de forma colaborativa e intuitiva.',
        classroom: 'Google Classroom centraliza a gestão educacional e facilita o ensino híbrido.',
        padlet: 'Padlet oferece murais digitais colaborativos para brainstorming e compartilhamento.'
    };
    
    alert(toolInfo[toolName] || 'Informações da ferramenta em breve!');
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se estamos em dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    // Inicializar apenas se não for mobile (cursor personalizado)
    if (!isMobile) {
        document.body.classList.add('custom-cursor');
        new CustomCursor();
    }
    
    // Inicializar outras funcionalidades
    new ModernNavigation();
    new ScrollAnimations();
    new AnimatedCounter();
    new ProgressBars();
    new ParticleEffect();
    new InteractiveDemo();
    new AdvancedHoverEffects();
    
    console.log('🚀 Mural Pedagógico Digital carregado com sucesso!');
});
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Efeito ripple nos botões
        const buttons = document.querySelectorAll('.btn-primary-modern, .btn-tool-primary');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = button.querySelector('.btn-ripple');
                if (ripple) {
                    ripple.style.transform = 'scale(0)';
                    setTimeout(() => {
                        ripple.style.transform = 'scale(1)';
                    }, 10);
                }
            });
        });
    }
}

// ===== FUNÇÕES GLOBAIS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showToolDetails(toolName) {
    // Implementar modal ou expansão de detalhes
    console.log(`Mostrando detalhes de: ${toolName}`);
    
    // Scroll para atividades relacionadas
    const activitiesSection = document.getElementById('atividades');
    if (activitiesSection) {
        activitiesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Destacar atividades da ferramenta
        setTimeout(() => {
            const toolActivities = document.querySelector(`[data-tool="${toolName}"]`);
            if (toolActivities) {
                toolActivities.style.background = 'rgba(99, 102, 241, 0.1)';
                toolActivities.style.borderRadius = '15px';
                toolActivities.style.padding = '2rem';
                toolActivities.style.border = '2px solid rgba(99, 102, 241, 0.3)';
                
                setTimeout(() => {
                    toolActivities.style.background = '';
                    toolActivities.style.border = '';
                    toolActivities.style.padding = '';
                }, 3000);
            }
        }, 500);
    }
}

function playDemo() {
    // Implementar demonstração interativa
    console.log('Reproduzindo demo...');
    
    // Simular loading
    const button = event.target.closest('.btn-secondary-modern');
    const originalText = button.querySelector('.btn-text').textContent;
    const icon = button.querySelector('.btn-icon i');
    
    button.querySelector('.btn-text').textContent = 'Carregando...';
    icon.className = 'fas fa-spinner fa-spin';
    
    setTimeout(() => {
        button.querySelector('.btn-text').textContent = originalText;
        icon.className = 'fas fa-play';
        
        // Scroll para ferramentas
        scrollToSection('ferramentas');
    }, 2000);
}

// ===== PERFORMANCE E OTIMIZAÇÃO =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy loading para imagens
        this.setupLazyLoading();
        
        // Debounce para eventos de scroll
        this.setupScrollOptimization();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupScrollOptimization() {
        let ticking = false;
        
        function updateScrollEffects() {
            // Atualizar efeitos baseados em scroll
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    preloadCriticalResources() {
        // Preload de fontes críticas
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
            'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
        ];
        
        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    // Inicializar componentes
    if (!isMobile) {
        new CustomCursor();
    }
    
    new ModernNavigation();
    new ScrollAnimations();
    new AnimatedCounter();
    new ProgressBars();
    new ParticleEffect();
    new InteractiveDemo();
    new AdvancedHoverEffects();
    new PerformanceOptimizer();
    
    // Animação inicial da página
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== TRATAMENTO DE ERROS =====
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
});

// ===== ANALYTICS E TRACKING =====
class Analytics {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        // Tracking de cliques em ferramentas
        document.querySelectorAll('.btn-tool-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const toolName = e.target.closest('.tool-card-modern').dataset.tool;
                this.trackEvent('tool_access', { tool: toolName });
            });
        });
        
        // Tracking de tempo na página
        this.startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - this.startTime;
            this.trackEvent('page_time', { duration: timeSpent });
        });
    }

    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            data: data,
            timestamp: Date.now(),
            url: window.location.href
        };
        
        this.events.push(event);
        console.log('Event tracked:', event);
        
        // Aqui você pode enviar para seu sistema de analytics
        // this.sendToAnalytics(event);
    }
}

// Inicializar analytics
new Analytics();

// ===== ACESSIBILIDADE =====
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Navegação por teclado
        this.setupKeyboardNavigation();
        
        // Anúncios para leitores de tela
        this.setupScreenReaderAnnouncements();
        
        // Contraste e tema
        this.setupThemeControls();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupScreenReaderAnnouncements() {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        this.announcer = announcer;
    }

    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
        }
    }

    setupThemeControls() {
        // Implementar controles de tema se necessário
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        prefersDark.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }
}

// Inicializar melhorias de acessibilidade
new AccessibilityEnhancer();

// ===== CARDS INTERATIVOS DE MATÉRIAS =====
class SubjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.subject-card-pro');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.init();
    }

    init() {
        // Funcionalidade de clique nos cards
        this.cards.forEach(card => {
            const header = card.querySelector('.card-header-pro');
            const expandIcon = card.querySelector('.expand-icon i');
            
            header.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                // Fecha todos os outros cards
                this.cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                        const otherIcon = otherCard.querySelector('.expand-icon i');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle do card atual
                if (isExpanded) {
                    card.classList.remove('expanded');
                    if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
                } else {
                    card.classList.add('expanded');
                    if (expandIcon) expandIcon.style.transform = 'rotate(180deg)';
                }
            });
        });
        
        // Funcionalidade dos filtros
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const level = btn.dataset.level;
                
                // Atualiza botões ativos
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filtra cards
                this.filterCards(level);
            });
        });
    }
    
    filterCards(level) {
        this.cards.forEach(card => {
            const cardLevel = card.dataset.level;
            
            if (level === 'all' || cardLevel === level) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
}

// ===== CARDS ULTRA MODERNOS DE MATÉRIAS =====
class UltraModernSubjects {
    constructor() {
        this.cards = document.querySelectorAll('.subject-ultra-card');
        this.filterBtns = document.querySelectorAll('.modern-filter-btn');
        this.init();
    }

    init() {
        this.animateEngagementBars();
        
        this.cards.forEach(card => {
            const expandTrigger = card.querySelector('.expand-trigger');
            const expandIcon = card.querySelector('.expand-circle i');
            
            expandTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = card.classList.contains('expanded');
                
                this.cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                        const otherIcon = otherCard.querySelector('.expand-circle i');
                        if (otherIcon) {
                            otherIcon.className = 'fas fa-plus';
                        }
                    }
                });
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    expandIcon.className = 'fas fa-plus';
                } else {
                    card.classList.add('expanded');
                    expandIcon.className = 'fas fa-times';
                }
            });
            
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('expanded')) {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('expanded')) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const level = btn.dataset.level;
                
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterCards(level);
            });
        });
    }
    
    animateEngagementBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const engagement = bar.dataset.engagement;
                    
                    setTimeout(() => {
                        bar.style.width = engagement + '%';
                    }, 500);
                    
                    observer.unobserve(bar);
                }
            });
        });
        
        document.querySelectorAll('.bar-fill').forEach(bar => {
            observer.observe(bar);
        });
    }
    
    filterCards(level) {
        this.cards.forEach((card, index) => {
            const cardLevel = card.dataset.level;
            
            if (level === 'all' || cardLevel === level) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Matérias agora usa a mesma estética e funcionalidade da seção ODS