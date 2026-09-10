(function () {
  const storageKey = "b2e-language";
  const localeTags = { en: "en-GB", mk: "mk-MK", de: "de-DE", sr: "sr-Latn-RS" };
  const languages = Object.keys(localeTags);
  const rows = [
    ["Balkan2Egypt — Discover the Magic of Egypt", "Balkan2Egypt — Откријте ја магијата на Египет", "Balkan2Egypt — Entdecken Sie den Zauber Ägyptens", "Balkan2Egypt — Otkrijte magiju Egipta"],
    ["Hotels & Apartments — Balkan2Egypt", "Хотели и апартмани — Balkan2Egypt", "Hotels & Apartments — Balkan2Egypt", "Hoteli i apartmani — Balkan2Egypt"],
    ["Tours & Excursions — Balkan2Egypt", "Тури и екскурзии — Balkan2Egypt", "Touren & Ausflüge — Balkan2Egypt", "Ture i izleti — Balkan2Egypt"],
    ["Travel Guide — Balkan2Egypt", "Водич за патување — Balkan2Egypt", "Reiseführer — Balkan2Egypt", "Vodič za putovanje — Balkan2Egypt"],
    ["Discover Egypt — Balkan2Egypt", "Откријте го Египет — Balkan2Egypt", "Ägypten entdecken — Balkan2Egypt", "Otkrijte Egipat — Balkan2Egypt"],
    ["Contact — Balkan2Egypt", "Контакт — Balkan2Egypt", "Kontakt — Balkan2Egypt", "Kontakt — Balkan2Egypt"],
    ["Flights & Travel Deals — BALKAN2EGYPT", "Летови и патнички понуди — BALKAN2EGYPT", "Flüge & Reiseangebote — BALKAN2EGYPT", "Letovi i ponude — BALKAN2EGYPT"],
    ["Food & Dining — BALKAN2EGYPT", "Храна и ресторани — BALKAN2EGYPT", "Essen & Gastronomie — BALKAN2EGYPT", "Hrana i restorani — BALKAN2EGYPT"],
    ["For Partners — BALKAN2EGYPT", "За партнери — BALKAN2EGYPT", "Für Partner — BALKAN2EGYPT", "Za partnere — BALKAN2EGYPT"],
    ["Airport Transfers — BALKAN2EGYPT", "Аеродромски трансфери — BALKAN2EGYPT", "Flughafentransfers — BALKAN2EGYPT", "Aerodromski transferi — BALKAN2EGYPT"],
    ["Properties for Sale — BALKAN2EGYPT", "Имоти за продажба — BALKAN2EGYPT", "Immobilien zum Verkauf — BALKAN2EGYPT", "Nekretnine na prodaju — BALKAN2EGYPT"],
    ["Home", "Почетна", "Startseite", "Početna"],
    ["Apartments", "Апартмани", "Apartments", "Apartmani"],
    ["Tours & Excursions", "Тури и екскурзии", "Touren & Ausflüge", "Ture i izleti"],
    ["Discover Egypt", "Откријте го Египет", "Ägypten entdecken", "Otkrijte Egipat"],
    ["Contact", "Контакт", "Kontakt", "Kontakt"],
    ["Book now", "Резервирајте", "Jetzt buchen", "Rezervišite"],
    ["Book Now", "Резервирајте", "Jetzt buchen", "Rezervišite"],
    ["About", "За нас", "Über uns", "O nama"],
    ["About Us", "За нас", "Über uns", "O nama"],
    ["Travel Guide", "Водич за патување", "Reiseführer", "Vodič za putovanje"],
    ["Flights", "Летови", "Flüge", "Letovi"],
    ["Food", "Храна", "Essen", "Hrana"],
    ["Partners", "Партнери", "Partner", "Partneri"],
    ["Transfers", "Трансфери", "Transfers", "Transferi"],
    ["Real Estate", "Недвижности", "Immobilien", "Nekretnine"],
    ["Main navigation", "Главна навигација", "Hauptnavigation", "Glavna navigacija"],
    ["Travel services", "Патнички услуги", "Reiseservices", "Usluge putovanja"],
    ["Choose language", "Изберете јазик", "Sprache auswählen", "Izaberite jezik"],
    ["Toggle menu", "Отвори или затвори мени", "Menü öffnen oder schließen", "Otvori ili zatvori meni"],
    ["Chat with us on WhatsApp", "Пишете ни на WhatsApp", "Uns auf WhatsApp schreiben", "Pišite nam na WhatsApp"],
    ["Chat with Balkan2Egypt on WhatsApp", "Пишете му на Balkan2Egypt на WhatsApp", "Balkan2Egypt auf WhatsApp schreiben", "Pišite Balkan2Egypt timu na WhatsApp"],
    ["Curated travel in Hurghada", "Внимателно избрани патувања во Хургада", "Ausgewählte Reisen in Hurghada", "Pažljivo odabrana putovanja u Hurgadi"],
    ["Discover the", "Откријте ја", "Entdecken Sie den", "Otkrijte"],
    ["Magic of Egypt", "Магијата на Египет", "Zauber Ägyptens", "Magiju Egipta"],
    ["Your Local Travel Partner", "Вашиот локален партнер за патување", "Ihr lokaler Reisepartner", "Vaš lokalni partner za putovanja"],
    ["in Hurghada", "во Хургада", "in Hurghada", "u Hurgadi"],
    ["Explore", "Истражете", "Entdecken", "Istražite"],
    ["Airport", "Аеродромски", "Flughafen-", "Aerodromski"],
    ["Transfer", "Трансфер", "Transfer", "transfer"],
    ["VIP Services", "VIP услуги", "VIP-Services", "VIP usluge"],
    ["24/7 Support", "Поддршка 24/7", "24/7-Support", "Podrška 24/7"],
    ["Made for your journey", "Создадено за вашето патување", "Für Ihre Reise gemacht", "Stvoreno za vaše putovanje"],
    ["What We Offer", "Што нудиме", "Was wir anbieten", "Šta nudimo"],
    ["What we offer", "Што нудиме", "Was wir anbieten", "Šta nudimo"],
    ["Accommodation", "Сместување", "Unterkunft", "Smeštaj"],
    ["Luxury apartments, private villas and yacht stays.", "Луксузни апартмани, приватни вили и престој на јахта.", "Luxusapartments, private Villen und Aufenthalte auf Yachten.", "Luksuzni apartmani, privatne vile i boravak na jahti."],
    ["Unique Experiences", "Уникатни доживувања", "Einzigartige Erlebnisse", "Jedinstvena iskustva"],
    ["Horse riding, sea swimming and private moments.", "Јавање коњи, пливање во море и приватни моменти.", "Reiten, Schwimmen im Meer und private Momente.", "Jahanje, kupanje u moru i privatni trenuci."],
    ["Travel Services", "Патнички услуги", "Reiseservices", "Usluge putovanja"],
    ["Airport transfers, flight assistance and private transport.", "Аеродромски трансфери, помош со летови и приватен превоз.", "Flughafentransfers, Flugunterstützung und privater Transport.", "Aerodromski transferi, pomoć oko letova i privatni prevoz."],
    ["Local tips, beaches, dining, shopping and daily inspiration.", "Локални совети, плажи, храна, шопинг и секојдневна инспирација.", "Lokale Tipps, Strände, Restaurants, Shopping und tägliche Inspiration.", "Lokalni saveti, plaže, restorani, kupovina i svakodnevna inspiracija."],
    ["Guest stories", "Искуства на гостите", "Gästestimmen", "Priče gostiju"],
    ["Kind words from", "Убави зборови од", "Liebe Worte von", "Lepe reči od"],
    ["happy travellers", "задоволни патници", "glücklichen Reisenden", "zadovoljnih putnika"],
    ["Local care, remembered", "Локална грижа што се памети", "Lokale Betreuung, die in Erinnerung bleibt", "Lokalna briga koja se pamti"],
    ["“From the airport pickup to our boat day, everything felt effortless. Marija looked after every detail and always had the perfect local recommendation for us.”", "„Од пречекот на аеродром до денот на брод, сè беше безгрижно. Марија се погрижи за секој детал и секогаш имаше совршена локална препорака.“", "„Von der Abholung am Flughafen bis zu unserem Bootstag war alles mühelos. Marija kümmerte sich um jedes Detail und hatte immer die perfekte lokale Empfehlung.“", "„Od preuzimanja na aerodromu do dana na brodu, sve je bilo bezbrižno. Marija se pobrinula za svaki detalj i uvek je imala savršenu lokalnu preporuku.“"],
    ["“Our apartment was beautiful, clean and close to the sea. The team answered every question quickly and made Hurghada feel like home.”", "„Нашиот апартман беше прекрасен, чист и близу до морето. Тимот брзо одговори на секое прашање и направи Хургада да се чувствува како дом.“", "„Unser Apartment war schön, sauber und nah am Meer. Das Team beantwortete jede Frage schnell und ließ Hurghada wie ein Zuhause wirken.“", "„Naš apartman je bio prelep, čist i blizu mora. Tim je brzo odgovorio na svako pitanje i učinio da se u Hurgadi osećamo kao kod kuće.“"],
    ["“The private excursion was the highlight of our holiday. Marija made the whole day feel personal, relaxed and completely free of tourist stress.”", "„Приватната екскурзија беше најубавиот дел од одморот. Марија го направи целиот ден личен, опуштен и без туристички стрес.“", "„Der private Ausflug war der Höhepunkt unseres Urlaubs. Marija machte den ganzen Tag persönlich, entspannt und völlig frei von Touristenstress.“", "„Privatni izlet bio je vrhunac odmora. Marija je učinila da ceo dan bude ličan, opušten i bez turističkog stresa.“"],
    ["“Marija helped us choose the right trips for our family and was there whenever we needed advice. Warm, honest service from beginning to end.”", "„Марија ни помогна да ги избереме вистинските патувања за семејството и беше тука секогаш кога ни требаше совет. Топла и искрена услуга од почеток до крај.“", "„Marija half uns, die richtigen Ausflüge für unsere Familie auszuwählen, und war immer da, wenn wir Rat brauchten. Herzlicher, ehrlicher Service von Anfang bis Ende.“", "„Marija nam je pomogla da izaberemo prava putovanja za porodicu i bila je tu kad god nam je trebao savet. Topla i iskrena usluga od početka do kraja.“"],
    ["Need a local recommendation?", "Ви треба локална препорака?", "Brauchen Sie eine lokale Empfehlung?", "Treba vam lokalna preporuka?"],
    ["Let’s plan your perfect days in Hurghada.", "Ајде да ги испланираме вашите совршени денови во Хургада.", "Planen wir Ihre perfekten Tage in Hurghada.", "Hajde da isplaniramo vaše savršene dane u Hurgadi."],
    ["Chat on WhatsApp", "Пишете на WhatsApp", "Auf WhatsApp schreiben", "Pišite na WhatsApp"],
    ["Stay by the Red Sea", "Престој покрај Црвеното Море", "Am Roten Meer wohnen", "Boravak kraj Crvenog mora"],
    ["Hotels &", "Хотели и", "Hotels &", "Hoteli i"],
    ["Hotels & Apartments", "Хотели и апартмани", "Hotels & Apartments", "Hoteli i apartmani"],
    ["Hand-picked stays with trusted local support from arrival to checkout.", "Внимателно избрани сместувања со сигурна локална поддршка од пристигнување до одјавување.", "Handverlesene Unterkünfte mit zuverlässiger lokaler Betreuung von der Ankunft bis zum Check-out.", "Pažljivo odabrani smeštaji uz pouzdanu lokalnu podršku od dolaska do odjave."],
    ["Find your perfect base", "Најдете ја вашата совршена база", "Finden Sie Ihre perfekte Unterkunft", "Pronađite savršenu bazu"],
    ["Featured Stays", "Избрани сместувања", "Ausgewählte Unterkünfte", "Izdvojeni smeštaji"],
    ["Browse listings and book directly through WhatsApp.", "Разгледајте ги понудите и резервирајте директно преку WhatsApp.", "Angebote ansehen und direkt über WhatsApp buchen.", "Pregledajte ponude i rezervišite direktno putem WhatsApp-a."],
    ["Explore beyond the shore", "Истражете подалеку од брегот", "Mehr als nur die Küste entdecken", "Istražite dalje od obale"],
    ["Tours &", "Тури и", "Touren &", "Ture i"],
    ["Excursions", "Екскурзии", "Ausflüge", "Izleti"],
    ["Sea, desert, and ancient wonders—curated with trusted local guides.", "Море, пустина и древни чуда — избрани со доверливи локални водичи.", "Meer, Wüste und antike Wunder – ausgewählt mit vertrauenswürdigen lokalen Guides.", "More, pustinja i drevna čuda — odabrani sa pouzdanim lokalnim vodičima."],
    ["Featured Experiences", "Избрани доживувања", "Ausgewählte Erlebnisse", "Izdvojena iskustva"],
    ["Browse excursions and book directly through WhatsApp.", "Разгледајте ги екскурзиите и резервирајте директно преку WhatsApp.", "Ausflüge ansehen und direkt über WhatsApp buchen.", "Pregledajte izlete i rezervišite direktno putem WhatsApp-a."],
    ["All apartments", "Сите апартмани", "Alle Apartments", "Svi apartmani"],
    ["All tours & excursions", "Сите тури и екскурзии", "Alle Touren & Ausflüge", "Sve ture i izleti"],
    ["All travel stories", "Сите патнички приказни", "Alle Reisegeschichten", "Sve priče sa putovanja"],
    ["Apartment", "Апартман", "Apartment", "Apartman"],
    ["Tour & Excursion", "Тура и екскурзија", "Tour & Ausflug", "Tura i izlet"],
    ["About this stay", "За ова сместување", "Über diesen Aufenthalt", "O ovom smeštaju"],
    ["The Space", "Просторот", "Die Unterkunft", "Prostor"],
    ["Your experience", "Вашето доживување", "Ihr Erlebnis", "Vaše iskustvo"],
    ["Trip Details", "Детали за патувањето", "Reisedetails", "Detalji putovanja"],
    ["Where you will be", "Каде ќе бидете", "Wo Sie sein werden", "Gde ćete biti"],
    ["Location", "Локација", "Standort", "Lokacija"],
    ["Nightly rate", "Цена за ноќ", "Preis pro Nacht", "Cena po noćenju"],
    ["Apartment photos", "Фотографии од апартманот", "Apartmentfotos", "Fotografije apartmana"],
    ["Amenities", "Содржини", "Ausstattung", "Sadržaji"],
    ["Included", "Вклучено", "Inklusive", "Uključeno"],
    ["Private experience", "Приватно доживување", "Privates Erlebnis", "Privatno iskustvo"],
    ["Book via WhatsApp", "Резервирајте преку WhatsApp", "Über WhatsApp buchen", "Rezervišite putem WhatsApp-a"],
    ["Our local team answers within minutes and can arrange transfers, excursions and early check-in.", "Нашиот локален тим одговара за неколку минути и може да организира трансфери, екскурзии и рано пријавување.", "Unser lokales Team antwortet innerhalb weniger Minuten und organisiert Transfers, Ausflüge und frühen Check-in.", "Naš lokalni tim odgovara za nekoliko minuta i može organizovati transfere, izlete i ranu prijavu."],
    ["Send your preferred destination, date and group size for availability.", "Испратете ја посакуваната дестинација, датум и број на лица за проверка на достапност.", "Senden Sie Wunschziel, Datum und Gruppengröße für die Verfügbarkeit.", "Pošaljite željenu destinaciju, datum i broj osoba radi provere dostupnosti."],
    ["Local knowledge for better journeys", "Локално знаење за подобри патувања", "Lokales Wissen für bessere Reisen", "Lokalno znanje za bolja putovanja"],
    ["Beaches, ancient wonders, food, culture, and practical advice for discovering Egypt with confidence.", "Плажи, древни чуда, храна, култура и практични совети за сигурно откривање на Египет.", "Strände, antike Wunder, Essen, Kultur und praktische Tipps, um Ägypten sicher zu entdecken.", "Plaže, drevna čuda, hrana, kultura i praktični saveti za sigurno otkrivanje Egipta."],
    ["Notes from Egypt", "Белешки од Египет", "Notizen aus Ägypten", "Beleške iz Egipta"],
    ["Stories & Local Tips", "Приказни и локални совети", "Geschichten & lokale Tipps", "Priče i lokalni saveti"],
    ["Useful ideas and first-hand inspiration for planning your stay.", "Корисни идеи и инспирација од прва рака за планирање на вашиот престој.", "Nützliche Ideen und Inspiration aus erster Hand für die Planung Ihres Aufenthalts.", "Korisne ideje i inspiracija iz prve ruke za planiranje vašeg boravka."],
    ["Read the story", "Прочитајте ја приказната", "Geschichte lesen", "Pročitajte priču"],
    ["Planning your own Egypt story?", "Ја планирате вашата приказна во Египет?", "Planen Sie Ihre eigene Ägypten-Geschichte?", "Planirate svoju priču u Egiptu?"],
    ["Let a local make it easier.", "Дозволете локалец да ви го олесни планирањето.", "Lassen Sie es sich von Einheimischen leichter machen.", "Neka vam lokalni tim olakša planiranje."],
    ["Tell us what you want to see and we’ll help shape the details.", "Кажете ни што сакате да видите и ќе ви помогнеме со деталите.", "Sagen Sie uns, was Sie sehen möchten, und wir helfen bei den Details.", "Recite nam šta želite da vidite i pomoći ćemo oko detalja."],
    ["Plan my trip", "Испланирајте го моето патување", "Meine Reise planen", "Isplanirajte moje putovanje"],
    ["Stories from the Red Sea and beyond", "Приказни од Црвеното Море и пошироко", "Geschichten vom Roten Meer und darüber hinaus", "Priče sa Crvenog mora i šire"],
    ["Fresh travel moments, local tips, and inspiration shared directly by Balkan2Egypt.", "Нови патнички моменти, локални совети и инспирација директно од Balkan2Egypt.", "Neue Reisemomente, lokale Tipps und Inspiration direkt von Balkan2Egypt.", "Novi trenuci sa putovanja, lokalni saveti i inspiracija direktno od Balkan2Egypt-a."],
    ["Latest from our community", "Најново од нашата заедница", "Neues aus unserer Community", "Najnovije iz naše zajednice"],
    ["Egypt Stories", "Приказни од Египет", "Ägypten-Geschichten", "Priče iz Egipta"],
    ["Follow on Facebook", "Следете нè на Facebook", "Auf Facebook folgen", "Pratite nas na Facebook-u"],
    ["Live from Facebook", "Во живо од Facebook", "Live von Facebook", "Uživo sa Facebook-a"],
    ["Read on Facebook", "Прочитајте на Facebook", "Auf Facebook lesen", "Pročitajte na Facebook-u"],
    ["Video", "Видео", "Video", "Video"],
    ["These posts refresh automatically as we publish on Facebook.", "Овие објави автоматски се обновуваат кога објавуваме на Facebook.", "Diese Beiträge werden automatisch aktualisiert, wenn wir auf Facebook veröffentlichen.", "Ove objave se automatski osvežavaju kada objavljujemo na Facebook-u."],
    ["See all posts on Facebook ↗", "Погледнете ги сите објави на Facebook ↗", "Alle Beiträge auf Facebook ansehen ↗", "Pogledajte sve objave na Facebook-u ↗"],
    ["Your local team in Hurghada", "Вашиот локален тим во Хургада", "Ihr lokales Team in Hurghada", "Vaš lokalni tim u Hurgadi"],
    ["Let’s Plan", "Ајде да ја испланираме", "Planen wir", "Hajde da isplaniramo"],
    ["Your Egypt Story", "Вашата приказна во Египет", "Ihre Ägypten-Geschichte", "Vašu priču u Egiptu"],
    ["Tell us what you need and receive personal guidance from people who know the Red Sea coast.", "Кажете ни што ви треба и добијте лични совети од луѓе кои го познаваат брегот на Црвеното Море.", "Sagen Sie uns, was Sie brauchen, und erhalten Sie persönliche Beratung von Menschen, die die Küste des Roten Meeres kennen.", "Recite nam šta vam treba i dobićete lične savete od ljudi koji poznaju obalu Crvenog mora."],
    ["Start the conversation", "Започнете разговор", "Gespräch beginnen", "Započnite razgovor"],
    ["We’re Here to Help", "Тука сме да помогнеме", "Wir helfen Ihnen gern", "Tu smo da pomognemo"],
    ["Fastest response", "Најбрз одговор", "Schnellste Antwort", "Najbrži odgovor"],
    ["Message Us", "Пишете ни", "Schreiben Sie uns", "Pišite nam"],
    ["on WhatsApp", "на WhatsApp", "auf WhatsApp", "na WhatsApp-u"],
    ["Open WhatsApp", "Отвори WhatsApp", "WhatsApp öffnen", "Otvori WhatsApp"],
    ["Call or message", "Јавете се или пишете", "Anrufen oder schreiben", "Pozovite ili pišite"],
    ["Send an enquiry", "Испратете прашање", "Anfrage senden", "Pošaljite upit"],
    ["Tell Us About Your Trip", "Кажете ни за вашето патување", "Erzählen Sie uns von Ihrer Reise", "Recite nam o svom putovanju"],
    ["Your name", "Вашето име", "Ihr Name", "Vaše ime"],
    ["Email address", "Е-пошта", "E-Mail-Adresse", "Imejl adresa"],
    ["How can we help?", "Како можеме да помогнеме?", "Wie können wir helfen?", "Kako možemo da pomognemo?"],
    ["Send Enquiry", "Испрати прашање", "Anfrage senden", "Pošalji upit"],
    ["Sending your enquiry…", "Го испраќаме вашето прашање…", "Ihre Anfrage wird gesendet…", "Šaljemo vaš upit…"],
    ["Thanks! Your message has been sent — we’ll reply by email shortly.", "Ви благодариме! Пораката е испратена — наскоро ќе ви одговориме по е-пошта.", "Vielen Dank! Ihre Nachricht wurde gesendet – wir antworten Ihnen in Kürze per E-Mail.", "Hvala! Vaša poruka je poslata — uskoro ćemo odgovoriti imejlom."],
    ["About Us — BALKAN2EGYPT", "За нас — BALKAN2EGYPT", "Über uns — BALKAN2EGYPT", "O nama — BALKAN2EGYPT"],
    ["Who is behind the agency, experience, mission, and story.", "Запознајте ги луѓето, искуството, мисијата и приказната зад агенцијата.", "Menschen, Erfahrung, Mission und Geschichte hinter der Agentur.", "Upoznajte ljude, iskustvo, misiju i priču iza agencije."],
    ["Flights & Travel Deals", "Летови и патнички понуди", "Flüge & Reiseangebote", "Letovi i ponude za putovanja"],
    ["We do not sell tickets directly.", "Не продаваме билети директно.", "Wir verkaufen keine Tickets direkt.", "Ne prodajemo karte direktno."],
    ["Tips for finding low-cost flights", "Совети за евтини летови", "Tipps für günstige Flüge", "Saveti za povoljne letove"],
    ["Flight Alerts & Deals", "Известувања и понуди за летови", "Flugalarme & Angebote", "Obaveštenja i ponude za letove"],
    ["Food & Dining", "Храна и ресторани", "Essen & Gastronomie", "Hrana i restorani"],
    ["Restaurants • Cafés • Local food • Seafood", "Ресторани • Кафулиња • Локална храна • Морска храна", "Restaurants • Cafés • Lokale Küche • Meeresfrüchte", "Restorani • Kafići • Lokalna hrana • Morski plodovi"],
    ["Ask on WhatsApp", "Прашајте на WhatsApp", "Auf WhatsApp fragen", "Pitajte na WhatsApp-u"],
    ["For Partners", "За партнери", "Für Partner", "Za partnere"],
    ["Digital promotion & social media", "Дигитална промоција и социјални мрежи", "Digitale Werbung & soziale Medien", "Digitalna promocija i društvene mreže"],
    ["Website listing", "Огласување на веб-страницата", "Eintrag auf der Website", "Oglas na veb-sajtu"],
    ["Client generation", "Привлекување клиенти", "Kundengewinnung", "Pronalaženje klijenata"],
    ["Long-term cooperation", "Долгорочна соработка", "Langfristige Zusammenarbeit", "Dugoročna saradnja"],
    ["Let’s work", "Ајде да соработуваме", "Lassen Sie uns zusammenarbeiten", "Hajde da sarađujemo"],
    ["Become a Partner (WhatsApp)", "Станете партнер (WhatsApp)", "Partner werden (WhatsApp)", "Postanite partner (WhatsApp)"],
    ["Airport Transfers", "Аеродромски трансфери", "Flughafentransfers", "Aerodromski transferi"],
    ["Sedan", "Седан", "Limousine", "Limuzina"],
    ["Comfort for 1–3 passengers.", "Удобност за 1–3 патници.", "Komfort für 1–3 Personen.", "Udobnost za 1–3 putnika."],
    ["Van", "Комбе", "Van", "Kombi"],
    ["Best for families & groups.", "Најдобро за семејства и групи.", "Ideal für Familien & Gruppen.", "Najbolje za porodice i grupe."],
    ["Real Estate — Properties for Sale", "Недвижности — имоти за продажба", "Immobilien zum Verkauf", "Nekretnine na prodaju"],
    ["Filter by location, type, status, and investment options.", "Филтрирајте по локација, тип, статус и инвестициски можности.", "Nach Standort, Typ, Status und Investitionsoptionen filtern.", "Filtrirajte po lokaciji, tipu, statusu i investicionim opcijama."],
    ["Near beach", "Во близина на плажа", "Strandnah", "Blizu plaže"],
    ["New projects", "Нови проекти", "Neue Projekte", "Novi projekti"],
    ["Why Buy Property in Egypt?", "Зошто да купите имот во Египет?", "Warum eine Immobilie in Ägypten kaufen?", "Zašto kupiti nekretninu u Egiptu?"],
    ["Affordable prices", "Прифатливи цени", "Erschwingliche Preise", "Pristupačne cene"],
    ["Growing tourism", "Растечки туризам", "Wachsender Tourismus", "Turizam u porastu"],
    ["Great investment potential", "Одличен инвестициски потенцијал", "Großes Investitionspotenzial", "Odličan investicioni potencijal"],
    ["Rent to tourists", "Изнајмување на туристи", "Vermietung an Touristen", "Izdavanje turistima"],
    ["Personal support during the purchase", "Лична поддршка при купувањето", "Persönliche Begleitung beim Kauf", "Lična podrška tokom kupovine"],
    ["All locations", "Сите локации", "Alle Standorte", "Sve lokacije"],
    ["All types", "Сите типови", "Alle Typen", "Svi tipovi"],
    ["All statuses", "Сите статуси", "Alle Statuswerte", "Svi statusi"],
    ["Property", "Имот", "Immobilie", "Nekretnina"],
    ["Description", "Опис", "Beschreibung", "Opis"],
    ["Price", "Цена", "Preis", "Cena"],
    ["Facts", "Податоци", "Fakten", "Podaci"],
    ["Investment Benefits", "Инвестициски придобивки", "Investitionsvorteile", "Prednosti ulaganja"],
    ["Buy via WhatsApp", "Купете преку WhatsApp", "Über WhatsApp kaufen", "Kupite putem WhatsApp-a"],
    ["From", "Од", "Ab", "Od"],
    ["per night", "за ноќ", "pro Nacht", "po noćenju"],
    ["starting price", "почетна цена", "Startpreis", "početna cena"],
    ["Price on request", "Цена на барање", "Preis auf Anfrage", "Cena na upit"],
    ["View photo", "Погледнете ја фотографијата", "Foto ansehen", "Pogledajte fotografiju"],
    ["Close photo viewer", "Затвори ја галеријата", "Fotoansicht schließen", "Zatvori galeriju"],
    ["Previous photo", "Претходна фотографија", "Vorheriges Foto", "Prethodna fotografija"],
    ["Next photo", "Следна фотографија", "Nächstes Foto", "Sledeća fotografija"],
    ["Seafood", "Морска храна", "Meeresfrüchte", "Morski plodovi"],
    ["Fresh seafood with a sea view.", "Свежа морска храна со поглед кон морето.", "Frische Meeresfrüchte mit Meerblick.", "Sveži morski plodovi sa pogledom na more."],
    ["Places to Visit", "Места за посета", "Sehenswürdigkeiten", "Mesta za posetu"],
    ["Top 10 Places to Visit in Egypt", "Топ 10 места за посета во Египет", "Die 10 besten Orte in Ägypten", "Top 10 mesta za posetu u Egiptu"],
    ["A quick guide to the best spots you should not miss…", "Краток водич за најдобрите места што не треба да ги пропуштите…", "Ein kurzer Guide zu den besten Orten, die Sie nicht verpassen sollten…", "Kratak vodič kroz najbolja mesta koja ne treba propustiti…"],
    ["Studio Apartment", "Студио апартман", "Studio-Apartment", "Studio apartman"],
    ["One-Bedroom Apartment", "Апартман со една спална", "Apartment mit einem Schlafzimmer", "Apartman sa jednom spavaćom sobom"],
    ["1 Bedroom", "1 спална", "1 Schlafzimmer", "1 spavaća soba"],
    ["Ready", "Готов", "Bezugsfertig", "Useljivo"],
    ["Off-plan", "Во изградба", "Im Bau", "U izgradnji"],
    ["Sea view", "Поглед кон море", "Meerblick", "Pogled na more"],
    ["City view", "Поглед кон град", "Stadtblick", "Pogled na grad"],
    ["Shared swimming pool", "Заеднички базен", "Gemeinschaftspool", "Zajednički bazen"],
    ["24/7 security", "Обезбедување 24/7", "24/7-Sicherheitsdienst", "Obezbeđenje 24/7"],
    ["Fully equipped kitchen", "Целосно опремена кујна", "Voll ausgestattete Küche", "Potpuno opremljena kuhinja"],
    ["Breakfast included", "Вклучен појадок", "Frühstück inklusive", "Doručak uključen"],
    ["Smart lock", "Паметна брава", "Smart Lock", "Pametna brava"],
    ["Swimming pool in the complex", "Базен во комплексот", "Pool in der Anlage", "Bazen u kompleksu"],
    ["New European-style furniture", "Нов мебел во европски стил", "Neue Möbel im europäischen Stil", "Novi nameštaj u evropskom stilu"],
    ["Private speed boat", "Приватен глисер", "Privates Schnellboot", "Privatni gliser"],
    ["Fruit and drinks", "Овошје и пијалаци", "Obst und Getränke", "Voće i piće"],
    ["Your choice of destination", "Дестинација по ваш избор", "Ziel nach Ihrer Wahl", "Destinacija po vašem izboru"],
    ["No sharing with other guests", "Без споделување со други гости", "Kein Teilen mit anderen Gästen", "Bez deljenja sa drugim gostima"]
  ];

  const tables = { mk: {}, de: {}, sr: {} };
  rows.forEach(([english, macedonian, german, serbian]) => {
    tables.mk[english] = macedonian;
    tables.de[english] = german;
    tables.sr[english] = serbian;
  });

  let locale = languages.includes(localStorage.getItem(storageKey)) ? localStorage.getItem(storageKey) : "en";
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  function translateCore(value, target = locale) {
    if (!value || target === "en") return value;
    if (tables[target][value]) return tables[target][value];
    if (value.includes(" • ")) return value.split(" • ").map(part => translateCore(part, target)).join(" • ");
    const nightly = value.match(/^From (.+) \/ night$/);
    if (nightly) return `${translateCore("From", target)} ${nightly[1]} / ${translateCore("per night", target)}`;
    const starting = value.match(/^From (.+)$/);
    if (starting) return `${translateCore("From", target)} ${starting[1]}`;
    const photos = value.match(/^View all (\d+) photos$/);
    if (photos) return { mk: `Погледнете ги сите ${photos[1]} фотографии`, de: `Alle ${photos[1]} Fotos ansehen`, sr: `Pogledajte svih ${photos[1]} fotografija` }[target];
    return value;
  }

  function translate(value, target = locale) {
    if (typeof value !== "string" || !value.trim()) return value;
    const leading = value.match(/^\s*/)[0];
    const trailing = value.match(/\s*$/)[0];
    return `${leading}${translateCore(value.trim(), target)}${trailing}`;
  }

  function skipped(node) {
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return !element || Boolean(element.closest("script, style, noscript, [data-no-translate]"));
  }

  function translateText(node) {
    if (skipped(node)) return;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const next = locale === "en" ? source : translate(source);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function translateAttributes(element) {
    if (skipped(element)) return;
    const names = ["aria-label", "placeholder", "title"];
    const originals = originalAttributes.get(element) || {};
    originalAttributes.set(element, originals);
    names.forEach(name => {
      if (!element.hasAttribute(name)) return;
      if (!(name in originals)) originals[name] = element.getAttribute(name);
      const next = locale === "en" ? originals[name] : translate(originals[name]);
      if (element.getAttribute(name) !== next) element.setAttribute(name, next);
    });
  }

  function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) return translateText(root);
    if (root.nodeType !== Node.ELEMENT_NODE || skipped(root)) return;
    translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      node.nodeType === Node.TEXT_NODE ? translateText(node) : translateAttributes(node);
      node = walker.nextNode();
    }
  }

  function addSelector() {
    const nav = document.querySelector(".topbar .nav");
    if (!nav || nav.querySelector(".language-picker")) return;
    const picker = document.createElement("label");
    picker.className = "language-picker";
    picker.setAttribute("data-no-translate", "");
    picker.innerHTML = `<svg class="language-picker__globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path></svg><span class="language-picker__value" aria-hidden="true">EN</span><span class="sr-only">Choose language</span><select class="language-picker__select" aria-label="Choose language"><option value="en">EN</option><option value="mk">MK</option><option value="de">DE</option><option value="sr">SRB</option></select><svg class="language-picker__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"></path></svg>`;
    const booking = nav.querySelector(".nav-book");
    if (booking) booking.insertAdjacentElement("afterend", picker);
    else nav.appendChild(picker);
    const select = picker.querySelector("select");
    select.value = locale;
    picker.querySelector(".language-picker__value").textContent = select.options[select.selectedIndex].text;
    select.setAttribute("aria-label", translateCore("Choose language"));
    picker.querySelector(".sr-only").textContent = translateCore("Choose language");
    select.addEventListener("change", () => setLocale(select.value));
  }

  function setLocale(next) {
    locale = languages.includes(next) ? next : "en";
    localStorage.setItem(storageKey, locale);
    document.documentElement.lang = localeTags[locale];
    const select = document.querySelector(".language-picker__select");
    if (select) {
      select.value = locale;
      document.querySelector(".language-picker__value").textContent = select.options[select.selectedIndex].text;
      select.setAttribute("aria-label", translateCore("Choose language"));
      document.querySelector(".language-picker .sr-only").textContent = translateCore("Choose language");
    }
    translateTree(document.documentElement);
    document.dispatchEvent(new CustomEvent("b2e:localechange", { detail: { locale } }));
  }

  window.B2E_I18N = {
    get locale() { return locale; },
    get localeTag() { return localeTags[locale]; },
    setLocale,
    translate
  };

  document.addEventListener("DOMContentLoaded", () => {
    addSelector();
    document.documentElement.lang = localeTags[locale];
    try {
      translateTree(document.documentElement);
    } finally {
      document.documentElement.classList.remove("i18n-pending");
    }
    new MutationObserver(mutations => mutations.forEach(mutation => {
      if (mutation.type === "characterData") translateText(mutation.target);
      if (mutation.type === "attributes") translateAttributes(mutation.target);
      mutation.addedNodes.forEach(translateTree);
    })).observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "placeholder", "title"]
    });
  });
})();
