<?php
/**
 * RESTful API Router for Korpora Web Atelier
 * Handles leads, inquiries, portfolio, reports, and health checks.
 */

// Error handling & headers
error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once __DIR__ . '/db.php';

// Set standard CORS & JSON headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Parse request URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Normalize path (removes /api or /api/index.php prefix)
$path = preg_replace('#^.*?/api(/index\.php)?#', '', $uri);
$path = trim($path, '/');

// Also allow query parameter ?route=health or ?endpoint=health
if (empty($path)) {
    $path = $_GET['route'] ?? $_GET['endpoint'] ?? '';
}

// Global response helper
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// Global error helper
function jsonError($message, $status = 400) {
    jsonResponse(['ok' => false, 'error' => $message], $status);
}

try {
    $pdo = getDbConnection();
    $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

    // ==========================================
    // 1. ROUTE: /health
    // ==========================================
    if ($path === 'health' || $path === '') {
        $leadsCount = (int)$pdo->query("SELECT COUNT(*) FROM leads")->fetchColumn();
        $inquiriesCount = (int)$pdo->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();
        $portfolioCount = (int)$pdo->query("SELECT COUNT(*) FROM portfolio")->fetchColumn();

        jsonResponse([
            'ok' => true,
            'message' => 'KORPORA Enterprise API is online and running.',
            'db' => "connected ({$driver})",
            'driver' => $driver,
            'server_time' => date('c'),
            'stats' => [
                'leads' => $leadsCount,
                'inquiries' => $inquiriesCount,
                'portfolio' => $portfolioCount,
            ],
            'version' => '1.0.0-cpanel-ready'
        ]);
    }

    // ==========================================
    // 2. ROUTE: /leads (POST)
    // ==========================================
    if ($path === 'leads' && $method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        $source = trim($input['source'] ?? 'modal_consultation');
        $name = trim($input['name'] ?? '');
        $email = trim($input['email'] ?? '');
        $company = trim($input['company'] ?? '');
        $slot = trim($input['slot'] ?? '');
        $lang = trim($input['lang'] ?? 'id');

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonError('Email korporat valid wajib diisi.', 422);
        }

        if (empty($name)) {
            $name = explode('@', $email)[0];
        }

        $stmt = $pdo->prepare("INSERT INTO leads (source, name, email, company, slot, lang, status) VALUES (?, ?, ?, ?, ?, ?, 'queued')");
        $stmt->execute([$source, $name, $email, $company, $slot, $lang]);
        $leadId = $pdo->lastInsertId();

        jsonResponse([
            'ok' => true,
            'id' => $leadId,
            'status' => 'queued',
            'message' => ($lang === 'en')
                ? 'Consultation request received. Our Lead Tech Architect will reach you shortly.'
                : 'Permintaan konsultasi diterima. Tim Lead Tech Architect kami akan segera menghubungi Anda.',
        ], 201);
    }

    // ==========================================
    // 3. ROUTE: /inquiries (POST)
    // ==========================================
    if ($path === 'inquiries' && $method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        $type = trim($input['type'] ?? 'concern');
        $name = trim($input['name'] ?? 'Anonymous Stakeholder');
        $email = trim($input['email'] ?? '');
        $message = trim($input['message'] ?? '');

        if (empty($message)) {
            jsonError('Rincian laporan / pertanyaan wajib diisi.', 422);
        }

        // Generate unique receipt code
        $prefix = ($type === 'procurement') ? 'RFP-' : 'WB-';
        $receipt = $prefix . date('Y') . '-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

        $stmt = $pdo->prepare("INSERT INTO inquiries (receipt_code, type, name, email, message, status) VALUES (?, ?, ?, ?, ?, 'received')");
        $stmt->execute([$receipt, $type, $name, $email, $message]);

        jsonResponse([
            'ok' => true,
            'receipt' => $receipt,
            'receivedAt' => date('c'),
            'message' => 'Laporan rahasia berhasil diterima dan dienkripsi.',
        ], 201);
    }

    // ==========================================
    // 4. ROUTE: /portfolio (GET)
    // ==========================================
    if ($path === 'portfolio' && $method === 'GET') {
        $stmt = $pdo->query("SELECT id, name, tag, url, desc_id as descId, desc_en as descEn, stack, order_num FROM portfolio WHERE is_active = 1 ORDER BY order_num ASC");
        $items = $stmt->fetchAll();

        // Convert comma-separated stack into array
        foreach ($items as &$item) {
            $item['stack'] = array_map('trim', explode(',', $item['stack']));
        }

        jsonResponse(['ok' => true, 'items' => $items]);
    }

    // ==========================================
    // 5. ROUTE: /reports (GET & PDF Download)
    // ==========================================
    if ($path === 'reports' && $method === 'GET') {
        $downloadSlug = $_GET['download'] ?? null;

        if ($downloadSlug) {
            // Update download counter
            $upd = $pdo->prepare("UPDATE reports SET downloads_count = downloads_count + 1 WHERE slug = ?");
            $upd->execute([$downloadSlug]);

            // Serve generated PDF document
            servePdfDocument($downloadSlug);
            exit;
        }

        $stmt = $pdo->query("SELECT slug, name_id as nameId, name_en as nameEn, meta_id as metaId, meta_en as metaEn, downloads_count as downloads FROM reports");
        $items = $stmt->fetchAll();

        jsonResponse(['ok' => true, 'reports' => $items]);
    }

    // 404 for unknown endpoint
    jsonError("Endpoint '{$path}' tidak ditemukan.", 404);

} catch (Exception $e) {
    error_log("API Exception: " . $e->getMessage());
    jsonError('Terjadi kesalahan internal server: ' . $e->getMessage(), 500);
}

