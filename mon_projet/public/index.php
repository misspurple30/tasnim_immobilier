<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test PHP + Tailwind</title>
  <!-- CDN Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">

  <div class="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
    <h1 class="text-2xl font-bold text-blue-600 mb-4">Bienvenue en PHP + Tailwind</h1>

    <?php
      $heure = date("H:i");
      echo "<p class='text-gray-700'>Il est actuellement <strong>$heure</strong>.</p>";
    ?>

    <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
      Bouton Test
    </button>
  </div>

</body>
</html>
