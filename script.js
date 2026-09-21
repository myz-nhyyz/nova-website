/* ============================================================
   NOVA — Main Script
   ============================================================ */

'use strict';

const CONFIG = {
  BOT_NAME: 'Nova',
  BOT_OWNER: 'nova_.inovation',
  BOT_AVATAR: 'assets/avatar.png',
  BOT_INVITE_URL: 'https://discord.com/oauth2/authorize?client_id=1532745879944036523',
  CONTACT_EMAIL: 'anhbao27072011@gmail.com',
  SUPPORT_SERVER_URL: 'https://discord.gg/qkyu3G6WMa',
  AI_PROVIDER: 'Qwen3.7-max',
  EFFECTIVE_DATE: '19/09/2026'
};

window.NOVA_CONFIG = CONFIG;

/* ============================================================
   I18N DICTIONARY
   ============================================================ */
const I18N = {
  vi: {
    /* nav */
    'nav.home': 'Trang chủ',
    'nav.features': 'Tính năng',
    'nav.privacy': 'Chính sách bảo mật',
    'nav.terms': 'Điều khoản dịch vụ',
    'nav.invite': 'Mời Nova',

    /* hero */
    'hero.tagline': 'Trợ lý thông minh cho Discord.',
    'hero.subtitle': 'Chat với AI, quản lý cộng đồng, tạo War, Backup, Event và nhiều hơn nữa — ngay trong Discord.',
    'hero.invite': 'Mời Nova',
    'hero.explore': 'Khám phá tính năng',

    /* features */
    'features.eyebrow': 'Tính năng',
    'features.title': 'Tính năng mạnh mẽ.',
    'features.sub': 'Tất cả những gì Nova có thể làm — từ AI cho tới moderation.',

    'feature.ai.title': 'AI Chatbot',
    'feature.ai.desc': 'Trò chuyện với AI ngay trong Discord. Hỗ trợ persona, lịch sử riêng từng người hoặc dùng chung cho cả kênh. Được hỗ trợ bởi Qwen3.7-max.',
    'feature.image.title': 'AI Image',
    'feature.image.desc': 'Tạo hình ảnh bằng AI ngay trong Discord từ một câu mô tả ngắn.',
    'feature.war.title': 'War Ping / Backup Ping',
    'feature.war.desc': 'Gọi người tham gia War hoặc yêu cầu Backup nhanh chóng, có thread riêng, phân quyền End rõ ràng.',
    'feature.event.title': 'Event',
    'feature.event.desc': 'Tạo event trong server với panel tham gia, quản lý danh sách và công bố kết quả.',
    'feature.banzone.title': 'Ban Zone',
    'feature.banzone.desc': 'Hệ thống Ban Zone và moderation cho server. Hỗ trợ mode ban hoặc mute, whitelist riêng theo từng server.',
    'feature.mod.title': 'Moderation',
    'feature.mod.desc': 'Các công cụ moderation dành cho server: ban, unban, mute, unmute.',
    'feature.info.title': 'Server Information',
    'feature.info.desc': 'Xem thông tin bot, server và user ngay trong Discord.',
    'feature.admin.title': 'Admin / Configuration',
    'feature.admin.desc': 'Cấu hình help channel, ping role, trusted users, Ban Zone và quản lý AI/API.',

    /* commands */
    'commands.eyebrow': 'Lệnh chính',
    'commands.title': 'Lệnh chính',
    'commands.sub': 'Những lệnh slash bạn sẽ dùng nhiều nhất khi chạy Nova.',

    /* help mock */
    'help.head': 'Nova Help Menu',
    'help.title': '📖 Help Menu',
    'help.desc': 'Đây là menu trợ giúp của Nova. Dùng danh sách xổ xuống bên dưới để xem chi tiết mục bạn chọn.',
    'help.categories': '📋 Danh mục',
    'help.tip': '💡 Mẹo',
    'help.tip.text': 'Chọn một mục bên dưới để xem chi tiết.',
    'help.select': 'Đưa ra lựa chọn',
    'help.cat.ai': 'AI Chatbot',
    'help.cat.war': 'War Ping / Backup Ping',
    'help.cat.event': 'Event',
    'help.cat.ban': 'Ban Zone',
    'help.cat.admin': 'Admin',

    /* CTA */
    'cta.title': 'Sẵn sàng dùng thử Nova?',
    'cta.desc': 'Mời Nova vào server của bạn — miễn phí, không cần cấu hình phức tạp.',
    'cta.invite': 'Mời Nova',
    'cta.support': 'Tham gia Support Server',

    /* support */
    'support.title': 'Cần hỗ trợ?',
    'support.desc': 'Tham gia server hỗ trợ của Nova.',
    'support.btn': 'Tham gia Support Server',

    /* contact */
    'contact.title': 'Liên hệ',
    'contact.owner': 'Chủ bot',
    'contact.email': 'Email',

    /* footer */
    'footer.tagline': 'Trợ lý thông minh cho Discord.',
    'footer.links': 'Liên kết',
    'footer.legal': 'Pháp lý',
    'footer.contact': 'Liên hệ',
    'footer.copyright': '© 2026 Nova',
    'footer.effective': 'Ngày hiệu lực',

    /* legal */
    'legal.privacy.title': 'Chính sách <em>bảo mật</em>',
    'legal.privacy.sub': 'Cách Nova xử lý dữ liệu khi bạn sử dụng bot.',
    'legal.terms.title': 'Điều khoản <em>dịch vụ</em>',
    'legal.terms.sub': 'Các quy định khi sử dụng Nova.',

    /* misc */
    'meta.effective': 'Ngày hiệu lực',
    'meta.updated': 'Cập nhật'
  },

  en: {
    /* nav */
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'nav.invite': 'Invite Nova',

    /* hero */
    'hero.tagline': 'Your intelligent Discord companion.',
    'hero.subtitle': 'Chat with AI, manage your community, create War, Backup, Events and more — directly inside Discord.',
    'hero.invite': 'Invite Nova',
    'hero.explore': 'Explore Features',

    /* features */
    'features.eyebrow': 'Features',
    'features.title': 'Powerful features.',
    'features.sub': 'Everything Nova can do — from AI to moderation.',

    'feature.ai.title': 'AI Chatbot',
    'feature.ai.desc': 'Chat with AI directly inside Discord. Supports persona, per-user history or shared channel history. Powered by Qwen3.7-max.',
    'feature.image.title': 'AI Image',
    'feature.image.desc': 'Generate AI images directly inside Discord from a short prompt.',
    'feature.war.title': 'War Ping / Backup Ping',
    'feature.war.desc': 'Quickly call members for War or request Backup, with dedicated threads and clear End permissions.',
    'feature.event.title': 'Event',
    'feature.event.desc': 'Create events in your server with a join panel, participant management and result announcement.',
    'feature.banzone.title': 'Ban Zone',
    'feature.banzone.desc': 'Ban Zone and moderation tools for your server. Supports ban or mute mode, per-server whitelist.',
    'feature.mod.title': 'Moderation',
    'feature.mod.desc': 'Moderation tools for your server: ban, unban, mute, unmute.',
    'feature.info.title': 'Server Information',
    'feature.info.desc': 'View bot, server and user information directly inside Discord.',
    'feature.admin.title': 'Admin / Configuration',
    'feature.admin.desc': 'Configure help channel, ping roles, trusted users, Ban Zone and manage AI/API.',

    /* commands */
    'commands.eyebrow': 'Main Commands',
    'commands.title': 'Main commands',
    'commands.sub': 'The slash commands you will use most often with Nova.',

    /* help mock */
    'help.head': 'Nova Help Menu',
    'help.title': '📖 Help Menu',
    'help.desc': "This is Nova's help menu. Use the dropdown below to view the category you want.",
    'help.categories': '📋 Categories',
    'help.tip': '💡 Tip',
    'help.tip.text': 'Pick a category below for details.',
    'help.select': 'Make a selection',
    'help.cat.ai': 'AI Chatbot',
    'help.cat.war': 'War Ping / Backup Ping',
    'help.cat.event': 'Event',
    'help.cat.ban': 'Ban Zone',
    'help.cat.admin': 'Admin',

    /* CTA */
    'cta.title': 'Ready to try Nova?',
    'cta.desc': 'Invite Nova to your server — free, no complex setup required.',
    'cta.invite': 'Invite Nova',
    'cta.support': 'Join Support Server',

    /* support */
    'support.title': 'Need help?',
    'support.desc': "Join Nova's support server.",
    'support.btn': 'Join Support Server',

    /* contact */
    'contact.title': 'Contact',
    'contact.owner': 'Bot Owner',
    'contact.email': 'Email',

    /* footer */
    'footer.tagline': 'Your intelligent Discord companion.',
    'footer.links': 'Links',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Nova',
    'footer.effective': 'Effective Date',

    /* legal */
    'legal.privacy.title': 'Privacy <em>Policy</em>',
    'legal.privacy.sub': 'How Nova handles your data when you use the bot.',
    'legal.terms.title': 'Terms of <em>Service</em>',
    'legal.terms.sub': 'The rules for using Nova.',

    /* misc */
    'meta.effective': 'Effective Date',
    'meta.updated': 'Updated'
  }
};

