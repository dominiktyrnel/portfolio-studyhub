import { EN_COMMON } from "./en_common";

export const contentEn = {
    header: {
        nameLat: "Dominik Tyrnel",
        nameKr: EN_COMMON.NAME_KR,
        menu: {
            profile: {
                title: "Professional Profile",
                items: [
                    { id: 'home', label: "Home" },
                    { id: 'portfolio', label: "Portfolio" },
                    { id: 'profile', label: EN_COMMON.NAV.PROFILE_TITLE },
                    { id: 'documents', label: "Documents" },
                    { id: 'contact', label: EN_COMMON.SECTION.CONTACT }
                ]
            },
            study: {
                title: "Study (Personal)",
                items: [
                    { id: 'plan', label: "Study Plan" },
                    { id: 'status', label: "Status" },
                    { id: 'cam', label: "Live Study (Optional)" }
                ]
            }
        },
        actions: {
            pdf: "Save PDF / Print",
            print: "Print"
        }
    },
    hero: {
        title: "Construction Site Team Leader · 15 Years Experience (Czech Republic)",
        subtitle: [
            "Hands-on execution across the full cycle: demolition → finishing → handover (excluding licensed trades).",
            "Small-team leadership (2–8): task assignment, quality checks, and schedule coordination.",
            "Learning Korean (study log available as optional reference)."
        ],
        badge: {
            cz: "Residing in Czechia",
            kr: "Seeking KR Job (" + EN_COMMON.VISA + ")",
            txt: "Learning Korean"
        },
        chips: [
            "15+ Years",
            "30+ Projects",
            "Hands-on Execution",
            "Small-Team Lead"
        ],
        cta: {
            primary: "Contact via KakaoTalk",
            secondary: "View Portfolio"
        }
    },
    skills: {
        title: EN_COMMON.SECTION.SKILLS + " (Practical)",
        desc: "Scope of direct on-site execution. I also handle material coordination and quality checks as needed.",
        columns: [
            {
                title: "Structural · Foundation · Masonry",
                items: [
                    { name: "Demolition / Prep Work", level: "Highly Skilled" },
                    { name: "Waste Disposal / Site Cleanup", level: "Skilled" },
                    { name: "Masonry / Repair", level: "Skilled" },
                    { name: "Plastering / Base Work", level: "Skilled" },
                    { name: "Concrete Pouring / Reinforcement", level: "Practical Exp" }
                ]
            },
            {
                title: "Interior · Finishing · Fit-out",
                items: [
                    { name: "Drywall (Wall/Ceiling/Systems)", level: "Skilled" },
                    { name: "Tiling", level: "Skilled" },
                    { name: "Waterproofing (Bath/Kitchen)", level: "Skilled" },
                    { name: "Painting / Putty / Finish Repair", level: "Highly Skilled" },
                    { name: "Flooring / Detail Finishing (Baseboards/Moldings)", level: "Practical Exp" },
                    { name: "Door / Frame Installation", level: "Practical Exp" }
                ]
            },
            {
                title: "Insulation · Exterior · Equipment",
                items: [
                    { name: "Insulation (EPS/MW) / Facade Repair", level: "Practical Exp" },
                    { name: "Waterproofing / Soundproofing / Thermal Prep", level: "Practical Exp" },
                    { name: "Power Tools (Drill/Cut/Measure)", level: "Highly Skilled" },
                    { name: "Small Machinery (Forklift/Loader/Lift)", level: "Practical Exp" },
                    { name: "Blueprint Reading / Site Application", level: "Practical Exp" },
                    { name: "MEP Support (Subcontractor Assist)", level: "Practical Exp" }
                ]
            }
        ]
    },
    equipment: {
        title: EN_COMMON.SECTION.TOOLS,
        desc: "I set up and operate necessary tools and equipment directly on site.\n" + EN_COMMON.MEP_SEPARATION + "; for other processes, I perform duties based on accuracy, safety, and organization.",
        bullets: [
            "Small/Heavy Machinery Operation: Forklift (VZV), Telehandler (Manitou/JCB), Mini/Skid Loader",
            "Power Tools: Skilled with Makita / Milwaukee / Hilti lineup",
            "Measurement: Rotary/Leveling Laser (Topcon), Level/Square/Distance measurement",
            "Specialized Equipment: Core Drill (Coring), Tile Cutting (Wet/Dry), Brick/Metal Cutting/Grinding",
            "Welding (Basic): SMAW (Stick) basic tasks possible"
        ]
    },
    strengths: {
        title: EN_COMMON.SECTION.STYLE,
        cards: [
            { title: "Finish Quality Control", desc: "Detail-focused execution and clean handover readiness." },
            { title: "On-site Problem Solving", desc: "Root cause → fix → prevent rework." },
            { title: "Reliability", desc: "Schedule discipline and consistent standards." },
            { title: "Team Leadership (2–8)", desc: "Clear direction, coordination, and QA." }
        ]
    },
    experience: {
        title: "Experience",
        main: {
            period: "2009.11 – Present (Current)",
            company: "Cita Trading s.r.o. (Brno, Czechia)",
            role: EN_COMMON.ROLE_LINE + " (Hands-on)",
            bullets: [
                "Multiple new build & remodeling projects for Residential/Commercial/Industrial spaces",
                "Construction experience in hygiene-critical spaces (Medical/Food)",
                "Direct on-site execution and team leadership (2–8 people) when needed",
                "Material estimation/coordination, workflow management, quality checks",
                "Problem-solving directly on site, not from the office"
            ]
        },
        education: {
            title: "Education",
            desc: "2006–2009, Painting/Surface Treatment Major, Awarded for Excellence"
        }
    },
    proof: {
        title: "Proof (Verification)",
        cards: []
    },
    portfolio: {
        sectionTitle: "Portfolio (Highlights)",
        viewAll: "View All Projects",
        pageTitle: "Portfolio",
        pageSubtitle: "30+ Projects (Direct Execution)",
        categories: [
            "All", "Full Remodel", "Bath/Tile", "Drywall", "Paint/Finish", "Insulation/Exterior", "Commercial", "Medical/Hygiene"
        ],
        filters: {
            all: "All",
            remodel: "Full Remodel",
            bath: "Bath/Tile",
            drywall: "Drywall",
            paint: "Paint/Finish",
            insul: "Insulation/Exterior",
            comm: "Commercial",
            med: "Medical/Hygiene"
        },
        labels: {
            cat: "Category",
            space: "Space",
            loc: "Location",
            period: "Period",
            role: "Role",
            scope: "Scope",
            keywords: "Keywords",
            content: "Work Content",
            photos: "Site Photos",
            result: "Result"
        },
        projects: [
            // Highlights (First 6)
            {
                id: "1",
                title: "Country Villa New Build",
                cat: "New Build",
                summary: "Performed site execution and finishing works for a new residential villa.",
                tags: ["#NewBuild", "#DetachedHouse", "#Structure", "#Masonry", "#Finishing", "#TeamLeader"],
                img: "/img/1/27.webp",
                detail: {
                    cat: "New Build",
                    space: "Residential / Villa",
                    loc: "Czechia · Vysočina",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "New Build, Schedule, Logistics, Cleanup, Handover",
                    desc: "As Site Team Leader, I executed the new villa construction process with the team, participating from demolition/excavation to finishing and handover.\n\nThe key was coordinating logistics, materials, and work sequence to prevent delays. We managed interval preparation and organization to minimize interference between trades. Electrical/MEP was handled by partners, while I oversaw quality and participated in other processes directly.",
                    bullets: [
                        "Demolition/Excavation, Site Cleanup, Zone Setting",
                        "Foundation Prep & Material/Logistics Management",
                        "Masonry/Plastering Structure Work & Quality Check",
                        "Interior/Exterior Finishing & Detail Organization",
                        "Minimizing Interference (Zone Separation/Standard Maintenance)",
                        "Step-by-step Cleanup -> Smoothing Next Process",
                        "Final Organization & Handover Prep"
                    ],
                    result: "Managed workflow and site organization together to ensure smooth schedule continuity and secured quality for a clean handover."
                }
            },
            {
                id: "2",
                title: "Full Renovation of Two Bathrooms",
                cat: "Bath Remodel",
                summary: "Executed step-by-step renovation of 2 bathrooms from foundation to finish.",
                tags: ["#BathRemodel", "#Waterproofing", "#Tiling", "#Finishing", "#Precision", "#TeamLeader"],
                img: "/img/2/15.webp",
                detail: {
                    cat: "Bath Remodel",
                    space: "Apartment (Residential)",
                    loc: "Czechia · Jihomoravský",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Waterproofing, Slope, Precision Tiling, Defect Prevention, Finish",
                    desc: "As Site Team Leader, I renovated two bathrooms with the team, participating from foundation work to finishing and handover.\n\nIn wet areas, waterproofing and slope (drainage) are directly linked to quality, so we prioritized these standards. Electrical/plumbing connections were shared with partners, while I managed substrate prep, waterproofing, tiling, and finishing directly. We maintained strict organization at each step to reduce rework and defect risks.",
                    bullets: [
                        "Demolition & Substrate Prep",
                        "Waterproofing Prep/Application (Standard Compliance)",
                        "Slope/Level Check & Correction (Drainage)",
                        "Tile Layout & Precision Installation",
                        "Grouting/Silicon & Finish Details",
                        "Cleanup per Process & Minimizing Rework",
                        "Final Handover Prep"
                    ],
                    result: "Strictly managed waterproofing and slope standards to lower defect risks and finished with stable quality."
                }
            },
            {
                id: "3",
                title: "Dance Club Soundproof Ceiling",
                cat: "Interior Finish",
                summary: "Installed soundproof/insulation ceiling followed by drywall finishing.",
                tags: ["#Commercial", "#Soundproofing", "#Ceiling", "#Drywall", "#Finish", "#TeamLeader"],
                img: "/img/3/6.webp",
                detail: {
                    cat: "Interior Finish",
                    space: "Commercial (Club)",
                    loc: "Czechia · Jihomoravský",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Soundproofing, Ceiling Finish, Aesthetics, Coordination",
                    desc: "As Site Team Leader, I executed the commercial space ceiling soundproofing and drywall finish with the team.\n\nThe goal was to satisfy both soundproofing performance and visual aesthetics. Electrical wiring/connections were shared with partners, and I performed ceiling framing, board installation, and cleanup directly. Handover was prepared based on surface condition and site organization.",
                    bullets: [
                        "Zone Safety & Organization",
                        "Ceiling Framing (Site Division)",
                        "Soundproofing/Insulation & Finish Prep",
                        "Drywall Installation, Surface/Joint Treatment",
                        "Finish Quality Check & Repairs",
                        "Cleanup per Process & Handover Prep"
                    ],
                    result: "Secured visual finish quality while meeting soundproofing goals, handing over a clean state for the next phase."
                }
            },
            {
                id: "4",
                title: "Fence Demolition & Decorative Block Wall",
                cat: "Exterior Masonry",
                summary: "Demolished existing fence and installed new decorative block wall.",
                tags: ["#Demolition", "#Fence", "#BlockMasonry", "#Exterior", "#Alignment", "#TeamLeader"],
                img: "/img/4/9.webp",
                detail: {
                    cat: "Exterior Masonry",
                    space: "Residential Exterior (Fence)",
                    loc: "Czechia · Vysočina",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Line/Level, Masonry Alignment, Exterior Finish, Organization",
                    desc: "As Site Team Leader, I executed the project from demolition of the old fence to the new decorative block wall with the team.\n\nFor exposed exterior masonry, alignment and leveling are visible critical quality points. We proceeded from demolition/cleanup -> foundation prep -> masonry -> finish organization. Handover quality included surrounding area cleanup.",
                    bullets: [
                        "Demolition & Waste Disposal",
                        "Zone Organization & Foundation Prep",
                        "Decorative Block Masonry (Alignment/Level Control)",
                        "Finish Details & Surroundings",
                        "Cleanup per Process",
                        "Final Handover Prep"
                    ],
                    result: "Finished neatly by prioritizing line, level, and finish organization suitable for exposed exterior masonry."
                }
            },
            {
                id: "6",
                title: "Industrial Floor Reinforcement & Pouring",
                cat: "Industrial Floor",
                summary: "Participated in reinforcement and concrete pouring for industrial flooring.",
                tags: ["#IndustrialFloor", "#Rebar", "#Reinforcement", "#Concrete", "#Safety", "#TeamLeader"],
                img: "/img/6/6.webp",
                detail: {
                    cat: "Industrial Floor",
                    space: "Industrial Hall/Warehouse",
                    loc: "Czechia · Středočeský",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Large Area Pour, Logistics, Safety, Efficiency",
                    desc: "As Site Team Leader, I executed the industrial floor rebar and large-area concrete pouring process with the team.\n\nThe key was managing site flow, material movement, and work zones for efficient and safe large-scale pouring. We worked based on prep and organization, prioritizing safety rules.",
                    bullets: [
                        "Zone Separation & Flow Assurance",
                        "Material Placement/Movement Plan (Coordination)",
                        "Rebar Placement/Typing",
                        "Pouring Prep & Assist",
                        "Finish Organization & Safety",
                        "Safety Compliance & Handover State"
                    ],
                    result: "Managed efficiency and safety simultaneously in a large-area pour to ensure stable process completion."
                }
            },
            {
                id: "8",
                title: "Sidewalk & Stair Reconstruction",
                cat: "Exterior Reconstruction",
                summary: "Reconstructed residential frontage sidewalk and stairs, organized finish quality.",
                tags: ["#Sidewalk", "#Stairs", "#Reconstruction", "#ExteriorFinish", "#Organization", "#TeamLeader"],
                img: "/img/8/5.webp",
                detail: {
                    cat: "Exterior Reconstruction",
                    space: "Public Pedestrian Area",
                    loc: "Czechia · Jihomoravský",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Levels/Slope, Safety Flow, Finish Detail, Public Area",
                    desc: "As Site Team Leader, I executed the reconstruction of the sidewalk and stairs in front of a house, participating from base prep to finishing.\n\nThe key was safely finishing level differences/slopes and not missing details in a high-traffic area. After organizing the zone and securing safety, we proceeded based on finish lines and handover state.",
                    bullets: [
                        "Existing Area Cleanup & Base Prep",
                        "Sidewalk/Stair Construction (Divided Tasks)",
                        "Level/Slope/Line Detail Organization",
                        "Surroundings Cleanup",
                        "Pedestrian Safety (Work Flow/Temp Organization)",
                        "Final Handover Prep"
                    ],
                    result: "Finished safely and neatly in a public pedestrian area, prioritizing levels and finish details."
                }
            },
            // Others
            {
                id: "5",
                title: "Exterior & Interior Concrete Floor",
                cat: "Concrete Floor",
                summary: "Performed interior/exterior concrete flooring and finish organization.",
                tags: ["#ConcreteFloor", "#BasePrep", "#Leveling", "#Finish", "#Industrial", "#TeamLeader"],
                img: "/img/5/16.webp",
                detail: {
                    cat: "Concrete Floor",
                    space: "Industrial Space",
                    loc: "Czechia · Jihomoravský",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Flatness, Base Prep, Next Process Quality, Organization",
                    desc: "As Site Team Leader, I executed interior/exterior concrete floor processes with the team, participating from base prep to finish organization.\n\nThe key was absolute flatness (level) and base prep. Floor quality determines durability and finish quality for subsequent trades, so we managed based on zone organization and level checks. MEP connections were shared with partners, and I participated directly in the flooring process.",
                    bullets: [
                        "Existing Floor Cleanup & Base Prep",
                        "Zone Level Check & Correction",
                        "Pouring Prep & Assist",
                        "Finish Organization & Post-Cure Cleanup",
                        "Handover State for Next Process",
                        "Site Cleanliness/Organization"
                    ],
                    result: "Managed based on levels and base prep to handover a smooth state for subsequent processes."
                }
            },
            {
                id: "7",
                title: "Special Purpose Structure Rebar & Pouring",
                cat: "Structure",
                summary: "Performed rebar and concrete pouring for a special purpose structure.",
                tags: ["#Structure", "#Rebar", "#Concrete", "#Precision", "#Safety", "#TeamLeader"],
                img: "/img/7/2.webp",
                detail: {
                    cat: "Structure",
                    space: "Manufacturing Plant",
                    loc: "Czechia · Moravskoslezský",
                    period: "Last 2–3 Years (Project-based)",
                    role: "Site Team Leader (Team Work)",
                    scope: EN_COMMON.MEP_SEPARATION + " / Other processes directly on site",
                    keywords: "Precision Rebar, Safety Standards, Structure Process, Quality",
                    desc: "As Site Team Leader, I executed the rebar and concrete pouring for a special purpose structure with the team.\n\nDue to the nature of the structure, precision of reinforcement and adherence to safety standards were key. We strictly maintained work sequence and zone organization, managing specifically for a clean handover.",
                    bullets: [
                        "Pre-work Zone Organization & Safety",
                        "Rebar Placement/Tying (Precision Standard)",
                        "Pouring Prep & Assist",
                        "Finish Organization & Surroundings",
                        "Quality Check & Handover Prep",
                        "Safety Compliance & Standard Maintenance"
                    ],
                    result: "Operated prioritizing precision and safety standards, securing both structure quality and safety."
                }
            }
        ]
    },
    contact: {
        title: EN_COMMON.SECTION.CONTACT,
        heading: "Work Conditions & Contact",
        sub: [
            "Available from late 2026 (negotiable).",
            "Visa/relocation process: to be discussed with the company."
        ],
        cta: "Contact via KakaoTalk",
        email: "your-email@example.com",
        kakaoId: "dominikt",
        kakaoLink: "https://open.kakao.com/o/sX8hY7bg",
        phone: "+420 XXX XXX XXX",
        phoneKr: EN_COMMON.CONTACT_KR_PHONE,
        note: "Contact: Email or KakaoTalk (based in Czechia; no Korean phone number)."
    },
    // Documents Page
    documentsPage: {
        title: "Documents",
        subtitle: "Verification & Career Proof",
        intro: "Official documents provided for hiring review. All documents are provided in original (Czech) and Korean translation.",
        privacyTitle: "Privacy Notice",
        privacyText: "These documents may contain personal information. Please refrain from sharing outside of hiring review purposes.",
        actions: {
            open: "Open",
            download: "Download"
        }
    },

    // Profile Page V4 (Employer-Grade)
    profilePageV4: {
        header: {
            name: EN_COMMON.NAME_KR,
            role: EN_COMMON.ROLE_LINE,
            tags: ["15 Years Exp", "Multi-skilled", "Reliable", "Learning Korean"],
            download: "Save PDF / Print"
        },
        nav: {
            title: "Sections",
            sections: [
                { id: "summary", label: "Summary" },
                { id: "experience", label: "Exp" },
                { id: "scope", label: "Scope" },
                { id: "skills", label: "Skills" },
                { id: "tools", label: "Tools" },
                { id: "workstyle", label: "Style" },
                { id: "reference", label: "Ref" },
                { id: "korea", label: "KR Job" },
                { id: "conditions", label: "Contact" }
            ],
            top: "Top"
        },
        sections: {
            summary: {
                title: EN_COMMON.SECTION.SUMMARY,
                items: [
                    "Long-term collaboration with one company (Cita Trading) for over 15 years since 2009.",
                    "Site Team Leader directing and coordinating small-scale projects (2–8 people).",
                    "Direct participation in the entire process from demolition to finishing and handover.",
                    EN_COMMON.MEP_SEPARATION + ", communicating with specialist firms.",
                    "Prioritizing site organization, smooth connection between trades, and minimizing rework.",
                    "Safety is the basic principle; efficiency is improved in an organized environment.",
                    "Skilled operation of various small construction machinery (skid loader, forklift, etc.) and power tools.",
                    "Capable of precision measurement (laser level) and operating specialized equipment (core drill, tile cutter).",
                    "Basic SMAW (Stick) welding capability.",
                    EN_COMMON.REGION + ", open to other regions if necessary.",
                    "Fully aware of visa/relocation procedures and ready to cooperate actively with the company."
                ]
            },
            experience: {
                title: EN_COMMON.SECTION.EXPERIENCE,
                role: "Construction Technician / Site Supervisor (Odborný stavební technik)",
                company: "Cita Trading s.r.o. (Brno, Czechia)",
                period: "2009.11 — Present (approx. 15 years)",
                desc: [
                    "Performing remodeling and new construction for Residential (Apt, House) and Commercial (Office, Hospital, Restaurant) spaces.",
                    "Handling material estimation, ordering, transport, and on-site logistics.",
                    "Directing work tasks for site personnel (team) and inspecting quality.",
                    "Coordinating schedules with clients and subcontractors (Electrical, MEP) to prevent delays.",
                    "Adhering to site safety (BOZP) and waste disposal procedures."
                ]
            },
            scope: {
                title: EN_COMMON.SECTION.SCOPE,
                direct: {
                    title: "Direct Execution",
                    desc: "Direct execution with quality responsibility.",
                    items: [
                        "Demolition & Protection",
                        "Masonry, Plastering, Concrete Pouring",
                        "Drywall (Gypsum Board) & Ceiling Systems",
                        "Tiling (Floor/Wall) & Waterproofing",
                        "Flooring & Painting",
                        "Finish Carpentry & Furniture/Fixture Coordination"
                    ]
                },
                partner: {
                    title: "Subcontractor Coordination",
                    desc: "Commissioning specialists and managing schedules.",
                    items: [
                        "Electrical Wiring & Distribution Boards",
                        "Plumbing & Water Supply",
                        "Heating & Gas Lines",
                        "Major Structural Changes (requiring Structural Engineer)"
                    ]
                },
            },
            skills: {
                title: EN_COMMON.SECTION.SKILLS,
                groups: [
                    {
                        title: "Quality",
                        items: [
                            "Precision execution via Vertical/Horizontal Laser Leveling",
                            "Skilled in Finish Lines (Detail) & Materials Separation",
                            "Pre-reinforcement of potential defect areas"
                        ]
                    },
                    {
                        title: "Operation",
                        items: [
                            "Optimizing workflow sequence to minimize downtime",
                            "Material Loss Management & Efficient Stock Operation",
                            "Immediate cleanup & organization after work (Clean Site)"
                        ]
                    },
                    {
                        title: "Safety",
                        items: [
                            "Strict Personal Protective Equipment (PPE) adherence",
                            "Pre-removal of hazards & Site Control",
                            "Compliance with safety regulations & Team guidance"
                        ]
                    }
                ]
            },
            tools: {
                title: EN_COMMON.SECTION.TOOLS,
                desc: "Capable of proficiently operating the equipment regardless of current ownership.",
                items: [
                    "Power Tools: Makita, Hilti, Milwaukee full lineup (Drill, Grinder, Sander, etc.)",
                    "Measurement: Topcon Rotary Laser, Optical Level",
                    "Specialized: Wet Core Drill, Large Tile Cutter",
                    "Welding: SMAW / MMA (Stick)",
                    "Machinery: Skid Loader, Mini Excavator",
                    "Transport: Forklift, Telescopic Handler"
                ]
            },
            workstyle: {
                title: EN_COMMON.SECTION.STYLE,
                items: [
                    { title: "Execution", desc: "Prefer proving through results rather than words." },
                    { title: "Problem Solving", desc: "Find the cause, propose a solution, and prevent recurrence." },
                    { title: "Procedure", desc: "Believe that following checklists and order is the fastest way." },
                    { title: "Composure", desc: "Judge based on facts without reacting emotionally under pressure." },
                    { title: "Organization", desc: "Believe that a well-organized site guarantees safety and quality." }
                ]
            },
            reference: {
                title: EN_COMMON.SECTION.REFERENCE,
                source: "Ing. Tomáš Citnar (CEO, Cita Trading s.r.o.)",
                summary: [
                    "Collaborated for over 15 years since 2009 without a single conflict.",
                    "Diligent, strong sense of responsibility, does not avoid difficult tasks.",
                    "Technically skilled and a trusted figure within the organization.",
                    "Humble and fair attitude, maintaining good relationships with the team."
                ],
                note: "※ Original reference letter and translation are available in the 'Documents' section."
            },
            korea: {
                title: EN_COMMON.SECTION.KOREA,
                content: [
                    "I've built long-term on-site experience in Czechia and am preparing to work in Korea to grow in a new environment and standards.",
                    "I understand Korea's work environment (fast pace, high quality standards, organized teamwork) and am preparing to adapt.",
                    "Currently learning Korean daily for communication; will focus on acquiring job-specific terminology after joining.",
                    EN_COMMON.REGION + ", but available for regional work or travel depending on the project.",
                    "Visa and relocation procedures will be discussed with the company."
                ]
            },
            conditions: {
                title: EN_COMMON.SECTION.CONDITIONS,
                items: [
                    { label: "Desired Employment", value: "Full-time (Regular)" },
                    { label: "Availability", value: EN_COMMON.AVAILABILITY },
                    { label: "Desired Location", value: EN_COMMON.REGION },
                    { label: "Visa Support", value: EN_COMMON.VISA }
                ]
            },
            contact: {
                title: EN_COMMON.SECTION.CONTACT,
                email: "your-email@example.com",
                kakaoId: "dominikt",
                kakaoLink: "https://open.kakao.com/o/sX8hY7bg",
                phoneCz: "+420 XXX XXX XXX",
                phoneKr: EN_COMMON.CONTACT_KR_PHONE,
                note: "Please contact me via Email or KakaoTalk for a quick response."
            }
        }
    }
};
