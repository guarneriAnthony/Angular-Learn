<?php
require_once 'init.php';

if ($_GET['action'] === 'create') {
  $data = json_decode(file_get_contents('php://input'), true);
  $sql = "
    REPLACE INTO recipe
    (id, title, description, cost, preparation_time, cooking_time, difficulty, id_category, picture)
    VALUES
    (:id, :title, :description, :cost, :preparation_time, :cooking_time, :difficulty, :id_category, :picture)";
  $stmt = $pdo->prepare($sql);

  $stmt->bindParam(':id', $data['id']);
  $stmt->bindParam(':title', $data['title']);
  $stmt->bindParam(':description', $data['description']);
  $stmt->bindParam(':cost', $data['cost']);
  $stmt->bindParam(':preparation_time', $data['preparation_time']);
  $stmt->bindParam(':cooking_time', $data['cooking_time']);
  $stmt->bindParam(':difficulty', $data['difficulty']);
  $stmt->bindParam(':id_category', $data['id_category']);
  $stmt->bindParam(':picture', $data['picture']);

  $data = $stmt->execute();
  echo json_encode($data);
}
if ($_GET['action'] === 'readAll') {
  $sql = "SELECT * FROM recipe ";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $recipes = $stmt->fetchAll();
  echo json_encode($recipes);
}
if ($_GET['action'] === 'readOne') {
  $id = $_GET['id'];
  $sql = "SELECT * FROM recipe WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $recipe = $stmt->fetch();
  $sql = "SELECT * FROM ingredient INNER JOIN recipe_ingredient ri on ingredient.id = ri.ingredient_id WHERE recipe_id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $recipe['ingredients'] = $stmt->fetchAll();
  echo json_encode($recipe);
}
if ($_GET['action'] === 'delete') {
  $id = $_GET['id'];
  $sql = "DELETE FROM recipe WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $id);
  $stmt->execute();
}
