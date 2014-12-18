<?php

require 'vendor/autoload.php';
require '../secret.php';

if ($_POST) {
	Stripe::setApiKey($secret['stripe']['secret_key']);
	
	try {
		if (!isset($_POST['stripeToken'])) {
			throw new Exception("The Stripe Token was not generated correctly");
		}

		Stripe_Charge::create([
			"amount" => 1500,
			"currency" => "gbp",
			"card" => $_POST['stripeToken']
		]);
		
		header("HTTP/1.1 200 OK");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	catch (Exception $e) {
		$error = $e->getMessage();
		header("HTTP/1.1 500 Internal Server Error");
		header('Content-Type: application/json');
		echo json_encode(['error' => true, 'io' => 'you']);
	}
}

?>
