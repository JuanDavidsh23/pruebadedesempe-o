// i18n simple por diccionarios + Context. Soporta es / en / pt y guarda el idioma en localStorage.
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "es" | "en" | "pt";

// Diccionarios: misma clave en los 3 idiomas. t(clave) devuelve el texto del idioma activo.
const dictionaries: Record<Lang, Record<string, string>> = {
    es: {
        "nav.favorites": "Favoritos",
        "nav.cart": "Carrito",
        "nav.greeting": "Hola,",
        "nav.logout": "Cerrar sesión",
        "nav.login": "Iniciar sesión",

        "common.loading": "Cargando...",
        "common.loadingProducts": "Cargando productos...",
        "common.email": "Email",
        "common.password": "Contraseña",

        "home.title": "Catálogo de productos",
        "home.empty": "No hay productos disponibles.",

        "favorites.title": "Mis favoritos",
        "favorites.empty": "Aún no tienes productos favoritos.",

        "cart.title": "Mi carrito",
        "cart.empty": "Tu carrito está vacío.",
        "cart.quantity": "Cantidad:",
        "cart.remove": "Quitar",
        "cart.total": "Total:",
        "cart.buy": "Comprar",
        "cart.success": "¡Compra realizada con éxito!",

        "product.notFound": "Producto no encontrado",
        "product.specs": "Especificaciones",
        "product.stock": "Stock disponible:",
        "product.addToCart": "Agregar al carrito",
        "product.added": "Producto agregado al carrito",

        "card.detail": "Ver detalle",
        "card.favAria": "Marcar como favorito",

        "login.badge": "Bienvenido de nuevo",
        "login.welcomeTitle": "Gestiona tu cuenta con estilo y seguridad.",
        "login.welcomeText": "Accede a tu panel, revisa información y continúa donde lo dejaste.",
        "login.title": "Iniciar sesión",
        "login.subtitle": "Ingresa tus credenciales para continuar",
        "login.submit": "Iniciar sesión",
        "login.submitting": "Iniciando...",
        "login.noAccount": "¿No tienes cuenta?",
        "login.register": "Regístrate",

        "register.badge": "Crea tu cuenta",
        "register.welcomeTitle": "Únete y gestiona tu cuenta con estilo y seguridad.",
        "register.welcomeText": "Regístrate en segundos y empieza a usar tu panel personalizado.",
        "register.title": "Crear cuenta",
        "register.subtitle": "Completa el formulario para registrarte",
        "register.fullName": "Nombre completo",
        "register.cc": "Cédula",
        "register.role": "Rol",
        "register.roleUser": "Usuario",
        "register.roleAdmin": "Administrador",
        "register.submit": "Crear cuenta",
        "register.submitting": "Creando cuenta...",
        "register.haveAccount": "¿Ya tienes cuenta?",
        "register.login": "Inicia sesión",
    },
    en: {
        "nav.favorites": "Favorites",
        "nav.cart": "Cart",
        "nav.greeting": "Hi,",
        "nav.logout": "Log out",
        "nav.login": "Log in",

        "common.loading": "Loading...",
        "common.loadingProducts": "Loading products...",
        "common.email": "Email",
        "common.password": "Password",

        "home.title": "Product catalog",
        "home.empty": "No products available.",

        "favorites.title": "My favorites",
        "favorites.empty": "You don't have favorite products yet.",

        "cart.title": "My cart",
        "cart.empty": "Your cart is empty.",
        "cart.quantity": "Quantity:",
        "cart.remove": "Remove",
        "cart.total": "Total:",
        "cart.buy": "Buy",
        "cart.success": "Purchase completed successfully!",

        "product.notFound": "Product not found",
        "product.specs": "Specifications",
        "product.stock": "Available stock:",
        "product.addToCart": "Add to cart",
        "product.added": "Product added to cart",

        "card.detail": "View detail",
        "card.favAria": "Mark as favorite",

        "login.badge": "Welcome back",
        "login.welcomeTitle": "Manage your account with style and security.",
        "login.welcomeText": "Access your dashboard, review information and continue where you left off.",
        "login.title": "Log in",
        "login.subtitle": "Enter your credentials to continue",
        "login.submit": "Log in",
        "login.submitting": "Logging in...",
        "login.noAccount": "Don't have an account?",
        "login.register": "Sign up",

        "register.badge": "Create your account",
        "register.welcomeTitle": "Join and manage your account with style and security.",
        "register.welcomeText": "Sign up in seconds and start using your personalized dashboard.",
        "register.title": "Create account",
        "register.subtitle": "Fill out the form to sign up",
        "register.fullName": "Full name",
        "register.cc": "ID number",
        "register.role": "Role",
        "register.roleUser": "User",
        "register.roleAdmin": "Administrator",
        "register.submit": "Create account",
        "register.submitting": "Creating account...",
        "register.haveAccount": "Already have an account?",
        "register.login": "Log in",
    },
    pt: {
        "nav.favorites": "Favoritos",
        "nav.cart": "Carrinho",
        "nav.greeting": "Olá,",
        "nav.logout": "Sair",
        "nav.login": "Entrar",

        "common.loading": "Carregando...",
        "common.loadingProducts": "Carregando produtos...",
        "common.email": "Email",
        "common.password": "Senha",

        "home.title": "Catálogo de produtos",
        "home.empty": "Não há produtos disponíveis.",

        "favorites.title": "Meus favoritos",
        "favorites.empty": "Você ainda não tem produtos favoritos.",

        "cart.title": "Meu carrinho",
        "cart.empty": "Seu carrinho está vazio.",
        "cart.quantity": "Quantidade:",
        "cart.remove": "Remover",
        "cart.total": "Total:",
        "cart.buy": "Comprar",
        "cart.success": "Compra realizada com sucesso!",

        "product.notFound": "Produto não encontrado",
        "product.specs": "Especificações",
        "product.stock": "Estoque disponível:",
        "product.addToCart": "Adicionar ao carrinho",
        "product.added": "Produto adicionado ao carrinho",

        "card.detail": "Ver detalhe",
        "card.favAria": "Marcar como favorito",

        "login.badge": "Bem-vindo de volta",
        "login.welcomeTitle": "Gerencie sua conta com estilo e segurança.",
        "login.welcomeText": "Acesse seu painel, veja informações e continue de onde parou.",
        "login.title": "Entrar",
        "login.subtitle": "Insira suas credenciais para continuar",
        "login.submit": "Entrar",
        "login.submitting": "Entrando...",
        "login.noAccount": "Não tem conta?",
        "login.register": "Cadastre-se",

        "register.badge": "Crie sua conta",
        "register.welcomeTitle": "Junte-se e gerencie sua conta com estilo e segurança.",
        "register.welcomeText": "Cadastre-se em segundos e comece a usar seu painel personalizado.",
        "register.title": "Criar conta",
        "register.subtitle": "Preencha o formulário para se cadastrar",
        "register.fullName": "Nome completo",
        "register.cc": "Documento",
        "register.role": "Função",
        "register.roleUser": "Usuário",
        "register.roleAdmin": "Administrador",
        "register.submit": "Criar conta",
        "register.submitting": "Criando conta...",
        "register.haveAccount": "Já tem conta?",
        "register.login": "Entrar",
    },
};

type I18nContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("es");

    // Al montar, recupera el idioma guardado.
    useEffect(() => {
        const stored = localStorage.getItem("lang") as Lang | null;
        if (stored && stored in dictionaries) setLangState(stored);
    }, []);

    const setLang = (next: Lang) => {
        setLangState(next);
        localStorage.setItem("lang", next);
    };

    const t = (key: string) => dictionaries[lang][key] ?? key;

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
}

// Hook para usar las traducciones en cualquier componente cliente.
export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n debe usarse dentro de I18nProvider");
    return ctx;
}
