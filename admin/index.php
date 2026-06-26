<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php
require_once 'includes/header.php';

// Ambil statistik
$total_pesanan = $conn->query("SELECT COUNT(id) AS total FROM pesanan")->fetch_assoc()['total'];
$pesanan_diproses = $conn->query("SELECT COUNT(id) AS total FROM pesanan WHERE status='diproses'")->fetch_assoc()['total'];
$total_pendapatan = $conn->query("SELECT SUM(total_harga) AS total FROM pesanan WHERE status='selesai'")->fetch_assoc()['total'];
$total_menu = $conn->query("SELECT COUNT(id) AS total FROM menu")->fetch_assoc()['total'];
?>

<div class="page-header">
    <h1>Dashboard</h1>
    <p>Selamat datang, <?= $_SESSION['nama'] ?></p>
</div>

<div class="dashboard-grid">
    <div class="stat-card">
        <div class="stat-icon">🛒</div>
        <div class="stat-value"><?= $total_pesanan ?></div>
        <div class="stat-label">Total Pesanan</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-value"><?= $pesanan_diproses ?></div>
        <div class="stat-label">Pesanan Diproses</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-value">Rp <?= number_format($total_pendapatan ?: 0, 0, ',', '.') ?></div>
        <div class="stat-label">Total Pendapatan</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">🍔</div>
        <div class="stat-value"><?= $total_menu ?></div>
        <div class="stat-label">Total Menu</div>
    </div>
</div>

<div class="table-container">
    <h3 style="padding: 20px; border-bottom: 1px solid var(--gray-200);">Pesanan Terbaru</h3>
    <table>
        <thead>
            <tr>
                <th>ID Pesanan</th>
                <th>Tanggal</th>
                <th>Total Harga</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $query = "SELECT * FROM pesanan ORDER BY id DESC LIMIT 5";
            $result = $conn->query($query);
            if ($result->num_rows > 0):
                while ($row = $result->fetch_assoc()):
            ?>
            <tr>
                <td>#<?= $row['id'] ?></td>
                <td><?= date('d M Y H:i', strtotime($row['tanggal_pesan'])) ?></td>
                <td>Rp <?= number_format($row['total_harga'], 0, ',', '.') ?></td>
                <td><span class="badge badge-<?= $row['status'] ?>"><?= ucfirst($row['status']) ?></span></td>
                <td><a href="pesanan.php" class="btn-secondary" style="font-size: 0.8rem; padding: 4px 8px;">Lihat</a></td>
            </tr>
            <?php endwhile; else: ?>
            <tr><td colspan="5" style="text-align:center;">Belum ada pesanan</td></tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<?php require_once 'includes/footer.php'; ?>
