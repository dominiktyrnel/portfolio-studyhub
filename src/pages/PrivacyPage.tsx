export function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Zásady Cookies a Ochrany Soukromí
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Transparentní informace o zpracování vašich dat
                    </p>
                    <p className="text-slate-400 text-sm mt-2">
                        Poslední aktualizace: 23. prosince 2024
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="prose prose-slate max-w-none">

                    {/* TL;DR Box */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-12 not-prose">
                        <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">✅</span>
                            Stručně řečeno
                        </h3>
                        <ul className="space-y-2 text-green-800">
                            <li className="flex items-start gap-2">
                                <span>✓</span>
                                <span><strong>Nepoužíváme</strong> Google Analytics, Facebook Pixel ani jiné sledovací nástroje třetích stran</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>✓</span>
                                <span><strong>Souhlas s cookies není nutný</strong> – používáme pouze nezbytné technické cookies</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>✓</span>
                                <span><strong>Data zůstávají u nás</strong> – žádné sdílení s reklamními platformami</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>✓</span>
                                <span><strong>Vlastní statistiky</strong> – pouze základní metriky na našem serveru</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 1 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">
                            1. Jaké cookies používáme
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    ✅ Nezbytné cookies (technické)
                                </h3>
                                <p className="text-slate-700 mb-4">
                                    Tyto cookies jsou nutné pro základní fungování webu. <strong>Souhlas není potřeba</strong> (§ 89 odst. 3 zákona 127/2005 Sb.).
                                </p>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-bold text-slate-800">🔐 Autentizace (Firebase)</h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            <strong>Účel:</strong> Přihlášení do administrace Study Hub<br />
                                            <strong>Typ:</strong> Session cookie<br />
                                            <strong>Platnost:</strong> Do odhlášení
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="font-bold text-slate-800">🌍 Uživatelské preference</h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            <strong>Klíče:</strong><br />
                                            - <code className="bg-slate-200 px-1 rounded">lang</code> – preferovaný jazyk (KR/EN/CZ)<br />
                                            - <code className="bg-slate-200 px-1 rounded">app-theme</code> – světlý/tmavý režim<br />
                                            - <code className="bg-slate-200 px-1 rounded">app-study-theme</code> – téma Study Hub<br />
                                            - <code className="bg-slate-200 px-1 rounded">app-study-lang</code> – jazyk Study Hub (KR/EN)<br />
                                            <strong>Platnost:</strong> Dokud nezměníte nebo nevymažete
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="font-bold text-slate-800">⚡ Technický cache</h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            <strong>Účel:</strong> Rychlejší načítání obsahu portfolia a dokumentů<br />
                                            <strong>Data:</strong> Projekty, dokumenty (pouze struktura, ne osobní údaje)<br />
                                            <strong>Ukládáno:</strong> Pouze lokálně ve vašem prohlížeči
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    📊 Vlastní statistiky (bez externích služeb)
                                </h3>
                                <p className="text-slate-700 mb-4">
                                    Pro účely zlepšení webu sledujeme základní metriky:
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2">
                                    <li>Počet zobrazení stránek</li>
                                    <li>Počet unikátních návštěvníků (session-based)</li>
                                    <li>Poslední aktivita na webu</li>
                                </ul>
                                <div className="bg-blue-100 rounded p-4 mt-4">
                                    <p className="font-semibold text-blue-900 mb-2">⚠️ Důležité:</p>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>✅ Nepoužíváme Google Analytics ani jiné externí služby</li>
                                        <li>✅ Data zůstávají na našem serveru (Firebase Firestore)</li>
                                        <li>✅ Není možné vás identifikovat osobně</li>
                                        <li>✅ Data nejsou sdílena s třetími stranami</li>
                                        <li>✅ Nesledujeme vás napříč jinými weby</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">
                            2. Co NEPOUŽÍVÁME
                        </h2>
                        <div className="bg-red-50 rounded-lg p-6">
                            <ul className="space-y-2 text-slate-700">
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">✗</span>
                                    Google Analytics / GA4
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">✗</span>
                                    Facebook Pixel / Meta Pixel
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">✗</span>
                                    Hotjar, Clarity nebo jiné heatmapy
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">✗</span>
                                    Reklamní cookies
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">✗</span>
                                    Tracking napříč weby (cross-site tracking)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">✗</span>
                                    Personalizovaná reklama
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">
                            3. Zpracování osobních údajů
                        </h2>

                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Kdy zpracováváme osobní údaje?</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
                            <li><strong>Registrace do Study Hub</strong> – email a uživatelské jméno (Firebase Auth)</li>
                            <li><strong>Kontaktní formulář</strong> – jméno, email, zpráva (ukládáno v Firestore)</li>
                            <li><strong>FAQ dotazy</strong> – jméno, kontakt, dotaz (pouze s vaším souhlasem k publikaci)</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Jak data chráníme?</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2">
                            <li>Všechna data jsou uložena v zabezpečené Firebase Firestore databázi</li>
                            <li>Přístup k databázi je chráněn bezpečnostními pravidly</li>
                            <li>Přihlášení pomocí Firebase Authentication (SHA-256 hashing)</li>
                            <li>HTTPS šifrování všech přenosů dat</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">
                            4. Vaše práva (GDPR)
                        </h2>
                        <div className="bg-slate-50 rounded-lg p-6">
                            <p className="text-slate-700 mb-4">
                                Podle nařízení GDPR (2016/679) máte následující práva:
                            </p>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-blue-600">📋</span>
                                    <div>
                                        <strong>Právo na informace</strong> – Víte přesně, jaká data o vás zpracováváme (viz výše)
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-blue-600">👁️</span>
                                    <div>
                                        <strong>Právo na přístup</strong> – Můžete požádat o kopii vašich dat
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-blue-600">✏️</span>
                                    <div>
                                        <strong>Právo na opravu</strong> – Můžete opravit nesprávné údaje
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-blue-600">🗑️</span>
                                    <div>
                                        <strong>Právo na výmaz</strong> – Můžete požádat o smazání vašich dat
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-blue-600">📦</span>
                                    <div>
                                        <strong>Právo na přenositelnost</strong> – Můžete získat vaše data ve strukturovaném formátu
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-blue-600">🚫</span>
                                    <div>
                                        <strong>Právo vznést námitku</strong> – Můžete nesouhlasit se zpracováním
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">
                            5. Právní základ
                        </h2>
                        <div className="text-slate-700 space-y-3">
                            <p>
                                Zpracování osobních údajů provádíme v souladu s:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>GDPR</strong> – Nařízení EU 2016/679</li>
                                <li><strong>Zákon 127/2005 Sb.</strong> – Zákon o elektronických komunikacích (§ 89 odst. 3 – cookies)</li>
                                <li><strong>Zákon 110/2019 Sb.</strong> – Zákon o zpracování osobních údajů</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">
                            6. Kontakt
                        </h2>
                        <div className="bg-slate-50 rounded-lg p-6">
                            <p className="text-slate-700 mb-4">
                                Pro uplatnění vašich práv nebo dotazy ohledně zpracování osobních údajů nás kontaktujte:
                            </p>
                            <div className="space-y-2 text-slate-700">
                                <p><strong>Email:</strong> <a href="mailto:your-email@example.com" className="text-blue-600 hover:underline">your-email@example.com</a></p>
                                <p><strong>Provozovatel:</strong> Dominik Tyrnel</p>
                                <p><strong>Web:</strong> <a href="https://dominik.tyrnel.com" className="text-blue-600 hover:underline">dominik.tyrnel.com</a></p>
                            </div>
                        </div>
                    </section>

                    {/* Footer note */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-12">
                        <p className="text-sm text-slate-700">
                            <strong>Poznámka:</strong> Tato stránka je transparentním popisem toho, co <strong>reálně děláme</strong>, ne copy-paste šablony.
                            Pokud máte jakékoli dotazy nebo obavy ohledně vašeho soukromí, neváhejte nás kontaktovat.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
