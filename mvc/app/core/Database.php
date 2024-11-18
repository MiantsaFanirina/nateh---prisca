<?php

class Database {

    // Path to the SQLite database file
    private static $dbPath = 'database.sqlite';

    private static function connect() {
        // Connect to the SQLite database
        $pdo = new PDO('sqlite:' . self::$dbPath);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        return $pdo;
    }

    public static function query($query, $params = array()) {
        $stmt = self::connect()->prepare($query);
        $stmt->execute($params);
        $data = $stmt->fetchAll();
        return $data;
    }
}

?>
