// Demo data (static). Later this can be replaced by a CMS.
window.DATA = {
  whatsappNumber: "201226539262",
  socialLinks: {
    instagram: "https://www.instagram.com/balkan2egyptagency/",
    facebook: "https://www.facebook.com/Balkan2Egypt"
  },

  rentals: [
    {
      id: "r1",
      name: "🌴✨ EL GOUNA – G-CRIBS  ✨🌴",
      location: "Hurghada",
      type: "Apartment",
      pricePerNight: null,
      priceNote: "📅 Price depends on the requested dates.",
      image: "assets/gcribs/living-room.webp",
      gallery: [
        "assets/gcribs/living-room.webp",
        "assets/gcribs/pool-exterior.webp",
        "assets/gcribs/kitchen.webp",
        "assets/gcribs/pool-view.webp",
        "assets/gcribs/bedroom.webp",
        "assets/gcribs/bathroom.webp"
      ],
      description: `ЛУКСУЗ • ПРИВАТНОСТ • МИР • ПОГЛЕД КОН БАЗЕН

Замислете утро со поглед кон базен, мирна атмосфера и целосна приватност во една од најпосакуваните дестинации на Црвеното Море. 🌊☀️

Овој прекрасен апартман се наоѓа на прв кат во G-CRIBS, F5, El Gouna и е идеален за одмор со семејството, партнерот или пријателите.

✨ 2 спални соби
🛁 2 бањи
🏊 Заеднички базен
🌴 Поглед кон базен
📶 Бесплатен WiFi
🚗 Бесплатен паркинг
🏡 Прв кат

El Gouna е позната по својот уникатен начин на живот — луксуз, безбедност, приватност, прекрасни лагуни, ресторани, кафулиња и опуштена атмосфера далеку од гужвата.

Овде не доаѓате само на одмор.
🌴 Доаѓате да уживате во животниот стил на El Gouna.

Совршен избор за оние кои сакаат комфорен престој, приватност и мир, а сепак сакаат сè што El Gouna има да понуди да им биде на дофат. ❤️

📅 ЦЕНАТА ЗА АПАРТМАНОТ ЗАВИСИ ОД ПЕРИОДОТ И ДАТУМИТЕ НА ПРЕСТОЈ.`,
      amenities: [
        "🌴 Luxury & privacy in El Gouna!",
        "G-CRIBS F5",
        "First floor",
        "2 bedrooms",
        "2 bathrooms",
        "Pool view",
        "Free WiFi & parking"
      ],
      mapEmbed: "https://www.google.com/maps?q=Hurghada&output=embed"
    },
    {
      id: "r2",
      name: "Boutique Hotel Downtown",
      location: "Cairo",
      type: "Hotel",
      pricePerNight: 75,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=70",
      description: "Central hotel with easy access to attractions and restaurants.",
      amenities: ["Breakfast", "Wi-Fi", "24/7 reception"],
      mapEmbed: "https://www.google.com/maps?q=Cairo&output=embed"
    }
  ],

  properties: [
    {
      id: "p1",
      name: "Luxury Sea View Apartment",
      location: "Hurghada",
      price: 85000,
      type: "1 Bedroom",
      status: "Ready",
      areaM2: 62,
      rooms: 2,
      floor: 4,
      view: "Sea view",
      paymentPlan: "Optional instalments available",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7?auto=format&fit=crop&w=1200&q=70",
      description: "Perfect investment property with strong rental demand.",
      pros: ["Affordable prices", "Growing tourism", "Strong ROI potential"],
      mapEmbed: "https://www.google.com/maps?q=Hurghada&output=embed",
      nearBeach: true,
      isNewProject: true
    },
    {
      id: "p2",
      name: "Modern Studio",
      location: "Sharm El Sheikh",
      price: 65000,
      type: "Studio",
      status: "Off-plan",
      areaM2: 45,
      rooms: 1,
      floor: 2,
      view: "City view",
      paymentPlan: "30% down payment + monthly plan",
      image: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=70",
      description: "New project close to shopping and services.",
      pros: ["Low entry price", "Payment plan", "High seasonal demand"],
      mapEmbed: "https://www.google.com/maps?q=Sharm%20El%20Sheikh&output=embed",
      nearBeach: false,
      isNewProject: true
    }
  ],

  tours: [
    {
      id: "t1",
      name: "Desert Safari",
      location: "Hurghada",
      price: 25,
      duration: "4 hours",
      included: ["Transfer", "Guide", "Water"],
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=70",
      description: "Ride into the desert and enjoy sunset vibes.",
      mapEmbed: "https://www.google.com/maps?q=Hurghada&output=embed"
    },
    {
      id: "t2",
      name: "Cairo Day Trip",
      location: "Cairo",
      price: 40,
      duration: "Full day",
      included: ["Transport", "Guide"],
      image: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=70",
      description: "Must-see highlights in Cairo with a local guide.",
      mapEmbed: "https://www.google.com/maps?q=Cairo&output=embed"
    }
  ],

  food: [
    {
      id: "f1",
      name: "Seaside Restaurant",
      category: "Seafood",
      location: "Hurghada",
      hours: "12:00–23:00",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=70",
      description: "Fresh seafood with a sea view.",
      mapEmbed: "https://www.google.com/maps?q=Hurghada&output=embed",
      contact: "WhatsApp"
    }
  ],

  posts: [
    {
      id: "b1",
      title: "Top 10 Places to Visit in Egypt",
      category: "Places to Visit",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=70",
      excerpt: "A quick guide to the best spots you should not miss…",
      content: `
        <p>Egypt has something for everyone — history, beaches, and culture.</p>
        <p>We can also recommend tours, rentals, and investment areas.</p>
      `
    }
  ]
};