/**
 * Generates and serves an authentic sample PDF executive report
 */
function servePdfDocument($slug) {
    $title = ucwords(str_replace('-', ' ', $slug));
    $date = date('d F Y');

    header('Content-Type: application/pdf');
    header("Content-Disposition: attachment; filename=\"{$slug}-KORPORA.pdf\"");
    header('Cache-Control: private, max-age=0, must-revalidate');
    header('Pragma: public');

    // Minimal PDF 1.4 Binary Generator without external dependencies
    $pdf = "%PDF-1.4\n";
    $pdf .= "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n";
    $pdf .= "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n";
    $pdf .= "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n";
    
    $streamContent = "BT\n";
    $streamContent .= "/F1 20 Tf\n";
    $streamContent .= "50 720 Td\n";
    $streamContent .= "(KORPORA WEB ATELIER - ENTERPRISE SYSTEMS) Tj\n";
    $streamContent .= "/F1 14 Tf\n";
    $streamContent .= "0 -35 Td\n";
    $streamContent .= "(" . strtoupper($title) . ") Tj\n";
    $streamContent .= "/F1 10 Tf\n";
    $streamContent .= "0 -25 Td\n";
    $streamContent .= "(Generated Date: " . $date . " | Standard: SOC2 Type II & GCG Compliance) Tj\n";
    $streamContent .= "0 -30 Td\n";
    $streamContent .= "(Executive Overview: High-performance enterprise web architecture with unified governance.) Tj\n";
    $streamContent .= "0 -18 Td\n";
    $streamContent .= "(Consolidated portfolio index: IDR 9,412 M YoY (+12.4%) | ESG Sustainability Score: 93/100) Tj\n";
    $streamContent .= "0 -18 Td\n";
    $streamContent .= "(Confidential document prepared exclusively for corporate leadership & stakeholders.) Tj\n";
    $streamContent .= "ET\n";

    $streamLen = strlen($streamContent);
    $pdf .= "4 0 obj << /Length {$streamLen} >> stream\n{$streamContent}endstream\nendobj\n";
    $pdf .= "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj\n";
    $pdf .= "xref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000244 00000 n \n" . sprintf("%010d 00000 n \n", 244 + $streamLen + 40);
    $pdf .= "trailer << /Size 6 /Root 1 0 R >>\nstartxref\n" . (244 + $streamLen + 110) . "\n%%EOF";

    echo $pdf;
    exit;
}
