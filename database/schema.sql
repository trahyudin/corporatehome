-- ==========================================================
-- KORPORA WEB ATELIER — DATABASE SCHEMA (MySQL / MariaDB / SQLite)
-- Siap di-import ke phpMyAdmin di cPanel
-- ==========================================================

-- 1. Tabel Leads (Konsultasi Arsitektur & Briefing Booking)
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `source` VARCHAR(50) NOT NULL DEFAULT 'modal_consultation',
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NULL,
  `slot` VARCHAR(100) NULL,
  `lang` VARCHAR(10) NOT NULL DEFAULT 'id',
  `status` VARCHAR(30) NOT NULL DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Inquiries (Whistleblowing & Pengadaan / RFP)
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `receipt_code` VARCHAR(50) NOT NULL UNIQUE,
  `type` VARCHAR(50) NOT NULL DEFAULT 'concern',
  `name` VARCHAR(150) NULL,
  `email` VARCHAR(150) NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'received',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabel Portfolio (15 Template Website Korporat)
CREATE TABLE IF NOT EXISTS `portfolio` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(100) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `desc_id` TEXT NOT NULL,
  `desc_en` TEXT NOT NULL,
  `stack` VARCHAR(255) NOT NULL,
  `order_num` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabel Reports (Pusat Laporan & Download PDF)
CREATE TABLE IF NOT EXISTS `reports` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name_id` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `meta_id` VARCHAR(100) NOT NULL,
  `meta_en` VARCHAR(100) NOT NULL,
  `downloads_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