/* ============================================================
   LANGUAGE MANAGER
   ============================================================ */
const LANG_KEY = 'nova-language';

function getStoredLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === 'vi' || v === 'en') return v;
  } catch (e) {}
  return 'vi';
}

function applyLang(lang) {
  if (lang !== 'vi' && lang !== 'en') lang = 'vi';
  document.documentElement.lang = lang;

  const dict = I18N[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if (val != null) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = dict[key];
    if (val != null) el.innerHTML = val;
  });

  /* language buttons */
  document.querySelectorAll('.lang button').forEach(b => {
    const on = b.dataset.lang === lang;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  /* update lang thumb position */
  requestAnimationFrame(moveLangThumb);

  /* update title & meta if requested */
  updateMeta(lang);

  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
}

function moveLangThumb() {
  const wrap = document.querySelector('.lang');
  const thumb = document.querySelector('.lang-thumb');
  if (!wrap || !thumb) return;
  const active = wrap.querySelector('button.active');
  if (!active) return;
  thumb.style.transform = `translateX(${active.offsetLeft - 3}px)`;
  thumb.style.width = active.offsetWidth + 'px';
}

function updateMeta(lang) {
  const page = document.body.dataset.page;
  const titles = {
    index: {
      vi: 'Nova — Trợ lý thông minh cho Discord',
      en: 'Nova — Your Intelligent Discord Companion'
    },
    privacy: {
      vi: 'Chính sách bảo mật — Nova',
      en: 'Privacy Policy — Nova'
    },
    terms: {
      vi: 'Điều khoản dịch vụ — Nova',
      en: 'Terms of Service — Nova'
    }
  };
  const metaDesc = {
    vi: 'Nova là Discord bot đa năng hỗ trợ AI, moderation, War, Backup, Event và nhiều công cụ quản lý cộng đồng.',
    en: 'Nova is a versatile Discord bot for AI, moderation, War, Backup, Events and community management.'
  };
  if (page && titles[page]) {
    document.title = titles[page][lang] || titles[page].vi;
  }
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', metaDesc[lang]);
}

/* ============================================================
   PAGE TRANSITION
   ============================================================ */
function initPageTransitions() {
  const fade = document.querySelector('.page-fade');
  if (!fade) return;

  /* fade in on load */
  fade.classList.remove('active');

  document.querySelectorAll('a[href$=".html"], a[href^="./"], a[href^="/"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
    if (!href.endsWith('.html')) return;

    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      fade.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 360);
    });
  });

  /* fade out when leaving */
  window.addEventListener('pageshow', () => fade.classList.remove('active'));
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.mobile-menu');

  let ticking = false;
  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    ticking = false;
  }
  update();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ============================================================
   LANGUAGE SWITCH
   ============================================================ */
