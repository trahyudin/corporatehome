<?php
/**
 * PDO Database Connector & Auto-Initializer
 * Supports MySQL & SQLite with automatic table creation and data seeding.
 */

$config = require __DIR__ . '/config.php';

function getDbConnection() {
    global $config;
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dbType = $config['db_type'] ?? 'mysql';
    $connected = false;

    // 1. Attempt MySQL if configured
    if ($dbType === 'mysql') {
        $my = $config['mysql'];
        $dsn = "mysql:host={$my['host']};port={$my['port']};dbname={$my['dbname']};charset={$my['charset']}";
        try {
            $pdo = new PDO($dsn, $my['user'], $my['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            $pdo->setAttribute(PDO::ATTR_DRIVER_NAME, 'mysql');
            $connected = true;
        } catch (PDOException $e) {
            // Log warning and fallback to SQLite
            error_log("MySQL connection failed: " . $e->getMessage() . ". Falling back to SQLite.");
        }
    }

    // 2. Fallback to SQLite
    if (!$connected) {
        $sqlitePath = $config['sqlite']['path'];
        $sqliteDir = dirname($sqlitePath);
        if (!is_dir($sqliteDir)) {
            mkdir($sqliteDir, 0777, true);
        }

        try {
            $pdo = new PDO("sqlite:{$sqlitePath}", null, null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            $connected = true;
        } catch (PDOException $e) {
            throw new Exception("Unable to initialize SQLite database: " . $e->getMessage());
        }
    }

    // 3. Ensure tables exist
    initializeTables($pdo);

    return $pdo;
}

function initializeTables(PDO $pdo) {
    $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
    $isSqlite = ($driver === 'sqlite');

    $autoInc = $isSqlite ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'INT AUTO_INCREMENT PRIMARY KEY';
    $nowDefault = $isSqlite ? "DATETIME DEFAULT CURRENT_TIMESTAMP" : "TIMESTAMP DEFAULT CURRENT_TIMESTAMP";

    // Leads Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS leads (
        id {$autoInc},
        source VARCHAR(50) NOT NULL DEFAULT 'modal_consultation',
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        company VARCHAR(150) NULL,
        slot VARCHAR(100) NULL,
        lang VARCHAR(10) NOT NULL DEFAULT 'id',
        status VARCHAR(30) NOT NULL DEFAULT 'new',
        created_at {$nowDefault}
    )");

    // Inquiries Table (Whistleblowing & Procurement)
    $pdo->exec("CREATE TABLE IF NOT EXISTS inquiries (
        id {$autoInc},
        receipt_code VARCHAR(50) NOT NULL UNIQUE,
        type VARCHAR(50) NOT NULL DEFAULT 'concern',
        name VARCHAR(150) NULL,
        email VARCHAR(150) NULL,
        message TEXT NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'received',
        created_at {$nowDefault}
    )");

    // Portfolio Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS portfolio (
        id {$autoInc},
        name VARCHAR(100) NOT NULL,
        tag VARCHAR(100) NOT NULL,
        url VARCHAR(255) NOT NULL,
        desc_id TEXT NOT NULL,
        desc_en TEXT NOT NULL,
        stack VARCHAR(255) NOT NULL,
        order_num INT NOT NULL DEFAULT 0,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at {$nowDefault}
    )");

    // Reports Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS reports (
        id {$autoInc},
        slug VARCHAR(100) NOT NULL UNIQUE,
        name_id VARCHAR(150) NOT NULL,
        name_en VARCHAR(150) NOT NULL,
        meta_id VARCHAR(100) NOT NULL,
        meta_en VARCHAR(100) NOT NULL,
        downloads_count INT NOT NULL DEFAULT 0,
        created_at {$nowDefault}
    )");

    // Seed default portfolio if empty
    $count = (int)$pdo->query("SELECT COUNT(*) FROM portfolio")->fetchColumn();
    if ($count === 0) {
        $sites = [
            ['Aetheria', 'Creative Tech Studio', 'https://aetheria-lac.vercel.app/', 'Studio creative technology internasional yang memadukan computational design, arsitektur AI, dan rekayasa digital berperforma tinggi.', 'International creative technology studio bridging computational design, AI-driven architectures, and high-performance digital engineering.', 'React, Next.js, AI/ML, i18n', 1],
            ['Aetheris', 'Corporate Creative Tech', 'https://comporate-oo1m.vercel.app/', 'Studio creative technology korporat premium untuk Fortune 500 — antarmuka enterprise dan arsitektur digital generasi berikutnya.', 'Elite corporate creative technology studio engineered for Fortune 500s — next-generation enterprise interfaces and spatial architecture.', 'React 18, Framer Motion, Recharts', 2],
            ['Aetheris Quantum', 'Quantum & Autonomous', 'https://komtrorate.vercel.app/', 'Infrastruktur hiper-skalabel, klaster komputasi kuantum, dan sistem intelijen otonom untuk enterprise global.', 'Architecting hyper-scalable infrastructure, quantum computing clusters, and autonomous intelligence systems for global enterprise.', 'Next.js, 3D / WebGL, Real-time', 3],
            ['Valence', 'Intelligent Systems', 'https://corrcoorr.vercel.app/', 'Studio pionir creative technology dan intelligent systems — platform digital, spatial computing, dan ekosistem AI enterprise.', 'Pioneering creative technology and intelligent systems studio designing digital platforms, spatial computing interfaces, and enterprise AI ecosystems.', 'React, Spatial UI, AI', 4],
            ['Valence Dynamics', 'Deep Tech / R&D', 'https://porrtat.vercel.app/', 'Inovasi korporat generasi berikutnya: intelijen otonom, infrastruktur quantum-resilient, dan sistem sintetik untuk enterprise global.', 'Next-generation corporate innovation, autonomous intelligence, quantum-resilient infrastructure, and synthetic systems for global enterprises.', 'Next.js, Data Viz, Security', 5],
            ['Nexaris Global', 'Autonomous Systems', 'https://corrp1.vercel.app/', 'Arsitektur otonom, teknologi frontier, dan sistem enterprise kreatif untuk institusi global modern.', 'Engineering autonomous architecture, frontier technology, and creative enterprise systems for modern global institutions.', 'React 18, Edge, i18n', 6],
            ['Kyron', 'Digital Flagship', 'https://corrpp2.vercel.app/', 'Flagship digital multi-halaman ultra-premium: creative technology, sintesis strategis, dan solusi enterprise futuristik.', 'Ultra-premium multi-page corporate digital flagship uniting creative technology, strategic synthesis, and futuristic enterprise solutions.', 'React 18, Framer Motion, SEO', 7],
            ['Synova Global', 'Strategic Transformation', 'https://corrpp3.vercel.app/', 'Creative technology enterprise dan transformasi digital strategis untuk pemimpin industri global.', 'Enterprise creative technology and strategic digital transformation for global industry leaders.', 'Next.js, Headless CMS, Analytics', 8],
            ['Aethis Global', 'Applied Tech', 'https://croopp4.vercel.app/', 'Creative technology enterprise global, sovereign intelligence, dan sistem digital berdampak tinggi.', 'Global enterprise creative technology, sovereign intelligence, and high-impact digital systems.', 'React, Dashboards, Cloud', 9],
            ['Aetheron Dynamics', 'Digital HQ', 'https://croopp5.vercel.app/', 'Arsitektur kognitif generasi berikutnya, sibernetika otonom, dan infrastruktur kuantum global.', 'Next-generation cognitive architecture, autonomous cybernetics, and global quantum infrastructure.', 'Next.js, 3D / WebGL, Edge', 10],
            ['Kordex', 'Digital Architecture', 'https://croopp6.vercel.app/', 'Teknologi global, infrastruktur otonom, dan arsitektur transformasi digital untuk enterprise skala planet.', 'Global technology, autonomous infrastructure, and digital transformation architecture for planetary-scale enterprises.', 'React 18, Spatial UI, Cloud', 11],
            ['Aetheron Command', 'Command Center', 'https://corrp7.vercel.app/', 'Digital command center generasi berikutnya & infrastruktur enterprise kognitif untuk operasi mission-critical.', 'Next-generation digital command center & cognitive enterprise infrastructure for mission-critical operations.', 'Recharts, Real-time, Security', 12],
            ['Valence Kinetic', 'Kinetic Computing', 'https://croopp8.vercel.app/', 'Sistem intelijen otonom & kinetic computing — pengalaman digital korporat teknologi global futuristik.', 'Autonomous intelligence & kinetic computing systems — a futuristic global technology corporate digital experience.', 'React, Animations, AI', 13],
            ['Aetheris Enterprise', 'Enterprise Systems', 'https://croopp9.vercel.app/', 'Digital flagship kelas dunia dan platform creative engineering enterprise dengan pengalaman digital transformatif.', 'World-class digital flagship and enterprise creative engineering platform pioneering transformative digital experiences.', 'React 18, Framer Motion, SEO', 14],
            ['Aetheris Labs', 'Future Lab / R&D', 'https://croopp10.vercel.app/', 'Lab teknologi canggih & strategi masa depan: komputasi skala planet, neurotechnology, dan sistem otonom.', 'Advanced technology & future strategy lab architecting planetary-scale computing, neurotechnology, and autonomous systems.', 'Next.js, Data Viz, i18n', 15]
        ];

        $stmt = $pdo->prepare("INSERT INTO portfolio (name, tag, url, desc_id, desc_en, stack, order_num) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($sites as $s) {
            $stmt->execute($s);
        }
    }

    // Seed default reports if empty
    $rCount = (int)$pdo->query("SELECT COUNT(*) FROM reports")->fetchColumn();
    if ($rCount === 0) {
        $reports = [
            ['annual-report-fy25', 'Annual Report FY25', 'Annual Report FY25', 'PDF · 8,4 MB · ID', 'PDF · 8.4 MB · ID'],
            ['sustainability-esg', 'Laporan Keberlanjutan (ESG)', 'Sustainability Report (ESG)', 'PDF · 5,1 MB · EN/ID', 'PDF · 5.1 MB · EN/ID'],
            ['financial-highlights', 'Ringkasan Financial Highlights', 'Financial Highlights Summary', 'PDF · 2,3 MB · EN', 'PDF · 2.3 MB · EN'],
            ['corporate-deck', 'Deck Presentasi Korporat', 'Corporate Presentation Deck', 'PDF · 11,9 MB · EN/ID', 'PDF · 11.9 MB · EN/ID'],
        ];
        $rStmt = $pdo->prepare("INSERT INTO reports (slug, name_id, name_en, meta_id, meta_en) VALUES (?, ?, ?, ?, ?)");
        foreach ($reports as $r) {
            $rStmt->execute($r);
        }
    }
}
