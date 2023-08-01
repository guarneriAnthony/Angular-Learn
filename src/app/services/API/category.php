<?php
require_once 'init.php';

if ($_GET['action'] === 'create'){
  $data = json_decode(file_get_contents('php://input'), true);
  $sql = "INSERT INTO category (name) VALUES (:name)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($data);
  echo json_encode($data);
}

if ($_GET['action'] === 'readAll'){
  $sql = "SELECT * FROM category";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  echo json_encode($stmt->fetchAll());
}
if ($_GET['action'] === 'readOne'){
  $id = $_GET['id'];
  $sql = "SELECT * FROM category WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  echo json_encode($stmt->fetch());
}
if ($_GET['action'] === 'delete'){
  $id = $_GET['id'];
  $sql = "DELETE FROM category WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
}
if ($_GET['action'] === 'update'){
  $sql = 'UPDATE category SET name = :name WHERE id = :id';
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $_GET['id']);
  $stmt->bindParam(':name', $_GET['name']);
  $stmt->execute();
}