function initLangSwitch() {
  const wrap = document.querySelector('.lang');
  if (!wrap) return;

  wrap.querySelectorAll('button[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      applyLang(lang);
    });
  });

  /* initial thumb position */
  requestAnimationFrame(moveLangThumb);
  window.addEventListener('load', moveLangThumb);
  window.addEventListener('resize', moveLangThumb);
}

/* ============================================================
   INVITE BUTTONS — enforce exact URL
   ============================================================ */
function initInviteButtons() {
  document.querySelectorAll('[data-invite]').forEach(el => {
    el.setAttribute('href', CONFIG.BOT_INVITE_URL);
  });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('in'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ============================================================
   DROPDOWN (iOS style)
   ============================================================ */
function initDropdown() {
  const dd = document.querySelector('.dropdown');
  if (!dd) return;
  const toggle = dd.querySelector('.dropdown-toggle');
  const menu = dd.querySelector('.dropdown-menu');
  const label = dd.querySelector('.dropdown-label');
  const items = dd.querySelectorAll('.dropdown-item');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dd.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      if (label) label.textContent = item.dataset.label || item.textContent.trim();
      dd.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dd.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================================
   AVATAR FALLBACK
   ============================================================ */
function initAvatar() {
  const wrap = document.querySelector('.hero-avatar');
  if (!wrap) return;
  const img = wrap.querySelector('img');
  if (!img) return;

  img.addEventListener('error', () => {
    img.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.className = 'fallback';
    fallback.textContent = CONFIG.BOT_NAME.charAt(0).toUpperCase();
    wrap.appendChild(fallback);
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  document.body.classList.add('lang-loading');
  applyLang(getStoredLang());
  initNavbar();
  initLangSwitch();
  initInviteButtons();
  initReveal();
  initDropdown();
  initAvatar();
  initPageTransitions();
  requestAnimationFrame(() => document.body.classList.remove('lang-loading'));
  document.body.classList.add('lang-ready');
  window.addEventListener('load', moveLangThumb);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
