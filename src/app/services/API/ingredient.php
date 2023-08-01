<?php
require_once 'init.php';

if ($_GET['action'] === 'create') {
  $data = json_decode(file_get_contents('php://input'), true);
  $sql = "
    REPLACE INTO ingredient
    (id, name)
    VALUES
    (:id, :name)
    ";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($data);
  echo json_encode($pdo->lastInsertId());
}
if ($_GET['action'] === 'readAll') {
  $sql = "SELECT * FROM ingredient";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  echo json_encode($stmt->fetchAll());
}
if ($_GET['action'] === 'readOne') {
  $id = $_GET['id'];
  $sql = "SELECT * FROM ingredient WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  echo json_encode($stmt->fetch());
}
if ($_GET['action'] === 'delete') {
  $id = $_GET['id'];
  $sql = "DELETE FROM ingredient WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
}
