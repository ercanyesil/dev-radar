// ============================================================
// dev-radar — Translation strings (EN + TR)
// Code blocks intentionally stay in English.
// ============================================================

export type Locale = "en" | "tr";

export const translations = {
  en: {
    // --- NavBar ---
    nav: {
      tagline: "Next.js 16 · React 19.2",
      allDemos: "← All demos",
      github: "GitHub",
      langToggle: "TR",
      langLabel: "Switch to Turkish",
    },

    // --- Home page ---
    home: {
      badge: "Next.js 16.3 · React 19.2 · August 2026",
      title1: "What's new",
      title2: "in Next.js & React",
      subtitle:
        "Interactive code examples of the latest features. Each demo shows the real API in a working scenario — not just hello world.",
      stats: {
        demos: "Feature Demos",
        nextVersion: "Next.js Version",
        reactVersion: "React Version",
      },
      viewDemo: "View demo",
      cta: {
        title: "Explore the source code",
        description:
          "Every demo has annotated code with explanations of when and why to use each API.",
        button: "View on GitHub",
      },
      cards: {
        viewTransitions: {
          title: "View Transitions",
          description:
            "Animate elements across routes with React 19.2's ViewTransition component. Shared element morphing, Suspense reveals, and directional navigation.",
        },
        serverActions: {
          title: "Server Actions",
          description:
            "Server Actions with updateTag() for read-your-writes semantics and revalidateTag() for stale-while-revalidate background refresh.",
        },
        useEffectEvent: {
          title: "useEffectEvent",
          description:
            "Extract non-reactive logic from Effects into reusable Event functions. Fix stale closure bugs without adding extra dependencies.",
        },
        useCache: {
          title: "use cache Directive",
          description:
            "Cache async functions with 'use cache' + cacheLife() profiles. Tag-based invalidation with cacheTag() for fine-grained cache control.",
        },
        instantNav: {
          title: "Instant Navigation",
          description:
            "Structure routes with Suspense + 'use cache' so pages load instantly. Understand App Shell, static shell, and the instant export API.",
        },
      },
    },

    // --- DemoLayout ---
    layout: {
      docs: "Docs ↗",
      back: "← Back to all demos",
    },

    // --- View Transitions demo ---
    viewTransitions: {
      subtitle: "React 19.2 — New Stable API",
      title: "View Transitions",
      description:
        "React's ViewTransition component integrates with the browser's View Transitions API. Name elements that should persist across routes, and the browser animates between their old and new positions — no animation library needed.",
      p1Label: "Pattern 1 — Shared Element Morph",
      p1Title: "Thumbnail → Hero animation",
      p1Desc:
        'Wrap both the grid thumbnail and the detail view in <code>{"<ViewTransition name={`photo-${id}`}>"}</code> with the <strong>same name</strong>. The browser finds matching elements and morphs between their size and position automatically.',
      gridHint: "Click a photo to see the shared element concept",
      detailNote:
        "In a real app this would be a full-page route with",
      backToGallery: "← Back to gallery",
      p2Label: "Pattern 2 — Directional Navigation",
      p2Title: "Forward/Back slide animations",
      p2Desc:
        "Tag links with <code>transitionTypes</code> to communicate direction. Wrap page content in <code>{'<ViewTransition>'}</code> that maps types to animations. The header stays fixed using <code>view-transition-name: site-header</code>.",
      insightTitle: "💡 Design principle:",
      insightText:
        "Horizontal direction encodes spatial position. Sliding left = going deeper. Sliding right = going back. Put the wrapper in <code>page.tsx</code>, <strong>not</strong> layout — layouts persist and never trigger enter/exit.",
      p3Label: "Pattern 3 — Required CSS",
      p3Title: "View Transition pseudo-elements",
      p3Desc:
        "Target <code>::view-transition-old(.class)</code> and <code>::view-transition-new(.class)</code> to customize each transition class. Always add <code>@media (prefers-reduced-motion)</code>.",
      facts: [
        "No config needed in App Router",
        "Activates on Transitions & Suspense",
        "Fully customizable with CSS",
        "Graceful degradation (no anim = still works)",
      ],
    },

    // --- Server Actions demo ---
    serverActions: {
      subtitle: "Next.js 16 — updateTag · revalidateTag · refresh",
      title: "Server Actions",
      description:
        "Server Actions in Next.js 16 combine action execution + cache invalidation + page re-render into a single HTTP request. New APIs: updateTag() for immediate refresh, revalidateTag() for background revalidation, and refresh() for router refresh.",
      liveLabel: "Live Demo — Server Action + Revalidation",
      liveTitle: "Note-taking with real Server Actions",
      liveDesc:
        "Adding a note calls a <code>'use server'</code> action. The page re-renders with fresh data in the <strong>same single HTTP roundtrip</strong> — no client-side state needed.",
      compLabel: "API Comparison",
      compTitle: "updateTag vs revalidateTag vs refresh",
      comparison: [
        {
          fn: "updateTag(tag)",
          when: "User edits their profile, deletes a post",
          behavior: "Expire + refresh IMMEDIATELY in same request",
          icon: "⚡",
        },
        {
          fn: "revalidateTag(tag, 'max')",
          when: "Publishing blog post, updating catalog",
          behavior: "Mark as stale — background refresh on next read",
          icon: "🔄",
        },
        {
          fn: "refresh()",
          when: "Mark notification as read, update counters",
          behavior: "Re-fetch RSC payload for current route",
          icon: "🔃",
        },
      ],
      archLabel: "Architecture Detail",
      archTitle: "Single HTTP roundtrip",
      archDesc:
        "When a Server Action calls <code>updateTag</code>, <code>revalidatePath</code>, or <code>refresh</code>, Next.js bundles the action result <em>and</em> the re-rendered RSC payload into one Flight stream response.",
      secLabel: "Security",
      secTitle: "Treat every action as untrusted",
      secDesc:
        "Next.js provides CSRF checks, 1MB body limits, and encrypted action IDs. But application-level checks — authenticate, authorize, validate — are your responsibility.",
      noteLabel: "Add a note",
      notePlaceholder: "Type something...",
      addBtn: "Add Note",
      addingBtn: "Adding...",
      emptyNotes: "No notes yet.",
      formHint: "This calls a 'use server' action via useActionState. The list updates server-side.",
      loadingNotes: "Loading notes...",
    },

    // --- useEffectEvent demo ---
    useEffectEvent: {
      subtitle: "React 19.2 — New Stable Hook",
      title: "useEffectEvent",
      description:
        "Extract the non-reactive parts of an Effect into reusable Event functions. Fix stale closure bugs where you need to read the latest prop value inside an effect without making it a reactive dependency.",
      problemLabel: "The Problem",
      problemTitle: "Stale closures in Effects",
      problemDesc:
        "When an Effect needs to read a prop but only re-run when something else changes, you're forced into a dilemma: add the prop to deps (unwanted re-runs) or suppress the lint warning (stale bug).",
      solutionLabel: "The Solution",
      solutionTitle: "useEffectEvent to the rescue",
      solutionDesc:
        "useEffectEvent wraps the non-reactive part. The returned function always reads the <strong>latest values</strong> at call time, but it's never listed as a dependency — it's intentionally excluded.",
      demoLabel: "Live Demo",
      demoTitle: "Scroll analytics logger",
      demoDesc:
        'The scroll handler is set up once (empty deps). Changing the "URL" doesn\'t restart the effect — but every log entry uses the latest URL value because <code>onScroll</code> is an Effect Event.',
      urlLabel: "Simulated URL (changes without re-running the scroll effect):",
      logTitle: "📋 Scroll log (scroll the page to see entries)",
      logCurrent: "Current scrollY",
      logActive: "Active URL",
      logEmpty: "Scroll the page to generate log entries...",
      logHint:
        "Change the URL above — the scroll effect does NOT restart (no url in deps). But every new scroll entry uses the latest URL value, thanks to useEffectEvent.",
      rulesLabel: "Rules & Constraints",
      rulesTitle: "Three rules to remember",
      insightTitle: "💡 Mental model:",
      insightText:
        'Think of useEffectEvent as "the effect runs reactively, but this function always sees the present." It\'s not a hook — it\'s a way to carve out a non-reactive slice of logic from inside a reactive context.',
    },

    // --- use cache demo ---
    useCache: {
      subtitle: "Next.js 16 — cacheLife · cacheTag · Stable API",
      title: "use cache Directive",
      description:
        "Cache async functions with 'use cache', assign freshness profiles with cacheLife(), and enable targeted invalidation with cacheTag(). Previously unstable_ — now fully stable in Next.js 16.",
      liveLabel: "Live Demo — Cached Server Components",
      liveTitle: "Real caching in action",
      liveDesc:
        "These components run on the server and cache their results. The timestamp below is cached for ~1 second. The dashboard stats are cached for hours — the fetchedAt value shows when the data was last fetched.",
      basicLabel: "Basic Usage",
      basicTitle: "'use cache' + cacheLife + cacheTag",
      basicDesc:
        "Add 'use cache' as the first line of any async function. The result is cached in memory. Call cacheLife() to set a freshness profile and cacheTag() to enable targeted invalidation.",
      profilesLabel: "cacheLife Profiles",
      profilesTitle: "Built-in profiles & custom config",
      invalidLabel: "Cache Invalidation",
      invalidTitle: "Tag-based invalidation",
      variantsLabel: "Cache Variants",
      variantsTitle: "'use cache: private' and 'use cache: remote'",
      variantsDesc:
        "When a function reads cookies() or headers(), use 'use cache: private' to cache in the browser only. For serverless deployments where in-memory cache doesn't persist, use 'use cache: remote'.",
      loadingTs: "⏳ Fetching cached timestamp...",
      loadingDash: "⏳ Loading dashboard (cached)...",
      cachedLabel: "✅ Cached:",
      cacheHint: "Reload the page — this value is cached for ~1 second server-side.",
    },

    // --- Instant Navigation demo ---
    instantNav: {
      subtitle: "Next.js 16 — Cache Components · PPR · Suspense",
      title: "Instant Navigation",
      description:
        "Instant navigation means content appears the moment a user clicks a link. Achieve it by caching server-side data with 'use cache' and wrapping dynamic content in Suspense boundaries so they stream in without blocking.",
      conceptLabel: "Core Concept",
      conceptTitle: 'What does "instant" mean?',
      conceptDesc:
        "A navigation is instant when static + cached content appears immediately on click, while dynamic content streams in via Suspense. The key insight: Next.js only re-renders <em>below the shared layout</em> on client navigations.",
      directVisit: {
        label: "Direct Visit (page.goto)",
        desc: "Full HTML from CDN. Root Suspense catches everything.",
        icon: "🌐",
      },
      clientNav: {
        label: "Client Navigation (<Link>)",
        desc: "Only re-renders below shared layout. Only Suspense below that point fires.",
        icon: "⚡",
      },
      demoLabel: "Live Demo — Suspense Streaming",
      demoTitle: "Cached + dynamic content side by side",
      demoDesc:
        "This page uses real server-side Suspense streaming. The items below stream in progressively — the fast one appears first, then the slow one, without blocking each other or blocking the rest of the page.",
      streamingStatus: "Server-side streaming in progress...",
      fastLoading: "⏳ Fast component loading (100ms)...",
      slowLoading: "⏳ Slow component loading (800ms)...",
      fastDone: "Fast component (cached data)",
      slowDone: "Slow component (live inventory)",
      streamedNote: "streamed in after",
      streamNote:
        "The page didn't wait for the slow component — it streamed in independently. This is exactly how instant navigation works.",
      patternLabel: "Full Pattern",
      patternTitle: "The instant product page",
      fixLabel: "Fixing Blocking Routes",
      fixTitle: "Two common fixes",
      fixDesc:
        "Cache Components (enabled via cacheComponents: true in next.config) validates every page automatically in dev. When it detects a blocking route, it shows a dev overlay insight with the exact component and fix cards.",
      prefetchLabel: "Link Prefetching",
      prefetchTitle: "Partial Prefetching",
      optoutLabel: "Opt-out",
      optoutTitle: "instant = false",
    },
  },

  // ============================================================
  // TURKISH
  // ============================================================
  tr: {
    nav: {
      tagline: "Next.js 16 · React 19.2",
      allDemos: "← Tüm demolar",
      github: "GitHub",
      langToggle: "EN",
      langLabel: "Switch to English",
    },

    home: {
      badge: "Next.js 16.3 · React 19.2 · Ağustos 2026",
      title1: "Neler geldi",
      title2: "Next.js & React'a?",
      subtitle:
        "En son özelliklere ait çalışan kod örnekleri. Her demo gerçek bir senaryoda gerçek API'yi gösteriyor — sadece hello world değil.",
      stats: {
        demos: "Özellik Demosu",
        nextVersion: "Next.js Sürümü",
        reactVersion: "React Sürümü",
      },
      viewDemo: "Demoya git",
      cta: {
        title: "Kaynak kodunu incele",
        description:
          "Her demoda, hangi API'nin ne zaman ve neden kullanılacağını açıklayan notlu kodlar var.",
        button: "GitHub'da Görüntüle",
      },
      cards: {
        viewTransitions: {
          title: "View Transitions",
          description:
            "React 19.2'nin ViewTransition bileşeniyle sayfalar arası animasyon. Paylaşılan element morph'u, Suspense geçişleri ve yönlü navigasyon.",
        },
        serverActions: {
          title: "Server Actions",
          description:
            "updateTag() ile anında güncelleme ve revalidateTag() ile arka plan yenileme sağlayan Server Actions demosu.",
        },
        useEffectEvent: {
          title: "useEffectEvent",
          description:
            "Effect'lerden reaktif olmayan mantığı Event fonksiyonlarına çıkarın. Ekstra bağımlılık eklemeden eski referans (stale closure) hatalarını çözün.",
        },
        useCache: {
          title: "'use cache' Direktifi",
          description:
            "'use cache' + cacheLife() profilleriyle async fonksiyonları önbelleğe alın. cacheTag() ile hedefli önbellek temizleme.",
        },
        instantNav: {
          title: "Anlık Navigasyon",
          description:
            "Suspense + 'use cache' ile sayfaların anında yüklenmesini sağlayın. App Shell, statik kabuk ve instant export API'sini öğrenin.",
        },
      },
    },

    layout: {
      docs: "Doküman ↗",
      back: "← Tüm demolara dön",
    },

    viewTransitions: {
      subtitle: "React 19.2 — Kararlı Yeni API",
      title: "View Transitions",
      description:
        "React'ın ViewTransition bileşeni, tarayıcının View Transitions API'siyle entegre çalışır. Sayfa geçişlerinde kalıcı kalacak elementleri adlandırın; tarayıcı eski ve yeni konumlar arasında otomatik animasyon oluşturur — animasyon kütüphanesi gerekmez.",
      p1Label: "Desen 1 — Paylaşılan Element Morph",
      p1Title: "Küçük resim → Büyük görsel animasyonu",
      p1Desc:
        "Hem küçük resmi hem detay görünümünü aynı <code>name</code> ile <code>{'<ViewTransition>'}</code> içine sarın. Tarayıcı eşleşen elementleri bulur ve boyut/konum arasında otomatik animasyon yapar.",
      gridHint: "Paylaşılan element konseptini görmek için bir fotoğrafa tıklayın",
      detailNote: "Gerçek bir uygulamada bu",
      backToGallery: "← Galeriye dön",
      p2Label: "Desen 2 — Yönlü Navigasyon",
      p2Title: "İleri/Geri kayan animasyonlar",
      p2Desc:
        "Yönü belirtmek için linklere <code>transitionTypes</code> ekleyin. Sayfa içeriğini tipleri animasyonlara eşleyen <code>{'<ViewTransition>'}</code> ile sarın.",
      insightTitle: "💡 Tasarım prensibi:",
      insightText:
        "Yatay yön, mekânsal konumu kodlar. Sola kaymak = daha derine gitmek. Sağa kaymak = geri dönmek. Wrapper'ı layout değil <code>page.tsx</code>'e koyun — layout'lar kalıcıdır ve enter/exit tetiklemez.",
      p3Label: "Desen 3 — Gerekli CSS",
      p3Title: "View Transition pseudo-elementleri",
      p3Desc:
        "Her geçiş sınıfını özelleştirmek için <code>::view-transition-old(.class)</code> ve <code>::view-transition-new(.class)</code>'i hedefleyin. Her zaman <code>@media (prefers-reduced-motion)</code> ekleyin.",
      facts: [
        "App Router'da yapılandırma gerekmez",
        "Transition & Suspense'te aktifleşir",
        "CSS ile tam özelleştirilebilir",
        "Zarif bozulma (animasyon yoksa yine çalışır)",
      ],
    },

    serverActions: {
      subtitle: "Next.js 16 — updateTag · revalidateTag · refresh",
      title: "Server Actions",
      description:
        "Next.js 16'daki Server Actions, tek bir HTTP isteğinde aksiyon çalıştırma + önbellek geçersiz kılma + sayfa yeniden render'ını birleştirir. Yeni API'ler: anında yenileme için updateTag(), arka plan yenilemesi için revalidateTag() ve yönlendirici yenilemesi için refresh().",
      liveLabel: "Canlı Demo — Server Action + Revalidasyon",
      liveTitle: "Gerçek Server Actions ile not defteri",
      liveDesc:
        "Not eklemek, <code>'use server'</code> aksiyonunu çağırır. Sayfa, tek bir HTTP gidiş-gelişinde taze veriyle yeniden render edilir — istemci tarafı state'e gerek yok.",
      compLabel: "API Karşılaştırması",
      compTitle: "updateTag - revalidateTag - refresh",
      comparison: [
        {
          fn: "updateTag(tag)",
          when: "Kullanıcı profilini düzenler, post siler",
          behavior: "Aynı istek içinde HEMEN sona erdir + yenile",
          icon: "⚡",
        },
        {
          fn: "revalidateTag(tag, 'max')",
          when: "Blog postu yayınlama, katalog güncelleme",
          behavior: "Bayat olarak işaretle — sonraki okumada arka planda yenile",
          icon: "🔄",
        },
        {
          fn: "refresh()",
          when: "Bildirimi okundu işaretle, sayaçları güncelle",
          behavior: "Mevcut route için RSC payload'ını yeniden getir",
          icon: "🔃",
        },
      ],
      archLabel: "Mimari Detay",
      archTitle: "Tek HTTP gidiş-gelişi",
      archDesc:
        "Server Action <code>updateTag</code>, <code>revalidatePath</code> veya <code>refresh</code> çağırdığında, Next.js aksiyon sonucu <em>ve</em> yeniden render edilmiş RSC payload'ını tek bir Flight stream yanıtında birleştirir.",
      secLabel: "Güvenlik",
      secTitle: "Her aksiyonu güvensiz giriş noktası gibi ele alın",
      secDesc:
        "Next.js, CSRF kontrolü, 1MB gövde sınırı ve şifreli aksiyon ID'leri sağlar. Ancak uygulama düzeyindeki kontroller — kimlik doğrulama, yetkilendirme, doğrulama — sizin sorumluluğunuzdadır.",
      noteLabel: "Not ekle",
      notePlaceholder: "Bir şey yazın...",
      addBtn: "Not Ekle",
      addingBtn: "Ekleniyor...",
      emptyNotes: "Henüz not yok.",
      formHint: "Bu, useActionState aracılığıyla 'use server' aksiyonunu çağırır. Liste sunucu tarafında güncellenir.",
      loadingNotes: "Notlar yükleniyor...",
    },

    useEffectEvent: {
      subtitle: "React 19.2 — Kararlı Yeni Hook",
      title: "useEffectEvent",
      description:
        "Effect'in reaktif olmayan parçalarını yeniden kullanılabilir Event fonksiyonlarına çıkarın. Reactive bir bağımlılık eklemeden, Effect içinde en güncel prop değerini okumak istediğinizde eski referans (stale closure) hatalarını düzeltin.",
      problemLabel: "Problem",
      problemTitle: "Effect'lerde eski referans (stale closure) hatası",
      problemDesc:
        "Bir Effect'in prop'u okuması gerektiğinde ama yalnızca başka bir şey değiştiğinde yeniden çalışmasını istediğinizde bir ikileme düşersiniz: prop'u bağımlılıklara ekleyin (istenmeyen yeniden çalışmalar) ya da lint uyarısını bastırın (eski referans hatası).",
      solutionLabel: "Çözüm",
      solutionTitle: "useEffectEvent kurtarıyor",
      solutionDesc:
        "useEffectEvent reaktif olmayan kısmı sarar. Döndürülen fonksiyon çağrı anında her zaman <strong>en güncel değerleri</strong> okur, ancak hiçbir zaman bağımlılık olarak listelenmez.",
      demoLabel: "Canlı Demo",
      demoTitle: "Scroll analytics logger'ı",
      demoDesc:
        'Scroll handler bir kez kurulur (boş bağımlılık dizisi). "URL"i değiştirmek effect\'i yeniden başlatmaz — ancak her log girişi, onScroll bir Effect Event olduğu için en güncel URL değerini kullanır.',
      urlLabel: "Simüle edilmiş URL (scroll effect'ini yeniden başlatmadan değişir):",
      logTitle: "📋 Scroll logu (giriş görmek için sayfayı kaydırın)",
      logCurrent: "Mevcut scrollY",
      logActive: "Aktif URL",
      logEmpty: "Log girişleri oluşturmak için sayfayı kaydırın...",
      logHint:
        "URL'i yukarıdan değiştirin — scroll effect YENIDEN BAŞLAMAZ (bağımlılıklarda url yok). Ama her yeni scroll girişi, useEffectEvent sayesinde en güncel URL değerini kullanır.",
      rulesLabel: "Kurallar & Kısıtlamalar",
      rulesTitle: "Hatırlanması gereken üç kural",
      insightTitle: "💡 Zihinsel model:",
      insightText:
        '"useEffectEvent\'i "effect reaktif çalışır, ama bu fonksiyon her zaman şimdiki anı görür" şeklinde düşünün. Bir hook değil — reaktif bir bağlamın içinden reaktif olmayan bir mantık dilimi ayırmanın yolu.',
    },

    useCache: {
      subtitle: "Next.js 16 — cacheLife · cacheTag · Kararlı API",
      title: "'use cache' Direktifi",
      description:
        "'use cache' ile async fonksiyonları önbelleğe alın, cacheLife() ile tazelik profilleri atayın ve cacheTag() ile hedefli önbellek temizlemeyi etkinleştirin. Önceden unstable_ önekiyle — artık Next.js 16'da tam kararlı.",
      liveLabel: "Canlı Demo — Önbelleğe Alınmış Server Bileşenleri",
      liveTitle: "Gerçek önbellekleme uygulamada",
      liveDesc:
        "Bu bileşenler sunucuda çalışır ve sonuçlarını önbelleğe alır. Aşağıdaki zaman damgası ~1 saniye önbelleğe alınır. Dashboard istatistikleri saatlerce önbellekte kalır — fetchedAt değeri verinin en son ne zaman getirildiğini gösterir.",
      basicLabel: "Temel Kullanım",
      basicTitle: "'use cache' + cacheLife + cacheTag",
      basicDesc:
        "Herhangi bir async fonksiyonun ilk satırına 'use cache' ekleyin. Sonuç bellekte önbelleğe alınır. Tazelik profili ayarlamak için cacheLife(), hedefli temizlemeyi etkinleştirmek için cacheTag() çağırın.",
      profilesLabel: "cacheLife Profilleri",
      profilesTitle: "Yerleşik profiller & özel yapılandırma",
      invalidLabel: "Önbellek Temizleme",
      invalidTitle: "Etiket tabanlı temizleme",
      variantsLabel: "Önbellek Varyantları",
      variantsTitle: "'use cache: private' ve 'use cache: remote'",
      variantsDesc:
        "Bir fonksiyon cookies() veya headers() okuyorsa, yalnızca tarayıcıda önbelleğe almak için 'use cache: private' kullanın. Sunucusuz dağıtımlarda bellek içi önbelleğin kalıcı olmadığı durumlarda 'use cache: remote' kullanın.",
      loadingTs: "⏳ Önbelleğe alınmış zaman damgası getiriliyor...",
      loadingDash: "⏳ Dashboard yükleniyor (önbellekten)...",
      cachedLabel: "✅ Önbellekten:",
      cacheHint: "Sayfayı yenileyin — bu değer sunucu tarafında ~1 saniye önbelleğe alınır.",
    },

    instantNav: {
      subtitle: "Next.js 16 — Cache Components · PPR · Suspense",
      title: "Anlık Navigasyon",
      description:
        "Anlık navigasyon, bir kullanıcı bağlantıya tıkladığı anda içeriğin belirmesi anlamına gelir. Sunucu taraflı veriyi 'use cache' ile önbelleğe alarak ve dinamik içeriği Suspense sınırlarına sararak bunu engellemeden stream ederek bunu başarın.",
      conceptLabel: "Temel Kavram",
      conceptTitle: '"Anlık" ne demek?',
      conceptDesc:
        "Tıklandığında statik + önbelleğe alınmış içerik hemen belirir; dinamik içerik Suspense aracılığıyla stream edilirken navigasyon anlıktır. Temel fikir: Next.js, istemci navigasyonlarında yalnızca <em>paylaşılan layout'un altını</em> yeniden render eder.",
      directVisit: {
        label: "Doğrudan Ziyaret (page.goto)",
        desc: "CDN'den tam HTML. Root Suspense her şeyi yakalar.",
        icon: "🌐",
      },
      clientNav: {
        label: "İstemci Navigasyonu (<Link>)",
        desc: "Yalnızca paylaşılan layout'un altını yeniden render eder. Yalnızca o noktanın altındaki Suspense tetiklenir.",
        icon: "⚡",
      },
      demoLabel: "Canlı Demo — Suspense Streaming",
      demoTitle: "Önbelleğe alınmış + dinamik içerik yan yana",
      demoDesc:
        "Bu sayfa gerçek sunucu taraflı Suspense streaming kullanır. Aşağıdaki öğeler aşamalı olarak stream edilir — hızlı olan önce belirir, yavaş olan birbirini veya sayfanın geri kalanını engellemeden stream edilir.",
      streamingStatus: "Sunucu taraflı streaming devam ediyor...",
      fastLoading: "⏳ Hızlı bileşen yükleniyor (100ms)...",
      slowLoading: "⏳ Yavaş bileşen yükleniyor (800ms)...",
      fastDone: "Hızlı bileşen (önbelleğe alınmış veri)",
      slowDone: "Yavaş bileşen (canlı envanter)",
      streamedNote: "sonra stream edildi",
      streamNote:
        "Sayfa yavaş bileşeni beklemedi — bağımsız olarak stream edildi. Anlık navigasyon tam olarak böyle çalışır.",
      patternLabel: "Tam Desen",
      patternTitle: "Anlık ürün sayfası",
      fixLabel: "Engelleyen Route'ları Düzeltme",
      fixTitle: "İki yaygın düzeltme",
      fixDesc:
        "Cache Components (next.config'de cacheComponents: true ile etkin), geliştirme ortamında her sayfayı otomatik olarak doğrular. Engelleyen bir route tespit ettiğinde, tam bileşeni ve düzeltme kartlarını gösteren bir geliştirici katmanı içgörüsü gösterir.",
      prefetchLabel: "Link Prefetching",
      prefetchTitle: "Kısmi Prefetching",
      optoutLabel: "Devre Dışı Bırakma",
      optoutTitle: "instant = false",
    },
  },
} as const;

// DeepStringify: keeps the structure for autocomplete on keys,
// but widens every string literal to `string` so EN & TR are both assignable.
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepStringify<T[K]>
    : T[K] extends readonly unknown[]
    ? DeepStringify<T[K][number]>[]
    : string;
};

export type Translations = DeepStringify<typeof translations["en"]>;

